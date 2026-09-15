import { Resend } from "resend";

let cachedClient: Resend | null = null;

/** Returns a Resend client built from `RESEND_API_KEY`, or `null` if that
 * env var isn't set — callers must treat `null` as "delivery not
 * configured" and fail honestly rather than pretending to send. */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!cachedClient) {
    cachedClient = new Resend(apiKey);
  }
  return cachedClient;
}
