export type SchadenfallSubmitResult =
  | { ok: true; delivered: true }
  | { ok: false; deliveryFailed?: boolean; message?: string; errors?: Record<string, string> };

/** Posts to `app/api/schadenfall/route.ts`. Mirrors `submitDocuments`'s
 * own honest-result contract: `ok: true` only once the provider has
 * confirmed delivery; `deliveryFailed: true` distinguishes "valid but
 * couldn't send" from plain field-validation errors. */
export async function submitSchadenfall(formData: FormData): Promise<SchadenfallSubmitResult> {
  try {
    const res = await fetch("/api/schadenfall", { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok) {
      return { ok: false, deliveryFailed: Boolean(data.deliveryFailed), message: data.message, errors: data.errors };
    }
    return { ok: true, delivered: true };
  } catch {
    return { ok: false, message: "Netzwerkfehler. Bitte versuchen Sie es erneut." };
  }
}
