# Client Guide Merge — IA / Content / Legal Reconciliation

**Phase 7M.0** — 4 September 2026
Source: *neosura.ch Website Restructuring — Implementation guide and copy
templates for the web design team*, Client: Endrit Beadini, Version 1.0,
3 September 2026 (`Neosura Website Guide EN.docx`, read in full for this
phase — not a summary or a second-hand extraction).

This document is the single reference for how the client guide, the live
FINWIWO reference site, and the existing NEOSURA rebuild now relate to each
other. Every subsequent phase should be read against this file before
touching content, IA, or legal pages.

---

## 0. Merged authority rule (verbatim)

> **VISUAL / INTERACTION:**
> Live FINWIWO measurements are the source of truth.
>
> **CONTENT / IA / LEGAL / FUNCTION:**
> Client Website Guide v1.0 is the source of truth.
>
> **BRAND:**
> NEOSURA colors, logo and typography stay locked.
>
> **TECHNICAL TRUTH:**
> Never fake successful submissions, reviews, partners, register data,
> newsletter subscriptions or other missing integrations.

Restated plainly: **CLIENT COPY WINS OVER OLD NEOSURA COPY. FINWIWO DESIGN
WINS OVER OLD NEOSURA LAYOUT.** Where a FINWIWO module needs content NEOSURA
doesn't genuinely have, keep FINWIWO's *architecture*, fill it with the
client's *real* content — never invent to fit the shape. The guide itself
states the same principle from its own side (§2.3): *"We adopt the structure
and the type of elements [from finwiwo.ch/fianza.ch], not the wording... All
copy in this document was written specifically for neosura; third-party copy
must not be reused."*

---

## 1. What the guide actually says (condensed)

The current neosura.ch is a one-pager with real SEO/depth problems (guide
§1). It becomes a **21-page site** (plus legal pages), pure insurance focus —
**no fiduciary, tax, or financing content** (guide §1, §3.3). Two reference
sites: **finwiwo.ch** (mega-dropdown nav, topic hubs, life-situation pages,
partner logos, review badge, legal footer section, newsletter) and
**fianza.ch** (3-value block, 5-step advisory process, dedicated SME page,
blog, team/reviews, video testimonials, footer contact block) — structure
and element *types* only, never their wording (§2.3).

Kept from the current site (§2.1): the reduced/credible look and feel; bear
illustrations (≥1 per subpage); the four principles (Unabhängig, Persönliche
Beratung, Unterstützung im Schadenfall, Schweizer Marktverständnis) as the
homepage's core message; the document-upload-with-tabs pattern (expanded
into `/analyse/`); the 3-step approach (kept in substance, expanded to 5
steps at `/ablauf/`).

Corrected from the current site (§2.2): the FINMA-Nr/UID mislabeling; a
canton mismatch (Impressum says Zürich, address is Cham/Zug); missing full
legal company name; a phone number that "looks like a placeholder"; a
Datenschutz page too short for the revised nDSG, especially given the
health/financial data the upload form handles; the missing Art. 45 VAG
pre-contractual information page (a **legal duty**, not optional); and the
`Kontakt` nav item currently jumping to `#dokumente` instead of being a real
page.

---

## 2. Canonical sitemap (guide §3, verbatim route list — this phase's route
migration was checked against this table directly and matches it exactly)

```
/                                   Home
/privatkunden/                      Private clients – overview
/privatkunden/krankenkasse/         Health insurance (basic & supplementary)
/privatkunden/wohnen-eigentum/      Home & property
/privatkunden/fahrzeug-reisen/      Vehicle & travel
/privatkunden/vorsorge/             Pension provision & life insurance
/privatkunden/rechtsschutz-cyber/   Legal protection & cyber
/unternehmen/                       Business clients – overview
/unternehmen/betriebshaftpflicht/   Business liability
/unternehmen/sachversicherung/      Property insurance, inventory & real estate
/unternehmen/personal/              Daily sickness benefits & accident insurance (KTG/UVG)
/unternehmen/berufliche-vorsorge/   Occupational pension (BVG)
/unternehmen/flotten/               Fleet insurance
/unternehmen/cyber-rechtsschutz/    Cyber & business legal protection
/themen/familie/                    Life situation: families
/themen/neu-in-der-schweiz/         Life situation: new in Switzerland
/ablauf/                            How it works (5-step advisory process)
/schadenfall/                       Report a claim (online form)
/ueber-uns/                         About us (team + reviews)
/ratgeber/                          Guide/blog
/analyse/                           Free analysis (document upload)
/kontakt/                           Contact
/impressum/, /datenschutz/, /erstinformation/    Legal pages, own URLs, no modals
```

Every one of these routes now exists and resolves. `/erstinformation` is a
documented scaffold (legal content blocked, see §8).

## 3. Old → new route mapping

| Old V2 route | New canonical route | Status |
|---|---|---|
| `/privatkunden/gesundheit` | `/privatkunden/krankenkasse` | 308 redirect in `next.config.ts` |
| `/privatkunden/vorsorge-vermoegen` | `/privatkunden/vorsorge` | 308 redirect |
| `/privatkunden/recht-cyber` | `/privatkunden/rechtsschutz-cyber` | 308 redirect |
| `/privatkunden/wohnen-eigentum` | *(unchanged)* | kept |
| `/privatkunden/fahrzeug-reisen` | *(unchanged)* | kept |
| `/unternehmen/inventar-immobilien` | `/unternehmen/sachversicherung` | 308 redirect |
| `/unternehmen/gesundheit-unfall` | `/unternehmen/personal` | 308 redirect |
| `/unternehmen/flottenversicherung` | `/unternehmen/flotten` | 308 redirect |
| `/unternehmen/betriebshaftpflicht` | *(unchanged)* | kept |
| `/unternehmen/berufliche-vorsorge` | *(unchanged)* | kept |
| — | `/unternehmen/cyber-rechtsschutz` | genuinely new |

