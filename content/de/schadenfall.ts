/** Phase 7T — content for the real `/schadenfall` claims form. `h1`/
 * `intro`/`steps`/`notfallbox` remain the existing `clientGuideSchadenfall`
 * (§4.17) copy, verbatim, unchanged — this file only adds the new form's
 * own UI labels/messages, following the same pattern already established
 * by `content/de/documents.ts` for the Analyse upload form. */
export const schadenfallFormContent = {
  submitLabel: "Schaden melden",
  /** Shown only once the server has confirmed the email was actually
   * delivered (see app/api/schadenfall/route.ts) — never on a bare 200. */
  successMessage: "Vielen Dank. Ihre Schadenmeldung wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.",
  errorMessage: "Die Übermittlung ist fehlgeschlagen. Bitte überprüfen Sie Ihre Angaben und versuchen Sie es erneut.",
  deliveryFailureMessage:
    "Die Übermittlung ist derzeit nicht möglich. Bitte melden Sie den Schaden direkt an info@neosura.ch.",
  accept: [".pdf", ".jpg", ".jpeg", ".png"],
  acceptAttr: ".pdf,.jpg,.jpeg,.png",
  maxSizeMb: 10,
};

export interface SchadenfallField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date";
  required: boolean;
  autoComplete?: string;
}

export const schadenfallFields: SchadenfallField[] = [
  { name: "vorname", label: "Vorname", type: "text", required: true, autoComplete: "given-name" },
  { name: "nachname", label: "Nachname", type: "text", required: true, autoComplete: "family-name" },
  { name: "email", label: "E-Mail", type: "email", required: true, autoComplete: "email" },
  { name: "telefon", label: "Telefon", type: "tel", required: false, autoComplete: "tel" },
  { name: "versicherung", label: "Betroffene Versicherung / Police", type: "text", required: true },
  { name: "schadendatum", label: "Schadendatum", type: "date", required: true },
];
