"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { HeroSlide } from "@/content/de/types";
import { cn } from "@/lib/cn";
import { HeroEditorialCta } from "./HeroEditorialCta";

interface MobileHeroSceneProps {
  slide: HeroSlide;
  phase: "in" | "out";
  reducedMotion: boolean;
  zIndex: number;
}

const SURFACE_CLASS: Record<HeroSlide["surface"], string> = {
  photo: "bg-dark",
  lavender: "bg-paper",
  teal: "bg-purple-100",
  neutral: "bg-paper-2",
  "purple-tint": "bg-purple-100",
};

const SURFACE_GRADIENT: Record<HeroSlide["surface"], string | undefined> = {
  photo: undefined,
  lavender: "linear-gradient(160deg, #f9f5ff 0%, #f6f1fb 55%, #eee5f8 100%)",
  teal: "linear-gradient(160deg, #ffffff 0%, #f2fcfc 55%, #e3f8f8 100%)",
  neutral: "linear-gradient(160deg, #fbfaf8 0%, #f6f3ee 55%, #f0ebe2 100%)",
  "purple-tint": "linear-gradient(160deg, #f6f1fb 0%, #f1e9f8 55%, #e9dcf3 100%)",
};

/** Mobile scrim for the service photo slides: the copy stacks over the upper
 * half, so the brand slide's vertical scrim is kept and deepened for these
 * brighter photographs, with a returning low band behind the controls. */
const PHOTO_SCRIM =
  "linear-gradient(180deg, rgba(20,8,31,0.72) 0%, rgba(20,8,31,0.62) 48%, rgba(20,8,31,0.3) 72%, rgba(20,8,31,0.52) 100%)";

/** A full-bleed editorial "poster": headline pinned near the top over the
 * photograph, and the CTA sitting lower in the scene rather than immediately
 * under the body copy. Only the brand scene shows the bear (baked into its
 * image); the service slides are photography only. */
export function MobileHeroScene({ slide, phase, reducedMotion, zIndex }: MobileHeroSceneProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  // See DesktopHeroScene: an interrupted crossfade holds instead of snapping.
  const heldOpacity = useRef<{ surface: number; photo: number } | null>(null);

  const light = slide.textMode === "light";
  const isBrand = slide.theme === "brand";

  useEffect(() => {
    const surface = surfaceRef.current;
    const headline = headlineRef.current;
    const eyebrow = eyebrowRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;
    const photo = photoRef.current;
    if (!surface || !headline) return;

    const allEls = [surface, headline, eyebrow, body, cta, photo].filter(Boolean) as HTMLElement[];

    if (reducedMotion) {
      gsap.set(allEls, { clearProps: "all" });
      gsap.set(surface, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      if (phase === "in") {
        if (photo) {
          // Photo-over-photo crossfade; the dark fallback surface arrives only
          // once the photo is fully in (see DesktopHeroScene).
          tl.fromTo(surface, { opacity: 0 }, { opacity: 1, duration: 0.01 }, 0.65);
          tl.fromTo(photo, { opacity: 0 }, { opacity: 1, duration: 0.65, ease: "power2.inOut" }, 0);
        } else {
          tl.fromTo(surface, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power1.out" }, 0);
        }
        if (eyebrow) tl.fromTo(eyebrow, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: "power1.out" }, 0.1);
        // Headline starts ~140ms after the photo, body ~180ms — the same
        // measured stagger as desktop, scaled to mobile's shorter timeline.
        tl.fromTo(headline, { opacity: 0 }, { opacity: 1, duration: 0.16, ease: "power1.out" }, 0.14);
        tl.fromTo(headline, { y: 34 }, { y: 0, duration: 0.62, ease: "power2.inOut" }, 0.14);
        if (body) {
          tl.fromTo(body, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power1.out" }, 0.18);
          tl.fromTo(body, { y: -24 }, { y: 0, duration: 0.6, ease: "power2.inOut" }, 0.18);
        }
        if (cta) tl.fromTo(cta, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.38, ease: "power2.out" }, 0.32);
      } else {
        tl.to(headline, { opacity: 0, y: -26, duration: 0.8, ease: "power1.in" }, 0.08);
        if (body) tl.to(body, { opacity: 0, y: 18, duration: 0.65, ease: "power1.in" }, 0.08);
        if (eyebrow) tl.to(eyebrow, { opacity: 0, duration: 0.5, ease: "power1.in" }, 0.08);
        if (cta) tl.to(cta, { opacity: 0, duration: 0.6, ease: "power1.in" }, 0.08);
        if (photo) {
          if (heldOpacity.current) {
            gsap.set(surface, { opacity: heldOpacity.current.surface });
            gsap.set(photo, { opacity: heldOpacity.current.photo });
          }
        } else {
          tl.to(surface, { opacity: 0, duration: 0.5, ease: "power1.in" }, 0.12);
        }
      }
    });
    return () => {
      if (photo) {
        heldOpacity.current = {
          surface: Number(gsap.getProperty(surface, "opacity")),
          photo: Number(gsap.getProperty(photo, "opacity")),
        };
      }
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <div className="absolute inset-0" style={{ zIndex }}>
      <div
        ref={surfaceRef}
        className={cn("absolute inset-0", SURFACE_CLASS[slide.surface])}
        style={SURFACE_GRADIENT[slide.surface] ? { backgroundImage: SURFACE_GRADIENT[slide.surface] } : undefined}
      />
      {slide.surface === "photo" && !slide.photo && (
        <div ref={photoRef} className="absolute inset-0">
          <Image
            src="/images/bg-hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            /* Phase 8A — the default centre crop cut the scene's subject out of
               frame on mobile, leaving an unreadable slice of background. */
            style={{ filter: "brightness(1.08) saturate(0.94)", objectPosition: "78% center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/36 via-dark/6 to-dark/14" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(20,8,31,0.56) 0%, rgba(20,8,31,0.45) 46%, rgba(20,8,31,0.14) 74%, rgba(20,8,31,0.03) 100%)",
            }}
          />
        </div>
      )}
      {slide.surface === "photo" && slide.photo && (
        <div ref={photoRef} className="absolute inset-0">
          <Image
            src={slide.photo.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: slide.photo.positionMobile, filter: slide.photo.filter ?? "saturate(0.86)" }}
          />
          <div aria-hidden className="absolute inset-0" style={{ backgroundImage: PHOTO_SCRIM }} />
        </div>
      )}

      <div className="relative z-30 h-full px-6 pt-16">
        <span ref={eyebrowRef} className={cn("mb-3 block text-[0.66rem] uppercase tracking-[0.2em]", light ? "text-white/70" : "text-purple")}>
          {slide.eyebrow}
        </span>
        <p
          ref={headlineRef}
          className={cn(
            "max-w-[15ch] font-bold leading-[1.12] tracking-[-0.01em]",
            isBrand ? "text-[clamp(1.7rem,7vw,2.1rem)]" : "text-[clamp(2rem,8.4vw,2.4rem)]",
            light ? "text-white" : "text-ink"
          )}
        >
          {slide.headlineLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>
        <p
          ref={bodyRef}
          className={cn(
            "mt-3 max-w-[28ch] text-[0.95rem] font-light leading-relaxed",
            light ? "text-white/95" : "text-ink-soft"
          )}
        >
          {slide.body}
        </p>

        {slide.ctaPrimary && (
          <div ref={ctaRef} className="mt-7">
            <HeroEditorialCta href={slide.ctaPrimary.href} label={slide.ctaPrimary.label} tone={light ? "light" : "dark"} />
          </div>
        )}
      </div>
    </div>
  );
}
