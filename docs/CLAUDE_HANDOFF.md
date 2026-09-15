# NEOSURA V2 — Claude Handoff

Written for a fresh Claude session picking this project up on a different PC.
Read this whole file before touching any code.

## ⚠️ Path note (read first)

This project's canonical directory is:

```
C:\xamppp\htdocs\neosurafinal
```

(note: `xamppp` has **three** p's, and the folder is `neosurafinal`, **not**
`neosura`.) Earlier design-discussion transcripts you may have access to via
memory/scrollback repeatedly reference `C:\xampp\htdocs\neosura` (two p's, no
`final`) — that path **does not exist** on this machine. Don't let it confuse
you; `neosurafinal` is the real, current, git-tracked project. All work
described below lives there and is fully committed and pushed.

**Git remote:** `https://github.com/admiraz/neosura-v2` (origin/master).
Local `HEAD` was in sync with `origin/master` (no ahead/behind) as of this
handoff — the safest way to move to another PC is `git clone` that remote,
not a manual file copy.

**On a fresh clone:** `node_modules/` will be absent — run `npm install`
first. Node v26.3.1 / npm 11.16.0 were used to build this. `.env` is
correctly gitignored and absent — recreate it from `.env.example` with real
secrets locally; never commit it.

---

## 1. Current project status

NEOSURA V2 is a from-scratch rebuild of the Swiss insurance broker site
`neosura.ch`, using the competitor site **FINWIWO.ch** as a structural/
motion/layout reference only (never copied verbatim — no FINWIWO code,
text, imagery, or logos), with NEOSURA's own brand, bear mascot, German
copy, services, and contact/legal info as the content source of truth.

**The entire homepage is built, approved, and locked.** Phase 4 (reusable
service-detail page template, starting with one page: Privatkunden →
Gesundheit) was just started — planning only, zero code written yet.

## 2. Phases completed and locked

All of these are considered final; **do not modify** their output without
an explicit new instruction that names them:

- **Phase 1** — Header, 6-state animated Hero (GSAP double-buffer scene
  architecture), MegaMenu, MobileMenu.
- **Phase 1.5 / 1.6 / 1.7** — Hero art-direction and motion refinement
  passes (light header, editorial corner-block frame, large art-directed
  bear per state, editorial CTAs, blank-transition fix, mobile
  header/hero height fixes, mega-menu rebuild, single semantic `<h1>`
  fix, dev-only `window.__NEOSURA_HERO_DEBUG__` hook for deterministic
  transition testing).
- **Phase 2A → 2D** — Homepage editorial body below the Hero, iterated
  through several art-direction passes:
  - 2A: first version (mascot-heavy, four-column Principles section).
  - 2B: re-art-direction toward FINWIWO — **real photography** replacing
    mascots in service rows (sourced via Freepik, see
    `docs/photo-sources.md`), category capsule pills, checklists, filled
    CTAs, asymmetric image masks, new post-Hero "coverage strip".
  - 2C: further fidelity pass (dual-lane ticker, first manifesto
    photographic geometry).
  - 2D: **current final homepage-body layout** — Manifesto is a
    flush-left ~48vw photo + right text column with a restructured
    statement; Audience selector is **two large photographic panels**
    (Privatkunden / Unternehmen) that double as the audience switch;
    mobile Problem Statement is centered; mobile Manifesto is full-bleed.
- **Phase 3 / 3B** — Built and then refined: **Process** ("So
  funktioniert's", 3-step editorial timeline, large low-opacity
  numerals, **no mascot**), **Documents** (audience-switching upload
  form, **no mascot**, left column filled with a 3-point helper block
  instead), **Final CTA** (purple closing band with eyebrow + headline +
  supporting line + CTA), **Footer** (5-column grid + dark bottom band).
- **Production Document Delivery** — `app/api/documents/route.ts` wired
  to **Resend** for real email delivery (see §6 for current config gap).

## 3. Important design decisions (do not relitigate)

