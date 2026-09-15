import Image from "next/image";
import Link from "next/link";
import { privateServices } from "@/content/de/private";
import { businessServices } from "@/content/de/business";
import { contact } from "@/content/de/site";
import { footerContent, footerLinks, legalLinks } from "@/content/de/footer";
import { Container } from "@/components/ui/Container";

/** Phase 7C.12 — rebuilt from FINWIWO's live footer architecture
 * (measured: light `rgb(246,248,247)` surface continuous with the
 * conversion section above it, a centered teal pill tagline directly
 * above the footer content with a thin rule beneath it, then a 5-block
 * row — logo+blurb, "Service", "Links", "Weitere Links", "Rechtliches" —
 * headings at 20px/weight 300 (light, not the small-caps tracked label
 * NEOSURA used before), 16px links). The footer ends on the link grid:
 * the dark copyright band was removed site-wide at the client's request. Mobile: columns stack full-
 * width in the same order, not an accordion (confirmed live).
 *
 * Phase 7SYS.B — mobile inter-group gap tightened (`gap-y-12`→`gap-y-8`,
 * `py-14`→`py-10`) after screenshot review found the mobile footer
 * excessively tall. FINWIWO's own mobile footer is confirmed (see this
 * docstring's own Phase 7C.12 note above) to stack all 5 groups
 * full-width in the same order — NOT an accordion, NOT collapsed, NOT
 * hidden — so no structural change was made; only the gap between
 * groups was reduced. All links/groups/content unchanged. Desktop
 * spacing (`lg:gap-10`/`lg:py-16`) unchanged.
 *
 * Phase 7SYS.C — tightened again: tagline section `pt-14/pb-10`→
 * `pt-10/pb-8`; inter-group gap `gap-y-8`→`gap-y-6`; main grid
 * `py-10`→`py-8`; each group's heading-to-first-link margin
 * `mt-5`→`mt-4`; inter-link gap `gap-2.5`→`gap-2`; brand column's own
 * paragraph/address margins tightened to match. Measured real DOM
 * footer height (`getBoundingClientRect()`, not a screenshot pixel
 * count) at 390px: ~1442px before this pass. Zero links, zero contact
 * fields, zero legal pages removed — every group/item/heading is
 * unchanged, only the whitespace between them. Desktop spacing
 * (`lg:gap-10`/`lg:py-16`) still unchanged — not flagged as an issue at
 * any point.
 *
 * NEOSURA's real navigation only — no FINWIWO wording, no fabricated
 * ratings/subscriber counts/partner portals/regulatory citations (e.g.
 * FINWIWO's own "VAG 45"/"FINMA Register" links have no NEOSURA
 * equivalent, so that slot only carries Datenschutz/Impressum). Legal
 * links now live in their own "Rechtliches" column (matching FINWIWO's
 * structure) instead of a separate bottom bar. FINWIWO's own footer
 * showed no contact block at all — since NEOSURA's real contact details
 * are still genuine content worth keeping, they sit with the logo/brand
 * column rather than being dropped or crammed into "Rechtliches" (which
 * mirrors FINWIWO's clean 2-item legal list exactly). The tagline pill
 * reuses the already-approved "Persönlich. Unabhängig. Klar." line (used
 * for this exact eyebrow role in `FinalCta`) rather than inventing new
 * copy. */
export function Footer() {
  return (
    <footer className="bg-paper">
      {/* Phase 8A — the reference anchors its own sign-off pill ON the
          hairline that divides the page from the footer: a full-bleed rule
          runs edge to edge and the pill sits centred over it. NEOSURA's pill
          floated in an empty band above a separate divider, which read as an
          orphan. Same rule, same overlap, NEOSURA's own wording and colour. */}
      <div className="relative">
        <span aria-hidden className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-soft" />
        <Container className="relative py-9 text-center lg:py-11">
          <span className="mx-auto flex min-h-[69px] w-full max-w-[791px] items-center justify-center rounded-full bg-purple px-8 text-center text-[1.1875rem] font-medium tracking-[0.2px] text-white sm:h-[53px] sm:min-h-0 sm:w-[55vw]">
            Persönlich. Unabhängig. Klar.
          </span>
        </Container>
      </div>

      <div>
        <Container className="grid grid-cols-1 gap-y-6 pt-8 pb-14 lg:grid-cols-5 lg:gap-10 lg:py-16">
          <div>
            <Link href="/" aria-label="neosura Startseite" className="relative block h-[34px] w-[164px]">
              <Image src="/images/logo.png" alt="neosura" fill sizes="164px" className="object-contain object-left" />
            </Link>
            <p className="mt-4 max-w-[30ch] text-[0.95rem] leading-relaxed text-ink-soft">{footerContent.brandBody}</p>

            <address className="mt-5 flex flex-col gap-1.5 text-[0.9rem] not-italic text-ink-soft">
              <span>{contact.address.company}</span>
              <span>{contact.address.street}</span>
              <span>
                {contact.address.zipCity}, {contact.address.country}
              </span>
              <a href={`mailto:${contact.email}`} className="mt-2 hover:text-purple">
                {contact.email}
              </a>
              <a href={`tel:${contact.phoneHref}`} className="hover:text-purple">
                {contact.phone}
              </a>
            </address>
          </div>

          <div>
            <h3 className="text-[1.15rem] font-light text-ink lg:text-[1.25rem]">Privatkunden</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {privateServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/privatkunden/${s.slug}`}
                    className="text-[1rem] text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-purple hover:decoration-purple"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[1.15rem] font-light text-ink lg:text-[1.25rem]">Unternehmen</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {businessServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/unternehmen/${s.slug}`}
                    className="text-[1rem] text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-purple hover:decoration-purple"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[1.15rem] font-light text-ink lg:text-[1.25rem]">Weitere Links</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[1rem] text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-purple hover:decoration-purple"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[1.15rem] font-light text-ink lg:text-[1.25rem]">Rechtliches</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[1rem] text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-purple hover:decoration-purple"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
