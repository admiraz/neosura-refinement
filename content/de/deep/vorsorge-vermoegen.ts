/** Phase 7M.1 — client guide §4.6 verbatim copy applied to all three content
 * blocks (guide gives Säule 3a / Säule 3b / Absicherung; this file's blocks
 * are named system/vermoegensaufbau/absicherung, mapped in that order —
 * "absicherung" also matches by name). Guide's pillar-3a-maximum FAQ uses a
 * placeholder figure and was explicitly skipped per instructions; faq array
 * left entirely untouched. problem/comparison/process left on existing
 * approved copy (guide silent for those slots).
 * Deep-page content for /privatkunden/vorsorge-vermoegen. 3-Säulen
 * structure and BVG capital-funding principle sourced from BSV — see
 * docs/service-content-sources.md. No BVG entry-threshold CHF figure is
 * stated anywhere, since it could not be confirmed on a directly-fetched
 * official page.
 *
 * Phase 7I — `h1`/`intro` added, reusing the already-approved
 * `privateServices[3]` tile title/body verbatim (no fresh client-guide
 * page-level copy was supplied for this phase). `heroItems` and
 * `absicherung.checklist` are new, UI LABEL DERIVED FROM CLIENT COPY
 * (short summaries/phrases from the existing approved paragraphs, not
 * new claims). The live FINWIWO reference page's own CHF 7'258/CHF
 * 36'288 Säule-3a deduction figures, its "60%/40% income replacement"
 * statistics, its fake review/analysis counts, and its interactive tax
 * calculator are NOT reproduced anywhere in this file or the route —
 * none of these financial claims exist in this approved content, and
 * per this phase's own explicit rule, architecture may come from
 * FINWIWO but financial claims may not. See
 * docs/finwiwo-architecture/deep-vorsorge.md for the full record. */
