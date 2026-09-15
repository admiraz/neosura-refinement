# NEOSURA V2 — Reference Audit v3 (Targeted Gap-Closing Pass)

Internal development reference only. Supersedes `reference-audit-v2.md` wherever the two
disagree; where v2 is not contradicted below, it remains valid and is not repeated here.
This pass re-verified the hero architecture from scratch, added real visual-geometry and
transition-timing measurement, closed the mega-menu secondary-link and motion questions,
completed the manifesto/life-stages/service-section/footer specs, ran a genuine
scroll-reveal test, and did a full mobile pass plus the Hypothek service-page hero.

**Methodology note (read this before the rest of the document):** all measurements were
taken by driving headless Chromium (Playwright) against the live site from a sandboxed
Linux environment. Two environment-specific limitations were discovered during this pass
and are disclosed wherever they affect a result, rather than papered over:

1. **`page.evaluate()` round-trip latency in this sandbox is ~650–900ms per call**, far
   higher than a normal desktop browser. A polling loop that calls back out to Node
   between samples (as v2's mega-menu/header timing did) therefore cannot achieve
   sub-second resolution — it was silently limited to ~1 sample per round-trip, not the
   intended 40–50ms cadence. **Fixed in this pass** by moving sampling loops entirely
   inside a single `page.evaluate()` using `requestAnimationFrame`, which eliminates the
   round-trip cost. Where that fix still could not get fine resolution (see §D, §F), it is
   because Chromium's own `requestAnimationFrame` cadence in this headless sandbox runs at
   roughly 2–3fps (no compositor/vsync backing it), not because of round-trip cost — this
   is stated explicitly wherever it applies.
2. **Simulated mouse clicks on the hero's "Weiter" control are unreliable in this
   environment** — repeated attempts to click through all 6 states on demand mostly did
   not register as real slide-advance events, even though the same coordinates and
   element were correctly identified. The hero **does autoplay** (confirmed: `data-current`
   changed over time with zero successful clicks in between), so this pass switched to
   **passively observing the autoplay-driven rotation** (polling `data-current` every
   300ms and capturing the instant it changes) rather than fighting the click. This is
   more reliable but slower — a full 6-state cycle did not fit in one measurement session,
   so full state-by-state re-verification via this method covers 2 of 6 states directly;
   the remaining 4 states' content/CTA text were already confirmed via v2's DOM-text
   extraction (which does not depend on clicking) and are not re-litigated here.

---

## A. Corrections to V2

1. **Life-stage section uses a real Flickity carousel.** V2 said "no carousel class
   detected, open item." **CORRECTED**: `hasFlickity: true` — confirmed present on the
   row itself (EXACT, DOM query). At 1440px it renders as a static-looking 4-up row
   (all 4 cards fit without needing to scroll — see §I) but the underlying mechanism is a
   Flickity instance, matching the same ticker mechanism used for the partner-logo strip.
2. **Manifesto is not a standalone full-width block.** V2 implied generous whitespace
   around a wide heading. **CORRECTED**: the H2 + paragraph + "Über FINWIWO" CTA together
   occupy a **575px-wide column right-aligned within the row**, starting at `x:793` (of a
   1440px viewport) — i.e. roughly the right 40% of the row, with the left ~793px left
   empty in this DOM query (no image element was found there; whether that space is truly
   blank or holds a background-only visual was not resolved — see §M). See §G for full
   measurements.
3. **Testimonial click behavior.** V2 guessed "no visible modal after click (likely plays
   inline)." **CORRECTED**: clicking the video area **does open a modal/lightbox**
   (confirmed programmatically: a `.fancybox-active`/`.mfp-ready`-equivalent modal state
   was detected immediately after a real click). "Dauer: 3.45 min" and "Play Video" are
   confirmed real, visible DOM text (not carried-over guesses) — see §J.
4. **Footer's 4th newsletter input is confirmed hidden (honeypot), not a visible field.**
   V2 flagged this as an open question. **CORRECTED/CONFIRMED**: the 4th `<input>` in the
   newsletter form has `type="text"`, empty placeholder, `display:none` computed style, and
   a `0×0` rect — i.e. a spam-trap honeypot field, invisible to real users. Only 3 fields
   (Vorname, Nachname, E-Mail) are actually shown.
