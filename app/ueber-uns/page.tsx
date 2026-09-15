import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { clientGuideTopicCta } from "@/content/de/clientGuide";
import { Container } from "@/components/ui/Container";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutFocus } from "@/components/about/AboutFocus";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutReviews } from "@/components/about/AboutReviews";
import { ServicePrinciples } from "@/components/service-detail/ServicePrinciples";
import { CategoryTopicCta } from "@/components/category/CategoryTopicCta";

export const metadata: Metadata = pageMetadata({
  path: "/ueber-uns",
  title: `Über neosura | Ihr Versicherungsbroker`,
  description: "Unabhängiger, FINMA-registrierter Versicherungsbroker in Cham. Lernen Sie unser Team und unsere Arbeitsweise kennen.",
});

/** Phase 7U — rebuilds `/ueber-uns` onto the client's required structure:
 * Hero → Team → Reviews → Four principles → standard CTA. `AboutHero`/
 * `AboutFocus`/`ServicePrinciples` are unchanged (H1/intro exact §4.18
 * copy, verbatim, unchanged since Phase 7M.1; principles are the four
 * locked NEOSURA principles, unchanged).
 *
 * REMOVED — `ServiceApproach` (this page's own former third section):
 * it rendered `processSteps`, an OLDER 3-step "Analyse/Struktur/
 * Begleitung" narrative that conflicts with the canonical 5-step §4.16
 * advisory journey now properly built on `/ablauf` (Phase 7S). Per this
 * phase's own "do not invent" focus and the project's standing "there is
 * only one canonical process" rule, this page no longer duplicates a
 * second, inconsistent process summary — `ServiceApproach.tsx` and its
 * `processSteps` data (both now fully unused anywhere in the app,
 * confirmed via a repo-wide search) were deleted rather than left as
 * dead code.
 *
 * ADDED — `AboutTeam`/`AboutReviews` (see their own docstrings): the
 * client guide requires a team grid (photo/name/role/FINMA number/email
 * per advisor) and embedded real Google reviews. Neither data set has
 * been supplied. Per this phase's own explicit "never invent them" rule,
 * NO team members, photos, FINMA numbers, or reviews/ratings/quotes are
 * fabricated — both sections render a clearly-labeled, honest pending
 * state instead, matching the same placeholder convention already
 * established on `/erstinformation`. LAUNCH CONTENT BLOCKERS documented
 * in both components and in `docs/finwiwo-architecture/deep-ueber-uns.md`.
 *
 * FINMA CLAIM — `about.paragraphs[0]` states neosura is "im FINMA-
 * Vermittlerregister eingetragener Versicherungsbroker" — this is the
 * client guide's own supplied positioning copy (§4.18), reused verbatim;
 * it does NOT state a specific register number (which remains an
 * unresolved placeholder elsewhere, e.g. `/impressum`) — no number is
 * invented or implied here.
 *
 * HERO PHOTOGRAPHY — `AboutHero` reuses `manifesto-advisor.webp` with a
 * neutral, non-attributing alt text ("Beratungsgespräch in einem
 * modernen Büro") — it is NOT captioned or presented as "unser Team";
 * per this phase's own "do not present stock people as NEOSURA team"
 * rule, this is compliant as-is (ambient editorial imagery, not a false
 * team photo) and was left unchanged.
 *
 * CTA — `CategoryTopicCta` (locked, exact guide §7 copy, verbatim)
 * replaces the generic `FinalCta` band this page previously ended with —
 * matching the client's own explicit "standard CTA" requirement and
 * carrying this page's one restrained bear instance (its own existing
 * icon). No social/LinkedIn links were added anywhere (none supplied —
 * not invented). */
export default function UeberUnsPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      <AboutHero />
      <AboutFocus />
      {/* Phase 8J — the two honest "Noch ausstehend" notes share one row on
          the story's white surface instead of two boxed cards in their own
          bands (which left dead half-width space beside each at desktop). */}
      <section className="bg-white">
        <Container className="pb-14 pt-12 lg:pb-[72px] lg:pt-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-x-[96px]">
            <AboutTeam />
            <AboutReviews />
          </div>
        </Container>
      </section>
      <ServicePrinciples />
      <CategoryTopicCta
        title={clientGuideTopicCta.title}
        body={clientGuideTopicCta.body}
        buttonLabel={clientGuideTopicCta.button}
        buttonHref="/analyse"
      />
    </main>
  );
}
