"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  privateDocumentFields,
  businessDocumentFields,
  documentsContent,
} from "@/content/de/documents";
import { getQualifierOptions } from "@/content/de/serviceSubtopics";
import type { Audience } from "@/content/de/types";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { submitDocuments } from "@/lib/api/documents";

interface ServiceInquiryProps {
  audience: Audience;
  eyebrow: string;
  serviceTitle: string;
  serviceSlug: string;
  checklist: string[];
}

/** The FINWIWO "early conversion opportunity" module — placed right after
 * the hero, before the long explanatory content. Reuses the exact same
 * working Resend/API infrastructure as DocumentsSection (same endpoint,
 * same field names, same honest success/fallback states), just a compact
 * subset of fields and no file upload — this is not a second, fake form.
 * `ok: true` is only ever shown once the server confirms delivery. */
export function ServiceInquiry({ audience, eyebrow, serviceTitle, serviceSlug, checklist }: ServiceInquiryProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [qualifier, setQualifier] = useState<string | null>(null);
  const formIdPrefix = useId();
  const fields = audience === "privat" ? privateDocumentFields : businessDocumentFields;
  const qualifierOptions = getQualifierOptions(audience, serviceSlug);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setErrorMessage(null);

    const formData = new FormData(form);
    formData.set("form_type", audience);
    formData.set("service", serviceTitle);
    if (qualifier) formData.set("qualifier", qualifier);

    const result = await submitDocuments(formData);
    if (result.ok) {
      setStatus("success");
      form.reset();
      setQualifier(null);
    } else {
      setStatus("error");
      const firstError = result.errors ? Object.values(result.errors)[0] : undefined;
      const fallback = result.deliveryFailed ? documentsContent.deliveryFailureMessage : documentsContent.errorMessage;
      setErrorMessage(firstError ?? result.message ?? fallback);
    }
  }

  return (
    <section id="beratung" className="scroll-mt-20 bg-paper">
      <Container className="py-14 lg:flex lg:items-start lg:gap-16 lg:py-20">
        <div className="lg:w-[46%]">
          <span className="block text-[0.78rem] uppercase tracking-[0.16em] text-muted">{eyebrow}</span>
          <h2 className="mt-4 text-[2rem] font-normal leading-[1.15] text-ink lg:text-[2.4rem]">
            Persönliche Beratung anfragen
          </h2>
          <p className="mt-4 max-w-[48ch] text-[1.02rem] leading-[1.5] text-ink-soft lg:text-[1.08rem]">
            Wir analysieren Ihre Situation persönlich und entwickeln daraus eine passende Lösung.
          </p>

          {checklist.length > 0 && (
            <ul className="mt-7 flex flex-col gap-3">
              {checklist.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.98rem] text-ink lg:text-[1.02rem]">
                  <span aria-hidden className="mt-[0.1em] text-purple">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="h-[1em] w-[1em]"><path d="M4 10.5l4 4 8-9" /></svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          <Link
            href="/#dokumente"
            className="mt-8 inline-flex items-center gap-2 text-[0.9rem] text-purple transition-colors hover:text-purple-600"
          >
            Unterlagen hochladen
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-10 lg:mt-0 lg:w-[54%]">
          <form onSubmit={onSubmit} className="border border-line bg-white p-6 sm:p-8">
            {qualifierOptions.length > 0 && (
              <fieldset className="mb-6">
                <legend className="block text-[0.85rem] text-ink-soft">Worum geht es?</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {qualifierOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={qualifier === option}
                      onClick={() => setQualifier((cur) => (cur === option ? null : option))}
                      className={cn(
                        "h-[38px] rounded-full border px-4 text-[0.88rem] transition-colors",
                        qualifier === option
                          ? "border-purple bg-purple text-white"
                          : "border-line text-ink-soft hover:border-purple/50 hover:text-ink"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {fields.map((field) => (
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
                    className="mt-2 h-[50px] w-full border border-line bg-white px-4 text-[0.95rem] text-ink outline-none transition-colors focus:border-purple"
                  />
                </div>
              ))}
            </div>

            <div className="mt-5">
              <label htmlFor={`${formIdPrefix}-nachricht`} className="block text-[0.85rem] text-ink-soft">
                Nachricht (optional)
              </label>
              <textarea
                id={`${formIdPrefix}-nachricht`}
                name="nachricht"
                rows={3}
                className="mt-2 w-full resize-none border border-line bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors focus:border-purple"
              />
            </div>

            <div className="mt-5 flex items-start gap-3">
              <input
                id={`${formIdPrefix}-consent`}
                name="consent"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-purple"
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
              className="mt-6 inline-flex h-[50px] items-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600 disabled:opacity-60"
            >
              {status === "loading" ? "Wird gesendet…" : "Beratung anfragen"}
            </button>

            {status === "success" && (
              <p role="status" className="mt-4 text-[0.9rem] text-purple">
                Vielen Dank. Ihre Anfrage wurde erfolgreich übermittelt — wir melden uns in Kürze bei Ihnen.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="mt-4 text-[0.9rem] text-red-700">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
