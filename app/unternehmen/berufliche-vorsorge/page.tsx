import type { Metadata } from "next";
import Link from "next/link";
import { businessServices } from "@/content/de/business";
import { siteMeta } from "@/content/de/site";
import { pageMetadata } from "@/lib/seo";
import { beruflicheVorsorgeDeep as deep } from "@/content/de/deep/berufliche-vorsorge";
import { clientGuideTopicCta } from "@/content/de/clientGuide";
import { ServiceHeroSplit } from "@/components/service-deep/ServiceHeroSplit";
import { WohnenEditorialRow } from "@/components/service-deep/WohnenEditorialRow";
import { Container } from "@/components/ui/Container";
import { CategoryFaq } from "@/components/category/CategoryFaq";

const service = businessServices[2];

export const metadata: Metadata = pageMetadata({
  path: "/unternehmen/berufliche-vorsorge",
  title: `${service.title} | ${siteMeta.name}`,
  description: service.body,
});

/** Phase 7M — HARD RULE: no old Phase-6 deep-page sections remain on this
 * route. Everything previously rendered here (`ServiceHero`,
 * `ServiceLocalNav`, `ServiceInquiry`, `CategoryProblemStatement`,
 * `ServiceContentChapter` ×2, `ServicePhotoChapter`, `ServiceComparison`,
 * `ServiceAnalysis`, `ServiceProcess`, `ServiceFaq`, `CategoryClosing`)
 * was removed. Component FILES remain (other business deep routes still
 * scaffold from them) — only their usage on THIS route was removed.
 *
 * REFERENCE — COMBINED REFERENCE, same live hub page as Phase 7K/7L: no
 * dedicated Berufliche Vorsorge/BVG/Pensionskasse page exists (confirmed
 * via 404s on `/berufliche-vorsorge/`, `/bvg/`, `/pensionskasse/`,
 * `/personalvorsorge/`, `/mitarbeitervorsorge/`, `/vorsorge-unternehmen/`,
 * `/pensionskassenvergleich/`). The live mega-menu's "Berufliche Vorsorge
 * (BVG)" link resolves to a real, specific anchor:
 * `https://finwiwo.ch/versicherungen/unternehmen#personen` — the SAME
 * `/unternehmen/` page already used for Betriebshaftpflicht and Flotten,
 * re-confirmed fresh this phase (not assumed from 7K/7L notes): image
 * 545×364 at 1440, image-RIGHT this time (x=720, text-left — a genuinely
 * different orientation from `#betrieb`'s and `#flotte`'s own
 * image-left), full-heading swash, checklist, CTA → dead `#formular`.
 * FINWIWO's row combines Berufliche Vorsorge (BVG) + Unfall (UVG) +
 * Krankentaggeld (KTG) in one checklist — UVG/KTG belong to NEOSURA's
 * own separate "Krankentaggeld & Unfall" service and are NOT reproduced
 * here — CONTENT ROLE NARROWED TO BERUFLICHE VORSORGE ONLY. FINWIWO's own
 * BVG checklist item states "flexible Sparplänen und Zusatzleistungen"
 * (flexible savings plans and additional benefits) — unconfirmed
 * specific product features, NOT reproduced; NEOSURA's own approved
 * `bvgBeratung`/`mitarbeitende` content is used instead.
 *
 * HERO — same live full-bleed parallax + white-overlay + 50/50-split
 * hero already measured for Betriebshaftpflicht/Flotten (this is the
 * exact same page). Reusing `ServiceHeroSplit` here is a genuine
 * architecture match (same live reference, re-verified), not a
 * private-template default.
 *
 * CTA HIERARCHY — per this phase's own "one primary large CTA
 * architecture per page" rule: no BVG-specific short tagline exists in
 * approved content (unlike Flotten's own `clientGuideFleet.headline`),
 * so the Hero's white card carries the client guide's generic §7
 * topic-CTA message (`clientGuideTopicCta`) — its ONLY appearance
 * anywhere on this page. The page ends with a single compact button
 * only (no heading, no body, no bear, no second full CTA card), the
 * same pattern established on Flotten (Phase 7L). */
