/** Phase 7M.1 — client guide §4.13 verbatim copy applied: Vorteile →
 * mobilitaet (topic match: both describe Fahrzeugwechsel/Neuzugänge/
 * Ausscheidungen in the fleet), Schadenmanagement → schutz (topic match:
 * both describe fast claims handling to minimize business disruption).
 * flotten left untouched as the file's remaining generic block (guide
 * assumed only two blocks for this page); no FAQ supplied by guide for this
 * page. problem/comparison/process left on existing approved copy (guide
 * silent for those slots).
 * Deep-page content for /unternehmen/flottenversicherung. Reuses the same
 * verified Motorfahrzeug-Haftpflicht mandatory-status fact as the private
 * Fahrzeug page — see docs/service-content-sources.md. No fleet sizes,
 * premiums, or savings figures are stated.
 *
 * Phase 7L — `h1`/`intro`/`heroItems` added, `schutz.checklist` added.
 * `h1` reuses `businessServices[1].title` verbatim; `intro` reuses
 * `businessServices[1].body` verbatim (§4.8 tile copy). `heroItems` are
 * the existing approved `comparison.rows` labels + their "Flottenlösung"
 * column cell, verbatim — the same "surface the comparison table's own
 * cells as a compact hero preview" pattern already used on
 * Betriebshaftpflicht (Phase 7K), not new copy. `schutz.checklist` is a
 * STRUCTURALLY DERIVED 3-item split of `schutz.paragraphs[0]`'s own three
 * clauses — no claim added beyond what that one sentence already states
 * (no discount, no response-time, no assistance-hotline claim). */
export const flottenversicherungDeep = {
  h1: "Flotten",
  intro: "Firmenfahrzeuge effizient und einheitlich versichert.",
  heroItems: [
    { title: "Verwaltung", body: "Gebündelt für die gesamte Flotte" },
    { title: "Übersicht", body: "Zentral einsehbar" },
    { title: "Sinnvoll bei", body: "Mehreren Firmenfahrzeugen" },
  ],
  problem: {
    statement:
      "Wachsen Fuhrpark und Versicherungsstruktur wirklich im gleichen Tempo — oder verwaltet das Unternehmen längst mehr Fahrzeuge, als die bestehende Police sinnvoll abdeckt?",
    response: "Wir strukturieren das neu.",
  },
  flotten: {
    eyebrow: "Firmenfahrzeuge & Flotten",
    heading: "Firmenfahrzeuge & Flotten",
    paragraphs: [
      "Auch für Firmenfahrzeuge gilt: Die Motorfahrzeug-Haftpflichtversicherung ist gesetzlich vorgeschrieben. Bei mehreren Fahrzeugen kommt zusätzlich die Frage der einheitlichen Verwaltung hinzu — einzelne Policen pro Fahrzeug sind oft weniger effizient als eine koordinierte Flottenlösung.",
      "Eine Flottenversicherung bündelt mehrere Fahrzeuge unter einer gemeinsamen Struktur und vereinfacht damit Verwaltung, Übersicht und Schadenprozesse.",
    ],
    checklist: [
      "Haftpflichtversicherung pro Fahrzeug gesetzlich vorgeschrieben",
      "Bündelung mehrerer Fahrzeuge reduziert Verwaltungsaufwand",
      "Einheitliche Struktur statt vieler Einzelpolicen",
    ],
  },
  mobilitaet: {
    eyebrow: "Fahrer, Nutzung & Mobilität",
    heading: "Fahrer, Nutzung & Mobilität",
    paragraphs: [
      "Neue Fahrzeuge werden unkompliziert in den Vertrag aufgenommen, ausscheidende abgemeldet. Die Prämie richtet sich nach dem Schadenverlauf der ganzen Flotte, mit Verhandlungsspielraum, den wir für Sie nutzen.",
    ],
    checklist: [
      "Nutzungsart beeinflusst passende Struktur",
      "Klare Prozesse bei Fahrzeugwechseln",
      "Reduzierter administrativer Aufwand",
    ],
  },
  schutz: {
    eyebrow: "Verlässlicher Schutz",
    heading: "Verlässlicher Schutz",
    paragraphs: [
      "Wir übernehmen die Schadenabwicklung mit der Gesellschaft, damit Ihre Fahrzeuge schnell wieder auf der Strasse sind und Ihr Team nicht mit Formularen beschäftigt ist.",
    ],
    checklist: [
      "Schadenabwicklung mit der Versicherungsgesellschaft",
      "Fahrzeuge schnell wieder auf der Strasse",
      "Kein Formularaufwand für Ihr Team",
    ],
  },
  comparison: {
    heading: "Einzelpolice und Flottenlösung im Überblick",
    intro: "Ab mehreren Firmenfahrzeugen lohnt sich meist eine gebündelte Struktur.",
    columnHeaders: ["Einzelpolice pro Fahrzeug", "Flottenlösung"],
    rows: [
      { label: "Verwaltung", cells: ["Separat pro Fahrzeug", "Gebündelt für die gesamte Flotte"] },
      { label: "Übersicht", cells: ["Einzeln zu prüfen", "Zentral einsehbar"] },
      { label: "Sinnvoll bei", cells: ["Einzelfahrzeug oder sehr kleiner Flotte", "Mehreren Firmenfahrzeugen"] },
    ],
  },
  process: {
    heading: "Unser Ansatz bei der Flottenversicherung",
    steps: [
      { num: "01", title: "Analyse", body: "Wir erfassen Ihre Fahrzeuge, deren Nutzung und die bestehende Versicherungsstruktur." },
      { num: "02", title: "Struktur", body: "Daraus entwickeln wir eine koordinierte Flottenlösung mit klaren Prozessen." },
      { num: "03", title: "Begleitung", body: "Wir begleiten Sie auch bei Erweiterung oder Veränderung Ihrer Flotte weiter." },
    ],
  },
  faq: [
    {
      question: "Ist eine Haftpflichtversicherung für Firmenfahrzeuge Pflicht?",
      answer: "Ja. Wie bei privaten Fahrzeugen ist die Motorfahrzeug-Haftpflichtversicherung auch für Firmenfahrzeuge gesetzlich vorgeschrieben.",
    },
    {
      question: "Ab wie vielen Fahrzeugen lohnt sich eine Flottenlösung?",
      answer: "Das hängt von der individuellen Situation ab — bereits bei wenigen Fahrzeugen kann eine gebündelte Struktur den Verwaltungsaufwand spürbar reduzieren.",
    },
    {
      question: "Was passiert bei einem Fahrzeugwechsel innerhalb der Flotte?",
      answer: "Wir sorgen für klare Prozesse, damit Neuzugänge und Ausscheidungen unkompliziert abgewickelt werden.",
    },
    {
      question: "Wie wirkt sich ein Fahrzeugausfall auf den Betrieb aus?",
      answer: "Wir prüfen gemeinsam, welcher Schutz nötig ist, um betriebliche Mobilitätsunterbrüche möglichst gering zu halten.",
    },
    {
      question: "Wie unterstützt neosura mich?",
      answer: "Wir bündeln Ihre Firmenfahrzeuge in einer koordinierten Struktur statt vieler Einzelpolicen.",
    },
  ],
};
