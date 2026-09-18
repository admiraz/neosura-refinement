export const documentsContent = {
  headingLines: ["Ihre Unterlagen.", "Unsere strukturierte Analyse."],
  trustLine: "SSL-verschlüsselt · Vertrauliche Behandlung Ihrer Daten",
  mascot: "/images/dokumente.webp",
  mascotMobile: "/images/dokumente-mobile.webp",
  accept: [".pdf", ".jpg", ".jpeg", ".png"],
  acceptAttr: ".pdf,.jpg,.jpeg,.png",
  maxSizeMb: 10,
  /** Client review 2 §3 — exact client wording for the upload hint. */
  uploadHint: "mehrere Dateien möglich, max. 10 MB pro Datei",
  submitLabel: "Unterlagen senden",
  /** Shown only once the server has confirmed the email was actually
   * delivered (see app/api/documents/route.ts) — never on a bare 200. */
  successMessage: "Vielen Dank. Ihre Unterlagen wurden erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.",
  /** Field-level validation failed (400) — generic fallback if no
   * specific field error is available to show instead. */
  errorMessage: "Die Übermittlung ist fehlgeschlagen. Bitte überprüfen Sie Ihre Angaben und versuchen Sie es erneut.",
  /** The submission was valid but the email provider could not be
   * reached/failed (502) — same wording the route itself returns, kept
   * here too as the client-side fallback if the response body is
   * unreadable for any reason. */
  deliveryFailureMessage:
    "Die Übermittlung konnte leider nicht abgeschlossen werden. Bitte versuchen Sie es später erneut.",
};

/** Client review 2 §1 — ONE step strip for the whole upload flow. Replaces
 * the previous pair (a desktop-only list "Unterlagen hochladen / Situation
 * analysieren / Persönliche Rückmeldung" and a mobile-only row "Upload /
 * Analyse / Begleitung"), which read as two competing step systems. Labels
 * are the client's exact wording. */
export const documentsSteps = [
  { num: "01", label: "Upload" },
  { num: "02", label: "Analyse" },
  { num: "03", label: "Rückmeldung" },
];

export interface DocumentFormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel";
  required: boolean;
  autoComplete?: string;
}

/** Field sets verbatim from the existing neosura.ch two-tab upload form. */
export const privateDocumentFields: DocumentFormField[] = [
  { name: "vorname", label: "Vorname", type: "text", required: true, autoComplete: "given-name" },
  { name: "nachname", label: "Nachname", type: "text", required: true, autoComplete: "family-name" },
  { name: "email", label: "E-Mail", type: "email", required: true, autoComplete: "email" },
  { name: "telefon", label: "Telefon", type: "tel", required: false, autoComplete: "tel" },
];

/** Client review 2 §2 — the upload form's own business fields: a mandatory
 * field labelled exactly «Firma» on the Unternehmen tab, none on the
 * Privatpersonen tab. Kept separate from `businessDocumentFields` below,
 * which other pages (the /unternehmen hero form, ServiceInquiry) still use
 * unchanged. */
export const uploadBusinessFields: DocumentFormField[] = [
  { name: "firma", label: "Firma", type: "text", required: true, autoComplete: "organization" },
  { name: "ansprechpartner", label: "Ansprechpartner", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "E-Mail", type: "email", required: true, autoComplete: "email" },
  { name: "telefon", label: "Telefon", type: "tel", required: false, autoComplete: "tel" },
];

export const businessDocumentFields: DocumentFormField[] = [
  { name: "firmenname", label: "Firmenname", type: "text", required: true, autoComplete: "organization" },
  { name: "ansprechpartner", label: "Ansprechpartner", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "E-Mail", type: "email", required: true, autoComplete: "email" },
  { name: "telefon", label: "Telefon", type: "tel", required: false, autoComplete: "tel" },
];
