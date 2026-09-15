import Image from "next/image";
import Link from "next/link";
import type { ServiceItem } from "@/content/de/types";
import type { ServiceVisual } from "@/content/de/serviceVisuals";
import type { ServiceExtra } from "@/content/de/serviceExtras";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface ServiceHighlightRowProps {
  service: ServiceItem;
  visual: ServiceVisual;
  extra: ServiceExtra;
  basePath: string;
  /** Which side the photo sits on at desktop width. */
  imageSide?: "left" | "right";
  /** "corner": one large-radius corner on the outer edge, other 3 sharp
   *  (Service 01's "Unser Steuerservice" mask). "stadium": a full
   *  half-stadium end-cap on the whole outer edge (both corners), a small
   *  16px radius on the inner edge (Service 02's "Vorsorge" mask,
   *  measured live as `tl_br_300px tr_br_15px bl_br_300px br_br_15px`). */
  maskStyle?: "corner" | "stadium";
  /** Service 01's mobile photo touches the viewport edges; Service 02's
   *  sits inset within the normal content padding — measured live (image
   *  left=23.5px at 390px viewport, matching the standard gutter, not 0). */
  mobileBleed?: boolean;
  /** Decorative accent color peeking from behind the inset photo — this
   *  is NEOSURA's own translation (FINWIWO's "color behind the mask" is
   *  actually just the photograph's own background, confirmed on both
   *  Service 01 and Service 02, not a separate div), alternating the same
   *  way `ServiceStoryRow` already alternates rows 03–05. */
  accent?: "purple" | "teal";
}

/** Configurable FINWIWO service row (Phase 7C.5 for Service 01, extended
 * Phase 7C.6 for Service 02) — shares one skeleton (capsule → H2 →
 * paragraph → checklist → CTA, 72px desktop row padding, 60/40 text/photo
 * split, identical typography) confirmed IDENTICAL between FINWIWO's
 * "Unser Steuerservice" (row 1, top=3096px, h=588px) and "Vorsorge" (row
 * 2, top=3785px, h=588px) rows. Only the photo geometry differs between
 * the two — side, mask shape, and mobile bleed — which is why those are
 * props rather than hardcoded, per Phase 7C.6's explicit instruction not
 * to assume "same component, odd/even = reverse" without confirming it.
 *
 * Row 2 vs row 1, confirmed live: column direction FLIPS (photo moves
 * left, text moves right — FINWIWO's own `vc_col-sm-2/5` then
 * `vc_col-sm-3/5` in that DOM order, vs row 1's reverse); mask shape
 * changes from a single 140px corner to a full-side 300px/15px stadium;
 * mobile padding is symmetric 34px (row 1 was asymmetric 68.6/34.3);
 * mobile photo is inset in the content gutter, not full-bleed (row 1 was
 * full-bleed) — row 2 has no `reverse_columns_column_phone` class in
 * FINWIWO's markup because its image is already first in DOM (matching
 * its desktop-left position), unlike row 1 which needs that class to
 * reorder. Capsule/H2/paragraph/checklist/CTA styling is identical
 * between both rows (only label/copy differs) — confirmed measured.
 *
 * Scroll: row 2's image wrapper carries FINWIWO's `nectar-mask-reveal`
 * class (absent on row 1), suggesting an intended one-time reveal-on-
 * enter animation — but sampled before/10/25/50/75/after (including
 * incremental scroll from 1800px away, not just a teleport) shows
 * identical transform/opacity/clip-path at every point. No animation
 * could actually be observed, so this stays static rather than guessing
 * at unobserved parameters.
 *
 * Row 3 (Phase 7C.7, "Hypothek", top=4373px, h=557px — 31px shorter than
 * rows 1–2, purely from 3 checklist items instead of 4, not a fixed-
 * height violation) confirmed this is genuinely a 3-value system, not an
 * odd/even toggle: image side reverts to the right (like row 1), but the
 * mask is row 2's full stadium, mirrored (`tr_br_300px br_br_300px`, i.e.
 * `imageSide="right"` + `maskStyle="stadium"` — a combination neither
 * row 1 nor row 2 used, so the prop system already covered it with zero
 * new code). Mobile matches row 2's pattern (symmetric ~34px padding,
 * inset photo, not full-bleed), not row 1's. Capsule/H2/paragraph/
 * checklist/CTA styling identical again. Scroll: static at every sampled
 * point, same as rows 1–2 (including far-before at −1800px). Hover:
 * the CTA pill darkens slightly on hover, no scale/translate/border
 * change — matches the `hover:bg-purple-600` darken already implemented
 * below, no change needed.
 *
 * Row 4 (Phase 7C.8, "Versicherungen", top=4930px, h=612px — the tallest
 * row yet, from a 3-line paragraph) turned out to genuinely repeat row
 * 2's exact configuration (`imageSide="left"` + `maskStyle="stadium"`,
 * symmetric ~34px mobile padding, inset mobile photo) rather than
 * alternating from row 3 — confirmed independently, not assumed. One
 * false alarm during measurement: row 4's capsule ("Vermögen schützen")
 * first appeared to be missing from a screenshot, because the row's
 * `vc_row-o-content-middle` vertical-centering pushes shorter text
 * blocks down from the row's top edge, and the capsule sat just past the
 * first screenshot's crop — confirmed present via direct DOM inspection
 * (`nectar-badge` class) and a re-crop. Scroll: static at every sampled
 * point again (including far-before at −1800px). Hover: same CTA darken,
 * no other change.
 *
 * Row 5 (Phase 7C.9, "Vermögen", top=5442px, h=557px) repeats row 3's
 * exact configuration (`imageSide="right"` + `maskStyle="stadium"`,
 * mirrored). This closes out all five rows as five instances of only
 * two mask/side combinations plus row 1's unique single-corner one —
 * a small finite set of variants, not five individually authored rows
 * and not a simple alternation. One false alarm during measurement: the
 * first screenshot appeared to show an abstract flat illustration
 * instead of a photo — this was a lazy-load render caught mid-transition
 * (confirmed complete/loaded via `img.complete` + `naturalWidth`, and a
 * longer wait produced a normal photograph). Row 5's own measured mobile
 * padding is asymmetric bottom-heavy (34.3px top / 68.6px bottom, the
 * mirror of row 1's top-heavy 68.6/34.3) — because row 5 sits flush
 * against a full-bleed video testimonial section with zero gap, so
 * FINWIWO pads row 5's own bottom instead. This component's mobile
 * `pt-8 pb-[68px]` is shared, fixed markup across all five rows (not a
 * prop), so it isn't row-specific either way — left as is, consistent
 * with the already-approved rows 1–4, rather than adding a one-off
 * padding prop for a subtle difference. Scroll: static at every sampled
 * point (including far-before at −1800px). Hover: same CTA darken, no
 * other change. This was the last homepage service row — Phase 7C.10
 * covers whatever comes after it (a video testimonial section, per the
 * live boundary inspection). */
