import type { Metadata } from "next";
import { privateServices } from "@/content/de/private";
import { siteMeta } from "@/content/de/site";
import { pageMetadata } from "@/lib/seo";
import { fahrzeugReisenDeep as deep } from "@/content/de/deep/fahrzeug-reisen";
import { clientGuideHome, clientGuideTopicCta } from "@/content/de/clientGuide";
import { ServiceHeroFullbleed } from "@/components/service-deep/ServiceHeroFullbleed";
import { WohnenEditorialRow } from "@/components/service-deep/WohnenEditorialRow";
import { CategoryNewsletter } from "@/components/category/CategoryNewsletter";
import { CategoryTopicCta } from "@/components/category/CategoryTopicCta";

const service = privateServices[2];

export const metadata: Metadata = pageMetadata({
  path: "/privatkunden/fahrzeug-reisen",
  title: `${service.title} | ${siteMeta.name}`,
  description: service.body,
});

/** Phase 7H — HARD RULE: no old Phase-6 deep-page sections remain on this
 * route. Everything previously rendered here (`ServiceLocalNav`,
 * `ServiceInquiry`, `CategoryProblemStatement`, `ServiceContentChapter` ×2,
 * `ServicePhotoChapter`, `ServiceComparison`, `ServiceAnalysis`,
 * `ServiceProcess`, `ServiceFaq`, `CategoryClosing`) was removed — none of
 * them was independently confirmed to match
 * https://finwiwo.ch/fahrzeuge/'s own live architecture. Component FILES
 * remain (other routes still use several of them) — only their usage on
 * THIS route was removed.
 *
 * REFERENCE: https://finwiwo.ch/fahrzeuge/ — the dedicated FINWIWO vehicle
 * page (found via the live mega menu's "Fahrzeuge" item, with
 * `#autoversicherung`/`#motorrad` sub-anchors — not the generic
 * `/versicherungen/` hub). Confirmed to be the exact same shared row
 * template already used on Krankenkasse and Wohnen & Eigentum: same
 * `id="hausrat"`/`id="privathaftpflicht"` WPBakery ids reused verbatim
 * (just with "Autoversicherung"/"Motorradversicherung" content swapped
 * in) — proof this is one shared FINWIWO template family across the whole
 * site, not page-specific markup. FINWIWO's own Reiseversicherung content
 * does not exist on this page at all (only Auto/Motorrad) — the
 * client-required Reisen block instead reuses this same shared editorial-
 * row architecture in the third alternating position (image-left,
 * continuing the same left→right→left rhythm already established).
 *
 * MODULE CLASSIFICATION (full record in
 * docs/finwiwo-architecture/deep-fahrzeug-reisen.md):
 * - Hero → BUILD (reuse `ServiceHeroFullbleed`, same fullbleed/bottom-90px-
 *   radius/~0.2×-parallax architecture independently reconfirmed here).
 * - Rhetorical problem-statement row → OMITTED (same reasoning as Wohnen &
 *   Eigentum: no clean role distinct from the Hero's own intro).
 * - Autoversicherung (FINWIWO) → its own "bis zu 40% sparen" claim is an
 *   unverified savings claim, NOT reproduced. Content role replaced by
 *   the client's existing approved Fahrzeugversicherung block
 *   (Haftpflicht/Teilkasko/Vollkasko) — same row position (image-left).
 * - Motorradversicherung (FINWIWO) → NEOSURA has no distinct motorcycle
 *   content; content role replaced by the existing approved Assistance
 *   block — same row position (image-right).
 * - Reisen → ARCHITECTURE REUSED FROM THE SAME SHARED EDITORIAL-ROW
 *   FAMILY (no live FINWIWO Reise row exists on this specific page) —
 *   third alternating position (image-left), populated with the existing
 *   approved Reisen block.
 * - "So einfach funktioniert's" (generic 4-step process, independently
 *   reconfirmed present and near-identical to Krankenkasse's/Wohnen's own
 *   already-omitted process) → OMITTED — same reasoning: conflicts with
 *   the canonical global 5-step advisory process.
 * - "Das Versicherungsmandat" → OMITTED — no distinct client-supplied
 *   content role for a mandate module on this page (not a fake-claims
 *   problem, simply no role here, same reasoning as Wohnen).
 * - FAQ ("Häufig gestellte Fragen") → OPTIONAL FAQ OMITTED — NO
 *   CLIENT-SUPPLIED FAQ CONTENT. `fahrzeugReisenDeep.faq` is pre-existing
 *   guide-silent NEOSURA copy from Phase 7M.1, not fresh client-guide-
 *   supplied content for this phase — not reused, per the same standard
 *   already applied to Wohnen & Eigentum's own FAQ.
 * - Empty 0-height row (same `nectar-overflow-hidden` pattern already
 *   found on Krankenkasse and Wohnen) → OMITTED — ZERO RENDERED CONTENT
 *   ROLE.
 * - Newsletter → BUILD (reuse `CategoryNewsletter` as-is, same family
 *   independently reconfirmed here).
 * - Rotating brand sign-off → EXISTING FOOTER TAGLINE REUSED, no
 *   duplicate strip built.
 * - Standard Analysis CTA → BUILD (reuse `CategoryTopicCta` as-is —
 *   already carries the bear icon, satisfying this page's own bear
 *   requirement without a new placement). */
