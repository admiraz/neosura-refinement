import { NextResponse } from "next/server";
import { getResendClient } from "@/lib/email/resend";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ACCEPTED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
/** Safety margin under typical provider message-size ceilings (Resend
 * caps a full request around 40MB); keeps a healthy buffer for headers/
 * body/base64 overhead on top of the raw file bytes. */
const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXT_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

const FALLBACK_MESSAGE =
  "Die Übermittlung ist derzeit nicht möglich. Bitte senden Sie Ihre Unterlagen direkt an info@neosura.ch.";

const FIELD_LABELS: Record<string, string> = {
  vorname: "Vorname",
  nachname: "Nachname",
  firmenname: "Firmenname",
  ansprechpartner: "Ansprechpartner",
  email: "E-Mail",
  telefon: "Telefon",
  nachricht: "Nachricht",
};

function hasAcceptedExtension(filename: string): boolean {
  const lower = filename.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

/** Collapses newlines/control characters and caps length — applied to
 * every single-line field before it's written into the plain-text email
 * body or subject, so a direct API call (bypassing the real UI, which
 * never lets a user type these) can't spoof extra "fields" or inject
 * header-like content via `\r\n`. */
function sanitizeSingleLine(value: string, maxLength = MAX_TEXT_FIELD_LENGTH): string {
  return value.replace(/[\r\n\x00-\x1f]+/g, " ").trim().slice(0, maxLength);
}

function sanitizeFilename(name: string): string {
  const cleaned = name.replace(/[\r\n\x00-\x1f]/g, "").trim();
  return cleaned.slice(0, 150) || "Datei";
}

/** Validates the submission, then delivers it by email via Resend
 * (`RESEND_API_KEY` / `CONTACT_FROM_EMAIL` env vars) — no permanent local
 * storage, files are only ever held in memory for this request. `ok:
 * true` is returned ONLY once the provider has confirmed the send;
 * anything else (missing config, provider error) returns `deliveryFailed:
 * true` with the same fallback-email message so the UI never claims a
 * delivery that didn't happen. */
export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  const formType = formData.get("form_type");
  if (formType !== "privat" && formType !== "unternehmen") {
    return NextResponse.json({ ok: false, message: "Ungültiger Formulartyp." }, { status: 400 });
  }

  const errors: Record<string, string> = {};
  const requiredFields = formType === "privat" ? ["vorname", "nachname", "email"] : ["firmenname", "ansprechpartner", "email"];

  for (const field of requiredFields) {
    const value = formData.get(field);
    if (typeof value !== "string" || value.trim().length === 0) {
      errors[field] = "Pflichtfeld.";
    }
  }

  // Client guide requirement: every form must carry a mandatory privacy
  // consent checkbox. Client-side `required` covers the normal UI path;
  // this re-checks server-side so a direct API call can't bypass it.
  if (formData.get("consent") !== "on") {
    errors.consent = "Bitte bestätigen Sie die Datenschutzerklärung.";
  }

  const email = formData.get("email");
  if (typeof email === "string" && email.trim().length > 0 && !EMAIL_RE.test(email.trim())) {
    errors.email = "Bitte eine gültige E-Mail-Adresse angeben.";
  }

  const files = formData.getAll("dokumente").filter((f): f is File => f instanceof File && f.size > 0);
  let totalSize = 0;
  for (const file of files) {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      errors.dokumente = `Datei "${file.name}" überschreitet 10 MB.`;
      break;
    }
    // Extension check runs regardless of the client-supplied MIME type,
    // since some browsers send an empty `file.type` (which would otherwise
    // skip validation entirely) — both signals must agree when type is present.
    if (!hasAcceptedExtension(file.name) || (file.type && !ACCEPTED_TYPES.includes(file.type))) {
      errors.dokumente = `Datei "${file.name}" hat ein nicht unterstütztes Format.`;
      break;
    }
    totalSize += file.size;
  }
  if (!errors.dokumente && totalSize > MAX_TOTAL_ATTACHMENT_BYTES) {
    errors.dokumente = "Die Gesamtgrösse aller Dateien überschreitet 20 MB. Bitte reduzieren Sie die Anzahl der Anhänge.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const resend = getResendClient();
  const sender = process.env.CONTACT_FROM_EMAIL;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || "info@neosura.ch";

  if (!resend || !sender) {
    console.error(
      "[documents] delivery not configured — missing RESEND_API_KEY and/or CONTACT_FROM_EMAIL env var(s)."
    );
    return NextResponse.json({ ok: false, deliveryFailed: true, message: FALLBACK_MESSAGE }, { status: 502 });
  }

  const relevantFields =
    formType === "privat"
      ? ["vorname", "nachname", "email", "telefon", "nachricht"]
      : ["firmenname", "ansprechpartner", "email", "telefon", "nachricht"];

  // Optional service-context, sent only by ServiceInquiry (the compact
  // per-page form) — absent entirely on the existing Dokumente upload
  // flow, so its email format is untouched when this field isn't present.
  const service = formData.get("service");
  const hasServiceContext = typeof service === "string" && service.trim().length > 0;
  const serviceLabel = hasServiceContext ? sanitizeSingleLine(service as string) : "";
  const bereich = formType === "privat" ? "Privatkunden" : "Unternehmen";

  // Optional qualifier chip from ServiceInquiry's "Worum geht es?" step —
  // one of that service's own real subtopics, or the catch-all. Absent on
  // the original Documents upload flow, same as `service` above.
  const qualifier = formData.get("qualifier");
  const hasQualifier = typeof qualifier === "string" && qualifier.trim().length > 0;
  const qualifierLabel = hasQualifier ? sanitizeSingleLine(qualifier as string) : "";

  const bodyLines: string[] = [];
  if (hasServiceContext) {
    bodyLines.push(`Service: ${serviceLabel}`, `Bereich: ${bereich}`);
    if (hasQualifier) bodyLines.push(`Anliegen: ${qualifierLabel}`);
  }
  bodyLines.push(
    ...relevantFields.map((field) => {
      const value = formData.get(field);
      if (typeof value !== "string" || value.trim().length === 0) {
        return `${FIELD_LABELS[field]}: —`;
      }
      // `nachricht` is a real multi-line textarea — only length-capped.
      // Every other field is meant to be single-line; a direct API call
      // (bypassing the UI) could otherwise smuggle newlines into it to
      // spoof extra fake "fields" in the plain-text email body.
      const display =
        field === "nachricht" ? value.trim().slice(0, MAX_MESSAGE_LENGTH) : sanitizeSingleLine(value);
      return `${FIELD_LABELS[field]}: ${display}`;
    })
  );
  bodyLines.push(`Anhänge: ${files.length}`);

  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: sanitizeFilename(file.name),
      content: Buffer.from(await file.arrayBuffer()),
    }))
  );

  try {
    const { error } = await resend.emails.send({
      from: sender,
      to: receiver,
      replyTo: typeof email === "string" && email.trim().length > 0 ? email.trim() : undefined,
      subject: hasServiceContext
        ? `Neue Beratungsanfrage: ${serviceLabel} (${bereich})`
        : `Neue Unterlagen-Anfrage (${bereich})`,
      text: bodyLines.join("\n"),
      attachments,
    });

    if (error) {
      console.error("[documents] Resend returned an error:", error);
      return NextResponse.json({ ok: false, deliveryFailed: true, message: FALLBACK_MESSAGE }, { status: 502 });
    }
  } catch (err) {
    console.error("[documents] Resend delivery threw:", err);
    return NextResponse.json({ ok: false, deliveryFailed: true, message: FALLBACK_MESSAGE }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
