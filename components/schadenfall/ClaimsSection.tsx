"use client";

import Link from "next/link";
import { useId, useRef, useState, type DragEvent, type FormEvent } from "react";
import { schadenfallFormContent, schadenfallFields, type SchadenfallField } from "@/content/de/schadenfall";
import { Container } from "@/components/ui/Container";
import { submitSchadenfall } from "@/lib/api/schadenfall";
import { cn } from "@/lib/cn";

function Field({ field, idPrefix }: { field: SchadenfallField; idPrefix: string }) {
  const id = `${idPrefix}-${field.name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-[0.85rem] text-ink-soft">
        {field.label}
        {field.required && <span className="text-purple"> *</span>}
      </label>
      <input
        id={id}
        name={field.name}
        type={field.type}
        required={field.required}
        autoComplete={field.autoComplete}
        max={field.type === "date" ? new Date().toISOString().slice(0, 10) : undefined}
        className="mt-2 h-[50px] w-full rounded-[5px] border border-line bg-white px-4 text-[0.95rem] text-ink outline-none transition-colors focus:border-purple"
      />
    </div>
  );
}

/** Phase 7T — the real online claims form. Same FINWIWO-like clean
 * upload-form architecture already established by `DocumentsSection`
 * (light surface, thin borders, drag-drop upload, real submission via
 * `submitSchadenfall`, honest loading/success/error states) — no new
 * design language invented, per this phase's own "do not invent a new
 * design language" instruction. Delivers to `app/api/schadenfall/route.ts`
 * (own dedicated endpoint, not `/api/documents` — the field set
 * genuinely differs: policy/insurer, loss date, description are claims-
 * specific, not part of the existing Analyse intake).
 *
 * Fields: Vorname, Nachname, E-Mail, Telefon (optional), betroffene
 * Versicherung/Police, Schadendatum (date input, capped at today),
 * Beschreibung (textarea), file upload (photos/receipts, optional —
 * a claim can be reported before every document is gathered). Mandatory
 * privacy-consent checkbox linking `/datenschutz`, enforced both
 * client-side (`required`) and server-side (the route re-checks
 * `consent === "on"`).
 *
 * A honeypot field (`webseite`) sits in the real DOM but is visually
 * hidden (`sr-only`-style, `tabIndex={-1}`, `aria-hidden`) — genuine
 * server-enforced spam mitigation (the route silently no-ops if it's
 * filled), not a decorative client-only check.
 *
 * No optimistic success: `status` only becomes `"success"` after
 * `submitSchadenfall` resolves `ok: true`, which the route only returns
 * once Resend has confirmed delivery. */
export function ClaimsSection() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formIdPrefix = useId();

  function addFiles(list: FileList | null) {
    if (!list) return;
    setFiles((cur) => [...cur, ...Array.from(list)]);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  }

  function removeFile(index: number) {
    setFiles((cur) => cur.filter((_, i) => i !== index));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setErrorMessage(null);

    const formData = new FormData(form);
    files.forEach((file) => formData.append("dateien", file));

    const result = await submitSchadenfall(formData);
    if (result.ok) {
      setStatus("success");
      setFiles([]);
      form.reset();
    } else {
      setStatus("error");
      const firstErrorField = result.errors ? Object.keys(result.errors)[0] : undefined;
      if (firstErrorField) {
        const el = form.querySelector<HTMLElement>(`[name="${firstErrorField}"]`);
        el?.focus();
      }
      const firstError = result.errors ? Object.values(result.errors)[0] : undefined;
      const fallback = result.deliveryFailed ? schadenfallFormContent.deliveryFailureMessage : schadenfallFormContent.errorMessage;
      setErrorMessage(firstError ?? result.message ?? fallback);
    }
  }

  return (
    <section id="schadenmeldung" className="scroll-mt-20 bg-paper">
      <Container className="py-14 lg:py-16">
        <form className="mx-auto max-w-[820px]" onSubmit={onSubmit} noValidate={false}>
          {/* Honeypot — real field, hidden from sighted users and the tab order. */}
          <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
            <label htmlFor={`${formIdPrefix}-webseite`}>Webseite</label>
            <input id={`${formIdPrefix}-webseite`} name="webseite" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {schadenfallFields.map((field) => (
              <Field key={field.name} field={field} idPrefix={formIdPrefix} />
            ))}
          </div>

          <div className="mt-6">
            <label htmlFor={`${formIdPrefix}-beschreibung`} className="block text-[0.85rem] text-ink-soft">
              Beschreibung <span className="text-purple">*</span>
            </label>
            <textarea
              id={`${formIdPrefix}-beschreibung`}
              name="beschreibung"
              required
              rows={5}
              className="mt-2 w-full resize-none rounded-[5px] border border-line bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors focus:border-purple"
            />
          </div>

          <div className="mt-9">
            <span className="block text-[0.85rem] text-ink-soft">Fotos &amp; Belege (optional)</span>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
              }}
              className={cn(
                "mt-2 flex cursor-pointer flex-col items-center justify-center rounded-[10px] border border-dashed px-6 py-10 text-center transition-colors",
                dragOver ? "border-purple bg-purple-100/40" : "border-line hover:border-purple/50"
              )}
            >
              <span className="text-[0.95rem] text-ink">Dateien hierher ziehen oder klicken zum Auswählen</span>
              <span className="mt-2 text-[0.8rem] text-muted">
                {schadenfallFormContent.accept.join(", ")} · max. {schadenfallFormContent.maxSizeMb} MB pro Datei
              </span>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={schadenfallFormContent.acceptAttr}
                aria-label="Fotos und Belege auswählen"
                tabIndex={-1}
                className="sr-only"
                onChange={(e) => addFiles(e.target.files)}
              />
            </div>
            {files.length > 0 && (
              <ul className="mt-3 flex flex-col gap-1.5">
                {files.map((file, i) => (
                  <li key={`${file.name}-${i}`} className="flex items-center justify-between gap-3 text-[0.85rem] text-ink-soft">
                    <span className="min-w-0 truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="shrink-0 text-muted hover:text-purple"
                      aria-label={`${file.name} entfernen`}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-9 flex items-start gap-3">
            <input
              id={`${formIdPrefix}-consent`}
              name="consent"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 shrink-0 accent-purple"
            />
            <label htmlFor={`${formIdPrefix}-consent`} className="text-[0.85rem] leading-relaxed text-ink-soft">
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
            {status === "loading" ? "Wird gesendet…" : schadenfallFormContent.submitLabel}
          </button>

          <div aria-live="polite">
            {status === "success" && (
              <p role="status" className="mt-4 max-w-[52ch] text-[0.9rem] text-purple">
                {schadenfallFormContent.successMessage}
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="mt-4 text-[0.9rem] text-red-700">
                {errorMessage}
              </p>
            )}
          </div>
        </form>
      </Container>
    </section>
  );
}