Redirects: `next.config.ts` `redirects()`, `permanent: true` (308) — the
guide's own §5.2 explicitly requires "clean 301 redirects" for the old
anchors/URLs; 308 is the modern equivalent that preserves method, and is
what Next.js's routing layer produces for a permanent redirect. Old route
folders were deleted outright (the redirect table is the only remaining
trace, which is correct — an empty page component would just be dead code
duplicating what the redirect does). Internal links updated to canonical
routes only (verified via full-repo grep — see §12); the mega menu,
showcase, hero form, and sitemap are all data-driven off `privateServices`/
`businessServices`, so they picked up the rename automatically.

## 4. Final private taxonomy (5 services, unchanged order)

| # | Slug | Title |
|---|---|---|
| 1 | `krankenkasse` | Krankenkasse |
| 2 | `wohnen-eigentum` | Wohnen & Eigentum |
| 3 | `fahrzeug-reisen` | Fahrzeug & Reisen |
| 4 | `vorsorge` | Vorsorge |
| 5 | `rechtsschutz-cyber` | Rechtsschutz & Cyber |

Plus two non-service life-stage hubs in the Privatkunden mega menu:
**Familie** (`/themen/familie`), **Neu in der Schweiz**
(`/themen/neu-in-der-schweiz`) — guide §3.1: "5 subpages plus the 2
life-situation pages". Kept out of `privateServices` on purpose (they're
content hubs, not insurance products, and folding them in would have broken
the index-alignment `serviceExtras`/`serviceVisuals`/`serviceSubtopics` rely
on).

## 5. Final business taxonomy (6 services — CRITICAL CHANGE)

| # | Slug | Title |
|---|---|---|
| 1 | `betriebshaftpflicht` | Betriebshaftpflicht |
| 2 | `flotten` | Flotten |
| 3 | `berufliche-vorsorge` | Berufliche Vorsorge |
| 4 | `sachversicherung` | Sachversicherung |
| 5 | `personal` | Krankentaggeld & Unfall |
| 6 | `cyber-rechtsschutz` | Cyber & Rechtsschutz |

`businessServices` now has **six** canonical entries (guide §3.1: "6
subpages"). "5 Versicherungsbereiche" must no longer be used as a stat/proof
claim for Unternehmen — the locked 7E hero's `proofValue` still says this
and is flagged in §9 as needing a content-compliance update (not changed in
this phase, since that hero is otherwise locked).

Array order kept identical to V2 (not reordered to the guide's own 1–6
numbering) to avoid shifting which service gets which alternating
accent/image-side treatment in the locked `CategoryServiceRow` list on
`/unternehmen`. The new sixth service is appended at the end.

**Cyber & Rechtsschutz (`cyber-rechtsschutz`) is genuinely new** — no V2
service, no existing deep-page content. Its guide copy (§4.14) exists —
Headline "Die neuen Betriebsrisiken sind digital und juristisch.", blocks
Cyber / Betriebsrechtsschutz — and is recorded for the future deep-page
build, but **not yet wired in**: `content/de/business.ts`'s current
`body`/`bullets` for this service are still the private Rechtsschutz & Cyber
wording reused as an honest placeholder (clearly commented), and its route
(`app/unternehmen/cyber-rechtsschutz/page.tsx`) is a scaffold — real hero,
real `ServiceInquiry` form, real closing CTA, but not the full FINWIWO
chapter architecture the other five deep pages have (needs its own
live-FINWIWO audit).

## 6. New required pages

| Route | Purpose | This phase |
|---|---|---|
| `/themen/familie` | life-stage hub | scaffold, guide's real H1/intro available in `content/de/clientGuide.ts` but not yet wired into a full page |
| `/themen/neu-in-der-schweiz` | life-stage hub | scaffold, same |
| `/ablauf` | 5-step advisory journey | scaffold, real 5-step copy in `content/de/clientGuide.ts` but not wired into the page yet — see §13 |
| `/schadenfall` | claims support | scaffold, real copy available (`clientGuideSchadenfall`), simplified inline copy used on the live page for now |
| `/ratgeber` | articles/guidance hub | scaffold, no articles (guide §4.21: delivered separately by the client, not part of this brief) |
| `/analyse` | document upload/analysis | **functional** — reuses real `DocumentsSection` |
| `/erstinformation` | VAG pre-contractual disclosure | scaffold, content blocked (§8) |

None received a full FINWIWO-fidelity visual pass this phase — out of
scope. `/analyse` is functional today because it's direct reuse of
already-working infrastructure, not new design. `/ueber-uns`, `/kontakt`,
`/impressum`, `/datenschutz` are unchanged.

## 7. Final German copy — transcribed, not yet wired into locked pages

Guide chapter 4 supplies final headline/body/block copy: *"paste 1:1, do not
translate, do not reword."* This phase transcribed the guide's copy
**verbatim** into `content/de/clientGuide.ts` (home, private hub, business
hub, `/ablauf`, `/schadenfall`, `/themen/*`, `/analyse` note, `/kontakt`,
`/ueber-uns`, and the reusable end-of-page CTA block spec) — real text, not
placeholders, sourced by reading the actual `.docx` guide rather than
approximating from a summary.

**What this phase deliberately did NOT do:** rewrite the locked
`/privatkunden` and `/unternehmen` hero sections, or the new scaffold pages'
inline copy, to use this transcribed text. That's explicit "mass visual-page
rewrite" territory the brief excluded. The data now exists and is correct;
wiring it in is the next phase's job.

### PENDING CLIENT-COPY COMPLIANCE (next phase(s))

- [ ] `/unternehmen` hero H1/subline → `clientGuideBusinessHub.h1`/`.subline`
- [ ] `/unternehmen` hero `proofValue` ("5 Versicherungsbereiche") → needs a
      6-service-accurate replacement
- [ ] `/privatkunden` hero H1/subline/tiles → `clientGuidePrivateHub`
- [ ] Home page: hero headline/subline/buttons, 3-value block (digital /
      unabhängig / persönlich — replaces or sits alongside the four
      principles per guide §4.1), teaser tiles, newsletter block copy → all
      in `clientGuideHome`
- [ ] `/ablauf` → replace the current plain step-name list with
      `clientGuideAblauf.steps` + `kostenblock`, reconciled against
      FINWIWO's visual process module (see §13)
- [ ] `/schadenfall` → replace current simplified copy with
      `clientGuideSchadenfall` (exact intro/steps/emergency box)
- [ ] `/themen/familie`, `/themen/neu-in-der-schweiz` → replace scaffold
      copy with `clientGuideThemen.familie`/`.neuInDerSchweiz`
- [ ] `/analyse` → add `clientGuideAnalyseNote` under the form, plus the
      guide's "three trust points" (SSL-encrypted, confidential handling,
      reply within two working days — §4.19; the current form's trust line
      is older wording)
