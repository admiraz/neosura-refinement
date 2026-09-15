export type Audience = "privat" | "unternehmen";

export interface ServiceItem {
  slug: string;
  title: string;
  /** Short body copy, verbatim/adapted from neosura.ch */
  body: string;
  /** Sub-topics as used in the mega menu and service page "Kernbereiche" list */
  bullets: string[];
  icon: ServiceIconKey;
}

export type ServiceIconKey =
  | "health"
  | "home"
  | "vehicle"
  | "forecast"
  | "legal"
  | "liability"
  | "fleet"
  | "pension"
  | "inventory"
  | "accident";

export interface PrincipleItem {
  title: string;
  body: string;
  icon: "shield" | "person" | "target" | "compass";
}

export interface ProcessStep {
  num: string;
  title: string;
  body: string;
  mascot: string;
}

/** Per-breakpoint art direction for a hero state's mascot — deliberately
 * hand-tuned per slide rather than one universal bounding box. */
export interface HeroVisualConfig {
  /** Tailwind width class fragment, e.g. "44%" */
  width: string;
  height: string;
  /** Positive = inset from edge, negative = bleed past it (editorial crop) */
  right?: string;
  left?: string;
  bottom: string;
  objectPosition: "right bottom" | "center bottom" | "left bottom" | "center center";
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  headlineLines: string[];
  body: string;
  supporting?: string;
  /** Brand/intro state intentionally omits a CTA */
  ctaPrimary?: { label: string; href: string };
  mascot: { src: string; alt: string };
  theme: "brand" | "privat" | "unternehmen" | "schaden" | "vorsorge" | "analyse";
  /** Background treatment for the scene */
  surface: "photo" | "lavender" | "teal" | "neutral" | "purple-tint";
  /** Full-bleed background photograph for photo scenes. The brand scene omits
   * it: its image is a composed render with the bear and scrim baked in. */
  photo?: {
    src: string;
    /** CSS object-position, chosen per crop so the subject clears copy and bear */
    positionDesktop: string;
    positionMobile: string;
    /** CSS filter override for a photo whose colour fights the brand */
    filter?: string;
  };
  /** Typography reads light-on-dark on photographic scenes */
  textMode: "light" | "dark";
  /** Bottom-left platform + top-right block color */
  frameAccent: "purple" | "teal";
  visualDesktop: HeroVisualConfig;
  visualMobile: HeroVisualConfig;
}

export interface NavSubtopic {
  label: string;
  /** Anchor id on the service's own page, e.g. "grundversicherung" — the
   * same real chapter ids ServiceLocalNav already links to. */
  anchor: string;
}

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  /** Real chapter-level deep links already documented in neosura-ia.md —
   * never invented. Absent for items with no genuine chapter split. */
  subtopics?: NavSubtopic[];
}

export interface NavItem {
  label: string;
  href: string;
  megaMenu?: {
    intro: string;
    columns: {
      title: string;
      href: string;
      children: NavChild[];
    }[];
  };
}
