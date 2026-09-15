/** Phase 7P — deep-page content for /unternehmen/cyber-rechtsschutz, the
 * final business deep page. `h1`/`intro`/`cyber`/`betriebsrechtsschutz`
 * are the client guide's exact §4.14 copy, verbatim, matching
 * `clientGuideCyber` in `content/de/clientGuide.ts` word-for-word (that
 * file remains the canonical source citation; this file duplicates the
 * literal text directly rather than importing it, following the same
 * self-contained convention already used by every other `deep/*.ts`
 * file in this project).
 *
 * `heroItems` are a STRUCTURALLY DERIVED title/body compression of the
 * page's own two topic paragraphs below — not new claims.
 *
 * Phase 7P.A — `cyber.checklist` changed from 3 clause-level phrases to
 * the 5 individual atomic concepts the exact §4.14 Cyber sentence names
 * (Ertragsausfall, Wiederherstellungskosten, IT-Forensik,
 * Krisenkommunikation, Haftpflichtansprüche nach Datenschutzverletzungen)
 * — none omitted, none invented. This matches the short single-concept
 * item style FINWIWO's own live `#cyber` checklist uses (and the
 * `/unternehmen` hub's own `CategoryCyberAdvantages` chip phrasing) far
 * more closely than the earlier clause-phrase version, and suits the
 * corrected `BusinessCyberContent` component's two-column layout
 * (`app/unternehmen/cyber-rechtsschutz/page.tsx`'s own docstring has the
 * full architecture-correction record). TRUTHFUL CONTENT REDUCTION FROM
 * FINWIWO CHECKLIST COUNT (6) TO CLIENT-SUPPORTED CONTENT COUNT (5).
 * `betriebsrechtsschutz.checklist` is unchanged this phase — the
 * same clause-based decomposition of that paragraph's own single sentence
 * (parties; Anwalts- und Verfahrenskosten; juristische Beratung vor dem
 * Prozess) — the last two items reuse the hub's own exact phrasing for
 * consistency; the first condenses the party list rather than the hub's
 * single-word "Rechtsstreitigkeiten" label, since this row has room for
 * the fuller, more faithful phrase.
 *
 * `heroCard` is a STRUCTURALLY DERIVED short summary connecting the two
 * coverages, built only from words already present in the H1/intro/
 * paragraphs below (Betriebsrechtsschutz's own "Mitarbeitenden, Kunden,
 * Lieferanten oder Behörden" party list, "Angriffen" from the Cyber
 * paragraph) — no new benefit, figure, or claim is added. No FAQ,
 * comparison, or info-box content exists for this topic in the client
 * guide (§4.14 supplies only the two coverage paragraphs) — none is
 * invented here. */
export const cyberRechtsschutzDeep = {
  h1: "Die neuen Betriebsrisiken sind digital und juristisch.",
  intro:
    "Ein verschlüsseltes System legt den Betrieb lahm, ein Datenleck betrifft Kundendaten, ein Lieferant zahlt nicht: Zwei Deckungen fangen diese Risiken auf.",
  heroItems: [
    { title: "Cyberversicherung", body: "Schutz bei digitalen Angriffen und Datenlecks" },
    { title: "Betriebsrechtsschutz", body: "Anwalts- und Verfahrenskosten bei rechtlichen Konflikten" },
  ],
  heroCard: {
    badge: "Cyber & Recht",
    title: "Digitale und rechtliche Risiken",
    body: "Ein digitaler Angriff und ein rechtlicher Streit mit Mitarbeitenden, Kunden, Lieferanten oder Behörden treffen Unternehmen oft unerwartet. Cyberversicherung und Betriebsrechtsschutz sichern beide Risiken ab.",
  },
  cyber: {
    heading: "Cyberversicherung",
    paragraphs: [
      "Die Cyberversicherung deckt Ertragsausfall und Wiederherstellungskosten nach Angriffen, organisiert IT-Forensik und Krisenkommunikation und übernimmt Haftpflichtansprüche nach Datenschutzverletzungen. Für KMU mit digitalen Prozessen längst keine Nische mehr.",
    ],
    checklist: ["Ertragsausfall", "Wiederherstellungskosten", "IT-Forensik", "Krisenkommunikation", "Haftpflichtansprüche nach Datenschutzverletzungen"],
  },
  betriebsrechtsschutz: {
    heading: "Betriebsrechtsschutz",
    paragraphs: [
      "Streitigkeiten mit Mitarbeitenden, Kunden, Lieferanten oder Behörden: Der Betriebsrechtsschutz übernimmt Anwalts- und Verfahrenskosten und verschafft Ihnen juristische Beratung, bevor aus einem Konflikt ein Prozess wird.",
    ],
    checklist: ["Streitigkeiten mit Mitarbeitenden, Kunden, Lieferanten oder Behörden", "Übernahme von Anwalts- und Verfahrenskosten", "Juristische Beratung vor dem Prozess"],
  },
};
