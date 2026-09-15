import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

interface CategoryTopicCtaProps {
  title: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
}

/** Phase 7E.10 — the client guide's required standard end-of-topic
 * "analysis CTA" (guide §7's reusable "Bereit für den Überblick?" block),
 * built after live-auditing three separate FINWIWO page types
 * (`/unternehmen/`, `/versicherungen/`, `/hypothek/`) and finding the
 * SAME result on all three: FAQ → Newsletter → rotating brand strip →
 * Footer, with NO dedicated closing-CTA card anywhere on the live site.
 * FINWIWO genuinely has no "closest CTA architecture" to measure here —
 * documented, not assumed — so this reuses the compact icon/H2/body/CTA
 * "conversion family" grammar already independently verified elsewhere
 * in this project (the newsletter modules: `AdvisoryConversion`,
 * `CategoryNewsletter`), rather than the large 50vw-photo `CategoryClosing`
 * card, which is itself a NEOSURA-authored substitute (its own docstring
 * says so) and whose photo slot is too large for a restrained bear
 * without either overpowering the section or looking broken.
 *
 * The compact family's small circular icon slot (64-72px, the same size
 * already used for `CategoryNewsletter`'s mail icon) is a genuine,
 * appropriately-sized decorative slot — filled here with a cropped `bear-
 * trust.webp` illustration (already-licensed NEOSURA brand asset) instead
 * of a generic glyph, satisfying the client's brand requirement without
 * a mascot-heavy redesign: no new column, no extra height, same
 * footprint a generic icon would have occupied.
 *
 * Copy is the client guide's exact §7 text, verbatim, not FINWIWO's
 * (which doesn't offer any to reuse here anyway). The "innert zwei
 * Arbeitstagen" response-time line is a CLIENT-SUPPLIED OPERATING CLAIM
 * from the guide itself, not verified/invented by this build. Button
 * targets `/analyse` directly — never `#beratung-unternehmen` or any
 * in-page anchor — matching the guide's own canonical CTA destination.
 * Purple (the sitewide primary-CTA/`/analyse` color, matching the nav's
 * own "Kostenlose Analyse" button) differentiates this section from the
 * teal-accented `/unternehmen` content above it and the teal newsletter
 * module immediately preceding it.
 *
 * Phase 7I — vertical rhythm tightened (`py-16/py-20` → `py-14/py-16`,
 * `mt-6`/`mt-8` → `mt-5`/`mt-6`) per this phase's own explicit
 * "cleanliness over decoration" correction: the original spacing read as
 * a taller, emptier block than FINWIWO's own restrained rhythm. This is
 * a shared-component change — regression-screenshotted on `/unternehmen`,
 * Krankenkasse, Wohnen & Eigentum, and Fahrzeug & Reisen (all four of
 * this component's existing usages) before landing; no other prop or
 * behavior changed.
 *
 * Phase 7SYS.B — tightened again after direct screenshot review found
 * the block still reads as sparse (`py-14/16` → `py-10/12`,
 * `mt-5`/`mt-4`/`mt-6` → `mt-4`/`mt-3`/`mt-5`). Icon size deliberately
 * NOT reduced (kept at 64/72px) — Section 20 of this phase's own brief
 * ("solve excess space through layout, not decoration") and this icon's
 * own established parity with `CategoryNewsletter`'s icon slot both
 * argue against shrinking it. */
export function CategoryTopicCta({ title, body, buttonLabel, buttonHref }: CategoryTopicCtaProps) {
  return (
    <section className="bg-white">
      <Container className="py-10 text-center lg:py-12">
        <span
          aria-hidden
          className="mx-auto inline-flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full border border-line lg:h-[72px] lg:w-[72px]"
        >
          <Image
            src="/images/bear-trust.webp"
            alt=""
            width={144}
            height={144}
            className="h-full w-full scale-[2.3] object-cover object-[52%_40%]"
          />
        </span>

        <h2 className="mx-auto mt-4 max-w-[26ch] text-[1.9rem] font-normal leading-[1.15] text-ink lg:text-[2.3rem]">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-[52ch] text-[1.02rem] leading-[1.5] text-ink-soft lg:text-[1.08rem]">
          {body}
        </p>

        <Link
          href={buttonHref}
          className="mt-5 inline-flex h-[50px] items-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600"
        >
          {buttonLabel}
        </Link>
      </Container>
    </section>
  );
}
