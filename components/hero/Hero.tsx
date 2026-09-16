"use client";

import { heroSlides } from "@/content/de/hero";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { DesktopHeroScene } from "./DesktopHeroScene";
import { MobileHeroScene } from "./MobileHeroScene";

/** Change Request 1 §6 — one static hero instead of the slider: the client
 * judged the rotation to add nothing and cost load time. The brand state
 * (content/de/hero.ts, first entry) is what remains; its scene, photograph
 * and one-time entrance are unchanged, but there is no autoplay, no
 * Zurück/Weiter control, no progress ring and no swipe.
 *
 * `DesktopHero`/`MobileHero` (the slider shells) and the remaining slide
 * data are deliberately left in the repository rather than deleted, so the
 * rotation can be restored without rebuilding it. */
const slide = heroSlides[0];

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section aria-label="Neosura Vorstellung">
      {/* The single semantic H1 for the page: the scenes render the visible
          headline as a styled <p>, so assistive tech and automated heading
          counts never see the two-scene (desktop/mobile) architecture as
          duplicate content. */}
      <h1 className="sr-only">{slide.headlineLines.join(" ")}</h1>

      <div className="relative hidden h-[690px] w-full overflow-hidden lg:block">
        <DesktopHeroScene slide={slide} phase="in" reducedMotion={reducedMotion} zIndex={10} />
      </div>

      <div className="relative block h-[min(575px,84svh)] w-full overflow-hidden lg:hidden">
        <MobileHeroScene slide={slide} phase="in" reducedMotion={reducedMotion} zIndex={10} />
      </div>
    </section>
  );
}