- **FINWIWO is a structural/motion/interaction-model reference only.**
  Never copy its code, wording, imagery, or logos. NEOSURA supplies all
  actual content, colors, logo, and the bear mascot.
- **No fabricated content, ever.** NEOSURA has no reviews, partner logos,
  subscriber counts, or stats — unlike FINWIWO, none of that is invented.
  This rule has been enforced repeatedly and is non-negotiable.
- **Mascot (purple bear) usage is restricted.** Allowed in: Hero. Removed
  from: all service-story rows, Documents section, Process section (was
  allowed once in Phase 3, explicitly removed in 3B for being
  "disconnected"/empty-feeling).
- **Service-row visual grammar** (established in `ServiceStoryRow.tsx`,
  reused site-wide): purple capsule pill (category label) → H2 → body →
  checklist (✓ marks, real source-grounded phrases only, never invented
  benefits) → filled purple pill CTA → large photo with an asymmetric
  large-radius corner mask + a subtle purple/teal color "slab" peeking
  from behind it (**not** a translate-based bleed — an earlier attempt
  using `translate-x` caused real horizontal overflow at mobile widths;
  the fixed version keeps the slab fully inside its own container).
- **Backend honesty rule.** The Documents form must never show a success
  message unless the email provider actually confirmed delivery. This was
  a real bug once (a route that validated then silently discarded the
  payload while returning a "success" response) — it's fixed now (§6).
- **Single semantic `<h1>` rule.** Hero owns one `sr-only` `<h1>`
  (tracking the current slide's headline); `DesktopHeroScene` /
  `MobileHeroScene` render their visible per-slide headline as `<p>`, not
  `<h1>`, to avoid duplicate-heading issues across the two responsive
  scene trees. Verified `document.querySelectorAll("h1").length === 1` on
  every page state at every breakpoint, every phase since.
- **New internal links** to not-yet-built routes always use
  `prefetch={false}` on `next/link` to avoid noisy 404 console errors.
  Two intentional exceptions remain unresolved: `Über uns` (`/ueber-uns`)
  and `Kontakt` (`/kontakt`) still 404 on prefetch — those pages are out
  of scope until a future phase.

## 4. FINWIWO reference rules

- Reference material lives in `docs/finwiwo-reference/shots/` (screenshots)
  and `docs/reference-audit.md` / `-v2.md` / `-v3.md` (written audits).
  These are **private internal reference only** — never ship, publish, or
  copy their literal content.
- When a brief says "match FINWIWO in X," it means structural/spacing/
  proportion/motion-language parity, translated into NEOSURA's own colors,
  type, and content — never literal replication.
- Several FINWIWO-audited elements are deliberately **not** replicated
  because NEOSURA has no equivalent honest content: partner-logo walls,
  Google-rating badges, "+N financed" stat cards, comparison tables vs.
  named competitors, newsletter signup, FAQ accordions (none built yet).

## 5. NEOSURA colors/content rules

**Brand colors are locked** (Tailwind v4 `@theme` tokens in
`app/globals.css`) — never change these values:

```
--color-purple: #663399        --color-teal: #63dade
--color-purple-600: #552b80    --color-teal-ink: #1a8a8e
--color-purple-100: #efe8f6    --color-teal-tint: #eafbfb
--color-ink: #1a1420           --color-paper: #f9f5ff
--color-ink-soft: #3d3547      --color-paper-2: #f3efe8
--color-muted: #8a8194         --color-white: #ffffff
--color-line: #e8e2db          --color-dark: #14081f
--color-line-soft: #efeae3     --color-dark-2: #1d1235
                                --color-dark-3: #140d24
```

**Content sourcing rule:** wherever a content file didn't already exist for
a section (Principles, About, Ansatz/Process, Dokumente, Footer/legal),
the exact copy was fetched **verbatim** from the live `neosura.ch` via
WebFetch — never invented or paraphrased. If you need copy for a section
that still doesn't have a `content/de/*.ts` file, do the same: fetch from
the live site, don't write it yourself.

## 6. Known gaps / TODOs carried forward

- **Email delivery is code-complete but not actually configured.**
  `app/api/documents/route.ts` uses Resend (`lib/email/resend.ts`); if
  `RESEND_API_KEY` or `CONTACT_FROM_EMAIL` env vars are unset, it
  correctly returns `502 { deliveryFailed: true }` and the UI shows an
  honest fallback message (never a fake success). To make it actually
  work: create a Resend account, verify a sending domain for `neosura.ch`
  (SPF/DKIM/DMARC DNS records), and set the env vars per `.env.example`.
- **Photo gaps:** `private-home.webp` and `private-cyber.webp` were
  searched multiple times (see `docs/photo-sources.md` for the exact
  queries already tried and rejected) but never found a clearly better
  replacement — current images are acceptable but not ideal.
- **Unbuilt routes:** `/ueber-uns`, `/kontakt`, `/datenschutz`,
  `/impressum` don't exist yet (footer/nav links point to them with
  `prefetch={false}` so they don't spam console errors, but they 404 if
  actually clicked).
