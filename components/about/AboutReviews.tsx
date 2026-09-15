/** Phase 7U — client guide requires embedded, real Google reviews (real
 * rating, real review count). No verified review data/source has been
 * supplied — per this phase's own explicit rule, no fake stars, review
 * counts, or sample testimonials are fabricated here.
 *
 * Phase 8J — same quiet open note as `AboutTeam`, sharing its row;
 * wording unchanged.
 *
 * LAUNCH CONTENT BLOCKER — VERIFIED GOOGLE REVIEWS REQUIRED (a connected
 * Google Business Profile or an equivalent verified data source) before
 * this section can render real reviews. */
export function AboutReviews() {
  return (
    <div className="border-t border-line-soft pt-6">
      <h2 className="text-[1.3125rem] font-medium leading-[27px] tracking-[-0.21px] text-ink lg:text-[1.4375rem] lg:leading-[29px] lg:tracking-[-0.23px]">
        Bewertungen
      </h2>
      <p className="mt-3 text-[0.78rem] uppercase tracking-[0.14em] text-muted">Noch ausstehend</p>
      <p className="mt-2 max-w-[480px] text-[1rem] font-light leading-[24px] text-ink-soft">
        Verifizierte Google-Bewertungen sind noch nicht angebunden. Diese Sektion zeigt echte Bewertungen, sobald
        eine verifizierte Datenquelle vorliegt — keine erfundenen Sterne oder Zitate.
      </p>
    </div>
  );
}
