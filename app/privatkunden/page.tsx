import type { Metadata } from "next";
import { principles } from "@/content/de/principles";
import { pageMetadata } from "@/lib/seo";
import { CategoryHero } from "@/components/category/CategoryHero";
import { CategoryStatement } from "@/components/category/CategoryStatement";
import { CategoryExplainer } from "@/components/category/CategoryExplainer";
import { CategoryServiceShowcase } from "@/components/category/CategoryServiceShowcase";
import { CategoryAdvantages } from "@/components/category/CategoryAdvantages";
import { CategoryProcess } from "@/components/category/CategoryProcess";
import { CategoryComparison } from "@/components/category/CategoryComparison";
import { CategoryFaq } from "@/components/category/CategoryFaq";
import { AdvisoryConversion } from "@/components/home/AdvisoryConversion";
import { privateIntro } from "@/content/de/private";
import { businessIntro } from "@/content/de/business";

export const metadata: Metadata = pageMetadata({
  path: "/privatkunden",
  title: "Versicherungen für Privatpersonen | neosura",
  description: "Krankenkasse, Hausrat, Auto, Vorsorge, Rechtsschutz: Wir analysieren Ihre Policen, schliessen Lücken und senken Ihre Prämien.",
});

export default function PrivatkundenPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 7M.1 — H1/lead are the client guide §4.2 /privatkunden hero
          copy verbatim, split across the two-tone h1Lead/h1Rest slots this
          component already has. `supporting` has no guide equivalent for
          this exact hero-only second line (CLIENT GUIDE SILENT) — existing
          approved copy retained. */}
      <CategoryHero
        h1Lead="Versicherungen für Ihr Leben."
        h1Rest="Nicht für den Ordner."
        lead={privateIntro.lead}
        supporting={privateIntro.body}
        valuePoints={["Unabhängig", "Persönliche Beratung", "Unterstützung im Schadenfall"]}
        ctaLabel="Lösungen entdecken"
        ctaHref="#services"
        photo={{
          photo: "/images/services/manifesto-advisor.webp",
          alt: "Beraterin im Gespräch mit einem Kundenpaar",
          objectPosition: "center 30%",
        }}
        proofLabel="Privatkunden"
        proofValue="5 Versicherungsbereiche"
        accent="purple"
      />

      <CategoryStatement
        label="Absicherung verdient Klarheit:"
        statement="Wir schützen Sie vor den Risiken, die wirklich zählen."
        conclusion="Wie gut kennen Sie Ihre Absicherung?"
        accent="purple"
      />

      <CategoryExplainer
        headingAccent="Die passende Absicherung"
        headingRest="beginnt mit Klarheit."
        paragraphs={[
          "Ihre Absicherung verdient mehr als eine Standardlösung. Sie verdient eine Struktur, die zu Ihrer persönlichen Situation passt.",
          "Viele Versicherungspakete wachsen über Jahre, ohne je neu geordnet zu werden. Einzelne Policen überschneiden sich, andere Risiken bleiben ungedeckt. Wir schaffen Klarheit darüber, was wirklich zählt.",
          "Wir analysieren Ihre bestehende Absicherung, ordnen Risiken sinnvoll ein und stellen fest, wo echte Lücken oder unnötige Überschneidungen bestehen.",
          "Aus dieser Analyse entsteht eine Struktur, die zu Ihrer Lebenssituation, Ihrem Eigentum und Ihren Zielen passt: nachvollziehbar und persönlich erklärt, nicht einfach vorgegeben.",
          "Absicherung ist kein einmaliges Projekt. Situationen verändern sich, und mit ihnen die passenden Lösungen. Wir begleiten diese Entwicklung langfristig.",
          "Persönliche Beratung beginnt mit Zuhören. Sprechen Sie mit uns über Ihre aktuelle Absicherung.",
        ]}
        accent="purple"
      />

      <div id="services">
        <CategoryServiceShowcase />
      </div>

      <div className="h-[22px] bg-paper-2" aria-hidden />

      <CategoryAdvantages
        headingRest="Versicherungen für"
        headingAccent="Privatkunden"
        paragraph={privateIntro.body}
        items={principles.slice(0, 3).map((p) => ({ title: p.title, body: p.body }))}
        ctaLabel="Beratung anfragen"
        ctaHref="/#dokumente"
        reveal
        photo={{
          photo: "/images/services/private-health-editorial.webp",
          alt: "Drei Personen bei einer Wanderung in den Schweizer Alpen",
          objectPosition: "center 40%",
        }}
        accent="purple"
      />

      <CategoryAdvantages
        headingRest="Versicherungen für"
        headingAccent="Unternehmen"
        paragraph={businessIntro.body}
        items={[principles[0], principles[1], principles[3]].map((p) => ({ title: p.title, body: p.body }))}
        ctaLabel="Beratung anfragen"
        ctaHref="/#dokumente"
        reveal
        photo={{
          photo: "/images/services/business-health-editorial.webp",
          alt: "Berufstätige Person bei einer kurzen Pause im modernen Büro",
          objectPosition: "center 30%",
        }}
        accent="teal"
        imageSide="right"
      />

      <CategoryProcess
        headingRest="So einfach"
        headingAccent="funktioniert's"
        subheading="In nur 4 Schritten zu Ihrer persönlichen Absicherung."
        steps={[
          {
            number: "01",
            title: "Zuhören",
            body: "Persönliche Beratung beginnt mit Zuhören. Wir erfassen Ihre aktuelle Absicherung und Ihre persönliche Situation.",
            photo: {
              photo: "/images/services/private-cyber-editorial.webp",
              alt: "Beratungsgespräch mit Vertragsunterlagen auf dem Tisch",
              objectPosition: "center 45%",
            },
          },
          {
            number: "02",
            title: "Analyse",
            body: "Wir analysieren Ihre bestehende Absicherung und stellen fest, wo echte Lücken oder unnötige Überschneidungen bestehen.",
            photo: {
              photo: "/images/services/manifesto-advisor.webp",
              alt: "Beraterin im Gespräch mit einem Kundenpaar",
              objectPosition: "center 30%",
            },
          },
          {
            number: "03",
            title: "Struktur",
            body: "Aus der Analyse entsteht eine Struktur, die zu Ihrer Lebenssituation, Ihrem Eigentum und Ihren Zielen passt.",
            photo: {
              photo: "/images/services/private-home-editorial.webp",
              alt: "Familie entspannt zwischen Umzugskartons im neuen Zuhause",
              objectPosition: "center 45%",
            },
          },
          {
            number: "04",
            title: "Begleitung",
            body: "Absicherung ist kein einmaliges Projekt. Wir begleiten diese Entwicklung langfristig, auch im Schadenfall.",
            photo: {
              photo: "/images/services/private-pension-editorial.webp",
              alt: "Reifes Paar prüft gemeinsam Unterlagen am Laptop",
              objectPosition: "center 20%",
            },
          },
        ]}
        accent="purple"
      />

      <CategoryComparison
        introHeading="Der Unterschied liegt in der Begleitung."
        introBody="Viele Wege führen zu einer Versicherungslösung, aber nicht jeder bietet persönliche Beratung, laufende Begleitung und Unterstützung im Schadenfall. Genau das ist unser Ansatz."
        leftHeading="Selbstständig organisieren"
        rightHeading="Mit persönlicher Beratung"
        rows={[
          { label: "Ausgangslage", left: "Eigenständig recherchieren", right: "Persönlich erfasst" },
          { label: "Analyse", left: "Selbstständig vergleichen", right: "Individuelle Analyse" },
          { label: "Struktur", left: "Einzelne Policen", right: "Gemeinsam strukturiert" },
          { label: "Beratung", left: "Nach eigenem Bedarf organisiert", right: "Persönliche Beratung" },
          { label: "Schadenfall", left: "Eigenständige Koordination", right: "Unterstützung im Schadenfall" },
        ]}
        accent="purple"
      />

      {/* Phase 8B — the reference FAQ is `toggles--minimal-shadow`: a
          1083px column of plain rows with no card, no radius and no fill
          on the open item. NEOSURA keeps its restrained hairlines but drops
          the boxed open state and matches the column width. */}
      <CategoryFaq
        openItemStyle="plain"
        maxWidth="1083px"
        headingRest="Häufig gestellte"
        headingAccent="Fragen"
        subheading="Antworten auf die wichtigsten Fragen zur Versicherungsberatung."
        items={[
          {
            // Source: CategoryProcess steps (this page) + CategoryExplainer's closing line.
            question: "Wie läuft die Beratung ab?",
            answer:
              "Persönliche Beratung beginnt mit Zuhören. Wir analysieren Ihre bestehende Absicherung, entwickeln eine passende Struktur und begleiten Sie langfristig, in vier klaren Schritten.",
          },
          {
            // Source: content/de/principles.ts — "Unabhängig", verbatim.
            question: "Wie unabhängig ist die Beratung?",
            answer:
              "Wir beraten frei von Versicherungsbindungen und entwickeln Lösungen, die sich an Ihren Bedürfnissen orientieren und nicht an Vorgaben einzelner Anbieter.",
          },
          {
            // Source: content/de/deep/gesundheit.ts — "koordination", adapted.
            question: "Was passiert mit meinen bestehenden Versicherungen?",
            answer:
              "Wir ordnen Ihre bestehenden Policen, zeigen Überschneidungen und Lücken auf und entwickeln daraus eine Struktur, die zu Ihrer aktuellen Lebenssituation passt.",
          },
          {
            // Source: content/de/principles.ts — "Unterstützung im Schadenfall", verbatim.
            question: "Was passiert im Schadenfall?",
            answer:
              "Im entscheidenden Moment stehen wir an Ihrer Seite und begleiten Sie effizient, transparent und strukturiert durch den gesamten Prozess.",
          },
          {
            // Source: content/de/private.ts — privateServices titles.
            // Phase 7Z.A — corrected: this answer had drifted from its own
            // cited source after `privateServices` titles were renamed in
            // an earlier phase (Gesundheit→Krankenkasse, Vorsorge &
            // Vermögen→Vorsorge, Recht & Cyber→Rechtsschutz & Cyber) —
            // now matches the current five titles exactly.
            question: "Welche Versicherungsbereiche deckt neosura für Privatkunden ab?",
            answer:
              "Krankenkasse, Wohnen & Eigentum, Fahrzeug & Reisen, Vorsorge sowie Rechtsschutz & Cyber: fünf Bereiche, die wir gemeinsam auf Ihre persönliche Situation abstimmen.",
          },
        ]}
        accent="purple"
      />

      <div className="h-[20px] bg-paper-2" aria-hidden />

      {/* Phase 9B — measured: this section ran 690px tall around a 161px form
          at 720px with 160px fields, the same "small form in a large field"
          the homepage had (its refined variant measures 623/760). The shared
          refined treatment (tighter section padding, 760px form, 16px inputs,
          callout success/error, SVG arrow) is opted into here too; the paper
          background, fields, validation and backend are unchanged. */}
      <AdvisoryConversion background="paper" variant="home" />
    </main>
  );
}
