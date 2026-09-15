import type { ReactNode } from "react";
import type { LegalSection } from "@/content/de/legal";
import { Container } from "@/components/ui/Container";

const TOKEN = /(\[[^\]]+\]|[\w.+-]+@[\w-]+\.[a-z]{2,}|\bfinma\.ch\b)/gi;

/** Renders one legal line verbatim, marking `[BRACKETED]` placeholders as
 * visibly pending (text unchanged) and turning the e-mail address and
 * finma.ch into real links. */
function renderLine(line: string): ReactNode[] {
  return line.split(TOKEN).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("[") && part.endsWith("]")) {
      return (
        <span
          key={i}
          className="inline rounded-[4px] border border-dashed border-ink-soft/35 bg-paper px-1.5 py-px text-[0.8125rem] font-normal tracking-[0.02em] text-ink-soft [box-decoration-break:clone]"
        >
          {part}
        </span>
      );
    }
    if (/@/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`} className="text-purple underline underline-offset-4 transition-colors hover:text-ink">
          {part}
        </a>
      );
    }
    if (/^finma\.ch$/i.test(part)) {
      return (
        <a key={i} href="https://www.finma.ch" className="text-purple underline underline-offset-4 transition-colors hover:text-ink">
          {part}
        </a>
      );
    }
    return part;
  });
}

/** Deliberately plain: no pills, no photos, no marketing rhythm — a legal
 * notice reads as one, with clean, readable typography and nothing
 * standing between the reader and the exact sourced text.
 *
 * Phase 8K — the 760px measure never applied: `Container` already sets
 * `max-w-[1440px]`, so the passed `max-w-[760px]` lost and lines ran the
 * full 1320px (150+ characters on Datenschutz). The text now sits in its
 * own 760px column on the page grid. Hierarchy: H1 40/900/45 (sized from
 * the viewport on phones so "Datenschutzerklärung" never clips), section
 * headings 23/500/29 instead of 16.8/400, body 16/300/26. `[BRACKETED]`
 * placeholders keep their exact text but read as a pending marker, and a
 * one-line legend explains them wherever a page still carries any. FINWIWO
 * has no legal page to reference (its /datenschutz/ 404s, /impressum/
 * redirects), so the locked NEOSURA type system governs. */
export function LegalContent({ title, sections }: { title: string; sections: LegalSection[] }) {
  const hasPending = sections.some((s) => s.lines.some((l) => /\[[^\]]+\]/.test(l)));

  return (
    <section className="bg-white">
      <Container className="pb-16 pt-10 lg:pb-[100px] lg:pt-[72px]">
        <div className="max-w-[760px]">
          <h1 className="text-[clamp(1.6rem,calc(8vw-4px),1.875rem)] font-black leading-[1.13] tracking-normal text-ink lg:text-[2.5rem] lg:leading-[45px]">
            {title}
          </h1>
          {hasPending && (
            <p className="mt-5 text-[0.875rem] font-light leading-[1.55] text-ink-soft">
              Angaben in eckigen Klammern sind noch ausstehend und werden ergänzt, sobald sie bestätigt sind.
            </p>
          )}

          <div className="mt-10 lg:mt-12">
            {sections.map((section) => (
              <div key={section.heading} className="border-t border-line-soft py-7 lg:py-8">
                <h2 className="text-[1.3125rem] font-medium leading-[27px] tracking-[-0.21px] text-ink lg:text-[1.4375rem] lg:leading-[29px] lg:tracking-[-0.23px]">
                  {section.heading}
                </h2>
                <div className="mt-3 flex flex-col gap-1.5">
                  {section.lines.map((line) => (
                    <p key={line} className="break-words text-[1rem] font-light leading-[26px] text-ink">
                      {renderLine(line)}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
