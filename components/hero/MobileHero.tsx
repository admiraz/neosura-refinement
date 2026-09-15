"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { HeroController } from "@/lib/hooks/useHeroController";
import { heroSlides } from "@/content/de/hero";
import { MobileHeroScene } from "./MobileHeroScene";
import { HeroControls } from "./HeroControls";
import { HeroProgress } from "./HeroProgress";

interface MobileHeroProps {
  controller: HeroController;
  onSwipe: (dir: 1 | -1) => void;
}

interface SceneEntry {
  key: number;
  slide: (typeof heroSlides)[number];
  phase: "in" | "out";
}

const EXIT_LIFETIME_MS = 950;

export function MobileHero({ controller, onSwipe }: MobileHeroProps) {
  const { index, slide, progress, reducedMotion, next, prev } = controller;
  const [scenes, setScenes] = useState<SceneEntry[]>(() => [{ key: 0, slide: heroSlides[index], phase: "in" }]);
  const keyRef = useRef(1);
  const prevIndexRef = useRef(index);
  const touchStart = useRef<number | null>(null);
  const controlsWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index === prevIndexRef.current) return;
    prevIndexRef.current = index;
    const newKey = keyRef.current++;
    setScenes((cur) => [
      ...cur.map((s) => ({ ...s, phase: "out" as const })),
      { key: newKey, slide: heroSlides[index], phase: "in" as const },
    ]);
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

  // Phase 9A.1 — no frame platform any more: controls and progress ring both
  // follow the slide's own text mode.
  const tone = slide.textMode === "light" ? "light" : "dark";

  return (
    <div
      className="relative block h-[min(575px,84svh)] w-full overflow-hidden lg:hidden"
      onTouchStart={(e) => {
        touchStart.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStart.current == null) return;
        const delta = e.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 40) onSwipe(delta < 0 ? 1 : -1);
        touchStart.current = null;
      }}
    >
      {scenes.map((s, i) => (
        <MobileHeroScene
          key={s.key}
          slide={s.slide}
          phase={s.phase}
          reducedMotion={reducedMotion}
          zIndex={s.phase === "in" ? 20 : 10 + i}
        />
      ))}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex items-center justify-between px-6 pb-6">
        <div ref={controlsWrapRef} className="pointer-events-auto">
          <HeroControls onPrev={prev} onNext={next} tone={tone} />
        </div>
        <div className="pointer-events-auto">
          <HeroProgress progress={progress} reducedMotion={reducedMotion} tone={tone} size={28} />
        </div>
      </div>
    </div>
  );
}
