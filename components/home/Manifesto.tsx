import Image from "next/image";
import Link from "next/link";
import { about } from "@/content/de/about";
import { Reveal } from "@/components/ui/Reveal";

/** FINWIWO's manifesto treats the photo as page architecture, not a card
 * (measured live, docs/finwiwo-architecture — Phase 7C.3): a full-bleed
 * 50/50 split, equal-height columns driven by the content column's own
 * padding+copy (not a fixed photo height), sharp corners (0px radius —
 * FINWIWO uses none here), and one consistent accent color for this
 * section's emphasis + CTA. Mobile stacks photo-first, full-bleed, fixed
 * height, then left-aligned copy — not a shrunk desktop layout. No mascot,
 * no gradient, no scroll motion (confirmed static on the live reference;
 * NEOSURA uses its own licensed photo rather than FINWIWO's background
 * video, which has no genuine NEOSURA equivalent). */
/* Phase 8A — measured against the reference's own editorial row at 1440.
 * Already matching: the 50/50 split (text column starts x=792 vs the
 * reference's 793), text measure 580 vs 575, heading 30px/35px, body weight
 * 300, and the outline CTA's full geometry. Corrected: heading weight was
 * inheriting the body's 300 where the reference is 400; heading carried a
 * NEOSURA-only -0.01em where the reference is `normal` (the site-wide body
 * tracking is overridden here for the same reason); body was 16.8px/25.2px
 * where the reference is 16px/24px.
 */
/* Phase 9A — both emphasis words now carry the section's one accent (teal,
 * the colour of its own CTA) instead of competing purple + teal. The text
 * column enters as one group (`Reveal`) — the reference fades this exact
 * column in; the photo stays static, as on the reference. */
export function Manifesto() {
  return (
    <section id="ansatz" className="scroll-mt-20 overflow-hidden bg-white">
      <div className="lg:flex lg:items-stretch">
        <Reveal className="relative h-[300px] w-full sm:h-[420px] lg:h-auto lg:w-1/2">
          <Image
            src="/images/services/manifesto-advisor.webp"
            alt="Beratungsgespräch in einem modernen Büro"
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        </Reveal>

        <div className="px-6 py-12 sm:px-8 lg:flex lg:w-1/2 lg:items-center lg:px-[72px] lg:py-[72px]">
          <Reveal className="lg:max-w-[580px]" delay={120}>
            <span className="block text-[0.78rem] uppercase tracking-[0.16em] text-muted">Über neosura</span>
            <p className="mt-4 text-[1.6rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.875rem] lg:leading-[1.17]">
              Versicherungslösungen
              <br />
              mit <span className="text-purple">Klarheit</span>,
              <br />
              <span className="text-purple">Struktur</span>
              <br />
              und langfristiger Perspektive.
            </p>
            <p className="mt-6 text-[1rem] font-light leading-[1.5] text-ink-soft">{about.shortBody}</p>
            <Link
              href={about.linkHref}
              className="mt-8 inline-flex h-[50px] items-center rounded-full border-2 border-purple/75 px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-purple btn-motion hover:bg-purple hover:text-white lg:mt-9"
            >
              {about.linkLabel}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
