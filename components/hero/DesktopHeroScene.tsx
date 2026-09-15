"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { HeroSlide } from "@/content/de/types";
import { cn } from "@/lib/cn";
import { HeroEditorialCta } from "./HeroEditorialCta";

interface DesktopHeroSceneProps {
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

/** Barely-perceptible tonal depth behind the subject — not a visible
 * "gradient effect," just enough to avoid a flat SaaS fill. */
const SURFACE_GRADIENT: Record<HeroSlide["surface"], string | undefined> = {
  photo: undefined,
  lavender: "linear-gradient(110deg, #f9f5ff 0%, #f6f1fb 45%, #eee5f8 100%)",
  teal: "linear-gradient(110deg, #ffffff 0%, #f2fcfc 45%, #e3f8f8 100%)",
  neutral: "linear-gradient(110deg, #fbfaf8 0%, #f6f3ee 50%, #f0ebe2 100%)",
  "purple-tint": "linear-gradient(110deg, #f6f1fb 0%, #f1e9f8 45%, #e9dcf3 100%)",
};

/** Scrim for the service photo slides — the brand slide's directional
 * treatment, deepened because these photographs are brighter than its render
 * (which carries its own dark left edge): strongest behind the copy column,
 * clearing toward the subject, plus a low band so the controls stay legible. */
const PHOTO_SCRIM =
  "linear-gradient(90deg, rgba(20,8,31,0.74) 0%, rgba(20,8,31,0.62) 32%, rgba(20,8,31,0.28) 60%, rgba(20,8,31,0.1) 100%)," +
  "linear-gradient(0deg, rgba(20,8,31,0.5) 0%, rgba(20,8,31,0) 26%)," +
  "linear-gradient(180deg, rgba(20,8,31,0.24) 0%, rgba(20,8,31,0) 22%)";

export function DesktopHeroScene({ slide, phase, reducedMotion, zIndex }: DesktopHeroSceneProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  // Live background opacity captured before a timeline is reverted, so a
  // scene interrupted mid-crossfade holds where it was instead of snapping.
  const heldOpacity = useRef<{ surface: number; photo: number } | null>(null);

  const light = slide.textMode === "light";
  const isBrand = slide.theme === "brand";

  useEffect(() => {
    const surface = surfaceRef.current;
    const eyebrow = eyebrowRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;
    const photo = photoRef.current;
    if (!surface || !eyebrow || !headline) return;

    const allEls = [surface, eyebrow, headline, body, cta, photo].filter(Boolean) as HTMLElement[];

    if (reducedMotion) {
      gsap.set(allEls, { clearProps: "all" });
      gsap.set(surface, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (phase === "in") {
        if (photo) {
          // Photo over photo: the incoming image crossfades over the outgoing
          // scene, which stays opaque underneath. The dark fallback surface
          // only arrives once the photo is fully in — fading it in earlier
          // dipped the outgoing photo toward dark mid-transition.
          tl.fromTo(surface, { opacity: 0 }, { opacity: 1, duration: 0.01 }, 0.75);
          // ~750ms, close to FINWIWO's measured ~730ms/800ms house speed for
          // big spatial gestures, on the hero's ease-in-out curve (motion.md).
          tl.fromTo(photo, { opacity: 0 }, { opacity: 1, duration: 0.75, ease: "power2.inOut" }, 0);
        } else {
          tl.fromTo(surface, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.out" }, 0);
        }

        // Eyebrow: quick fade, just ahead of the headline.
        tl.fromTo(eyebrow, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power1.out" }, 0.1);

        // Headline starts ~165ms after the photo — the measured stagger
        // between the incoming image and incoming headline (motion.md §2.1).
        // Opacity resolves fast (readable almost immediately) while the
        // y-position settles on the same ease-in-out curve as the photo.
        tl.fromTo(headline, { opacity: 0 }, { opacity: 1, duration: 0.16, ease: "power1.out" }, 0.165);
        tl.fromTo(headline, { y: 82 }, { y: 0, duration: 0.72, ease: "power2.inOut" }, 0.165);

        // Body/support copy starts ~215ms after the photo (measured
        // ~50ms after the headline) — same fast-opacity / eased-position split.
        if (body) {
          tl.fromTo(body, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power1.out" }, 0.215);
          tl.fromTo(body, { y: -60 }, { y: 0, duration: 0.7, ease: "power2.inOut" }, 0.215);
        }

        if (cta) {
          tl.fromTo(cta, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.35);
        }
      } else {
        // Outgoing: stays fully visible at t=0, then fades+moves over a
        // longer window (headline ~1s total) so the old content visibly
        // lingers rather than disappearing by 300-400ms — "power1.in" holds
        // opacity higher for longer before the drop, vs. power2.in's earlier fall-off.
        tl.to(headline, { opacity: 0, y: 95, duration: 0.9, ease: "power1.in" }, 0.1);
        if (body) tl.to(body, { opacity: 0, y: -40, duration: 0.7, ease: "power1.in" }, 0.1);
        tl.to(eyebrow, { opacity: 0, duration: 0.6, ease: "power1.in" }, 0.1);
        if (cta) tl.to(cta, { opacity: 0, duration: 0.7, ease: "power1.in" }, 0.1);
        if (photo) {
          // Background holds under the incoming scene until it is removed.
          if (heldOpacity.current) {
            gsap.set(surface, { opacity: heldOpacity.current.surface });
            gsap.set(photo, { opacity: heldOpacity.current.photo });
          }
        } else {
          tl.to(surface, { opacity: 0, duration: 0.6, ease: "power1.in" }, 0.15);
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
            style={{ filter: "brightness(1.08) saturate(0.94)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/36 via-dark/6 to-dark/14" />
          {/* Phase 8A — the reference hero's copy sits on a dark video and is
              fully legible; NEOSURA's photo is bright, so the copy side gets a
              matching horizontal scrim instead of relying on the vertical one
              alone. Clears completely over the right half so the scene stays
              visible. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(20,8,31,0.48) 0%, rgba(20,8,31,0.36) 34%, rgba(20,8,31,0.11) 62%, rgba(20,8,31,0) 80%)",
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
            style={{ objectPosition: slide.photo.positionDesktop, filter: slide.photo.filter ?? "saturate(0.86)" }}
          />
          <div aria-hidden className="absolute inset-0" style={{ backgroundImage: PHOTO_SCRIM }} />
        </div>
      )}

      {isBrand ? (
        <div className="relative z-30 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-[110px] sm:px-10 lg:pl-[clamp(24px,12vw,160px)] lg:pr-16">
          <span
            ref={eyebrowRef}
            className="mb-5 inline-flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.24em] text-white/70"
          >
            <span className="h-px w-8 bg-white/30" aria-hidden />
            {slide.eyebrow}
          </span>
          <p
            ref={headlineRef}
            className="max-w-[15ch] text-[clamp(2rem,3.6vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.02em] text-white"
          >
            {slide.headlineLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
          {(slide.body || slide.supporting) && (
            <p ref={bodyRef} className="mt-4 max-w-[46ch] text-[1.05rem] font-light leading-relaxed text-white/95">
              {slide.body}
              {slide.supporting && (
                <>
                  <br />
                  <span className="font-normal text-teal">{slide.supporting}</span>
                </>
              )}
            </p>
          )}
        </div>
      ) : (
        /* Phase 9A.1 — one composition instead of four islands: the headline
           used to sit bottom-left while its own body copy and CTA sat in a
           separate column top-right, with an empty field between them. Eyebrow
           -> headline -> body -> CTA now read as a single left column, with the
           photograph holding the right side. */
        <div className="relative z-30 mx-auto flex h-full max-w-[1600px] items-center px-6 sm:px-10 lg:pl-[clamp(24px,12vw,160px)] lg:pr-16">
          <div className="max-w-[540px] pb-[72px]">
            <span
              ref={eyebrowRef}
              className={cn(
                "mb-5 inline-flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.24em]",
                light ? "text-white/75" : "text-purple"
              )}
            >
              <span className={cn("h-px w-8", light ? "bg-teal/70" : "bg-purple/40")} aria-hidden />
              {slide.eyebrow}
            </span>
            <p
              ref={headlineRef}
              className={cn(
                "max-w-[13ch] text-[clamp(2.5rem,4.4vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em]",
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
                "mt-5 max-w-[44ch] text-[1.05rem] font-light leading-relaxed",
                light ? "text-white/90" : "text-ink-soft"
              )}
            >
              {slide.body}
            </p>
            {slide.supporting && (
              <p className={cn("mt-2 text-[0.95rem]", light ? "text-white/60" : "text-muted")}>
                {slide.supporting}
              </p>
            )}
            {slide.ctaPrimary && (
              <div ref={ctaRef} className="mt-7">
                <HeroEditorialCta href={slide.ctaPrimary.href} label={slide.ctaPrimary.label} tone={light ? "light" : "dark"} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