export const vorsorgeVermoegenDeep = {
  h1: "Vorsorge",
  intro: "Säule 3a, Säule 3b und Lebensversicherung. Steuern sparen und die Familie absichern.",
  // Phase 7I — UI LABEL DERIVED FROM CLIENT COPY: short hero value-prop
  // labels/bodies, each derived from that block's own exact paragraph
  // below (not FINWIWO's own hero items, which include unverified
  // savings claims and fake review counts, not reproduced anywhere).
  heroItems: [
    {
      title: "Vorsorgesystem",
      body: "Die drei Säulen sinnvoll aufeinander abgestimmt.",
    },
    {
      title: "Vermögensaufbau",
      body: "Flexibel ergänzend zur gesetzlichen und beruflichen Vorsorge.",
    },
    {
      title: "Absicherung",
      body: "Schutz Ihrer Familie bei Erwerbsunfähigkeit oder Todesfall.",
    },
  ],
  problem: {
    statement:
      "Wie gut ist die eigene Vorsorge- und Vermögenssituation heute wirklich bekannt, jenseits der jährlichen Pensionskassenübersicht?",
    response: "Wir schaffen Klarheit.",
  },
  system: {
    eyebrow: "Das Schweizer Vorsorgesystem",
    heading: "Das Schweizer Vorsorgesystem",
    paragraphs: [
      "Einzahlungen können Sie vollständig vom steuerbaren Einkommen abziehen. Wir zeigen Ihnen die Unterschiede zwischen Bank- und Versicherungslösung ehrlich auf und bauen die Variante, die zu Ihrer Lebensplanung passt.",
    ],
    checklist: [
      "1. Säule: staatliche Vorsorge AHV/IV",
      "2. Säule: berufliche Vorsorge BVG",
      "3. Säule: freiwillige private Vorsorge 3a/3b",
    ],
  },
  vermoegensaufbau: {
    eyebrow: "Vermögensaufbau",
    heading: "Vermögensaufbau",
    paragraphs: [
      "Flexibel in Laufzeit, Begünstigung und Bezug. Geeignet für Ziele neben der Pensionierung, etwa Ausbildung der Kinder oder Wohneigentum.",
    ],
    checklist: [
      "Ergänzung zur gesetzlichen und beruflichen Vorsorge",
      "Abgestimmt auf Zeithorizont und Risikobereitschaft",
      "Berücksichtigt bestehende Vorsorgestrukturen",
    ],
  },
  absicherung: {
    eyebrow: "Langfristige Absicherung",
    heading: "Langfristige Absicherung",
    paragraphs: [
      "Erwerbsunfähigkeitsrente und Todesfallkapital schützen Ihre Familie, wenn das Einkommen wegfällt. Besonders wichtig für Familien mit einem Haupteinkommen und für Selbständige ohne Pensionskasse.",
    ],
    // Phase 7I — the concepts named in the paragraph itself, verbatim
    // nouns/phrases, directly traceable (newly added; no checklist
    // previously existed for this block).
    checklist: [
      "Erwerbsunfähigkeitsrente",
      "Todesfallkapital",
      "Besonders wichtig für Familien mit einem Haupteinkommen",
    ],
  },
  comparison: {
    heading: "Die drei Säulen im Überblick",
    intro: "Jede Säule verfolgt einen eigenen Zweck und eine eigene Finanzierungslogik.",
    columnHeaders: ["1. Säule (AHV/IV)", "2. Säule (BVG)", "3. Säule (privat)"],
    rows: [
      { label: "Charakter", cells: ["Obligatorisch, staatlich", "Obligatorisch für Arbeitnehmende ab gesetzlich definiertem Mindesteinkommen", "Freiwillig"] },
      { label: "Finanzierung", cells: ["Umlageverfahren", "Kapitaldeckungsverfahren", "Individuelles Sparen"] },
      { label: "Ziel", cells: ["Existenzsicherung im Alter", "Fortführung des gewohnten Lebensstandards", "Individuelle Ergänzung"] },
    ],
  },
  process: {
    heading: "Unser Ansatz bei Vorsorge & Vermögen",
    steps: [
      { num: "01", title: "Analyse", body: "Wir verschaffen uns gemeinsam einen klaren Überblick über Ihre bestehende Vorsorgesituation über alle drei Säulen hinweg." },
      { num: "02", title: "Struktur", body: "Daraus entwickeln wir eine Struktur, die Vorsorge, Vermögensaufbau und langfristige Absicherung sinnvoll verbindet." },
      { num: "03", title: "Begleitung", body: "Wir begleiten Sie über die Jahre hinweg, damit Ihre Vorsorge mit Ihrer Lebenssituation Schritt hält." },
    ],
  },
  faq: [
    {
      question: "Was bedeutet das Schweizer 3-Säulen-System?",
      answer: "Es beschreibt den Aufbau der Altersvorsorge aus staatlicher Vorsorge (AHV/IV), beruflicher Vorsorge (BVG) und freiwilliger privater Vorsorge (Säule 3a/3b).",
    },
    {
      question: "Ist die berufliche Vorsorge für alle Arbeitnehmenden obligatorisch?",
      answer: "Die berufliche Vorsorge ist für Arbeitnehmende ab einem gesetzlich definierten Mindesteinkommen obligatorisch. Die genaue Schwelle wird periodisch angepasst. Wir prüfen Ihre individuelle Situation gemeinsam.",
    },
    {
      question: "Was ist der Unterschied zwischen Umlage- und Kapitaldeckungsverfahren?",
      answer: "Die 1. Säule wird nach dem Umlageverfahren finanziert, bei dem die aktuell Erwerbstätigen die laufenden Renten finanzieren. Die 2. Säule funktioniert nach dem Kapitaldeckungsverfahren, bei dem jede Generation ihr eigenes Altersguthaben aufbaut.",
    },
    {
      question: "Wann sollte ich mich mit Vermögensaufbau beschäftigen?",
      answer: "Je früher, desto mehr Zeit steht für den Aufbau zur Verfügung. Sinnvoll ist eine Auseinandersetzung unabhängig vom Alter, sobald eine stabile finanzielle Basis besteht.",
    },
    {
      question: "Wie unterstützt neosura mich bei der Vorsorgeplanung?",
      answer: "Wir verschaffen einen ganzheitlichen Überblick über alle drei Säulen und entwickeln daraus eine langfristig tragfähige Struktur.",
    },
  ],
};