export function ServiceHighlightRow({
  service,
  visual,
  extra,
  basePath,
  imageSide = "right",
  maskStyle = "corner",
  mobileBleed = true,
}: ServiceHighlightRowProps) {
  const isLeft = imageSide === "left";

  const desktopMaskClass =
    maskStyle === "stadium"
      ? isLeft
        ? "rounded-l-[300px] rounded-r-[16px]"
        : "rounded-r-[300px] rounded-l-[16px]"
      : isLeft
        ? "rounded-tl-[140px]"
        : "rounded-tr-[140px]";

  const mobileMaskClass =
    maskStyle === "stadium"
      ? isLeft
        ? "rounded-l-[64px] rounded-r-[16px]"
        : "rounded-r-[64px] rounded-l-[16px]"
      : isLeft
        ? "rounded-bl-[64px]"
        : "rounded-br-[64px]";

  /* Phase 9A — cleaner editorial row: image + title + copy + link.
   * Removed: the purple/teal accent crescent behind every photo (a NEOSURA
   * addition — the reference shows only the masked photograph), the solid
   * purple chip (now a quiet tint in the same 32px / 10px geometry) and the
   * purple pill CTA (now a text link with an arrow; the service name is
   * added for screen readers so five "Mehr erfahren" links stay distinct).
   * Motion: the row enters as one group (`Reveal`), hovering the row eases
   * the photo to 1.02 (pointer devices only) and advances the arrow. */
  return (
    <Reveal className="img-zoom-trigger overflow-hidden">
      <div
        className={cn(
          "relative h-[300px] overflow-hidden sm:h-[380px] lg:hidden",
          mobileBleed ? "-mx-6 w-[calc(100%+3rem)] sm:-mx-8 sm:w-[calc(100%+4rem)]" : "w-full",
          mobileMaskClass
        )}
      >
        <Image
          src={visual.photo}
          alt={visual.alt}
          fill
          loading="lazy"
          sizes="100vw"
          className="img-zoom object-cover"
          style={{ objectPosition: visual.objectPosition }}
        />
      </div>

      <Container className="pt-10 pb-[70px] lg:py-[88px]">
        <div className="lg:flex lg:items-center lg:gap-[72px]">
          <div className={cn("lg:w-[47%]", isLeft ? "lg:order-1" : "lg:order-2")}>
            <div className={cn("relative hidden overflow-hidden lg:block lg:h-[512px]", desktopMaskClass)}>
              <Image
                src={visual.photo}
                alt={visual.alt}
                fill
                loading="lazy"
                sizes="40vw"
                className="img-zoom object-cover"
                style={{ objectPosition: visual.objectPosition }}
              />
            </div>
          </div>

          <div className={cn("lg:w-[53%]", isLeft ? "lg:order-2" : "lg:order-1")}>
            <span className="inline-flex h-[32px] items-center rounded-[10px] bg-purple/[0.08] px-4 text-[1rem] font-light tracking-[-0.1px] text-purple">
              {extra.capsule}
            </span>

            {/* Reference rhythm: heading mt 15 / mb 10, body directly beneath
                at mt 0, list items on a 31px step (lh 20.8 + 10px gap), body
                measure 509px. */}
            <h2 className="mt-[15px] mb-[10px] max-w-[22ch] text-[1.9rem] font-normal leading-[1.17] tracking-normal text-ink lg:text-[1.875rem]">
              {service.title}
            </h2>

            <p className="max-w-[509px] text-[1rem] font-light leading-[1.5] text-ink-soft">{service.body}</p>

            {extra.checklist.length > 0 && (
              <ul className="mt-6 flex flex-col gap-[10px]">
                {extra.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[1rem] font-light leading-[1.3] text-ink">
                    <span aria-hidden className="mt-[0.15em] text-purple">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="h-[1em] w-[1em]"><path d="M4 10.5l4 4 8-9" /></svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            <Link
              href={`${basePath}/${service.slug}`}
              className="arrow-trigger mt-8 inline-flex items-center gap-2 text-[0.95rem] font-medium text-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
            >
              <span className="link-line pb-[3px]">
                Mehr erfahren<span className="sr-only"> über {service.title}</span>
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className="arrow-shift h-4 w-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </Reveal>
  );
}
