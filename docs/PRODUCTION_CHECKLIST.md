# NEOSURA V2 — Production Checklist

Written at the end of Phase 6B (Final Technical + Production QA). Design and page
architecture are locked; this checklist covers only deployment/technical readiness.

## BLOCKERS (must resolve before go-live)

- [ ] **Set hosting environment variables.** The Documents/ServiceInquiry forms
      (`app/api/documents/route.ts`) are currently **NOT LIVE** — no `.env` file
      exists in this environment, so email delivery cannot succeed and every
      submission returns the honest "not available" fallback. Before launch, set
      on the hosting platform:
      - `RESEND_API_KEY` — from the Resend dashboard.
      - `CONTACT_FROM_EMAIL` — must be an address on a domain **verified** in
        Resend (Domains → Add Domain → add the DNS records Resend provides).
        Example: `NEOSURA Formular <formular@neosura.ch>`.
      - `CONTACT_RECEIVER_EMAIL` — optional, defaults to `info@neosura.ch`.
      Never commit real values; `.env.example` documents the shape only.
- [ ] **Verify the Resend sending domain's DNS records** (SPF/DKIM/DMARC as
      given by Resend) are added at the domain registrar/DNS provider and show
      as verified in the Resend dashboard — an unverified domain will silently
      fail or land in spam.
- [ ] **Run one real, live end-to-end email test** after the above is
      configured: submit the full Documents form with a small attachment, and
      the compact Service Inquiry form on any service page, and confirm both
      arrive at `CONTACT_RECEIVER_EMAIL`. This was **not possible** during this
      QA phase (no credentials available in this environment) and must be done
      once real credentials exist, ideally in a staging environment before
      production traffic hits the form.
- [ ] **Confirm the production domain and HTTPS.** `siteMeta.url` in
      `content/de/site.ts` is set to `https://neosura.ch` — this value is the
      single source used for `metadataBase`, canonical URLs, Open Graph URLs,
      `sitemap.xml`, `robots.txt`, and the JSON-LD `Organization` schema. If the
      production domain differs from `neosura.ch` at launch, update this one
      value and every dependent surface updates automatically. Confirm the
      hosting platform terminates HTTPS on this domain (required for OG/social
      previews and general production hygiene).
- [ ] **Run the deployment build/start sequence on the actual hosting
      platform** and re-verify: `npm run lint`, `npx tsc --noEmit`,
      `npm run build`, `npm run start` (or the platform's equivalent). All four
      passed cleanly in this QA phase locally — re-confirm on the real deploy
      target since build behavior can differ per platform (Node version, file
      system case-sensitivity, etc.).
- [ ] **Re-check `/sitemap.xml` and `/robots.txt` on the live production
      domain** after deploy — confirm they resolve at the real domain and that
      `robots.txt`'s `Sitemap:` line points at the real, reachable sitemap URL.

## NON-BLOCKING POLISH

- [ ] **Photography — explicitly deferred, not a launch blocker per this
      phase's brief:**
      - Wohnen & Eigentum hero photo
      - Private Cyber service photo
      - Berufliche Vorsorge photography (duplicate-feeling with its category
        siblings)
      - Repeated hero/closing photos reused across multiple service pages
      None of these are broken, missing, or technically wrong — they're a
      photography/content refresh opportunity for a later pass, not a QA
      defect.
- [ ] **Dedicated Open Graph/social image.** No purpose-built 1200×630 OG
      asset exists yet. All pages currently share the existing `bg-hero.webp`
      (2752×1536, already used live in the homepage Hero) via the
      `pageMetadata()` helper in `lib/seo.ts` — a reasonable, truthful default,
      but a purpose-cropped social card would render better in link previews.
- [ ] **No rate limiting / spam protection on `/api/documents`.** The endpoint
      has no request throttling or honeypot field; abuse risk is currently
      bounded only by Resend's own account-level sending limits and whatever
      protection the hosting platform provides at the edge. Worth adding
      (e.g. a honeypot field or basic per-IP throttling) before high-traffic
      launch, but out of scope for this QA phase since it wasn't a pre-existing
      defect.
- [ ] Two unused image assets sit in `public/images/` with no code reference
      (`service-mobile.webp`, `service-mobile2.webp`) — harmless (never
      shipped to a page), but could be removed in a later cleanup pass.

## Reference — what's already confirmed working

- Build: `npm run lint` (clean), `npx tsc --noEmit` (clean), `npm run build`
  (23 routes generated, all static except the dynamic `/api/documents`),
  `npm run start` (production server serves all 17 real routes at 200, unknown
  paths correctly 404 via the custom `app/not-found.tsx`).
- SEO: every page has a unique `<title>`, unique meta description, canonical
  URL, exactly one `<h1>`, and consistent Open Graph/Twitter card metadata via
  `lib/seo.ts`. `app/sitemap.ts` and `app/robots.ts` are wired to the same
  `siteMeta.url` source. One `InsuranceAgency` JSON-LD block renders site-wide
  from `app/layout.tsx`, built only from real, verifiable contact/address data
  — no fabricated ratings, reviews, or social profiles.
- Security: `/api/documents` validates required fields, email format,
  file size (10 MB/file, 20 MB total), and file type by **both** extension and
  MIME type (closing a prior gap where an empty client-supplied MIME type
  bypassed validation entirely); single-line text fields are stripped of
  newline/control characters before being written into the email subject/body
  to prevent field-spoofing via a direct API call; attachment filenames are
  sanitized before being handed to the email provider; files are held in
  memory only and never written to disk.
- Accessibility: the Documents dropzone's hidden file input now has an
  `aria-label` and is removed from tab order (`tabIndex={-1}`) so it no longer
  appears as a second, unlabeled stop after the labeled dropzone control;
  `--color-muted` and `--color-teal-ink` (`app/globals.css`) were darkened to
  clear WCAG AA 4.5:1 against every background they appear on, and the mobile
  menu's contact block went from `text-white/35` to `text-white/50` for the
  same reason — same colors/hierarchy, just enough darker/more opaque to pass.
- Responsive: `CategoryCoverageTrust` (the service-name row under category
  hero sections) no longer forces a single unwrapped line at the `lg`
  breakpoint, which was silently clipping the last item ("...Cyber") off
  the visible area at exactly 1024px width; it now wraps gracefully like it
  already did below `lg`, with no visible change at normal desktop widths.
- Performance: confirmed via direct network measurement that the homepage's
  dual desktop/mobile hero scenes do **not** double-fetch or over-fetch images
  — Next.js correctly deduplicates the identical `bg-hero.webp`/
  `logo-white.png` requests and serves the viewport-appropriate size (e.g.
  ~640w on a 390px mobile viewport, not the largest source variant). An
  apparent 60s+ load hang seen during background QA testing was reproduced
  only against the `next dev` Turbopack server, not `next build && next start`
  (69ms to `load` at mobile viewport in production) — a dev-mode artifact, not
  a production defect.
- Manifest: `public/favicon/site.webmanifest` previously shipped unedited
  scaffold placeholder content (`"MyWebSite"`/`"MySite"`) and referenced two
  PNG icons (`web-app-manifest-192x192.png`/`-512x512.png`) that don't exist
  anywhere in the project — a broken "Add to Home Screen" experience on
  mobile. Now uses the real site name and points at the favicon files that
  actually exist.
