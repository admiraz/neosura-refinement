/** Phase 7M.1 — client guide §4.5 verbatim copy applied: the guide's three-
 * column Haftpflicht/Teilkasko/Vollkasko explainer text replaces the
 * fahrzeugversicherung.checklist bullets (no dedicated three-column field
 * exists; the locked comparison table already carries these three headers
 * per ground rules, so the checklist was the closest fitting existing
 * array), and the Reisen block paragraph is replaced. fahrzeugversicherung's
 * paragraphs, assistance block, and FAQ have no guide equivalent for this
 * page and are left on existing approved copy, as are
 * problem/comparison/process.
 * Deep-page content for /privatkunden/fahrzeug-reisen. Motorfahrzeug-
 * Haftpflicht mandatory status is sourced per docs/service-content-sources.md
 * (Swiss road traffic law / Kausalhaftung). No coverage limits, premiums,
 * or percentages are stated.
 *
 * Phase 7H — no fresh verbatim client-guide H1/intro was supplied for this
 * specific phase (unlike Krankenkasse/Wohnen & Eigentum, which each
 * received exact new page-level copy). `h1`/`intro` therefore reuse the
 * already-approved `privateServices[2]` tile title/body verbatim (plain,
 * factual, not an invented marketing sentence) rather than manufacturing
 * new headline copy. `heroItems` are UI LABEL DERIVED FROM CLIENT COPY
 * (short summaries of the three existing approved blocks below).
 * `reisen.checklist` is newly added — three phrases lifted directly from
 * the reisen paragraph's own named concepts (Annullierungskosten/
 * Personenassistance/Auslandschutz), not invented. */
export const fahrzeugReisenDeep = {
  h1: "Fahrzeug & Reisen",
  intro: "Auto, Motorrad, Ferien. Passender Schutz unterwegs, ohne überflüssige Zusätze.",
  heroItems: [
    {
      title: "Fahrzeugversicherung",
      body: "Haftpflicht, Teilkasko und Vollkasko für Ihr Fahrzeug.",
    },
    {
      title: "Assistance",
      body: "Pannenhilfe und Unterstützung bei Fahrzeugausfall.",
    },
    {
      title: "Reisen",
      body: "Schutz vor internationalen Risiken auf Reisen.",
    },
  ],
  problem: {
    statement:
      "Ist das eigene Fahrzeug wirklich passend versichert — oder deckt die Police längst nicht mehr das, was heute zählt?",
    response: "Wir klären das gemeinsam.",
  },
  fahrzeugversicherung: {
    eyebrow: "Fahrzeugversicherung",
    heading: "Fahrzeugversicherung",
    paragraphs: [
      "Die Motorfahrzeug-Haftpflichtversicherung ist in der Schweiz gesetzlich vorgeschrieben: Wer ein Fahrzeug betreibt, muss dafür eine Haftpflichtversicherung abschliessen, die Schäden gegenüber Dritten abdeckt.",
      "Teilkasko und Vollkasko sind freiwillige Ergänzungen, die zusätzlich das eigene Fahrzeug schützen — etwa gegen Diebstahl, Glasbruch, Naturereignisse oder selbstverschuldete Unfälle.",
    ],
    checklist: [
      "Gesetzlich vorgeschrieben. Deckt Schäden, die Sie mit dem Fahrzeug anderen zufügen.",
      "Deckt Diebstahl, Glasbruch, Marder, Hagel und weitere Ereignisse ohne eigenes Verschulden.",
      "Zusätzlich Kollisionsschäden am eigenen Fahrzeug. Sinnvoll bei neuen oder geleasten Fahrzeugen.",
    ],
  },
  assistance: {
    eyebrow: "Assistance",
    heading: "Assistance",
    paragraphs: [
      "Assistance-Leistungen greifen bei Panne, Unfall oder Fahrzeugausfall — von der Pannenhilfe vor Ort bis zur Organisation von Ersatzmobilität.",
      "Gerade bei regelmässiger Nutzung des Fahrzeugs im Alltag oder auf längeren Strecken macht eine passende Assistance-Deckung einen spürbaren Unterschied.",
    ],
    checklist: [
      "Pannenhilfe und Unfallunterstützung",
      "Organisation von Ersatzmobilität",
      "Sinnvoll bei regelmässiger Fahrzeugnutzung",
    ],
  },
  reisen: {
    eyebrow: "Reisen & internationale Risiken",
    heading: "Reisen & internationale Risiken",
    paragraphs: [
      "Annullierungskosten, Personenassistance, Auslandschutz. Wir prüfen zuerst, was Ihre bestehenden Policen bereits abdecken, bevor Sie doppelt bezahlen.",
    ],
    // Phase 7H — the three named concepts from the paragraph itself,
    // verbatim nouns, directly traceable (newly added; no checklist
    // previously existed for this block).
    checklist: ["Annullierungskosten", "Personenassistance", "Auslandschutz"],
  },
  comparison: {
    heading: "Haftpflicht, Teilkasko und Vollkasko im Überblick",
    intro: "Die drei Deckungsarten bauen aufeinander auf und unterscheiden sich im Umfang.",
    columnHeaders: ["Haftpflicht", "Teilkasko", "Vollkasko"],
    rows: [
      { label: "Versicherungspflicht", cells: ["Gesetzlich vorgeschrieben", "Freiwillig", "Freiwillig"] },
      { label: "Deckt Schäden an", cells: ["Dritten", "Eigenem Fahrzeug (Diebstahl, Glasbruch, Naturereignisse)", "Eigenem Fahrzeug inkl. selbstverschuldeter Unfälle"] },
    ],
  },
  process: {
    heading: "Unser Ansatz bei Fahrzeug & Reisen",
    steps: [
      { num: "01", title: "Analyse", body: "Wir prüfen Ihre bestehende Fahrzeugversicherung sowie Ihr Mobilitäts- und Reiseverhalten." },
      { num: "02", title: "Struktur", body: "Daraus entwickeln wir eine Struktur, die Fahrzeuge, Assistance und internationale Risiken sinnvoll verbindet." },
      { num: "03", title: "Begleitung", body: "Wir begleiten Sie auch bei neuen Fahrzeugen oder veränderten Reisegewohnheiten weiter." },
    ],
  },
  faq: [
    {
      question: "Ist eine Haftpflichtversicherung fürs Auto Pflicht?",
      answer: "Ja. In der Schweiz ist die Motorfahrzeug-Haftpflichtversicherung gesetzlich vorgeschrieben — ohne sie darf kein Fahrzeug betrieben werden.",
    },
    {
      question: "Brauche ich zusätzlich eine Kaskoversicherung?",
      answer: "Teilkasko und Vollkasko sind freiwillig. Sinnvoll sind sie insbesondere bei neueren oder hochwertigen Fahrzeugen.",
    },
    {
      question: "Was deckt Assistance?",
      answer: "Assistance-Leistungen unterstützen bei Panne oder Unfall — etwa mit Pannenhilfe vor Ort oder der Organisation von Ersatzmobilität.",
    },
    {
      question: "Brauche ich eine Reiseversicherung zusätzlich zur Fahrzeugversicherung?",
      answer: "Das hängt von der individuellen Reise- und Mobilitätssituation ab. Wir prüfen gemeinsam, welcher Schutz für internationale Risiken sinnvoll ist.",
    },
    {
      question: "Wie unterstützt neosura mich?",
      answer: "Wir koordinieren Fahrzeug-, Assistance- und Reiseschutz zu einer strukturierten Lösung statt einzelner, unabhängiger Policen.",
    },
  ],
};
