/** Phase 7U — client guide §4.18 requires a team grid (photo, name, role,
 * FINMA register number, e-mail per advising person). None of that data
 * has been supplied — per this phase's own explicit "DO NOT INVENT TEAM
 * MEMBERS" rule, no placeholder people, photos, or FINMA numbers are
 * fabricated here. This renders a clearly-labeled non-public placeholder
 * state instead of a live team grid, matching the same honest-blocker
 * pattern already established on `/erstinformation`.
 *
 * Phase 8J — rendered as a quiet open note (hairline, 23/500 heading,
 * the unchanged pending wording at 16/300/24) inside the page's shared
 * team/reviews row instead of a boxed card in its own band, which left
 * a dead half-width gap beside it at desktop. Wording unchanged.
 *
 * LAUNCH CONTENT BLOCKER — VERIFIED TEAM DATA REQUIRED (photo, name,
 * role, FINMA register number, e-mail per advising person) before this
 * section can render a real team grid. */
export function AboutTeam() {
  return (
    <div className="border-t border-line-soft pt-6">
      <h2 className="text-[1.3125rem] font-medium leading-[27px] tracking-[-0.21px] text-ink lg:text-[1.4375rem] lg:leading-[29px] lg:tracking-[-0.23px]">
        Unser Team
      </h2>
      <p className="mt-3 text-[0.78rem] uppercase tracking-[0.14em] text-muted">Noch ausstehend</p>
      <p className="mt-2 max-w-[480px] text-[1rem] font-light leading-[24px] text-ink-soft">
        Die Team-Angaben (Foto, Name, Funktion, FINMA-Registernummer und E-Mail je Beraterin/Berater) liegen noch
        nicht vollständig vor und werden nicht erfunden, sondern ergänzt, sobald sie vom Unternehmen bestätigt
        sind.
      </p>
    </div>
  );
}
