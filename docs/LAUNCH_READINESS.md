# NEOSURA V2 — Launch Readiness

Phase 7Z (final site-wide QA) + Phase 7Z.A (confirmed-issue corrections). This document is the single
source of truth on what's blocking production launch. **DESIGN/ENGINEERING COMPLETE** and **PRODUCTION
LAUNCH READY** are two different statuses — see the bottom of this document.

## 0. Phase 7Z.A corrections (this phase — fixed, not deferred)

Every change below maps to a concrete audit finding, not a speculative cleanup pass.

| Issue | Before | Fix | After |
|---|---|---|---|
| Stale "Vorsorge & Vermögen" topic label on `/ratgeber` | `{ label: "Vorsorge & Vermögen", ... }` | Renamed to the current canonical title | `{ label: "Vorsorge", ... }` (`app/ratgeber/page.tsx`) |
| Stale service names in `/privatkunden`'s own FAQ answer, desynced from its own cited source | "Gesundheit, Wohnen & Eigentum, Fahrzeug & Reisen, Vorsorge & Vermögen sowie Recht & Cyber" (comment claimed "Source: privateServices titles" but 3 of 5 no longer matched after an earlier rename) | Re-synced to the actual current `privateServices` titles | "Krankenkasse, Wohnen & Eigentum, Fahrzeug & Reisen, Vorsorge sowie Rechtsschutz & Cyber" (`app/privatkunden/page.tsx`) |
| Stale "Vorsorge & Vermögen" homepage Hero slide (eyebrow + headline) | `eyebrow: "Vorsorge & Vermögen"`, `headlineLines: ["Vorsorge &", "Vermögen"]` | Renamed to match the current canonical title, headline rewritten in the same short benefit-phrase style every sibling slide already uses (verified against all 6 slides) | `eyebrow: "Vorsorge"`, `headlineLines: ["Vorsorge für", "Ihre Zukunft"]` (`content/de/hero.ts`) |
| `/erstinformation` missing from the production sitemap | Explicitly excluded via a prior-phase comment ("intentionally excluded until regulated content is complete") | Re-included — the page is honest (discloses its own pending fields, not fake), so there's no reason to hide a real, non-broken route from discovery | Present in `app/sitemap.ts`; verified via a live `/sitemap.xml` fetch (`hasErstinformation: true`) |

**Explicitly NOT changed** (audited, classified, left alone with reasoning):
- `content/de/about.ts`'s own "...sowie Vorsorge & Vermögen..." sentence (`/ueber-uns`): this is narrative
  prose using an internally-consistent older naming style throughout the whole sentence (it also says
  "Gesundheit" and "Mobilität, Reisen" rather than the current literal service titles) — it does not claim
  to mirror the current nav taxonomy the way the Privatkunden FAQ explicitly did, so rewriting it would be
  altering established "approved" copy on a stylistic judgment call rather than fixing a confirmed
  desync bug. Classified: historical/narrative copy, not literal taxonomy — flagged for the client's own
  review, not silently rewritten.
- `content/de/deep/vorsorge-vermoegen.ts`'s own `process.heading: "Unser Ansatz bei Vorsorge & Vermögen"` —
  confirmed via import-chain inspection that this field is never actually rendered by
  `app/privatkunden/vorsorge/page.tsx` (that page uses `h1`/`intro`/`heroItems`/`system`/
  `vermoegensaufbau`/`absicherung`/`faq` only). Classified: dead/unused internal data, zero visible impact,
  not worth touching per "don't rewrite historical docs unnecessarily."
- Homepage bear count on first paint (`0`): the Hero carousel's first "brand" slide deliberately shows the
  NEOSURA wordmark instead of a mascot (`DesktopHeroScene.tsx`'s own `{!isBrand && <HeroVisual ... />}`
  condition) — a pre-existing, deliberate design choice from an earlier phase, not a bug introduced or
  found broken this phase. Over a full rotation the homepage does show 5 distinct bear mascots (all slides
  except "brand"). Flagged for awareness, not modified — changing it would mean reopening a locked,
  mature Hero component outside this phase's "fix only confirmed issues" scope.
