import type { ServiceItem } from "./types";

export const businessIntro = {
  eyebrow: "Unternehmenskunden",
  title: "Versicherungslösungen für Unternehmen",
  // Phase 7M.1 — client guide §4.8 exact /unternehmen subline (also the
  // hero's `lead` line on that page).
  lead: "Als unabhängiger Broker bündeln wir sämtliche Policen Ihres Unternehmens bei einem Ansprechpartner: Wir vergleichen den Markt, verhandeln die Konditionen, prüfen jedes Jahr nach und begleiten Sie im Schadenfall.",
  body: "Unsere Beratung reicht von betrieblichen Risiken über Mitarbeitende bis hin zu Flotten, Sachwerten und Unternehmensschutz.",
};

/** Phase 7M.0 — slugs/titles migrated to the client guide's canonical
 * six-service taxonomy (docs/CLIENT_GUIDE_MERGE.md). Old slugs still
 * resolve via permanent redirects in next.config.ts. Array order kept
 * as V2 had it (extras/visuals/subtopics stay index-aligned) with the
 * genuinely new sixth service appended at the end rather than inserted
 * — avoids reshuffling the index parity the locked `/unternehmen`
 * `CategoryServiceRow` list already renders (alternating accent/reverse
 * by index).
 * Phase 7M.1 — `body` on every entry replaced with the client guide's
 * exact §4.8 Kachel (tile) copy for that service, verbatim (matched by
 * slug, since this array's order differs from the guide's own §4.8
 * listing order — see the sourcing note above). `bullets` left untouched
 * except on `cyber-rechtsschutz`, whose placeholder copy is now replaced
 * with the guide's real §4.14 content (see below). */
export const businessServices: ServiceItem[] = [
  {
    slug: "betriebshaftpflicht",
    title: "Betriebshaftpflicht",
    body: "Schutz vor Personen-, Sach- und Vermögensschäden gegenüber Dritten.",
    bullets: ["Haftpflichtlösungen für betriebliche Risiken", "Schutz vor finanziellen Folgeschäden"],
    icon: "liability",
  },
  {
    slug: "flotten",
    title: "Flotten",
    body: "Firmenfahrzeuge effizient und einheitlich versichert.",
    bullets: ["Firmenfahrzeuge und Flotten", "Klare Prozesse, reduzierter Aufwand"],
    icon: "fleet",
  },
  {
    slug: "berufliche-vorsorge",
    title: "Berufliche Vorsorge",
    body: "BVG-Lösungen mit fairen Konditionen für Betrieb und Belegschaft.",
    bullets: ["BVG-Beratung für Unternehmen", "Stabilität und langfristige Planbarkeit"],
    icon: "pension",
  },
  {
    slug: "sachversicherung",
    title: "Sachversicherung",
    body: "Inventar, Waren, Maschinen, Immobilien und Betriebsunterbruch.",
    bullets: ["Betriebliche Sachwerte", "Immobilien gegen Schäden und Unterbrüche"],
    icon: "inventory",
  },
  {
    slug: "personal",
    title: "Krankentaggeld & Unfall",
    body: "Lohnfortzahlung absichern, Mitarbeitende schützen (KTG/UVG).",
    bullets: ["Krankentaggeld", "Unfallversicherung", "Mitarbeitendenabsicherung"],
    icon: "accident",
  },
  {
    // Phase 7M.1 — client guide §4.14 exact copy (previously a
    // placeholder reusing the private Recht & Cyber wording, see
    // docs/CLIENT_GUIDE_MERGE.md §15). `body` is the guide's §4.8 hub
    // Kachel line; `bullets` name the guide's two §4.14 coverage blocks
    // (Cyber, Betriebsrechtsschutz) rather than reusing private wording.
    slug: "cyber-rechtsschutz",
    title: "Cyber & Rechtsschutz",
    body: "Digitale Risiken und rechtliche Konflikte des Betriebs abgedeckt.",
    bullets: ["Cyberversicherung", "Betriebsrechtsschutz"],
    icon: "legal",
  },
];
