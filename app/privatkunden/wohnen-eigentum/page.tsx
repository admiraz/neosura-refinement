import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { wohnenEigentumDeep as deep } from "@/content/de/deep/wohnen-eigentum";
import { clientGuideHome, clientGuideTopicCta } from "@/content/de/clientGuide";
import { ServiceHeroFullbleed } from "@/components/service-deep/ServiceHeroFullbleed";
import { WohnenEditorialRow } from "@/components/service-deep/WohnenEditorialRow";
import { WohnenUnterversicherung } from "@/components/service-deep/WohnenUnterversicherung";
import { CategoryNewsletter } from "@/components/category/CategoryNewsletter";
import { CategoryTopicCta } from "@/components/category/CategoryTopicCta";


export const metadata: Metadata = pageMetadata({
  path: "/privatkunden/wohnen-eigentum",
  title: "Hausrat- & Haftpflichtversicherung | neosura",
  description: "Hausrat, Privathaftpflicht und Gebäudeversicherung mit den richtigen Summen. Unabhängiger Vergleich durch neosura.",
});

/** Phase 7G — HARD RULE: no old Phase-6 deep-page sections remain on this
 * route. Everything previously rendered here (`ServiceLocalNav`,
 * `ServiceInquiry`, `CategoryProblemStatement`, `ServiceContentChapter` ×2,
 * `ServicePhotoChapter`, `ServiceComparison`, `ServiceAnalysis`,
 * `ServiceProcess`, `ServiceFaq`, `CategoryClosing`) was removed — none of
 * them was independently confirmed to match
 * https://finwiwo.ch/wohnen-recht-ferien/'s own live architecture. The
 * component FILES remain (other routes still use several of them) — only
 * their usage on THIS route was removed.
 *
 * MODULE CLASSIFICATION (full record in
 * docs/finwiwo-architecture/deep-wohnen-eigentum.md):
 * - Hero → BUILD (reuse `ServiceHeroFullbleed`, same fullbleed/bottom-90px-
 *   radius/parallax architecture already verified on Krankenkasse).
 * - Rhetorical problem-statement row → OMITTED. No clean client-content
 *   role distinct from the Hero's own intro (Section 18's own "do not
 *   duplicate the intro unnecessarily" instruction applies directly).
 * - Hausrat → BUILD (`WohnenEditorialRow`, image-left, matching FINWIWO).
 * - Privathaftpflicht → BUILD (`WohnenEditorialRow`, image-right, matching
 *   FINWIWO's own reversed orientation for this row).
 * - Rechtsschutz → its CONTENT is intentionally excluded entirely (not a
 *   client-required topic on this page); its live ARCHITECTURE/geometry is
 *   reused for the client-required Gebäudeversicherung block instead
 *   (`WohnenEditorialRow`, image-left, continuing the same alternating
 *   rhythm Rechtsschutz itself held in that position).
 * - Reiseversicherung → OMITTED entirely (not a client-required topic).
 * - "So einfach funktioniert's" (generic 4-step process) → OMITTED — same
 *   classification and reasoning already established on Krankenkasse: a
 *   generic brokerage journey that conflicts with the project's canonical
 *   global 5-step advisory process (Analyse → Auswertung → Lösungsvorschlag
 *   → Umsetzung → Begleitung).
 * - "Das Versicherungsmandat" → OMITTED — no distinct client-supplied
 *   content role exists for a mandate/power-of-attorney module on this
 *   specific page (not a fake-claims problem — the module itself is
 *   genuinely truthful — simply no client-guide role for it here).
 * - FAQ ("Häufig gestellte Fragen") → OPTIONAL FAQ OMITTED — NO CLIENT-
 *   SUPPLIED FAQ CONTENT. `wohnenEigentumDeep.faq` is pre-existing
 *   guide-silent NEOSURA copy from Phase 7M.1, not client-guide-supplied
 *   content for this specific brief — not reused, per this phase's own
 *   explicit "do not invent generic FAQs" instruction.
 * - Empty 0-height row (same `nectar-overflow-hidden` pattern already
 *   found on Krankenkasse) → OMITTED — ZERO RENDERED CONTENT ROLE.
 * - Underinsurance → BUILD (`WohnenUnterversicherung`) — no matching
 *   FINWIWO card exists anywhere on this page (confirmed via selector
 *   sweep); reuses this project's own established white-card language.
 * - Newsletter → BUILD (reuse `CategoryNewsletter` as-is, same family
 *   independently reconfirmed here, same exact client copy already used
 *   on `/unternehmen` and Krankenkasse).
 * - Rotating brand sign-off → EXISTING FOOTER TAGLINE REUSED, no duplicate
 *   strip built (same reasoning as `/unternehmen` and Krankenkasse).
 * - Standard Analysis CTA → BUILD (reuse `CategoryTopicCta` as-is, same
 *   exact client §7 copy, same restrained bear icon already verified
 *   elsewhere — satisfies this page's own bear requirement). */