export default function FahrzeugReisenPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 7H — Hero, live-remeasured against
          https://finwiwo.ch/fahrzeuge/. Same fullbleed/bottom-only-90px-
          radius/white-overlay architecture as Krankenkasse's and Wohnen &
          Eigentum's own Hero (same shared `ServiceHeroFullbleed`
          component, no changes). Background parallax independently
          reconfirmed at ~0.2× scroll offset — the third time this exact
          ratio has now been measured on this shared FINWIWO Hero
          template, further confirming it is one sitewide template, not
          page-specific. FINWIWO's own H1 ("Ihr Fahrzeug bestens
          versichert") and its 3 value items (one of which, "Bis zu 40%
          sparen durch Vergleiche", is an unverified savings claim) are
          NOT reused. No fresh verbatim client-guide H1/intro was supplied
          for this specific phase (unlike Krankenkasse/Wohnen) — `h1`/
          `intro` instead reuse the already-approved `privateServices[2]`
          tile title/body verbatim, not an invented marketing sentence.
          Hero items remapped to the three client-required topics
          (Fahrzeugversicherung/Assistance/Reisen), each UI LABEL DERIVED
          FROM CLIENT COPY. FINWIWO's own embedded lead-comparison form is
          NOT reproduced — the same technical-truth decision already made
          twice — CTA goes straight to /analyse. */}
      <ServiceHeroFullbleed
        h1={deep.h1}
        intro={deep.intro}
        items={deep.heroItems}
        ctaLabel="Kostenlose Analyse starten"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/private-car-editorial.webp",
          alt: "Fahrt mit dem Geländewagen auf einer kurvigen Bergstrasse",
          objectPosition: "center 50%",
        }}
      />

      {/* Phase 7H — Fahrzeugversicherung, architecture from FINWIWO's own
          "Autoversicherung" row (image-left, matching that row's measured
          orientation). Paragraphs and checklist are the existing approved
          NEOSURA copy (client guide §4.5 Haftpflicht/Teilkasko/Vollkasko
          explainer, already wired in Phase 7M.1) — FINWIWO's own "bis zu
          40% sparen" savings claim is not reproduced. CTA maps to
          /analyse, not FINWIWO's own #formular. */}
      <WohnenEditorialRow
        inset
        tightBottom
        id="fahrzeugversicherung"
        heading="Fahrzeugversicherung"
        paragraph={deep.fahrzeugversicherung.paragraphs[0]}
        checklist={deep.fahrzeugversicherung.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/private-car.webp",
          alt: "Familie packt Gepäck in den Kofferraum",
          objectPosition: "center 40%",
        }}
      />

      {/* Phase 7H — Assistance, architecture from FINWIWO's own
          "Motorradversicherung" row (image-right, matching that row's
          measured orientation — NEOSURA has no distinct motorcycle
          content, so the row's position/geometry is reused, not its
          content). Paragraphs and checklist are the existing approved
          NEOSURA copy. CTA maps to /analyse. */}
      <WohnenEditorialRow
        inset
        id="assistance"
        heading="Assistance"
        paragraph={deep.assistance.paragraphs[0]}
        checklist={deep.assistance.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        reverse
        photo={{
          photo: "/images/services/private-cyber.webp",
          alt: "Person zuhause am Laptop",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7H — Reisen. ARCHITECTURE REUSED FROM THE SAME SHARED
          EDITORIAL-ROW FAMILY — no live FINWIWO Reiseversicherung row
          exists on https://finwiwo.ch/fahrzeuge/ itself (only Auto/
          Motorrad); the third alternating position (image-left,
          continuing the established rhythm) is used instead, the same
          reuse pattern already applied to Wohnen & Eigentum's
          Gebäudeversicherung. Paragraph is the existing approved Reisen
          copy. Checklist newly added — the three named concepts from
          that paragraph's own text (UI LABEL DERIVED FROM CLIENT COPY),
          not FINWIWO's own travel-insurance wording (not reproduced —
          FINWIWO's own content is architecture-only reference here). */}
      <WohnenEditorialRow
        inset
        id="reisen"
        heading="Reisen & internationale Risiken"
        paragraph={deep.reisen.paragraphs[0]}
        checklist={deep.reisen.checklist ?? []}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/private-pension.webp",
          alt: "Paar entspannt zuhause im Wohnzimmer",
          objectPosition: "center 35%",
        }}
      />

      {/* Phase 7H — Newsletter, independently re-measured for this exact
          Fahrzeug & Reisen instance (same live family already confirmed
          three times: transparent background, 15px radius, no scale, no
          swash). Exact client copy (`clientGuideHome.newsletter`), no
          real backend (LAUNCH BLOCKER unchanged), no fake subscription
          success, no avatar/subscriber proof. */}
      <CategoryNewsletter
        title={clientGuideHome.newsletter.title}
        body={clientGuideHome.newsletter.body}
        ctaLabel="Jetzt abonnieren"
      />

      {/* Phase 7H — client-required standard "Bereit für den Überblick?"
          analysis CTA (guide §7), reusing `CategoryTopicCta` as-is —
          already approved and locked on /unternehmen, Krankenkasse, and
          Wohnen & Eigentum. FINWIWO has no dedicated closing-CTA card on
          this page either. Already carries the restrained `bear-
          trust.webp` decorative icon — satisfies this page's own bear
          requirement by reuse, not a new placement. FINWIWO's own
          rotating-word brand sign-off is not rebuilt — EXISTING FOOTER
          TAGLINE REUSED (the locked global Footer already renders
          "Persönlich. Unabhängig. Klar." on every page). */}
      <CategoryTopicCta
        title={clientGuideTopicCta.title}
        body={clientGuideTopicCta.body}
        buttonLabel={clientGuideTopicCta.button}
        buttonHref="/analyse"
      />
    </main>
  );
}
