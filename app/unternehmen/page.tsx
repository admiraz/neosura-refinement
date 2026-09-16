import type { Metadata } from "next";
import { businessServiceExtras } from "@/content/de/serviceExtras";
import { businessServiceVisuals } from "@/content/de/serviceVisuals";
import { principles } from "@/content/de/principles";
import { clientGuideFleet, clientGuideCyber, clientGuideAblauf, clientGuideBusinessHub, clientGuideHome, clientGuideTopicCta } from "@/content/de/clientGuide";
import { betriebshaftpflichtDeep } from "@/content/de/deep/betriebshaftpflicht";
import { gesundheitUnfallDeep } from "@/content/de/deep/gesundheit-unfall";
import { pageMetadata } from "@/lib/seo";
import { CategoryHero } from "@/components/category/CategoryHero";
import { CategoryAdvantages } from "@/components/category/CategoryAdvantages";
import { CategoryCyberAdvantages } from "@/components/category/CategoryCyberAdvantages";
import { CategoryBusinessProcess } from "@/components/category/CategoryBusinessProcess";
import { CategoryBusinessPartner } from "@/components/category/CategoryBusinessPartner";
import { CategoryFaq } from "@/components/category/CategoryFaq";
import { CategoryNewsletter } from "@/components/category/CategoryNewsletter";
import { CategoryTopicCta } from "@/components/category/CategoryTopicCta";
import { CategoryServiceRow } from "@/components/category/CategoryServiceRow";
import { Reveal } from "@/components/ui/Reveal";
import { businessIntro, businessServices } from "@/content/de/business";

export const metadata: Metadata = pageMetadata({
  path: "/unternehmen",
  title: "Versicherungen für Unternehmen & KMU | neosura",
  description: "Betriebshaftpflicht, KTG/UVG, BVG, Flotten und Cyber: Ein Broker für alle Firmenpolicen. Unabhängig und persönlich.",
});

