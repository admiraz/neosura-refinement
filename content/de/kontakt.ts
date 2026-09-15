/** Phase 7W — restores the FULL verbatim §4.20 intro sentence. Phase
 * 7M.1 had deliberately dropped this sentence's middle clause ("...oder
 * buchen Sie direkt einen Termin, vor Ort in Cham, per Video oder
 * Telefon") because no booking mechanism existed and displaying it
 * risked implying one did. This phase's own explicit brief requires the
 * sentence verbatim and separately handles the booking gap honestly (a
 * documented LAUNCH BLOCKER, no fake Calendly/booking widget — see
 * `ContactInfoPanel`) — the sentence itself only describes the channels
 * a reply can happen through (in person, video, phone), not a specific
 * self-service booking tool, so reproducing it verbatim no longer
 * overstates functionality once the booking gap is handled honestly
 * elsewhere on the page. */
export const kontaktContent = {
  heading: "Reden wir über Ihre Versicherungen.",
  lead: "Schreiben Sie uns oder buchen Sie direkt einen Termin, vor Ort in Cham, per Video oder Telefon. Wir melden uns innert eines Arbeitstages.",
};
