/** Phase 7M.1 — uvg/ktg paragraphs replaced with client guide §4.11 verbatim
 * copy (UVG, Krankentaggeld).
 * problem/mitarbeitendenabsicherung/comparison/process left on existing
 * approved copy (guide silent for those slots).
 * Deep-page content for /unternehmen/gesundheit-unfall (redirects to
 * /unternehmen/personal). UVG mandatory status and 8-hour NBU threshold
 * sourced from SUVA; KTG's non-mandatory status is general Swiss
 * employment-law knowledge — see docs/service-content-sources.md. No
 * premium figures stated.
 *
 * Phase 7O — `h1`/`intro`/`heroItems` added. `h1` reuses
 * `businessServices[4].title` verbatim ("Krankentaggeld & Unfall");
 * `intro` reuses `businessServices[4].body` verbatim (§4.8 tile copy).
 * `heroItems` are a STRUCTURALLY DERIVED title/body split of
 * `uvg.checklist[0]`/`[1]` and `ktg.checklist[2]` — the existing
 * approved sentences, split at their own clause boundary, not merged or
 * paraphrased into a new combined claim.
 *
 * Phase 7O.A — CORRECTION: Phase 7O's own report incorrectly stated
 * the client guide's "UVG-Zusatz" paragraph was unavailable anywhere in
 * this repository. That was wrong — the correction brief supplied the
 * exact, final §4.11 UVG-Zusatz copy directly, and it is transcribed
 * verbatim below as `uvgZusatz`. `lohnfortzahlung` is new this phase
 * too: the client guide's own required "employer's continued
 * salary-payment obligation" info box, transcribed verbatim from the
 * exact source sentence supplied in the correction brief. The 80%/730-
 * day KTG figures and the UVG 8-hour NBU threshold predate Phase 7O
 * (Phase 7M.1, sourced from the client guide and SUVA respectively) —
 * kept as-is, not newly introduced; no additional percentage, CHF
 * amount, or duration is added in this correction. */
