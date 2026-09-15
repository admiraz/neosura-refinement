# Legal Launch Blockers

Phase 7Y. This document lists every unresolved legal/regulatory field across `/impressum`,
`/erstinformation`, and `/datenschutz`. None of these are invented anywhere in the codebase — each renders
as a clearly marked pending item or bracketed placeholder. **Go-live is blocked while any mandatory item
below remains unresolved.**

## Impressum (`content/de/legal.ts` → `impressum`)

| Field | Current state | Required input |
|---|---|---|
| Vollständige Firma gemäss Handelsregister | `[VOLLSTÄNDIGE FIRMA GEMÄSS HANDELSREGISTER]` | Exact registered legal entity name |
| Telefonnummer | `[TELEFONNUMMER VERIFIZIERT]` | Confirmation that `+41 44 500 12 34` (displayed elsewhere on the site) is the correct, verified number — or the correct number if not |
| Handelsregisterkanton | `[KANTON GEMÄSS HR-AUSZUG]` | Canton per the actual HR extract (the guide itself flags the old live site's "Zürich" as likely wrong given the Cham/Zug address) |
| FINMA-Registernummer | `[FINMA-REGISTERNUMMER]` | The real FINMA intermediary register number |
| Vertretungsberechtigte Person | `[NAME GESCHÄFTSFÜHRUNG]` | Name of the authorised representative |
| UID | CHE-330.617.129 — **resolved**, correctly labeled UID (not FINMA-Nr.) | None — already correct |

## Erstinformation (Art. 45 VAG) (`app/erstinformation/page.tsx`)

Entire page content is pending — currently a route/IA scaffold listing what's outstanding, per its own
explicit "do not invent" instruction. Required before this page (and its eventual identical downloadable
PDF) can be written:

| Field | Status |
|---|---|
| Vollständiger juristischer Firmenname | Missing |
| Handelsregisterkanton (bestätigt) | Missing |
| FINMA-Registernummer als Versicherungsvermittler | Missing |
| Untied-intermediary status confirmation (Art. 40 Abs. 2 VAG) | Stated in Impressum's Aufsichtsbehörde section; needs Erstinformation-specific elaboration |
| Vergütungsart (remuneration type/detail) | General statement exists (`clientGuideAblauf.kostenblock`, §4.16, verbatim: "marktübliche Vermittlungsentschädigungen") — Erstinformation needs the fuller Art. 45/45b-level detail |
| Art. 45b Handling | Missing |
| Liste der Partner-/Kooperationsgesellschaften | Missing |
| Berufshaftpflichtversicherung (professional indemnity) details | Missing |
| Datenverarbeitung/-weitergabe (Erstinformation-specific detail) | General principle exists in Datenschutz §3/§5; Erstinformation needs its own regulated-context statement |
| Aus-/Weiterbildung (training/continuing education) | Missing |
| Zuständige Ombudsstelle | Missing |
| Downloadable identical PDF | Not producible until the above is complete — producing one now would be a falsely-final document |

## Datenschutz (`content/de/legal.ts` → `datenschutz`)

Sections 1-3 and 7-8 are verbatim from the live neosura.ch site. Sections 4-6 (uploaded-document handling,
tools used, EDÖB complaint path) were added this phase, grounded only in what this project's own code
directly proves (Resend for e-mail, no analytics, no permanent file storage, one Google Maps embed on
`/kontakt`) — not a claim of final legal completeness.

| Field | Status |
|---|---|
| Hosting provider/location | Not present anywhere in this repository's own configuration — not stated (no guess made) |
| Complete, client-confirmed tool list | Only what this project's own code proves (Resend, Google Maps embed) is documented; a broader confirmed list (e.g. any future analytics, newsletter provider) is still needed |
| Newsletter provider / double opt-in | Separate, already-documented project-wide launch blocker (no newsletter is live anywhere on the site) |
| Cookie banner | Not added — no non-essential tracking exists to disclose (verified via repo-wide search); re-evaluate if analytics/tracking is ever added |
| Final client legal draft | Not supplied — current content is a good-faith, code-verified placeholder |

## Footer

`Erstinformation` was missing from the Footer's "Rechtliches" column — added this phase
(`content/de/footer.ts`). No FINMA-register external link was added — NEOSURA's own real register
entry/URL is not yet known; adding a generic `finma.ch` reference (already present in the Impressum
Aufsichtsbehörde section) is as far as this can honestly go without a confirmed entry.

## FINMA / UID labeling

Verified sitewide: `CHE-330.617.129` appears only in `content/de/legal.ts` → `impressum`, correctly labeled
`UID:` — never labeled as a FINMA number anywhere in the codebase.

## Bears on legal pages

Verified: `LegalContent` (used by `/impressum` and `/datenschutz`) and `/erstinformation`'s own page render
zero mascot/bear imagery — plain typography only, as required.
