"use client";

import Link from "next/link";
import { useId, useRef, useState, type DragEvent, type FormEvent, type ReactNode } from "react";
import {
  documentsContent,
  documentsSteps,
  privateDocumentFields,
  uploadBusinessFields,
  type DocumentFormField,
} from "@/content/de/documents";
import type { Audience } from "@/content/de/types";
import { Container } from "@/components/ui/Container";
import { submitDocuments } from "@/lib/api/documents";
import { cn } from "@/lib/cn";

const TABS: { id: Audience; label: string }[] = [
  { id: "privat", label: "Privatkunden" },
  { id: "unternehmen", label: "Unternehmen" },
];

function Field({ field, idPrefix, page }: { field: DocumentFormField; idPrefix: string; page: boolean }) {
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
        className={cn(
          "mt-2 h-[50px] w-full border border-line bg-white px-4 text-ink outline-none transition-colors focus:border-purple",
          page ? "rounded-[5px] text-[1rem]" : "text-[0.95rem]"
        )}
      />
    </div>
  );
}

interface DocumentsSectionProps {
  /** Phase 7C.11: the homepage's new compact conversion section now owns
   * `id="dokumente"` (the real target for every existing `/#dokumente`
   * CTA site-wide), and this same component is reused verbatim inside
   * that section's upload modal — so the modal instance passes a
   * different id to avoid a duplicate-id violation while both exist in
   * the DOM. */
  anchorId?: string;
  /** Phase 7V — `/analyse` is the client guide's own required "core
   * heading" slot ("Ihre Unterlagen. Unsere strukturierte Analyse.",
   * `documentsContent.headingLines`, unchanged) and that page renders no
   * other `<h1>` — so this section's own heading becomes the page's real
   * H1 there. Defaults to `"h2"` (its role inside the homepage's
   * conversion section and the upload modal, both of which have their
   * own separate page-level H1 elsewhere) so every existing caller is
   * unaffected unless it opts in. */
  headingLevel?: "h1" | "h2";
  /** Visual polish pass — optional page-supplied block rendered inside the
   * left column, directly under the heading. Added so `/analyse` can show
   * its privacy note and trust points *below* its own H1 instead of above
   * it (they used to sit in a separate row before this section, so the page
   * opened on a legal disclaimer rather than its heading, and left this
   * column half empty). Optional, so every other caller is unchanged. */
  intro?: ReactNode;
  /** Phase 8I — optional quiet note rendered directly under the submit
   * button. `/analyse` passes its privacy note here: the sentence opens
   * "Mit dem Absenden bestätigen Sie …", so it belongs beside the action it
   * describes rather than as a paragraph in the intro column. */
  formNote?: ReactNode;
  /** Phase 8I — `"page"` is the dedicated `/analyse` treatment: the page
   * H1 system (40/900/45, fluid on phones), a 16/300 trust line, tighter
   * top spacing, the approved 5px field radius with 16px input text (no
   * iOS focus zoom), a full-width submit on phones, and the approved
   * callout for the server-confirmed success and the error message.
   * Defaults to `"section"` so the homepage conversion section and its
   * upload modal render exactly as before. */
  variant?: "section" | "page";
}

/** FINWIWO-like clean lead/form section: light surface, thin borders,
 * clear labels — not rounded SaaS boxes. Real submission via
 * `submitDocuments`, real loading/success/error states, no fake success.
 * Left column carries a source-grounded 3-point block instead of mascot
 * artwork. */
