"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { submitDocuments } from "@/lib/api/documents";

/* Phase 8I — visual pass only: the approved field family (50px, 5px
 * radius) with 16px input text so phones don't zoom on focus, a full-width
 * submit on phones, and the approved callout for the confirmed success and
 * the error message. Fields, validation, consent and submission unchanged. */
const FIELD =
  "mt-2 h-[50px] w-full rounded-[5px] border border-line bg-white px-4 text-[1rem] text-ink outline-none transition-colors focus:border-purple";

/** Phase 7W — the real `/kontakt` message form: Name (split Vorname/
 * Nachname, matching the exact field convention already used everywhere
 * else on this site — `privateDocumentFields`, `ServiceInquiry`), E-Mail,
 * Telefon (optional), Nachricht. Submits via the existing, already-proven
 * `submitDocuments`/`app/api/documents/route.ts` (`form_type: "privat"`,
 * no file attachments) — the same reuse pattern `ServiceInquiry` already
 * established for a compact, upload-free contact form. No new backend
 * needed: the field shape genuinely matches that endpoint's existing
 * "privat" contract (vorname/nachname/email required, telefon/nachricht
 * optional), unlike Schadenfall's genuinely different field set (which
 * got its own dedicated route).
 *
 * A honeypot field (`webseite`), hidden from sighted users and the tab
 * order, is NOT re-added here since it's not enforced by `/api/documents`
 * — the route only recognizes its own known field names, so an extra
 * hidden field would send silently but has no honeypot effect there.
 * Genuine spam mitigation on this shared endpoint is the existing
 * server-side validation itself (required fields, email format,
 * consent). */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
      const fallback = result.deliveryFailed
        ? "Die Übermittlung ist derzeit nicht möglich. Bitte schreiben Sie uns direkt an info@neosura.ch."
        : "Die Übermittlung ist fehlgeschlagen. Bitte überprüfen Sie Ihre Angaben und versuchen Sie es erneut.";
      setErrorMessage(firstError ?? result.message ?? fallback);
    }
  }

  return (
    <form onSubmit={onSubmit} aria-describedby={status === "error" ? `${formIdPrefix}-status` : undefined}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formIdPrefix}-vorname`} className="block text-[0.85rem] text-ink-soft">
            Vorname <span className="text-purple">*</span>
          </label>
          <input id={`${formIdPrefix}-vorname`} name="vorname" type="text" required autoComplete="given-name" className={FIELD} />
        </div>
        <div>
          <label htmlFor={`${formIdPrefix}-nachname`} className="block text-[0.85rem] text-ink-soft">
            Nachname <span className="text-purple">*</span>
          </label>
          <input id={`${formIdPrefix}-nachname`} name="nachname" type="text" required autoComplete="family-name" className={FIELD} />
        </div>
        <div>
          <label htmlFor={`${formIdPrefix}-email`} className="block text-[0.85rem] text-ink-soft">
            E-Mail <span className="text-purple">*</span>
          </label>
          <input id={`${formIdPrefix}-email`} name="email" type="email" required autoComplete="email" className={FIELD} />
        </div>
        <div>
          <label htmlFor={`${formIdPrefix}-telefon`} className="block text-[0.85rem] text-ink-soft">
            Telefon
          </label>
          <input id={`${formIdPrefix}-telefon`} name="telefon" type="tel" autoComplete="tel" className={FIELD} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${formIdPrefix}-nachricht`} className="block text-[0.85rem] text-ink-soft">
          Nachricht <span className="text-purple">*</span>
        </label>
        <textarea
          id={`${formIdPrefix}-nachricht`}
          name="nachricht"
          required
          rows={5}
          className="mt-2 w-full resize-none rounded-[5px] border border-line bg-white px-4 py-3 text-[1rem] text-ink outline-none transition-colors focus:border-purple"
        />
      </div>

      <div className="mt-5 flex items-start gap-3">
        <input id={`${formIdPrefix}-consent`} name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-purple" />
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
        className="mt-6 inline-flex h-[50px] w-full items-center justify-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Wird gesendet…" : "Nachricht senden"}
      </button>

      <div id={`${formIdPrefix}-status`} aria-live="polite">
        {status === "success" && (
          <p
            role="status"
            className="mt-5 max-w-[62ch] rounded-[12px] border border-purple/20 bg-purple/[0.08] px-5 py-4 text-[1rem] font-light leading-[24px] text-ink"
          >
            Vielen Dank. Ihre Nachricht wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.
          </p>
        )}
        {status === "error" && (
          <p
            role="alert"
            className="mt-5 max-w-[62ch] rounded-[12px] border border-red-700/20 bg-red-700/[0.06] px-5 py-4 text-[1rem] font-light leading-[24px] text-red-800"
          >
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
