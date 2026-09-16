import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { betriebshaftpflichtDeep as deep } from "@/content/de/deep/betriebshaftpflicht";
import { clientGuideTopicCta } from "@/content/de/clientGuide";
import { ServiceHeroSplit } from "@/components/service-deep/ServiceHeroSplit";
import { WohnenEditorialRow } from "@/components/service-deep/WohnenEditorialRow";
import { Container } from "@/components/ui/Container";
import { CategoryFaq } from "@/components/category/CategoryFaq";
import { CategoryTopicCta } from "@/components/category/CategoryTopicCta";


export const metadata: Metadata = pageMetadata({
  path: "/unternehmen/betriebshaftpflicht",
  title: "Betriebshaftpflicht für KMU | neosura",
  description: "Betriebshaftpflicht im Vergleich: passende Deckungssummen und Bausteine für Ihre Branche, verhandelt von Ihrem Broker.",
});

/** Phase 7K — HARD RULE: no old Phase-6 deep-page sections remain on this
 * route. Everything previously rendered here (`ServiceHero`,
 * `ServiceLocalNav`, `ServiceInquiry`, `CategoryProblemStatement`,
 * `ServiceContentChapter` ×2, `ServicePhotoChapter`, `ServiceComparison`,
 * `ServiceAnalysis`, `ServiceProcess`, `ServiceFaq`, `CategoryClosing`)
 * was removed. Component FILES remain (other business deep routes still
 * scaffold from them) — only their usage on THIS route was removed.
 *
 * FIRST UNTERNEHMEN DEEP PAGE — REFERENCE FINDING: no dedicated FINWIWO
 * Betriebshaftpflicht page exists (confirmed via 404s on
 * `/betriebshaftpflicht/`, `/betriebshaftpflichtversicherung/`,
 * `/unternehmenshaftpflicht/`, `/haftpflicht/`, `/haftpflichtversicherung/`,
 * `/firmenversicherung(en)/`, `/geschaeftsversicherung/`,
 * `/unternehmensversicherung/`, `/betrieb/`). Two live pages DO exist for
 * business insurance: `/kmu/` (a pure multi-tab quote-REQUEST FORM tool —
 * "Betriebshaft/-sach Offerte" tab — with zero editorial content, not a
 * legitimate architecture reference per the no-fake-tool rule) and
 * `/versicherungen/unternehmen` (redirects to, and is byte-identical
 * with, `/unternehmen/` — confirmed by navigating both and comparing
 * `page.url()` + H1). The live mega-menu's own "Betriebshaftpflicht"
 * link resolves to a REAL, specific anchor on that page:
 * `https://finwiwo.ch/versicherungen/unternehmen#betrieb` — a genuine,
 * directly-linked section, not a guess. That `#betrieb` row is the SAME
 * shared FINWIWO editorial-row template already confirmed across every
 * private page in this project (image 545×364 at 1440 — within rounding
 * of `WohnenEditorialRow`'s own 544.9×363.3 spec — image-left, full-
 * heading swash, checklist, CTA → dead `#formular`), combining
 * Betriebshaftpflicht + Sachversicherungen + Betriebsrechtsschutz in one
 * row (those other two topics have their OWN future deep pages and are
 * NOT reproduced here — CONTENT ROLE NARROWED TO BETRIEBSHAFTPFLICHT
 * ONLY, same "architecture reused, content scoped to this page's own
 * topic" pattern already established project-wide).
 *
 * HERO — do NOT default to `ServiceHeroFullbleed` or `CategoryHero`'s own
 * fullbleed layout (see this phase's own explicit rule). Live-remeasuring
 * `/versicherungen/unternehmen`'s own hero this phase (not assumed from
 * Phase 7E's notes) confirmed a full-bleed parallax background photo IS
 * still present (Nectar's `.row-bg-wrap` sibling-layer pattern, not a
 * computed style on any `<h1>` ancestor — an initial DOM-chain climb
 * missed it and wrongly concluded the hero had gone flat; corrected
 * after comparing a screenshot against the DOM, see
 * `ServiceHeroSplit`'s own docstring for the full trail), on top of a
 * genuine 50/50 SPLIT: H1 + checklist + CTA on the left, a substantial
 * white lead-form card on the right (not a second photo). Reproducing
 * that exact form (a 9-option multi-service quote request) would be
 * architecturally wrong on a page scoped to ONE topic, even though
 * NEOSURA has a genuine working equivalent (`CategoryHeroBusinessForm`,
 * already used on the business HUB). Per the "no fake functionality,
 * preserve spatial architecture" rule, a new dedicated component
 * (`ServiceHeroSplit`) was built: same full-bleed photo + white overlay
 * + parallax + 50/50 split + bottom-only radius, but the right-column
 * card holds a short truthful `/analyse` message instead of the
 * 9-checkbox form — see that component's own docstring for the full
 * measurement record. */
