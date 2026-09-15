export interface LegalSection {
  heading: string;
  lines: string[];
}

/** Phase 7M.0 — rebuilt from the client guide's exact §6.2 Impressum
 * template (the guide supplies this as final structure/wording with
 * explicit bracketed placeholders, not a rewrite target). Two corrections
 * the guide itself calls out from the old live content:
 *   1. CHE-330.617.129 is the company's UID (Unternehmens-
 *      Identifikationsnummer), NOT a FINMA registration number — the old
 *      "FINMA-Nr" label was wrong and has been removed.
 *   2. "Eingetragen im Handelsregister des Kantons Zürich" does not match
 *      the registered address (Gewerbestrasse 10, 6330 Cham — canton
 *      Zug) and must be re-verified, not silently kept as "Zürich".
 * Every `[BRACKETED]` value below is a placeholder from the guide itself,
 * NOT invented here — see docs/CLIENT_GUIDE_MERGE.md §18 for the full
 * pending-placeholder checklist. Go-live requires all of these resolved. */
export const impressum = {
  title: "Impressum",
  sections: [
    {
      heading: "Firmenangaben",
      lines: ["[VOLLSTÄNDIGE FIRMA GEMÄSS HANDELSREGISTER]", "Gewerbestrasse 10", "6330 Cham", "Schweiz"],
    },
    { heading: "Kontakt", lines: ["Telefon: [TELEFONNUMMER VERIFIZIERT]", "E-Mail: info@neosura.ch"] },
    {
      heading: "Handelsregister",
      lines: ["Eingetragen im Handelsregister des Kantons [KANTON GEMÄSS HR-AUSZUG]", "UID: CHE-330.617.129"],
    },
    {
      heading: "Aufsichtsbehörde",
      lines: [
        "Eidgenössische Finanzmarktaufsicht FINMA",
        "Ungebundener Versicherungsvermittler nach Art. 40 Abs. 2 VAG",
        "FINMA-Registernummer (Vermittlerregister): [FINMA-REGISTERNUMMER], einsehbar unter finma.ch",
      ],
    },
    {
      heading: "Vertretungsberechtigte Person",
      lines: ["[NAME GESCHÄFTSFÜHRUNG]"],
    },
  ] satisfies LegalSection[],
};

/** Phase 7Y — STATUS: LAUNCH BLOCKER — FINAL CLIENT LEGAL DRAFT / TOOL
 * LIST REQUIRED. Sections 1-3 and 7-8 are verbatim from the live
 * neosura.ch site (hidden Datenschutzerklärung modal content), unchanged
 * since the original transcription. Sections 4-6 are NEW this phase —
 * added only where directly verifiable from this project's own real,
 * running code (not drafted as if they were the client's final legal
 * text):
 * - §4 (uploaded documents): verified directly in
 *   `app/api/documents/route.ts` / `app/api/schadenfall/route.ts` — both
 *   hold files only as an in-memory `Buffer` for the duration of the one
 *   request (`Buffer.from(await file.arrayBuffer())`), attach them to a
 *   single outgoing e-mail, and write nothing to disk or a database. No
 *   retention period is stated beyond "not stored" since none exists to
 *   state.
 * - §5 (tools actually used): a repo-wide search this phase found
 *   exactly one third-party processor — Resend (`lib/email/resend.ts`)
 *   for outbound e-mail — and zero analytics/ad-tracking scripts
 *   anywhere in the codebase. No newsletter provider is integrated (a
 *   separate, already-documented project-wide launch blocker). No
 *   cookie-consent banner was added — per this phase's own "don't add
 *   one just for appearance" rule, since there is no non-essential
 *   tracking to disclose. The Google Maps embed added to `/kontakt`
 *   this same phase (`ContactInfoPanel`) is the one genuine third-party
 *   resource load on the site and is disclosed here.
 * - §6 (EDÖB): the Federal Data Protection and Information Commissioner
 *   is the standard, universally-applicable Swiss complaints body for
 *   any controller — not NEOSURA-specific information requiring client
 *   verification, so stating it doesn't require a client-supplied fact.
 * Still outstanding before this page is launch-ready: hosting
 * provider/location (not present anywhere in this repository's own
 * config, so not stated — see docs/legal-launch-blockers.md), a
 * complete client-confirmed tool list beyond what this project's own
 * code already proves, and the client's own final legal draft language
 * (this content remains a good-faith, code-verified placeholder, not a
 * claim of legal completeness). */
export const datenschutz = {
  title: "Datenschutzerklärung",
  sections: [
    {
      heading: "1. Verantwortliche Stelle",
      lines: ["neosura, Gewerbestrasse 10, 6330 Cham, Schweiz", "E-Mail: info@neosura.ch"],
    },
    {
      heading: "2. Erhebung und Verarbeitung von Daten",
      lines: [
        "Wir erheben personenbezogene Daten nur, wenn Sie uns diese freiwillig mitteilen, beispielsweise bei einer Kontaktanfrage, einer Schadenmeldung oder beim Hochladen von Dokumenten zur Analyse.",
      ],
    },
    {
      heading: "3. Verwendung der Daten",
      lines: [
        "Ihre Daten werden ausschliesslich zur Bearbeitung Ihrer Anfrage und zur Erbringung unserer Dienstleistungen verwendet und nicht an Dritte weitergegeben, ausser Sie beauftragen uns damit (z. B. zur Einreichung bei einer Versicherungsgesellschaft).",
      ],
    },
    {
      heading: "4. Hochgeladene Unterlagen und Schadenmeldungen",
      lines: [
        "Dokumente, die Sie über die Analyse- oder Schadenfall-Formulare einreichen, werden ausschliesslich zur Bearbeitung Ihrer Anfrage per E-Mail an uns übermittelt. Sie werden nicht dauerhaft auf unseren Servern gespeichert.",
      ],
    },
    {
      heading: "5. Eingesetzte Dienste",
      lines: [
        "Für den Versand von Formular- und Dokumenteneingaben per E-Mail nutzen wir den Dienst Resend. Für die Standortkarte auf der Kontaktseite wird eine Karte von Google Maps eingebunden; dabei kann eine Verbindung zu Google-Servern hergestellt werden, für die die Datenschutzbestimmungen von Google gelten. Wir setzen keine Analyse- oder Werbe-Tracking-Dienste ein.",
      ],
    },
    {
      heading: "6. Beschwerderecht",
      lines: [
        "Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren, in der Schweiz beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB).",
      ],
    },
    {
      heading: "7. Datensicherheit",
      lines: [
        "Wir setzen technische und organisatorische Sicherheitsmassnahmen ein, um Ihre Daten gegen Manipulation, Verlust, Zerstörung oder unbefugten Zugriff zu schützen.",
      ],
    },
    {
      heading: "8. Ihre Rechte",
      lines: [
        "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten.",
      ],
    },
  ] satisfies LegalSection[],
};
