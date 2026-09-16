import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { cyberRechtsschutzDeep as deep } from "@/content/de/deep/cyber-rechtsschutz";
import { clientGuideTopicCta } from "@/content/de/clientGuide";
import { ServiceHeroSplit } from "@/components/service-deep/ServiceHeroSplit";
import { BusinessCyberContent } from "@/components/service-deep/BusinessCyberContent";
import { WohnenEditorialRow } from "@/components/service-deep/WohnenEditorialRow";
import { CategoryTopicCta } from "@/components/category/CategoryTopicCta";


export const metadata: Metadata = pageMetadata({
  path: "/unternehmen/cyber-rechtsschutz",
  title: "Cyberversicherung & Rechtsschutz KMU | neosura",
  description: "Cyberangriffe und Rechtsstreitigkeiten absichern: Deckungen für KMU im unabhängigen Vergleich.",
});

/** Phase 7P — HARD RULE: no old Phase-6/7M.0 scaffold sections remain on
 * this route. Everything previously rendered here (`ServiceHero`,
 * `ServiceInquiry`, `CategoryClosing` — the Phase 7M.0 IA-scaffold-only
 * placeholder) was removed. This is now the final rebuilt business deep
 * page, matching the architecture already established on
 * Betriebshaftpflicht/Flotten/Berufliche Vorsorge/Sachversicherung/
 * Personal.
 *
 * Phase 7P.A — CYBER MODULE ARCHITECTURE CORRECTION. Phase 7P originally
 * reused `WohnenEditorialRow` (image-right) for the Cyberversicherung
 * module, based on a generic ancestor-climbing measurement of `#cyber`
 * that found an `<img>` at x=720/545×364 matching the shared editorial-
 * row image family and concluded the row was architecturally identical
 * to `#betrieb`. A targeted re-measurement of `#cyber`'s own direct
 * `childStructure` (not the generic family-wide measurement) found
 * exactly two children: `.row-bg-wrap` (a full-row BACKGROUND-photo
 * layer, the same mechanism `ServiceHeroFullbleed` uses — not a boxed
 * inline image beside the text) and a single `.row_col_wrap_12.col.
 * span_12` column — i.e. ONE full-width text column, not a two-column
 * image+text grid. There is no dedicated editorial photo beside the
 * content anywhere in `#cyber`'s own markup, and external visual review
 * of both the live reference and NEOSURA's own Phase 7P screenshot
 * independently confirmed no photo renders next to this block either.
 * `WohnenEditorialRow` was therefore over-applied to a row that doesn't
 * share its architecture. Corrected to a new dedicated component,
 * `BusinessCyberContent` — see that component's own docstring for the
 * full measurement record (childStructure, swash, checklist, motion,
 * CTA). The Cyberversicherung image (`manifesto-advisor.webp`) was
 * removed, not relocated elsewhere on this page.
 *
 * REFERENCE — COMBINED REFERENCE, same live hub page
 * (`https://finwiwo.ch/unternehmen/`, which `/versicherungen/unternehmen`
 * redirects to) already used for all five prior business deep pages, but
 * with its own TWO distinct anchor rows this time:
 * - `#cyber` (658.6px tall, single full-width text column over a
 *   background-photo layer — see the Phase 7P.A note above — FINWIWO
 *   heading "Cyber-Risk – Schutz vor digitalen Bedrohungen" with a swash
 *   under "Cyber-Risk" only, 6-item two-column checklist:
 *   Betriebsunterbrechung/Erpressungszahlungen/24/7 Notfall-Hotline/
 *   Datenwiederherstellung/Rechtskosten & PR/Forensische Analyse, CTA
 *   "Jetzt Offerten vergleichen" → a live multi-insurer comparison tool).
 *   None of FINWIWO's own heading, its ransom-payment/24-7-hotline/
 *   guaranteed-recovery claims, or its fake-comparison CTA are reproduced
 *   — only genuinely client-approved §4.14 concepts and the real
 *   `/analyse` destination are used.
 * - `#betrieb` (613px tall, image-LEFT at x=175, genuine two-column
 *   image+text `WohnenEditorialRow`-family architecture) — the SAME
 *   combined row already narrowed to Betriebshaftpflicht-only (Phase 7K)
 *   and Sachversicherung-only (Phase 7N) on their own pages. On THIS page
 *   its content role is narrowed a third time, to Betriebsrechtsschutz
 *   ONLY: FINWIWO's own listed sentence for that topic ("Rechtliche
 *   Absicherung bei arbeits-, vertrags- und mietrechtlichen
 *   Streitigkeiten") is not reproduced verbatim — the client guide's own
 *   §4.14 Betriebsrechtsschutz paragraph is used instead, per the
 *   project's content-authority hierarchy (client guide over FINWIWO
 *   wording). Left unchanged by Phase 7P.A — its own measured
 *   architecture (image-left, two columns) is genuinely different from
 *   Cyber's, and Phase 7P.A is scoped to the Cyber module only.
 *
 * HERO — same live full-bleed parallax + white-overlay + 50/50-split hero
 * already measured for every other business deep page (this is the exact
 * same source page). Reusing `ServiceHeroSplit` unchanged is a genuine
 * architecture match, not a default. HERO_PRIMARY_ACTION_COUNT = 1 (one
 * `/analyse` link inside the hero section; no `cardCtaLabel`/`cardCtaHref`
 * passed, so the informational card renders no button — the same pattern
 * established on Personal in Phase 7O). The card's badge/title/body
 * (`deep.heroCard`) is a STRUCTURALLY DERIVED short summary connecting
 * both coverages (see `content/de/deep/cyber-rechtsschutz.ts`'s own
 * docstring) — not FINWIWO's own 9-option lead form, not a fake risk
 * calculator or incident-response intake, and not a repeat of the final
 * CTA's own copy.
 *
 * FINAL ORDER (client guide's own §4.14 IA: Hero → Cyberversicherung →
 * Betriebsrechtsschutz → CTA): Hero → Cyberversicherung (text-led,
 * `BusinessCyberContent`, compact `py-12 lg:py-14` density matching this
 * exact "first content block after Hero" rhythm already established on
 * Sachversicherung's own comparison strip) → Betriebsrechtsschutz
 * (image-left, `WohnenEditorialRow`) → standard CTA → Footer. Phase 7P.A
 * deliberately gives the page more FINWIWO-like rhythm variation (text-led
 * → photo-led → CTA) instead of a repetitive photo/text-photo/text
 * pattern.
 *
 * OMITTED (per Section 32's "reference-backed AND client-supported"
 * double test): FAQ (no authoritative client-approved FAQ exists for this
 * topic — FAQ OMITTED, NOT REQUIRED BY §4.14 / NO AUTHORITATIVE CLIENT
 * FAQ), Cyber-vs-Rechtsschutz comparison table (no client content
 * supports one; the two modules already explain their own distinct
 * roles), canonical 5-step process (no genuine role beyond the standard
 * CTA, same reconciliation as every other business deep page — none of
 * the five prior pages duplicate it either), info box (no client-required
 * single-point argument exists here, unlike Personal's Lohnfortzahlung
 * box), Newsletter (omitted on every other business deep page for the
 * same density reasoning — the requirement is already satisfied
 * project-wide on the private Krankenkasse/Wohnen/Fahrzeug pages; real
 * provider/DOI integration remains a separate launch blocker regardless).
 *
 * BEAR — no dedicated bear placed on this page; `CategoryTopicCta`'s own
 * cropped `bear-trust.webp` icon (already present on every other business
 * deep page using this component) is the page's one mascot instance —
 * consistent with, not an addition beyond, the locked Business pages.
 *
 * PHOTOGRAPHY — Phase 7P.A removed the Cyberversicherung row's image
 * (`manifesto-advisor.webp`) entirely rather than relocating it elsewhere
 * on the page, per that correction's own "less is correct here"
 * instruction — the page now has exactly two photos, not three: the Hero
 * (`business-liability-editorial.webp`, `businessServiceVisuals[5]`'s own
 * designated placeholder for this exact 6th service — no dedicated
 * Cyber/legal-consultation B2B asset exists in the licensed library) and
 * the Betriebsrechtsschutz row (`business-pension-editorial.webp`, a
 * serious multi-person discussion over documents in an office setting,
 * already used elsewhere for advisory contexts — chosen over an
 * initially-considered "person on a short break" asset that read as
 * thematically mismatched once reviewed in the Phase 7P rendered
 * screenshot). Neither depicts a hacker/hoodie, glowing-shield,
 * server-room, courtroom-gavel, or handshake cliché — both read as
 * genuine modern-office B2B photography. This also fixes the "photo/text,
 * photo/text" repetitive rhythm Phase 7P's report itself flagged as a
 * known limitation. KNOWN LIMITATION (unchanged): both remaining images
 * are reused from elsewhere in the project. */