- [ ] `/kontakt` → `clientGuideKontakt` H1/intro; guide also wants an
      embedded map, availability hours, social icons, and an appointment
      booking widget (§4.20) — all pending client inputs (§8)
- [ ] `/ueber-uns` → `clientGuideUeberUns` H1/intro, plus team section
      (photo/name/role/FINMA number/email per person) and a reviews
      section — both pending client inputs (§8)
- [ ] Ten `/ratgeber` launch articles — **explicitly not part of this
      brief** (guide §4.21: "delivered separately")
- [x] ~~Five~~ Four `/privatkunden/krankenkasse` FAQ items with exact copy
      already given in the guide (§4.3) — DONE, Phase 7F.7: wired into the
      live deep page via `CategoryFaq` (the guide's own count is 4, not 5).
- [x] A genuine **"CTA block" component** distinct from the existing
      `FinalCta` — guide §7 specifies title "Bereit für den Überblick?",
      one sentence, button "Kostenlose Analyse starten" → `/analyse/`, to
      close *every* topic page. `content/de/clientGuide.ts` now holds this
      as `clientGuideTopicCta`. DONE as `CategoryTopicCta` — built in Phase
      7E.10, locked on `/unternehmen`, and reused as-is on
      `/privatkunden/krankenkasse` in Phase 7F.8. The old `FinalCta`
      component (used on the homepage) was **not** rewritten or replaced —
      it stays what it already is; only new topic-page closings use
      `CategoryTopicCta`.

## 8. Navigation — one structural gap found, not fixed

Guide §3.1, verbatim structure: *"Privatkunden (mega-dropdown: 5 subpages
plus the 2 life-situation pages) · Unternehmen (mega-dropdown: 6 subpages) ·
So funktioniert's · Schadenfall · Über uns (dropdown: Über uns, Ratgeber,
Kontakt) · button on the right: «Kostenlose Analyse»."*

**What this phase built:** all six top-level items (`So funktioniert's`,
`Schadenfall`, `Ratgeber`, `Über uns`, `Kontakt`) as flat top-level links —
every page is reachable, nothing is missing or dead. **What it does not
match:** the guide wants `Über uns` to be its own small dropdown containing
`Über uns` / `Ratgeber` / `Kontakt`, not three flat siblings.

