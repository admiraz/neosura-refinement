/** Phase 7M.1 — client guide §4.10 verbatim copy applied to all three
 * content blocks: sachwerte (Inventar), betriebsunterbrueche
 * (Betriebsunterbruch), immobilien (Gebäude und Technik). No FAQ supplied
 * by guide for this page. problem/comparison/process left on existing
 * approved copy (guide silent for those slots).
 * Deep-page content for /unternehmen/inventar-immobilien. Gebäude-
 * versicherung's cantonal regulation is stated generally, with no single
 * canton's rule generalized to all of Switzerland — see
 * docs/service-content-sources.md. No sums insured are stated.
 *
 * Phase 7N — `h1`/`intro`/`heroItems`/`insuredObjects` added. `h1` reuses
 * `businessServices[3].title` verbatim; `intro` reuses
 * `businessServices[3].body` verbatim (§4.8 tile copy — this exact line
 * is the source of the word "Inventar" used below; the deep content
 * blocks below use "Einrichtung" instead, both are approved, neither is
 * FINWIWO's own wording). `heroItems` are a STRUCTURALLY DERIVED title/
 * body split of `sachwerte.checklist`'s own three sentences — no object,
 * peril, or figure added beyond what those sentences state.
 * `insuredObjects` is the exact four-noun list from `businessServices[3]
 * .body` ("Inventar, Waren, Maschinen, Immobilien") — verbatim words,
 * reused as compact strip labels, not a new taxonomy. No insured sum,
 * replacement-value guarantee, deductible, or coverage limit is stated
 * anywhere in this file or on this page. */
export const inventarImmobilienDeep = {
  h1: "Sachversicherung",
  intro: "Inventar, Waren, Maschinen, Immobilien und Betriebsunterbruch.",
  heroItems: [
    { title: "Schutz", body: "Von Maschinen, Einrichtung und Waren" },
    { title: "Wertentwicklung", body: "Verändert sich mit Unternehmenswachstum" },
    { title: "Versicherungssumme", body: "Regelmässige Überprüfung sinnvoll" },
  ],
  insuredObjects: ["Inventar", "Waren", "Maschinen", "Immobilien"],
  problem: {
    statement:
      "Sind betriebliche Sachwerte und Immobilien wirklich zum aktuellen Wert abgesichert, oder orientiert sich die Police noch an alten Anschaffungswerten?",
    response: "Wir aktualisieren das Bild.",
  },
  sachwerte: {
    eyebrow: "Betriebliche Sachwerte",
    heading: "Betriebliche Sachwerte",
    paragraphs: [
      "Waren, Einrichtung, Maschinen und IT gegen Feuer, Elementar, Wasser und Diebstahl, mit realistischen Versicherungssummen, damit im Schadenfall nicht gekürzt wird.",
    ],
    checklist: [
      "Schutz von Maschinen, Einrichtung und Waren",
      "Wert verändert sich mit Unternehmenswachstum",
      "Regelmässige Überprüfung der Versicherungssumme sinnvoll",
    ],
  },
  immobilien: {
    eyebrow: "Immobilien",
    heading: "Immobilien",
    paragraphs: [
      "Für Firmenliegenschaften koordinieren wir Gebäude-, Gebäudehaftpflicht- und technische Versicherungen (Maschinen, EDV, Montage) aus einer Hand.",
    ],
    checklist: [
      "Gebäudeversicherung kantonal unterschiedlich geregelt",
      "Relevanz von Gebäude, Inhalt und Nutzung gemeinsam betrachten",
      "Besonders wichtig bei spezialisierten Räumlichkeiten",
    ],
  },
  betriebsunterbrueche: {
    eyebrow: "Schäden & Betriebsunterbrüche",
    heading: "Schäden & Betriebsunterbrüche",
    paragraphs: [
      "Ersetzt entgangenen Betriebsgewinn und weiterlaufende Fixkosten wie Löhne und Miete, bis der Betrieb wieder läuft. Die am meisten unterschätzte Deckung im KMU-Bereich.",
    ],
    // Phase 7N — STRUCTURALLY DERIVED 3-item split of this block's own
    // paragraph above — no figure, limit, or duration added.
    checklist: [
      "Ersetzt entgangenen Betriebsgewinn",
      "Deckt weiterlaufende Fixkosten wie Löhne und Miete",
      "Gilt bis der Betrieb wieder läuft",
    ],
  },
  comparison: {
    heading: "Sachversicherung und Betriebsunterbrechung im Überblick",
    intro: "Beide Versicherungen greifen bei einem Schadenfall, decken aber unterschiedliche Folgen ab.",
    columnHeaders: ["Sachversicherung", "Betriebsunterbrechungsversicherung"],
    rows: [
      { label: "Deckt", cells: ["Schäden an Sachwerten und Immobilien", "Finanzielle Folgen einer betriebsbedingten Unterbrechung"] },
      { label: "Ansatzpunkt", cells: ["Wiederbeschaffung / Reparatur", "Fortführung des Geschäftsbetriebs"] },
    ],
  },
  process: {
    heading: "Unser Ansatz bei Inventar & Immobilien",
    steps: [
      { num: "01", title: "Analyse", body: "Wir erfassen Ihre betrieblichen Sachwerte, Immobiliensituation und bestehende Policen." },
      { num: "02", title: "Struktur", body: "Daraus entwickeln wir eine Struktur, die Schäden und Betriebsunterbrüche gemeinsam berücksichtigt." },
      { num: "03", title: "Begleitung", body: "Wir begleiten Sie auch bei Erweiterung oder Veränderung Ihrer Betriebsstätten weiter." },
    ],
  },
  faq: [
    {
      question: "Ist die Gebäudeversicherung in der ganzen Schweiz gleich geregelt?",
      answer: "Nein, sie ist kantonal geregelt. In einigen Kantonen bestehen kantonale Gebäudeversicherungen mit Monopolstellung, in anderen ist die Versicherung frei wählbar.",
    },
    {
      question: "Was zählt zu betrieblichen Sachwerten?",
      answer: "Dazu zählen unter anderem Maschinen, Einrichtungen, Waren und weitere bewegliche Vermögenswerte, die für den Geschäftsbetrieb notwendig sind.",
    },
    {
      question: "Was ist der Unterschied zwischen Sachversicherung und Betriebsunterbrechungsversicherung?",
      answer: "Die Sachversicherung deckt den Schaden an Sachwerten oder Immobilien selbst, die Betriebsunterbrechungsversicherung die finanziellen Folgen eines dadurch bedingten Betriebsunterbruchs.",
    },
    {
      question: "Wann sollte die Versicherungssumme überprüft werden?",
      answer: "Sinnvollerweise regelmässig und insbesondere bei Wachstum, Umbauten oder neuen Anschaffungen.",
    },
    {
      question: "Wie unterstützt neosura mich?",
      answer: "Wir analysieren Sachwerte, Immobiliensituation und Betriebsunterbrechungsrisiken gemeinsam, statt sie isoliert zu betrachten.",
    },
  ],
};