export default function CyberRechtsschutzPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 7P — Hero. h1/intro are the client guide's exact §4.14
          copy, verbatim (see `deep`'s own docstring). heroItems are a
          STRUCTURALLY DERIVED two-item summary (one per coverage — the
          intro's own "Zwei Deckungen" framing). The card carries a
          topic-specific, structurally derived summary with no button
          (HERO_PRIMARY_ACTION_COUNT = 1). */}
      <ServiceHeroSplit
        h1={deep.h1}
        intro={deep.intro}
        items={deep.heroItems}
        ctaLabel="Kostenlose Analyse starten"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/business-liability-editorial.webp",
          alt: "Beratungsgespräch im modernen Büro",
          objectPosition: "center 30%",
        }}
        cardBadge={deep.heroCard.badge}
        cardTitle={deep.heroCard.title}
        cardBody={deep.heroCard.body}
      />

      {/* Phase 7P.A/7P.B — Cyberversicherung, text-led architecture (see
          this page's own header comment and `BusinessCyberContent`'s own
          docstring for the full measurement record, including Phase
          7P.B's correction of Phase 7P.A's own incomplete "no photo at
          all" finding). Heading/paragraph are the client guide's exact
          §4.14 copy, verbatim; checklist is the paragraph's own 5
          individual concepts (TRUTHFUL CONTENT REDUCTION FROM FINWIWO's
          6 to the client-supported 5), laid out in FINWIWO's own
          measured two-column mechanic. `backgroundPhoto` (desktop/tablet
          only) is a deliberately faded atmospheric layer — NOT a
          reproduction of FINWIWO's own sharp, high-contrast server-room
          photo. */}
      <BusinessCyberContent
        id="cyber"
        heading={deep.cyber.heading}
        paragraph={deep.cyber.paragraphs[0]}
        checklist={deep.cyber.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        backgroundPhoto={{
          photo: "/images/services/manifesto-advisor.webp",
          alt: "",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7P — Betriebsrechtsschutz, architecture from FINWIWO's own
          `#betrieb` row (image-left, re-measured fresh this phase — same
          shared row already narrowed to Betriebshaftpflicht-only and
          Sachversicherung-only elsewhere, narrowed a third time here to
          Betriebsrechtsschutz only). Heading/paragraph/checklist are the
          client guide's exact §4.14 copy, verbatim; checklist is the
          paragraph's own clauses (parties; Anwalts- und Verfahrenskosten;
          juristische Beratung), none invented. */}
      <WohnenEditorialRow
        inset
        id="betriebsrechtsschutz"
        heading={deep.betriebsrechtsschutz.heading}
        paragraph={deep.betriebsrechtsschutz.paragraphs[0]}
        checklist={deep.betriebsrechtsschutz.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/business-pension-editorial.webp",
          alt: "Ernstes Beratungsgespräch mit Unterlagen im modernen Büro",
          objectPosition: "center 35%",
        }}
      />

      {/* Phase 7P — client-required standard "Bereit für den Überblick?"
          analysis CTA (guide §7), reusing `CategoryTopicCta` as-is —
          already approved and locked on every other completed deep page.
          Carries the restrained `bear-trust.webp` decorative icon (the
          page's one mascot instance). Does not duplicate the Hero's own
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
