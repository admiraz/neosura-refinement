import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { themenNeuInDerSchweizDeep as deep } from "@/content/de/deep/themen-neu-in-der-schweiz";
import { clientGuideTopicCta } from "@/content/de/clientGuide";
import { LifeSituationHero } from "@/components/life-situation/LifeSituationHero";
import { LifeSituationGrid } from "@/components/life-situation/LifeSituationGrid";
import { CategoryTopicCta } from "@/components/category/CategoryTopicCta";

export const metadata: Metadata = pageMetadata({
  path: "/themen/neu-in-der-schweiz",
  title: "Versicherungen für Zuzüger & Expats | neosura",
  description: "Neu in der Schweiz: Krankenversicherung und Pflichtdeckungen in drei Monaten geregelt. Beratung auch auf Englisch.",
});

/** Phase 7R — NEOSURA's second life-situation page, reusing the Phase 7Q
 * family (`LifeSituationHero`/`LifeSituationGrid`/`LifeSituationCard`)
 * after confirming — not assuming — that the live FINWIWO reference
 * genuinely shares the same architecture as Familie.
 *
 * REFERENCE — live-audited `https://finwiwo.ch/expats-hallo-schweiz/`.
 * Confirmed identical row-level architecture to `finanzen-fuer-familien/`
 * (same shared page template: `#freude-an-finanzen` Hero with the same
 * classes/parallax/one-button-to-`#anfragen` mechanism, the same
 * `#anfragen` intake form, the same "Vier Fehler..." listicle format,
 * and the same "Ihre Situation – unsere Lösung" icon-grid module — here
 * populated with Expat-specific sub-situations: Gerade angekommen, Paar
 * oder Familie, Kader oder Spezialist, Stellenwechsel steht an, Wegzug
 * geplant, Schon lange hier). Per this phase's own reuse rule, the
 * approved 7Q family is reused directly rather than rebuilt from
 * scratch — no new Hero/Grid/Card component was created.
 *
 * ROUTING BLOCKS — 3 (not 4): unlike Familie's intro (which explicitly
 * names four topics), this page's intro is narrower — it discusses the
 * Swiss health-insurance system specifically. Only Krankenkasse has a
 * VERBATIM textual anchor (the intro's own 3-month deadline). The other
 * two blocks (Hausrat & Privathaftpflicht, Vorsorge/Säule 3a) are
 * STRUCTURALLY DERIVED from the intro's own "obligatorisch und
 * freiwillig" framing — see `content/de/deep/themen-neu-in-der-schweiz.ts`'s
 * own docstring for the full per-block sourcing note and the explicit
 * reasoning for NOT adding a 4th (Fahrzeug/Mobilität) block.
 *
 * DEADLINE — the ONLY explicit deadline in this page's content is the
 * client's own "innert drei Monaten nach Zuzug" health-insurance
 * obligation (used verbatim in the Krankenkasse card's own body). No
 * registration/driving-licence/tax/residence-permit deadline is added.
 *
 * ENGLISH SUPPORT — `deep.englishNote` ("Beratung auch auf Englisch
 * möglich.") renders as a small supporting line under the Hero CTA,
 * grounded directly in the intro's own closing clause — not expanded
 * into a broader multilingual-service claim.
 *
 * GUIDE ARTICLE — the client's own launch-topic list names "Neu in der
 * Schweiz: Krankenversicherung in 3 Monaten geregelt" as a working
 * title. Audited: `/ratgeber` is currently a single index page with no
 * per-article routes (same finding as Phase 7Q). PENDING RATGEBER
 * CONTENT — ARTICLE SUPPLIED AS WORKING TITLE ONLY. No article URL was
 * invented.
 *
 * PHOTOGRAPHY — `manifesto-advisor.webp` (a real, warm professional
 * discussion — person actively working on a laptop with colleagues) is
 * used for the Hero: it avoids every flagged cliché (Swiss flag,
 * passport close-up, airport, suitcase, handshake, fake relocation
 * office) and reads as "settling into professional/administrative life"
 * without being a stock-newcomer cliché. KNOWN LIMITATION: this asset is
 * already used on `/ueber-uns`'s own Hero and was previously used (then
 * removed) on `/unternehmen/cyber-rechtsschutz` — no exclusive
 * newcomer-themed asset exists in the licensed library.
 *
 * OMITTED (same reconciliation as Phase 7Q, for the same reasons): FAQ,
 * Newsletter, canonical 5-step process. Bear: one restrained instance,
 * carried by `CategoryTopicCta`'s own existing icon — none added to any
 * routing card. */
export default function ThemenNeuInDerSchweizPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      <LifeSituationHero
        h1={deep.h1}
        intro={deep.intro}
        ctaLabel="Kostenlose Analyse starten"
        ctaHref="/analyse"
        note={deep.englishNote}
        photo={{
          photo: "/images/services/manifesto-advisor.webp",
          alt: "Berufstätige Person im Gespräch mit Kolleginnen im modernen Büro",
          objectPosition: "center 30%",
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