export const gesundheitUnfallDeep = {
  h1: "Krankentaggeld & Unfall",
  intro: "Lohnfortzahlung absichern, Mitarbeitende schützen (KTG/UVG).",
  heroItems: [
    { title: "Berufsunfall", body: "Obligatorisch versichert" },
    { title: "Nichtberufsunfall", body: "Zusätzlich ab acht Wochenstunden" },
    { title: "Krankentaggeld", body: "Reduziert Risiko der Lohnfortzahlungspflicht" },
  ],
  problem: {
    statement:
      "Sind Ihre Mitarbeitenden bei Unfall und Krankheit wirklich lückenlos abgesichert — oder bestehen unbemerkte Lücken zwischen den einzelnen Policen?",
    response: "Wir schliessen sie.",
  },
  uvg: {
    eyebrow: "Unfallversicherung (UVG)",
    heading: "Unfallversicherung (UVG)",
    paragraphs: [
      "Die Unfallversicherung nach UVG ist für alle Mitarbeitenden obligatorisch. Wir vergleichen die Prämiensätze der Anbieter, die sich je nach Branche deutlich unterscheiden.",
    ],
    checklist: [
      "Berufsunfälle und Berufskrankheiten obligatorisch versichert",
      "Nichtberufsunfall zusätzlich ab acht Wochenstunden",
      "Prämienaufteilung zwischen Arbeitgeber und Arbeitnehmenden",
    ],
  },
  // Phase 7O.A — client guide §4.11's third required block, restored
  // verbatim per the correction brief. No checklist is added — the
  // source is a single sentence, and no additional feature, figure, or
  // benefit is invented beyond what it states.
  uvgZusatz: {
    eyebrow: "UVG-Zusatz",
    heading: "UVG-Zusatz",
    paragraphs: [
      "Höhere Lohnanteile, Privatabteilung im Spital und weitere Leistungen über das Obligatorium hinaus, ein wirksames Instrument der Mitarbeiterbindung.",
    ],
  },
  ktg: {
    eyebrow: "Krankentaggeld",
    heading: "Krankentaggeld",
    paragraphs: [
      "Die KTG-Versicherung übernimmt typischerweise 80 Prozent des Lohns während bis zu 730 Tagen und entlastet Ihre Lohnfortzahlungspflicht. Wartefrist und Leistungsdauer stimmen wir auf Ihre Liquidität ab.",
    ],
    checklist: [
      "Nicht generell gesetzlich vorgeschrieben",
      "Kann durch GAV oder Arbeitsvertrag vorgesehen sein",
      "Reduziert Risiko der Lohnfortzahlungspflicht",
    ],
  },
  // Phase 7O.A — client guide §4.11's required info box (the employer's
  // continued salary-payment obligation as the key argument). Body is
  // the exact source sentence supplied in the correction brief,
  // verbatim, unedited. Heading is a UI LABEL DERIVED FROM CLIENT COPY —
  // a short, neutral noun naming the concept the sentence itself
  // describes ("Lohnfortzahlungspflicht" already appears in `ktg`'s own
  // approved checklist above), not FINWIWO wording, not invented framing.
  lohnfortzahlung: {
    heading: "Lohnfortzahlungspflicht",
    body: "Fällt eine Mitarbeiterin länger aus, schulden Sie als Arbeitgeber Lohnfortzahlung, während die Arbeit liegen bleibt. Krankentaggeld- und Unfallversicherung machen dieses Risiko kalkulierbar.",
  },
  mitarbeitendenabsicherung: {
    eyebrow: "Mitarbeitendenabsicherung als Ganzes",
    heading: "Mitarbeitendenabsicherung als Ganzes",
    paragraphs: [
      "Unfallversicherung und Krankentaggeld greifen an unterschiedlichen Punkten — erst im Zusammenspiel entsteht eine lückenlose Absicherung der Mitarbeitenden.",
    ],
  },
  comparison: {
    heading: "UVG und Krankentaggeld im Überblick",
    intro: "Beide Versicherungen ergänzen sich, folgen aber unterschiedlichen gesetzlichen Grundlagen.",
    columnHeaders: ["Unfallversicherung (UVG)", "Krankentaggeldversicherung (KTG)"],
    rows: [
      { label: "Versicherungspflicht", cells: ["Gesetzlich obligatorisch", "Nicht generell gesetzlich vorgeschrieben"] },
      { label: "Deckt", cells: ["Berufs- und (ab 8 Wochenstunden) Nichtberufsunfälle", "Lohnfortzahlung bei krankheitsbedingter Arbeitsunfähigkeit"] },
      { label: "Prämien", cells: ["Aufgeteilt zwischen Arbeitgeber und Arbeitnehmenden", "Meist durch Arbeitgeber oder gemäss Arbeitsvertrag geregelt"] },
    ],
  },
  process: {
    heading: "Unser Ansatz bei Gesundheit & Unfall",
    steps: [
      { num: "01", title: "Analyse", body: "Wir prüfen die bestehende UVG- und Krankentaggeldabsicherung Ihres Unternehmens." },
      { num: "02", title: "Struktur", body: "Daraus entwickeln wir eine strukturierte, lückenlose Mitarbeitendenabsicherung." },
      { num: "03", title: "Begleitung", body: "Wir begleiten Sie auch bei Veränderungen der Belegschaft weiter." },
    ],
  },
  // Phase 7O.A — audited for source: no citation exists anywhere in
  // this repository (`docs/CLIENT_GUIDE_MERGE.md`, `docs/service-
  // content-sources.md`) marking these 5 items as client-guide-approved
  // or otherwise explicitly authorized — §4.11 does not require a FAQ
  // for this page. Left in the file (data only) but NOT rendered on
  // `/unternehmen/personal` — FAQ OMITTED — NOT REQUIRED BY §4.11 / NO
  // AUTHORITATIVE CLIENT FAQ. Not deleted outright in case a legitimate
  // source is identified later.
  faq: [
    {
      question: "Ist die Unfallversicherung für Mitarbeitende Pflicht?",
      answer: "Ja. Alle Arbeitnehmenden sind über ihren Arbeitgeber obligatorisch gegen Berufsunfälle und Berufskrankheiten versichert.",
    },
    {
      question: "Ab wann sind Mitarbeitende auch gegen Nichtberufsunfälle versichert?",
      answer: "Wer mindestens acht Wochenstunden im selben Unternehmen arbeitet, ist zusätzlich gegen Nichtberufsunfälle versichert.",
    },
    {
      question: "Ist eine Krankentaggeldversicherung Pflicht?",
      answer: "Nein, sie ist nicht generell gesetzlich vorgeschrieben, kann sich aber aus einem Gesamtarbeitsvertrag oder individuellen Arbeitsvertrag ergeben.",
    },
    {
      question: "Wer trägt die Prämien für die Unfallversicherung?",
      answer: "Die Prämien für Berufsunfälle trägt der Arbeitgeber, jene für Nichtberufsunfälle in der Regel die Arbeitnehmenden über einen Lohnabzug.",
    },
    {
      question: "Wie unterstützt neosura Unternehmen?",
      answer: "Wir prüfen UVG- und Krankentaggeldabsicherung gemeinsam und schliessen Lücken zwischen den einzelnen Policen.",
    },
  ],
};
