import { NextRequest, NextResponse } from "next/server";
import { verifyPaddleWebhook, isPaddleSubscriptionEvent } from "@/lib/paddle";
import { upsertSubscriptionFromPaddle, ensureSubscriptionIndexes, type SubscriptionStatus } from "@/lib/subscription";

export const runtime = "nodejs";

const VALID_STATUSES = new Set<SubscriptionStatus>(["active", "trialing", "past_due", "paused", "canceled"]);

export async function POST(request: NextRequest) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("Paddle webhook received but PADDLE_WEBHOOK_SECRET is not set.");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  // The raw, unparsed body — the signature is computed over these exact bytes.
  const rawBody = await request.text();
  const signature = request.headers.get("paddle-signature");

  if (!verifyPaddleWebhook(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Only subscription lifecycle events change entitlement; everything else
  // (transaction receipts, address updates, …) is acknowledged and ignored.
  if (!isPaddleSubscriptionEvent(payload)) {
    return NextResponse.json({ received: true });
  }

  const sub = payload.data;
  const userId = sub.custom_data?.userId;
  if (!userId) {
    console.error(`Paddle subscription event ${sub.id} carries no custom_data.userId — cannot attribute it to an account.`);
    return NextResponse.json({ received: true });
  }

  const status = VALID_STATUSES.has(sub.status as SubscriptionStatus) ? (sub.status as SubscriptionStatus) : "canceled";

  try {
    await ensureSubscriptionIndexes();
    await upsertSubscriptionFromPaddle({
      userId,
      paddleCustomerId: sub.customer_id,
      paddleSubscriptionId: sub.id,
      paddlePriceId: sub.items?.[0]?.price?.id,
      status,
      currentPeriodEnd: sub.current_billing_period?.ends_at ? new Date(sub.current_billing_period.ends_at) : undefined,
      cancelAtPeriodEnd: sub.scheduled_change?.action === "cancel",
      managementUrls: {
        updatePaymentMethod: sub.management_urls?.update_payment_method ?? undefined,
        cancel: sub.management_urls?.cancel ?? undefined,
      },
    });
  } catch (err) {
    console.error("Failed to persist Paddle subscription event:", err);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
