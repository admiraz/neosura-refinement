"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { documentsContent } from "@/content/de/documents";
import { Container } from "@/components/ui/Container";
import { submitDocuments } from "@/lib/api/documents";
import { DocumentsModal } from "./DocumentsModal";

/** FINWIWO's own next section after the testimonial video (Phase 7C.11,
 * measured live: "Finanz-Updates, die sich auszahlen.") is a genuine
 * email-newsletter signup — contained at ~1340px (not full-bleed, unlike
 * the video above it), a centered circular icon, centered H2 (~30px/42px
 * lh/400), a 2-line centered supporting line, one inline 3-field row
 * (Vorname/Nachname/E-Mail, 36px tall, 5px radius) + a teal pill submit
 * button, then a "+20k subscribers" social-proof avatar row, all inside
 * a tall (531px @1440) row built mostly of white space. Fields stack
 * full-width on mobile (measured 390/360 — not desktop scaled down).
 * Scroll: static at every sampled point. Validation: real client-side
 * JS on submit (red borders + an "Invalid Email" tooltip), confirmed by
 * actually submitting "not-an-email".
 *
 * NEOSURA has no newsletter/email-marketing service, so "Finanz-Updates"
 * and the "+20k" social-proof row (a specific subscriber count NEOSURA
 * cannot honestly claim) are both dropped entirely — not adapted, not
 * approximated with a smaller number. The architecture (icon → heading →
 * short supporting line → compact inline form, generous surrounding
 * white space, same contained width) is reused for NEOSURA's real
 * conversion purpose instead: a personal advisory request. Heading/
 * supporting line reuse the already-approved wording from
 * `ServiceInquiry` (the equivalent compact-inquiry pattern already used
 * on service-detail pages) rather than inventing new copy. Form fields
 * are the smallest truthful set the real backend accepts for a private
 * inquiry (vorname/nachname/email — `telefon` and the full audience-
 * aware field sets stay in the "Unterlagen hochladen" modal). Same
 * `submitDocuments`/`/api/documents` pipeline, same honest success/
 * fallback states as every other NEOSURA form — no fake success.
 *
 * Phase 7D.9 — reused verbatim (as-is content/fields/backend already
 * fit) for `/privatkunden`'s own equivalent FINWIWO module. Live
 * remeasurement of `/versicherungen/`'s own newsletter row confirmed
 * the same type scale (30.24/41.76 H2, matching this component's
 * 30/42) and the same compact 3-field/36px/5px-radius/pill-CTA form
 * architecture — but that row's background is transparent (floats
 * directly on FINWIWO's grey backdrop, no white card), unlike this
 * component's homepage context. The optional `background="paper"`
 * reproduces that without duplicating the form/validation logic into a
 * second component. Default stays `"white"` so the homepage renders
 * pixel-identical to before. */
/* Phase 9A — `variant="home"` (homepage only): 16px inputs (no iOS focus
 * zoom) with a softer 300ms focus border, the approved callout for a real
 * success/error that settles in once, and an SVG arrow on the upload link.
 * `/privatkunden` keeps the default and renders unchanged. */
