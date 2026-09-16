import Image from "next/image";
import Link from "next/link";
import { privateServices } from "@/content/de/private";
import { businessServices } from "@/content/de/business";
import { contact, mapsUrl } from "@/content/de/site";
import { footerContent, footerLinks, legalLinks, socialPlaceholders } from "@/content/de/footer";
import { Container } from "@/components/ui/Container";

const linkClass =
  "text-[1rem] text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-purple hover:decoration-purple";

/** Simplified brand glyphs for the social placeholders. Change Request 1 §5
 * asks for the icons now; the profile URLs arrive with the chapter 8
 * deliverables, so these render as inert marks, not links. */
const SOCIAL_ICON: Record<string, React.ReactNode> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10.5V17M7.5 7.6v.1M11 17v-3.6a2.4 2.4 0 0 1 4.8 0V17" />
    </>
  ),
  TikTok: <path d="M14 4v9.2a3.3 3.3 0 1 1-2.6-3.2M14 4c.4 2.3 1.9 3.7 4 3.9" />,
  Facebook: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M14.8 8.2h-1.3c-.8 0-1.3.5-1.3 1.3V11h2.5l-.4 2.4h-2.1V19" />
    </>
  ),
};

/** Phase 7C.12 — rebuilt from FINWIWO's live footer architecture
 * (measured: light `rgb(246,248,247)` surface continuous with the
 * conversion section above it, a centered pill tagline directly above the
 * footer content with a thin rule beneath it, then a 5-block row —
 * logo+blurb, "Service", "Links", "Weitere Links", "Rechtliches" —
 * headings at 20px/weight 300, 16px links). The footer ends on the link
 * grid: the dark copyright band was removed site-wide at the client's
 * request. Mobile: columns stack full-width in the same order.
 *
 * Change Request 1 §5 — footer completion: the address links to Google
 * Maps, "Rechtliches" carries the FINMA intermediary-register link (the
 * public register search until NEOSURA's own register number is
 * delivered), and the brand column carries social placeholders.
 *
 * NEOSURA's real navigation only — no fabricated ratings, subscriber
 * counts, partner portals or invented profile URLs. */
export function Footer() {
  return (
    <footer className="bg-paper">
      {/* Phase 8A — the reference anchors its own sign-off pill ON the
          hairline that divides the page from the footer: a full-bleed rule
          runs edge to edge and the pill sits centred over it. */}
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
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-purple"
              >
                <span className="block">{contact.address.company}</span>
                <span className="block">{contact.address.street}</span>
                <span className="block">
                  {contact.address.zipCity}, {contact.address.country}
                </span>
              </a>
              <a href={`mailto:${contact.email}`} className="mt-2 hover:text-purple">
                {contact.email}
              </a>
              <a href={`tel:${contact.phoneHref}`} className="hover:text-purple">
                {contact.phone}
              </a>
            </address>

            <ul className="mt-6 flex items-center gap-3">
              {socialPlaceholders.map((social) => (
                <li key={social.label}>
                  <span
                    title={`${social.label}: Profil folgt`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                      className="h-[18px] w-[18px]"
                    >
                      {SOCIAL_ICON[social.label]}
                    </svg>
                    <span className="sr-only">{social.label}: Profil folgt</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[1.15rem] font-light text-ink lg:text-[1.25rem]">Privatkunden</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {privateServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/privatkunden/${s.slug}`} className={linkClass}>
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
                  <Link href={`/unternehmen/${s.slug}`} className={linkClass}>
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
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[1.15rem] font-light text-ink lg:text-[1.25rem]">Rechtliches</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {legalLinks.map((link) =>
                link.external ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkClass} inline-flex items-center gap-1.5`}
                    >
                      {link.label}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden
                        className="h-3 w-3 shrink-0"
                      >
                        <path d="M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" />
                      </svg>
                      <span className="sr-only">(öffnet in neuem Tab)</span>
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
