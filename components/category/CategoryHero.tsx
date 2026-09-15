import Image from "next/image";
import Link from "next/link";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import { Container } from "@/components/ui/Container";
import { CategoryHeroBusinessForm } from "./CategoryHeroBusinessForm";

interface CategoryHeroProps {
  h1Lead: string;
  h1Rest: string;
  lead: string;
  supporting: string;
  valuePoints: string[];
  ctaLabel: string;
  ctaHref: string;
  photo: ServiceVisual;
  proofLabel: string;
  proofValue: string;
  accent: "purple" | "teal";
  /** Defaults to "split" — the exact, locked /privatkunden rendering
   * (Phase 7D.1). "fullbleed" is Phase 7E.1's independently-measured
   * `/unternehmen` variant and must never change what "split" renders. */
  layout?: "split" | "fullbleed";
  /** fullbleed only: title+body checklist pairs, replacing the single-line
   * `valuePoints` list this layout doesn't use. */
  checklist?: { title: string; body: string }[];
}

/** Phase 7D.1 — rebuilt from FINWIWO's live `/versicherungen/` hero
 * (measured 1440/1280/1024/390/360): a single `wpb_row` flush with the
 * header, rounded ONLY on the bottom two corners (`0 0 90px 90px` —
 * confirmed via computed style, not a fully-rounded floating card),
 * 60/40-ish text/photo split, small row padding (14px) since content
 * height — not padding — drives the ~616px row height. H1 40px/45px
 * lh/weight 900 with the first word in the accent color, a short 2-line
 * lead, a shorter supporting line, 3 checkmark value points (35px icon,
 * ~51px vertical rhythm), one pill CTA (not two), a plain rectangular
 * photo (0 radius, confirmed) with a decorative accent-color shape
 * behind it, and a floating proof-stat card on the photo. Mobile
 * (confirmed via screenshot, NOT scaled from desktop): text-first order
 * — H1 → lead → supporting → photo (proof card above it) → value points
 * → CTA — a different sequence than desktop's side-by-side columns.
 *
 * Scroll: sampled top through leaving-viewport — `transform` stays the
 * identity matrix and the image's on-screen position tracks scroll 1:1
 * throughout, i.e. genuinely static despite the row's own
 * `parallax_section` class name (confirmed by measurement, not inferred
 * from the class). Load: no entrance animation at any sampled timestamp
 * (0–1500ms). Hover: CTA lifts ~3px (translateY), no color change.
 *
 * FINWIWO shows TWO unsupported proof claims here — "Bereits über 5,910
 * Versicherungen abgeschlossen" and a Google-branded "4.9 | +500
 * Bewertungen" rating badge. Neither is reproducible truthfully for
 * NEOSURA: the policy count is fabricated, and the Google rating has no
 * real equivalent to substitute (unlike a count, a specific star rating
 * can't be honestly approximated). The rating badge is dropped
 * entirely; the count-style card is replaced with a genuine, non-
 * numeric-claim NEOSURA fact in the same visual slot (service-area
 * count, not a fabricated transaction count) — preserving the
 * geometric role, not the claim.
 *
 * Phase 7E.1 — `layout="fullbleed"` rebuilt from FINWIWO's own dedicated
 * business-insurance page (`https://finwiwo.ch/unternehmen/`, reached
 * from the live "Versicherungen" mega-menu's "Für Unternehmen" link —
 * not `/versicherungen/`'s mixed toggle hub, which has no business-only
 * hero of its own). Genuinely different architecture, independently
 * measured: full-bleed photo behind the ENTIRE row (not a boxed corner
 * image), a light wash over it (confirmed live — H1/body/checklist all
 * render in the same dark ink used on white, not white-on-dark; a first
 * "white text on dark photo" read from a single screenshot was wrong,
 * corrected via `getComputedStyle`), H1 40px/45/weight 900 (bold, not
 * the split layout's 400), 3 title+body checklist items (not
 * `split`'s single-line list), one pill CTA, static on scroll
 * (`transform: none` at every sampled point) and unchanged bottom-only
 * 90px radius on mobile.
 *
 * Phase 7E.1A — the right column's real FINWIWO counterpart is a
 * substantial white lead-form panel (~556×640-700px, DOM-anchored to
 * its checkbox inputs since it carries no background-color of its own
 * to search for), not a small stat card — an earlier pass had shrunk it
 * to a floating badge, which preserved the *content* truthfully but
 * lost the *architecture*. `CategoryHeroBusinessForm` now occupies that
 * same visual mass: a real multi-select checkbox grid (FINWIWO has 9
 * insurance types; NEOSURA's genuine 5 `businessServices` render in the
 * same 2-column grammar) plus `businessDocumentFields`
 * (Firmenname/Ansprechpartner/E-Mail/Telefon — not FINWIWO's PLZ/Ort/
 * Geburtsdatum/Anrede, which have no honest NEOSURA equivalent), posting
 * through the same `/api/documents` pipeline as every other form on the
 * site (`form_type: "unternehmen"`, selected areas sent as the existing
 * `service` field). A small decorative curved-arrow SVG between the CTA
 * and the panel reproduces FINWIWO's own pointer graphic (confirmed via
 * its `Pfeil-Anfrage-FINWIWO2.png` asset — a static, non-animated PNG,
 * desktop only per its absence from the mobile screenshot). Mobile
 * (confirmed live): the panel drops to full width below the CTA, not a
 * scaled-down desktop copy. */
