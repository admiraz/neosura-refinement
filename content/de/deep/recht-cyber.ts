/** Phase 7M.1 — rechtsschutz/digitaleRisiken paragraphs replaced with client
 * guide §4.7 verbatim copy (Privat-/Verkehrsrechtsschutz, Cyber); no FAQ
 * supplied by guide for this page. problem/begleitung/comparison/process
 * left on existing approved copy (guide silent for those slots).
 * Deep-page content for /privatkunden/recht-cyber. Neither Rechtsschutz
 * nor Cyber cover is federally mandated in Switzerland — stated as general
 * concepts only, no statistics or incident figures used anywhere.
 *
 * Phase 7J — `h1`/`intro`/`heroItems` added. No fresh verbatim client-guide
 * page-level copy was supplied for this phase; `h1`/`intro` reuse the
 * already-approved `privateServices[4]` tile title/body verbatim.
 * `heroItems` are structurally derived short summaries of the two
 * existing approved blocks below. No FINWIWO claim (24-Stunden-
 * Rechtsberatung, forensic/incident-response service guarantees) is
 * reproduced anywhere in this file. */
export const rechtCyberDeep = {
  h1: "Rechtsschutz & Cyber",
  intro: "Professionelle Hilfe bei rechtlichen Konflikten und digitalen Risiken.",
  heroItems: [
    {
      title: "Rechtsschutz",
      body: "Kostenübernahme für Anwalt und Verfahren bei rechtlichen Konflikten.",
    },
    {
      title: "Digitale Risiken",
      body: "Schutz bei Identitätsdiebstahl und Online-Betrug.",
    },
  ],
  problem: {
    statement: "Wer hilft im Ernstfall wirklich weiter — bei einem rechtlichen Streit ebenso wie bei einem digitalen Vorfall?",
    response: "Wir koordinieren beides.",
  },
  rechtsschutz: {
    eyebrow: "Rechtsschutz",
    heading: "Rechtsschutz",
    paragraphs: [
      "Wir vergleichen die Anbieter nach Deckungssummen, versicherten Rechtsgebieten und Wartefristen und kombinieren Privat- und Verkehrsrechtsschutz dort, wo es günstiger ist.",
    ],
    checklist: [
      "Kostenübernahme für Anwalt und Verfahren",
      "Deckt typische Alltagsbereiche wie Miet- oder Arbeitsrecht",
      "Nicht gesetzlich vorgeschrieben",
    ],
  },
  digitaleRisiken: {
    eyebrow: "Digitale Risiken",
    heading: "Digitale Risiken",
    paragraphs: [
      "Einkäufe in Fake-Shops, missbrauchte Kreditkarten, gehackte Konten, Mobbing im Netz. Cyberdeckungen ersetzen finanzielle Schäden und organisieren Soforthilfe. Wir prüfen, ob eine eigenständige Police nötig ist oder ein Zusatz zu Hausrat oder Rechtsschutz genügt.",
    ],
    checklist: [
      "Schutz bei Identitätsdiebstahl und Online-Betrug",
      "Ergänzt klassische Rechtsschutzdeckung",
      "Überschneidungen mit rechtlichen Fragestellungen möglich",
    ],
  },
  begleitung: {
    eyebrow: "Professionelle Begleitung im Ernstfall",
    heading: "Professionelle Begleitung im Ernstfall",
    paragraphs: [
      "Im entscheidenden Moment zählt nicht nur die richtige Versicherung, sondern auch die richtige Begleitung — schnell, koordiniert und mit klarem Vorgehen.",
    ],
  },
  comparison: {
    heading: "Rechtsschutz und Cyber-Absicherung im Überblick",
    intro: "Beide Bereiche sind eigenständig, überschneiden sich aber im Alltag zunehmend.",
    columnHeaders: ["Rechtsschutzversicherung", "Cyber-/Digitalschutz"],
    rows: [
      { label: "Deckt", cells: ["Anwalts- und Verfahrenskosten bei rechtlichen Konflikten", "Schäden durch Identitätsdiebstahl, Online-Betrug und digitale Vorfälle"] },
      { label: "Versicherungspflicht", cells: ["Nicht gesetzlich vorgeschrieben", "Nicht gesetzlich vorgeschrieben"] },
    ],
  },
  process: {
    heading: "Unser Ansatz bei Recht & Cyber",
    steps: [
      { num: "01", title: "Analyse", body: "Wir prüfen Ihre bestehende Absicherung gegenüber rechtlichen und digitalen Risiken." },
      { num: "02", title: "Struktur", body: "Daraus entwickeln wir eine Struktur, die beide Bereiche koordiniert abdeckt, statt sie getrennt zu betrachten." },
      { num: "03", title: "Begleitung", body: "Im Ernstfall begleiten wir Sie professionell und mit klarem Vorgehen." },
    ],
  },
  faq: [
    {
      question: "Ist eine Rechtsschutzversicherung Pflicht?",
      answer: "Nein, sie ist gesetzlich nicht vorgeschrieben, reduziert aber das finanzielle Risiko bei rechtlichen Konflikten erheblich.",
    },
    {
      question: "Was zählt zu digitalen Risiken für Privatpersonen?",
      answer: "Dazu gehören unter anderem Identitätsdiebstahl und finanzielle Schäden durch Online-Betrug.",
    },
    {
      question: "Wie hängen Rechtsschutz und Cyber-Absicherung zusammen?",
      answer: "Ein digitaler Vorfall kann rechtliche Schritte erfordern — genau an dieser Schnittstelle setzt eine koordinierte Absicherung an.",
    },
    {
      question: "Was passiert im Ernstfall?",
      answer: "Wir begleiten Sie professionell durch den gesamten Prozess — von der ersten Einschätzung bis zur Lösung.",
    },
    {
      question: "Wie unterstützt neosura mich?",
      answer: "Wir analysieren Ihre rechtliche und digitale Risikosituation gemeinsam und entwickeln daraus eine koordinierte, statt isolierte Absicherung.",
    },
  ],
};