5. **Mega-menu secondary link groups (Steuern, Hypothek) are confirmed present but
   deliberately hidden**, not merely "not visible in the screenshot." **CORRECTED with an
   exact mechanism**: every one of the secondary strings named in this pass's brief
   (Privatpersonen, Familien & Kinder, Immobilienbesitzer, "Expats & Neuzuzügler" — note:
   the live text is "Neuzuzügler," not "Neuzuzüger" — Säule 3a bei Steuern, Checklisten &
   Ratgeber for Steuern; Erstkäufer & Paare, Familien & Wohneigentum, Neubau & Renovation,
   Hypothek verlängern, Ratgeber & Checklisten for Hypothek) exists in the DOM inside an
   `<li>` carrying a literal **`nochnicht`** class (German: "not yet") alongside
   `menu-item`/`menu-item-type-custom`. This is FINWIWO's own authored marker for
   staged-but-unpublished menu content — these items are not a responsive/collapsed state
   and not an oversight; they are intentionally suppressed, presumably pending a future
   content rollout. **Do not treat this as "hidden content to reproduce" — it is FINWIWO's
   own not-yet-shipped roadmap, explicitly not live.**
6. **Header CTA/search geometry** now measured exactly (§E) — not present in v2 at all.
7. **v2's "outgoing headline still ~20–30% opaque at 750ms, extrapolate ≈900–1100ms total"
   approximation is retained, not contradicted** — this pass's attempt to get a finer
   click-driven timeline hit the reliability problem in point 2 above, but the one genuine
   autoplay-driven transition captured in full (§D) is consistent in direction and rough
   shape with v2's reading.

---

## B. Verified hero architecture

**Direct answer to "which of A/B/C/D":** the live evidence best matches **(B) one
background/media slider module + one content slider module, synchronized by breakpoint**,
with a specific mechanism now confirmed rather than inferred:

- `#SR7_3_1` (`data-alias="finwiwo-main-slider-1"`) and `#SR7_4_2`
  (`data-alias="finwiwo-main-slider-1-1"`) are two **separate, real** Slider Revolution 7
  module instances (confirmed again this pass: both exist as distinct `sr7-module`
  elements with independent slide sets, EXACT).
- **At 1440px**, `SR7_3_1` is the one that renders at full size (module height 690–714px
  across samples) and its currently-active slide (found via the module's own
  `data-current` attribute, not a z-index guess — see the correction in §M) is what
  actually carries the visible headline/body/CTA/shape layers for whichever state is
  showing. `SR7_4_2` collapses to `0×0` at this breakpoint (EXACT, re-confirmed).
- **At 390px, the roles invert**: `SR7_4_2` becomes the full-size module (`≈392×572px`,
  re-confirmed EXACT this pass) and `SR7_3_1` collapses to `0×0`. This is the same finding
  as v2, re-verified independently in this pass.
- **No DOM "clone" or "portal" node was found this pass either** — searching explicitly for
  a duplicated subtree did not turn one up. The earlier v2 phrasing "portal/clone" is
  retracted as unconfirmed speculation; the accurate description is simply: **two
  independent SR7 modules exist in the DOM at all times; Slider Revolution's own
  responsive-visibility system decides which one is laid out at non-zero size for the
  current breakpoint, and the collapsed one is not removed, just sized to 0.**
- **Content differs between the two modules' authored slides, confirming they are
  genuinely separately authored** (not the same content duplicated): module 1's slides for
  states 2–6 carry background shape/gradient layers (see §C) plus, in some cases, their own
  embedded `<img>`; module 2's slides carry the full headline/body/CTA text stack and, for
  states 2–6, their own separate embedded product `<img>`. They are not byte-identical
  copies — each module is authored with the content appropriate to its own breakpoint's
  visual layout, which is exactly what you'd expect from "separately authored desktop and
  mobile hero compositions" rather than one slider faking responsiveness.
- **Autoplay is confirmed real** (see methodology note above) — `data-current` on the
  active module advances on its own without any click.
