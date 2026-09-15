"use client";

import { useEffect, useRef } from "react";
import { DocumentsSection } from "./DocumentsSection";

interface DocumentsModalProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Phase 7C.11 — real dialog wrapping the existing, unmodified
 * `DocumentsSection` (same backend, same fields, same honest states),
 * so the full audience-aware upload form stays available without
 * forcing it into the homepage's new compact FINWIWO-geometry section.
 * Genuine `role="dialog"`/`aria-modal`, a focus trap, Escape-to-close,
 * body scroll lock, and focus returned to the trigger on close — not a
 * decorative overlay. Renders `<DocumentsSection anchorId="dokumente-upload">`
 * so the modal's own `id` never collides with the homepage section's
 * `id="dokumente"` while both exist in the DOM. */
export function DocumentsModal({ open, onClose }: DocumentsModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const focusables = dialog ? Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];
    focusables[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const nodes = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div aria-hidden onClick={onClose} className="fixed inset-0 bg-dark/70" />
      <div className="relative flex min-h-full items-start justify-center p-4 py-10 sm:p-8">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="documents-modal-heading"
          className="relative w-full max-w-[880px] bg-white shadow-xl"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Schliessen"
            className="absolute right-4 top-4 z-10 inline-flex h-[40px] w-[40px] items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
          >
            <span aria-hidden className="text-[1.3rem] leading-none">
              ✕
            </span>
          </button>
          <h2 id="documents-modal-heading" className="sr-only">
            Unterlagen hochladen
          </h2>
          <DocumentsSection anchorId="dokumente-upload" />
        </div>
      </div>
    </div>
  );
}
