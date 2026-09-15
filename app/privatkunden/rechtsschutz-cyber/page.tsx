import type { Metadata } from "next";
import { privateServices } from "@/content/de/private";
import { siteMeta } from "@/content/de/site";
import { pageMetadata } from "@/lib/seo";
import { rechtCyberDeep as deep } from "@/content/de/deep/recht-cyber";
import { clientGuideTopicCta } from "@/content/de/clientGuide";
import { ServiceHeroFullbleed } from "@/components/service-deep/ServiceHeroFullbleed";
import { WohnenEditorialRow } from "@/components/service-deep/WohnenEditorialRow";
import { CategoryFaq } from "@/components/category/CategoryFaq";
import { CategoryTopicCta } from "@/components/category/CategoryTopicCta";

const service = privateServices[4];

export const metadata: Metadata = pageMetadata({
  path: "/privatkunden/rechtsschutz-cyber",
  title: `${service.title} | ${siteMeta.name}`,
  description: service.body,
});

/** Phase 7J — HARD RULE: no old Phase-6 deep-page sections remain on this
 * route. Everything previously rendered here (`ServiceLocalNav`,
 * `ServiceInquiry`, `CategoryProblemStatement`, `ServiceContentChapter` ×2,
 * `ServicePhotoChapter`, `ServiceComparison`, `ServiceAnalysis`,
 * `ServiceProcess`, `ServiceFaq`, `CategoryClosing`) was removed. Component
 * FILES remain (other routes still use several of them) — only their
 * usage on THIS route was removed.
 *
 * REFERENCE — IMPORTANT FINDING: unlike every other private-customer
 * topic, FINWIWO has **no dedicated private Rechtsschutz or Cyber page at
 * all** — confirmed via direct URL probing (`/rechtsschutz/`,
 * `/privatrechtsschutz/`, `/cyber/`, `/cyberversicherung/`,
 * `/recht-cyber/` all 404) and via the live mega menu (the "Rechtsschutz"
 * nav item itself resolves to `href="#"`, no destination; the only live
 * Cyber content anywhere on the site is the BUSINESS Cyber-Risk module at
 * `/versicherungen/unternehmen#cyber`). The closest genuine architectural
 * reference is therefore the "Rechtsschutzversicherung" row already
 * measured on `https://finwiwo.ch/wohnen-recht-ferien/` (re-confirmed
 * fresh this phase, not assumed from Phase 7G's own notes: image-left,
 * 544.9×363.3px image, 20px radius, full-heading swash, 4-item
 * checklist, CTA → dead `#formular`) — the same shared editorial-row
 * template already confirmed identical across every prior page in this
 * project (Krankenkasse, Wohnen & Eigentum, Fahrzeug & Reisen, Vorsorge).
 * Since this genuinely is the closest available reference architecture
 * (not a lazy default — there is no other, more specific FINWIWO page to
 * measure), `WohnenEditorialRow` is reused directly. The Hero likewise
 * reuses `ServiceHeroFullbleed`: `/wohnen-recht-ferien/`'s own Hero
 * (the closest relevant reference, since no dedicated page exists) is
 * genuinely fullbleed with a ~90px bottom radius and measured parallax —
 * unlike Vorsorge's own page-specific inset-card Hero, there is no
 * evidence here that a different Hero architecture would be more
 * faithful; continuing the fullbleed family is a genuine architecture
 * match, not an assumption.
 *
 * MODULE CLASSIFICATION (full record in
 * docs/finwiwo-architecture/deep-rechtsschutz-cyber.md):
 * - Hero → BUILD (`ServiceHeroFullbleed`).
 * - Rechtsschutz → BUILD (`WohnenEditorialRow`, image-left, matching the
 *   measured Rechtsschutzversicherung row's own orientation). FINWIWO's
 *   own "24-Stunden-Rechtsberatung am Telefon" checklist item is a
 *   service-hotline guarantee NOT reproduced (not in approved content).
 * - Digitale Risiken (Cyber) → BUILD (`WohnenEditorialRow`, image-right,
 *   matching the BUSINESS Cyber module's own measured orientation on
 *   `/versicherungen/unternehmen` — the same shared row family again;
 *   its business-specific content — Betriebsunterbrechung,
 *   Erpressungszahlungen, 24/7-Hotline, forensische Analyse — is NOT
 *   reproduced, since none of it is private-customer-approved content).
 * - "Professionelle Begleitung im Ernstfall" → OMITTED — no distinct
 *   FINWIWO architecture maps to this generic support-message block, and
 *   the client-required standard CTA at the end already serves the
 *   "what happens next" role truthfully.
 * - FAQ ("Häufig gestellte Fragen") → BUILD. `rechtCyberDeep.faq` (5
 *   items, Phase 7M.1) is legitimate pre-existing client-source content,
 *   reused via `CategoryFaq` per the same standard already established
 *   on Vorsorge.
 * - Process (canonical 5-step) → OMITTED — no genuine role beyond what
 *   the standard CTA already offers; not duplicating a second process
 *   model, same reconciliation precedent as every prior page.
 * - Newsletter → OMITTED on this specific page — same density decision
 *   already made on Vorsorge (the newsletter requirement is already
 *   satisfied project-wide on Krankenkasse/Wohnen/Fahrzeug), keeping
 *   this page's own FAQ → Standard CTA ending compact.
 * - Rotating brand sign-off → EXISTING FOOTER TAGLINE REUSED. */