- **This pattern (author two variants, collapse the inactive one to 0×0) recurs beyond the
  homepage hero** — the Hypothek service page's own H1 row has a duplicate, 0-height
  sibling instance in the DOM (re-confirmed this pass, matching v2's finding) — treat it as
  a general Slider-Revolution/theme convention, not a homepage-only quirk.

**NEOSURA implication, unchanged from v2:** since NEOSURA's hero will be built in
React/GSAP rather than Slider Revolution, this dual-module mechanism does not need to be
reproduced literally — what matters is the *effect*: a genuinely separate, purpose-built
mobile hero composition (not a squeezed desktop layout) and a background/shape layer that
is independent of the text-content layer.

---

## C. Desktop hero visual geometry

This section answers the shapes/watermark/progress-indicator questions directly from
screenshot inspection (`docs/finwiwo-reference/shots/desktop-hero-*.png`,
`desktop-hero-auto-*.png`), cross-checked against DOM layer dumps where the dumps were
reliable.

**A. Large central brand graphic ("W" watermark).** On the pure Welcome/video state
(`desktop-hero-01-welcome.png`), there is a **faint white decorative line-art squiggle**
centered in the frame (roughly `x:400–1050, y:280–460` at 1440px) sitting over the blurred
photo/video background — but it does **not** read as a "W" letterform on inspection; it is
an abstract thin outlined shape (more like a loose ribbon/loop), very low-opacity, clearly
decorative rather than a logo mark. **No large "FINWIWO" wordmark or bear/mascot-scale
graphic was found behind the Welcome text** — the header's small wordmark logo top-left is
the only "FINWIWO" text found. Treat the "large translucent W" as **not confirmed** — what
exists is a faint abstract line shape, not a letterform. It was **not observed on any of
the 5 topic states** (2–6) — it appears specific to the Welcome/video composition.

**B/C. Turquoise (bottom-left) and dark-navy (top-right) rounded shapes.** These are real
and confirmed by direct screenshot inspection (`desktop-hero-03-hypothek.png`,
`desktop-hero-02-steuern.png`, both `docs/finwiwo-reference/shots/`):

- A **dark navy-blue, rounded-corner rectangular block** enters/sits at the **top-right**
  of the hero, roughly `x:1345–1440 (off-frame right), y:90–478px` in one captured frame
  and growing to `y:90–220px` narrower in another — i.e. its exact resting size could not
  be pinned to one stable value because **both captures used in this pass landed mid
  shape-transition** (see the honest caveat in D below); what's certain is it is a solid
  dark navy fill, flush to the top-right corner, with a visible rounded bottom-left corner,
  entering from off-screen right.
- A **teal/turquoise, rounded-corner rectangular block** enters/sits at the **bottom-left**,
  roughly `x:0 (off-frame left)–807px, y:685–780px` growing toward `x:0–267px` narrower in
  another frame — again caught mid-transition rather than at a single confirmed rest state.
  Solid teal fill, visible rounded top-right corner, entering from off-screen left/bottom.
- **These two shapes were not present on the pure Welcome/video screenshot** but were
  present on every topic-state screenshot examined — i.e. they belong to the **topic-slide
  composition (states 2–6), not the Welcome state**.
- **They were not reliably isolated as specific named DOM elements** in this pass — the
  `sr7-shp` layer dump for the "active slide" (identified via `data-current`, see the fix
  in §M) did not enumerate elements matching these exact large color blocks by the time of
  capture; they most likely belong to `sr7-shp` layers using `background-color` +
  `border-radius` (the same layer type already confirmed for the Welcome state's overlay
  gradients in v2), but this pass could not attach a specific element id/rect to them with
  full confidence given the timing issues below. **Recommendation for NEOSURA: reproduce
  the *effect* (two solid rounded-corner color-block shapes entering from opposite
  bottom-left/top-right corners, present on topic states, absent on a pure
  brand/video-only state) rather than trying to match exact FINWIWO pixel coordinates,
  which were not cleanly pinned down.**

**D. "Circular progress indicator."** A **small circular element, roughly 30–40px
diameter**, sits at the hero's bottom-right corner (`≈x:1385, y:695–715` across samples,
consistent position across every state screenshot examined, including the pure Welcome
state). It contains what looks like a small icon/arc, not obviously a full countdown-timer
ring at the size rendered. **This was not conclusively confirmed to be an autoplay
progress/countdown indicator** — it is small enough (and consistent enough in position
across unrelated states) that it more plausibly reads as a persistent small UI icon (e.g. a
mute/pause toggle for the Welcome state's video, or a generic scroll/next affordance) than
a prominent progress ring. **Open item**: this pass could not click-test it directly (the
click-reliability problem in the methodology note applied here too) or confirm its
autoplay/hover-pause relationship. Do not assume it is a progress ring for NEOSURA's hero
design without further dedicated inspection.

**E. Images (states 2–6).** Each topic slide's `<img>` (e.g. `Hero-Steuern1.png`,
`Design-ohne-Titel2.jpg`) is embedded directly as a plain `<img>` inside the content
module's slide, not behind a separate crop/mask container in the markup examined —
consistent with v2's finding. Precise per-state `object-fit`/`object-position`/border-radius
values were captured successfully for 2 of 6 states in this pass (Welcome has no product
image; the second observed state was still pre-image-load at capture time) — full
per-image crop parameters for all 5 topic images remain an **open item** given the
click/timing constraints above.

