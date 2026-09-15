import { NextResponse } from "next/server";
import { getResendClient } from "@/lib/email/resend";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ACCEPTED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXT_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
/** Honeypot field name — a real input in the form, hidden from sighted
 * users via CSS (not `type="hidden"`, which most bots skip filling) and
 * out of the tab order. Any value here means a bot filled every field
 * indiscriminately; the request is accepted with a 200 so the bot gets
 * no signal to adapt, but no email is ever sent. */
const HONEYPOT_FIELD = "webseite";

const FALLBACK_MESSAGE =
  "Die Übermittlung ist derzeit nicht möglich. Bitte melden Sie den Schaden direkt an info@neosura.ch.";

const FIELD_LABELS: Record<string, string> = {
  vorname: "Vorname",
  nachname: "Nachname",
  email: "E-Mail",
  telefon: "Telefon",
  versicherung: "Versicherung/Police",
  schadendatum: "Schadendatum",
  beschreibung: "Beschreibung",
};

function hasAcceptedExtension(filename: string): boolean {
  const lower = filename.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function sanitizeSingleLine(value: string, maxLength = MAX_TEXT_FIELD_LENGTH): string {
  return value.replace(/[\r\n\x00-\x1f]+/g, " ").trim().slice(0, maxLength);
}

function sanitizeFilename(name: string): string {
  const cleaned = name.replace(/[\r\n\x00-\x1f]/g, "").trim();
  return cleaned.slice(0, 150) || "Datei";
}

/** Validates and delivers a claims report by email via Resend — same
 * security posture as `app/api/documents/route.ts` (double MIME+
 * extension check, per-file and total upload caps, header-injection-safe
 * field sanitization, no permanent file storage — attachments exist only
 * in memory for this request). `ok: true` is returned ONLY once Resend
 * has confirmed the send; any other outcome (missing config, provider
 * error) returns `deliveryFailed: true` with the same honest fallback-
 * email message, so the UI never claims a report was received when it
 * wasn't.
 *
 * Spam mitigation: a honeypot field (`webseite`) invisible to sighted
 * users and removed from the tab order in the real form — a filled value
 * means an automated submission, silently accepted (200, no error
 * revealed) but never actually emailed. This is a genuine, documented
 * mechanism, not a client-only check: enforced here, server-side, so it
 * cannot be bypassed by calling this endpoint directly. */
export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot: accept silently, deliver nothing.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const errors: Record<string, string> = {};
  const requiredFields = ["vorname", "nachname", "email", "versicherung", "schadendatum", "beschreibung"];

  for (const field of requiredFields) {
    const value = formData.get(field);
    if (typeof value !== "string" || value.trim().length === 0) {
      errors[field] = "Pflichtfeld.";
    }
  }

  if (formData.get("consent") !== "on") {
    errors.consent = "Bitte bestätigen Sie die Datenschutzerklärung.";
  }

  const email = formData.get("email");
  if (typeof email === "string" && email.trim().length > 0 && !EMAIL_RE.test(email.trim())) {
    errors.email = "Bitte eine gültige E-Mail-Adresse angeben.";
  }

  const schadendatum = formData.get("schadendatum");
  if (typeof schadendatum === "string" && schadendatum.trim().length > 0) {
    const parsed = new Date(schadendatum);
    const today = new Date();
    if (Number.isNaN(parsed.getTime()) || parsed > today) {
      errors.schadendatum = "Bitte ein gültiges, nicht in der Zukunft liegendes Datum angeben.";
    }
  }

  const files = formData.getAll("dateien").filter((f): f is File => f instanceof File && f.size > 0);
  let totalSize = 0;
  for (const file of files) {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      errors.dateien = `Datei "${file.name}" überschreitet 10 MB.`;
      break;
    }
    if (!hasAcceptedExtension(file.name) || (file.type && !ACCEPTED_TYPES.includes(file.type))) {
      errors.dateien = `Datei "${file.name}" hat ein nicht unterstütztes Format.`;
      break;
    }
    totalSize += file.size;
  }
  if (!errors.dateien && totalSize > MAX_TOTAL_ATTACHMENT_BYTES) {
    errors.dateien = "Die Gesamtgrösse aller Dateien überschreitet 20 MB. Bitte reduzieren Sie die Anzahl der Anhänge.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const resend = getResendClient();
  const sender = process.env.CONTACT_FROM_EMAIL;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || "info@neosura.ch";

  if (!resend || !sender) {
    console.error("[schadenfall] delivery not configured — missing RESEND_API_KEY and/or CONTACT_FROM_EMAIL env var(s).");
    return NextResponse.json({ ok: false, deliveryFailed: true, message: FALLBACK_MESSAGE }, { status: 502 });
  }

  const bodyLines: string[] = requiredFields
    .filter((f) => f !== "beschreibung")
    .map((field) => {
      const value = formData.get(field);
      const display = typeof value === "string" ? sanitizeSingleLine(value) : "—";
      return `${FIELD_LABELS[field]}: ${display}`;
    });
  const telefon = formData.get("telefon");
  bodyLines.push(`Telefon: ${typeof telefon === "string" && telefon.trim() ? sanitizeSingleLine(telefon) : "—"}`);
  const beschreibung = formData.get("beschreibung");
  bodyLines.push(
    `Beschreibung:\n${typeof beschreibung === "string" ? beschreibung.trim().slice(0, MAX_MESSAGE_LENGTH) : "—"}`
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
      subject: "Neue Schadenmeldung",
      text: bodyLines.join("\n"),
      attachments,
    });

    if (error) {
      console.error("[schadenfall] Resend returned an error:", error);
      return NextResponse.json({ ok: false, deliveryFailed: true, message: FALLBACK_MESSAGE }, { status: 502 });
    }
  } catch (err) {
    console.error("[schadenfall] Resend delivery threw:", err);
    return NextResponse.json({ ok: false, deliveryFailed: true, message: FALLBACK_MESSAGE }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
