"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides, heroAutoplayDuration, heroAutoplayDefault } from "@/content/de/hero";
import { useReducedMotion } from "./useReducedMotion";

const RESUME_DELAY = 1500;

export interface HeroController {
  index: number;
  slide: (typeof heroSlides)[number];
  total: number;
  direction: 1 | -1;
  progress: number;
  reducedMotion: boolean;
  next: () => void;
  prev: () => void;
  jump: (i: number) => void;
}

declare global {
  interface Window {
    __NEOSURA_HERO_DEBUG__?: {
      goTo: (index: number) => void;
      setAutoplay: (on: boolean) => void;
      getState: () => { index: number; slideId: string; progress: number; autoplayDisabled: boolean };
    };
  }
}

export function useHeroController(): HeroController {
  const total = heroSlides.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [progress, setProgress] = useState(0);
  const [autoplayDisabled, setAutoplayDisabled] = useState(false);
  const reducedMotion = useReducedMotion();
  const pausedUntilRef = useRef(0);
  const rafRef = useRef(0);

  const goTo = useCallback(
    (i: number, dir: 1 | -1, manual: boolean) => {
      setDirection(dir);
      setIndex(((i % total) + total) % total);
      if (manual) pausedUntilRef.current = performance.now() + RESUME_DELAY;
    },
    [total]
  );

  const next = useCallback(() => goTo(index + 1, 1, true), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1, true), [goTo, index]);
  const jump = useCallback(
    (i: number) => goTo(i, i > index ? 1 : -1, true),
    [goTo, index]
  );

  const slide = heroSlides[index];
  const duration = (heroAutoplayDuration[slide.id] ?? heroAutoplayDefault) * 1000;

  useEffect(() => {
    let lastTime = performance.now();
    let elapsed = 0;

    function tick(now: number) {
      const dt = now - lastTime;
      lastTime = now;
      const paused =
        reducedMotion || autoplayDisabled || document.hidden || now < pausedUntilRef.current;
      if (!paused) {
        elapsed += dt;
        const p = Math.min(1, elapsed / duration);
        setProgress(p);
        if (p >= 1) {
          goTo(index + 1, 1, false);
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index, reducedMotion, autoplayDisabled, duration, goTo]);

  // Dev-only deterministic control surface for transition QA. Never included
  // in a production build (guarded by NODE_ENV, tree-shaken by Next.js).
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    window.__NEOSURA_HERO_DEBUG__ = {
      goTo: (i: number) => goTo(i, i > index ? 1 : -1, false),
      setAutoplay: (on: boolean) => setAutoplayDisabled(!on),
      getState: () => ({ index, slideId: slide.id, progress, autoplayDisabled }),
    };
    return () => {
      delete window.__NEOSURA_HERO_DEBUG__;
    };
  }, [index, slide.id, progress, autoplayDisabled, goTo]);

  return { index, slide, total, direction, progress, reducedMotion, next, prev, jump };
}
