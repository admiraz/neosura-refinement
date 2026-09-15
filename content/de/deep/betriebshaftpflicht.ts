/** Phase 7M.1 — client guide §4.9 verbatim copy applied: Deckung → risiken
 * (topic match: Personen-/Sach-/Vermögensschäden), Branchen → situation
 * (topic match: branchenspezifische Risiken/Tarife, closer fit than folgen).
 * folgen left untouched as the file's remaining generic block; no FAQ
 * supplied by guide for this page. problem/comparison/process left on
 * existing approved copy (guide silent for those slots).
 * Deep-page content for /unternehmen/betriebshaftpflicht. General
 * liability-insurance concepts only (Personen-/Sach-/Vermögensschaden) —
 * no statutory obligation is claimed, no coverage limits or premiums.
 *
 * Phase 7K — `h1`/`intro`/`heroItems` added, `situation.checklist` added.
 * `h1` reuses `businessServices[0].title` verbatim; `intro` reuses
 * `businessServices[0].body` verbatim (the already-approved §4.8 tile
 * copy for this exact service). `heroItems` are NOT new invented content
 * — each title/body pair is the existing approved `comparison.rows[0]`
 * cell for that column, copied verbatim (Personenschaden/Sachschaden/
 * Vermögensschaden definitions), just surfaced early as a compact
 * hero-level summary of the three damage categories the full comparison
 * module explains again further down the page. `situation.checklist` is
 * a STRUCTURALLY DERIVED 3-item split of the existing approved
 * `situation.paragraphs[0]` sentence's own named industry list — no
 * industry is added that isn't already named in that sentence. */
export const betriebshaftpflichtDeep = {
  h1: "Betriebshaftpflicht",
  intro: "Schutz vor Personen-, Sach- und Vermögensschäden gegenüber Dritten.",
  heroItems: [
    { title: "Personenschaden", body: "Verletzung oder Tod von Personen" },
    { title: "Sachschaden", body: "Beschädigung oder Zerstörung von Sachen" },
    { title: "Vermögensschaden", body: "Finanzieller Schaden ohne Personen- oder Sachschaden" },
  ],
  problem: {
    statement:
      "Ist die bestehende Betriebshaftpflicht wirklich auf die aktuellen Risiken des Unternehmens abgestimmt — oder stammt sie noch aus der Gründungsphase?",
    response: "Wir prüfen es strukturiert.",
  },
  risiken: {
    eyebrow: "Betriebliche Haftungsrisiken",
    heading: "Betriebliche Haftungsrisiken",
    paragraphs: [
      "Versichert sind Personen- und Sachschäden gegenüber Dritten, je nach Branche ergänzt um Vermögensschäden, Produktehaftpflicht oder Berufshaftpflicht für beratende Berufe. Wir definieren Deckungssumme und Bausteine anhand Ihres konkreten Risikos, nicht anhand eines Standardpakets.",
    ],
    checklist: [
      "Deckt Personen-, Sach- und Vermögensschäden gegenüber Dritten",
      "Risikoprofil hängt von Branche und Tätigkeit ab",
      "Individuelle Einschätzung statt Pauschallösung",
    ],
  },
  folgen: {
    eyebrow: "Finanzielle Folgen",
    heading: "Finanzielle Folgen",
    paragraphs: [
      "Haftungsfälle können neben den direkten Schadenskosten auch Folgekosten auslösen — etwa durch Verfahrenskosten oder Betriebsunterbrüche im Zusammenhang mit der Schadensabwicklung.",
      "Eine strukturierte Absicherung reduziert nicht nur das finanzielle Risiko, sondern schafft auch Klarheit darüber, welche Fälle tatsächlich gedeckt sind.",
    ],
    checklist: [
      "Direkte und indirekte finanzielle Folgen möglich",
      "Klarheit über Deckungsumfang reduziert Unsicherheit",
      "Strukturierte Absicherung statt Einzelverträge",
    ],
  },
  situation: {
    eyebrow: "Ihre Unternehmenssituation",
    heading: "Ihre Unternehmenssituation",
    paragraphs: [
      "Bau und Handwerk, Gastronomie, Handel, Transport, Dienstleistung und Beratung: Jede Branche hat eigene Risiken und eigene Tarife. Als Broker holen wir mehrere Offerten ein und verhandeln die Konditionen.",
    ],
    checklist: ["Bau und Handwerk", "Gastronomie und Handel", "Transport, Dienstleistung und Beratung"],
  },
  comparison: {
    heading: "Schadensarten im Überblick",
    intro: "Betriebshaftpflicht unterscheidet grundsätzlich drei Schadenskategorien.",
    columnHeaders: ["Personenschaden", "Sachschaden", "Vermögensschaden"],
    rows: [
      { label: "Beschreibung", cells: ["Verletzung oder Tod von Personen", "Beschädigung oder Zerstörung von Sachen", "Finanzieller Schaden ohne Personen- oder Sachschaden"] },
    ],
  },
  process: {
    heading: "Unser Ansatz bei Betriebshaftpflicht",
    steps: [
      { num: "01", title: "Analyse", body: "Wir analysieren Ihre betriebliche Tätigkeit und die damit verbundenen Haftungsrisiken." },
      { num: "02", title: "Struktur", body: "Daraus entwickeln wir eine strukturierte Absicherung, die zu Branche und Unternehmensgrösse passt." },
      { num: "03", title: "Begleitung", body: "Wir begleiten Sie auch bei Wachstum oder Veränderung Ihres Geschäftsmodells weiter." },
    ],
  },
  faq: [
    {
      question: "Ist eine Betriebshaftpflichtversicherung gesetzlich vorgeschrieben?",
      answer: "Für die meisten Branchen besteht keine generelle gesetzliche Pflicht, dennoch gehört sie zu den grundlegenden Absicherungen für Unternehmen jeder Grösse.",
    },
    {
      question: "Was deckt eine Betriebshaftpflichtversicherung?",
      answer: "Sie schützt vor Forderungen Dritter bei Personen-, Sach- oder Vermögensschäden, die im Zusammenhang mit der Geschäftstätigkeit entstehen.",
    },
    {
      question: "Wie wird das passende Deckungsniveau bestimmt?",
      answer: "Wir analysieren gemeinsam Branche, Tätigkeit und Unternehmensgrösse, um eine individuell passende Struktur zu entwickeln.",
    },
    {
      question: "Was passiert bei Unternehmenswachstum?",
      answer: "Wir begleiten Sie weiter und passen die Absicherung an, wenn sich Tätigkeit oder Grösse Ihres Unternehmens verändern.",
    },
    {
      question: "Wie unterstützt neosura mich?",
      answer: "Wir strukturieren Ihre Haftpflichtlösung individuell, statt auf eine pauschale Standarddeckung zurückzugreifen.",
    },
  ],
};
