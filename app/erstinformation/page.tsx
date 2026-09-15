import type { Metadata } from "next";
import { siteMeta } from "@/content/de/site";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = pageMetadata({
  path: "/erstinformation",
  title: `Erstinformation | ${siteMeta.name}`,
  description: "Erstinformation gemäss Versicherungsaufsichtsgesetz (VAG).",
});

const PENDING_ITEMS = [
  "Vollständiger juristischer Firmenname",
  "Handelsregisterkanton (bestätigt)",
  "FINMA-Registernummer als Versicherungsvermittler",
  "Name der berechtigten Vertretung",
  "Angaben zur Berufshaftpflichtversicherung",
  "Zuständige Ombudsstelle",
  "Liste der Partner-/Kooperationsgesellschaften",
];

/** Phase 7M.0 — route scaffold only. The client guide requires a
 * dedicated /erstinformation page (pre-contractual information under
 * the Swiss VAG) before go-live. Its actual regulated content cannot be
 * written yet — the underlying facts (FINMA register number,
 * authorised representative, professional-indemnity details, ombudsman,
 * partner list) have not been supplied and are NOT invented here. This
 * establishes the route/IA and documents exactly what's outstanding —
 * see docs/CLIENT_GUIDE_MERGE.md §19 "LEGAL — LAUNCH BLOCKERS". No bear
 * illustration on this page per the client's legal-pages rule. */
export default function ErstinformationPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 8K — same controlled 760px reading column and hierarchy as
          Impressum/Datenschutz (`LegalContent`): H1 40/900/45, body
          16/300/26. The pending list was a full-width bordered panel with a
          small uppercase label; it is now the page's own "Noch ausstehend"
          section under a hairline, each item with a hollow status marker —
          clearly unresolved without looking broken. Wording unchanged; no
          Erstinformation PDF is offered while these fields are missing. */}
      <Container className="pb-16 pt-10 lg:pb-[100px] lg:pt-[72px]">
        <div className="max-w-[760px]">
          <h1 className="text-[clamp(1.6rem,calc(8vw-4px),1.875rem)] font-black leading-[1.13] tracking-normal text-ink lg:text-[2.5rem] lg:leading-[45px]">
            Erstinformation
          </h1>
          <p className="mt-5 text-[1rem] font-light leading-[26px] text-ink">
            Diese Seite wird die gesetzlich vorgeschriebene Erstinformation gemäss Versicherungsaufsichtsgesetz
            (VAG) enthalten. Die dafür erforderlichen regulatorischen Angaben liegen noch nicht vollständig vor
            und werden nicht erfunden, sondern ergänzt, sobald sie vom Unternehmen bestätigt sind.
          </p>

          <section aria-labelledby="erstinformation-ausstehend" className="mt-10 border-t border-line-soft pt-7 lg:mt-12 lg:pt-8">
            <h2
              id="erstinformation-ausstehend"
              className="text-[1.3125rem] font-medium leading-[27px] tracking-[-0.21px] text-ink lg:text-[1.4375rem] lg:leading-[29px] lg:tracking-[-0.23px]"
            >
              Noch ausstehend
            </h2>
            <ul className="mt-4 flex flex-col">
              {PENDING_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-line-soft py-3 text-[1rem] font-light leading-[26px] text-ink last:border-b-0">
                  <span aria-hidden className="mt-[9px] h-2 w-2 shrink-0 rounded-full border border-dashed border-ink-soft/60" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </main>
  );
}
