import Image from "next/image";
import { about } from "@/content/de/about";

/** FINWIWO-style "photograph as architecture" hero for the About page —
 * the same asymmetric flush-photo grammar as the homepage Manifesto, at
 * hero scale (H1, first section on the page) and mirrored (text left,
 * photo right). Reuses the existing licensed advisor photo already used
 * for this exact content elsewhere — no new photography needed for a
 * section that's already genuinely illustrated.
 *
 * Phase 8J — re-measured against `finwiwo.ch/ueber-finwiwo/`. Its story
 * rows split the viewport 50/50: a full-bleed photo half with no radius
 * beside a text column that starts at the page grid (H2 30/400/35, body
 * 16/300/24, ~432px measure); the page title above sits under a small
 * pill ("Über FINWIWO") at 48/900. Here the split becomes an exact half,
 * the photo loses its 2px radius, the "Über uns" eyebrow becomes the
 * approved chip, the H1 moves from 48/400 to 48/900 (sentence case, 50px
 * leading, sized from the viewport on phones so no word can clip), and
 * the intro from 17.9/400 to 16/300/24 in a 520px measure. The text
 * column's left edge follows the container grid at every width. */
export function AboutHero() {
  return (
    <section className="overflow-hidden bg-paper">
      <div className="lg:flex lg:flex-row-reverse lg:items-stretch">
        <div className="relative h-[280px] w-full sm:h-[420px] lg:h-auto lg:min-h-[600px] lg:w-1/2">
          <Image
            src="/images/services/manifesto-advisor.webp"
            alt="Beratungsgespräch in einem modernen Büro"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        </div>

        <div className="px-6 py-12 sm:px-8 lg:flex lg:w-1/2 lg:items-center lg:py-[72px] lg:pl-[max(60px,calc((100vw-1320px)/2))] lg:pr-16">
          <div className="lg:max-w-[520px]">
            <span className="inline-flex h-[29px] items-center rounded-full bg-gradient-to-r from-purple/80 to-purple px-[14.4px] text-[0.9rem] font-light leading-none tracking-[-0.1px] text-white">
              Über uns
            </span>
            <h1 className="mt-4 text-[clamp(1.6rem,calc(8vw-4px),1.875rem)] font-black leading-[1.13] tracking-normal text-ink lg:text-[3rem] lg:leading-[50px]">
              {about.heading}
            </h1>
            <p className="mt-5 text-[1rem] font-light leading-[24px] text-ink">{about.paragraphs[0]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
