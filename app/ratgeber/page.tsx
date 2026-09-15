import type { Metadata } from "next";
import Link from "next/link";
import { siteMeta } from "@/content/de/site";
import { pageMetadata } from "@/lib/seo";
import { clientGuideTopicCta } from "@/content/de/clientGuide";
import { Container } from "@/components/ui/Container";
import { CategoryTopicCta } from "@/components/category/CategoryTopicCta";

export const metadata: Metadata = pageMetadata({
  path: "/ratgeber",
  title: `Ratgeber | ${siteMeta.name}`,
  description: "Hintergrundwissen und Orientierung zu Versicherungsthemen.",
});

/** Phase 7X — full rebuild of `/ratgeber` as NEOSURA's editorial guide
 * hub, in its Case-C (no real content) form. See
 * `docs/finwiwo-architecture/deep-ratgeber.md` for the complete
 * measurement/inventory record; summary:
 *
 * LIVE REFERENCE — audited `https://finwiwo.ch/` for an editorial hub.
 * Its own "Checklisten & Ratgeber" mega-menu item resolves to a bare
 * `<a href="#">` with no submenu — a placeholder on the reference site
 * itself, not a real live page. Every plausible route
 * (`/ratgeber/`, `/magazin/`, `/wissen/`, `/blog/`, etc.) 404s. There is
 * genuinely no FINWIWO editorial architecture to measure right now — not
 * a case of an old screenshot being reused instead of a fresh audit.
 *
 * CONTENT INVENTORY — a repo-wide search (this phase, independently) and
 * `docs/CLIENT_GUIDE_MERGE.md` (predating this phase) both confirm ZERO
 * article content exists anywhere in this project. The guide's own §4.21
 * states article content is "delivered separately by the client, not
 * part of this brief" — writing articles is explicitly out of scope, not
 * an oversight. The one known topic ("Neu in der Schweiz:
 * Krankenversicherung in 3 Monaten geregelt") is a WORKING TITLE ONLY —
 * per this phase's own explicit rule, NOT invented into a fake article.
 *
 * THEREFORE — Case C (per this phase's own Section 9): a truthful
 * Ratgeber landing state, not an empty giant card grid, not fake
 * published articles. H1 ("Ratgeber") and the intro sentence are BOTH
 * pre-existing, already-approved scaffold copy from Phase 7M.0 —
 * unchanged, not rewritten into a larger marketing paragraph just to
 * fill space.
 *
 * "THEMEN, DIE WIR VORBEREITEN" — a plain, editorial-toned navigation
 * list, DELIBERATELY not styled as article cards (no thumbnails, no
 * per-item metadata, no card border/shadow/radius) so nothing on this
 * page could be mistaken for a published article. Every one of the 7
 * entries is a real `next/link` to an existing, live NEOSURA page (5
 * private insurance topics + the 2 life-situation pages) — genuine
 * routing per this page's own stated job ("route readers into relevant
 * NEOSURA insurance pages"), not fabricated article destinations. Labels
 * reuse the already-approved topic/service names verbatim; the short
 * orientation phrase per item is STRUCTURALLY DERIVED (a plain
 * restatement of the topic, no new claims).
 *
 * OMITTED: featured-article module (no real article to feature),
 * category filters (zero content volume to filter), pagination (nothing
 * to paginate), Newsletter (no FINWIWO ending to reference, and would
 * add bulk to an already content-thin page), FAQ (no authoritative
 * Ratgeber FAQ exists), any product-page module (`ServiceHeroSplit`,
 * `WohnenEditorialRow`, comparison tables, insurance FAQ/process — this
 * is an editorial page family, not a product page).
 *
 * CTA — `CategoryTopicCta` (exact guide §7 copy, verbatim) closes the
 * page, matching every other real-content page in this project (the one
 * documented exception, `/schadenfall`, has an explicit client
 * instruction excluding it — no such exclusion exists here) and giving
 * this content-thin page a genuine next action. Carries this page's one
 * restrained bear instance.
 *
 * Motion: none — no live reference exists to measure a motion family
 * from, so the only honest choice is fully static. */
