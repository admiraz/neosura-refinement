/** Phase 7R — content for /themen/neu-in-der-schweiz, NEOSURA's second
 * life-situation page. `h1`/`intro` are the exact §4.15 copy, verbatim,
 * matching `clientGuideThemen.neuInDerSchweiz` in `content/de/clientGuide.ts`
 * word-for-word (that file remains the canonical source citation; this
 * file duplicates the literal text directly, following the same
 * self-contained convention used by every other `deep/*.ts` file).
 *
 * `routingBlocks` — THREE blocks (client guide requires 3-4; a 4th was
 * not invented to round out a grid). Unlike Familie's intro (which names
 * four topics explicitly), this page's intro is narrower — it discusses
 * the Swiss health-insurance system specifically (Krankenversicherungs-
 * pflicht, Franchise, Selbstbehalt, "obligatorisch und freiwillig").
 * Sourcing per block:
 *
 * 1. Krankenkasse — VERBATIM-sourced: the intro's own explicit
 *    three-month deadline ("innert drei Monaten nach Zuzug") and its own
 *    named mechanics (Franchise, Selbstbehalt).
 * 2. Hausrat & Privathaftpflicht — STRUCTURALLY DERIVED from the intro's
 *    own "obligatorisch und freiwillig" framing (this is the page's own
 *    stated voluntary-insurance half) plus the general, non-invented
 *    Swiss norm that a rented apartment typically requires or strongly
 *    expects Haftpflicht/Hausrat cover — no specific landlord clause,
 *    canton, or figure is stated.
 * 3. Vorsorge (Säule 3a) — STRUCTURALLY DERIVED from the same
 *    "obligatorisch und freiwillig" framing (Säule 3a is the classic
 *    voluntary pillar a newcomer has typically not yet set up) — no
 *    return, interest rate, or tax-saving figure is stated.
 *
 * A 4th candidate, Fahrzeug/Mobilität, was considered (this phase's own
 * brief names it as a possibility) and explicitly NOT included — no
 * newcomer-specific textual anchor supports it as clearly as the other
 * two, and not every newcomer arrives with or immediately needs a
 * vehicle (unlike the near-universal apartment/Vorsorge relevance).
 *
 * `englishNote` — a concise UI statement grounded directly in the
 * intro's own closing clause ("auf Wunsch auf Englisch"), not expanded
 * into a broader multilingual-service claim. */
export const themenNeuInDerSchweizDeep = {
  h1: "Willkommen in der Schweiz. Wir erklären Ihnen das Versicherungssystem.",
  intro:
    "Krankenversicherungspflicht innert drei Monaten nach Zuzug, Franchise, Selbstbehalt, obligatorisch und freiwillig: Das Schweizer System ist für Zuzügerinnen und Zuzüger unübersichtlich. Wir richten Ihren Versicherungsschutz von Grund auf ein, auf Wunsch auf Englisch.",
  englishNote: "Beratung auch auf Englisch möglich.",
  sectionHeadingRest: "Diese Themen sollten Sie",
  sectionHeadingAccent: "klären",
  routingBlocks: [
    {
      icon: "health" as const,
      heading: "Krankenkasse innert drei Monaten",
      body: "Die Krankenversicherung ist innert drei Monaten nach Zuzug Pflicht. Wir erklären Franchise, Selbstbehalt und wählen das passende Modell.",
      href: "/privatkunden/krankenkasse",
      linkLabel: "Zur Krankenkasse",
    },
    {
      icon: "home" as const,
      heading: "Hausrat & Privathaftpflicht",
      body: "Zur eigenen Wohnung gehört meist auch die freiwillige Absicherung von Hausrat und Haftpflicht. Wir richten sie von Grund auf ein.",
      href: "/privatkunden/wohnen-eigentum",
      linkLabel: "Zu Hausrat & Haftpflicht",
    },
    {
      icon: "savings" as const,
      heading: "Vorsorge (Säule 3a)",
      body: "Die freiwillige Säule 3a haben die wenigsten Neuzuzüger bereits eingerichtet. Wir zeigen einen sinnvollen Einstieg.",
      href: "/privatkunden/vorsorge",
      linkLabel: "Zur Vorsorge",
    },
  ],
};
