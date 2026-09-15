/** Phase 7M.1 — grundversicherung/zusatzversicherung paragraphs and FAQ replaced
 * with client guide §4.3 verbatim copy; problem/koordination/comparison/process
 * left on existing approved copy (guide silent for those slots).
 * Deep-page content for /privatkunden/gesundheit. Factual claims about
 * Versicherungspflicht are sourced from BAG — see docs/service-content-sources.md.
 *
 * Phase 7F.4 — `franchise` block added. The CHF amounts and their
 * ordentliche/Wahlfranchise classification are verified against the
 * official federal health-insurance-premium portal (priminfo.admin.ch,
 * BAG-affiliated), not against FINWIWO's own page or any prior NEOSURA
 * data. No savings/"Faustregel" claims are stated — see
 * docs/finwiwo-architecture/deep-krankenkasse.md for the full sourcing
 * record (source, date checked, exact amounts). */
export const gesundheitDeep = {
  problem: {
    statement:
      "Passt die eigene Krankenversicherung wirklich noch zur aktuellen Lebenssituation — oder wurde sie einmal abgeschlossen und nie wieder angeschaut?",
    response: "Wir schauen genau hin.",
  },
  grundversicherung: {
    eyebrow: "Grundversicherung",
    heading: "Grundversicherung",
    paragraphs: [
      "Wir prüfen jährlich, ob Ihre Kasse, Ihr Modell (Standard, Hausarzt, HMO, Telmed) und Ihre Franchise noch zu Ihrer Situation passen. Den Wechsel erledigen wir für Sie: Kündigung fristgerecht, Anmeldung nahtlos, ohne Deckungslücke.",
    ],
    checklist: [
      "Freie Wahl der Krankenkasse innerhalb der gesetzlichen Vorgaben",
      "Gleiche gesetzliche Grundleistungen bei allen Anbietern",
      "Individuelle Wahl von Franchise und Versicherungsmodell",
    ],
  },
  franchise: {
    headingRest: "Die richtige",
    headingAccent: "Franchise wählen",
    intro:
      "Die Franchise ist der Betrag, den Sie pro Kalenderjahr selbst bezahlen, bevor die Grundversicherung Leistungen übernimmt. Die Höhe ist gesetzlich vorgegeben und frei wählbar.",
    caption:
      "Eine passende Franchise besprechen wir gemeinsam anhand Ihrer persönlichen Situation — allgemeingültige Empfehlungen dazu geben wir bewusst nicht.",
    sourceNote: "Beträge gemäss Bundesamt für Gesundheit (BAG).",
    rows: [
      { amount: "CHF 300", type: "Ordentliche Franchise" },
      { amount: "CHF 500", type: "Wahlfranchise" },
      { amount: "CHF 1'000", type: "Wahlfranchise" },
      { amount: "CHF 1'500", type: "Wahlfranchise" },
      { amount: "CHF 2'000", type: "Wahlfranchise" },
      { amount: "CHF 2'500", type: "Wahlfranchise" },
    ],
  },
  wechselservice: {
    heading: "Wechselservice",
    intro:
      "Den Wechsel erledigen wir für Sie: Kündigung fristgerecht, Anmeldung nahtlos, ohne Deckungslücke.",
    checklist: ["Kündigung fristgerecht", "Anmeldung nahtlos", "Ohne Deckungslücke"],
  },
  zusatzversicherung: {
    eyebrow: "Zusatzversicherung",
    heading: "Zusatzversicherung",
    paragraphs: [
      "Ambulante Zusätze, Spitalversicherung, Zahnversicherung, Brillen, Alternativmedizin, Fitness. Wir vergleichen die Anbieter und stellen ein Paket zusammen, das Ihre Bedürfnisse abdeckt, ohne Sie mit Leistungen zu belasten, die Sie nie beziehen.",
    ],
    checklist: [
      "Freiwillige Zusatzleistungen ergänzen die Grundversicherung",
      "Gesundheitsprüfung durch den Versicherer möglich",
      "Sinnvoll nur mit klarem Bezug zur eigenen Situation",
    ],
  },
  koordination: {
    eyebrow: "Versorgung sinnvoll koordinieren",
    heading: "Versorgung sinnvoll koordinieren",
    paragraphs: [
      "Grundversicherung, Zusatzversicherung und persönliche finanzielle Planbarkeit greifen nur dann sinnvoll ineinander, wenn sie gemeinsam betrachtet werden — nicht als einzelne, voneinander losgelöste Verträge.",
      "Wir ordnen bestehende Policen, zeigen Überschneidungen und Lücken auf und entwickeln daraus eine Struktur, die zur aktuellen Lebenssituation passt.",
    ],
  },
  comparison: {
    heading: "Grundversicherung und Zusatzversicherung im Überblick",
    intro: "Beide Versicherungsarten folgen unterschiedlichen gesetzlichen Grundlagen — ein Überblick.",
    columnHeaders: ["Grundversicherung", "Zusatzversicherung"],
    rows: [
      { label: "Gesetzliche Grundlage", cells: ["Bundesgesetz über die Krankenversicherung (KVG)", "Versicherungsvertragsgesetz (VVG)"] },
      { label: "Versicherungspflicht", cells: ["Obligatorisch für alle Personen mit Wohnsitz in der Schweiz", "Freiwillig"] },
      { label: "Aufnahme", cells: ["Aufnahmepflicht des Versicherers, keine Gesundheitsprüfung", "Gesundheitsprüfung möglich, Ablehnung oder Vorbehalt möglich"] },
      { label: "Leistungsumfang", cells: ["Gesetzlich einheitlich definiert", "Individuell wählbar je nach Anbieter und Modell"] },
    ],
  },
  process: {
    heading: "Unser Ansatz bei Ihrer Gesundheitsversicherung",
    steps: [
      { num: "01", title: "Analyse", body: "Wir prüfen Ihre bestehende Grund- und Zusatzversicherung sowie Ihre aktuelle Lebenssituation." },
      { num: "02", title: "Struktur", body: "Wir entwickeln eine Struktur, die Versorgung, Komfort und finanzielle Planbarkeit sinnvoll verbindet." },
      { num: "03", title: "Begleitung", body: "Wir begleiten Sie auch bei Änderungen Ihrer Situation weiter — persönlich und zuverlässig." },
    ],
  },
  faq: [
    {
      question: "Bis wann kann ich die Grundversicherung wechseln?",
      answer:
        "Kündigung bis 30. November für einen Wechsel per 1. Januar. Beim Standardmodell mit tiefster Franchise ist zusätzlich ein Wechsel per 1. Juli möglich (Kündigung bis 31. März).",
    },
    {
      question: "Kann mich eine Kasse in der Grundversicherung ablehnen?",
      answer: "Nein. In der Grundversicherung besteht Aufnahmepflicht, unabhängig von Alter und Gesundheitszustand.",
    },
    {
      question: "Und bei Zusatzversicherungen?",
      answer:
        "Dort dürfen Anbieter Gesundheitsfragen stellen und Anträge ablehnen oder mit Vorbehalt annehmen. Deshalb: neue Zusatzversicherung immer zuerst abschliessen, alte erst danach kündigen. Wir koordinieren das.",
    },
    {
      question: "Was kostet Ihre Beratung?",
      answer:
        "Für Sie nichts. Wir werden von den Versicherungsgesellschaften mit einer marktüblichen Vermittlungsentschädigung vergütet. Details dazu stehen in unserer Erstinformation.",
    },
  ],
};
