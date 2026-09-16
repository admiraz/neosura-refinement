import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { gesundheitDeep as deep } from "@/content/de/deep/gesundheit";
import { clientGuideHome, clientGuideTopicCta } from "@/content/de/clientGuide";
import { ServiceHeroFullbleed } from "@/components/service-deep/ServiceHeroFullbleed";
import { KrankenkasseStatement } from "@/components/service-deep/KrankenkasseStatement";
import { KrankenkasseExplainer } from "@/components/service-deep/KrankenkasseExplainer";
import { KrankenkasseDeadlines } from "@/components/service-deep/KrankenkasseDeadlines";
import { KrankenkasseGrundversicherung } from "@/components/service-deep/KrankenkasseGrundversicherung";
import { KrankenkasseFranchise } from "@/components/service-deep/KrankenkasseFranchise";
import { KrankenkasseZusatzversicherung } from "@/components/service-deep/KrankenkasseZusatzversicherung";
import { KrankenkasseWechselservice } from "@/components/service-deep/KrankenkasseWechselservice";
import { CategoryFaq } from "@/components/category/CategoryFaq";
import { CategoryNewsletter } from "@/components/category/CategoryNewsletter";
import { CategoryTopicCta } from "@/components/category/CategoryTopicCta";


export const metadata: Metadata = pageMetadata({
  path: "/privatkunden/krankenkasse",
  title: "Krankenkasse vergleichen & wechseln | neosura",
  description: "Grund- und Zusatzversicherung unabhängig vergleichen. Wir übernehmen Kündigung und Wechsel, kostenlos und fristgerecht.",
});

/** Phase 7F.2 — HARD RULE: no old NEOSURA deep-page sections remain on
 * this route. Everything below the locked Phase 7F.1 Hero was removed
 * (`ServiceLocalNav`, `ServiceInquiry`, `CategoryProblemStatement`,
 * `ServiceContentChapter` ×2, `ServicePhotoChapter`, `ServiceComparison`,
 * `ServiceAnalysis`, `ServiceProcess`, `ServiceFaq`, `CategoryClosing`)
 * because none of them was independently confirmed to match the current
 * live https://finwiwo.ch/krankenkasse/ page's own pre-Grundversicherung
 * architecture. All of those component FILES remain — several are still
 * used by other, not-yet-rebuilt deep pages — only their usage on THIS
 * route was removed. The page is temporarily incomplete (Hero →
 * Statement → Explainer → Deadlines → Footer) while the remaining
 * chapters (Grundversicherung, Zusatzversicherung, Wechselservice, FAQ,
 * closing CTA) are rebuilt in later phases against the same live
 * reference — a clean partial rebuild, not a mix of new and old
 * architecture. See docs/finwiwo-architecture/deep-krankenkasse.md. */