This was a deliberate scoping decision, not an oversight: `Header.tsx`
currently only supports two nav-item shapes (a full mega-panel or a plain
link) — building a third, smaller dropdown interaction is a Header
*behavior* change, which the brief explicitly excluded ("do not redesign
Header") for this reconciliation phase. Content-wise nothing is missing;
structurally it's flatter than the guide wants. **Action for the Header
fidelity phase:** add the small "Über uns" dropdown, most likely re-checked
against how finwiwo.ch itself handles a lightweight (non-mega) dropdown
group, per the guide's own "adopt the structure and type of elements from
finwiwo.ch" instruction.

Separately, the header's primary CTA button label was corrected to
**"Kostenlose Analyse"** (guide's exact wording) — this is pure copy, zero
interaction-pattern risk, so it was applied immediately across `Header`,
`MobileMenu`, and `MegaMenu`'s shared `primaryCta`, all of which already
pointed at `/analyse` (see §10).

**Bug found and fixed while doing this:** `MegaMenu.tsx` had a hardcoded
`children.slice(0, 3)` / `children.slice(3, 5)` two-column split that
silently dropped anything past 5 items. With Unternehmen now at 6 and
Privatkunden at 7, that would have silently hidden the new services/pages
from the mega menu with no error. Replaced with a length-aware midpoint
split (`Math.ceil(children.length / 2)`) — same two-column visual grammar,
no longer truncates. `MobileMenu.tsx` already mapped the full children array
with no slicing, so it needed no change. This was a necessary correctness
fix to satisfy the IA requirement, not a redesign.

Header/MegaMenu timing, hover-intent delays, and accessibility semantics
are otherwise untouched.

## 9. Business hero form (7E.1A) — service list updated

`CategoryHeroBusinessForm` derives its checkbox list from `businessServices`
directly, so updating the taxonomy was sufficient — the form now genuinely
offers all six services with no change to the form component itself beyond
the new mandatory consent checkbox (§11). Selected values still submit
through the unmodified `/api/documents` pipeline, `form_type: "unternehmen"`,
joined into the existing `service` field.

## 10. `CategoryServiceShowcase` cross-navigation (locked `/privatkunden`)

Its Unternehmen dataset comes from `businessServices` too, in a responsive
grid that already wraps naturally — the sixth service wraps to a second row
with no geometry change and no change to `/privatkunden`'s own Privatkunden-
side rendering.

## 11. Form privacy consent (client requirement, now implemented)

Guide §6.4: *"Every page with a form: mandatory checkbox linking to the
privacy policy."* Every real form in the codebase now carries a mandatory,
`required` consent checkbox linking to `/datenschutz`, enforced both
client-side (`required` attribute) and server-side
(`/api/documents/route.ts` now rejects any submission missing `consent`,
regardless of `form_type`):

- `DocumentsSection` (homepage `#dokumente`, `/kontakt`, `DocumentsModal`,
  `/analyse` — one shared component, one fix covers all four surfaces)
- `AdvisoryConversion` (homepage + reused on `/privatkunden`)
- `CategoryHeroBusinessForm` (`/unternehmen` hero)
- `ServiceInquiry` (every deep service page, both audiences)

No form in the codebase currently lacks this checkbox.

## 12. Email / spam / confirmation

Guide §7: *"Forms (analysis, claims, contact) with spam protection, email
notification to info@neosura.ch and a confirmation email to the sender."*

**What exists today (audited):**
- Resend delivery to `info@neosura.ch` (`CONTACT_RECEIVER_EMAIL`, defaults
  to `info@neosura.ch`) — real, works when credentials are present.
- Honest failure path: missing credentials or a Resend error → HTTP 502 +
  `deliveryFailed: true`, UI shows the direct-email fallback rather than
  claiming success.
- Field sanitization against header/body injection via a direct API call.

**What's genuinely missing (documented, not faked):**
- **Sender confirmation email.** Not present. Should be added *after* the
  main delivery to `info@neosura.ch` succeeds (a second `resend.emails.send`
  keyed off the first one's success), never as a substitute for real
  delivery confirmation. **Not built this phase.**
- **Explicit spam protection** beyond input sanitization — no honeypot, no
  rate limiting, no CAPTCHA on `/api/documents`. **LAUNCH BLOCKER.**

## 13. Newsletter — LAUNCH BLOCKER

> **LAUNCH BLOCKER — NEWSLETTER PROVIDER / DOUBLE OPT-IN CONFIG REQUIRED**

Guide §7: *"Newsletter signup with double opt-in."* Guide §4.1 also specifies
exact home-page newsletter copy (now in `clientGuideHome.newsletter`). No
newsletter provider, API key, list ID, or double-opt-in flow exists anywhere
in this codebase or its environment configuration. `AdvisoryConversion` was
**not** converted into a fake newsletter endpoint — it stays exactly what it
already honestly is. Building a real newsletter needs: (1) a provider
decision, (2) API credentials, (3) a genuine double-opt-in flow (subscribe →
confirmation email → confirmed state) — meaningfully different
infrastructure from the one-shot advisory emails that exist today. Blocked
until the provider decision is made.

**Phase 7E.9 update** — `/unternehmen`'s own newsletter UI
(`CategoryNewsletter`, a dedicated component, not a semantic reuse of
`AdvisoryConversion`) is now built, live-remeasured independently from
`AdvisoryConversion`'s own instance, with the exact `clientGuideHome
.newsletter` title/body. It still makes **zero** network calls on submit —
no `/api/documents`, no other endpoint, no fake success. Submitting shows a
neutral message ("Die Newsletter-Anmeldung wird in Kürze freigeschaltet.
Vielen Dank für Ihr Interesse!") instead of any subscribed/success state.
This status entry (LAUNCH BLOCKER) is unchanged by that work — the UI
exists and is truthful, but the underlying provider/DOI integration this
section describes still does not, and remains required before go-live. See
docs/finwiwo-architecture/unternehmen-newsletter.md for the full record.

**Phase 7F.8 update** — `/privatkunden/krankenkasse` now also renders the
same `CategoryNewsletter` component (its own Krankenkasse newsletter
instance was independently re-measured, not assumed identical to
`/unternehmen`'s, and confirmed genuinely the same architecture — 15px
radius, transparent background, no scale transform, no swash, the same
Vorname/Nachname/E-Mail field family, same avatar-cluster social proof
not reproduced), reused as-is with no new props, with the same exact
`clientGuideHome.newsletter` title/body. Same truthful behavior: zero
network calls, no fake success, neutral unavailable message. **This
status entry (LAUNCH BLOCKER) remains unchanged** — the UI is complete
and truthful on this page too, but the real provider/double-opt-in
integration still does not exist and remains required before go-live.
Do not mark newsletter functionality COMPLETE anywhere in this document
until that integration exists.

## 14. Partner logos / reviews / social / team / booking — pending inputs

Guide §8 lists these explicitly as **client-supplied placeholders that must
not be invented by the team.** None exist as real data anywhere in this
project:

- Partner/insurer logo list (for the home-page logo bar, guide §4.1/§2.3)
- Google review badge + count (guide §2.3/§5.2 — requires a Google Business
  Profile to exist first)
- Team member details: photo, name, role, **FINMA register number per
  advising person**, email (guide §4.18, §8)
- Customer video testimonials (guide §2.3 — "reserve a placeholder section")
- Social media profiles: Instagram, LinkedIn, TikTok, Facebook (guide §8)
- Appointment-booking widget account/link, e.g. Calendly (guide §4.20, §8)

## 15. Bear brand element — merged design rule

Guide §2.1/§7: the bear is a recognisable brand element, reused as **at
least one illustration per subpage**, in the existing style (reuse or add
new ones matching it). Guide §6.4: **the bear must not appear on legal
pages** (Erstinformation, Impressum, Datenschutz).

This phase added no bear imagery to any new scaffold page — they're
intentionally minimal (heading + paragraph, no imagery yet). Placement is a
per-page decision for each page's own FINWIWO-fidelity pass. Existing bear
usage in `MegaMenu.tsx` is untouched.

## 16. Five-step advisory journey vs. FINWIWO 4-step visual module

**Two distinct things, not conflated:**

- **FINWIWO's visual process architecture** — the 4-column, icon-badge,
  numbered-step grid already measured and built (`CategoryProcess`, Phase
  7D.6) for `/privatkunden`. That component's *geometry* stays the FINWIWO
  reference.
- **The client's content** (guide §2.1, §4.16, fianza.ch-inspired): a
  **five**-step journey — Analyse → Auswertung → Lösungsvorschlag →
  Umsetzung → Begleitung — at canonical `/ablauf`, "one illustration per
  step" (i.e. bear illustrations, not the FINWIWO icon-badge treatment).

Guide §4.16 is explicit that this is **fianza-style**, not a forced fit into
FINWIWO's 4-step grid — so the reconciliation question isn't "how do we
squeeze 5 items into `CategoryProcess`," it's "does `/ablauf` need its own
distinct visual module (bear-illustrated, fianza-inspired) separate from
`CategoryProcess` entirely?" That decision is deferred to `/ablauf`'s own
fidelity pass. `CategoryProcess`'s existing 4-step instances were **not**
globally changed. `/ablauf` currently shows the five step names as a plain
list — real content (`clientGuideAblauf`) exists and is not yet wired in.

## 17. SEO

Guide §5.1 supplies a **complete meta title/description table for every
page** — transcribed in full in the guide itself; not duplicated here to
avoid drift between two copies, but every string in it is final copy per
the same "paste 1:1" rule as chapter 4. **Not yet wired into `pageMetadata()`
calls this phase** — the current `title`/`description` args on each page
are still the older NEOSURA-authored copy, which is a good functional
placeholder (real title/description, real length, no missing metadata) but
not yet the guide's exact strings. Flagged as pending compliance work, same
category as §7.

What this phase did do: `app/sitemap.ts` updated with the new canonical
routes; canonical URLs are correctly per-route via each page's own `path`
argument; one `<h1>` verified per page across every route touched.

Guide §5.2 requirements **not done this phase** (all need inputs/content
this phase doesn't have): Google Search Console property + sitemap
submission; Google Business Profile creation/linking (also blocks the
review badge, §14); `Organization`/`LocalBusiness` structured data on the
home page; `FAQPage` structured data (needs finished FAQ copy per page);
`Article` structured data (needs `/ratgeber` articles, guide's own §4.21
scope exclusion); image alt-text audit against the guide's "descriptive alt
texts" requirement; mobile LCP/PageSpeed verification.

## 18. Legal — CRITICAL, launch blockers

Guide §2.2/§6.2 identifies the exact legal-notice errors; **fixed this
phase** in `content/de/legal.ts`:

- `CHE-330.617.129` was labelled `"FINMA-Nr"` — corrected to `"UID:
  CHE-330.617.129"` (it is the Unternehmens-Identifikationsnummer, not a
  FINMA register number).
- `"Eingetragen im Handelsregister des Kantons Zürich"` doesn't match the
  Cham (canton Zug) address — changed to the guide's own bracketed
  placeholder `[KANTON GEMÄSS HR-AUSZUG]` rather than silently asserting
  either Zürich or Zug.
- The full legal company name was missing (just "neosura") — changed to the
  guide's placeholder `[VOLLSTÄNDIGE FIRMA GEMÄSS HANDELSREGISTER]`.
- `content/de/legal.ts`'s Impressum data now mirrors the guide's exact §6.2
  template structure and wording, including its own bracketed placeholders
  verbatim — this is intentional: the guide explicitly says *"Until
  delivered, the placeholders in square brackets remain in place; go-live
  only after all placeholders are replaced."* Rendering `[BRACKETED]` text
  live is the guide's own specified behavior for an unresolved legal fact,
  not a bug to hide.

**Still required before go-live (guide §8, none fabricated):**

- [ ] `[VOLLSTÄNDIGE FIRMA GEMÄSS HANDELSREGISTER]` — full legal company
      name incl. legal form
- [ ] `[KANTON GEMÄSS HR-AUSZUG]` — confirmed register canton
- [ ] `[FINMA-REGISTERNUMMER]` — format `F0xxxxxxx`, from the FINMA
      intermediary register
- [ ] `[TELEFONNUMMER VERIFIZIERT]` — confirm or replace `+41 44 500 12 34`
- [ ] `[NAME GESCHÄFTSFÜHRUNG]` — authorised representative
- [ ] Team details (photo/name/role/FINMA number/email, per person)
- [ ] Partner/cooperation company list (also needed for §14's logo bar)
- [ ] Professional indemnity insurer + coverage details
- [ ] Competent ombudsman's office
- [ ] `[3A-MAXIMALBETRAG AKTUELLES JAHR]` — current pillar 3a maximum, for
      `/privatkunden/vorsorge` and guide articles
- [ ] `/erstinformation` page's real Art. 45 VAG content (page scaffold
      exists; guide §6.1 lists the exact required content items — identity,
      FINMA register entry + link, untied-intermediary status, remuneration
      type/handling per Art. 45b VAG, cooperating insurer list, liability +
      professional-indemnity details, data-processing purpose, advisor
      training per Art. 43 VAG, ombudsman) — **also required as an
      identical downloadable PDF**, not just the page (guide §6.1)

## 19. Privacy policy — required additions (not fabricated)

Guide §6.3: the current five-line policy doesn't satisfy the revised Swiss
Data Protection Act (nDSG), "especially for the document upload, which
involves sensitive health and financial data." Required additions, none
invented here:

- Controller with full company name + a data-protection contact
- Document upload: purpose, retention period, hosting location (Switzerland/
  EU — state which), encryption; explicit statement that uploaded policies
  can contain **sensitive personal data** (health/financial)
- Disclosure to insurance companies during quote requests/intermediation
- Processor list with location: hosting, form service, appointment booking,
  newsletter tool
- Cookie/tracking disclosure — a genuine-decline-option cookie banner *if*
  analytics/ad pixels are used; otherwise a technically-necessary-cookies
  note suffices
- Data-subject rights, including the right to complain to the **EDÖB/FDPIC**
- Guide's own note: *"The final wording of the privacy policy will be
  produced once the definitive tool list is available; the client will
  deliver the draft."* — i.e. this is explicitly not this team's copy to
  write from scratch once the tool list lands.

Not added to `content/de/legal.ts` this phase — writing it requires facts
(hosting provider, retention periods, processor list) this phase doesn't
have.

## 20. Design/technical spec items not yet actioned (guide §7)

Recorded here so they aren't lost, not built this phase:

- FAQ accordion as a reusable component (one already exists,
  `components/service-deep/ServiceFaq.tsx` — verify it matches the "so more
  pages can receive FAQs later" reusability goal before assuming it's done)
- Blog/guide as a CMS section (so `/ratgeber` articles can publish without a
  developer) — `/ratgeber` is currently a static scaffold
- Upload constraints (SSL, PDF/JPG/PNG, 10 MB/file, multiple files) — **this
  already matches** the existing `/api/documents` implementation, confirmed
  during this phase's audit, no change needed
- Mobile-first approval basis / PageSpeed ≥ 90 target — not verified this
  phase

## 21. Regression / QA summary

All locked FINWIWO-fidelity work (homepage, `/privatkunden`, the approved
`/unternehmen` 7E sections) renders unchanged; all six business and five
private service routes resolve at their new canonical URLs; all six old V2
URLs 308-redirect correctly; no internal link anywhere in the codebase still
points at an old slug; `npm run lint`, `npx tsc --noEmit`, and `npm run
build` all pass. Full detail in the phase report.

## 22. Client Copy Compliance (Phase 7M.1)

**Phase 7M.1** — 4 September 2026. Content-compliance-only pass: no locked
FINWIWO-fidelity section was redesigned; every change below is a text-value
swap inside existing props/content-data fields. Every string touched was
cross-checked against a fresh re-extraction of `Neosura Website Guide
EN.docx` (§4.1–§4.20), not recalled from memory. Status key:
**COMPLETE** (exact guide copy now wired in), **PARTIAL** (some slots
updated, others CLIENT GUIDE SILENT and left on existing approved copy),
**PENDING VISUAL PASS** (guide supplies copy but wiring it requires a
layout/component change out of scope for a copy-only pass), **PENDING
CLIENT INPUT** (guide references a fact/asset not yet supplied).

**VISUAL SYSTEM: LOCKED — Phase 7SYS.C.** The FINWIWO-derived NEOSURA
visual system (typography scale/weight, white editorial-row surfaces,
Hero H1 hierarchy, Hero overlay/gradient treatment, 0.20 Hero parallax
ratio, swash timing/easing, button hover timing, `CategoryTopicCta`/
`CategoryNewsletter`/mobile-`Footer` density) is finalized and
documented in `docs/finwiwo-architecture/finwiwo-visual-system.md` and
`docs/finwiwo-architecture/finwiwo-visual-system-7sysb.md`. Every new
deep-page build from this point forward must use this system as its
NEOSURA implementation baseline — do not reopen it unless a genuine,
freshly-measured contradiction is found. Live FINWIWO remains the
per-route architecture/content/motion reference for each new page; only
the shared visual-system values themselves (spacing tokens, type scale,
overlay treatment, motion timing) are locked. Completed deep routes as
of Phase 7P.C: all 5 private (`/privatkunden/krankenkasse`,
`/wohnen-eigentum`, `/fahrzeug-reisen`, `/vorsorge`, `/rechtsschutz-cyber`)
and all 6 business (`/unternehmen/betriebshaftpflicht`, `/flotten`,
`/berufliche-vorsorge`, `/sachversicherung`, `/personal`,
`/cyber-rechtsschutz`) — every deep route in the client guide's six/five
taxonomy is now rebuilt onto the locked FINWIWO + 7SYS.C visual system.

**BUSINESS DEEP-PAGE SET COMPLETE — Phase 7P.C checkpoint.** All six business insurance deep pages are
visually and content complete and LOCKED: `/unternehmen/betriebshaftpflicht`,
`/unternehmen/sachversicherung`, `/unternehmen/personal`, `/unternehmen/berufliche-vorsorge`,
`/unternehmen/flotten`, `/unternehmen/cyber-rechtsschutz`. This does not imply global site completion —
other routes and the global launch blockers listed below remain outstanding.

| Route | Status | Notes |
|---|---|---|
| `/` | PARTIAL | Hero headline/subline (§4.1) and both `AudienceServices` teaser tiles (title/body/CTA) now exact. Three-value block (digital/unabhängig/persönlich) and the two hero CTA buttons have no existing homepage slot — see below, PENDING VISUAL PASS. Newsletter copy transcribed (`clientGuideHome.newsletter`) but not built — no real newsletter backend exists (unchanged 7M.0 decision). |
| `/privatkunden` | PARTIAL | Hero H1/subline (§4.2) exact, split across the locked two-tone `h1Lead`/`h1Rest` slots. Five tile bodies (`privateServices[].body`) now exact §4.2 Kachel copy. `CategoryExplainer`/`CategoryProcess`/`CategoryComparison`/`CategoryFaq`/hero `supporting`/checklist are CLIENT GUIDE SILENT for their exact role — existing approved copy retained. |
| `/unternehmen` | **COMPLETE / LOCKED (Phase 7E.11 checkpoint)** | Hero H1/subline (§4.8) exact, one sentence split at its clause boundary for the fullbleed layout's two-tone slots. Six tile bodies exact. Hero-form checkbox order now matches guide §4.8 order (display-only re-sort in `CategoryHeroBusinessForm`; underlying `businessServices` array order unchanged to protect `CategoryServiceRow` index parity). Editorial row 1 items (`businessServices[0]`/`[3]`) now exact §4.9/§4.10. Editorial row 2's three BVG/UVG/KTG items are CLIENT GUIDE SILENT for this exact abbreviated-checklist role — retained. Row intro paragraphs (both rows) are CLIENT GUIDE SILENT — retained. **Phases 7E.4-7E.10 update**: the page now also has a live-remeasured Flotten row, Cyber & Rechtsschutz row, 5-step advisory process (§4.16 exact), "Für wen"/broker-advantage trust module (§4.8's seven audiences + broker-value labels), a 6-item FAQ (every answer an exact guide sentence), a truthful non-functional newsletter UI (§4.1 copy, no fake backend, LAUNCH BLOCKER unchanged), and the **client-required standard analysis CTA is now COMPLETE**: exact guide §7 copy ("Bereit für den Überblick?"), verbatim, linking to `/analyse` — see docs/finwiwo-architecture/unternehmen-closing.md. No duplicate brand-sign-off strip was added; the existing locked Footer tagline ("Persönlich. Unabhängig. Klar.") already fills that role. **Phase 7E.11 checkpoint**: full-page regression pass (all 6 breakpoints, motion/reduced-motion, accessibility, navigation, routes/redirects, cross-page) found and fixed one real overflow bug (`CategoryBusinessPartner`'s heading at 360px, see docs/finwiwo-architecture/unternehmen-final.md) and confirmed everything else intact. `/unternehmen` is now LOCKED — do not modify further except to fix a verified shared-component regression discovered during Phase 7F deep-page work. |
| `/unternehmen/betriebshaftpflicht` | COMPLETE | `businessServices[0].body` exact; deep-page blocks (Deckung/Branchen) now exact §4.9 paragraphs (`content/de/deep/betriebshaftpflicht.ts`). |
| `/unternehmen/sachversicherung` | COMPLETE | Tile body exact; all three deep-page blocks (Inventar/Betriebsunterbruch/Gebäude und Technik) now exact §4.10 paragraphs. |
| `/unternehmen/personal` | COMPLETE (Phase 7O.A) | Tile body exact; UVG, UVG-Zusatz, and Krankentaggeld blocks all exact §4.11 (`content/de/deep/gesundheit-unfall.ts`). Phase 7O's report had incorrectly claimed UVG-Zusatz was unavailable — corrected in Phase 7O.A, which also added the guide's required Lohnfortzahlung info box (employer's continued-salary-payment obligation, verbatim) and restored the standard §7 CTA. Full visual pass complete — see docs/finwiwo-architecture/deep-krankentaggeld-unfall.md. |
| `/unternehmen/berufliche-vorsorge` | COMPLETE, LOW-CONFIDENCE MAPPING | Tile body exact; all three blocks mapped to §4.12's Vergleich/Kader/Wechsel by topic (file's own block names don't match the guide's), documented in-file — recommend a human skim of `content/de/deep/berufliche-vorsorge.ts`'s header comment. |
| `/unternehmen/flotten` | COMPLETE, LOW-CONFIDENCE MAPPING | Tile body exact; Vorteile/Schadenmanagement blocks exact §4.13; third block (`flotten`) left untouched — same by-topic mapping caveat as above. |
| `/unternehmen/cyber-rechtsschutz` | **VISUAL / CONTENT COMPLETE — LOCKED (Phase 7P.C checkpoint)** | `businessServices[5]`/`businessServiceExtras[5]` hold the real §4.14 copy. Page rebuilt (Phase 7P) onto the locked business deep-page architecture: `ServiceHeroSplit` Hero (exact §4.14 H1/intro, HERO_PRIMARY_ACTION_COUNT = 1), Betriebsrechtsschutz row (`#betrieb` live architecture narrowed to this topic a third time, image-left, exact §4.14 paragraph + checklist), standard §7 CTA. **Phase 7P.A**: the Cyberversicherung module was rebuilt on a new dedicated `BusinessCyberContent` component (text-led, 5-item two-column checklist) after a re-measurement of `#cyber` was read as having no photo at all. **Phase 7P.B**: a third, more careful re-measurement (realistic scroll + longer settle time) found `#cyber` actually does have a real, sharp foreground photo once its lazy-load resolves — a server-room cliché this project's own brief says to avoid reproducing — so `BusinessCyberContent` kept its text-led architecture but gained a deliberately faded, atmospheric background-photo layer (desktop/tablet only) instead. **Phase 7P.C**: full regression + responsive + accessibility checkpoint passed with zero issues; route LOCKED — do not modify further except to fix a verified shared-component regression. No FAQ/comparison/process/Newsletter (none reference- and client-supported — see docs/finwiwo-architecture/deep-cyber-rechtsschutz.md). This was the last of the six business deep pages — BUSINESS DEEP-PAGE SET COMPLETE. |
| `/privatkunden/krankenkasse` | **VISUAL/CONTENT PAGE COMPLETE / LOCKED (Phase 7F.9 checkpoint)** | Tile body exact; Grundversicherung/Zusatzversicherung blocks and all 4 FAQs exact §4.3 (Phase 7M.1). **Phases 7F.1-7F.8**: the page was rebuilt section-by-section against the live FINWIWO reference into a complete, legacy-free deep page — Hero (§4.3 exact H1), Statement, Explainer, Deadlines, Grundversicherung, a Franchise reference table (officially-sourced amounts, no calculator, no invented advice — TRUTHFUL CONTENT REDUCTION FROM 3→2 COLUMNS), Zusatzversicherung, a Wechselservice module (exact guide sentence + 3 derived clauses, no CTA — matches FINWIWO's own zero-interactive-element fidelity), a 4-item FAQ (guide's exact count and copy, not FINWIWO's own 8; `Erstinformation` linked inline), a truthful non-functional Newsletter UI (exact `clientGuideHome.newsletter` copy, no fake backend, LAUNCH BLOCKER unchanged), and the client-required standard analysis CTA (`CategoryTopicCta`, reused as-is from `/unternehmen`, with its existing restrained bear icon satisfying this page's own bear requirement). FINWIWO's own generic 4-step "So einfach funktioniert's" process was independently audited and INTENTIONALLY OMITTED — it conflicts with the client's canonical 5-step advisory process (documented in docs/finwiwo-architecture/deep-krankenkasse.md). No duplicate brand-sign-off strip was added; the existing locked Footer tagline already fills that role, exactly as on `/unternehmen`. **Phase 7F.9 checkpoint**: a verification-only pass (no content/architecture changes) re-confirmed every claim above fresh — sequence, anchors/routes, exactly one bear, zero stale `#beratung`/`#formular` links, zero horizontal overflow at all 6 breakpoints, zero console errors/hydration warnings with and without reduced motion, and zero regressions on `/`, `/privatkunden`, `/unternehmen`'s own shared `CategoryFaq`/`CategoryNewsletter`/`CategoryTopicCta` instances. `/privatkunden/krankenkasse` is now LOCKED — **do not modify during other deep-page builds (Wohnen & Eigentum or later) unless correcting a verified shared-component regression**, the same standing rule already in force for `/unternehmen`. Only global launch blockers (newsletter provider/DOI, `/api/documents` hardening) remain, unrelated to this page's own visual/content work. See docs/finwiwo-architecture/deep-krankenkasse.md for the full phase-by-phase record. |
| `/privatkunden/wohnen-eigentum` | PARTIAL | Tile body exact; Hausrat/Haftung blocks exact §4.4. Guide's "Gebäude" (building-insurance) paragraph has no matching field — this file's third block is a generic tie-together slot, not building-specific — PENDING VISUAL PASS. |
| `/privatkunden/fahrzeug-reisen` | PARTIAL | Tile body exact; Reisen block exact §4.5. Guide's Haftpflicht/Teilkasko/Vollkasko three-column concept has no dedicated field (that data lives in the locked `comparison` table) — applied as three checklist bullets on the existing `fahrzeugversicherung` block as the closest same-shape fit; a true three-column module is PENDING VISUAL PASS. |
| `/privatkunden/vorsorge` | COMPLETE | Tile body exact; all three blocks (Säule 3a/3b/Absicherung) exact §4.6. FAQ untouched — guide's only FAQ for this page needs a yearly-updated bracketed figure ([3A-MAXIMALBETRAG AKTUELLES JAHR]), deliberately not added — PENDING CLIENT INPUT. |
| `/privatkunden/rechtsschutz-cyber` | COMPLETE | Tile body exact; both blocks (Rechtsschutz/Cyber) exact §4.7. |
| `/themen/familie` | COMPLETE (data) | H1/intro exact §4.15. Page is still the 7M.0 minimal scaffold — visual pass pending, unchanged this phase. |
| `/themen/neu-in-der-schweiz` | COMPLETE (data) | Same as above, exact §4.15. |
| `/ablauf` | COMPLETE (data) | All 5 step bodies + Kostenblock now exact §4.16. Page is still the 7M.0 scaffold grid, not the FINWIWO-fidelity visual treatment. |
| `/schadenfall` | COMPLETE (data) | H1/intro/3 steps/Notfallbox exact §4.17. Scaffold layout unchanged. |
| `/analyse` | COMPLETE | Upload-form note now the exact §4.19 text. Three trust points added; "Antwort innert zwei Arbeitstagen" is a CLIENT-SUPPLIED CLAIM (guide §7's CTA-block copy), not invented. |
| `/ueber-uns` | COMPLETE | Hero H1/intro (`about.heading`/`about.paragraphs[0]`) now exact §4.18. `about.shortBody` (homepage Manifesto's own condensed line) is CLIENT GUIDE SILENT for that locked slot — unchanged. |
| `/kontakt` | PARTIAL | H1 exact §4.20. Lead uses the guide's own opening/closing clauses but omits its middle clause referencing appointment booking — no booking mechanism exists on this page; adding the full sentence would claim functionality that isn't real (same reasoning as the newsletter decision). Restore in full once booking exists — PENDING CLIENT INPUT (booking tool) + PENDING VISUAL PASS (booking UI). |
| `/ratgeber` | UNCHANGED | Guide gives no page-specific copy beyond "3 latest articles" teaser spec (§4.1) — no articles exist, scaffold unchanged, correctly PENDING CLIENT INPUT (article content/CMS). |
| `/erstinformation` | UNCHANGED | Legal scaffold, PENDING CLIENT INPUT as documented in §19 — out of this phase's scope (copy-only pass doesn't touch regulated legal content). |
| `/impressum`, `/datenschutz` | UNCHANGED | Legal placeholder policy from 7M.0 intentionally not touched this phase, per brief §26. |

### Items identified this phase, not fixed (documented per the brief's own escape hatch for redesign-adjacent gaps)

- **Homepage three-value block** (digital/unabhängig/persönlich, guide
  §4.1): no existing homepage section plays this role (`CoverageStrip`,
  `ProblemStatement`, `Manifesto` all serve different, already-locked
  purposes). Building it is a new section, not a copy edit — PENDING VISUAL
  PASS, candidate for Phase 7E.4 or a dedicated phase.
- **Homepage hero's two CTA buttons** (§4.1: "Kostenlose Analyse starten" /
  "So funktioniert's"): `HeroSlide.ctaPrimary` is explicitly documented as
  intentionally absent on the brand slide, and the type only supports one
  button. Adding button UI is a visual change — PENDING VISUAL PASS.
- **Service-deep-page Headline/Intro pair** (e.g. §4.3's "Krankenkasse:
  gleiche Leistung, tiefere Prämie." + its own intro paragraph, distinct
  from the shorter §4.2 hub Kachel line already wired into `.body`):
  `ServiceHero` currently renders `service.title`/`service.body` (the hub
  tile fields) as its H1/subline on all 11 deep pages, so the guide's
  richer per-page headline/intro is not yet shown anywhere. Wiring this
  correctly needs an additive optional prop on `ServiceHero` (safe-default
  pattern, doesn't disturb any current page) — PENDING VISUAL PASS, flagged
  here rather than added speculatively without visual review.
- **Partner logo bar** (§4.1) and **Google review badge** (§4.1): both
  already documented as launch blockers pending client-supplied assets in
  §12 above — unchanged.

## 23. Quality gate (Phase 7M.1)

`npm run lint` — clean. `npx tsc --noEmit` — clean. `npm run build` — clean,
all 31 routes compiled and prerendered. Screenshots captured at
`docs/qa-screenshots/phase-7m1/` (homepage, `/privatkunden` desktop +
mobile, `/unternehmen` hero desktop + mobile, `/unternehmen` editorial rows
desktop) — reviewed for overflow/collision/clipping, none found; the
`AudienceServices` teaser panels (longer §4.1 copy than the previous
placeholder) still wrap cleanly within their fixed-height panels at both
breakpoints checked.

---

*This file is the reconciliation record for Phase 7M.0 and 7M.1. Do not
delete or casually edit sections above without updating the corresponding
"pending" checklists — they're the actual tracking mechanism for what's
still owed before go-live. The source `.docx` (`Neosura Website Guide
EN.docx`) stays in the repo root as the primary artifact; this file is the
working reconciliation layer on top of it, not a replacement for reading
the original when precision matters.*