- **Service detail pages:** only the Gesundheit template was scoped to
  start (Phase 4, see §7) — the other 9 services (4 more Privatkunden + 5
  Unternehmen) are unbuilt.

## 7. Current task — Phase 4: Service Detail Page System

**Brief (verbatim intent):** build a reusable service-detail page
template, starting with exactly one live page — **Privatkunden →
Gesundheit** — using FINWIWO's service pages as the visual/layout
benchmark (hero proportions, breadcrumb/nav, large photography, type
hierarchy, content density, checklist structure, CTA placement,
responsive structure), NEOSURA colors/content throughout. Do **not** build
the other 9 pages yet. Run lint/tsc/build, capture desktop+mobile
screenshots into `docs/qa-screenshots/phase-4/`, then **stop for visual
review** — do not proceed further unprompted.

### What was completed in Phase 4 so far

Planning only — **no code was written**:

- Reviewed FINWIWO's service-hero reference
  (`docs/finwiwo-reference/shots/desktop-hypothek-hero.png` and
  `mobile-hypothek-hero.png`). Confirmed it's heavy on fabricated proof
  (a "135 properties financed" stat card, a Google 4.9★/500-review badge)
  that must **not** be replicated — no such data exists for NEOSURA. The
  reusable structural pattern worth keeping: large heading + subheading +
  3-item checklist + CTA button on the left, large photo with a colored
  accent shape behind it on the right (this maps directly onto the
  asymmetric-mask + color-slab treatment already built for
  `ServiceStoryRow.tsx` — reuse that visual language, don't invent a new
  one).
- Confirmed via directory listing that `app/privatkunden/` doesn't exist
  yet — nothing built.
