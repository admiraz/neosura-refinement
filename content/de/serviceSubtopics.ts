import type { NavSubtopic } from "./types";

/** Real chapter-level anchors, keyed by service slug — the same ids each
 * service's own `ServiceLocalNav` links to (see that page's `NAV_ITEMS`).
 * Only the first 2-3 genuine topic chapters are listed (not
 * Vergleich/Analyse/FAQ). Shared by the mega menu's deep links and
 * ServiceInquiry's qualifier chips — one source of truth, never invented. */
export const PRIVATE_SUBTOPICS: Record<string, NavSubtopic[]> = {
  krankenkasse: [
    { label: "Grundversicherung", anchor: "grundversicherung" },
    { label: "Zusatzversicherung", anchor: "zusatzversicherung" },
  ],
  "wohnen-eigentum": [
    { label: "Hausrat", anchor: "hausrat" },
    { label: "Haftung", anchor: "haftung" },
    { label: "Eigentum", anchor: "eigentum" },
  ],
  "fahrzeug-reisen": [
    { label: "Fahrzeug", anchor: "fahrzeug" },
    { label: "Assistance", anchor: "assistance" },
    { label: "Reisen", anchor: "reisen" },
  ],
  vorsorge: [
    { label: "Vorsorge", anchor: "vorsorge" },
    { label: "Vermögensaufbau", anchor: "vermoegensaufbau" },
    { label: "Absicherung", anchor: "absicherung" },
  ],
  "rechtsschutz-cyber": [
    { label: "Rechtsschutz", anchor: "rechtsschutz" },
    { label: "Digitale Risiken", anchor: "digitale-risiken" },
  ],
};

const CATCH_ALL_QUALIFIER = "Beides / Beratung";

/** Chip options for ServiceInquiry's qualifier step — the service's own
 * real subtopics plus a catch-all. Returns `[]` when the service has no
 * genuine subtopic split (nothing to force), so the caller can skip
 * rendering the step entirely. */
export function getQualifierOptions(audience: "privat" | "unternehmen", slug: string): string[] {
  const map = audience === "privat" ? PRIVATE_SUBTOPICS : BUSINESS_SUBTOPICS;
  const subtopics = map[slug];
  if (!subtopics || subtopics.length === 0) return [];
  return [...subtopics.map((s) => s.label), CATCH_ALL_QUALIFIER];
}

export const BUSINESS_SUBTOPICS: Record<string, NavSubtopic[]> = {
  betriebshaftpflicht: [
    { label: "Risiken", anchor: "risiken" },
    { label: "Folgen", anchor: "folgen" },
    { label: "Situation", anchor: "situation" },
  ],
  flotten: [
    { label: "Firmenfahrzeuge", anchor: "firmenfahrzeuge" },
    { label: "Fahrer & Nutzung", anchor: "fahrer-nutzung" },
    { label: "Schutz", anchor: "schutz" },
  ],
  "berufliche-vorsorge": [
    { label: "BVG-Beratung", anchor: "bvg-beratung" },
    { label: "Mitarbeitende", anchor: "mitarbeitende" },
    { label: "Vorsorgesituation", anchor: "vorsorgesituation" },
  ],
  sachversicherung: [
    { label: "Sachwerte", anchor: "sachwerte" },
    { label: "Immobilien", anchor: "immobilien" },
    { label: "Schäden & Unterbrüche", anchor: "schaeden" },
  ],
  personal: [
    { label: "UVG", anchor: "uvg" },
    { label: "Krankentaggeld", anchor: "ktg" },
    { label: "Absicherung", anchor: "absicherung" },
  ],
  // cyber-rechtsschutz intentionally has no entry yet — no genuine
  // subtopic chapters exist for this new 6th service until its own
  // deep-service page is built; ServiceInquiry/mega-menu correctly
  // skip the qualifier step and deep-link list when a slug is absent.
};
