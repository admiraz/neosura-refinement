/** Phase 7M.1 — client guide §4.12 verbatim copy applied to all three
 * content blocks. Guide names Vergleich/Kader/Wechsel; this file's blocks
 * are named bvgBeratung/mitarbeitende/situation, mapped by topic:
 * situation → Vergleich (both about analysing/understanding the current
 * pension arrangement), mitarbeitende → Kader (both about attracting
 * Fach-/Führungskräfte), and bvgBeratung → Wechsel (remaining block; guide
 * assumed only two blocks for this page, so Wechsel had no clean topical
 * home — flagged in final report for review). No FAQ supplied by guide for
 * this page. problem/comparison/process left on existing approved copy
 * (guide silent for those slots).
 * Deep-page content for /unternehmen/berufliche-vorsorge. BVG obligation
 * and Obligatorium/Überobligatorium structure sourced per
 * docs/service-content-sources.md — no entry-threshold CHF figure stated.
 *
 * Phase 7M — `h1`/`intro`/`heroItems` added. `h1` reuses
 * `businessServices[2].title` verbatim; `intro` reuses
 * `businessServices[2].body` verbatim (§4.8 tile copy). `heroItems` are a
 * STRUCTURALLY DERIVED title/body split of the existing approved
 * `bvgBeratung.checklist`'s own three sentences — no new fact, figure,
 * threshold, or percentage is added beyond what those three sentences
 * already state. No BVG contribution rate, coordination deduction,
 * entry-threshold CHF figure, or conversion rate is stated anywhere in
 * this file, on this page, or in this addition — verified against
 * §4.12's own silence on all such figures. */
export const beruflicheVorsorgeDeep = {
  h1: "Berufliche Vorsorge",
  intro: "BVG-Lösungen mit fairen Konditionen für Betrieb und Belegschaft.",
  heroItems: [
    { title: "Obligatorisch", body: "Ab gesetzlich definiertem Mindesteinkommen" },
    { title: "Verantwortung", body: "Arbeitgeber verantwortlich für korrekten Anschluss" },
    { title: "Gestaltungsspielraum", body: "Über das gesetzliche Minimum hinaus" },
  ],
  problem: {
    statement:
      "Ist die bestehende berufliche Vorsorge wirklich noch ein Vorteil im Wettbewerb um Mitarbeitende — oder nur eine gesetzliche Pflichtübung?",
    response: "Wir machen daraus mehr.",
  },
  bvgBeratung: {
    eyebrow: "BVG-Beratung für Unternehmen",
    heading: "BVG-Beratung für Unternehmen",
    paragraphs: [
      "Ein Pensionskassenwechsel ist jeweils per Ende Jahr möglich, die Kündigungsfristen laufen früh ab. Wir führen den ganzen Prozess: Analyse, Ausschreibung, Mitarbeiterinformation, Umsetzung.",
    ],
    checklist: [
      "Obligatorisch ab gesetzlich definiertem Mindesteinkommen",
      "Arbeitgeber verantwortlich für korrekten Anschluss",
      "Gestaltungsspielraum über das gesetzliche Minimum hinaus",
    ],
  },
  mitarbeitende: {
    eyebrow: "Mitarbeitende im Fokus",
    heading: "Mitarbeitende im Fokus",
    paragraphs: [
      "Überobligatorische Lösungen und Kaderpläne machen Ihr Unternehmen für Fach- und Führungskräfte attraktiver. Wir strukturieren Pläne, die zum Lohngefüge passen.",
    ],
    checklist: [
      "Stärkt Absicherung der Mitarbeitenden",
      "Kann die Arbeitgeberattraktivität unterstützen",
      "Regelmässige Überprüfung sichert langfristige Planbarkeit",
    ],
  },
  situation: {
    eyebrow: "Aktuelle Vorsorgesituation verstehen",
    heading: "Aktuelle Vorsorgesituation verstehen",
    paragraphs: [
      "Wir analysieren Ihren bestehenden Anschlussvertrag, holen Vergleichsofferten ein und zeigen transparent, wo Sie bei gleichen Leistungen sparen oder bei gleichen Kosten mehr bieten können.",
    ],
  },
  comparison: {
    heading: "Obligatorische und überobligatorische Vorsorge im Überblick",
    intro: "Unternehmen können über das gesetzliche Minimum hinaus eigene Akzente setzen.",
    columnHeaders: ["Obligatorium", "Überobligatorium"],
    rows: [
      { label: "Charakter", cells: ["Gesetzlich vorgeschriebenes Minimum", "Freiwillige Erweiterung durch den Arbeitgeber"] },
      { label: "Gestaltungsspielraum", cells: ["Gesetzlich definiert", "Individuell durch das Unternehmen gestaltbar"] },
    ],
  },
  process: {
    heading: "Unser Ansatz bei der beruflichen Vorsorge",
    steps: [
      { num: "01", title: "Analyse", body: "Wir analysieren die bestehende Vorsorgelösung Ihres Unternehmens und deren Eckdaten." },
      { num: "02", title: "Struktur", body: "Daraus entwickeln wir eine Struktur, die Stabilität, Attraktivität und langfristige Planbarkeit verbindet." },
      { num: "03", title: "Begleitung", body: "Wir begleiten Sie auch bei Veränderungen der Unternehmens- oder Mitarbeitendensituation weiter." },
    ],
  },
  faq: [
    {
      question: "Ist die berufliche Vorsorge für Unternehmen obligatorisch?",
      answer: "Ja, für Arbeitnehmende ab einem gesetzlich definierten Mindesteinkommen ist der Anschluss an eine berufliche Vorsorge obligatorisch. Die genaue Schwelle wird periodisch angepasst.",
    },
    {
      question: "Was ist der Unterschied zwischen Obligatorium und Überobligatorium?",
      answer: "Das Obligatorium umfasst die gesetzlich vorgeschriebenen Mindestleistungen, das Überobligatorium sind freiwillige Erweiterungen, die der Arbeitgeber zusätzlich anbieten kann.",
    },
    {
      question: "Kann die berufliche Vorsorge zur Mitarbeitendengewinnung beitragen?",
      answer: "Eine attraktiv ausgestaltete Vorsorgelösung über das gesetzliche Minimum hinaus kann die Position des Unternehmens am Arbeitsmarkt unterstützen.",
    },
    {
      question: "Wie oft sollte die Vorsorgelösung überprüft werden?",
      answer: "Eine regelmässige Überprüfung, insbesondere bei Veränderungen der Unternehmens- oder Belegschaftsstruktur, ist sinnvoll für eine langfristig tragfähige Lösung.",
    },
    {
      question: "Wie unterstützt neosura Unternehmen?",
      answer: "Wir verschaffen einen klaren Überblick über die bestehende Vorsorgesituation und entwickeln daraus eine Struktur, die Stabilität und Attraktivität verbindet.",
    },
  ],
};
