"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { businessDocumentFields, documentsContent } from "@/content/de/documents";
import { businessServices } from "@/content/de/business";
import { submitDocuments } from "@/lib/api/documents";
import { cn } from "@/lib/cn";

/** Phase 7E.1A — reproduces FINWIWO's `/unternehmen/` hero form panel
 * (measured 1440/1024/390): a white card (~556×640-700px desktop,
 * confirmed via checkbox-anchored DOM climb) holding a small badge, a
 * heading, a multi-select checkbox grid (FINWIWO genuinely uses 9 —
 * Haftpflicht/Rechtsschutz/Sachversicherung/Berufliche Vorsorge/
 * Unfallversicherung/Krankentaggeld/Flottenversicherung/Transport/
 * Cyber-Risk, 2-column, 18px boxes), a 2-column contact-field grid
 * (Vorname/Nachname/PLZ/Ort/Geburtsdatum/Telefon/E-Mail — 36px/5px
 * radius), and a full-width pill submit ("Anfrage abschicken", 38px).
 *
 * NEOSURA genuinely has 5 business areas, not 9 — the checkbox COUNT
 * changes, the GRID GRAMMAR (2-column, checkbox + label, natural wrap)
 * doesn't. Contact fields use the real `businessDocumentFields`
 * (Firmenname/Ansprechpartner/E-Mail/Telefon) already wired to
 * `/api/documents` for the "unternehmen" form type — no PLZ/Ort/
 * Geburtsdatum/Anrede, since none of that is asked anywhere else in
 * this project and FINWIWO's own birthdate field has no NEOSURA
 * equivalent to collect honestly. Selected areas are sent as the
 * existing `service` field (already rendered into the email body by
 * the route when present), so "Betriebshaftpflicht, Flottenversicherung"
 * etc. shows up in the delivered request truthfully — no new endpoint,
 * no fake CRM, same honest success-only-after-delivery / 502 fallback
 * as every other NEOSURA form. */
// Phase 7M.1 — client guide §4.8 lists business services in this order;
// `businessServices` itself stays in its original V2 order so
// `CategoryServiceRow`'s alternating accent/reverse-by-index treatment on
// this page isn't disturbed (see docs/CLIENT_GUIDE_MERGE.md). This is a
// display-only re-sort for the checkbox grid.
const CHECKBOX_ORDER = [
  "betriebshaftpflicht",
  "sachversicherung",
  "personal",
  "berufliche-vorsorge",
  "flotten",
  "cyber-rechtsschutz",
];

export function CategoryHeroBusinessForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const formIdPrefix = useId();

  function toggle(title: string) {
    setSelected((cur) => (cur.includes(title) ? cur.filter((t) => t !== title) : [...cur, title]));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setErrorMessage(null);

    const formData = new FormData(form);
    formData.set("form_type", "unternehmen");
    if (selected.length > 0) formData.set("service", selected.join(", "));

    const result = await submitDocuments(formData);
    if (result.ok) {
      setStatus("success");
      form.reset();
      setSelected([]);
    } else {
      setStatus("error");
      const firstError = result.errors ? Object.values(result.errors)[0] : undefined;
      const fallback = result.deliveryFailed ? documentsContent.deliveryFailureMessage : documentsContent.errorMessage;
      setErrorMessage(firstError ?? result.message ?? fallback);
    }
  }

  return (
    <div id="beratung-unternehmen" className="w-full scroll-mt-24 rounded-[20px] bg-white p-6 shadow-lg sm:p-8">
      <span className="mx-auto inline-flex h-[30px] items-center rounded-full px-4 text-[0.82rem] font-medium tracking-[0.01em] bg-purple text-white">
        Unternehmen
      </span>
      <h2 className="mt-4 text-center text-[1.3rem] font-medium leading-[29px] tracking-[-0.23px] text-ink lg:text-[1.4375rem]">
        Beratung für Unternehmen anfragen
      </h2>
      <p className="mt-2 text-center text-[0.9rem] leading-[1.5] text-ink-soft">
        Wir analysieren Ihre Situation persönlich und entwickeln daraus eine passende Lösung.
      </p>

      <form onSubmit={onSubmit} className="mt-6">
        <fieldset>
          <legend className="block text-[0.85rem] text-ink-soft">Für welchen Bereich möchten Sie anfragen?</legend>
          <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
            {[...businessServices].sort((a, b) => CHECKBOX_ORDER.indexOf(a.slug) - CHECKBOX_ORDER.indexOf(b.slug)).map((s) => {
              const id = `${formIdPrefix}-${s.slug}`;
              const checked = selected.includes(s.title);
              return (
                <label key={s.slug} htmlFor={id} className="flex items-center gap-2.5 text-[0.92rem] text-ink">
                  <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(s.title)}
                    className="h-[18px] w-[18px] shrink-0 accent-purple"
                  />
                  {s.title}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {businessDocumentFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={`${formIdPrefix}-${field.name}`} className="block text-[0.85rem] text-ink-soft">
                {field.label}
                {field.required && <span className="text-purple"> *</span>}
              </label>
              <input
                id={`${formIdPrefix}-${field.name}`}
                name={field.name}
                type={field.type}
                required={field.required}
                autoComplete={field.autoComplete}
                className="mt-1.5 h-[36px] w-full rounded-[5px] border border-line bg-white px-3 text-[0.9rem] text-ink outline-none transition-colors focus:border-purple"
              />
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-3">
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
            gelesen und stimme der Verarbeitung meiner Daten zu.
            <span className="text-purple"> *</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "mt-6 inline-flex h-[50px] w-full items-center justify-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600 disabled:opacity-60"
          )}
        >
          {status === "loading" ? "Wird gesendet…" : "Beratung anfragen"}
        </button>

        {status === "success" && (
          <p role="status" className="mt-4 text-[0.85rem] text-purple">
            Vielen Dank. Ihre Anfrage wurde erfolgreich übermittelt — wir melden uns in Kürze bei Ihnen.
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="mt-4 text-[0.85rem] text-red-700">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
