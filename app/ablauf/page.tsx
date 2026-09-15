import type { Metadata } from "next";
import Link from "next/link";
import { siteMeta } from "@/content/de/site";
import { pageMetadata } from "@/lib/seo";
import { processHeading } from "@/content/de/process";
import { clientGuideAblauf, clientGuideTopicCta } from "@/content/de/clientGuide";
import { Container } from "@/components/ui/Container";
import { AdvisoryProcessTimeline } from "@/components/process/AdvisoryProcessTimeline";
import { CategoryTopicCta } from "@/components/category/CategoryTopicCta";

export const metadata: Metadata = pageMetadata({
  path: "/ablauf",
  title: `So funktioniert unsere Beratung | ${siteMeta.name}`,
  description: "In fünf Schritten zum optimalen Versicherungsschutz: Analyse, Auswertung, Lösungsvorschlag, Umsetzung, Begleitung.",
});

/** Phase 7S — full rebuild of `/ablauf`, replacing the Phase 7M.0/7M.1
 * scaffold (a bare numbered-list grid + `FinalCta`) with the client's
 * required structure: 5-step sequence (one bear per step) → remuneration
 * transparency block → standard CTA.
 *
 * H1 — no separate exact §4.16 H1 exists in the client guide (§4.16
 * supplies only the 5 steps + the Kostenblock paragraph). Per this
 * phase's own instruction ("use the approved route/navigation wording
 * ONLY if already established in project metadata/content"), audited
 * the existing project: `content/de/process.ts` already defines
 * `processHeading = "So funktioniert's."` (used on the homepage), and
 * the nav/metadata/breadcrumb label for this exact route is consistently
 * "So funktioniert's" project-wide. That established wording is reused
 * verbatim here — STRUCTURALLY DERIVED FROM ROUTE/METADATA, not invented
 * marketing copy.
 *
 * REFERENCE — `fianza.ch` audited as the client's named structural
 * reference; it has no dedicated 5-step advisory-process section (see
 * `AdvisoryProcessTimeline`'s own docstring for the live headings
 * found). No third-party wording is reused anywhere — the timeline
 * layout is NEOSURA-authored, built with the locked 7SYS.C visual
 * system (swash heading, teal/white palette, restrained motion).
 *
 * FIVE STEPS — `clientGuideAblauf.steps`, exact §4.16 copy, verbatim,
 * unchanged since Phase 7M.1.
 *
 * BEARS — one illustration per step, from the 5 distinct bear-pose
 * assets in the licensed library (no asset reused twice, none
 * fabricated):
 * - 01 Analyse → `bear-sitting.webp` (calm, receptive — gathering the
 *   full picture).
 * - 02 Auswertung → `bear-approach-1.webp` (holding a magnifying glass —
 *   examining/comparing policies).
 * - 03 Lösungsvorschlag → `bear-pointing.png` (gesturing forward —
 *   presenting a recommendation).
 * - 04 Umsetzung → `bear-approach-3.webp` (thumbs up + clipboard/chart —
 *   executing and confirming).
 * - 05 Begleitung → `bear-approach-2.webp` (steady, arms crossed —
 *   ongoing reliable presence).
 * KNOWN ISSUE (documented, not fixed in this phase — out of `/ablauf`'s
 * own scope): a separate, OLDER 3-step "So funktioniert's" narrative
 * (`content/de/process.ts`'s own `processSteps`: Analyse/Struktur/
 * Begleitung, rendered by `ServiceApproach` on `/ueber-uns`) still
 * exists alongside this page's canonical 5-step §4.16 journey. Per this
 * phase's own "there is only one canonical five-step process, do not
 * add a second process strip" rule, THIS page renders only the
 * canonical 5-step version — the legacy 3-step component was not
 * touched (a Phase 7U concern, not a Phase 7S one), but its continued
 * existence elsewhere on the site is flagged in
 * `docs/finwiwo-architecture/deep-ablauf.md`.
 *
 * REMUNERATION BLOCK — `clientGuideAblauf.kostenblock`, exact §4.16
 * copy, verbatim, with "Erstinformation" linked to `/erstinformation`
 * without altering the visible sentence (the link wraps only that one
 * word).
 *
 * NO EXTRA PROCESS — no second process strip, no 3-step summary, no
 * generic FINWIWO-style process module was added after the timeline. */
export default function AblaufPage() {
  const kostenblockParts = clientGuideAblauf.kostenblock.split("Erstinformation");

  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      <Container className="pb-8 pt-14 lg:pb-10 lg:pt-20">
        <h1 className="mx-auto max-w-[860px] text-[1.9rem] font-black leading-[1.15] tracking-normal text-ink lg:text-[2.5rem] lg:leading-[1.125]">{processHeading}</h1>
      </Container>

      <AdvisoryProcessTimeline
        heading="In fünf Schritten"
        steps={[
          { ...clientGuideAblauf.steps[0], bearSrc: "/images/bear-sitting.webp", bearAlt: "" },
          { ...clientGuideAblauf.steps[1], bearSrc: "/images/bear-approach-1.webp", bearAlt: "" },
          { ...clientGuideAblauf.steps[2], bearSrc: "/images/bear-pointing.png", bearAlt: "" },
          { ...clientGuideAblauf.steps[3], bearSrc: "/images/bear-approach-3.webp", bearAlt: "" },
          { ...clientGuideAblauf.steps[4], bearSrc: "/images/bear-approach-2.webp", bearAlt: "" },
        ]}
      />

      <section className="bg-paper-2">
        <Container className="py-12 lg:py-14">
          <div className="mx-auto max-w-[860px]">
          {/* Phase 8H — informational, not promotional: heading at the reference
              sub-heading scale (23/500/29), body 16/300/24; copy unchanged. */}
          <h2 className="text-[1.3125rem] font-medium leading-[27px] tracking-[-0.23px] text-ink lg:text-[1.4375rem] lg:leading-[29px]">Was Sie die Beratung kostet</h2>
          <p className="mt-3 text-[1rem] font-light leading-[24px] text-ink-soft">
            {kostenblockParts[0]}
            <Link href="/erstinformation" className="text-purple underline underline-offset-2 hover:text-ink">
              Erstinformation
            </Link>
            {kostenblockParts[1]}
          </p>
          </div>
        </Container>
      </section>

      <CategoryTopicCta
        title={clientGuideTopicCta.title}
        body={clientGuideTopicCta.body}
        buttonLabel={clientGuideTopicCta.button}
        buttonHref="/analyse"
      />
    </main>
  );
}