- `/privatkunden` hub bear count (`0`, vs. `/unternehmen` hub's `1`): the hub ends with `CategoryFaq`, no
  `CategoryTopicCta`/bear-bearing module. This is an inconsistency between two sibling hub pages worth
  surfacing, but Section 1 of this phase's own brief locks the hub page family ("DO NOT visually redesign
  unless fixing a genuine bug") — since it's ambiguous whether this is a bug or an intentional B2C/B2B
  asymmetry, it was documented rather than unilaterally changed.

## 1. Canonical route matrix

All expected routes verified 200:

| Route | Status |
|---|---|
| `/` | 200 |
| `/privatkunden` + 5 product pages | 200 |
| `/unternehmen` + 6 product pages | 200 |
| `/themen/familie`, `/themen/neu-in-der-schweiz` | 200 |
| `/ablauf`, `/schadenfall`, `/ueber-uns`, `/ratgeber`, `/analyse`, `/kontakt` | 200 |
| `/impressum`, `/datenschutz`, `/erstinformation` | 200 |

32 total build routes (28 pages + `/api/documents`, `/api/schadenfall`, `/robots.txt`, `/sitemap.xml`).

## 2. Legacy redirects

All 6 verified genuine 308 redirects, no loops:
`/privatkunden/gesundheit`→krankenkasse, `/privatkunden/vorsorge-vermoegen`→vorsorge,
`/privatkunden/recht-cyber`→rechtsschutz-cyber, `/unternehmen/inventar-immobilien`→sachversicherung,
`/unternehmen/gesundheit-unfall`→personal, `/unternehmen/flottenversicherung`→flotten.

## 3. Stale anchors

`#ansatz` (Manifesto section, homepage) and `#dokumente` (AdvisoryConversion section, homepage) verified
still present in the DOM — Footer links to both are live, not dead.

## 4. Metadata

Sampled 10 routes — all unique titles, all have descriptions, all German/Swiss wording. New pages this
session (`/themen/familie`, `/themen/neu-in-der-schweiz`, `/ablauf`, `/schadenfall`, `/ueber-uns`,
`/analyse`, `/kontakt`) all carry their exact client-specified title/description text.

## 5. Sitemap

**Corrected in Phase 7Z.A.** 25 URLs (was 24), generated dynamically from `privateServices`/
`businessServices` + static routes. `/erstinformation` is now INCLUDED — a prior phase's exclusion
(reasoning: incomplete regulated content shouldn't be indexed) was reversed this phase, since the page
itself is honest and non-broken, not fake. Confirmed via live fetch: no `/api/` routes present, no
legacy-redirect source URLs present, no hypothetical future article routes present.

## 6. Structured data

One canonical `Organization`/`InsuranceAgency` JSON-LD block, rendered once from the root layout
(`OrganizationJsonLd`) — name/URL/email/address are all verified real facts from `content/de/site.ts`.
Deliberately omits ratings/reviews/awards/employee counts/social profiles. **Minor note**: it does include
`telephone: contact.phone` — the same number `/impressum` still flags as `[TELEFONNUMMER VERIFIZIERT]`
(unconfirmed in writing). Not removed this phase (a phone number is low-stakes compared to a regulated
legal fact, and is very likely correct) but flagged for resolution alongside the Impressum blocker. No
FAQPage or Article schema exists anywhere (correct — no fake schema on pages without genuine FAQ/article
content).

## 7. Internal links

Both life-situation pages link to ≥2 distinct topic pages (Familie: krankenkasse/wohnen-eigentum/vorsorge;
Neu in der Schweiz: krankenkasse/wohnen-eigentum/vorsorge). Guide-article requirement: **PENDING** for both
— `/ratgeber` is now a real, built editorial hub (Phase 7X) but genuinely has zero published articles (no
per-article routes exist); no article URL was invented for either life-situation page (documented in each
page's own `docs/finwiwo-architecture/deep-*.md`, and re-confirmed independently in
`docs/finwiwo-architecture/deep-ratgeber.md`).

## 8. Form status

| Form | Privacy checkbox | Spam protection | Server validation | Email notification | Sender confirmation | Truthful failure |
|---|---|---|---|---|---|---|
| `/analyse` (`DocumentsSection`) | ✅ mandatory, unchecked default | Server-side field/consent validation (no honeypot) | ✅ | ✅ Resend → info@neosura.ch | Not sent (single-notification infra) | ✅ `deliveryFailed` state |
| `/schadenfall` (`ClaimsSection`) | ✅ mandatory, unchecked default | ✅ honeypot field, server-enforced | ✅ | ✅ Resend → info@neosura.ch | Not sent (same infra) | ✅ `deliveryFailed` state |
| `/kontakt` (`ContactForm`) | ✅ mandatory, unchecked default | Inherited from `/api/documents` (no honeypot) | ✅ | ✅ Resend → info@neosura.ch | Not sent (same infra) | ✅ `deliveryFailed` state |

No form anywhere shows a success message without a confirmed Resend send.

## 9. Upload/file security

`/api/documents` and `/api/schadenfall` both enforce: PDF/JPG/JPEG/PNG only, double MIME+extension check,
10MB per file, 20MB total, no permanent storage (in-memory `Buffer` for the request only), header-injection-
safe field sanitization. Verified via direct code reading, not just UI testing.

## 10. Newsletter

Still a **LAUNCH BLOCKER** — no real subscriber storage, no provider, no double opt-in, exactly as
documented in prior phases. No fake success anywhere (`CategoryNewsletter`'s own docstring confirms this).

## 11. Booking

Still a **LAUNCH BLOCKER — APPOINTMENT BOOKING ACCOUNT/LINK REQUIRED** (newly documented this phase on
`/kontakt`). No fake Calendly/booking widget exists anywhere.

## 12. Team / Reviews / Partners

Zero fabricated team members, photos, FINMA numbers, reviews, ratings, or social profiles anywhere in the
codebase (verified via repo-wide search). `/ueber-uns` renders honest "Noch ausstehend" pending states for
both Team and Reviews — **LAUNCH CONTENT BLOCKERS**, documented in `docs/finwiwo-architecture/deep-ueber-uns.md`.
No partner/cooperating-insurer list exists anywhere (also an Erstinformation blocker, see below).

## 13. Legal placeholders

Full inventory in `docs/legal-launch-blockers.md`. Summary: 5 bracketed placeholders remain in Impressum
(`[VOLLSTÄNDIGE FIRMA...]`, `[TELEFONNUMMER VERIFIZIERT]`, `[KANTON GEMÄSS HR-AUSZUG]`,
`[FINMA-REGISTERNUMMER]`, `[NAME GESCHÄFTSFÜHRUNG]`); `/erstinformation` is entirely pending (7 required
fields, none fabricated); `/datenschutz` was expanded this phase with code-verified facts (upload handling,
tools used, EDÖB) but still needs a final client legal draft and confirmed hosting provider/location.

## 14. FINMA / UID labeling

Verified: `CHE-330.617.129` appears exactly once in the codebase (`content/de/legal.ts`), correctly labeled
`UID:` — never labeled as a FINMA number anywhere.

## 15. Bear compliance

Non-legal pages: at least one bear each, verified via DOM count (`/themen/familie`: 1, `/themen/neu-in-der-
schweiz`: 1, `/ablauf`: 6 [5 step-illustrations + 1 CTA icon], `/schadenfall`: 1, `/ueber-uns`: 1,
`/analyse`: 1, `/kontakt`: 1). Legal pages: zero bears confirmed (`/impressum`, `/datenschutz`,
`/erstinformation` all 0).

## 16. Copy compliance

**Eszett (ß)**: zero occurrences anywhere in `content/de/` — Swiss "ss" convention already followed
consistently, no changes needed.

**Em dash (—)**: found extensively across the codebase — but a sample check (`about.ts`, `hero.ts`) shows
many of these occurrences are INSIDE verbatim client-guide copy strings (e.g. `about.paragraphs[0]`'s own
§4.18 text: "...betriebliche Risiken — individuell abgestimmt..."), not NEOSURA-authored embellishment.
**This is a genuine finding, not silently resolved**: rewriting verbatim client-supplied copy to remove its
own em dashes would violate this project's own, more fundamental "never rewrite verbatim content" rule —
so no automatic edits were made. **Recommendation**: clarify with the client whether the "no em dash" rule
is meant to apply retroactively to their own already-supplied source text, or only to future NEOSURA-
authored UI labels going forward. Until clarified, em dashes inside content explicitly marked VERBATIM in
this codebase's own docstrings were left untouched.

## 17. Unsupported-claim audit

Sampled `/themen/familie`, `/themen/neu-in-der-schweiz`, `/ablauf`, `/schadenfall`, `/ueber-uns`,
`/analyse`, `/kontakt` for `24/7`, `garantiert`, `beste `, `führend`, `Nummer 1` — **zero hits**. Prior
phases already established zero-hits for `%`/CHF/provider-count claims across the insurance deep pages
(re-verified spot-check clean this phase too).

## 18. Performance

No Lighthouse run was performed in this environment (no browser-automation performance tooling available
here beyond Playwright's own functional testing). Code-level indicators checked instead: zero raw `<img>`
tags anywhere in `app/`/`components/` (100% `next/image`, meaning automatic WebP/AVIF negotiation,
responsive `sizes`, and lazy-loading-by-default except explicit `priority` Heroes) — confirmed via
repo-wide search. No unnecessary client-side scripts were added (no analytics, no tracking, no heavy
third-party bundles beyond the one Google Maps `<iframe>` on `/kontakt`). **Recommendation**: run an actual
Lighthouse/PageSpeed pass against a deployed preview before claiming a specific numeric score — this
document does not claim ">90" since it wasn't actually measured.

## 19. Motion

Locked system verified intact: 0.20 Hero parallax present and reduced-motion-safe on `ServiceHeroFullbleed`/
`ServiceHeroSplit`/`LifeSituationHero` (spot-checked `/privatkunden/krankenkasse` under
`prefers-reduced-motion: reduce` — Hero image still renders, no transform applied). Swash final-state
verified (renders fully drawn immediately under reduced motion, no dependency on scroll). No runaway
scroll listeners found — every scroll-driven effect in this codebase uses the same
`requestAnimationFrame`-throttled pattern, and every `IntersectionObserver` disconnects itself after firing
once.

## 20. Mobile

Zero horizontal overflow at 390×844 across a 15-route sample spanning every page type (hub, private/business
deep pages, life-situation, process, forms, legal). Header mobile menu button present and functional.

## 21. Accessibility

Alt-text coverage: 100% on a 4-page sample (0 images missing an `alt` attribute — decorative images use
`alt=""`, not a missing attribute). Focus visibility: confirmed native focus ring active on first Tab press
from page load (`outline-style: auto`). Heading hierarchy: exactly one `<h1>` per page confirmed across
every new/rebuilt page this session. Forms: labeled inputs, `aria-live` status regions, server-driven
error-to-field focus (`/schadenfall`).

## 22. Header / mega menu

Verified against the canonical group requirement:
- **Privatkunden**: 5 product pages + Familie + Neu in der Schweiz (`content/de/nav.ts`,
  `PRIVATE_THEME_CHILDREN`) — exact match.
- **Unternehmen**: 6 product pages — exact match.
- Top-level: So funktioniert's, Schadenfall, Ratgeber, Über uns, Kontakt — all present, all routing to
  live 200 pages.
- Primary CTA: "Kostenlose Analyse" → `/analyse` (`primaryCta`, rendered in `Header.tsx`).
No stale routes found in the nav configuration.

## 23. Footer

`Erstinformation` link was MISSING from the "Rechtliches" column — **fixed this phase**
(`content/de/footer.ts`). Still missing (correctly, not fabricated): social links, a FINMA-register
external link (NEOSURA's own real register entry isn't known yet), verified phone confirmation. Address/
email/phone are displayed (phone without the "unverified" annotation `/kontakt` now carries — a sitewide
Footer change was judged out of this phase's own per-page scope and is flagged, not silently applied
everywhere).

## 24. API / security review

`/api/documents` and `/api/schadenfall` both reviewed line-by-line this phase: required-field validation,
email regex, consent re-check, file MIME+extension double-check, per-file/total size caps, no secrets in
any client-facing response, no permanent storage, method is implicitly restricted (only `POST` is
exported — Next.js route handlers 405 any other verb automatically). `/api/schadenfall` additionally has a
server-enforced honeypot.

## 25. Lint / TypeScript / Build

All three run clean at the end of this phase — `npm run lint` (0 problems), `npx tsc --noEmit` (0 errors),
`npm run build` (32/32 routes generated successfully).

## 26. Design/engineering complete status

**YES**, as of this checkpoint. Every canonical route in the client guide's IA renders, uses real
(non-fake) functionality wherever a backend is required, reuses the locked 7SYS.C visual system
consistently, and contains no fabricated legal/team/review/partner data.

## 27. Production launch status

**NOT PRODUCTION LAUNCH READY.** Mandatory blockers remain — see the table below. Shipping now would mean
either broken regulatory pages (`/erstinformation` is a placeholder) or silently-wrong legal claims
(Impressum's own bracketed gaps).

## 28. Full launch-blocker table

| Item | Status | Blocking? | Owner | Required input | Current implementation |
|---|---|---|---|---|---|
| Newsletter provider/DOI | Open | Yes | Client + Dev | Provider account, API keys, DOI flow design | Non-functional UI only, honestly labeled, no fake success |
| Resend domain/DNS/live send test | Partially open | Yes | Dev/Ops | Verified sending domain in Resend, a real end-to-end send test in production | Code is real and correct; untested against live production credentials in this session |
| Full legal company name | Open | Yes | Client | Exact HR-registered name | `[VOLLSTÄNDIGE FIRMA GEMÄSS HANDELSREGISTER]` |
| Register canton | Open | Yes | Client | Confirmed HR extract | `[KANTON GEMÄSS HR-AUSZUG]` |
| FINMA number | Open | Yes | Client | Real FINMA intermediary register number | `[FINMA-REGISTERNUMMER]` |
| Verified phone | Open | No (site still functions) | Client | Written confirmation of `+41 44 500 12 34`, or the correct number | Displayed everywhere; flagged "(Nummer noch nicht verifiziert)" only on `/kontakt` this phase |
| Authorised representative | Open | Yes | Client | Name of Geschäftsführung | `[NAME GESCHÄFTSFÜHRUNG]` |
| Team data | Open | Yes (client content requirement) | Client | Photo/name/role/FINMA-Nr/email per advisor | Honest "Noch ausstehend" placeholder on `/ueber-uns` |
| Partner/cooperating-insurer list | Open | Yes (Erstinformation) | Client | List of insurers NEOSURA works with | Missing entirely |
| Professional indemnity insurance | Open | Yes (Erstinformation) | Client | Berufshaftpflicht details | Missing entirely |
| Ombudsman | Open | Yes (Erstinformation) | Client | Zuständige Ombudsstelle | Missing entirely |
| Tool list (final) | Partially open | Yes (Datenschutz) | Client + Dev | Confirmed complete processor list | Code-verified partial list (Resend, Google Maps) documented; full confirmation still needed |
| Booking account/link | Open | Yes (client content requirement) | Client | Real scheduling account/link | Honest "not yet available" note on `/kontakt`, no fake widget |
| Social profiles | Open | No | Client | Real URLs if any exist | Omitted entirely, not invented |
| Guide articles (`/ratgeber`) | Open | Yes (SEO internal-link requirement) | Client/Content | At least the two working-title articles referenced by the life-situation pages | `/ratgeber` is a real, built editorial hub (Phase 7X) with an honest "topics in preparation" navigation list — zero article routes exist, none fabricated |
| Google reviews | Open | Yes (client content requirement) | Client | Connected Google Business Profile or verified data source | Honest "Noch ausstehend" placeholder on `/ueber-uns` |
| FINMA external link | Open | No | Client | NEOSURA's real FINMA-register entry URL | Generic `finma.ch` reference only, no fake specific URL |
| Privacy final draft | Partially open | Yes | Client (legal) | Final approved Datenschutz text | Code-verified honest placeholder (§4-6 new this phase), not a claim of legal completeness |
| Erstinformation PDF | Open | Yes | Client + Dev | All Erstinformation fields resolved first | Not producible yet — would be falsely final if generated now |
| Em-dash style rule vs. verbatim client copy | Needs clarification | No | Client | Confirm whether "no em dash" applies retroactively to already-supplied source text | Verbatim content left untouched this phase |

## 29. No false "ready"

This document intentionally does not claim the site is production launch ready. It IS design/engineering
complete for every route in scope through Phase 7Z.

## 30. Files changed this session (7Q–7Z.A)

New routes/pages: `/themen/familie`, `/themen/neu-in-der-schweiz` (rebuilt), `/ablauf` (rebuilt),
`/schadenfall` (rebuilt), `/ueber-uns` (rebuilt), `/analyse` (fixed), `/kontakt` (rebuilt), `/ratgeber`
(rebuilt, Phase 7X; taxonomy-corrected, Phase 7Z.A).
New components: `components/life-situation/*` (3 files), `components/process/AdvisoryProcessTimeline.tsx`,
`components/schadenfall/ClaimsSection.tsx`, `components/contact/ContactForm.tsx`,
`components/contact/ContactInfoPanel.tsx`, `components/about/AboutTeam.tsx`, `components/about/AboutReviews.tsx`.
New API: `app/api/schadenfall/route.ts`, `lib/api/schadenfall.ts`.
New content: `content/de/deep/themen-familie.ts`, `content/de/deep/themen-neu-in-der-schweiz.ts`,
`content/de/schadenfall.ts`, updated `content/de/kontakt.ts`/`content/de/legal.ts`/`content/de/footer.ts`,
trimmed `content/de/process.ts`.
Deleted: `components/service-detail/ServiceApproach.tsx` (dead code after `/ueber-uns` rebuild).
Modified (additive/backward-compatible): `components/home/DocumentsSection.tsx` (`headingLevel` prop),
`components/contact/ContactHero.tsx` (simplified).
**Phase 7Z.A corrections** (see Section 0): `app/ratgeber/page.tsx`, `app/privatkunden/page.tsx`,
`content/de/hero.ts`, `app/sitemap.ts`.
New docs: `docs/finwiwo-architecture/deep-themen-familie.md`, `deep-themen-neu-in-der-schweiz.md`,
`deep-ablauf.md`, `deep-schadenfall.md`, `deep-ueber-uns.md`, `deep-analyse.md`, `deep-kontakt.md`,
`deep-ratgeber.md`, `docs/legal-launch-blockers.md`, this file.
Screenshots: `docs/qa-screenshots/phase-7q/` through `phase-7z-a/`.

## 31. Recommendation for final checkpoint/deployment

1. Resolve the em-dash clarification with the client before treating Section 16 as closed.
2. Do NOT deploy to production until Section 28's "Blocking: Yes" rows are resolved.
3. A genuine Lighthouse/PageSpeed run against a deployed preview is recommended before any performance
   claim is made publicly.
4. Consider reconciling the phone-verification annotation sitewide (currently only on `/kontakt`) once the
   number is confirmed either way.
5. Two items surfaced this phase are worth a deliberate (not silent) decision from the client/team: (a) the
   About page's own "Vorsorge & Vermögen" narrative sentence — confirm whether it should be updated to
   match current taxonomy or is fine as descriptive prose; (b) the `/privatkunden` hub's 0-bear count
   versus `/unternehmen` hub's 1 — confirm whether this asymmetry is intentional.
6. This checkpoint is a good point for external visual/functional review of Phases 7Q–7Z.A as a batch, given
   how much shipped in this one continuous pass — a fresh pair of eyes on the claims form, contact form,
   and legal pages specifically (the highest-real-world-consequence pages built this session) is worth the
   time before this is committed.

**DO NOT DEPLOY AUTOMATICALLY. DO NOT MODIFY DNS. DO NOT REMOVE PLACEHOLDERS BY GUESSING.**
