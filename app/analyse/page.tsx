import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { clientGuideAnalyseNote } from "@/content/de/clientGuide";
import { DocumentsSection } from "@/components/home/DocumentsSection";

export const metadata: Metadata = pageMetadata({
  path: "/analyse",
  title: `Kostenlose Versicherungsanalyse | neosura`,
  description: "Policen hochladen, Analyse erhalten: Wir prüfen Ihre Versicherungen kostenlos und melden uns innert zwei Arbeitstagen.",
});

/** Phase 7V — NEOSURA's primary conversion route. Reuses the real,
 * already-approved `DocumentsSection` (same `/api/documents` backend,
 * same honest success/fallback states, same mandatory privacy-consent
 * checkbox, same Privatkunden/Unternehmenskunden tabs with their own
 * distinct required fields) rather than duplicating upload logic into a
 * second component — no design language invented, no fake calculator.
 *
 * CORE HEADING — `DocumentsSection`'s own heading
 * (`documentsContent.headingLines`: "Ihre Unterlagen." / "Unsere
 * strukturierte Analyse.") is now rendered as this page's actual `<h1>`
 * (`headingLevel="h1"`, a new opt-in prop added this phase — every other
 * caller of `DocumentsSection`, the homepage conversion section and its
 * upload modal, is unaffected and still renders it as an `<h2>`, since
 * each of those already has its own page-level H1 elsewhere). This page
 * no longer renders a separate, generic "Analyse" heading above it —
 * exactly one H1, the client's own required core-heading wording,
 * verbatim, unchanged since it was first written.
 *
 * TRUST POINTS — three concise UI labels, each grounded in exactly one
 * of the client's three required concepts (SSL-encrypted, confidential
 * handling, reply within two working days) — no "bank-grade"/"military-
 * grade"/"100% secure" language. The "innert zwei Arbeitstagen" point is
 * the same CLIENT-SUPPLIED operating claim already used in the guide's
 * own §7 CTA copy, not invented here.
 *
 * PRIVACY — `clientGuideAnalyseNote` (§4.19) shown verbatim under the
 * heading (visual polish pass: it is passed through `DocumentsSection`'s
 * `intro` slot so it renders inside the left column below the H1, rather
 * than in its own row above it — the page used to open on a legal
 * disclaimer instead of its heading); the mandatory, unchecked-by-default consent checkbox and its
 * `/datenschutz` link live inside `DocumentsSection` itself, enforced
 * both client- and server-side (`app/api/documents/route.ts` re-checks
 * `consent === "on"`).
 *
 * NO DUPLICATE CTA — the upload form is this page's own conversion
 * destination; no `CategoryTopicCta`/`FinalCta` was added, unchanged
 * from the prior build.
 *
 * BEAR — one small, restrained instance near the intro (this page's own
 * one non-legal mascot appearance), sized and placed so it doesn't
 * compete with the form's own seriousness. */
export default function AnalysePage() {
  const TRUST_POINTS = [
    "SSL-verschlüsselte Übertragung",
    "Vertrauliche Behandlung Ihrer Unterlagen",
    "Antwort innert zwei Arbeitstagen",
  ];

  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 8I — `variant="page"` opts into the dedicated /analyse
          treatment (see `DocumentsSection`). The privacy note moved from the
          intro column to `formNote`, directly under the submit button: it
          opens "Mit dem Absenden bestätigen Sie …", so it now reads as the
          quiet legal line beside the action it describes, not as a
          paragraph competing with the H1. Wording unchanged. The bear stays
          as the one restrained mark beside the trust points. */}
      <DocumentsSection
        anchorId="dokumente-analyse"
        headingLevel="h1"
        variant="page"
        formNote={clientGuideAnalyseNote}
        intro={
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="hidden h-[48px] w-[48px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-paper-2 sm:flex"
            >
              <Image src="/images/bear-trust.webp" alt="" width={96} height={96} className="h-full w-full scale-[2.3] object-cover object-[52%_40%]" />
            </span>
            <ul className="flex flex-col gap-2.5 pt-1 text-[1rem] font-light leading-[24px] text-ink">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2.5">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-[16px] w-[16px] shrink-0 text-purple">
                    <path d="M4 10.5l3.5 3.5L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        }
      />
    </main>
  );
}