export default function RechtsschutzCyberPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 7J — Hero. No dedicated FINWIWO private Rechtsschutz/Cyber
          page exists (confirmed via direct URL probing and mega-menu
          inspection) — the closest relevant reference,
          `/wohnen-recht-ferien/`'s own Hero, is genuinely fullbleed with
          the same bottom-only-90px-radius/~0.2×-parallax architecture
          already reused on every other private-customer page, so
          `ServiceHeroFullbleed` is reused here as a genuine architecture
          match, not a default. No fresh verbatim client-guide H1/intro
          was supplied for this phase — `h1`/`intro` reuse the
          already-approved `privateServices[4]` tile title/body verbatim.
          No fake legal-hotline or cyber-incident-response claim is
          made anywhere. CTA → /analyse. */}
      <ServiceHeroFullbleed
        h1={deep.h1}
        intro={deep.intro}
        items={deep.heroItems}
        ctaLabel="Kostenlose Analyse starten"
        ctaHref="/analyse"
        overlay="light"
        photo={{
          photo: "/images/services/manifesto-advisor.webp",
          alt: "Beratungsgespräch mit Unterlagen am Tisch",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7J — Rechtsschutz, architecture from FINWIWO's own
          "Rechtsschutzversicherung" row on /wohnen-recht-ferien/
          (image-left, re-confirmed fresh this phase). Paragraph and
          checklist are the existing approved copy (client guide §4.7,
          wired in Phase 7M.1), verbatim — FINWIWO's own "24-Stunden-
          Rechtsberatung am Telefon" hotline claim is not reproduced. CTA
          maps to /analyse, not FINWIWO's own #formular. */}
      <WohnenEditorialRow
        inset
        tightBottom
        id="rechtsschutz"
        heading="Rechtsschutz"
        paragraph={deep.rechtsschutz.paragraphs[0]}
        checklist={deep.rechtsschutz.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/private-cyber-editorial.webp",
          alt: "Beratungsgespräch mit Vertragsunterzeichnung",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7J — Digitale Risiken (Cyber), image-right — matching the
          same shared row family's orientation on the BUSINESS Cyber
          module (`/versicherungen/unternehmen#cyber`, the only live
          Cyber content anywhere on FINWIWO's site). None of that
          module's own business-specific claims (Betriebsunterbrechung,
          Erpressungszahlungen, 24/7-Hotline, forensische Analyse) are
          reproduced — this row uses only the existing approved private-
          customer copy (client guide §4.7), verbatim. CTA maps to
          /analyse. */}
      <WohnenEditorialRow
        inset
        id="digitale-risiken"
        heading="Digitale Risiken"
        paragraph={deep.digitaleRisiken.paragraphs[0]}
        checklist={deep.digitaleRisiken.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        reverse
        photo={{
          photo: "/images/services/private-cyber.webp",
          alt: "Person arbeitet zuhause am Laptop",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7J — FAQ. `rechtCyberDeep.faq` (5 items) is legitimate
          pre-existing client-source content (Phase 7M.1) — reused via
          `CategoryFaq`, same configuration already established on
          Krankenkasse/Vorsorge (`openItemStyle="plain"`,
          `maxWidth="1080px"`). No dedicated live FINWIWO FAQ exists for
          this topic to independently re-measure against (no dedicated
          page exists), so the already-proven Krankenkasse/Vorsorge
          geometry is reused as the closest verified match. */}
      <CategoryFaq
        headingRest="Häufig gestellte"
        headingAccent="Fragen"
        subheading="Antworten auf die wichtigsten Fragen zu Rechtsschutz und Cyber."
        accent="teal"
        maxWidth="1083px"
        openItemStyle="plain"
        largeSubheading
        items={deep.faq}
      />

      {/* Phase 7J — client-required standard "Bereit für den Überblick?"
          analysis CTA (guide §7), reusing `CategoryTopicCta` as-is —
          already approved and locked on /unternehmen, Krankenkasse,
          Wohnen & Eigentum, Fahrzeug & Reisen, and Vorsorge. Already
          carries the restrained `bear-trust.webp` decorative icon.
          FINWIWO's own rotating-word brand sign-off is not rebuilt —
          EXISTING FOOTER TAGLINE REUSED. */}
      <CategoryTopicCta
        title={clientGuideTopicCta.title}
        body={clientGuideTopicCta.body}
        buttonLabel={clientGuideTopicCta.button}
        buttonHref="/analyse"
      />
    </main>
  );
}
