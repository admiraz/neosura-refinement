import type { PrincipleItem } from "./types";

export const principlesHeading = "Vier Prinzipien, die Vertrauen schaffen.";

/** Verbatim from neosura.ch. */
export const principles: PrincipleItem[] = [
  {
    title: "Unabhängig",
    body: "Wir beraten frei von Versicherungsbindungen und entwickeln Lösungen, die sich an Ihren Bedürfnissen orientieren — nicht an Vorgaben einzelner Anbieter.",
    icon: "compass",
  },
  {
    title: "Persönliche Beratung",
    body: "Ein fester Ansprechpartner begleitet Sie langfristig mit Klarheit, Erfahrung und einem Verständnis für Ihre persönliche oder unternehmerische Situation.",
    icon: "person",
  },
  {
    title: "Unterstützung im Schadenfall",
    body: "Im entscheidenden Moment stehen wir an Ihrer Seite und begleiten Sie effizient, transparent und strukturiert durch den gesamten Prozess.",
    icon: "shield",
  },
  {
    title: "Schweizer Marktverständnis",
    body: "Fundierte Kenntnisse des Schweizer Versicherungsmarktes ermöglichen durchdachte Lösungen mit langfristigem Mehrwert.",
    icon: "target",
  },
];
