/** Phase 7M.1 — `heading` and `paragraphs[0]` (the About-hero H1/intro
 * slot) replaced with the client guide's exact §4.18 copy, verbatim.
 * `paragraphs[1]` is CLIENT GUIDE SILENT for this exact page (the guide
 * gives only one intro paragraph) — existing approved copy retained;
 * `focusPrivate`/`focusBusiness` below are still derived from it. */
export const about = {
  heading: "Ein Broker, der auf Ihrer Seite sitzt.",
  paragraphs: [
    "neosura ist ein unabhängiger, im FINMA-Vermittlerregister eingetragener Versicherungsbroker mit Sitz in Cham. Wir vertreten keine Gesellschaft, sondern unsere Kundinnen und Kunden: Privatpersonen und Unternehmen in der ganzen Deutschschweiz, beraten vor Ort oder vollständig digital.",
    "Für Privatkunden schaffen wir durchdachte Absicherungskonzepte in den Bereichen Gesundheit, Wohnen & Eigentum, Mobilität, Reisen sowie Vorsorge & Vermögen. Für Unternehmen entwickeln wir nachhaltige Lösungen für Mitarbeitende, Betrieb, Flotten, Sachwerte und betriebliche Risiken — individuell abgestimmt auf Struktur, Wachstum und langfristige Ziele.",
  ],
  /** Phase 7M.1 — no longer a substring of `paragraphs[0]` (that field
   * was replaced with the client guide's §4.18 copy above); this is the
   * homepage Manifesto's own already-approved condensed body, CLIENT
   * GUIDE SILENT for that specific locked slot, so it stays unchanged. */
  shortBody:
    "Dabei verbinden wir persönliche Beratung mit einem tiefen Verständnis für den Schweizer Versicherungsmarkt und klar definierten Prozessen.",
  linkLabel: "Mehr über neosura",
  linkHref: "/ueber-uns",
  /** Verbatim substrings of `paragraphs[1]`, split at its own sentence
   * boundary — used by the About page's two-column Privatkunden/Unternehmen
   * focus section. Not new copy, just the same sentence pair rendered
   * separately instead of run together. */
  focusPrivate:
    "Für Privatkunden schaffen wir durchdachte Absicherungskonzepte in den Bereichen Gesundheit, Wohnen & Eigentum, Mobilität, Reisen sowie Vorsorge & Vermögen.",
  focusBusiness:
    "Für Unternehmen entwickeln wir nachhaltige Lösungen für Mitarbeitende, Betrieb, Flotten, Sachwerte und betriebliche Risiken — individuell abgestimmt auf Struktur, Wachstum und langfristige Ziele.",
};
