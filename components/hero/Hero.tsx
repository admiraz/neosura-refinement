"use client";

import { getImageProps } from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { heroSlides } from "@/content/de/hero";
import { useHeroController } from "@/lib/hooks/useHeroController";
import { DesktopHero } from "./DesktopHero";
import { MobileHero } from "./MobileHero";

export function Hero() {
  const controller = useHeroController();
  const sectionRef = useRef<HTMLElement>(null);

  const onSwipe = useCallback(
    (dir: 1 | -1) => {
      if (dir === 1) controller.next();
      else controller.prev();
    },
    [controller]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    function onKeyDown(e: KeyboardEvent) {
      if (!section?.contains(document.activeElement) && document.activeElement !== document.body) {
        return;
      }
      if (e.key === "ArrowRight") controller.next();
      if (e.key === "ArrowLeft") controller.prev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller.next, controller.prev]);

  // Slides mount on demand, so a photo not yet in cache would fade in over
  // the dark fallback. Once the page is idle, warm each slide photo with the
  // exact URL next/image will request (same srcset/sizes as the scenes).
  useEffect(() => {
    const warm = () => {
      for (const s of heroSlides) {
        if (!s.photo) continue;
        const { props } = getImageProps({ src: s.photo.src, alt: "", fill: true, sizes: "100vw" });
        const img = new window.Image();
        if (props.sizes) img.sizes = props.sizes;
        if (props.srcSet) img.srcset = props.srcSet;
        img.src = props.src;
      }
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warm, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(warm, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={sectionRef} aria-label="Neosura Vorstellung" aria-roledescription="Bildschirmpräsentation">
      {/* The single semantic H1 for the page. DesktopHeroScene/MobileHeroScene
          render the visible per-slide headline as a styled <p> — this is the
          only real <h1> in the DOM, at every viewport, so automated and
          assistive-tech heading counts never see the two-scene architecture
          as duplicate content. */}
      <h1 className="sr-only">{controller.slide.headlineLines.join(" ")}</h1>
      <DesktopHero controller={controller} />
      <MobileHero controller={controller} onSwipe={onSwipe} />
    </section>
  );
}
