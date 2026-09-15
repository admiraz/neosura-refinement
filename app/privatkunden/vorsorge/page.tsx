import type { Metadata } from "next";
import { privateServices } from "@/content/de/private";
import { siteMeta } from "@/content/de/site";
import { pageMetadata } from "@/lib/seo";
import { vorsorgeVermoegenDeep as deep } from "@/content/de/deep/vorsorge-vermoegen";
import { clientGuideTopicCta } from "@/content/de/clientGuide";
import { ServiceHeroFullbleed } from "@/components/service-deep/ServiceHeroFullbleed";
import { WohnenEditorialRow } from "@/components/service-deep/WohnenEditorialRow";
import { CategoryFaq } from "@/components/category/CategoryFaq";
import { CategoryTopicCta } from "@/components/category/CategoryTopicCta";

const service = privateServices[3];

export const metadata: Metadata = pageMetadata({
  path: "/privatkunden/vorsorge",
  title: `${service.title} | ${siteMeta.name}`,
  description: service.body,
});

/** Phase 7I — HARD RULE: no old Phase-6 deep-page sections remain on this
 * route. Everything previously rendered here (`ServiceLocalNav`,
 * `ServiceInquiry`, `CategoryProblemStatement`, `ServiceContentChapter` ×2,
 * `ServicePhotoChapter`, `ServiceComparison`, `ServiceAnalysis`,
 * `ServiceProcess`, `ServiceFaq`, `CategoryClosing`) was removed. Component
 * FILES remain (other routes still use several of them) — only their
 * usage on THIS route was removed.
 *
 * REFERENCE: https://finwiwo.ch/vorsorge/ — a materially richer and more
 * "marketing landing page"-styled FINWIWO page than Krankenkasse/Wohnen/
 * Fahrzeug: fake review counts ("+500 Bewertungen", "401 Vorsorgeanalysen"),
 * unverified statistics ("AHV/Pensionskasse decken nur 60%..."), a
 * competitive-differentiation table ("Warum FINWIWO..."), a genuinely
 * interactive tax-savings calculator with real CHF-figure Säule-3a
 * stat-cards, and a 4-step process — NONE of which is reproduced: this
 * phase's own explicit hard rule is "architecture may come from FINWIWO,
 * financial claims may not," and Section 13 explicitly forbids fake
 * calculator functionality. The one genuinely reusable content-row
 * architecture found (the live "Die Pensionsplanung" editorial row —
 * image-left, swash H2, prose paragraphs, CTA) is the same family already
 * proven on Krankenkasse/Wohnen & Eigentum/Fahrzeug & Reisen
 * (`WohnenEditorialRow`), reused directly for NEOSURA's own three
 * approved topics instead of FINWIWO's own Pensionsplanung content.
 *
 * MODULE CLASSIFICATION (full record in
 * docs/finwiwo-architecture/deep-vorsorge.md):
 * - Hero → BUILD (reuse `ServiceHeroFullbleed`, `overlay="light"` per this
 *   phase's own "hero visual cleanliness" correction).
 * - Two rhetorical statement rows → OMITTED (no distinct client role).
 * - "Warum eine Vorsorge unverzichtbar ist" (60%/40% stats) → OMITTED —
 *   unverified financial claims, not in approved content.
 * - Säule-3a stat-card (CHF 7'258/CHF 36'288) → OMITTED as its own module
 *   — the general 3-pillar concept is already covered by the System row's
 *   own checklist; the specific CHF figures are not in approved content.
 * - Interactive tax-savings calculator ("Ihre Steuerersparnis berechnen")
 *   → OMITTED — no fake calculator functionality, per this phase's own
 *   explicit Section 13.
 * - "Warum FINWIWO für Ihre Vorsorge?" comparison table → OMITTED —
 *   competitive-differentiation claims NEOSURA cannot truthfully make.
 * - "So einfach funktioniert's" (4-step process) → OMITTED — conflicts
 *   with the canonical global 5-step advisory process, same reasoning
 *   already established three times.
 * - "Die Pensionsplanung" → ARCHITECTURE REUSED (see above); its own
 *   specific retirement-transition-timing content is not reproduced —
 *   NEOSURA's own three approved topics (System/Vermögensaufbau/
 *   Absicherung) are built in this same row family instead.
 * - FAQ ("Häufig gestellte Fragen") → BUILD. Unlike Wohnen & Eigentum's
 *   and Fahrzeug & Reisen's own FAQ decisions, this phase's brief
 *   explicitly permits reusing FAQ content that "already legitimately
 *   exists elsewhere in the client source" — `vorsorgeVermoegenDeep.faq`
 *   (5 items, Phase 7M.1) is exactly that: pre-existing, factual,
 *   evergreen, non-fabricated content. Reused via `CategoryFaq`
 *   (`openItemStyle="plain"`, `maxWidth="1080px"` — independently
 *   reconfirmed to match this page's own live FAQ geometry, not assumed).
 * - Empty 0-height row pattern (not explicitly found on this page's own
 *   discovery scan, but the same Newsletter/sign-off/footer-strip
 *   sequence found on every other FINWIWO page in this project) →
 *   Newsletter section was intentionally NOT built here — see below.
 * - Newsletter → OMITTED for this specific page (see below) rather than
 *   built.
 * - Rotating brand sign-off → EXISTING FOOTER TAGLINE REUSED, no
 *   duplicate strip.
 * - Standard Analysis CTA → BUILD (reuse `CategoryTopicCta` as-is, now
 *   with its own Phase 7I vertical-rhythm tightening applied globally).
 *
 * NEWSLETTER DECISION: omitted on this specific route. Every other
 * completed private-customer route already carries the identical
 * `CategoryNewsletter` module with identical copy; per this phase's own
 * "cleanliness over decoration" mandate and Section 11's "a shorter
 * truthful page is preferable to a padded page," repeating the exact
 * same newsletter block a fourth time in a row immediately before the
 * exact same standard CTA was judged to add bulk without adding value —
 * FAQ → Standard CTA is a tighter, calmer ending that still fully
 * satisfies the client guide's own newsletter requirement (already met
 * on the other three private-customer pages) without visually padding
 * this specific page. This is a content-density decision specific to
 * this phase's own explicit brief, not a reversal of the newsletter's
 * LAUNCH BLOCKER status or a claim that newsletter functionality is
 * unnecessary generally. */