export default function BetriebshaftpflichtPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 7K — Hero. h1/intro reuse the already-approved
          `businessServices[0]` tile title/body verbatim. heroItems are
          the existing approved `comparison.rows[0]` Personenschaden/
          Sachschaden/Vermögensschaden cells, verbatim — not new copy.
          `photo` is the full-bleed background (matching the live
          reference's own photo layer, see `ServiceHeroSplit`'s
          docstring). The right-column card replaces FINWIWO's own
          9-checkbox lead form with the client guide's exact §7 topic-CTA
          copy (already used at the foot of every deep page) — genuinely
          truthful, real `/analyse` link, no invented fields. */}
      <ServiceHeroSplit
        h1={deep.h1}
        intro={deep.intro}
        items={deep.heroItems}
        ctaLabel="Kostenlose Analyse starten"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/business-liability.webp",
          alt: "Führungskraft im Gespräch mit Mitarbeitenden im Büro",
          objectPosition: "center 35%",
        }}
        cardBadge="Unternehmen"
        cardTitle={clientGuideTopicCta.title}
        cardBody={clientGuideTopicCta.body}
        cardCtaLabel={clientGuideTopicCta.button}
        cardCtaHref="/analyse"
      />

      {/* Phase 7K — core Betriebshaftpflicht module, architecture from
          FINWIWO's own "Betriebshaftpflicht" row (`#betrieb`, image-left,
          re-confirmed fresh this phase). Heading/paragraph/checklist are
          the client guide's exact §4.9 copy (`risiken`, wired in Phase
          7M.1), verbatim. CTA → /analyse. */}
      <WohnenEditorialRow
        inset
        tightBottom
        id="betriebshaftpflicht"
        heading={deep.risiken.heading}
        paragraph={deep.risiken.paragraphs[0]}
        checklist={deep.risiken.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/business-liability-editorial.webp",
          alt: "Team bespricht Berichte im modernen Büro",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7K — financial consequences, image-right (alternating).
          Heading/checklist are existing approved copy (guide-silent for
          this slot, pre-existing NEOSURA content); both existing
          paragraphs are combined verbatim into the row's single
          paragraph slot. */}
      <WohnenEditorialRow
        inset
        id="folgen"
        heading={deep.folgen.heading}
        paragraph={`${deep.folgen.paragraphs[0]} ${deep.folgen.paragraphs[1]}`}
        checklist={deep.folgen.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        reverse
        photo={{
          photo: "/images/services/manifesto-advisor.webp",
          alt: "Beratungsgespräch in einem modernen Büro",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7K — target-group / business-context module, image-left.
          Heading/paragraph are the client guide's exact §4.9 Branchen
          copy, verbatim. checklist is a STRUCTURALLY DERIVED 3-item split
          of that same sentence's own named industries — no industry
          invented beyond what the sentence already names. */}
      <WohnenEditorialRow
        inset
        id="branchen"
        heading={deep.situation.heading}
        paragraph={deep.situation.paragraphs[0]}
        checklist={deep.situation.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/business-property-editorial.webp",
          alt: "Modernes Lagergebäude bei Abenddämmerung",
          objectPosition: "center 45%",
        }}
      />

      {/* Phase 7K — Schadensarten strip. No FINWIWO card-grid equivalent
          exists for this content, so it is presented as a plain,
          restrained 3-column definition strip (no card borders, no
          colored background) rather than a decorative grid — matching
          this phase's own "avoid decorative card grids unless the
          reference uses them" rule. Heading/intro/all three
          label+description pairs are the existing approved
          `comparison` content, verbatim (the same cells already
          surfaced compactly in the Hero above; this is their fuller,
          page-anchored presentation, not new content). */}
      <section className="bg-white">
        <Container className="py-14 lg:py-16">
          <h2 className="max-w-[40ch] text-[1.6875rem] font-normal leading-[1.2] tracking-normal text-ink lg:text-[1.8rem] lg:leading-[34.56px]">
            {deep.comparison.heading}
          </h2>
          <p className="mt-3 max-w-[60ch] text-[1rem] font-light leading-[24px] text-ink-soft">{deep.comparison.intro}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {deep.comparison.columnHeaders.map((label, i) => (
              <div key={label} className="border-t-2 border-purple pt-4">
                <h3 className="text-[1.3125rem] font-medium leading-[27px] tracking-[-0.23px] text-ink lg:text-[1.4375rem] lg:leading-[29px]">{label}</h3>
                <p className="mt-2 text-[1rem] font-light leading-[24px] text-ink-soft">{deep.comparison.rows[0].cells[i]}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Phase 7K — FAQ, legitimate pre-existing client-source content,
          reused via `CategoryFaq` (same configuration already
          established on Krankenkasse/Vorsorge/Rechtsschutz-Cyber). */}
      <CategoryFaq
        headingRest="Häufig gestellte"
        headingAccent="Fragen"
        subheading="Antworten auf die wichtigsten Fragen zur Betriebshaftpflicht."
        accent="teal"
        maxWidth="1083px"
        openItemStyle="plain"
        largeSubheading
        items={deep.faq}
      />

      {/* Phase 7K — client-required standard "Bereit für den Überblick?"
          analysis CTA (guide §7). Audited before reuse: no distinct
          Unternehmens-specific CTA copy exists in the client guide, and
          the live `/unternehmen` hub itself already uses this identical
          copy for business audiences — confirming it is genuinely
          audience-agnostic, not a private-only line pasted in unchanged. */}
      <CategoryTopicCta
        title={clientGuideTopicCta.title}
        body={clientGuideTopicCta.body}
        buttonLabel={clientGuideTopicCta.button}
        buttonHref="/analyse"
      />
    </main>
  );
}
