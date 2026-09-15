import { privateIntro, privateServices } from "./private";
import { businessIntro, businessServices } from "./business";
import { PRIVATE_SUBTOPICS, BUSINESS_SUBTOPICS } from "./serviceSubtopics";
import type { NavItem } from "./types";

// Phase 7M.0 — Familie/Neu in der Schweiz are genuine life-stage content
// hubs (client guide §11), not insurance services — kept out of
// `privateServices` (which stays pure service data feeding routes,
// showcase cards, extras/visuals index-alignment) and appended here as
// plain nav children instead.
const PRIVATE_THEME_CHILDREN = [
  { label: "Familie", href: "/themen/familie" },
  { label: "Neu in der Schweiz", href: "/themen/neu-in-der-schweiz" },
];

export const navItems: NavItem[] = [
  {
    label: "Privatkunden",
    href: "/privatkunden",
    megaMenu: {
      intro: privateIntro.title,
      columns: [
        {
          title: privateIntro.title,
          href: "/privatkunden",
          children: [
            ...privateServices.map((s) => ({
              label: s.title,
              href: `/privatkunden/${s.slug}`,
              description: s.body,
              subtopics: PRIVATE_SUBTOPICS[s.slug],
            })),
            ...PRIVATE_THEME_CHILDREN,
          ],
        },
      ],
    },
  },
  {
    label: "Unternehmen",
    href: "/unternehmen",
    megaMenu: {
      intro: businessIntro.title,
      columns: [
        {
          title: businessIntro.title,
          href: "/unternehmen",
          children: businessServices.map((s) => ({
            label: s.title,
            href: `/unternehmen/${s.slug}`,
            description: s.body,
            subtopics: BUSINESS_SUBTOPICS[s.slug],
          })),
        },
      ],
    },
  },
  { label: "So funktioniert's", href: "/ablauf" },
  { label: "Schadenfall", href: "/schadenfall" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];