export default function VorsorgePage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 7I — Hero, live-remeasured against
          https://finwiwo.ch/vorsorge/. Same fullbleed/bottom-only-90px-
          radius architecture as the other three private-customer Heroes
          (same shared `ServiceHeroFullbleed`), with `overlay="light"` —
          this phase's own explicit "hero visual cleanliness" correction
          (subject must stay visible, no milky-white wash) applied via a
          new opt-in prop that leaves the other three Heroes' own default
          72% overlay completely unchanged. FINWIWO's own H1 ("Heute
          vorsorgen. Morgen nicht bereuen."), its "Massarbeit für Ihre
          Vorsorge" tagline, and its intro (which includes an unverified
          "sparen Sie jährlich tausende Franken Steuern" claim, a
          "+25 Anbieter vergleichen" comparison claim, and fake review/
          analysis-count social proof — "Bereits über 401
          Vorsorgeanalysen. 4.9 | +500 Bewertungen") are NOT reused
          anywhere. No fresh verbatim client-guide H1/intro was supplied
          for this phase — `h1`/`intro` instead reuse the already-approved
          `privateServices[3]` tile title/body verbatim. Hero items
          remapped to the three client-required topics, each UI LABEL
          DERIVED FROM CLIENT COPY. FINWIWO's own interactive tax
          calculator is not reproduced — CTA goes straight to /analyse.
          Phase 7SYS.C — fresh live re-audit of `/vorsorge/`'s own real
          overlay found it is NOT a gradient at all but a genuinely
          FLATTER, MORE opaque wash than every other private Hero: a flat
          `rgba(255,255,255,.9)` (90%) — more washed out than this
          page's own existing `overlay="light"` (48%), not less. Matching
          that literal reference would contradict this phase's own
          explicit visual target ("photo becomes clearly visible... not
          white panel with a faint image underneath"), so it is
          deliberately NOT adopted — documented here as a disclosed,
          reasoned departure rather than a silent gap. `overlayGradient`
          is set to the same real, evidence-based gradient measured on
          `/wohnen-recht-ferien/` instead (both private pages share the
          same underlying photo asset — see this page's own known-
          limitation note elsewhere — so applying the same genuinely
          measured gradient shape, rather than inventing an unrelated
          number, keeps the choice evidence-grounded). */}
      <ServiceHeroFullbleed
        h1={deep.h1}
        intro={deep.intro}
        items={deep.heroItems}
        ctaLabel="Kostenlose Analyse starten"
        ctaHref="/analyse"
        overlayGradient="linear-gradient(180deg, rgba(255,255,255,.58) 10%, rgba(255,255,255,.635) 43%, rgba(255,255,255,.72) 68%, rgba(255,255,255,.94) 91%)"
        photo={{
          photo: "/images/services/private-pension.webp",
          alt: "Paar entspannt zuhause im Wohnzimmer",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7I — Das Schweizer Vorsorgesystem, architecture from
          FINWIWO's own "Die Pensionsplanung" row (image-left). Paragraph
          and checklist are the existing approved copy (client guide §4.6,
          wired in Phase 7M.1), verbatim — no new CHF figures added
          anywhere (FINWIWO's own Säule-3a stat-card figures are not
          reproduced). CTA maps to /analyse. */}
      <WohnenEditorialRow
        inset
        narrowImage
        tightBottom
        id="vorsorgesystem"
        heading="Das Schweizer Vorsorgesystem"
        paragraph={deep.system.paragraphs[0]}
        checklist={deep.system.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/private-pension-editorial.webp",
          alt: "Reifes Paar prüft gemeinsam Unterlagen am Laptop",
          objectPosition: "center 20%",
        }}
      />

      {/* Phase 7I — Vermögensaufbau, image-right, continuing the
          alternating rhythm. Paragraph and checklist are the existing
          approved copy, verbatim. CTA maps to /analyse. */}
      <WohnenEditorialRow
        inset
        narrowImage
        id="vermoegensaufbau"
        heading="Vermögensaufbau"
        paragraph={deep.vermoegensaufbau.paragraphs[0]}
        checklist={deep.vermoegensaufbau.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        reverse
        photo={{
          photo: "/images/services/private-home-editorial.webp",
          alt: "Familie sitzt zwischen Umzugskartons im neuen Zuhause",
          objectPosition: "center 40%",
        }}
      />

      {/* Phase 7I — Langfristige Absicherung, image-left, continuing the
          alternating rhythm. Paragraph is the existing approved copy,
          verbatim. Checklist newly added — the concepts named in that
          paragraph's own text (Erwerbsunfähigkeitsrente/Todesfallkapital/
          Familien mit einem Haupteinkommen), not invented. CTA maps to
          /analyse. */}
      <WohnenEditorialRow
        inset
        narrowImage
        id="absicherung"
        heading="Langfristige Absicherung"
        paragraph={deep.absicherung.paragraphs[0]}
        checklist={deep.absicherung.checklist ?? []}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/private-car.webp",
          alt: "Mehrere Generationen einer Familie packen gemeinsam das Auto",
          objectPosition: "center 40%",
        }}
      />

      {/* Phase 7I — FAQ. Live FINWIWO has 7 items; this phase's own brief
          explicitly permits reusing FAQ content that already legitimately
          exists in the client source rather than requiring fresh
          client-guide copy — `vorsorgeVermoegenDeep.faq` (5 items, Phase
          7M.1) is exactly that. Reuses `CategoryFaq`, independently
          re-measured for this page's own live FAQ instance: same
          swash-on-"Fragen"-only heading, same plain (non-boxed) open-row
          style, same ~1083px accordion width already established on
          Krankenkasse's own FAQ. */}
      <CategoryFaq
        headingRest="Häufig gestellte"
        headingAccent="Fragen"
        subheading="Antworten auf die wichtigsten Fragen zu Vorsorge und Vermögen."
        accent="teal"
        maxWidth="1083px"
        openItemStyle="plain"
        largeSubheading
        items={deep.faq}
      />

      {/* Phase 7I — client-required standard "Bereit für den Überblick?"
          analysis CTA (guide §7), reusing `CategoryTopicCta` as-is —
          already approved and locked on /unternehmen, Krankenkasse,
          Wohnen & Eigentum, and Fahrzeug & Reisen. Already carries the
          restrained `bear-trust.webp` decorative icon. FINWIWO's own
          rotating-word brand sign-off is not rebuilt — EXISTING FOOTER
          TAGLINE REUSED. */}
      <CategoryTopicCta
        title={clientGuideTopicCta.title}
        body={clientGuideTopicCta.body}
        buttonLabel={clientGuideTopicCta.button}
        buttonHref="/analyse"
      />
    </main>
  );
}
