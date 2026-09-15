# FINWIWO → NEOSURA — Architecture MVP matrix

Source of truth for all future phases. Built from a live crawl of
https://finwiwo.ch/ (2026-08-27) — full detail in `docs/finwiwo-architecture/`
(`routes.md`, `page-families.md`, `navigation.md`, `motion.md`,
`interactions.md`, `neosura-ia.md`). Nothing in this matrix is FINWIWO copy —
labels identify which feature is being compared, not approved text.

**Statuses:** `DONE` (built and verified this phase or earlier) ·
`SCAFFOLDED` (structural piece added this phase, visual polish deferred) ·
`ADAPT LATER` (real pattern worth adopting, deliberately not built yet —
"don't pixel-polish" per this phase's brief) · `OMIT` (no truthful NEOSURA
equivalent; will not be built)

---

## Navigation & header

| FINWIWO feature | FINWIWO route/ref | NEOSURA equivalent | Status | Next polish phase |
|---|---|---|---|---|
| Shared mega-menu shell (fixed x/width/top, only columns vary) | all 5 menus, `navigation.md` §2.1 | `MegaMenu.tsx` — `absolute left-[50px] right-[50px] top-full`, one shell | **DONE** | — |
| Hover-intent open delay | ~230–250ms, `navigation.md` §2.3 | `Header.tsx` `OPEN_DELAY=90ms` | **DONE** (functionally equivalent, faster) | tune 90→~200-230ms for closer feel |
| Close delay (forgiving diagonal travel) | ~570–630ms | `Header.tsx` `CLOSE_DELAY=180ms` | **DONE** (functional) | tune 180→~500-600ms |
| Instant open/close/switch (no menu animation) | single-frame hard cut | NEOSURA fades/slides (`duration-[240-260ms]`) | **ADAPT LATER** — deliberate NEOSURA choice, not a gap | reconsider only if it reads as slow in per-section pass |
| Escape closes mega menu | **absent on FINWIWO** | `Header.tsx` `onKeyDown` → closes on Escape | **DONE — exceeds reference** | — |
| Accurate `aria-expanded` | broken on FINWIWO (stuck `"true"`) | tied to real `activeItem` state | **DONE — exceeds reference** | — |
| Closed-menu links removed from tab order | **absent** — 109 links always tabbable | `ServiceRow` uses `tabIndex={open ? 0 : -1}` | **DONE — exceeds reference** | — |
| Header: frosted, shrinks near scrollY≈32, shadow gain, never hides | 91→60px @ ≥32px | `useScrolled(35)` + `bg-white/95 backdrop-blur-md` + shadow on scroll | **DONE** (near-identical threshold, same grammar) | — |
| 2–3 level deep mega-menu subtopics | e.g. Krankenversicherung → Grundversicherung/Zusatzversicherung | flat 5-service list only | **ADAPT LATER** | add chapter deep-links into `MegaMenu.tsx` columns once menu layout is revisited (needs taller/restructured panel) |
| Mobile: flat in-place accordion merging all nav | `navigation.md` §7 | `MobileMenu.tsx` accordion (Privatkunden/Unternehmen) + hub links | **DONE** | — |
| Site search overlay | header magnifier | not present | **OMIT (for now)** | revisit only if content volume ever justifies search |
| Desktop-only secondary hamburger (utility nav) | opens off-canvas w/ Über FINWIWO/Team/Partner | not needed — NEOSURA's "Über uns" is already in primary nav | **OMIT** — NEOSURA's IA doesn't have FINWIWO's nav-overflow problem | — |

## Homepage & page families

