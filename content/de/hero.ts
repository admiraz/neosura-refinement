import type { HeroSlide } from "./types";

export const heroSlides: HeroSlide[] = [
  {
    // Phase 7M.1 — headline/body/supporting are the client guide §4.1
    // hero copy verbatim ("Ihr digitaler Versicherungsbroker." + exact
    // subline), split across the two existing text slots without adding
    // any new ones. The guide also specifies two hero CTA buttons, but
    // this brand slide's single-CTA-less architecture is a deliberate,
    // documented design choice (see HeroSlide.ctaPrimary) — adding button
    // UI here is a visual change, out of scope for a copy-only pass; see
    // docs/CLIENT_GUIDE_MERGE.md Client Copy Compliance section.
    id: "brand",
    eyebrow: "Versicherungsbroker in der Schweiz",
    headlineLines: ["Ihr digitaler", "Versicherungsbroker."],
    body: "Wir vergleichen den Schweizer Versicherungsmarkt für Sie, unabhängig und kostenlos. Für Privatpersonen und Unternehmen.",
    supporting: "Einfach. Klar. Persönlich.",
    mascot: { src: "/images/bear-sitting.webp", alt: "" },
    theme: "brand",
    surface: "photo",
    textMode: "light",
    frameAccent: "purple",
    visualDesktop: { width: "24%", height: "56%", right: "-1%", bottom: "0%", objectPosition: "right bottom" },
    visualMobile: { width: "52%", height: "34%", right: "2%", bottom: "0%", objectPosition: "right bottom" },
  },
  // Slides 2–6 share the brand slide's photographic system: full-bleed photo,
  // directional dark scrim, light type. Photos are the project's existing
  // licensed service photography (docs/photo-sources.md); none repeats an
  // image used further down the homepage. Crops keep each subject clear of the
  // copy column (left). These slides no longer render their `mascot`; the
  // field stays in the data (the type requires it) but the scenes ignore it.
  {
    id: "privatkunden",
    eyebrow: "Für Privatpersonen",
    headlineLines: ["Persönliche", "Absicherung."],
    body: "Durchdachte Versicherungslösungen und strategisch aufgebaute Vorsorgekonzepte schaffen langfristige Sicherheit und finanzielle Stabilität.",
    ctaPrimary: { label: "Privatkunden entdecken", href: "/privatkunden" },
    mascot: { src: "/images/bear-pointing.png", alt: "" },
    theme: "privat",
    surface: "photo",
    photo: { src: "/images/services/private-home.webp", positionDesktop: "center 64%", positionMobile: "30% center" },
    textMode: "light",
    frameAccent: "purple",
    visualDesktop: { width: "40%", height: "84%", right: "-10%", bottom: "0%", objectPosition: "right bottom" },
    visualMobile: { width: "70%", height: "54%", right: "-14%", bottom: "0%", objectPosition: "right bottom" },
  },
  {
    id: "unternehmen",
    eyebrow: "Für Unternehmen",
    headlineLines: ["Unternehmen", "vorausschauend absichern."],
    body: "Wir entwickeln ganzheitliche Versicherungslösungen für Unternehmen mit Fokus auf Stabilität, Resilienz und nachhaltige Absicherung.",
    ctaPrimary: { label: "Lösungen für Unternehmen", href: "/unternehmen" },
    mascot: { src: "/images/bear-trust.webp", alt: "" },
    theme: "unternehmen",
    surface: "photo",
    // Blue glass sky is calmed and darkened so it sits with the purple brand
    // and the pale mascot reads against it.
    photo: {
      src: "/images/services/business-property.webp",
      positionDesktop: "center 72%",
      positionMobile: "52% center",
      filter: "saturate(0.55) brightness(0.8)",
    },
    textMode: "light",
    frameAccent: "purple",
    visualDesktop: { width: "34%", height: "68%", right: "-9%", bottom: "0%", objectPosition: "right bottom" },
    visualMobile: { width: "66%", height: "56%", right: "-14%", bottom: "0%", objectPosition: "right bottom" },
  },
  {
    id: "schadenfall",
    eyebrow: "Im Schadenfall an Ihrer Seite",
    headlineLines: ["Unterstützung im", "Schadenfall"],
    body: "Im entscheidenden Moment stehen wir an Ihrer Seite und begleiten Sie effizient, transparent und strukturiert durch den gesamten Prozess.",
    ctaPrimary: { label: "Mehr erfahren", href: "/#ansatz" },
    mascot: { src: "/images/bear-approach-3.webp", alt: "" },
    theme: "schaden",
    surface: "photo",
    photo: { src: "/images/services/private-car-editorial.webp", positionDesktop: "center 58%", positionMobile: "30% center" },
    textMode: "light",
    frameAccent: "purple",
    visualDesktop: { width: "36%", height: "78%", right: "-13%", bottom: "0%", objectPosition: "right bottom" },
    visualMobile: { width: "80%", height: "64%", right: "-6%", bottom: "0%", objectPosition: "right bottom" },
  },
  {
    id: "vorsorge",
    // Phase 7Z.A — "Vorsorge & Vermögen" was the pre-rename service title;
    // corrected to the current canonical "Vorsorge" (content/de/private.ts).
    eyebrow: "Vorsorge",
    headlineLines: ["Vorsorge für", "Ihre Zukunft"],
    body: "Wir verbinden Vorsorge, Vermögensaufbau und Absicherung zu einer langfristig tragfähigen finanziellen Struktur.",
    ctaPrimary: { label: "Vorsorge entdecken", href: "/privatkunden/vorsorge" },
    mascot: { src: "/images/bear-approach-2.webp", alt: "" },
    theme: "vorsorge",
    surface: "photo",
    photo: { src: "/images/services/private-health-editorial.webp", positionDesktop: "center 34%", positionMobile: "46% center" },
    textMode: "light",
    frameAccent: "teal",
    visualDesktop: { width: "35%", height: "76%", right: "-11%", bottom: "0%", objectPosition: "right bottom" },
    visualMobile: { width: "66%", height: "54%", right: "-10%", bottom: "0%", objectPosition: "right bottom" },
  },
  {
    id: "analyse",
    eyebrow: "So funktioniert's",
    headlineLines: ["Analyse.", "Struktur. Begleitung."],
    body: "Laden Sie Ihre Unterlagen sicher hoch — wir analysieren Ihre Situation ganzheitlich und melden uns mit einer klar strukturierten Einschätzung.",
    ctaPrimary: { label: "Kostenlose Analyse starten", href: "/#dokumente" },
    mascot: { src: "/images/bear-approach-1.webp", alt: "" },
    theme: "analyse",
    surface: "photo",
    photo: { src: "/images/services/private-cyber-editorial.webp", positionDesktop: "center 58%", positionMobile: "18% center" },
    textMode: "light",
    frameAccent: "purple",
    visualDesktop: { width: "34%", height: "76%", right: "-12%", bottom: "0%", objectPosition: "right bottom" },
    visualMobile: { width: "64%", height: "54%", right: "-14%", bottom: "0%", objectPosition: "right bottom" },
  },
];

/** Seconds each state stays visible during autoplay. Brand stays slightly longer. */
export const heroAutoplayDuration: Record<string, number> = {
  brand: 8.5,
};
export const heroAutoplayDefault = 7;
