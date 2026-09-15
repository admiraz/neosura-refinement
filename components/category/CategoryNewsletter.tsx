"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";

interface CategoryNewsletterProps {
  title: string;
  body: string;
  ctaLabel: string;
}

/** Phase 7E.9 — FINWIWO's `/unternehmen/` newsletter module ("Finanz-
 * Updates, die sich auszahlen."), independently live-remeasured — NOT
 * assumed identical to any other page's newsletter instance (Phase
 * 7D.9's homepage/`/privatkunden` audit found a different container:
 * this one is transparent with only `border-radius: 15px` and no scale
 * transform, unlike the 50px-radius/scale-0.95 card family used by
 * Process/Partner/FAQ above it — genuinely its own architecture).
 *
 * H2 (30.24px/41.76px/400, centered) has NO swash here (`hasSvg:
 * false`, confirmed) — unlike every editorial-row/Process/Partner/FAQ
 * heading on this page, this one is plain. FINWIWO's own icon above the
 * heading is a tiny 19×25px FormCraft mail glyph — far smaller than the
 * ~64-72px decorative-icon slot `AdvisoryConversion` already uses
 * elsewhere on this project, and too small to read as a restrained bear
 * illustration without either shrinking a bear into an unrecognisable
 * speck or growing the slot (both against the brief) — so no bear was
 * placed here; NEOSURA's own established circular-icon treatment is
 * used instead, sized consistently with the rest of the site's icon
 * language rather than copying FINWIWO's unusually tiny glyph.
 *
 * Fields (measured): Vorname (135px), Nachname (135px), E-Mail (281px),
 * all 36px tall, 5px radius, `1px solid` border, `border-color:
 * #43B597` on focus (matches NEOSURA's own existing teal focus-border
 * convention already) — NOT `AdvisoryConversion`'s 46px inputs, which
 * were not assumed here per the brief's explicit instruction. FINWIWO
 * marks none of the three fields `required` in HTML, but functionally
 * only email makes sense to require for a newsletter; NEOSURA requires
 * only email, per the brief's own guidance ("email required, name
 * fields optional"). CTA "Jetzt abonnieren" (162×40, `transform: none`
 * before/after hover — no lift, static, matching most other CTAs
 * measured on this page). FINWIWO shows a `nectar-circle-images`
 * avatar cluster + "+20k Schliessen Sie sich an" social-proof line below
 * the form — NOT reproduced (no verified NEOSURA subscriber count); the
 * client guide's own newsletter body text already ends with "Kein Spam,
 * jederzeit abmeldbar.", which already serves the same trust-building
 * role the proof line played, so nothing was added in its place, and
 * that vertical space is simply not used (deliberate, not an oversight).
 *
 * Phase 7SYS.B — vertical rhythm tightened to match `CategoryTopicCta`'s
 * own Phase 7SYS.B correction (`py-14/16` → `py-10/12`, `mt-6`/`mt-4` →
 * `mt-4`/`mt-3`) after direct screenshot review found this module,
 * immediately preceding the closing CTA on Wohnen & Eigentum, compounded
 * the same "too much empty white/tinted space" issue. Icon size
 * unchanged.
 *
 * NO REAL SUBSCRIPTION BACKEND EXISTS (no configured newsletter
 * provider / double-opt-in integration — a documented launch blocker,
 * see docs/CLIENT_GUIDE_MERGE.md and docs/finwiwo-architecture). Per the
 * project's technical-truth rule, this form never calls `/api/documents`
 * or any other endpoint, never writes an address anywhere, and never
 * claims success. Submitting shows a neutral, honest "not yet available"
 * message instead (chosen over disabling the submit button, since a
 * disabled control sitting inside otherwise-live-looking fields would
 * visually distort the measured FINWIWO layout more than letting the
 * form behave normally until the moment of submission). Wording is
 * plain product language, not technical/developer language. */
export function CategoryNewsletter({ title, body, ctaLabel }: CategoryNewsletterProps) {
  const [submitted, setSubmitted] = useState(false);
  const formIdPrefix = useId();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-paper-2 pt-[24px]">
      <div className="mx-auto max-w-[1340px] px-6 py-10 text-center sm:px-8 lg:py-12">
        <span
          aria-hidden
          className="mx-auto inline-flex h-[64px] w-[64px] items-center justify-center rounded-full border border-line text-purple lg:h-[72px] lg:w-[72px]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 lg:h-7 lg:w-7">
            <path d="M3 6h18v12H3z" />
            <path d="M3 6l9 7 9-7" />
          </svg>
        </span>

        {/* Phase 8C — reference: H2 30.24/400/41.76/normal on one line, sub-line
            20/300/27/-0.2; fields 36px, 5px radius, e-mail 281px. */}
        <h2 className="mx-auto mt-4 max-w-[30ch] text-[1.7rem] font-normal leading-[1.2] tracking-normal text-ink lg:max-w-[640px] lg:text-[1.89rem] lg:leading-[41.76px]">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-[48ch] text-[1rem] font-light leading-[1.5] tracking-[-0.2px] text-ink-soft lg:max-w-[485px] lg:text-[1.25rem] lg:leading-[27px]">{body}</p>

        {submitted ? (
          <p role="status" className="mx-auto mt-8 max-w-[48ch] text-[0.95rem] text-purple">
            Die Newsletter-Anmeldung wird in Kürze freigeschaltet. Vielen Dank für Ihr Interesse!
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-[600px]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-center">
              <label className="sr-only" htmlFor={`${formIdPrefix}-vorname`}>
                Vorname
              </label>
              <input
                id={`${formIdPrefix}-vorname`}
                name="vorname"
                type="text"
                autoComplete="given-name"
                placeholder="Vorname"
                className="h-[36px] w-full rounded-[5px] border border-line bg-white px-3 text-[0.9rem] text-ink outline-none transition-colors focus:border-purple sm:w-[135px]"
              />
              <label className="sr-only" htmlFor={`${formIdPrefix}-nachname`}>
                Nachname
              </label>
              <input
                id={`${formIdPrefix}-nachname`}
                name="nachname"
                type="text"
                autoComplete="family-name"
                placeholder="Nachname"
                className="h-[36px] w-full rounded-[5px] border border-line bg-white px-3 text-[0.9rem] text-ink outline-none transition-colors focus:border-purple sm:w-[135px]"
              />
              <label className="sr-only" htmlFor={`${formIdPrefix}-email`}>
                E-Mail
              </label>
              <input
                id={`${formIdPrefix}-email`}
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="E-Mail"
                className="h-[36px] w-full rounded-[5px] border border-line bg-white px-3 text-[0.9rem] text-ink outline-none transition-colors focus:border-purple sm:w-[281px]"
              />
            </div>

            <div className="mx-auto mt-4 flex max-w-[520px] items-start gap-3 text-left">
              <input
                id={`${formIdPrefix}-consent`}
                name="consent"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-purple"
              />
              <label htmlFor={`${formIdPrefix}-consent`} className="text-[0.8rem] leading-relaxed text-ink-soft">
                Ich habe die{" "}
                <Link href="/datenschutz" className="underline hover:text-ink">
                  Datenschutzerklärung
                </Link>{" "}
                gelesen und bin mit dem Erhalt des Newsletters einverstanden (Bestätigung per E-Mail, Double-Opt-in).
                <span className="text-purple"> *</span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex h-[50px] items-center justify-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600"
            >
              {ctaLabel}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
