"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { HeroController } from "@/lib/hooks/useHeroController";
import { heroSlides } from "@/content/de/hero";
import { DesktopHeroScene } from "./DesktopHeroScene";
import { HeroControls } from "./HeroControls";
import { HeroProgress } from "./HeroProgress";
import { cn } from "@/lib/cn";

interface DesktopHeroProps {
  controller: HeroController;
}

interface SceneEntry {
  key: number;
  slide: (typeof heroSlides)[number];
  phase: "in" | "out";
}

/** Longer than the outgoing scene's own exit animation, so it never gets
 * yanked out mid-fade. */
const EXIT_LIFETIME_MS = 1100;

export function DesktopHero({ controller }: DesktopHeroProps) {
  const { index, slide, progress, reducedMotion, next, prev } = controller;
  const [scenes, setScenes] = useState<SceneEntry[]>(() => [{ key: 0, slide: heroSlides[index], phase: "in" }]);
  const keyRef = useRef(1);
  const prevIndexRef = useRef(index);
  const controlsWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index === prevIndexRef.current) return;
    prevIndexRef.current = index;
    const newKey = keyRef.current++;
    setScenes((cur) => [
      ...cur.map((s) => ({ ...s, phase: "out" as const })),
      { key: newKey, slide: heroSlides[index], phase: "in" as const },
    ]);

    // Controls read as part of the scene without ever losing clickability:
    // a brief opacity/position blip tied to the state change.
    if (!reducedMotion && controlsWrapRef.current) {
      gsap.fromTo(
        controlsWrapRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0.3, y: 4, duration: 0.14, yoyo: true, repeat: 1, ease: "power1.inOut" }
      );
    }
  }, [index, reducedMotion]);

  useEffect(() => {
    if (!scenes.some((s) => s.phase === "out")) return;
    const t = setTimeout(() => {
      setScenes((cur) => cur.filter((s) => s.phase !== "out"));
    }, EXIT_LIFETIME_MS);
    return () => clearTimeout(t);
  }, [scenes]);

  // Phase 9A.1 — with the purple platform gone, the controls sit directly on
  // the slide surface, so they follow the slide's own text mode like the
  // progress ring does.
  const tone = slide.textMode === "light" ? "light" : "dark";

  return (
    <div className="relative hidden h-[690px] w-full overflow-hidden lg:block">
      {scenes.map((s, i) => (
        <DesktopHeroScene
          key={s.key}
          slide={s.slide}
          phase={s.phase}
          reducedMotion={reducedMotion}
          zIndex={s.phase === "in" ? 20 : 10 + i}
        />
      ))}

      {/* Persistent chrome — never remounts, so it's always clickable even
          mid-transition. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 mx-auto flex h-[84px] max-w-[1600px] items-center px-6 sm:px-10 lg:pl-[clamp(24px,12vw,160px)] lg:pr-16">
        <div ref={controlsWrapRef} className="pointer-events-auto flex items-center gap-6">
          <HeroControls onPrev={prev} onNext={next} tone={tone} />
        </div>
        <div className="pointer-events-auto ml-auto">
          <HeroProgress progress={progress} reducedMotion={reducedMotion} tone={tone} size={32} />
        </div>
      </div>

      <span className={cn("sr-only")} aria-live="polite">
        {slide.eyebrow}
      </span>
    </div>
  );
}
