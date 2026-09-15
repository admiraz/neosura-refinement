import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { themenFamilieDeep as deep } from "@/content/de/deep/themen-familie";
import { clientGuideTopicCta } from "@/content/de/clientGuide";
import { LifeSituationHero } from "@/components/life-situation/LifeSituationHero";
import { LifeSituationGrid } from "@/components/life-situation/LifeSituationGrid";
import { CategoryTopicCta } from "@/components/category/CategoryTopicCta";

export const metadata: Metadata = pageMetadata({
  path: "/themen/familie",
  title: "Versicherungen für Familien | neosura",
  description: "Familienzuwachs? Wir prüfen Krankenkasse, Haftpflicht, Absicherung und Kindervorsorge in einem Termin.",
});

/** Phase 7Q — NEOSURA's first life-situation page, establishing a new page
 * family per client guide §4.15 ("these hub pages route to services, they
 * don't sell anything of their own"). Replaces the Phase 7M.0 scaffold
 * (a bare H1/intro + `FinalCta`) with the full required structure: Hero
 * → routing section (4 blocks) → standard CTA.
 *
 * REFERENCE — live-audited `https://finwiwo.ch/finanzen-fuer-familien/`
 * (the dedicated Familie page) and `https://finwiwo.ch/`'s own homepage
 * life-situation tile section. Per this phase's own explicit reference-
 * strategy rule, FINWIWO is used for ARCHITECTURE only (Hero mechanism,
 * section rhythm, card geometry, motion, parallax) — its actual content
 * (tax deductions, Mutterschaftsentschädigung, Sorgerechtsverfügung,
 * mortgage/Säule-3a planning, an "anfragen" intake form, a 6-item
 * "Ihre Situation" module covering pregnancy/school-age/home-buying/
 * toddler/teenager/divorce, an FAQ, a Newsletter) is NOT NEOSURA content
 * authority — the client guide's own much narrower §4.15 copy is. Full
 * record in `docs/finwiwo-architecture/deep-themen-familie.md`.
 *
 * HERO — `LifeSituationHero`, a NEW dedicated component (see its own
 * docstring for the full measurement record: FINWIWO's own Hero is
 * full-bleed-photo + real 0.20 parallax + ONE button, but centered text
 * on a near-opaque dark-navy wash — genuinely different from every
 * established NEOSURA Hero, and different enough from
 * `ServiceHeroFullbleed` (no checklist items here) to justify a small
 * dedicated component rather than an awkward reuse). HERO_PRIMARY_
 * ACTION_COUNT = 1 — FINWIWO's own button anchors to its own on-page
 * intake form; NOT reproduced (no fake family-check form) — routes
 * directly to `/analyse` instead.
 *
 * ROUTING SECTION — `LifeSituationGrid` + `LifeSituationCard` (new
 * dedicated components, see their own docstrings). Exactly 4 blocks,
 * matching the client guide's own intro sentence's 4 named concepts —
 * no 5th topic (Rechtsschutz/Cyber/Auto/Reisen) added to round out a
 * grid. Blocks 3 and 4 intentionally share one destination
 * (`/privatkunden/vorsorge`) — the client guide's own two distinct
 * family-Vorsorge needs (income protection, children's savings) are
 * both served by that one existing page.
 *
 * PHOTOGRAPHY — `private-home-editorial.webp` (a genuine young family
 * with a child on the floor of their first home, teddy bear, moving
 * boxes) is the closest thematic match to "Familie gegründet" in the
 * licensed library. KNOWN LIMITATION: this exact asset is already used
 * prominently on `/privatkunden/wohnen-eigentum` (its own primary
 * editorial-row photo), `/privatkunden/vorsorge`, and the `/privatkunden`
 * hub — this phase's own brief asks to avoid that reuse "if another
 * legitimate family image exists"; after inventorying every licensed
 * asset, none does (the only other candidates — `private-health.webp`,
 * already Krankenkasse's own Hero photo; `private-car.webp`, a
 * multi-generational travel scene, not an at-home family-with-young-
 * child scene) are equally or more conflicting. No image is exclusive to
 * this page — documented, not silently reused.
 *
 * OMITTED: FAQ (no authoritative client Familie FAQ — FAQ OMITTED, NO
 * AUTHORITATIVE CLIENT FAQ), Newsletter (§4.15 doesn't require one;
 * FINWIWO's own Familie Newsletter module is the same generic module
 * already satisfied project-wide; adding it here would lengthen a page
 * this phase's own brief explicitly wants kept short), canonical 5-step
 * process (the page's job is routing, not explaining NEOSURA's own
 * process — same reconciliation already applied project-wide), a
 * distinct related-guide-article link (client SEO requires one matching
 * `/ratgeber` article; audited — `/ratgeber` is currently a single index
 * page with no per-article routes. PENDING INTERNAL-LINK BLOCKER —
 * MATCHING RATGEBER ARTICLE NOT YET AVAILABLE. The related-TOPIC-PAGE
 * requirement, at least two, IS satisfied: this page links to
 * `/privatkunden/krankenkasse`, `/privatkunden/wohnen-eigentum`, and
 * `/privatkunden/vorsorge`).
 *
 * BEAR — one restrained instance, carried by `CategoryTopicCta`'s own
 * existing `bear-trust.webp` icon (consistent with §4.15's own "at least
 * one bear, brand-level and restrained, not sprinkled through cards"
 * instruction — no bear was added to any routing card). */
export default function ThemenFamiliePage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      <LifeSituationHero
        h1={deep.h1}
        intro={deep.intro}
        ctaLabel="Kostenlose Analyse starten"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/private-home-editorial.webp",
          alt: "Junge Familie mit Kind auf dem Boden ihres neuen Zuhauses",
          objectPosition: "center 35%",
        }}
      />

      <LifeSituationGrid headingRest={deep.sectionHeadingRest} headingAccent={deep.sectionHeadingAccent} items={deep.routingBlocks} />

      <CategoryTopicCta
        title={clientGuideTopicCta.title}
        body={clientGuideTopicCta.body}
        buttonLabel={clientGuideTopicCta.button}
        buttonHref="/analyse"
      />
    </main>
  );
}