export function AdvisoryConversion({
  background = "white",
  variant = "default",
}: { background?: "white" | "paper"; variant?: "default" | "home" } = {}) {
  const home = variant === "home";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const formIdPrefix = useId();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setErrorMessage(null);

    const formData = new FormData(form);
    formData.set("form_type", "privat");

    const result = await submitDocuments(formData);
    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      const firstError = result.errors ? Object.values(result.errors)[0] : undefined;
      const fallback = result.deliveryFailed ? documentsContent.deliveryFailureMessage : documentsContent.errorMessage;
      setErrorMessage(firstError ?? result.message ?? fallback);
    }
  }

  return (
    <section id="dokumente" className={`scroll-mt-20 ${background === "paper" ? "bg-paper-2" : "bg-white"}`}>
      <Container className={`text-center ${home ? "py-14 lg:py-[72px]" : "py-16 lg:py-24"}`}>
        <span
          aria-hidden
          className="mx-auto inline-flex h-[64px] w-[64px] items-center justify-center rounded-full border border-line text-purple lg:h-[72px] lg:w-[72px]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 lg:h-7 lg:w-7">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </span>

        <h2 className={`mx-auto max-w-[22ch] text-[1.9rem] font-normal leading-[1.15] text-ink lg:text-[2.3rem] ${home ? "mt-5" : "mt-6"}`}>
          Persönliche Beratung anfragen
        </h2>
        <p className={`mx-auto max-w-[48ch] text-[1.02rem] leading-[1.5] text-ink-soft lg:text-[1.08rem] ${home ? "mt-3" : "mt-4"}`}>
          Wir analysieren Ihre Situation persönlich und entwickeln daraus eine passende Lösung.
        </p>

        <form onSubmit={onSubmit} className={`mx-auto ${home ? "mt-7 max-w-[760px]" : "mt-8 max-w-[720px]"}`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-center">
            <label className="sr-only" htmlFor={`${formIdPrefix}-vorname`}>
              Vorname
            </label>
            <input
              id={`${formIdPrefix}-vorname`}
              name="vorname"
              type="text"
              required
              autoComplete="given-name"
              placeholder="Vorname"
              className={`h-[50px] w-full rounded-[5px] border border-line bg-white px-4 text-ink outline-none transition-[border-color,box-shadow] focus:border-purple ${home ? "text-[1rem] duration-300 hover:border-ink/25 focus:shadow-[0_0_10px_rgba(20,8,31,0.11)] sm:w-[190px]" : "text-[0.95rem] sm:w-[160px]"}`}
            />
            <label className="sr-only" htmlFor={`${formIdPrefix}-nachname`}>
              Nachname
            </label>
            <input
              id={`${formIdPrefix}-nachname`}
              name="nachname"
              type="text"
              required
              autoComplete="family-name"
              placeholder="Nachname"
              className={`h-[50px] w-full rounded-[5px] border border-line bg-white px-4 text-ink outline-none transition-[border-color,box-shadow] focus:border-purple ${home ? "text-[1rem] duration-300 hover:border-ink/25 focus:shadow-[0_0_10px_rgba(20,8,31,0.11)] sm:w-[190px]" : "text-[0.95rem] sm:w-[160px]"}`}
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
              className={`h-[50px] w-full rounded-[5px] border border-line bg-white px-4 text-ink outline-none transition-[border-color,box-shadow] focus:border-purple ${home ? "text-[1rem] duration-300 hover:border-ink/25 focus:shadow-[0_0_10px_rgba(20,8,31,0.11)] sm:w-[280px]" : "text-[0.95rem] sm:w-[220px]"}`}
            />
          </div>

          <div className="mx-auto mt-5 flex max-w-[600px] items-start gap-3 text-left">
            <input
              id={`${formIdPrefix}-consent`}
              name="consent"
              type="checkbox"
              required
              className={`mt-1 h-4 w-4 shrink-0 accent-purple${home ? " transition-[box-shadow] duration-[var(--dur-micro)]" : ""}`}
            />
            <label htmlFor={`${formIdPrefix}-consent`} className="text-[0.82rem] leading-relaxed text-ink-soft">
              Ich habe die{" "}
              <Link href="/datenschutz" className="underline hover:text-ink">
                Datenschutzerklärung
              </Link>{" "}
              gelesen und stimme der Verarbeitung meiner Daten zu.
              <span className="text-purple"> *</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className={`mt-5 inline-flex h-[50px] items-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600 disabled:opacity-60${home ? " active:translate-y-[-1px]" : ""}`}
          >
            {status === "loading" ? "Wird gesendet…" : "Beratung anfragen"}
          </button>

          {status === "success" && (
            <p
              role="status"
              className={
                home
                  ? "state-in mx-auto mt-5 max-w-[52ch] rounded-[12px] border border-purple/20 bg-purple/[0.08] px-5 py-4 text-[1rem] font-light leading-[24px] text-ink"
                  : "mx-auto mt-4 max-w-[52ch] text-[0.9rem] text-purple"
              }
            >
              Vielen Dank. Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className={
                home
                  ? "state-in mx-auto mt-5 max-w-[52ch] rounded-[12px] border border-red-700/20 bg-red-700/[0.06] px-5 py-4 text-[1rem] font-light leading-[24px] text-red-800"
                  : "mx-auto mt-4 text-[0.9rem] text-red-700"
              }
            >
              {errorMessage}
            </p>
          )}
        </form>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={`inline-flex items-center gap-2 text-[0.9rem] text-purple transition-colors hover:text-purple-600${home ? " mt-6 arrow-trigger" : " mt-8"}`}
        >
          <span className={home ? "link-line pb-[3px]" : undefined}>Unterlagen hochladen</span>
          {home ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className="arrow-shift h-3.5 w-3.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          ) : (
            <span aria-hidden>→</span>
          )}
        </button>
      </Container>

      <DocumentsModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