export default function UnternehmenPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 7M.1 — H1/lead are the client guide §4.8 /unternehmen hero
          copy verbatim, split across the fullbleed layout's h1Lead
          (normal)/h1Rest (accent) slots at the sentence's clause boundary
          — the guide's H1 is one sentence, not two, so this is the exact
          text broken for the existing two-tone treatment, not reworded.
          `supporting` and `checklist` have no guide-supplied hero-specific
          equivalents (CLIENT GUIDE SILENT) — existing approved copy
          retained per docs/CLIENT_GUIDE_MERGE.md. */}
      <CategoryHero
        layout="fullbleed"
        h1Lead="Ihr Betrieb hat Wichtigeres zu tun als"
        h1Rest="Versicherungen zu verwalten."
        lead={businessIntro.lead}
        supporting={businessIntro.body}
        valuePoints={[]}
        checklist={[principles[0], principles[1], principles[3]].map((p) => ({ title: p.title, body: p.body }))}
        ctaLabel="Lösungen entdecken"
        ctaHref="#services"
        photo={{
          photo: "/images/services/business-liability-editorial.webp",
          alt: "Team bespricht Berichte im modernen Büro",
          objectPosition: "center 30%",
        }}
        proofLabel="Unternehmen"
        proofValue="5 Versicherungsbereiche"
        accent="teal"
      />

      <CategoryAdvantages
        inset
        headingRest="Sicherheit für"
        headingAccent="Haftung und Sachwerte"
        paragraph="Ein einzelner Vorfall kann schnell zu erheblichen finanziellen Folgen führen. Wir strukturieren Haftpflicht- und Sachversicherungen so, dass Ihr Unternehmen strukturiert abgesichert ist."
        items={[
          { title: businessServices[0].title, body: businessServices[0].body },
          { title: businessServices[3].title, body: businessServices[3].body },
        ]}
        ctaLabel="Beratung anfragen"
        ctaHref="#beratung-unternehmen"
        photo={{
          photo: "/images/services/business-property-editorial.webp",
          alt: "Modernes Lagergebäude bei Abenddämmerung",
          objectPosition: "center 45%",
        }}
        accent="teal"
        ctaHoverLift
        reveal
      />

      <CategoryAdvantages
        inset
        headingRest="Vorsorge und Schutz für"
        headingAccent="Ihre Mitarbeitenden"
        paragraph="Unfallversicherung, Krankentaggeld und berufliche Vorsorge greifen an unterschiedlichen Punkten. Erst im Zusammenspiel entsteht eine strukturierte Absicherung Ihrer Mitarbeitenden."
        items={[
          {
            title: "Berufliche Vorsorge (BVG)",
            body: "Obligatorisch ab gesetzlich definiertem Mindesteinkommen, mit Gestaltungsspielraum über das gesetzliche Minimum hinaus.",
          },
          {
            title: "Unfallversicherung (UVG)",
            body: "Berufsunfälle und Berufskrankheiten sind obligatorisch versichert. Ab acht Wochenstunden zusätzlich auch Nichtberufsunfälle.",
          },
          {
            title: "Krankentaggeld",
            body: "Nicht generell gesetzlich vorgeschrieben, reduziert aber das Risiko der Lohnfortzahlungspflicht bei Krankheit.",
          },
        ]}
        ctaLabel="Beratung anfragen"
        ctaHref="#beratung-unternehmen"
        photo={{
          photo: "/images/services/business-health-editorial.webp",
          alt: "Berufstätige Person bei einer kurzen Pause im modernen Büro",
          objectPosition: "center 30%",
        }}
        accent="teal"
        imageSide="right"
        ctaHoverLift
        reveal
      />

      {/* Phase 7E.4 — third business editorial row, live-remeasured
          independently (not assumed from rows 1-2): FINWIWO's own
          "Flotten und Transporte rundum geschützt" module, same 0px-gap
          full-width row family, image-left/text-right (mirrors row 1,
          confirmed via H2 x-position matching row 1's, not row 2's).
          Headline/intro/checklist copy is the client guide's exact §4.13
          Flotten content (clientGuideFleet, added in 7M.1) — NOT
          FINWIWO's own "Motorfahrzeugflotten/Transport" wording, and no
          "Transport" line item invented as a separate NEOSURA offering.
          `ctaHoverLift` is deliberately OMITTED here: live-remeasuring
          this specific row's CTA (not assuming rows 1-2's behavior) found
          `transform: none` before and after hover — only a color
          transition, unlike rows 1-2. Replaces the old Phase-6
          `CategoryManifesto` module, which occupied this position but
          matched no live FINWIWO module here (confirmed: the actual next
          FINWIWO section after row 2 is this Flotten row, not a
          photo-statement block) — see docs/finwiwo-architecture for the
          full measurement record. */}
      <CategoryAdvantages
        inset
        headingRest="Viele Fahrzeuge. Eine Police."
        headingAccent="Weniger Aufwand."
        paragraph={clientGuideFleet.intro}
        items={[
          { title: "Vorteile", body: clientGuideFleet.vorteile },
          { title: "Schadenmanagement", body: clientGuideFleet.schadenmanagement },
        ]}
        ctaLabel="Beratung anfragen"
        ctaHref="#beratung-unternehmen"
        photo={{
          photo: "/images/services/business-fleet-editorial.webp",
          alt: "Firmenfahrzeuge auf einem Betriebshof",
          objectPosition: "center 40%",
        }}
        accent="teal"
        reveal
      />

      {/* Phase 7E.5 — fourth business editorial row, live-remeasured
          independently: FINWIWO's "Cyber-Risk – Schutz vor digitalen
          Bedrohungen" module. Confirmed materially different from rows
          1-3 (title-only 2-column checkmark list instead of title+body
          checklist, image-right/text-left, no CTA hover) — built with a
          dedicated `CategoryCyberAdvantages` component rather than
          forced through the locked `CategoryAdvantages` `items` prop.
          Headline/intro are the client guide's exact §4.14 copy
          (`clientGuideCyber`), NOT FINWIWO's own "Cyber-Risk" wording.
          FINWIWO's own row has a second supporting paragraph; that role
          is covered here instead by the 6 title-only items below,
          deliberately split 3 Cyber-derived / 3 Betriebsrechtsschutz-
          derived so both halves of NEOSURA's sixth service stay visible
          (not a Cyber-only row) — see docs/finwiwo-architecture for the
          full mapping/sourcing note. Four "Ertragsausfall" /
          "Wiederherstellungskosten" / "IT-Forensik" / "Anwalts- und
          Verfahrenskosten" / "Juristische Beratung" are exact §4.14
          phrases; "Rechtsstreitigkeiten" is a UI LABEL DERIVED FROM
          CLIENT COPY (condensing "Streitigkeiten mit Mitarbeitenden,
          Kunden, Lieferanten oder Behörden"), not invented. */}
      {/* Phase 9C — the reference fades its business editorial rows in
          (opacity only); this row enters as one group like the others. */}
      <Reveal>
        <CategoryCyberAdvantages
          headingRest="Die neuen Betriebsrisiken sind"
          headingAccent="digital und juristisch."
          paragraph={clientGuideCyber.intro}
          chips={[
            "Ertragsausfall",
            "Wiederherstellungskosten",
            "IT-Forensik",
            "Rechtsstreitigkeiten",
            "Anwalts- und Verfahrenskosten",
            "Juristische Beratung",
          ]}
          ctaLabel="Beratung anfragen"
          ctaHref="#beratung-unternehmen"
          photo={{
            photo: "/images/services/private-cyber-editorial.webp",
            alt: "Vertragsunterzeichnung im Besprechungsraum, Tablet auf dem Tisch",
            objectPosition: "center 35%",
          }}
        />
      </Reveal>

      {/* Phase 7E.6 — five-step advisory process, live-remeasured
          independently from `/unternehmen`'s own process module (a
          genuinely different architecture from `CategoryProcess`, built
          in 7D.6 from the separate `/versicherungen` page — no icon
          badge, no card border, top-corners-only image radius; see
          `CategoryBusinessProcess`'s own docstring for the full
          measurement record). Step titles/bodies are the client guide's
          exact §4.16 copy verbatim (`clientGuideAblauf.steps`) — FINWIWO's
          own live reference here is only 4 steps ("Formular ausfüllen" →
          "Persönliche Beratung" → "Angebote vergleichen" → "Policen
          abschliessen"); the client's canonical journey is 5, so the
          4-step count is NOT reproduced, only the card architecture is.
          Heading "So funktioniert's" matches the label already
          established sitewide (nav item, `/ablauf` page) rather than
          FINWIWO's own "So einfach funktioniert's" phrasing (not
          client-guide-supplied, so not treated as authoritative).
          Subheading reuses the exact line already written for `/ablauf`
          in Phase 7M.1. Images are generic advisory-moment photography
          (5 distinct assets, 2 not used elsewhere on this page) — the
          same non-literal treatment already established for
          `/privatkunden`'s own `CategoryProcess`, not staged/AI imagery.
          No bear illustration added here: the section is a precisely
          FINWIWO-measured white card grid with no natural decorative
          slot, and forcing one in would damage that fidelity — deferred
          to a more suitable `/unternehmen` location (see
          docs/finwiwo-architecture). */}
      <CategoryBusinessProcess
        headingRest="So"
        headingAccent="funktioniert's"
        subheading="Fünf Schritte von der ersten Analyse bis zur langfristigen Begleitung."
        steps={[
          {
            ...clientGuideAblauf.steps[0],
            photo: {
              photo: "/images/services/manifesto-advisor.webp",
              alt: "Beratungsgespräch in einem modernen Büro",
              objectPosition: "center 30%",
            },
          },
          {
            ...clientGuideAblauf.steps[1],
            photo: {
              photo: "/images/services/business-pension-editorial.webp",
              alt: "Gespräch zur beruflichen Vorsorge im Büro",
              objectPosition: "center 30%",
            },
          },
          {
            ...clientGuideAblauf.steps[2],
            photo: {
              photo: "/images/services/business-health-editorial.webp",
              alt: "Berufstätige Person bei einer kurzen Pause im modernen Büro",
              objectPosition: "center 30%",
            },
          },
          {
            ...clientGuideAblauf.steps[3],
            photo: {
              photo: "/images/services/business-property-editorial.webp",
              alt: "Modernes Lagergebäude bei Abenddämmerung",
              objectPosition: "center 45%",
            },
          },
          {
            ...clientGuideAblauf.steps[4],
            photo: {
              photo: "/images/services/business-fleet-editorial.webp",
              alt: "Firmenfahrzeuge auf einem Betriebshof",
              objectPosition: "center 40%",
            },
          },
        ]}
      />

      {/* Phase 7E.7 — trust/partner module, live-remeasured
          independently: FINWIWO's "Ihr Partner für
          Unternehmensversicherungen" (a plain flat section, no card
          radius/scale, unlike the process module above it). Subheading
          reuses `clientGuideBusinessHub.subline` (§4.8) verbatim in this
          new slot rather than FINWIWO's own "Mit Ihrem Mandat…" H4
          sentence. "Für wen" uses the client guide's exact seven
          audiences, not FINWIWO's own four example branches; the three
          value labels are derived from that same authorized subline's
          own clauses (Ansprechpartner / jährliche Prüfung /
          Schadenfall-Begleitung), not FINWIWO's "Attraktive BVG-
          Lösungen" product-promotion line. See
          `CategoryBusinessPartner`'s own docstring for the full
          measurement record, including the confirmed broken/empty first
          image slot on the live reference (not reproduced) and the
          confirmed absence of any CTA in this module (none built here
          either). No old Phase-6 section occupied this position (7E.4
          already removed `CategoryManifesto`). */}
      <CategoryBusinessPartner
        headingRest="Ihr Partner"
        headingAccent="für Unternehmensversicherungen"
        subheading={clientGuideBusinessHub.subline}
        audienceIntro="Wir betreuen Unternehmen aus folgenden Bereichen:"
        audiences={["KMU", "Startups", "Selbständige", "Handwerk", "Gastronomie", "Bau", "Transport"]}
        valueLabel="Ihre Vorteile als Broker-Kunde"
        values={["Ein Ansprechpartner für alle Policen", "Jährliche Überprüfung", "Begleitung im Schadenfall"]}
        photoTop={{
          photo: "/images/services/business-health-editorial.webp",
          alt: "Berufstätige Person bei einer kurzen Pause im modernen Büro",
          objectPosition: "center 30%",
        }}
        photoBottom={{
          photo: "/images/services/manifesto-advisor.webp",
          alt: "Beratungsgespräch in einem modernen Büro",
          objectPosition: "center 30%",
        }}
      />

      {/* Phase 7E.8 — FAQ accordion, live-remeasured independently (not
          assumed identical to /privatkunden's own CategoryFaq audit):
          same white-card/50px-radius/scale-0.95-as-box/swash/single-open
          architecture, confirmed via `CategoryFaq`'s own docstring, but
          a genuinely wider accordion column (~1083px vs. the locked
          820px) — added as a safe, default-preserving `maxWidth` prop
          rather than duplicating the component. FINWIWO's live FAQ here
          has 6 items, not /privatkunden's 5 — reproduced as 6 since 6
          genuinely-supportable questions exist. The client guide has no
          dedicated business-FAQ block, so NONE of FINWIWO's own
          questions/answers are reused — every question below is either
          the same neutral, non-promotional concept FINWIWO also asks
          (§4.16 "Was kostet die Beratung?") or a UI QUESTION DERIVED
          FROM CLIENT COPY (reframed to match only what an exact guide
          sentence can truthfully answer — e.g. FINWIWO's own "Wie viel
          kostet eine Betriebshaftpflicht?" gave an unverified CHF
          figure, so that question is NOT reused; instead this asks what
          the premium *depends on*, which §4.9's own sentence truthfully
          answers). Every answer is an exact client-guide sentence (or a
          verbatim combination of two), sourced per item below — no
          numeric claims, coverage promises, or legal advice invented. */}
      <CategoryFaq
        headingRest="Häufig gestellte"
        headingAccent="Fragen"
        subheading="Antworten auf die wichtigsten Fragen zu Unternehmensversicherungen."
        accent="teal"
        maxWidth="1083px"
        openItemStyle="plain"
        largeSubheading
        items={[
          {
            // Source: clientGuideAblauf.kostenblock (§4.16), exact — the
            // client guide's own explicitly authorized remuneration
            // wording, not reworded.
            question: "Was kostet die Beratung?",
            answer: clientGuideAblauf.kostenblock,
          },
          {
            // Source: gesundheitUnfallDeep.uvg + .ktg paragraphs (§4.11),
            // exact, combined — UVG sentence then KTG sentence.
            question: "Was ist der Unterschied zwischen Unfallversicherung (UVG) und Krankentaggeld?",
            answer: `${gesundheitUnfallDeep.uvg.paragraphs[0]} ${gesundheitUnfallDeep.ktg.paragraphs[0]}`,
          },
          {
            // UI QUESTION DERIVED FROM CLIENT COPY — reframed from "Wie
            // viel kostet..." (which would need an unverified CHF
            // figure) to what the exact §4.9 Branchen sentence actually
            // supports truthfully.
            question: "Wovon hängt die Prämie für die Betriebshaftpflicht ab?",
            answer: betriebshaftpflichtDeep.situation.paragraphs[0],
          },
          {
            // Source: clientGuideFleet.intro (§4.13), exact.
            question: "Ab wann lohnt sich eine Flottenversicherung?",
            answer: clientGuideFleet.intro,
          },
          {
            // Source: clientGuideCyber.cyber (§4.14), exact.
            question: "Was deckt die Cyberversicherung ab?",
            answer: clientGuideCyber.cyber,
          },
          {
            // UI QUESTION DERIVED FROM CLIENT COPY — broker-value
            // framing. Source: clientGuideBusinessHub.subline (§4.8),
            // exact.
            question: "Wie unterstützt neosura mein Unternehmen als Broker?",
            answer: clientGuideBusinessHub.subline,
          },
        ]}
      />

      {/* Phase 7E.9 — newsletter module, live-remeasured independently
          (not assumed identical to any other page's newsletter
          instance): FINWIWO's "Finanz-Updates, die sich auszahlen." here
          is transparent with only 15px radius and no scale transform —
          genuinely different from the white-card/50px/scale-0.95 family
          used by Process/Partner/FAQ above it. Title/body are the client
          guide's exact §4.1 newsletter copy verbatim (`clientGuideHome
          .newsletter`) — NOT FINWIWO's own "Finanz-Updates..."/"Spartipps,
          Zinsradar..." wording. No newsletter provider or double-opt-in
          integration exists yet (documented launch blocker, see
          docs/CLIENT_GUIDE_MERGE.md) — this form never calls
          `/api/documents` or any endpoint, writes no address anywhere,
          and never claims success; submitting shows a neutral "not yet
          available" message instead. FINWIWO's own `+20k`/avatar-cluster
          social proof is not reproduced (no verified NEOSURA subscriber
          count) — the guide's own body text already ends with "Kein
          Spam, jederzeit abmeldbar.", covering the same trust role. See
          `CategoryNewsletter`'s own docstring for the full measurement
          record, including why no bear was placed in FINWIWO's
          unusually tiny (19×25px) icon slot. Built as a dedicated
          component, not a semantic reuse of `AdvisoryConversion` (which
          stays untouched on the homepage). */}
      <CategoryNewsletter
        title={clientGuideHome.newsletter.title}
        body={clientGuideHome.newsletter.body}
        ctaLabel="Jetzt abonnieren"
      />

      <div id="services">
        {businessServices.map((service, i) => (
          <CategoryServiceRow
            key={service.slug}
            index={i}
            service={service}
            visual={businessServiceVisuals[i]}
            extra={businessServiceExtras[i]}
            basePath="/unternehmen"
            reverse={i % 2 === 1}
          />
        ))}
      </div>

      {/* Phase 7E.10 — client-required standard "Bereit für den
          Überblick?" analysis CTA (guide §7), replacing the old
          Phase-6-era `CategoryClosing` instance that closed this page
          before (non-guide copy, linked to `#dokumente` on the homepage
          instead of the canonical `/analyse` destination). `CategoryClosing`
          itself is kept — every individual deep-service page (both
          `/privatkunden/*` and `/unternehmen/*`) still uses it — only its
          usage on this hub page was removed. No separate rotating brand-strip was
          built to mirror FINWIWO's own closing sign-off: the existing
          locked Footer already carries the identical "Persönlich.
          Unabhängig. Klar." tagline in the same role (already the
          approved decision for `/privatkunden` too) — see
          docs/finwiwo-architecture/unternehmen-closing.md for the full
          audit trail, including why three separate live FINWIWO page
          types (`/unternehmen/`, `/versicherungen/`, `/hypothek/`) all
          confirm FINWIWO has no distinct closing-CTA card to measure
          here. */}
      <CategoryTopicCta
        title={clientGuideTopicCta.title}
        body={clientGuideTopicCta.body}
        buttonLabel={clientGuideTopicCta.button}
        buttonHref="/analyse"
      />
    </main>
  );
}
