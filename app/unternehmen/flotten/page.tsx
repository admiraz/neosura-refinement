import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { flottenversicherungDeep as deep } from "@/content/de/deep/flottenversicherung";
import { clientGuideFleet } from "@/content/de/clientGuide";
import { ServiceHeroSplit } from "@/components/service-deep/ServiceHeroSplit";
import { WohnenEditorialRow } from "@/components/service-deep/WohnenEditorialRow";
import { Container } from "@/components/ui/Container";
import { CategoryFaq } from "@/components/category/CategoryFaq";


export const metadata: Metadata = pageMetadata({
  path: "/unternehmen/flotten",
  title: "Flottenversicherung für Firmen | neosura",
  description: "Ab fünf Fahrzeugen lohnt sich die Flottenpolice: eine Deckung, eine Rechnung, weniger Aufwand. Jetzt vergleichen.",
});

/** Phase 7L — HARD RULE: no old Phase-6 deep-page sections remain on this
 * route. Everything previously rendered here (`ServiceHero`,
 * `ServiceLocalNav`, `ServiceInquiry`, `CategoryProblemStatement`,
 * `ServiceContentChapter` ×2, `ServicePhotoChapter`, `ServiceComparison`,
 * `ServiceAnalysis`, `ServiceProcess`, `ServiceFaq`, `CategoryClosing`)
 * was removed. Component FILES remain (other business deep routes still
 * scaffold from them) — only their usage on THIS route was removed.
 *
 * REFERENCE — COMBINED REFERENCE, same live page as Phase 7K's
 * Betriebshaftpflicht: no dedicated Flotten/Flottenversicherung page
 * exists (confirmed via 404s on `/flotten/`, `/flottenversicherung/`,
 * `/fahrzeugflotte/`, `/motorfahrzeugflotten/`, `/unternehmensfahrzeuge/`,
 * `/fuhrpark/`, `/firmenfahrzeuge/`, `/transport/`). The live mega-menu's
 * "Motorfahrzeugflotten"/"Transport" links resolve to a real, specific
 * anchor: `https://finwiwo.ch/versicherungen/unternehmen#flotte` — the
 * SAME `/unternehmen/` page already used as Betriebshaftpflicht's own
 * reference, re-confirmed fresh this phase (not assumed from Phase 7K's
 * notes): image 545×364 at 1440, image-left, full-heading swash,
 * checklist, CTA → dead `#formular`. FINWIWO's row combines
 * Motorfahrzeugflotten + Transport (cargo/goods-in-transit insurance) in
 * one checklist — "Transport" is NOT one of NEOSURA's six approved
 * business services and is NOT reproduced (the client guide's own
 * `clientGuideFleet` content is deliberately fleet-only, see that
 * constant's own docstring in `clientGuide.ts`) — CONTENT ROLE NARROWED
 * TO FLOTTEN ONLY. FINWIWO's own checklist item also states
 * "oft mit attraktiven Rabatten" (often with attractive discounts) — an
 * unverified discount claim, NOT reproduced anywhere on this page.
 *
 * HERO — same live full-bleed parallax + white-overlay + 50/50-split
 * hero already measured for Betriebshaftpflicht (this is the exact same
 * page). Reusing `ServiceHeroSplit` here is a genuine architecture
 * match, not a private-template default — see that component's own
 * docstring for the full measurement record.
 *
 * CTA DUPLICATION — this phase's own explicit lesson from 7K (which
 * showed the same "Bereit für den Überblick?" message three times: hero
 * card, hero text-column button, and a full closing `CategoryTopicCta`).
 * Fixed here: the Hero's white card carries FLEET-SPECIFIC copy
 * (`clientGuideFleet.headline`/`.intro`, §4.13, already approved and
 * already used on the `/unternehmen` hub's own Flotten row) instead of
 * the generic topic-CTA message, and the page ends with a single compact
 * button — no heading, no body, no bear, no second full CTA card. */
