/** Phase 7M.1 — hausrat/haftung paragraphs replaced with client guide §4.4
 * verbatim copy (Hausrat, Privathaftpflicht). No FAQ supplied by guide for
 * this page. problem/wohnsituation/comparison/process left on existing
 * approved copy (guide silent for those slots) — none of these are rendered
 * on the live route as of Phase 7G (see docs/finwiwo-architecture/
 * deep-wohnen-eigentum.md for the full module-classification record).
 * Deep-page content for /privatkunden/wohnen-eigentum. Hausrat and
 * Privathaftpflicht are correctly described as not federally mandatory —
 * see docs/service-content-sources.md. No sums insured or premiums stated.
 *
 * Phase 7G — `h1`/`intro` added (guide's exact page-level copy, previously
 * missing from this file) and the `gebaeude` block added (the guide's third
 * "Gebäude" paragraph, previously skipped in 7M.1 because no matching field
 * existed in this file's structure — now added verbatim). `hausrat.checklist`
 * and `haftung.checklist` were also revised to be more directly traceable to
 * the exact client paragraph wording (the 7M.1 versions were more abstract,
 * guide-silent derivations) — see each block's own inline note. */
export const wohnenEigentumDeep = {
  h1: "Zuhause gut versichert.",
  intro:
    "Hausrat und Privathaftpflicht gehören zu den günstigsten Versicherungen überhaupt und zu den wichtigsten. Wir sorgen dafür, dass die Summen stimmen und nichts doppelt läuft.",
  problem: {
    statement:
      "Ist der Hausrat wirklich noch zum aktuellen Wert versichert, und deckt die Haftpflicht auch tatsächlich die eigene Wohnsituation ab?",
    response: "Wir prüfen es genau.",
  },
  hausrat: {
    eyebrow: "Hausrat",
    heading: "Hausrat",
    paragraphs: [
      "Deckt Ihr Hab und Gut bei Feuer, Wasser, Diebstahl und Glasbruch. Entscheidend ist die richtige Versicherungssumme: Ist sie zu tief, wird im Schadenfall anteilig gekürzt. Wir rechnen Ihren Hausrat realistisch durch.",
    ],
    // Phase 7G — the four named perils from the paragraph itself, verbatim
    // nouns, directly traceable (not the more abstract 7M.1 structural list).
    checklist: ["Feuer", "Wasser", "Diebstahl", "Glasbruch"],
  },
  haftung: {
    eyebrow: "Haftung",
    heading: "Haftung",
    paragraphs: [
      "Zahlt, wenn Sie Dritten Schaden zufügen, vom umgestossenen Smartphone bis zum Mietschaden beim Auszug. Für Mieterinnen und Mieter faktisch unverzichtbar.",
    ],
    // Phase 7G — UI LABEL DERIVED FROM CLIENT COPY: three phrases derived
    // directly from the paragraph's own clauses (not FINWIWO's own
    // "Personen-/Sach-/Vermögensschäden" categorization, which the client
    // paragraph does not itself state).
    checklist: [
      "Schäden, die Sie Dritten zufügen",
      "Inklusive Mietschäden beim Auszug",
      "Besonders wichtig für Mieterinnen und Mieter",
    ],
  },
  gebaeude: {
    eyebrow: "Gebäudeversicherung",
    heading: "Gebäudeversicherung",
    paragraphs: [
      "Für Eigentümerinnen und Eigentümer koordinieren wir kantonale Gebäudeversicherung, ergänzende Wasser- und Elementardeckungen sowie die Gebäudehaftpflicht, abgestimmt auf Ihre Liegenschaft.",
    ],
    // Phase 7G — UI LABEL DERIVED FROM CLIENT COPY: the three coverage
    // concepts named in the paragraph itself, as short traceable phrases.
    checklist: [
      "Kantonale Gebäudeversicherung",
      "Ergänzende Wasser- und Elementardeckungen",
      "Gebäudehaftpflicht",
    ],
  },
  // Phase 7G — UI LABEL DERIVED FROM CLIENT COPY: short hero value-prop
  // labels/bodies, each derived from that block's own exact paragraph
  // (not FINWIWO's own three hero items, which are unrelated marketing
  // taglines with no client-content basis).
  heroItems: [
    {
      title: "Hausrat",
      body: "Deckt Ihr Hab und Gut bei Feuer, Wasser, Diebstahl und Glasbruch.",
    },
    {
      title: "Privathaftpflicht",
      body: "Zahlt, wenn Sie Dritten Schaden zufügen.",
    },
    {
      title: "Gebäudeversicherung",
      body: "Für Eigentümerinnen und Eigentümer, abgestimmt auf Ihre Liegenschaft.",
    },
  ],
  // Phase 7G — UI HEADING DERIVED FROM CLIENT CONTENT. Body is the guide's
  // own exact underinsurance sentence, taken verbatim from the Hausrat
  // paragraph above (not a separate invented legal statement).
  underinsurance: {
    heading: "Unterversicherung",
    body: "Entscheidend ist die richtige Versicherungssumme: Ist sie zu tief, wird im Schadenfall anteilig gekürzt.",
  },
  wohnsituation: {
    eyebrow: "Individuelle Wohnsituation",
    heading: "Individuelle Wohnsituation",
    paragraphs: [
      "Ob Mietwohnung, Eigentum oder gemeinsamer Haushalt: Die passende Kombination aus Hausrat- und Haftpflichtschutz hängt von der jeweiligen Wohnsituation und den vorhandenen Vermögenswerten ab.",
      "Wir ordnen bestehende Policen und zeigen auf, wo Deckung und tatsächliche Wohnsituation heute auseinanderlaufen.",
    ],
  },
  comparison: {
    heading: "Hausrat und Haftung im Überblick",
    intro: "Beide Versicherungen ergänzen sich, decken aber grundsätzlich unterschiedliche Risiken ab.",
    columnHeaders: ["Hausratversicherung", "Privathaftpflichtversicherung"],
    rows: [
      { label: "Schutzbereich", cells: ["Eigenes bewegliches Eigentum", "Schäden gegenüber Dritten"] },
      { label: "Versicherungspflicht", cells: ["Nicht gesetzlich vorgeschrieben", "Nicht gesetzlich vorgeschrieben"] },
      { label: "Typischer Auslöser", cells: ["Feuer, Wasser, Diebstahl, Elementarereignisse", "Versehentlich verursachte Schäden an Personen oder Eigentum Dritter"] },
    ],
  },
  process: {
    heading: "Unser Ansatz bei Wohnen & Eigentum",
    steps: [
      { num: "01", title: "Analyse", body: "Wir erfassen Ihren Haushalt, Ihre Eigentumsverhältnisse und die bestehenden Policen." },
      { num: "02", title: "Struktur", body: "Daraus entwickeln wir eine Struktur, die Hausrat, Haftung und individuelle Wohnsituation sinnvoll verbindet." },
      { num: "03", title: "Begleitung", body: "Wir begleiten Sie auch bei Umzug oder Veränderungen Ihrer Wohnsituation weiter." },
    ],
  },
  faq: [
    {
      question: "Ist eine Hausratversicherung in der Schweiz Pflicht?",
      answer: "Nein, sie ist gesetzlich nicht vorgeschrieben. Viele Mietverträge setzen sie jedoch voraus, und bei wachsendem Haushaltswert ist sie eine sinnvolle Absicherung.",
    },
    {
      question: "Brauche ich eine Privathaftpflichtversicherung?",
      answer: "Gesetzlich vorgeschrieben ist sie nicht, gehört aber zu den am häufigsten empfohlenen Privatversicherungen, da Haftungsschäden schnell erheblich ausfallen können.",
    },
    {
      question: "Was ist der Unterschied zwischen Hausrat und Haftpflicht?",
      answer: "Die Hausratversicherung schützt Ihr eigenes Eigentum, die Haftpflichtversicherung deckt Schäden, die Sie Dritten zufügen.",
    },
    {
      question: "Was passiert bei einem Umzug?",
      answer: "Wir prüfen mit Ihnen, ob Deckungssumme und Vertragsdetails weiterhin zur neuen Wohnsituation passen.",
    },
    {
      question: "Wie unterstützt neosura mich?",
      answer: "Wir analysieren Haushalt, Eigentum und Haftungssituation gemeinsam und entwickeln eine koordinierte Lösung statt einzelner, unabhängiger Policen.",
    },
  ],
};
