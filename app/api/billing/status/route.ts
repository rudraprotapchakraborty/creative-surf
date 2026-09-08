import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";
import { countCvsSince } from "@/lib/cv-db";
import { getSubscription, isEntitledStatus, FREE_MONTHLY_GENERATIONS } from "@/lib/subscription";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const auth = getAuth(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startOfMonth = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1));

  try {
    const [subscription, generationsUsed] = await Promise.all([
      getSubscription(auth.sub),
      countCvsSince(auth.sub, startOfMonth),
    ]);

    const isPro = !!subscription && isEntitledStatus(subscription.status);

    return NextResponse.json({
      plan: isPro ? "pro" : "free",
      status: subscription?.status ?? null,
      generationsUsed,
      generationsLimit: isPro ? null : FREE_MONTHLY_GENERATIONS,
      renewsAt: subscription?.currentPeriodEnd ?? null,
      cancelAtPeriodEnd: subscription?.cancelAtPeriodEnd ?? false,
      manageUrl: subscription?.managementUrls?.cancel ?? null,
      updatePaymentMethodUrl: subscription?.managementUrls?.updatePaymentMethod ?? null,
    });
  } catch (err) {
    console.error("Failed to load billing status:", err);
    return NextResponse.json({ error: "Failed to load billing status" }, { status: 500 });
  }
}
