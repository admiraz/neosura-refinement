import type { Metadata } from "next";
import Link from "next/link";
import { businessServices } from "@/content/de/business";
import { siteMeta } from "@/content/de/site";
import { pageMetadata } from "@/lib/seo";
import { inventarImmobilienDeep as deep } from "@/content/de/deep/inventar-immobilien";
import { clientGuideTopicCta } from "@/content/de/clientGuide";
import { ServiceHeroSplit } from "@/components/service-deep/ServiceHeroSplit";
import { WohnenEditorialRow } from "@/components/service-deep/WohnenEditorialRow";
import { Container } from "@/components/ui/Container";
import { CategoryFaq } from "@/components/category/CategoryFaq";

const service = businessServices[3];

export const metadata: Metadata = pageMetadata({
  path: "/unternehmen/sachversicherung",
  title: `${service.title} | ${siteMeta.name}`,
  description: service.body,
});

/** Phase 7N — HARD RULE: no old Phase-6 deep-page sections remain on this
 * route. Everything previously rendered here (`ServiceHero`,
 * `ServiceLocalNav`, `ServiceInquiry`, `CategoryProblemStatement`,
 * `ServiceContentChapter` ×2, `ServicePhotoChapter`, `ServiceComparison`,
 * `ServiceAnalysis`, `ServiceProcess`, `ServiceFaq`, `CategoryClosing`)
 * was removed. Component FILES remain (other business deep routes still
 * scaffold from them) — only their usage on THIS route was removed.
 *
 * REFERENCE — COMBINED REFERENCE, same live hub page and same `#betrieb`
 * row already used for Betriebshaftpflicht (Phase 7K): no dedicated
 * Sachversicherung page exists (confirmed via 404s on `/sachversicherung/`,
 * `/sachversicherungen/`, `/geschaeftsversicherung/`,
 * `/inventarversicherung/`, `/betriebsinventar/`,
 * `/gebaeudeversicherung-unternehmen/`, `/unternehmensversicherung/`).
 * The live mega-menu's "Sachversicherungen" link resolves to
 * `https://finwiwo.ch/versicherungen/unternehmen#betrieb` — re-measured
 * fresh this phase (not assumed from Phase 7K's own notes): height 613px,
 * image 545×364 at 1440, image-left (x=175), full-heading swash. FINWIWO's
 * own row combines Betriebshaftpflicht + Sachversicherungen +
 * Betriebsrechtsschutz; Betriebshaftpflicht and Betriebsrechtsschutz are
 * NOT reproduced here (they belong to their own pages) — CONTENT ROLE
 * NARROWED TO SACHVERSICHERUNG ONLY. FINWIWO's own Sachversicherungen
 * checklist item uses the word "Naturgefahren" and "Inventar" — NEOSURA's
 * own approved content (`sachwerte`/`immobilien`) uses "Elementar" and
 * "Einrichtung" instead; the approved wording is used throughout, not
 * FINWIWO's own phrasing.
 *
 * HERO — same live full-bleed parallax + white-overlay + 50/50-split
 * hero already measured for Betriebshaftpflicht/Flotten/Berufliche
 * Vorsorge (this is the exact same page). Reusing `ServiceHeroSplit` is
 * a genuine architecture match, not a default.
 *
 * CTA HIERARCHY — no Sachversicherung-specific short tagline exists in
 * approved content, so the Hero's white card carries the generic §7
 * topic-CTA message (`clientGuideTopicCta`) — its ONLY appearance on
 * this page. The page ends with a single compact button only, the same
 * pattern established on Flotten/Berufliche Vorsorge. */