const TOPICS_IN_PROGRESS = [
  { label: "Krankenkasse", body: "Grundversicherung, Zusatzversicherung und der jährliche Wechsel.", href: "/privatkunden/krankenkasse" },
  { label: "Wohnen & Eigentum", body: "Hausrat, Haftpflicht und Gebäudeversicherung.", href: "/privatkunden/wohnen-eigentum" },
  { label: "Fahrzeug & Reisen", body: "Motorfahrzeug- und Reiseversicherung im Überblick.", href: "/privatkunden/fahrzeug-reisen" },
  { label: "Vorsorge", body: "Säule 3a, Säule 3b und Lebensversicherung.", href: "/privatkunden/vorsorge" },
  { label: "Rechtsschutz & Cyber", body: "Rechtliche Konflikte und digitale Risiken.", href: "/privatkunden/rechtsschutz-cyber" },
  { label: "Familie", body: "Der Versicherungs-Check nach der Familiengründung.", href: "/themen/familie" },
  { label: "Neu in der Schweiz", body: "Das Schweizer Versicherungssystem für Zuzügerinnen und Zuzüger.", href: "/themen/neu-in-der-schweiz" },
];

export default function RatgeberPage() {
  return (
    <main className="flex-1 pt-12 sm:pt-[63px] lg:pt-[91px]">
      {/* Phase 8J — FINWIWO still publishes no archive (every /ratgeber/,
          /magazin/, /blog/, /news/, /wissen/, /insights/ route re-checked:
          404), so the closest editorial reference is the "Der Schweizer
          Finanz-Ratgeber für …" module on its life pages: a centred
          30/400/35 heading over a 16/300/24 line. The hero follows the
          approved page-title family (48/900/50, 16/300/24 intro in 600px);
          it was 41.6/700 over 17.6/400. Copy unchanged, including the
          truthful "Die ersten Beiträge folgen in Kürze." */}
      <Container className="pb-12 pt-10 lg:pb-[72px] lg:pt-[72px]">
        <h1 className="text-[1.875rem] font-black leading-[34px] tracking-normal text-ink lg:text-[3rem] lg:leading-[50px]">Ratgeber</h1>
        <p className="mt-5 max-w-[600px] text-[1rem] font-light leading-[24px] text-ink">
          Hintergrundwissen und Orientierung zu Versicherungsthemen. Die ersten Beiträge folgen in Kürze.
        </p>
      </Container>

      {/* Phase 8J — the zero-article state as a deliberate editorial index
          rather than a grid: the seven topics were a 3-column grid that
          left the seventh alone on its last row. One column of hairline-
          divided rows (label 23/500, its one-line orientation 16/300/24,
          a static arrow) reads as a table of contents, cannot orphan an
          item, and still links only to real, live NEOSURA pages — nothing
          here looks like, or pretends to be, a published article. Static,
          as there is no reference motion to measure. */}
      <section className="bg-white">
        <Container className="py-14 lg:py-[72px]">
          <h2 className="text-center text-[1.6875rem] font-normal leading-[32px] tracking-normal text-ink lg:text-[1.875rem] lg:leading-[35px]">
            Themen, die wir vorbereiten
          </h2>
          <p className="mx-auto mt-3 max-w-[60ch] text-center text-[1rem] font-light leading-[24px] text-ink-soft">
            Bis die ersten Beiträge erscheinen, finden Sie hier direkt die passende Seite zum Thema.
          </p>

          <ul className="mx-auto mt-10 max-w-[1083px] border-t border-line-soft lg:mt-12">
            {TOPICS_IN_PROGRESS.map((topic) => (
              <li key={topic.href} className="border-b border-line-soft">
                <Link
                  href={topic.href}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-1 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-purple md:grid-cols-[280px_minmax(0,1fr)_auto] lg:py-6"
                >
                  <span className="text-[1.3125rem] font-medium leading-[27px] tracking-[-0.21px] text-ink lg:text-[1.4375rem] lg:leading-[29px] lg:tracking-[-0.23px]">
                    {topic.label}
                  </span>
                  <span className="col-start-1 row-start-2 text-[1rem] font-light leading-[24px] text-ink-soft md:col-start-2 md:row-start-1">
                    {topic.body}
                  </span>
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                    className="col-start-2 row-span-2 row-start-1 h-4 w-4 text-purple md:col-start-3 md:row-span-1"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CategoryTopicCta
        title={clientGuideTopicCta.title}
        body={clientGuideTopicCta.body}
        buttonLabel={clientGuideTopicCta.button}
        buttonHref="/analyse"
      />
    </main>
  );
}
