/** FINWIWO-grammar additions per service: a contextual category capsule
 * (not a performance claim) and a source-grounded checklist derived from
 * each service's existing `body` / `bullets` copy — index-aligned with
 * `privateServices` / `businessServices`. No invented benefits. */
export interface ServiceExtra {
  capsule: string;
  checklist: string[];
}

export const privateServiceExtras: ServiceExtra[] = [
  {
    capsule: "Gesundheit & Absicherung",
    checklist: ["Grundversicherung", "Zusatzversicherung", "Versorgung sinnvoll koordinieren", "Finanzielle Planbarkeit"],
  },
  {
    capsule: "Zuhause & Eigentum",
    checklist: ["Haushalt", "Eigentum", "Haftung", "Individuelle Wohnsituation"],
  },
  {
    capsule: "Mobilität & Reisen",
    checklist: ["Fahrzeuge", "Assistance", "Internationale Risiken"],
  },
  {
    capsule: "Finanzielle Zukunft",
    checklist: ["Vorsorge", "Vermögensaufbau", "Langfristige Absicherung"],
  },
  {
    capsule: "Recht & Digitaler Schutz",
    checklist: ["Rechtsschutz", "Digitale Risiken", "Professionelle Begleitung"],
  },
];

export const businessServiceExtras: ServiceExtra[] = [
  {
    capsule: "Unternehmen schützen",
    checklist: ["Haftpflichtlösungen für betriebliche Risiken", "Schutz vor finanziellen Folgeschäden", "Strukturierte Absicherung"],
  },
  {
    capsule: "Betriebliche Mobilität",
    checklist: ["Firmenfahrzeuge und Flotten", "Klare Prozesse", "Reduzierter Aufwand", "Verlässlicher Schutz"],
  },
  {
    capsule: "Mitarbeitende & Vorsorge",
    checklist: ["BVG-Beratung für Unternehmen", "Stabilität", "Attraktivität", "Langfristige Planbarkeit"],
  },
  {
    capsule: "Sachwerte & Immobilien",
    checklist: ["Betriebliche Sachwerte", "Immobilien", "Schäden und Unterbrüche", "Wertrelevante Risiken"],
  },
  {
    capsule: "Mitarbeitende schützen",
    checklist: ["Krankentaggeld", "Unfallversicherung", "Mitarbeitendenabsicherung"],
  },
  {
    // Phase 7M.1 — checklist now names the guide's §4.14 real coverage
    // topics (Cyber + Betriebsrechtsschutz) instead of reused private
    // Recht & Cyber wording (see docs/CLIENT_GUIDE_MERGE.md §15).
    capsule: "Cyber & Rechtsschutz",
    checklist: ["Cyberversicherung", "Betriebsrechtsschutz", "IT-Forensik und Krisenkommunikation"],
  },
];
