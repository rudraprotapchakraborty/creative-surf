import { createHmac, timingSafeEqual } from "crypto";

/**
 * Verifies a Paddle Billing webhook.
 *
 * Paddle signs `{timestamp}:{raw_body}` with HMAC-SHA256 and sends the result
 * in the `Paddle-Signature` header as `ts=<unix_seconds>;h1=<hex>`. The body
 * must be the exact bytes Paddle sent — parse it as JSON only after this
 * passes, never before.
 */
export function verifyPaddleWebhook(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader) return false;

  const parts = Object.fromEntries(
    signatureHeader.split(";").map((part) => {
      const [key, value] = part.split("=");
      return [key?.trim(), value?.trim()];
    })
  );
  const ts = parts.ts;
  const h1 = parts.h1;
  if (!ts || !h1) return false;

  const expected = createHmac("sha256", secret).update(`${ts}:${rawBody}`).digest("hex");

  const expectedBuf = Buffer.from(expected, "hex");
  const actualBuf = Buffer.from(h1, "hex");
  if (expectedBuf.length !== actualBuf.length) return false;
  return timingSafeEqual(expectedBuf, actualBuf);
}

/** The slice of a Paddle `subscription.*` event payload this app actually reads. */
export interface PaddleSubscriptionEvent {
  event_type: string;
  data: {
    id: string;
    status: string;
    customer_id: string;
    custom_data?: { userId?: string } | null;
    items?: { price?: { id?: string } }[];
    current_billing_period?: { ends_at?: string } | null;
    scheduled_change?: { action?: string } | null;
    management_urls?: { update_payment_method?: string; cancel?: string } | null;
  };
}

export function isPaddleSubscriptionEvent(payload: unknown): payload is PaddleSubscriptionEvent {
  return (
    !!payload &&
    typeof payload === "object" &&
    typeof (payload as { event_type?: unknown }).event_type === "string" &&
    (payload as { event_type: string }).event_type.startsWith("subscription.")
  );
}
