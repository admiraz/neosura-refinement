"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";

interface AdvisoryProcessStep {
  num: string;
  title: string;
  body: string;
  bearSrc: string;
  bearAlt: string;
}

interface AdvisoryProcessTimelineProps {
  heading: string;
  steps: AdvisoryProcessStep[];
}

/** Phase 8H — static. The closest FINWIWO module (the "So einfach
 * funktioniert's" step module) has no entrance or scroll motion, so the
 * earlier badge scale-in and line-draw reveal are removed; the timeline and
 * the five bears stay. Step titles 23/500/29/-0.23 and bodies 16/300/24 follow
 * that module's own type. */
function StepRow({ step, isLast }: { step: AdvisoryProcessStep; isLast: boolean }) {
  return (
    <div className="flex gap-6 lg:gap-10">
      <div className="flex shrink-0 flex-col items-center">
        <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border-2 border-purple bg-white text-[0.95rem] font-medium text-purple">
          {step.num}
        </span>
        {!isLast && <span aria-hidden className="mt-1 w-px flex-1 bg-line-soft" />}
      </div>

      <div className="flex-1 pb-12 lg:pb-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <span className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-full bg-paper-2 sm:h-[76px] sm:w-[76px]">
            <Image src={step.bearSrc} alt={step.bearAlt} fill className="object-contain p-1" sizes="76px" />
          </span>
          <div>
            <h3 className="text-[1.3125rem] font-medium leading-[27px] tracking-[-0.23px] text-ink lg:text-[1.4375rem] lg:leading-[29px]">{step.title}</h3>
            <p className="mt-2 max-w-[56ch] text-[1rem] font-light leading-[24px] text-ink-soft">{step.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Phase 7S — dedicated vertical timeline for the client guide's
 * canonical five-step advisory journey (§4.16: Analyse → Auswertung →
 * Lösungsvorschlag → Umsetzung → Begleitung), exclusive to `/ablauf`.
 *
 * Deliberately NOT a reuse of `CategoryBusinessProcess` (the compact
 * horizontal 3-then-2 card grid already used inside the `/unternehmen`
 * hub for the same 5 steps) — that component is sized for a supporting
 * module inside a longer page; `/ablauf` is a dedicated page where this
 * journey is the entire point, so a fuller vertical-timeline treatment
 * (connecting line, numbered markers, one bear illustration per step)
 * is the more appropriate presentation, per this phase's own explicit
 * "one bear per step" requirement (`CategoryBusinessProcess` uses real
 * photos, not mascots).
 *
 * `fianza.ch` was audited as the client's named structural reference for
 * this page's interactions; its own homepage has no dedicated 5-step
 * advisory-process section to measure (confirmed via a live audit — its
 * headings are "Warum fianza?", "Alle Versicherungen in der fianza App",
 * "Offerten vergleichen", "Planen Sie Ihre Zukunft", "Vereinbare einen
 * Termin", "fianza Newsletter"; none is a step-by-step journey). No
 * third-party wording is reproduced anywhere. This layout (left-aligned
 * numbered markers on a vertical connecting line, content to the right)
 * is a standard, genuinely appropriate pattern for a sequential journey
 * and NEOSURA-authored, not copied from any specific reference.
 *
 * MOTION — this is the one page where motion genuinely earns its keep
 * (per this phase's own brief). Each step's number badge and its
 * connecting-line segment grow into place via IntersectionObserver as
 * the step scrolls into view (scale/opacity on the badge, `scaleY` on
 * the line beneath it) — a real, purposeful reveal tied to genuine
 * step-by-step progress through the journey, not a decorative generic
 * fade-up. Under `prefers-reduced-motion`, every step renders fully
 * visible immediately (no animation, no dependency on scroll to
 * understand the order — the numbered markers and vertical line already
 * convey sequence on their own). */
export function AdvisoryProcessTimeline({ heading, steps }: AdvisoryProcessTimelineProps) {
  return (
    <section className="bg-white">
      <Container className="py-14 lg:py-16">
        {/* Visual polish pass — the journey is a single reading column, so it
            is held to an editorial measure and centred instead of hugging the
            left gutter of the full 1440 container with ~900px of dead space
            beside it. `/ablauf`'s other rows use the same column. */}
        <div className="mx-auto max-w-[860px]">
          <h2 className="text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.875rem] lg:leading-[36px]">{heading}</h2>

          <div className="mt-10 lg:mt-12">
            {steps.map((step, i) => (
              <StepRow key={step.num} step={step} isLast={i === steps.length - 1} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