export function CategoryHero({
  h1Lead,
  h1Rest,
  lead,
  supporting,
  valuePoints,
  ctaLabel,
  ctaHref,
  photo,
  proofLabel,
  proofValue,
  accent,
  layout = "split",
  checklist,
}: CategoryHeroProps) {
  const accentBg = accent === "teal" ? "bg-teal" : "bg-purple";
  const accentText = accent === "teal" ? "text-purple" : "text-purple";

  if (layout === "fullbleed") {
    return (
      <div className="bg-paper-2">
        <section className="relative overflow-hidden rounded-b-[48px] lg:rounded-b-[90px]">
          <div className="absolute inset-0">
            <Image
              src={photo.photo}
              alt={photo.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: photo.objectPosition }}
            />
            <div aria-hidden className="hero-wash absolute inset-0" />
          </div>

          {/* Phase 8C — measured on the reference `/unternehmen/` hero: H1
              40/900/45/normal and the 23/500/29 lead in a 605px column; lead-form
              panel 556px; checklist title 20/300/27 + body 16/300/24 beside a 35px
              icon on an 83px step; row padding 57.6 / 72. */}
          <Container className="relative pb-14 pt-10 lg:pb-[72px] lg:pt-[58px]">
            {/* Two columns only from xl: at 1024 the fixed 556px form + 100px
                gap left the H1 a 248px column and "Versicherungen" overflowed
                into the photo. Below xl the form stacks under the copy. */}
            <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_556px] xl:gap-x-[100px]">
              <div>
                <h1 className="max-w-[16ch] text-[1.9rem] font-black leading-[1.15] tracking-normal text-ink lg:max-w-[605px] lg:text-[2.5rem] lg:leading-[1.125]">
                  {h1Lead} <span className={accentText}>{h1Rest}</span>
                </h1>

                <p className="mt-6 max-w-[48ch] text-[1.15rem] font-medium leading-[1.4] tracking-[-0.23px] text-ink lg:mt-7 lg:max-w-[605px] lg:text-[1.4375rem] lg:leading-[29px]">{lead}</p>
                <p className="mt-4 max-w-[48ch] text-[1rem] font-light leading-[1.5] text-ink-soft">{supporting}</p>

                <ul className="mt-8 flex flex-col gap-[22px] lg:mt-9">
                  {(checklist ?? []).map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span aria-hidden className={`flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-full border-2 text-[1.05rem] ${accent === "teal" ? "border-purple" : "border-purple"} ${accentText}`}>
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="h-[1em] w-[1em]"><path d="M4 10.5l4 4 8-9" /></svg>
                      </span>
                      <span>
                        <span className="block text-[1.125rem] font-light leading-[27px] tracking-[-0.2px] text-ink lg:text-[1.25rem]">{item.title}</span>
                        <span className="block text-[1rem] font-light leading-[24px] text-ink-soft">{item.body}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="relative inline-flex items-center">
                  <Link
                    href={ctaHref}
                    className="mt-9 inline-flex h-[50px] items-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600 lg:mt-10"
                  >
                    {ctaLabel}
                  </Link>
                  <svg
                    aria-hidden
                    viewBox="0 0 120 40"
                    className={`ml-3 mt-9 hidden h-[28px] w-[90px] lg:mt-10 lg:block ${accentText}`}
                  >
                    <path
                      d="M4 8c20 24 60 30 110 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path d="M100 20l16 8-6-17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="mt-10 flex max-w-[556px] items-center justify-center xl:mt-0 xl:max-w-none">
                <CategoryHeroBusinessForm />
              </div>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-paper-2">
      <section className="overflow-hidden rounded-b-[48px] bg-white lg:rounded-b-[90px]">
        {/* Phase 8B.1 — the reference hero closes 52px below its CTA; NEOSURA
            ran 80px, part of why its hero ended 143px lower (850 vs 707). */}
        <Container className="pb-12 pt-10 lg:pb-[52px] lg:pt-14">
          <div className="lg:grid lg:grid-cols-[58%_1fr] lg:items-start lg:gap-x-14 lg:gap-y-8">
            <div className="lg:order-1">
              <h1 className="max-w-[15ch] text-[1.9rem] font-black leading-[1.15] tracking-normal text-ink lg:max-w-[560px] lg:text-[2.5rem] lg:leading-[1.125]">
                <span className={accentText}>{h1Lead}</span> {h1Rest}
              </h1>

              <p className="mt-6 max-w-[48ch] text-[1.15rem] font-normal leading-[1.5] text-ink lg:mt-7 lg:text-[1.25rem]">{lead}</p>
              <p className="mt-4 max-w-[48ch] text-[1rem] font-light leading-[1.5] text-ink-soft">{supporting}</p>
            </div>

            <div className="relative order-2 mt-8 h-[280px] w-[calc(100%+3rem)] -mx-6 sm:-mx-8 sm:w-[calc(100%+4rem)] lg:order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:mt-0 lg:h-[440px] lg:w-full">
              {/* Phase 9B — the frame is now an 18% tint on a smaller offset (was
                  a solid accent block 24px out), so the photograph leads and the
                  purple no longer competes with it; the proof card keeps its
                  content but loses the heavy drop shadow and 20px corners.
                  The accent shape frames the photo evenly on all four sides
                  and both carry the same soft geometry — previously the blob
                  was inset vertically behind a square photo, so it survived
                  only as two thin slivers at the left and right edges. */}
              <div
                aria-hidden
                className={`absolute -bottom-3 -left-3 h-full w-full rounded-[44px] opacity-[0.18] lg:-bottom-4 lg:-left-4 lg:rounded-[64px] ${accentBg}`}
              />
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={photo.photo}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: photo.objectPosition }}
                />
              </div>

              <div className="absolute left-4 top-4 w-[232px] rounded-[12px] bg-white/95 px-5 py-4 shadow-[0_8px_24px_rgba(20,8,31,0.08)] lg:left-6 lg:top-6">
                <span className="block text-[0.8rem] text-ink-soft">{proofLabel}</span>
                <span className={`mt-1 block text-[1.15rem] font-normal leading-[1.3] ${accentText}`}>{proofValue}</span>
              </div>
            </div>

            <div className="order-3 mt-8 lg:order-3 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:self-start">
              <ul className="flex flex-col gap-4">
                {valuePoints.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className={`flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-full border-2 text-[1.05rem] ${accent === "teal" ? "border-purple" : "border-purple"} ${accentText}`}
                    >
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="h-[1em] w-[1em]"><path d="M4 10.5l4 4 8-9" /></svg>
                    </span>
                    <span className="text-[1rem] text-ink lg:text-[1.05rem]">{point}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={ctaHref}
                className="mt-8 inline-flex h-[50px] items-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600 lg:mt-9"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
