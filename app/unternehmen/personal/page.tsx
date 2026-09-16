import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { gesundheitUnfallDeep as deep } from "@/content/de/deep/gesundheit-unfall";
import { clientGuideTopicCta } from "@/content/de/clientGuide";
import { ServiceHeroSplit } from "@/components/service-deep/ServiceHeroSplit";
import { WohnenEditorialRow } from "@/components/service-deep/WohnenEditorialRow";
import { WohnenUnterversicherung } from "@/components/service-deep/WohnenUnterversicherung";
import { Container } from "@/components/ui/Container";
import { CategoryTopicCta } from "@/components/category/CategoryTopicCta";


export const metadata: Metadata = pageMetadata({
  path: "/unternehmen/personal",
  title: "Krankentaggeld & UVG für KMU | neosura",
  description: "KTG und Unfallversicherung im Vergleich: Lohnfortzahlung absichern, Prämien senken, Mitarbeitende schützen.",
});

/** Phase 7O.A — TARGETED CORRECTION of Phase 7O, not a redesign. Three
 * client-guide compliance problems in the original 7O build are fixed
 * here; the Hero, imagery, and overall B2B visual language are
 * unchanged.
 *
 * SLUG NOTE (unchanged from 7O): canonical route remains
 * `/unternehmen/personal` (`businessServices[4]`'s own slug, title
 * "Krankentaggeld & Unfall"). `/unternehmen/gesundheit-unfall` continues
 * to redirect here (`next.config.ts`, pre-existing). No
 * `/unternehmen/krankentaggeld-unfall` route was ever created — verified
 * absent (404) as part of this correction.
 *
 * CORRECTION 1 — UVG-ZUSATZ RESTORED (CLIENT-GUIDE REQUIRED BLOCK
 * RESTORED): Phase 7O's report incorrectly claimed the client guide's
 * §4.11 "UVG-Zusatz" paragraph was unavailable anywhere in this
 * repository. That was wrong. The exact, final copy was supplied
 * directly in this correction's own brief and is now `deep.uvgZusatz`,
 * rendered as its own `WohnenEditorialRow` below, verbatim, no
 * paraphrase, no added feature. Architecture: the SAME shared FINWIWO
 * editorial-row template already confirmed for `#personen`'s own UVG/
 * KTG content (545×364 image family, swash heading, checklist-less
 * single paragraph since the source is one sentence) — not a new
 * visual language, no card grid, no gradient panel. Orientation follows
 * this correction's own suggested A-B-A rhythm (UVG image-right,
 * UVG-Zusatz image-left, KTG image-right) since no live 3-row FINWIWO
 * analogue exists to measure directly (the reference combines all three
 * topics — BVG+UVG+KTG — in one single row).
 *
 * CORRECTION 2 — LOHNFORTZAHLUNG INFO BOX (CLIENT-GUIDE REQUIRED):
 * the guide requires a dedicated info box making the employer's
 * continued-salary-payment obligation the key argument. Re-swept
 * `/versicherungen/unternehmen` (the current business-reference family)
 * for a native FINWIWO info-box/tip/note/callout pattern this phase —
 * confirmed absent (zero matches for `[class*="tip"|"note"|"info"|
 * "hint"|"alert"|"callout"|"highlight"]` beyond swash-heading false
 * positives), the same finding Phase 7G already made independently for
 * the private reference. Per that already-established, FINWIWO-audited
 * fallback, this reuses `WohnenUnterversicherung` (built for exactly
 * this "single-point info box" role, already live on Wohnen &
 * Eigentum) rather than inventing a new box or reusing an unrelated old
 * one. Body is `deep.lohnfortzahlung.body`, the exact source sentence
 * supplied in the correction brief, verbatim. Heading
 * ("Lohnfortzahlungspflicht") is a UI LABEL DERIVED FROM CLIENT COPY —
 * the same noun already present in `ktg.checklist`'s own approved text.
 *
 * CORRECTION 3 — STANDARD CTA RESTORED: Phase 7O's compact single-
 * button closing did not satisfy the client guide's requirement that
 * every non-legal topic page end with the standard reusable CTA block.
 * `CategoryTopicCta` (guide §7 copy, verbatim, already used identically
 * on every other completed deep page) now closes this page. This does
 * NOT reintroduce the Hero CTA duplication Phase 7O fixed: the Hero's
 * own action count is untouched (still exactly one — see below), and
 * the standard CTA is a distinct, later page position/conversion
 * moment, not a second Hero action.
 *
 * FAQ — re-audited this phase: no citation anywhere in this repository
 * (`docs/CLIENT_GUIDE_MERGE.md`, `docs/service-content-sources.md`)
 * marks the existing 5 FAQ items as client-guide-approved, and §4.11
 * does not require a FAQ for this page. FAQ OMITTED — NOT REQUIRED BY
 * §4.11 / NO AUTHORITATIVE CLIENT FAQ (data left in the content file,
 * not rendered).
 *
 * COMPARISON STRIP — re-evaluated per this correction's own criteria:
 * `deep.comparison` ("UVG und Krankentaggeld im Überblick") is
 * pre-existing approved content, serves a genuinely distinct role
 * (side-by-side legal/practical summary) from both the new UVG-Zusatz
 * row and the new Lohnfortzahlung info box, doesn't replace either, and
 * keeps its existing plain thin-line (not card-grid) presentation
 * matching FINWIWO density. Kept, moved to immediately before the
 * standard CTA per the corrected target order.
 *
 * FINAL ORDER (client-guide IA, FINWIWO visual architecture per
 * module): Hero → UVG → UVG-Zusatz → Krankentaggeld → Lohnfortzahlung
 * info box → UVG/KTG comparison strip → standard CTA → Footer.
 *
 * HERO — unchanged from Phase 7O. HERO_PRIMARY_ACTION_COUNT = 1 (one
 * `/analyse` link inside the hero section; the informational card still
 * has no button). No `ServiceHeroSplit` prop or behavior was touched in
 * this correction. */