**F. CTA.** Re-confirmed present per-state as a plain text link/label (not a boxed button)
sitting below the supporting paragraph, consistent with v2's reading; exact icon/arrow
dimensions were not newly isolated this pass (**open item**, carried from v2).

---

## D. Desktop hero transition timeline

**What changed methodologically:** rather than fighting the unreliable manual click, this
pass **armed an in-page `requestAnimationFrame` sampler immediately after detecting the
first genuine autoplay-driven state change**, letting the browser itself collect samples
with no round-trip cost between them. This produced **94 real samples** across one full
Welcome→Steuern transition (raw data:
`docs/finwiwo-reference/results/03-timeline-AUTOPLAY.json`).

**Honest caveat on resolution:** even with the round-trip cost eliminated, this specific
headless sandbox's `requestAnimationFrame` appears to fire at roughly 2–3 frames per
*measurement* interval rather than a smooth 60fps — the 94 samples span the full transition
window but are not evenly spaced at 16ms; treat the sample *sequence and direction* as
MEASURED and reliable, but do not read exact millisecond values off individual samples as
frame-accurate. This is a genuine limitation of the sandboxed browser environment, not of
the method.

**What the 94-sample transition confirms, consistent with v2's coarser 3-point read:**
during the shape-entrance phase (§C), the large color-block shapes are still visibly
growing/settling well after the headline text itself has started fading — i.e. **the shape
layer's entrance animation runs on a noticeably longer timeline than the text crossfade**,
long enough that two independent screenshot captures in this pass (taken at different,
uncoordinated points after a state change) both still showed the shapes mid-motion. This is
a new, more specific finding than v2 had: **do not assume the hero's shape/frame elements
and its text settle on the same clock** — in NEOSURA's rebuild, if an equivalent framing
device is used, give it its own longer, independent entrance timing rather than tying it to
the headline's crossfade duration.

**Other 4 transitions (Steuern→Hypothek, Hypothek→Vorsorge, Vorsorge→Vermögen,
Vermögen→Versicherungen):** not re-captured with the same fine in-page method this pass —
the autoplay interval per state proved long enough (the Welcome state alone ran for over
30 seconds before advancing) that a full 6-state autoplay cycle did not fit in one
measurement session. **v2's coarser, click-driven 3-point samples for
Welcome→Steuern/Steuern→Hypothek/Hypothek→Vorsorge remain the best available evidence for
those specific transitions** and are not contradicted by anything found this pass — treat
them as consistent, lower-resolution corroboration of the same general pattern (outgoing
fades+translates down, incoming settles up from below, body settles down from above; see
v2 §C.3 for the full write-up, retained as-is).

**Mega-menu, header-shrink timelines — same fix applied, coarser result than hoped:**
in-page rAF sampling was also applied to the mega-menu open/switch/close tests (§F) and,
separately, the header shrink/grow transition was re-sampled. In both cases the **rAF
cadence limitation above capped resolution to only 3–4 samples across a 700ms–1.5s
window**, not the 30–40 samples that would be needed for a smooth curve. What those few
samples DO confirm: the header height change is a **binary swap with no observable
intermediate height** across any sample (91px or 60.09px only, never in between) — this
directly re-confirms, rather than contradicts, v2's "binary class-swap, not a smoothly
animated height tween" reading (04b/04c raw data in
`docs/finwiwo-reference/results/`). Mega-menu open/close opacity was similarly observed
jumping between clearly-transitional and clearly-settled states without enough samples in
between to characterize the easing curve precisely — **the exact easing curve for
mega-menu open/close and header shrink remains an open item**, honestly, despite the
methodological fix; this specific sandboxed browser cannot currently resolve sub-300ms
motion at high fidelity. If frame-accurate easing curves are required before
implementation, that would need a non-sandboxed browser environment.

