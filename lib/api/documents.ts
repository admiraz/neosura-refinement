export type DocumentSubmitResult =
  | { ok: true; delivered: true }
  | { ok: false; deliveryFailed?: boolean; message?: string; errors?: Record<string, string> };

/** Posts to the local Next.js route handler (`app/api/documents/route.ts`).
 * Field names/shape match the legacy `contact.php` endpoint. The route
 * only returns `ok: true` once its email provider has confirmed delivery;
 * `deliveryFailed: true` distinguishes "valid but couldn't send" (show the
 * fallback-email message) from plain field-validation errors. */
export async function submitDocuments(formData: FormData): Promise<DocumentSubmitResult> {
  try {
    const res = await fetch("/api/documents", { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok) {
      return { ok: false, deliveryFailed: Boolean(data.deliveryFailed), message: data.message, errors: data.errors };
    }
    return { ok: true, delivered: true };
  } catch {
    return { ok: false, message: "Netzwerkfehler. Bitte versuchen Sie es erneut." };
  }
}