- Confirmed the Gesundheit content is already fully available and does
  **not** need to be fetched or invented:
  - `content/de/private.ts` → `privateServices[0]` (slug `gesundheit`,
    title, body).
  - `content/de/serviceExtras.ts` → `privateServiceExtras[0]` (capsule
    label `"Gesundheit & Absicherung"`, 4-item checklist).
  - `content/de/serviceVisuals.ts` → `privateServiceVisuals[0]` (photo
    path `/images/services/private-health.webp` + object-position).
  - `content/de/principles.ts` → 4 Prinzipien, currently unused anywhere
    on the site — a natural, honest source for a trust-reinforcement
    block on the detail page (don't invent new trust copy; reuse these).

### What remains unfinished (all of it)

1. Decide on and build a **reusable template** — e.g.
   `components/service-detail/ServiceHero.tsx`,
   `ServiceBenefits.tsx`, maybe `ServiceRelated.tsx` — parameterized by a
   service's data so all 10 pages can reuse it later. Don't hardcode
   Gesundheit content inside the template components themselves.
2. Build a **breadcrumb** component (`Startseite / Privatkunden /
   Gesundheit`) — FINWIWO's own reference screenshot doesn't show one
   clearly, but the brief explicitly asks for it regardless.
3. Build the **service hero**: eyebrow ("Privatkunden") + H1 (service
   title) + lead paragraph + checklist + CTA + large masked photo.
   **Undecided: what the CTA should link to.** Candidates already real
   and working: `"Kostenlose Analyse starten"` → `/#dokumente` (points at
   the real homepage upload section), or `"Beratung anfragen"` →
   `/kontakt` (matches `primaryCta` in `content/de/site.ts` but that
   route doesn't exist yet, so an anchor into the homepage is probably
   the better choice for now) — pick one before shipping and note the
   choice in the eventual Phase 4 report.
4. Build a **benefits/detail section** expanding on the 4-item checklist
   without inventing new claims — consider surfacing 1–2 of the unused
   Prinzipien for honest trust reinforcement (see §7 above).
5. Optional: a related-services cross-link row (the other 4 Privatkunden
   services) — real content already exists in `privateServices`.
6. Reuse the existing `<FinalCta />` component at the page bottom for a
   consistent closing band — it's already approved and generic enough to
   reuse outside the homepage.
7. Create `app/privatkunden/gesundheit/page.tsx` wiring everything
   together, with real `generateMetadata`/`export const metadata` (title
   + description) — don't leave Next.js defaults.
8. Run `npm run lint`, `npx tsc --noEmit`, `npm run build`.
9. Start the prod server, capture desktop (1440) + mobile (390)
   screenshots into `docs/qa-screenshots/phase-4/`.
10. Clean up any `.qa/` scratch directory used for screenshotting (it's
    gitignored — see workflow note below).
11. **Stop. Do not build the remaining 9 service pages** until this
    template is explicitly approved.

## 8. Workflow notes (established across every phase — follow these)

- **Windows/PowerShell:** Node isn't on PowerShell's default PATH in this
  environment — prefix every PowerShell command with:
  `$env:Path = "C:\Program Files\nodejs;" + $env:Path;`
- **QA screenshot workflow:** create a gitignored `.qa/` scratch dir →
  write small Playwright scripts there → `npm run build` → start the prod
  server in the background (`Start-Process cmd.exe -ArgumentList '/c',
  'npm run start > start.log 2>&1' -WindowStyle Hidden`) → capture
  screenshots → copy the final ones into `docs/qa-screenshots/phase-N/` →
  delete `.qa/` and `start.log` before finishing.
- **Next.js image-cache gotcha:** overwriting an image file at the same
  path requires clearing `.next/` (not just rebuilding) or the image
  optimizer serves a stale cached transform.
- **React gotcha:** never read `e.currentTarget` after an `await` inside
  an event handler — capture it into a local variable first (a
  SyntheticEvent's `currentTarget` is nulled once dispatch finishes,
  which happens before an async handler resumes). This caused one real
  bug already (Documents form).
- **CSS gotcha:** percentage `padding-top`/`padding-bottom` resolve
  against the container's **width**, not height — use fixed px values for
  vertical spacing instead. Caused one real bug already (Hero body copy).
- **Tailwind gotcha:** don't use `translate-x` to make a decorative
  element bleed past its own container's edge — it can cause genuine
  horizontal overflow at narrow viewports. Keep "peeking" color effects
  fully inside their own box (see the service-row color-slab fix).
- **Photo sourcing:** Freepik photos were sourced via a Magnific/
  Higgsfield MCP relay (`stock_search` / `stock_get` / `stock_download`).
  Always verify the returned author isn't a known illustration/vector
  artist (e.g. `pch.vector`) — the `content_type: "photo"` filter isn't
  fully reliable; a 3D render slipped through once. Always visually
  inspect a downloaded image before committing it. All sourcing decisions
  and licenses are logged in `docs/photo-sources.md` — keep that file
  updated for any new photo.
- **Playwright screenshot artifact:** `element.screenshot()` on an
  element taller than the viewport can show the fixed header duplicated
  mid-image. This is a stitching artifact, not a real rendering bug —
  confirmed repeatedly by cross-checking against a normal scrolled
  viewport screenshot.
