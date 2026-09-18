import { NextResponse } from "next/server";
import { getResendClient } from "@/lib/email/resend";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ACCEPTED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
/** Transport ceiling, NOT a form rule. The visible, client-approved rule is
 * per file ("mehrere Dateien möglich, max. 10 MB pro Datei"); the previous
 * 20MB total was an arbitrary self-imposed margin that contradicted it (three
 * 9MB files were rejected although each was under 10MB).
 *
 * What genuinely constrains a submission today is the temporary
 * email-attachment transport: Resend accepts at most 40MB per email measured
 * AFTER base64 encoding, which inflates bytes by ~4/3. 28MB of raw files
 * encodes to ~37.5MB and still leaves room for headers and the body. This
 * limit disappears with the email transport once the production upload
 * architecture is decided. */
const MAX_TOTAL_ATTACHMENT_BYTES = 28 * 1024 * 1024;
/** Rejected before the request body is buffered: route handlers have no
 * default body-size limit, and every file is held in memory here, so an
 * oversized POST would otherwise be read in full before validation runs.
 * Sits above the attachment ceiling to allow multipart overhead and fields. */
const MAX_REQUEST_BYTES = 30 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXT_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

const FALLBACK_MESSAGE =
  "Die Übermittlung konnte leider nicht abgeschlossen werden. Bitte versuchen Sie es später erneut.";

/** Shown only when one submission exceeds what the current transport can
 * carry — deliberately phrased as a limit of this one transmission, never as
 * a per-file rule, so it cannot contradict the visible hint. */
const TOO_LARGE_MESSAGE =
  "Diese Übermittlung ist insgesamt zu gross. Bitte teilen Sie die Dateien auf zwei Übermittlungen auf.";

const FIELD_LABELS: Record<string, string> = {
  vorname: "Vorname",
  nachname: "Nachname",
  firma: "Firma",
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
  const declaredSize = Number(request.headers.get("content-length") ?? 0);
  if (declaredSize > MAX_REQUEST_BYTES) {
    return NextResponse.json({ ok: false, message: TOO_LARGE_MESSAGE }, { status: 413 });
  }

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
  // Client review 2 §2 — the upload form posts «Firma» (`firma`); the
  // /unternehmen hero form and ServiceInquiry still post `firmenname`.
  // Whichever the submission carries is the required company field.
  const companyField = formData.has("firma") ? "firma" : "firmenname";
  const requiredFields =
    formType === "privat" ? ["vorname", "nachname", "email"] : [companyField, "ansprechpartner", "email"];

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
    errors.dokumente = TOO_LARGE_MESSAGE;
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
      : [companyField, "ansprechpartner", "email", "telefon", "nachricht"];

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
