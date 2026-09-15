import Image from "next/image";
import Link from "next/link";
import { ParallaxMedia } from "./ParallaxMedia";

/** FINWIWO's post-service section (Phase 7C.10, measured live at
 * y=5999px/1440px, full-bleed 1440×810 = 16:9, mobile 390×292.5 = 4:3 —
 * a DIFFERENT crop, not desktop scaled down) is a real customer-
 * testimonial video: a silent looping self-hosted background clip
 * (`nectar-video-self-hosted`, muted/loop/autoplay/playsinline) under a
 * ~0.7-opacity dark overlay, a bottom-anchored white title ("Was unsere
 * Kunden sagen", 28.8px/weight 500) + duration caption, and a small
 * (16px resting) circular play control that tracks the cursor
 * (`follow_mouse`) across the whole clickable area. Clicking opens a
 * centered modal with a real native `<video>` player (dimmed backdrop,
 * close + fullscreen controls); confirmed live that Escape closes it.
 * Mobile renders a plain embedded YouTube player with native chrome
 * instead of the background-loop treatment. Scroll: static (not
 * re-audited separately here — no motion classes on this section beyond
 * the already-confirmed static rows above it).
 *
 * NEOSURA has no genuine customer testimonial, video, quote, rating, or
 * case study anywhere in the project (searched `public/`, `public/images`,
 * `content/de/*`, `docs/photo-sources.md` — no video files exist at all,
 * and no testimonial content is documented) — media decision **C**.
 * Fabricating one is explicitly disallowed, so this preserves FINWIWO's
 * exact visual architecture (full-bleed cinematic photo, same aspect
 * ratios, same dark overlay, same bottom-anchored title position, same
 * centered circular control) without any play/video semantics: the
 * control is a truthful arrow leading to the Documents section, labelled
 * for what it actually does. Photo reused from Manifesto
 * (`manifesto-advisor.webp` — a real, licensed advisor+client
 * consultation photo, see docs/photo-sources.md) since it is the only
 * existing asset that genuinely fits "Beratung" rather than a specific
 * service; the same photo already appears once higher on this page, but
 * no unrelated or service-specific stock exists that fits this
 * generic-advisory slot better. */
export function PostServiceProof() {
  return (
    <section className="relative aspect-[4/3] w-full overflow-hidden bg-dark lg:aspect-[16/9]">
      {/* Phase 9A.2 — this section's single motion idea: a very small
          scroll-linked drift of the photograph (see `ParallaxMedia`). The
          headline and caption are deliberately not animated. */}
      <ParallaxMedia className="absolute inset-0 -top-[24px] h-[calc(100%+48px)]">
        <Image
          src="/images/services/manifesto-advisor.webp"
          alt="Beratungsgespräch zwischen einer Beraterin und einem Ehepaar"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />
      </ParallaxMedia>
      <div aria-hidden className="absolute inset-0 bg-dark/60" />

      <div className="absolute inset-x-0 bottom-0 px-6 pb-8 sm:px-8 lg:px-[60px] lg:pb-12">
        <span className="block text-[0.78rem] uppercase tracking-[0.18em] text-white/70">
          Persönliche Beratung
        </span>
        <h2 className="mt-3 max-w-[20ch] text-[1.8rem] font-normal leading-[1.15] text-white lg:text-[2rem]">
          Beratung beginnt mit Zuhören.
        </h2>
      </div>

      <Link
        href="/#dokumente"
        aria-label="Zu den Unterlagen und zur Beratung"
        className="arrow-trigger group absolute left-1/2 top-1/2 inline-flex h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 text-white transition-[background-color,color,border-color] duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:border-white hover:bg-white hover:text-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:h-[80px] lg:w-[80px]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
          className="arrow-shift h-5 w-5 lg:h-6 lg:w-6"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </section>
  );
}