export default function WohnenEigentumPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 7G — Hero, live-remeasured against
          https://finwiwo.ch/wohnen-recht-ferien/. Same fullbleed/bottom-
          only-90px-radius/white-overlay/H1-intro-3-item-checklist-CTA
          architecture as Krankenkasse's own Hero, confirmed independently
          (not assumed): same bottom-only 90px radius, same measured
          background parallax mechanism (this page's own live parallax
          measured at ~0.2× scroll offset — within the same "small capped
          parallax" family `ServiceHeroFullbleed` already implements at
          0.15×, not a materially different effect). FINWIWO's own H1
          ("Wohnen, Recht & Ferien") and intro are not reused — the
          client guide's own exact H1/intro are used instead. FINWIWO's
          own 3 hero value-prop items ("Prämien optimieren" / "Beste
          Leistungen" / "All-Inclusive Service") are not reused either —
          remapped to the three client-required topics (Hausrat/
          Privathaftpflicht/Gebäudeversicherung), each with a short label/
          body DERIVED FROM CLIENT COPY (see `wohnenEigentumDeep.heroItems`
          for the sourcing note). FINWIWO's own embedded 21-field "360 Grad
          Check" lead form is NOT reproduced — NEOSURA has no matching
          premium-comparison backend (the same technical-truth decision
          already made for Krankenkasse's own Hero form) — the Hero's CTA
          instead goes straight to the canonical /analyse route. */}
      {/* Phase 7SYS.C — `overlayGradient` added: fresh live re-audit of
          `/wohnen-recht-ferien/`'s own real overlay found a 4-stop
          gradient starting notably lower (58%/64%/72%/94% at
          10/43/68/91%) than the flat 72% previously approximated — the
          top of that hero (where the H1 and subject's faces sit) is
          genuinely more photo-forward on the live reference. Reproduced
          exactly. Screenshot-confirmed: text (dark ink) remains fully
          readable against the now-more-visible photo. */}
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
          objectPosition: "center 35%",
        }}
      />

      {/* Phase 7G — Hausrat, live-remeasured. Image-left on desktop
          (matching FINWIWO's own measured orientation for this exact
          row), image-first on mobile. Paragraph is the client guide's
          exact §4.4 sentence, verbatim. Checklist is the four named
          perils from that same sentence (Feuer/Wasser/Diebstahl/
          Glasbruch) — matching FINWIWO's own 4-item slot count naturally,
          not FINWIWO's own wording. CTA maps to /analyse, not FINWIWO's
          own #formular. See `WohnenEditorialRow`'s own docstring for the
          full measurement record. */}
      <WohnenEditorialRow
        inset
        tightBottom
        id="hausrat"
        heading="Hausrat"
        paragraph={deep.hausrat.paragraphs[0]}
        checklist={deep.hausrat.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/private-home-editorial.webp",
          alt: "Familie sitzt zwischen Umzugskartons im neuen Zuhause",
          objectPosition: "center 40%",
        }}
      />

      {/* Phase 7G — Privathaftpflicht, live-remeasured independently (not
          assumed to be a simple reversed Hausrat row — confirmed via
          direct x-position comparison that FINWIWO's own Privathaftpflicht
          row genuinely is image-right, reversed from Hausrat). Paragraph
          is the client guide's exact §4.4 sentence, verbatim. Checklist:
          three phrases derived directly from that sentence's own clauses
          (UI LABEL DERIVED FROM CLIENT COPY) — not FINWIWO's own
          "Personen-/Sach-/Vermögensschäden" categorization, which the
          client paragraph does not itself state. CTA maps to /analyse. */}
      <WohnenEditorialRow
        inset
        id="privathaftpflicht"
        heading="Privathaftpflicht"
        paragraph={deep.haftung.paragraphs[0]}
        checklist={deep.haftung.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        reverse
        photo={{
          photo: "/images/services/private-cyber.webp",
          alt: "Person entspannt zuhause im Wohnzimmer",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7G — Gebäudeversicherung. ARCHITECTURE REUSED FROM LIVE
          FINWIWO RECHTSSCHUTZVERSICHERUNG (image-left, matching that row's
          own measured position in the alternating rhythm — Hausrat left /
          Privathaftpflicht right / this row left). CONTENT ROLE REPLACED
          BY CLIENT-REQUIRED GEBÄUDEVERSICHERUNG — none of Rechtsschutz's
          own copy is reused; the client guide has no Rechtsschutz
          requirement on this page at all. Paragraph is the client guide's
          exact §4.4 Gebäude sentence, verbatim (previously missing from
          this file — added in Phase 7G). Checklist: the three coverage
          concepts named in that sentence, as short phrases (UI LABEL
          DERIVED FROM CLIENT COPY). New anchor id ("gebaeudeversicherung")
          rather than inheriting Rechtsschutz's own id, since the content
          role is genuinely different. */}
      <WohnenEditorialRow
        inset
        id="gebaeudeversicherung"
        heading="Gebäudeversicherung"
        paragraph={deep.gebaeude.paragraphs[0]}
        checklist={deep.gebaeude.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/private-home.webp",
          alt: "Modernes Einfamilienhaus in der Schweiz",
          objectPosition: "center 55%",
        }}
      />

      {/* Phase 7G — underinsurance info box. No matching FINWIWO card
          architecture exists on this page (confirmed via selector sweep).
          Body is the guide's own exact underinsurance sentence, taken
          verbatim from the Hausrat paragraph — no separate legal essay,
          no invented numeric example. See `WohnenUnterversicherung`'s own
          docstring. */}
      <WohnenUnterversicherung callout heading={deep.underinsurance.heading} body={deep.underinsurance.body} />

      {/* Phase 7G — Newsletter, independently re-measured for this exact
          Wohnen instance (same live family already confirmed on
          Krankenkasse and /unternehmen: transparent background, 15px
          radius, no scale, no swash). Exact client copy
          (`clientGuideHome.newsletter`), no real backend (LAUNCH BLOCKER
          unchanged), no fake subscription success, no avatar/subscriber
          proof. */}
      <CategoryNewsletter
        title={clientGuideHome.newsletter.title}
        body={clientGuideHome.newsletter.body}
        ctaLabel="Jetzt abonnieren"
      />

      {/* Phase 7G — client-required standard "Bereit für den Überblick?"
          analysis CTA (guide §7), reusing the exact same `CategoryTopicCta`
          component already approved and locked on /unternehmen and
          Krankenkasse. FINWIWO has no dedicated closing-CTA card on this
          page either. Already carries the restrained `bear-trust.webp`
          decorative icon in its existing 64-72px slot — satisfying this
          page's own bear requirement by reusing the same, already-
          verified slot. FINWIWO's own rotating-word brand sign-off is not
          rebuilt — EXISTING FOOTER TAGLINE REUSED (the locked global
          Footer already renders "Persönlich. Unabhängig. Klar." on every
          page). */}
      <CategoryTopicCta
        title={clientGuideTopicCta.title}
        body={clientGuideTopicCta.body}
        buttonLabel={clientGuideTopicCta.button}
        buttonHref="/analyse"
      />
    </main>
  );
}