export default function FlottenPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 7L — Hero. h1/intro reuse the already-approved
          `businessServices[1]` tile title/body verbatim. heroItems are
          the existing approved `comparison.rows` labels + their
          "Flottenlösung" column cells, verbatim — the same compact
          hero-preview pattern already used on Betriebshaftpflicht. The
          card uses `clientGuideFleet.headline`/`.intro` (§4.13,
          fleet-specific, already approved) instead of the generic
          topic-CTA message, avoiding this phase's own flagged
          duplication problem. */}
      <ServiceHeroSplit
        h1={deep.h1}
        intro={deep.intro}
        items={deep.heroItems}
        ctaLabel="Kostenlose Analyse starten"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/business-fleet.webp",
          alt: "Firmenfahrzeug vor einem Lagergebäude",
          objectPosition: "center 55%",
        }}
        cardBadge="Flotten"
        cardTitle={clientGuideFleet.headline}
        cardBody={clientGuideFleet.intro}
        cardCtaLabel="Kostenlose Analyse starten"
        cardCtaHref="/analyse"
      />

      {/* Phase 7L — core Flotten module, architecture from FINWIWO's own
          "Motorfahrzeugflotten" row (`#flotte`, image-left, re-confirmed
          fresh this phase). Heading/checklist are pre-existing approved
          copy; both paragraphs combined verbatim into the row's single
          paragraph slot. */}
      <WohnenEditorialRow
        inset
        tightBottom
        id="flotten"
        heading={deep.flotten.heading}
        paragraph={`${deep.flotten.paragraphs[0]} ${deep.flotten.paragraphs[1]}`}
        checklist={deep.flotten.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/business-fleet-editorial.webp",
          alt: "Firmenfahrzeuge auf einem Betriebshof",
          objectPosition: "center 40%",
        }}
      />

      {/* Phase 7L — administrative-value module (fleet changes, premium
          basis, broker-negotiated terms), image-right. Heading/paragraph/
          checklist are the client guide's exact §4.13 Vorteile copy
          (`mobilitaet`, wired in Phase 7M.1), verbatim. No vehicle-type
          taxonomy (passenger/commercial/leased/employee) is presented —
          audited and found unsupported by any approved content, so no
          standalone "vehicle mix" module was built (see documentation). */}
      <WohnenEditorialRow
        inset
        id="fahrer-nutzung"
        heading={deep.mobilitaet.heading}
        paragraph={deep.mobilitaet.paragraphs[0]}
        checklist={deep.mobilitaet.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        reverse
        photo={{
          photo: "/images/services/manifesto-advisor.webp",
          alt: "Beratungsgespräch in einem modernen Büro",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7L — claims-handling module, image-left. Heading/paragraph
          are the client guide's exact §4.13 Schadenmanagement copy
          (`schutz`), verbatim. checklist is a STRUCTURALLY DERIVED
          3-item split of that same sentence's own three clauses — no
          response-time, discount, or assistance-hotline claim added. */}
      <WohnenEditorialRow
        inset
        id="schutz"
        heading={deep.schutz.heading}
        paragraph={deep.schutz.paragraphs[0]}
        checklist={deep.schutz.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/business-fleet.webp",
          alt: "Firmenfahrzeug vor einem Lagergebäude",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7L — Einzelpolice/Flottenlösung supporting strip. No
          FINWIWO card-grid equivalent exists for this content, so it is
          presented as a plain thin-line comparison (no card borders, no
          colored background) rather than a decorative grid. Heading/
          intro/all row labels and cell values are the existing approved
          `comparison` content, verbatim (the "Flottenlösung" column is
          the same cells already surfaced compactly in the Hero above;
          this is their fuller, page-anchored presentation). */}
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

      {/* Phase 7L — FAQ, legitimate pre-existing client-source content,
          reused via `CategoryFaq` (same configuration already
          established on Krankenkasse/Vorsorge/Rechtsschutz-Cyber/
          Betriebshaftpflicht). */}
      <CategoryFaq
        headingRest="Häufig gestellte"
        headingAccent="Fragen"
        subheading="Antworten auf die wichtigsten Fragen zu Flotten."
        accent="teal"
        maxWidth="1083px"
        openItemStyle="plain"
        largeSubheading
        items={deep.faq}
      />

      {/* Phase 7L — compact closing. The Hero already carries a full,
          fleet-specific analysis card (title + body + CTA) — per this
          phase's own explicit "no two large CTA blocks" rule, the page
          does NOT repeat a full `CategoryTopicCta` here. Just the site's
          one real, truthful button, no heading, no body, no bear. */}
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