export function DocumentsSection({
  anchorId = "dokumente",
  headingLevel = "h2",
  intro,
  formNote,
  variant = "section",
}: DocumentsSectionProps = {}) {
  const Heading = headingLevel;
  const page = variant === "page";
  const [audience, setAudience] = useState<Audience>("privat");
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formIdPrefix = useId();

  const fields = audience === "privat" ? privateDocumentFields : uploadBusinessFields;

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
    // Capture the form element before the `await` — a SyntheticEvent's
    // `currentTarget` is nulled out once the event finishes dispatching,
    // which happens well before this async function resumes.
    const form = e.currentTarget;
    setStatus("loading");
    setErrorMessage(null);

    const formData = new FormData(form);
    formData.set("form_type", audience);
    files.forEach((file) => formData.append("dokumente", file));

    const result = await submitDocuments(formData);
    if (result.ok) {
      setStatus("success");
      setFiles([]);
      form.reset();
    } else {
      setStatus("error");
      const firstError = result.errors ? Object.values(result.errors)[0] : undefined;
      const fallback = result.deliveryFailed ? documentsContent.deliveryFailureMessage : documentsContent.errorMessage;
      setErrorMessage(firstError ?? result.message ?? fallback);
    }
  }

  return (
    <section id={anchorId} className="scroll-mt-20 bg-paper">
      <Container className={page ? "pb-16 pt-10 lg:pb-[100px] lg:pt-[72px]" : "py-16 lg:py-[112px]"}>
        <div className="lg:grid lg:grid-cols-[38%_1fr] lg:gap-14">
          <div>
            <Heading
              className={
                page
                  ? "text-[clamp(1.6rem,calc(8vw-4px),1.875rem)] font-black leading-[1.13] tracking-normal text-ink lg:text-[2.5rem] lg:leading-[45px]"
                  : "text-[1.9rem] font-normal leading-[1.15] text-ink lg:text-[2.3rem]"
              }
            >
              {documentsContent.headingLines[0]}
              <br />
              {documentsContent.headingLines[1]}
            </Heading>
            <p className={page ? "mt-4 text-[1rem] font-light leading-[24px] text-ink-soft" : "mt-4 text-[0.92rem] text-muted"}>
              {documentsContent.trustLine}
            </p>

            {intro ? <div className={page ? "mt-7" : "mt-8"}>{intro}</div> : null}

            {/* Client review 2 §1 — ONE step strip. Previously a desktop-only
                list and a separate mobile-only row carried different wording;
                this single horizontal strip serves both, keeping the desktop
                hairline treatment. */}
            <ul className="mt-10 grid grid-cols-3 gap-3 sm:gap-6">
              {documentsSteps.map((step) => (
                <li key={step.num} className="border-t border-line-soft pt-4 sm:pt-5">
                  <span className="block text-[0.72rem] tracking-[0.14em] text-muted sm:text-[0.78rem]">
                    {step.num}
                  </span>
                  <span className="mt-1.5 block text-[0.9rem] leading-snug text-ink sm:mt-2 sm:text-[1.05rem]">
                    {step.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>


          <div className="mt-10 lg:mt-0">
            <div role="tablist" aria-label="Zielgruppe wählen" className="flex border-b border-line">
              {TABS.map((tab, i) => {
                const active = tab.id === audience;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setAudience(tab.id)}
                    className={cn(
                      "-mb-px border-b-2 px-1 py-3 text-[0.95rem] transition-colors",
                      i > 0 && "ml-8",
                      active ? "border-purple text-ink" : "border-transparent text-muted hover:text-ink-soft"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")} {tab.label}
                  </button>
                );
              })}
            </div>

            <form className="mt-10" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {fields.map((field) => (
                  <Field key={field.name} field={field} idPrefix={formIdPrefix} page={page} />
                ))}
              </div>

              <div className="mt-9">
                <span className="block text-[0.85rem] text-ink-soft">Dokumente</span>
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
                    "mt-2 flex cursor-pointer flex-col items-center justify-center border border-dashed px-6 py-10 text-center transition-colors",
                    page && "rounded-[5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple",
                    dragOver ? "border-purple bg-purple-100/40" : cn("border-line hover:border-purple/50", page && "bg-white")
                  )}
                >
                  <span className="text-[0.95rem] text-ink">Dateien hierher ziehen oder klicken zum Auswählen</span>
                  <span className="mt-2 text-[0.8rem] text-muted">
                    {documentsContent.accept.join(", ")}
                  </span>
                  <span className="mt-1 text-[0.8rem] text-muted">{documentsContent.uploadHint}</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={documentsContent.acceptAttr}
                    aria-label="Dokumente auswählen"
                    tabIndex={-1}
                    className="sr-only"
                    onChange={(e) => addFiles(e.target.files)}
                  />
                </div>
                {files.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {files.map((file, i) => (
                      <li
                        key={`${file.name}-${i}`}
                        className="flex items-center justify-between gap-3 text-[0.85rem] text-ink-soft"
                      >
                        <span className="truncate">{file.name}</span>
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

              <div className="mt-9">
                <label htmlFor={`${formIdPrefix}-nachricht`} className="block text-[0.85rem] text-ink-soft">
                  Nachricht
                </label>
                <textarea
                  id={`${formIdPrefix}-nachricht`}
                  name="nachricht"
                  rows={4}
                  className={cn(
                    "mt-2 w-full resize-none border border-line bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-purple",
                    page ? "rounded-[5px] text-[1rem]" : "text-[0.95rem]"
                  )}
                />
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
                className={cn(
                  "mt-6 inline-flex h-[50px] items-center rounded-full bg-purple px-[35px] text-[0.875rem] font-medium tracking-[0.5px] text-white btn-motion hover:bg-purple-600 disabled:opacity-60",
                  page && "w-full justify-center sm:w-auto"
                )}
              >
                {status === "loading" ? "Wird gesendet…" : documentsContent.submitLabel}
              </button>

              {formNote ? <p className="mt-4 max-w-[62ch] text-[0.85rem] font-light leading-[1.55] text-ink-soft">{formNote}</p> : null}

              {status === "success" && (
                <p
                  role="status"
                  className={
                    page
                      ? "mt-5 max-w-[62ch] rounded-[12px] border border-purple/20 bg-purple/[0.08] px-5 py-4 text-[1rem] font-light leading-[24px] text-ink"
                      : "mt-4 max-w-[52ch] text-[0.9rem] text-purple"
                  }
                >
                  {documentsContent.successMessage}
                </p>
              )}
              {status === "error" && (
                <p
                  role="alert"
                  className={
                    page
                      ? "mt-5 max-w-[62ch] rounded-[12px] border border-red-700/20 bg-red-700/[0.06] px-5 py-4 text-[1rem] font-light leading-[24px] text-red-800"
                      : "mt-4 text-[0.9rem] text-red-700"
                  }
                >
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
