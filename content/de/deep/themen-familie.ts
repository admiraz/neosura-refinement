/** Phase 7Q — content for /themen/familie, NEOSURA's first life-situation
 * page (client guide §4.15: these pages route visitors to the correct
 * NEOSURA topic pages; they sell nothing of their own). `h1`/`intro` are
 * the exact §4.15 copy, verbatim, matching `clientGuideThemen.familie`
 * in `content/de/clientGuide.ts` word-for-word (that file remains the
 * canonical source citation; this file duplicates the literal text
 * directly, following the same self-contained convention already used
 * by every other `deep/*.ts` file in this project).
 *
 * `sectionHeadingRest`/`sectionHeadingAccent` — STRUCTURALLY DERIVED —
 * CLIENT GUIDE SILENT FOR EXACT UI HEADING. §4.15 supplies only the H1/
 * intro/routing-role content, not a heading for the routing-block
 * section itself. "Diese Themen sollten Sie prüfen" is one of two
 * options this phase's own brief explicitly suggested (the other,
 * "Was sich mit einer Familie verändert", was not chosen since this
 * phrasing more directly frames the section's actual job — telling the
 * visitor which topics to look at next — matching the page's routing
 * role rather than describing life change in the abstract).
 *
 * `routingBlocks` — four blocks, exactly the four roles the client
 * guide's own intro sentence names (Krankenkasse/vorgeburtliche
 * Anmeldung, Hausrat-/Haftpflichtsummen, Absicherung des
 * Haupteinkommens, Vorsorge für die Kinder) — no fifth topic (Rechtsschutz,
 * Cyber, Auto, Reisen) was added merely to reach a rounder grid count.
 * Blocks 3 and 4 both route to `/privatkunden/vorsorge` — deliberate,
 * not an error (client guide §4.15's own two distinct family-vorsorge
 * needs, income protection and children's savings, are both served by
 * that one existing page; no separate page exists for either sub-topic).
 * Every heading/body below is STRUCTURALLY DERIVED FROM CLIENT INTRO —
 * tightly grounded in the intro's own named concepts, no invented
 * figures, percentages, deadlines, product names, or return/interest
 * claims (per this phase's own explicit "no unsupported extras" rule
 * for every block). */
export const themenFamilieDeep = {
  h1: "Familie gegründet? Zeit für den Versicherungs-Check.",
  intro:
    "Mit Kindern ändert sich alles: das Budget, die Verantwortung, die Risiken. Wir prüfen Krankenkasse (inklusive vorgeburtlicher Anmeldung des Kindes), Hausrat- und Haftpflichtsummen, die Absicherung des Haupteinkommens und den Start der Vorsorge für die Kinder.",
  sectionHeadingRest: "Diese Themen sollten Sie",
  sectionHeadingAccent: "prüfen",
  routingBlocks: [
    {
      icon: "health" as const,
      heading: "Krankenkasse für Eltern und Kind",
      body: "Wir prüfen Ihre Krankenkasse und übernehmen die vorgeburtliche Anmeldung des Kindes.",
      href: "/privatkunden/krankenkasse",
      linkLabel: "Zur Krankenkasse",
    },
    {
      icon: "home" as const,
      heading: "Hausrat & Privathaftpflicht",
      body: "Mit einem Kind ändern sich die Werte im Haushalt und die Risiken. Wir prüfen, ob Hausrat- und Haftpflichtsumme noch passen.",
      href: "/privatkunden/wohnen-eigentum",
      linkLabel: "Zu Hausrat & Haftpflicht",
    },
    {
      icon: "income" as const,
      heading: "Absicherung des Haupteinkommens",
      body: "Fällt das Haupteinkommen der Familie aus, gerät oft mehr ins Wanken als gedacht. Wir prüfen, wie gut es abgesichert ist.",
      href: "/privatkunden/vorsorge",
      linkLabel: "Zur Vorsorge",
    },
    {
      icon: "child" as const,
      heading: "Vorsorge für die Kinder",
      body: "Je früher die Vorsorge für die Kinder beginnt, desto mehr Zeit bleibt ihr zu wirken. Wir zeigen einen sinnvollen Einstieg.",
      href: "/privatkunden/vorsorge",
      linkLabel: "Zur Vorsorge",
    },
  ],
};