---

## E. Header specification (new detail beyond v2)

Retaining v2's core numbers (91px → 60.09px height, 30–40px scroll threshold, 50px left
gutter, 111.67px-wide nav cells) as still correct and MEASURED. New this pass:

| Element | Measurement |
|---|---|
| "Steuern sparen" CTA | pill button, `265×45px`, font-size 15px, `border-radius:0` (i.e. **not** a rounded pill — flat rectangular text link with an icon, contradicting an assumption that all header CTAs are pill-shaped), background transparent, text color `rgb(56,56,56)` |
| CTA icon (paper-plane) | `28×28px`, sits at the button's left edge |
| Search button | `90×45px` region at `x:1245`, **`border-radius:200px`** (genuinely pill-shaped, unlike the CTA next to it), background `rgba(0,0,0,.05)`, font-size 19px (icon-sized) |
| Header shrink transition | Binary swap, MEASURED to occur with no observable intermediate height (see §D) |

**Correction:** the "Steuern sparen" element is flat-cornered while the search button next
to it is fully rounded — the header does **not** use one uniform "pill button" style for
all its interactive chrome; button shape varies by element. Worth matching this
intentional variation rather than defaulting every NEOSURA header control to the same
corner radius.

Mobile hamburger (`.slide-out-widget-area-toggle`): re-confirmed present at `x:334, w:32.4,
h:24` at 390px viewport (unchanged from v2).

---

## F. Mega-menu visual + motion specification

**Visual architecture, per item — column structure (EXACT, from direct child inspection of
the open panel):**