| FINWIWO feature | FINWIWO route/ref | NEOSURA equivalent | Status | Next polish phase |
|---|---|---|---|---|
| Homepage: hero → proof strip → problem → life-stage grid → 5 service teasers → testimonial → close | `/`, `page-families.md` Family 1 | Hero → CoverageStrip → ProblemStatement → Manifesto → AudienceServices (5 rows) → DocumentsSection → FinalCta | **DONE** — same rhythm, no video hero (NEOSURA has no video asset — truthful choice), no testimonial (NEOSURA has none — truthful choice) | — |
| Homepage "So funktioniert's" 3-step section | n/a (FINWIWO doesn't have this on its homepage either) | **removed from homepage this phase**; kept on `/ueber-uns` via `ServiceApproach` (shared `content/de/process.ts`, untouched) | **DONE** | — |
| Category hub: hero → problem → stat block → sub-service grid → FAQ → comparison | `/vorsorge/` etc., Family 2 | `/privatkunden`, `/unternehmen` — hero, coverage/trust strip, 5 services, no FAQ yet | **DONE** (core) | consider adding a hub-level FAQ in a later pass — not urgent, hubs already have working conversion paths unlike FINWIWO's broken ones |
| Category hub lead form | **FINWIWO hubs have NONE — broken `#anfragen` targets, this is a bug not a pattern** | N/A — do not replicate | **OMIT (correctly)** | — |
| Deep service page: hero → lead form high → problem → 2-4 explainer chapters → comparison → process → FAQ | `/krankenkasse/` etc., Family 3 | ServiceHero → **ServiceLocalNav (new)** → ServiceInquiry → problem → 3 chapters → comparison → analysis → process → FAQ → closing | **DONE**, plus **SCAFFOLDED** local nav (FINWIWO has *no* sticky sub-nav anywhere — this is a genuine improvement, not a copy) | visual refinement of `ServiceLocalNav` (active-section highlight) in the per-section pass |
| Specialist sub-service page (lighter Family 3 variant, 1 level under a hub) | Säule 3a, Nachlassplanung, etc. | NEOSURA's 10 deep pages already fold sub-topics into chapters rather than separate URLs (a truthful content-volume decision, not a gap) | **DONE (adapted differently, deliberately)** | — |
| Calculator/tool page | 2 native 3a sliders (which **disagree with each other**) + 2 off-platform embeds | NEOSURA has no genuine calculator-worthy data (no proprietary rate tables, no partner integrations) | **OMIT** | revisit only if NEOSURA ever has real, source-backed data to compute from |
| Lead-gen/form-heavy landing (life-stage, event, recruiting) | `/finanzen-fuer-familien/`, `/jobs-karriere/` etc. | not applicable — NEOSURA has 2 genuine audiences only, no life-stage segmentation, no recruiting page | **OMIT** | — |
| Company/about page | `/ueber-finwiwo/`, `/das-team/`, `/unsere-partner/` | `/ueber-uns` (single page, real NEOSURA content) | **DONE** (NEOSURA doesn't have a public team roster or partner list to publish — truthful scope) | — |
| Legal/regulatory page + "Shortlinks" in-page TOC | `/impressum-datenschutz/`, `/vag-45/` | `/datenschutz`, `/impressum` — no in-page TOC yet | **ADAPT LATER** | add a shortlinks jump list if/when legal pages grow long enough to need one (currently short) |
| Article/guide/blog | **absent on FINWIWO too** — dead menu promises only | not present | **OMIT — matches reference's honest state** | — |
| Support/document-upload/client-portal | **absent on FINWIWO too** — dead menu promises, no real client portal | NEOSURA's real Documents upload (`/kontakt`, `#dokumente`) is *more* real than FINWIWO's equivalent | **DONE — exceeds reference** | — |
| Content/campaign (portfolio) family | `/engagement/` | not applicable — no CSR/campaign content exists | **OMIT** | — |

## Motion

| FINWIWO pattern | Ref | NEOSURA equivalent | Status | Next polish phase |
|---|---|---|---|---|
| Two-speed system: 800ms big gestures, 450-600ms small feedback, all ease-out | `motion.md` §1 | Hero uses its own GSAP timeline (~0.5-1.3s per element, mixed eases); mega menu 240-260ms | **ADAPT LATER** | normalize NEOSURA's own duration/easing tokens against this 2-speed system in the per-section fidelity pass |
| Hero: perpendicular axes (photo horizontal, text vertical), staggered, ease-in-out, no fade on text | `motion.md` §2 | NEOSURA Hero already does y-axis text convergence (headline down, body up-ish) + separate photo/frame timing — see Phase "FINWIWO homepage fidelity" work already in `DesktopHeroScene.tsx`/`MobileHeroScene.tsx` | **DONE (independently convergent)** | tune exact offsets/durations against the measured curve in `motion.md` §2.1 during the per-section pass |
| No generic scroll-reveal anywhere on the body | `motion.md` §4 | NEOSURA also has no scroll-reveal on body content (confirmed in Phase 6B accessibility audit) | **DONE — already matches** | — |
| No card hover motion (FINWIWO) except a 3px button lift | `motion.md` §5, row 17 | NEOSURA has hover states (scale/translate) on several cards (e.g. `AudienceServices` panel `hover:scale-[1.015]`) | **ADAPT LATER** (an intentional NEOSURA enhancement, not a gap) | keep as-is unless it starts to feel inconsistent with the rest of the "mostly static" system |
| Horizontal linear parallax (homepage only) | `motion.md` §6.2 | not present | **OMIT** | low priority, purely decorative |
| No `prefers-reduced-motion` handling anywhere on FINWIWO | `motion.md` §7 | NEOSURA's Hero, MobileMenu, etc. all check `useReducedMotion()` | **DONE — exceeds reference** | — |

## Forms & tools

| FINWIWO pattern | Ref | NEOSURA equivalent | Status | Next polish phase |
|---|---|---|---|---|
| Qualifier-chips → identity-block form shape | `routes.md` §5.2, the single most reusable idea found | `ServiceInquiry`/`DocumentsSection` currently go straight to identity fields (no chip qualifier step) | **ADAPT LATER** | consider adding an optional "was ist Ihnen wichtig?" chip step to `ServiceInquiry` in a later phase — real content exists (`extra.checklist` items are already genuine per-service priorities) |
| Lead form placed ~1/3 down the page, not repeated at bottom | Families 3/4/6 | `ServiceInquiry` sits right after hero+local-nav (even higher) | **DONE (better position)** | — |
| Multi-step forms (Steuern 3-step, Hypothek 2-step) | `routes.md` §5.2 | NEOSURA forms are single-step | **DONE (deliberately simpler — NEOSURA's forms don't need pricing/triage branching)** | — |
| Native calculators (and their defects) | 2 disagreeing 3a sliders | no NEOSURA calculator | **OMIT** | — |
| Sticky CTA/form on long pages | **absent on FINWIWO too** | not present | **OMIT — matches reference** | — |

## Explicitly omitted FINWIWO service lines

Steuern (tax filing), Hypothek (mortgages), Säule 3a/3b tooling, Pensionsplanung,
Vorsorgeanalyse, Nachlassplanung, Vorsorgeauftrag/Generalvollmacht,
GmbH-Gründung, recruiting/jobs, CSR/Engagement — **none exist as genuine
NEOSURA services and none were added.** Where a genuinely equivalent NEOSURA
topic exists (Vorsorge & Vermögen, Recht & Cyber) it already has its own real
route and content; where none exists, the FINWIWO feature is simply absent
from NEOSURA, per the brief's explicit "never invent a service" instruction.

## Known FINWIWO defects deliberately NOT reproduced

Full list in `routes.md` §4 and `page-families.md` "Cross-family
observations." Summary: ~45 dead `#` mega-menu links, a literal
`DEINE-DOMAIN.ch` placeholder href in production, category hubs with no
working lead form, two calculators that disagree with each other, broken
in-page anchors, redirect-eaten anchors, mis-wired footer links, and
copy-paste template defects (wrong FAQ/subtitle on the wrong page). None of
these are patterns — they are bugs in the reference site, and NEOSURA's own
QA process (lint/tsc/build/route crawl every phase) is what prevents the
NEOSURA equivalent.
