import type { ServiceItem } from "./types";

export const privateIntro = {
  eyebrow: "Privatkunden",
  title: "Private Versicherungslösungen",
  // Phase 7M.1 — client guide §4.2 exact /privatkunden subline (also the
  // hero's `lead` line on that page).
  lead: "Die meisten Haushalte zahlen für Deckungen, die sie nicht brauchen, und sind dort unterversichert, wo es weh tut. Wir analysieren Ihre Policen, schliessen Lücken und streichen Doppeltes.",
  body: "Unsere Beratung umfasst Gesundheit, Wohnen, Mobilität, Vorsorge und rechtliche Absicherung, individuell abgestimmt auf Ihre Lebenssituation.",
};

/** Phase 7M.0 — slugs/titles migrated to the client guide's canonical
 * taxonomy (docs/CLIENT_GUIDE_MERGE.md). Old slugs still resolve via
 * permanent redirects in next.config.ts. Array order is unchanged from
 * V2 on purpose — every index-aligned array (extras/visuals/subtopics)
 * still lines up without reordering.
 * Phase 7M.1 — `body` on every entry replaced with the client guide's
 * exact §4.2 Kachel (tile) copy for that service, verbatim. `bullets`
 * left untouched (guide is silent on this "Kernbereiche" chip role). */
export const privateServices: ServiceItem[] = [
  {
    slug: "krankenkasse",
    title: "Krankenkasse",
    body: "Grund- und Zusatzversicherung optimal kombiniert. Jedes Jahr prüfen lohnt sich, wir übernehmen das für Sie.",
    bullets: ["Grundversicherung", "Zusatzversicherung"],
    icon: "health",
  },
  {
    slug: "wohnen-eigentum",
    title: "Wohnen & Eigentum",
    body: "Hausrat, Privathaftpflicht und Gebäude. Verlässlicher Schutz für alles, was Ihnen gehört.",
    bullets: ["Haushalt", "Eigentum", "Haftung"],
    icon: "home",
  },
  {
    slug: "fahrzeug-reisen",
    title: "Fahrzeug & Reisen",
    body: "Auto, Motorrad, Ferien. Passender Schutz unterwegs, ohne überflüssige Zusätze.",
    bullets: ["Fahrzeuge", "Assistance", "Internationale Risiken"],
    icon: "vehicle",
  },
  {
    slug: "vorsorge",
    title: "Vorsorge",
    body: "Säule 3a, Säule 3b und Lebensversicherung. Steuern sparen und die Familie absichern.",
    bullets: ["Vorsorge", "Vermögensaufbau", "Langfristige Absicherung"],
    icon: "forecast",
  },
  {
    slug: "rechtsschutz-cyber",
    title: "Rechtsschutz & Cyber",
    body: "Professionelle Hilfe bei rechtlichen Konflikten und digitalen Risiken.",
    bullets: ["Rechtsschutz", "Digitale Risiken"],
    icon: "legal",
  },
];