export default function KrankenkassePage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 7F.1 — locked, unchanged except the CTA target: the old
          "#beratung" anchor pointed at the now-removed `ServiceInquiry`
          module. No FINWIWO-derived local form exists yet on this page,
          so per this phase's own CTA-correction rule (no stale/dead
          anchors), the Hero CTA now goes to /analyse — the canonical
          advisory destination — until a real FINWIWO-derived lead
          module is rebuilt at this location in a later phase. */}
      {/* Phase 7SYS.C — `overlayGradient` added: fresh live re-audit of
          `/krankenkasse/`'s own real overlay found a 4-stop vertical
          gradient (72%/73%/72%/94% at 10/43/68/91%), not the flat 72%
          previously approximated. Reproduced exactly; text contrast
          re-verified via screenshot, unaffected since the gradient's
          values sit within ±1% of the prior flat 72% for the entire
          upper 2/3 of the hero where the text column sits. */}
      <ServiceHeroFullbleed
        badge="Jährliche Prämienprüfung"
        overlayGradient="linear-gradient(180deg, rgba(255,255,255,.72) 10%, rgba(255,255,255,.73) 43%, rgba(255,255,255,.72) 68%, rgba(255,255,255,.94) 91%)"
        h1="Krankenkasse: gleiche Leistung, tiefere Prämie."
        intro="In der Grundversicherung sind die Leistungen gesetzlich identisch. Der Unterschied liegt allein in der Prämie, dem Modell und der Franchise. Bei den Zusatzversicherungen dagegen unterscheiden sich die Anbieter stark. Genau dort setzen wir an."
        items={[
          {
            title: "Prämien optimieren",
            body: "Wir prüfen jährlich, ob Kasse, Modell und Franchise noch zu Ihrer Situation passen.",
          },
          {
            title: "Passende Zusatzversicherung",
            body: "Wir vergleichen die Anbieter und stellen ein Paket zusammen, das zu Ihren Bedürfnissen passt.",
          },
          {
            title: "Wechsel ohne Aufwand",
            body: "Kündigung, Anmeldung und Fristen übernehmen wir für Sie.",
          },
        ]}
        ctaLabel="Kostenlose Analyse starten"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/private-health-editorial.webp",
          alt: "Familie beim Wandern in den Schweizer Bergen",
          objectPosition: "center 35%",
        }}
      />

      {/* Phase 7F.2 — statement module, live-remeasured. See
          `KrankenkasseStatement`'s own docstring for the full sourcing
          rationale (UI STATEMENT DERIVED FROM CLIENT COPY, reusing
          already-approved `gesundheitDeep.problem`, not FINWIWO's own
          "Sie zahlen zu viel" framing or its "UNSERE KLIENTEN NÄMLICH
          NICHT" response line). */}
      <KrankenkasseStatement statement={deep.problem.statement} response={deep.problem.response} />

      {/* Phase 7F.2 — explainer module, live-remeasured (swash confirmed
          on the live H2, reused verbatim mechanic). Guide is silent for
          this exact "how we help" role, so this reuses the already-
          approved `gesundheitDeep.koordination` copy rather than
          duplicating the Hero's own §4.3 intro or inventing new text —
          see `KrankenkasseExplainer`'s own docstring. */}
      <KrankenkasseExplainer
        headingRest="Versorgung sinnvoll"
        headingAccent="koordinieren"
        paragraphs={deep.koordination.paragraphs}
      />

      {/* Phase 7F.2 — deadlines module, live-remeasured (bordered list
          card architecture, white 50px-radius outer card). All four
          dates are evergreen (month+day only, no year). Card bodies
          reworded, not verbatim FINWIWO copy; the 31. März condition
          uses the client guide's own "Standardmodell mit tiefster
          Franchise" rule rather than FINWIWO's differing "bei
          Prämienerhöhung" claim — see `KrankenkasseDeadlines`'s own
          docstring for the full sourcing/correction rationale. */}
      <KrankenkasseDeadlines
        heading="Wichtige Termine für den Krankenkassenwechsel"
        subheading="Diese Fristen gelten für den Wechsel der Grundversicherung."
        items={[
          { date: "30. September", body: "Die neuen Prämien für das Folgejahr werden bekannt gegeben." },
          { date: "30. November", body: "Frist für die ordentliche Kündigung auf Ende Jahr." },
          { date: "31. Dezember", body: "Der Wechsel per 1. Januar tritt in Kraft." },
          { date: "31. März", body: "Beim Standardmodell mit tiefster Franchise ist zusätzlich ein Wechsel per 1. Juli möglich." },
        ]}
      />

      {/* Phase 7F.3 — Grundversicherung module, live-remeasured against
          FINWIWO's own module at this exact position (image-left/text-
          right, no parallax, no CTA hover — all independently verified,
          not assumed from the Hero). Paragraph is the client guide's
          exact §4.3 Grundversicherung sentence, verbatim
          (`gesundheitDeep.grundversicherung.paragraphs[0]`, already
          wired in Phase 7M.1). Checklist reuses the same file's
          already-approved 3-item list — FINWIWO's own checklist
          included an unverified "Prämienunterschiede bis zu 50%"
          claim, not reproduced. CTA maps to /analyse (advisory), not
          FINWIWO's own #formular. See `KrankenkasseGrundversicherung`'s
          own docstring for the full measurement/sourcing record. */}
      <KrankenkasseGrundversicherung
        heading="Grundversicherung"
        paragraph={deep.grundversicherung.paragraphs[0]}
        checklist={deep.grundversicherung.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/private-health.webp",
          alt: "Familie am Küchentisch im Sonnenlicht",
          objectPosition: "center 35%",
        }}
      />

      {/* Phase 7F.4 — Franchise reference module, live-remeasured. No
          calculator exists here or anywhere else on this route (zero
          input/select/slider elements, independently reconfirmed this
          phase). FINWIWO's own 3-column table (Franchise / Prämieneffekt
          / Ideal für) is reduced to 2 columns — see
          `KrankenkasseFranchise`'s own docstring for the full "TRUTHFUL
          CONTENT REDUCTION FROM 3 → 2 COLUMNS" rationale, the official
          priminfo.admin.ch source verification, and why FINWIWO's own
          badges/"Faustregel" tip box are not reproduced. CTA reworded
          ("Beratung anfragen") and mapped to /analyse — not FINWIWO's
          own "Berechnung anfordern" → #formular. */}
      <KrankenkasseFranchise
        headingRest={deep.franchise.headingRest}
        headingAccent={deep.franchise.headingAccent}
        intro={deep.franchise.intro}
        caption={deep.franchise.caption}
        sourceNote={deep.franchise.sourceNote}
        rows={deep.franchise.rows}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
      />

      {/* Phase 7F.5 — Zusatzversicherung module, live-remeasured
          independently of Grundversicherung's own geometry. Confirmed
          FINWIWO deliberately mirrors Grundversicherung on desktop
          (text left / image right here, vs. image left / text right for
          Grundversicherung) while both converge to image-first on
          mobile. Heading is the bare client-safe noun "Zusatzversicherung"
          (not FINWIWO's "für mehr Komfort" framing). Paragraph is the
          client guide's exact §4.3 sentence, verbatim. Checklist reuses
          the already-approved `gesundheitDeep.zusatzversicherung.checklist`
          (3 items, matching FINWIWO's own 3-slot structure) rather than
          force-fitting all six client-supported concepts, which remain
          visible in the verbatim paragraph regardless. CTA maps to
          /analyse (advisory), not FINWIWO's own #formular. See
          `KrankenkasseZusatzversicherung`'s own docstring for the full
          measurement/sourcing record, including the genuine (measured,
          not assumed) image fade-in reveal that Grundversicherung's own
          image does not have. */}
      <KrankenkasseZusatzversicherung
        heading="Zusatzversicherung"
        paragraph={deep.zusatzversicherung.paragraphs[0]}
        checklist={deep.zusatzversicherung.checklist}
        ctaLabel="Beratung anfragen"
        ctaHref="/analyse"
        photo={{
          photo: "/images/services/private-pension.webp",
          alt: "Paar entspannt zuhause bei Kaffee und frischem Obst",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7F.6 — Wechselservice module. FINWIWO's own generic
          4-step "So einfach funktioniert's" process was independently
          re-audited and INTENTIONALLY OMITTED (not rebuilt): it fails
          the required semantic-conflict test against the project's
          existing global 5-step advisory process (Analyse → Auswertung
          → Lösungsvorschlag → Umsetzung → Begleitung) — 3 of its 4 steps
          are either generic broker-advisory framing (duplicating that
          5-step process) or describe FINWIWO's own lead-form, which
          NEOSURA does not have. See `KrankenkasseWechselservice`'s own
          docstring for the full classification/reasoning. This module
          instead reproduces FINWIWO's own separate, dedicated
          Wechselservice block — heading kept to the bare client-safe
          noun, intro is the client guide's exact verbatim sentence
          (already used once, mid-paragraph, in Grundversicherung above;
          repeated here deliberately per this phase's own instruction,
          not a duplication bug), checklist derived directly from that
          sentence's three clauses. FINWIWO's own 2-column 4-pain-point/
          4-solution comparison and its unverified "Transparent...sparen"
          savings claim are not reproduced — see the component's
          docstring for the full "TRUTHFUL CONTENT REDUCTION" rationale.
          No anchor (FINWIWO's own row id is auto-generated, not a real
          content anchor). No bear (no natural slot — confirmed via full
          HTML inspection, not just missing `<img>` tags).

          Phase 7F.6A correction: the "Beratung anfragen" → /analyse CTA
          originally added here was removed. FINWIWO's own module has
          zero <a>/button/interactive elements, and the client guide
          places the standard CTA after the FAQ, not inside this
          module — this module now renders zero interactive elements,
          matching the live reference exactly. */}
      <KrankenkasseWechselservice
        heading={deep.wechselservice.heading}
        intro={deep.wechselservice.intro}
        checklist={deep.wechselservice.checklist}
      />

      {/* Phase 7F.7 — FAQ module. Live FINWIWO has 8 items; the client
          guide explicitly requires exactly the 4 supplied Krankenkasse
          Q&As instead —
          CLIENT-SPECIFIED FAQ COUNT OVERRIDES REFERENCE CONTENT COUNT.
          Reuses the existing `CategoryFaq` component (already used by
          /privatkunden and /unternehmen) rather than reviving the old
          Phase-6 `ServiceFaq`: the mechanism (single-open accordion,
          real button/aria markup, swash heading, static
          scale(0.95)-as-box white card) genuinely matches this
          Krankenkasse instance, independently re-measured. Two safe,
          default-preserving opt-in props were added to `CategoryFaq`
          for the geometry that does differ here — `headingSuffix`
          ("zur Krankenkasse", since FINWIWO's own heading has trailing
          text after the swashed "Fragen" that neither existing usage
          needs) and `openItemStyle="plain"` (Krankenkasse's own open
          row has no rounded/border/shadow highlight, just a suppressed
          divider — confirmed live, not assumed identical to
          /privatkunden's or /unternehmen's own boxed treatment).
          `maxWidth="1080px"` matches the same real measured value
          already used by /unternehmen's own FAQ instance (~1083px).
          All four Q&As are the client guide's own exact text, verbatim,
          character-for-character — none of FINWIWO's own 8 questions
          (which include unverified savings claims like "mehrere hundert
          Franken", "über CHF 1'500 pro Jahr") are reused. FAQ #4's
          "Erstinformation" word is linked in place, without adding any
          extra CTA wording, to the existing canonical /erstinformation
          route. */}
      <CategoryFaq
        headingRest="Häufig gestellte"
        headingAccent="Fragen"
        headingSuffix="zur Krankenkasse"
        subheading="Antworten auf die wichtigsten Fragen zum Krankenkassenwechsel."
        accent="teal"
        maxWidth="1083px"
        openItemStyle="plain"
        largeSubheading
        items={[
          {
            question: deep.faq[0].question,
            answer: deep.faq[0].answer,
          },
          {
            question: deep.faq[1].question,
            answer: deep.faq[1].answer,
          },
          {
            question: deep.faq[2].question,
            answer: deep.faq[2].answer,
          },
          {
            question: deep.faq[3].question,
            answer: (
              <>
                Für Sie nichts. Wir werden von den Versicherungsgesellschaften mit einer marktüblichen
                Vermittlungsentschädigung vergütet. Details dazu stehen in unserer{" "}
                <Link href="/erstinformation" className="underline underline-offset-2 hover:text-ink">
                  Erstinformation
                </Link>
                .
              </>
            ),
          },
        ]}
      />

      {/* Phase 7F.8 — Newsletter module, independently re-measured for
          this exact Krankenkasse instance (not assumed identical to
          /unternehmen). Confirmed the same architecture: transparent
          background, 15px radius, no scale transform, no swash, the
          same Vorname/Nachname/E-Mail 3-field family, an avatar-cluster
          "+20k" social-proof line (not reproduced — no verified NEOSURA
          subscriber count), fully static motion. Genuinely the same
          component family as /unternehmen's own CategoryNewsletter, so
          reused directly with no new props. FINWIWO's own heading/body
          wording here ("Finanz-Updates, die sich auszahlen." / "Spartipps,
          Zinsradar & Vorsorge-Insights...") is NOT reused — the client
          guide's own exact newsletter title/body
          (`clientGuideHome.newsletter`) is used instead, verbatim, the
          same text already used on /unternehmen. No real subscription
          backend exists (no configured provider/double-opt-in
          integration) — this remains a documented LAUNCH BLOCKER, see
          docs/CLIENT_GUIDE_MERGE.md. The form never calls any endpoint,
          never stores an address, and never claims success — see
          `CategoryNewsletter`'s own docstring for the full truthful-
          behavior rationale. */}
      <CategoryNewsletter
        title={clientGuideHome.newsletter.title}
        body={clientGuideHome.newsletter.body}
        ctaLabel="Jetzt abonnieren"
      />

      {/* Phase 7F.8 — client-required standard "Bereit für den
          Überblick?" analysis CTA (guide §7), reusing the exact same
          `CategoryTopicCta` component already approved and locked on
          /unternehmen — FINWIWO has no dedicated closing-CTA card on
          this page either (confirmed across /unternehmen/, /versicherungen/,
          /hypothek/, and now this Krankenkasse instance: FAQ → Newsletter
          → rotating brand strip → Footer, no distinct CTA card anywhere).
          Copy is the client guide's exact §7 text, verbatim
          (`clientGuideTopicCta`) — the same text already used on
          /unternehmen, not reworded for this page. This component
          already carries the restrained `bear-trust.webp` decorative
          icon in its existing 64-72px circular slot — satisfying the
          Krankenkasse bear requirement by reusing the same, already-
          verified slot rather than inventing a new one: no new column,
          no extra height, no primary-photo replacement.

          FINWIWO's own rotating-word brand sign-off ("Der Co-Pilot/
          Gefährte/Coach/Sparring Partner für Ihre Finanzen - ein Leben
          lang", confirmed present on this Krankenkasse instance in
          Phase 7F.7's discovery pass) is not rebuilt — EXISTING FOOTER
          TAGLINE REUSED. The locked global Footer already renders
          "Persönlich. Unabhängig. Klar." on every page, satisfying the
          same brand-sign-off role FINWIWO's rotating strip plays,
          exactly as already established on /unternehmen. Rendering a
          second rotating/tagline element here would duplicate that
          single semantic role — not done. */}
      <CategoryTopicCta
        title={clientGuideTopicCta.title}
        body={clientGuideTopicCta.body}
        buttonLabel={clientGuideTopicCta.button}
        buttonHref="/analyse"
      />
    </main>
  );
}