export default function BeruflicheVorsorgePage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 7M — Hero. h1/intro reuse the already-approved
          `businessServices[2]` tile title/body verbatim. heroItems are a
          STRUCTURALLY DERIVED title/body split of the existing approved
          `bvgBeratung.checklist`'s own three sentences — no figure or
          threshold added. The card carries the generic §7 topic-CTA
          message, its only appearance on the page (see CTA HIERARCHY
          note above). Photo is `manifesto-advisor.webp`, not the
          canonical `business-pension.webp` — a first-pass screenshot QA
          caught that photo's own composition (two older clients
          prominently visible, the working-age advisor with laptop/tablet
          largely hidden behind the Hero's own analysis card) reading as
          private-retirement portraiture rather than a business
          consultation once cropped full-bleed, which this phase's own
          Section 8 explicitly warns against. `business-pension.webp` is
          used instead on the smaller "Aktuelle Vorsorgesituation" row
          further down, where its business-meeting context (office tower,
          advisor ID badge, tablet) reads clearly at that size. */}
      <ServiceHeroSplit
        h1={deep.h1}
        intro={deep.intro}
        items={deep.heroItems}
        ctaLabel="Kostenlose Analyse starten"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/manifesto-advisor.webp",
          alt: "Beratungsgespräch in einem modernen Büro",
          objectPosition: "center 30%",
        }}
        cardBadge="Berufliche Vorsorge"
        cardTitle={clientGuideTopicCta.title}
        cardBody={clientGuideTopicCta.body}
        cardCtaLabel={clientGuideTopicCta.button}
        cardCtaHref="/analyse"
      />

      {/* Phase 7M — core BVG module, architecture from FINWIWO's own
          "Berufliche Vorsorge (BVG)" row (`#personen`, image-right,
          re-confirmed fresh this phase). Heading/paragraph/checklist are
          pre-existing approved copy (§4.12, wired in Phase 7M.1),
          verbatim. No contribution rate, coordination deduction, or
          entry-threshold figure is stated. */}
      <WohnenEditorialRow
        inset
        tightBottom
        id="bvg-beratung"
        heading={deep.bvgBeratung.heading}
        paragraph={deep.bvgBeratung.paragraphs[0]}
        checklist={deep.bvgBeratung.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        reverse
        photo={{
          photo: "/images/services/business-pension-editorial.webp",
          alt: "Gespräch zur beruflichen Vorsorge im Büro",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7M — employer-perspective module (recruitment/retention,
          Kaderpläne), image-left. Heading/paragraph/checklist are the
          client guide's exact §4.12 copy (`mitarbeitende`), verbatim.
          The employer-attractiveness claim is kept hedged exactly as
          approved ("kann... unterstützen") — not strengthened into an
          absolute claim. */}
      <WohnenEditorialRow
        inset
        id="mitarbeitende"
        heading={deep.mitarbeitende.heading}
        paragraph={deep.mitarbeitende.paragraphs[0]}
        checklist={deep.mitarbeitende.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/business-health-editorial.webp",
          alt: "Berufstätige Person bei einer kurzen Pause im modernen Büro",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7M — pension-fund review/change module, image-right.
          Heading/paragraph are the client guide's exact §4.12 copy
          (`situation`), verbatim. No checklist exists for this block in
          approved content — none is invented; the paragraph stands
          alone, matching the source. */}
      <WohnenEditorialRow
        inset
        id="vorsorgesituation"
        heading={deep.situation.heading}
        paragraph={deep.situation.paragraphs[0]}
        checklist={[]}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        reverse
        photo={{
          photo: "/images/services/business-pension.webp",
          alt: "Beratungsgespräch zu beruflicher Vorsorge",
          objectPosition: "center 22%",
        }}
      />

      {/* Phase 7M — Obligatorium/Überobligatorium strip. Legitimate
          existing approved content (guide-silent, pre-existing). No
          FINWIWO card-grid equivalent exists for this content, so it is
          presented as a plain thin-line comparison (no card borders, no
          colored background), same treatment already used on
          Betriebshaftpflicht/Flotten. Heading/intro/all row labels and
          cell values are verbatim. */}
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

      {/* Phase 7M — FAQ, legitimate pre-existing client-source content,
          reused via `CategoryFaq` (same configuration already
          established on the other completed deep pages). */}
      <CategoryFaq
        headingRest="Häufig gestellte"
        headingAccent="Fragen"
        subheading="Antworten auf die wichtigsten Fragen zur beruflichen Vorsorge."
        accent="teal"
        maxWidth="1083px"
        openItemStyle="plain"
        largeSubheading
        items={deep.faq}
      />

      {/* Phase 7M — compact closing. The Hero already carries a full
          analysis card — per the CTA hierarchy rule, no second full
          `CategoryTopicCta` here. Just the site's one real, truthful
          button, no heading, no body, no bear. */}
      <section className="bg-paper-2">
        <Container className="flex justify-center py-10 lg:py-12">
          <Link
            href="/analyse"
            className="inline-flex h-[50px] items-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600"
          >
            Kostenlose Analyse starten
          </Link>
        </Container>
      </section>
    </main>
  );
}