export default function PersonalPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Unchanged from Phase 7O — see this page's own header comment
          and `ServiceHeroSplit`'s own docstring for the full record. */}
      <ServiceHeroSplit
        h1={deep.h1}
        intro={deep.intro}
        items={deep.heroItems}
        ctaLabel="Kostenlose Analyse starten"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/business-health.webp",
          alt: "Team im offenen Bürogespräch",
          objectPosition: "center 35%",
        }}
        cardBadge="Mitarbeitende"
        cardTitle={deep.mitarbeitendenabsicherung.heading}
        cardBody={deep.mitarbeitendenabsicherung.paragraphs[0]}
      />

      {/* Unfallversicherung (UVG) — image-right, matching FINWIWO's own
          combined `#personen` row orientation. Verbatim §4.11 copy. */}
      <WohnenEditorialRow
        inset
        tightBottom
        id="uvg"
        heading={deep.uvg.heading}
        paragraph={deep.uvg.paragraphs[0]}
        checklist={deep.uvg.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        reverse
        photo={{
          photo: "/images/services/business-health-editorial.webp",
          alt: "Berufstätige Person bei einer kurzen Pause im modernen Büro",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7O.A — UVG-Zusatz, CLIENT-GUIDE REQUIRED BLOCK RESTORED.
          Image-left (orientation B in the A-B-A rhythm — see this
          page's own header comment). Verbatim §4.11 copy, no checklist
          (single-sentence source). Photo: a generic business-
          consultation scene, avoiding hospital/injury/bandage cliché
          imagery per this correction's own explicit instruction — no
          dedicated "enhanced benefits" asset exists in the licensed
          library, so the closest legitimate existing B2B asset
          (already used elsewhere for employer/advisory contexts) is
          reused; documented as a known limitation. */}
      <WohnenEditorialRow
        inset
        id="uvg-zusatz"
        heading={deep.uvgZusatz.heading}
        paragraph={deep.uvgZusatz.paragraphs[0]}
        checklist={[]}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/business-liability-editorial.webp",
          alt: "Team bespricht Berichte im modernen Büro",
          objectPosition: "center 30%",
        }}
      />

      {/* Krankentaggeld — image-right (orientation A again, completing
          the A-B-A rhythm). Verbatim §4.11 copy, including the
          pre-existing sourced 80%/730-day figures. */}
      <WohnenEditorialRow
        inset
        id="ktg"
        heading={deep.ktg.heading}
        paragraph={deep.ktg.paragraphs[0]}
        checklist={deep.ktg.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        reverse
        photo={{
          photo: "/images/services/business-health.webp",
          alt: "Team im offenen Bürogespräch",
          objectPosition: "center 70%",
        }}
      />

      {/* Phase 7O.A — Lohnfortzahlung info box, CLIENT-GUIDE REQUIRED.
          See this page's own header comment for the FINWIWO-audit
          trail justifying reuse of `WohnenUnterversicherung`. */}
      <WohnenUnterversicherung heading={deep.lohnfortzahlung.heading} body={deep.lohnfortzahlung.body} callout />

      {/* UVG/KTG distinction strip — pre-existing approved content,
          re-evaluated and kept per this correction's own criteria (see
          header comment). Plain thin-line comparison, unchanged from
          Phase 7O. */}
      <section className="bg-white">
        <Container className="py-14 lg:py-16">
          <h2 className="max-w-[40ch] text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.8rem] lg:leading-[34.56px]">
            {deep.comparison.heading}
          </h2>
          <p className="mt-3 max-w-[60ch] text-[1rem] font-light leading-[24px] text-ink-soft">{deep.comparison.intro}</p>

          <div className="mt-8">
            <div className="hidden border-b border-line pb-3 text-[0.85rem] font-medium text-ink-soft sm:grid sm:grid-cols-[1fr_1fr_1fr] sm:gap-6">
              <span />
              <span>{deep.comparison.columnHeaders[0]}</span>
              <span>{deep.comparison.columnHeaders[1]}</span>
            </div>
            {deep.comparison.rows.map((row) => (
              <div key={row.label} className="grid grid-cols-1 gap-1.5 border-b border-line py-4 text-[1rem] leading-[24px] sm:grid-cols-[1fr_1fr_1fr] sm:items-start sm:gap-6">
                <span className="font-medium text-ink">{row.label}</span>
                <span className="font-light text-ink-soft">
                  <span className="text-[0.85rem] text-ink-soft sm:hidden">{deep.comparison.columnHeaders[0]}: </span>
                  {row.cells[0]}
                </span>
                <span className="font-light text-ink-soft">
                  <span className="text-[0.85rem] text-ink-soft sm:hidden">{deep.comparison.columnHeaders[1]}: </span>
                  {row.cells[1]}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Phase 7O.A — standard CTA restored (CORRECTION 3 above). Exact
          guide §7 copy, verbatim, already used identically on every
          other completed deep page. Does not duplicate the Hero's own
          single action — different page position, distinct conversion
          moment. */}
      <CategoryTopicCta
        title={clientGuideTopicCta.title}
        body={clientGuideTopicCta.body}
        buttonLabel={clientGuideTopicCta.button}
        buttonHref="/analyse"
      />
    </main>
  );
}