export default function SachversicherungPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 7N — Hero. h1/intro reuse the already-approved
          `businessServices[3]` tile title/body verbatim. heroItems are a
          STRUCTURALLY DERIVED title/body split of the existing approved
          `sachwerte.checklist`'s own three sentences. Card carries the
          generic §7 topic-CTA message (see CTA HIERARCHY note above). */}
      <ServiceHeroSplit
        h1={deep.h1}
        intro={deep.intro}
        items={deep.heroItems}
        ctaLabel="Kostenlose Analyse starten"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/business-property.webp",
          alt: "Moderne Geschäftsliegenschaft",
          objectPosition: "center 45%",
        }}
        cardBadge="Sachversicherung"
        cardTitle={clientGuideTopicCta.title}
        cardBody={clientGuideTopicCta.body}
        cardCtaLabel={clientGuideTopicCta.button}
        cardCtaHref="/analyse"
      />

      {/* Phase 7N — "Was ist versichert?" strip. No FINWIWO card-grid
          equivalent exists for this content, so it is presented as a
          plain thin-line strip (no card borders, no colored background),
          matching the same restraint already used for comparison strips
          on Betriebshaftpflicht/Flotten/Berufliche Vorsorge. The four
          labels are the exact nouns from the already-approved
          `businessServices[3].body` tile line ("Inventar, Waren,
          Maschinen, Immobilien") — not a new taxonomy invented for this
          page. */}
      <section className="bg-white">
        <Container className="py-12 lg:py-14">
          <h2 className="text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.8rem] lg:leading-[34.56px]">Was ist versichert?</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 sm:grid-cols-4">
            {deep.insuredObjects.map((label) => (
              <div key={label} className="flex items-center gap-2.5">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-[18px] w-[18px] shrink-0 text-purple">
                  <path d="M4 10.5l3.5 3.5L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[1rem] font-light leading-[24px] text-ink">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Phase 7N — core Sachversicherung module, architecture from
          FINWIWO's own "Sachversicherungen" row (`#betrieb`, image-left,
          re-confirmed fresh this phase). Heading/paragraph/checklist are
          the client guide's exact §4.10 copy (`sachwerte`), verbatim. */}
      <WohnenEditorialRow
        inset
        tightBottom
        id="sachwerte"
        heading={deep.sachwerte.heading}
        paragraph={deep.sachwerte.paragraphs[0]}
        checklist={deep.sachwerte.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/business-property-editorial.webp",
          alt: "Modernes Lagergebäude bei Abenddämmerung",
          objectPosition: "center 45%",
        }}
      />

      {/* Phase 7N — Immobilien module, image-right. Heading/paragraph/
          checklist are the client guide's exact §4.10 copy (`immobilien`),
          verbatim. Cantonal Gebäudeversicherung regulation is stated
          generally, matching the source — no single canton's rule is
          generalized to all of Switzerland. */}
      <WohnenEditorialRow
        inset
        id="immobilien"
        heading={deep.immobilien.heading}
        paragraph={deep.immobilien.paragraphs[0]}
        checklist={deep.immobilien.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        reverse
        photo={{
          photo: "/images/services/business-property.webp",
          alt: "Moderne Geschäftsliegenschaft",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7N — Betriebsunterbruch module (business interruption —
          conceptually distinct from physical property loss, given its
          own row per this phase's own Section 14), image-left. Heading/
          paragraph are the client guide's exact §4.10 copy
          (`betriebsunterbrueche`), verbatim; checklist is a
          STRUCTURALLY DERIVED 3-item split of that same paragraph's own
          three clauses — no coverage limit or duration figure added. */}
      <WohnenEditorialRow
        inset
        id="schaeden"
        heading={deep.betriebsunterbrueche.heading}
        paragraph={deep.betriebsunterbrueche.paragraphs[0]}
        checklist={deep.betriebsunterbrueche.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/business-liability-editorial.webp",
          alt: "Team bespricht Berichte im modernen Büro",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7N — Sachversicherung/Betriebsunterbrechung strip.
          Legitimate existing approved content (guide-silent,
          pre-existing). Plain thin-line comparison, same treatment
          already used on the three prior business deep pages. */}
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

      {/* Phase 7N — FAQ, legitimate pre-existing client-source content,
          reused via `CategoryFaq` (same configuration as every other
          completed deep page). */}
      <CategoryFaq
        headingRest="Häufig gestellte"
        headingAccent="Fragen"
        subheading="Antworten auf die wichtigsten Fragen zur Sachversicherung."
        accent="teal"
        maxWidth="1083px"
        openItemStyle="plain"
        largeSubheading
        items={deep.faq}
      />

      {/* Phase 7N — compact closing. The Hero already carries a full
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