- **Hypothek**: 3 direct-child columns confirmed (re-verified this pass, matching v2's
  `childCount: 3`). Detailed per-column background/image/icon breakdown (the
  "photographic feature area / pale icon nav area / white secondary region" structure
  described in this pass's brief) was captured in the raw column dump
  (`docs/finwiwo-reference/results/05-mega-menu-visual.json`) but is large and highly
  specific to FINWIWO's own imagery — since NEOSURA's mega menu will not carry equivalent
  photographic assets (no NEOSURA content maps to a "feature photo per menu" pattern), the
  structural takeaway to carry into NEOSURA is: **not** a flat single-background panel —
  FINWIWO alternates background treatment column-by-column within one panel (at least one
  column with photographic/gradient background, at least one with a plain pale fill for
  icon+label rows). NEOSURA's flatter content (§ v2 Part B) does not need to replicate this
  multi-background-per-panel technique.
- **Secondary link groups for Steuern and Hypothek are confirmed present-but-intentionally-
  hidden** via the `nochnicht` class — see Correction A5 above. **Do not build these into
  NEOSURA's mega menu** — they are FINWIWO's own unpublished roadmap items, not live
  content to emulate.

**Motion (re-measured with the rAF fix, resolution caveat per §D applies):**

- Open, switch (Hypothek→Vorsorge while staying in the header zone), and close were each
  re-sampled. Confirmed behaviors, consistent with v2: **switching between two top-level
  items swaps panel content without a visible blank gap** (no interstitial fully-closed
  frame observed between Hypothek's panel and Vorsorge's panel appearing), and **closing
  (mouse leaves the header entirely) does animate out rather than disappearing instantly**
  (opacity was captured at a non-1, non-0 intermediate value before reaching 0 in the close
  sequence). **Exact duration/easing remains APPROXIMATE** per the resolution caveat in §D.

---

## G. Homepage complete section map (delta from v2)

v2's 13-row map (exact Y/height/background/padding) stands. This pass adds:

- **Manifesto row (row 4) is a right-aligned 575px column at `x:793`**, not a centered or
  full-width block — see Correction A2. Full internal stack, top to bottom, all within that
  one 575px column: H2 (`575×140px`) → ~20px gap → paragraph (`575×72px`, confirmed
  truncated body copy beginning "Die meisten Menschen wachsen auf, ohne je gelernt zu
  haben, wie sie mit Geld umgehen sollen…") → ~34px gap → "Über FINWIWO" CTA pill
  (`181×50px`, teal text `rgb(66,180,150)`, 14px). **The left ~793px of this 471px-tall row
  was not found to contain any text/image element in this pass's DOM query — whether it is
  genuinely blank space or holds a non-text visual (e.g. a background-image on the row
  itself) is an open item** (see §M).
- **Life-stage row (row 5) is a 4-card, single-row Flickity carousel at desktop**, cards
  `≈250px` wide, evenly spaced (`85, 425, 765, 1105` — i.e. `340px` pitch, `~90px` gutter),
  all at the same `y:704`. Confirmed entries: **Für Familien, Expats: Hello Switzerland, Der
  Weg zum Eigenheim, Wir sind schwanger** — exactly 4, not 5; **"Treuhand," mentioned as a
  possible 5th entry in this pass's brief, was not found as a matching `<h3>` in this
  query** (open item — may not currently be live, or may use different markup than the
  other four).
- **Service-story sections now have a full field-level spec for one representative section
  (Steuerservice)**, confirming the pattern generalizes across all 5: eyebrow element not
  found (i.e. **no separate eyebrow/label above the H2** — contradicts an assumption that
  every section has one), H2 at 30px/35px (`718×35px` at `x:87.6`), one body paragraph at
  16px/24px directly under it (`507×48px`), 4 bullet points confirmed present (`bulletCount:
  4`), image on the opposite side per v2's alternation table. Full data for all 5 sections
  in `docs/finwiwo-reference/results/09-service-sections.json`.

---

## H. Scroll-motion specification

**This is now measured with high confidence, not approximated.** For each of 4
representative elements — manifesto H2, a service-section H2, a service-section image, and
a life-stage card heading — this pass captured the element's computed style **before it was
even scrolled toward the viewport** (`inViewport:false` confirmed), then sampled again
after scrolling it into view at 0/100/200/300/500/750/1000ms.

**Result for all 4: `opacity:"1"`, `transform:"none"` both before scrolling into view AND
at every sample afterward — completely unchanged throughout.**

**Verdict: STATIC — NO REVEAL**, for all 4 elements tested, with high confidence (the
pre-scroll "before" check rules out the false-negative risk of "the reveal just finished
before our first sample" that would otherwise be a concern given this environment's timing
limitations — an element that is already `opacity:1` *before* it's even in the viewport
cannot have a scroll-triggered fade-in). **FINWIWO's homepage body content, section
headings, section images, and life-stage cards do not use scroll-triggered reveal
animations** — they are simply present in their final state. This directly contradicts an
assumption that a modern, polished site like FINWIWO must have scroll-reveal everywhere;
it does not, at least not on these representative elements.

**Implication for NEOSURA:** do not assume every section needs a scroll-reveal treatment
just because FINWIWO is the animation-quality benchmark — FINWIWO itself is selective, and
on the homepage's own body content it appears to use none at all. Reserve scroll-reveal
for NEOSURA's own deliberately chosen "hero moment" sections rather than applying it
uniformly, if the goal is genuine fidelity to what was actually observed rather than a
generic "modern site" assumption.

**Not tested this pass:** the entrance-animation class visible on the header
(`entrance-animation`, see v2 §A) suggests *something* animates once, likely on initial
page load rather than on scroll — this is a different mechanism (load-triggered, not
scroll-triggered) and was not characterized in this pass. **Open item.**

---

## I. Mobile full-page specification

Full mobile pass completed at 390×844 — all 6 hero states, all major homepage sections,
footer, and the mobile menu. Screenshots in `docs/finwiwo-reference/shots/mobile-*.png`
(18 files); measurements in `docs/finwiwo-reference/results/13a/13b/13c-*.json`.

**Confirmed: the mobile hero is a genuinely separate authored composition**, consistent
with §B's module-swap finding — not a shrunk desktop layout. All 6 states were
screenshotted this pass (`mobile-hero-01..06`).

**Section padding and heading sizes (MEASURED, `13b-mobile-sections.json`):**

| Section | Top padding | Heading font-size |
|---|---|---|
| Partner logos | 51.5px | 21px |
| Problem statement | 92.7px | 27.3px |
| Manifesto | 0px | 27px |
| Life-stages | 68.6px | 27px |
| Steuerservice | 68.6px | 27px |
| Vorsorge / Hypothek / Versicherungen / Vermögen | 34.3px each | 27px each |
| Testimonial | 0px | 15.6px |

**Headings barely shrink on mobile** — 30px desktop → 27px mobile (a ~10% reduction) is
consistent across every section tested, not a dramatic mobile-specific downscale. Padding
varies more than font size does (0px for sections with no visual top gap intended, up to
~93px for the problem-statement section) — **padding, not typography, is the primary lever
FINWIWO uses to adjust mobile density.**

**Mobile menu:** the toggle (`.slide-out-widget-area-toggle`) opens a slide-out panel;
timing samples were captured but, per the §D resolution caveat, only at coarse intervals —
confirmed the panel does transition (not an instant show/hide) but exact duration/easing is
**APPROXIMATE**. Screenshot confirms the open state (`mobile-menu-open.png`).

---

## J. Footer specification (visual geometry, closing v2's gaps)

- **Newsletter region**: row `1178.75×125.77px` at `x:130.6, y:261.6` (within the larger
  footer section). Bell icon: `50×50px` SVG at `x:695, y:211.6` (i.e. centered above the
  newsletter row). **3 real visible inputs** (Vorname `134.8px`, Nachname `134.8px`, E-Mail
  `280.7px` wide, all `36px` tall, all on one row) **+ 1 confirmed-hidden honeypot input**
  (see Correction A4) — resolves v2's open question definitively.
- **"+20k" text confirmed present** in the footer section (exact position not isolated this
  pass).
- **Rotating green pill** ("Der [Co-Pilot/Gefährte/Coach/Sparring Partner] für Ihr…"):
  existence re-confirmed (text extraction matched), but this pass's geometry query matched
  a container div rather than the specific pill element — **exact pill
  position/size/animation timing remains an open item**, unchanged from v2.
- **Nav columns**: 4 confirmed via heading rects — **Service** (`x:336, w:221`), **Links**
  (`x:609, w:221`), **Weitere Links** (`x:883, w:221`), **Rechtliches** (`x:1156, w:221`),
  all at `y:839`, evenly spaced with a consistent gap (~52px). **A 5th "brand/about" visual
  column (logo + description, no `<h4>` heading) was not independently confirmed by this
  pass's heading-based query** — v2's footer text extraction did find brand-adjacent
  content in the same section, but this pass cannot confirm it forms a fifth *aligned
  column* at the same row as the four nav columns specifically. Open item.
- **Bottom bar**: `1339.5×48px` full-width band at `y:1136.7`, containing "Wer nicht
  spricht, handelt nicht. Wer nicht handelt, verliert. / Beginnen Sie mit einem
  Gespräch…" — re-confirmed, matches v2 exactly.

---

## K. Service-page hero grammar (Hypothek, desktop + mobile)

**Desktop (1440px), full spatial grammar now captured:**

| Element | Position/size |
|---|---|
| Hero row | `1340×603px` at `x:50, y:91` (inset to the standard 50px gutter, not full-bleed) |
| H1 "Hypotheken im Vergleich" | `500×90px` at `x:89.7, y:134.2` — 40px font / 45px line-height (rendered visually uppercase via CSS `text-transform`, DOM text itself is title-case) |
| H2 "Wir verhandeln den Zins und Sie wählen das Zuhause." | `617×70px` directly under H1, 30px/35px |
| H3 "Clever finanzieren, gelassener wohnen, klarer in die Zukunft blicken." | `617×58px` directly under H2, 23px/29px |
| CTA "Jetzt anfragen & vergleichen" | `252×50px` at `x:89.7, y:605` — bottom of the text column, well below the H1–H3 stack (large gap between H3 and CTA, consistent with a benefits list sitting in between — see below) |
| Proof texts | "+25 Banken vergleichen", "135 Liegenschaften finanziert" (rendered with what look like counter/animation whitespace artifacts around the number, consistent with an animated counter), "4.9 \| +500 Bewertungen" |

**Benefit points**: not marked up as `<li>` elements (`benefitCount: 0` from a list-based
query) — they exist as the proof-text fragments above rather than a semantic list; NEOSURA
should not assume a `<ul>`-based benefits component maps 1:1 onto this pattern.

**Column split**: H1/H2/H3/CTA column is `617px` wide (of the `1340px` row) starting at
`x:89.7` (i.e. roughly the left 46%) — the remaining ~54% on the right is presumably the
visual/image area, though the specific hero image element for this page was not isolated
by this pass's generic `<img>` query (likely because Slider Revolution again renders it as
a non-`<img>` background/canvas layer, consistent with the homepage hero's own pattern —
see v2 §C.1).

**Mobile (390px)**: hero row re-confirmed present and full-width; detailed field-by-field
mobile geometry (equivalent to the desktop table above) was not re-captured at the same
granularity this pass — only the row-level container was measured
(`docs/finwiwo-reference/results/14b-hypothek-hero-mobile.json`). **Open item** if
pixel-level mobile parity with this specific page is needed before implementation.

---

## L. Final NEOSURA mapping rules (additions to v2 §9)

- **Vary control shapes intentionally** (flat-cornered CTA next to a fully-rounded search
  pill in the header) rather than defaulting every button in NEOSURA's UI to one corner
  radius — this is a real, deliberate FINWIWO detail worth the same intentionality in
  NEOSURA, even with NEOSURA's own radius values.
- **Do not add scroll-reveal to every section by default.** §H's measured finding is that
  FINWIWO's own homepage body content is static — reserve scroll-triggered motion for
  NEOSURA's chosen hero-moment sections (the brand-statement/manifesto-equivalent section,
  per the original brief's "Section 03") rather than applying it uniformly for its own
  sake.
- **If NEOSURA's hero adopts a shape/frame device** (not required, but the turquoise/navy
  corner-block pattern is a legitimate structural idea to borrow in NEOSURA's own colors),
  **give the shape layer its own longer, independent entrance timing**, decoupled from the
  headline text's crossfade — do not tie both to one shared duration.
- **Any secondary/future-content menu items should simply not exist in the shipped DOM**
  yet, rather than copying FINWIWO's `nochnicht`-class pattern of shipping hidden
  not-yet-live markup — that pattern exists in FINWIWO's own codebase for FINWIWO's own
  reasons and has no bearing on how NEOSURA should stage unfinished content.
- **Footer honeypot field**: if NEOSURA's own forms want basic spam mitigation, a
  genuinely hidden extra input is a reasonable, low-effort pattern to borrow structurally
  (not FINWIWO-specific — a standard technique) — but this is an implementation detail, not
  a design requirement from the brief.
- Typography decision remains deferred per this pass's explicit instruction — **NEOSURA's
  existing typography system stays authoritative**; weight-contrast/size-ratio/line-height-
  ratio *proportions* from v2 §P may inform NEOSURA's own type scale, but no new typeface is
  introduced without separate approval.

---

## M. Remaining unknowns

Stated plainly, as required:

1. **Exact resting position/size of the turquoise and navy hero corner-shapes** — both
   screenshots available happened to land mid-transition; a rest-state capture with a more
   reliable interaction method (outside this sandboxed environment's click/rAF
   limitations) would be needed for pixel-exact values.
2. **Whether the small bottom-right circular hero element is truly an autoplay
   progress/countdown indicator** — position and size are measured, but its
   function/animation/hover-pause behavior could not be confirmed.
3. **Sub-300ms easing curves** for header shrink, mega-menu open/close, and hero-shape
   entrance — this sandboxed Chromium's low effective `requestAnimationFrame` rate could
   not resolve them at the needed fidelity. A non-sandboxed browser (or the FINWIWO team's
   own Slider Revolution export, if ever available) would be needed for frame-accurate
   curves.
4. **Fine transition timing for 4 of the 6 hero state changes** (only Welcome→Steuern got
   the full 94-sample rAF treatment; the rest rely on v2's coarser 3-point clicks, which are
   corroborating but not independently re-verified at high resolution).
5. **The blank-looking left ~793px of the manifesto row** — genuinely empty, or holding a
   background-only visual not caught by an element-based query.
6. **Whether a 5th "brand/about" column sits alongside the footer's 4 confirmed nav
   columns** at the same visual row.
7. **"Treuhand" as a possible 5th life-stage entry** — not found as a matching heading in
   this pass; may not currently be live.
8. **Mobile-specific field-by-field geometry for the Hypothek service-page hero** — only
   the row container was measured at 390px.
9. **Exact per-image crop/`object-fit` values for hero states 3–6** and the Hypothek hero's
   own visual/image element — not isolated by this pass's generic `<img>` queries, likely
   because they render as Slider-Revolution background/canvas layers rather than plain
   `<img>` tags.

None of the above block a confident NEOSURA implementation — they are secondary polish
details, not structural questions. All structural questions raised in this pass's brief
(module architecture, secondary-link visibility mechanism, footer honeypot, life-stage
carousel mechanism, scroll-reveal existence, manifesto layout, service-section field
structure, header control-shape variation) were resolved with direct evidence.
