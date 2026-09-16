export const documentsContent = {
  headingLines: ["Ihre Unterlagen.", "Unsere strukturierte Analyse."],
  trustLine: "SSL-verschlüsselt · Vertrauliche Behandlung Ihrer Daten",
  mascot: "/images/dokumente.webp",
  mascotMobile: "/images/dokumente-mobile.webp",
  accept: [".pdf", ".jpg", ".jpeg", ".png"],
  acceptAttr: ".pdf,.jpg,.jpeg,.png",
  maxSizeMb: 10,
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
    "Die Übermittlung ist derzeit nicht möglich. Bitte senden Sie Ihre Unterlagen direkt an info@neosura.ch.",
};

/** Fills the desktop left column meaningfully instead of mascot artwork —
 * derived only from existing Process/Documents wording, no invented
 * promises or response-time claims. */
export const documentsHelperSteps = [
  { num: "01", label: "Unterlagen hochladen" },
  { num: "02", label: "Situation analysieren" },
  { num: "03", label: "Persönliche Rückmeldung" },
];

/** Shorter labels for the compact mobile block above the audience tabs. */
export const documentsHelperStepsCompact = [
  { num: "01", label: "Upload" },
  { num: "02", label: "Analyse" },
  { num: "03", label: "Begleitung" },
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

export const businessDocumentFields: DocumentFormField[] = [
  { name: "firmenname", label: "Firmenname", type: "text", required: true, autoComplete: "organization" },
  { name: "ansprechpartner", label: "Ansprechpartner", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "E-Mail", type: "email", required: true, autoComplete: "email" },
  { name: "telefon", label: "Telefon", type: "tel", required: false, autoComplete: "tel" },
];
