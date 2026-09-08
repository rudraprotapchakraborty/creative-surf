import { getDb } from "@/lib/mongodb";

export { FREE_MONTHLY_GENERATIONS } from "@/lib/subscription-constants";

/**
 * CV Builder subscription plans.
 *
 * Deliberately one paid tier and one lever (AI generations per month) — that
 * lever is also the real cost driver (every generation is a paid model call),
 * so it is the one thing worth metering before this has usage data to justify
 * more. Saves, downloads and ATS scoring stay free for both plans.
 */
export type PlanId = "free" | "pro";

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "paused"
  | "canceled";

/** Statuses that currently entitle the account to the Pro plan. */
const ENTITLING_STATUSES: ReadonlySet<SubscriptionStatus> = new Set(["active", "trialing", "past_due"]);

export interface SubscriptionDoc {
  /** Our own user id (`AuthPayload.sub`) — the join key to everything else. */
  userId: string;
  provider: "paddle";
  status: SubscriptionStatus;
  paddleCustomerId: string;
  paddleSubscriptionId: string;
  paddlePriceId?: string;
  /** Current billing period end, so the UI can say "renews on …" / "ends on …". */
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd: boolean;
  /** Paddle's own hosted pages for changing card / cancelling — no server-side Paddle API call needed to show these. */
  managementUrls?: { updatePaymentMethod?: string; cancel?: string };
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION_NAME = "subscriptions";

async function getCollection() {
  const db = await getDb();
  return db.collection<SubscriptionDoc>(COLLECTION_NAME);
}

export async function getSubscription(userId: string): Promise<SubscriptionDoc | null> {
  const collection = await getCollection();
  return collection.findOne({ userId });
}

/** Whether a subscription record in this status currently entitles the account to Pro. */
export function isEntitledStatus(status: SubscriptionStatus): boolean {
  return ENTITLING_STATUSES.has(status);
}

export async function isPro(userId: string): Promise<boolean> {
  const sub = await getSubscription(userId);
  return !!sub && isEntitledStatus(sub.status);
}

export async function getPlan(userId: string): Promise<PlanId> {
  return (await isPro(userId)) ? "pro" : "free";
}

/**
 * Upserts a subscription record from a verified Paddle `subscription.*`
 * webhook event. Keyed by our own `userId` — one subscription record per
 * account — so a cancel-and-resubscribe (a new Paddle subscription id)
 * still lands on the same document instead of colliding with it.
 */
export async function upsertSubscriptionFromPaddle(input: {
  userId: string;
  paddleCustomerId: string;
  paddleSubscriptionId: string;
  paddlePriceId?: string;
  status: SubscriptionStatus;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd: boolean;
  managementUrls?: { updatePaymentMethod?: string; cancel?: string };
}): Promise<void> {
  const collection = await getCollection();
  const now = new Date();

  await collection.updateOne(
    { userId: input.userId },
    {
      $set: {
        userId: input.userId,
        provider: "paddle",
        status: input.status,
        paddleCustomerId: input.paddleCustomerId,
        paddleSubscriptionId: input.paddleSubscriptionId,
        paddlePriceId: input.paddlePriceId,
        currentPeriodEnd: input.currentPeriodEnd,
        cancelAtPeriodEnd: input.cancelAtPeriodEnd,
        managementUrls: input.managementUrls,
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true }
  );
}

let indexesReady: Promise<void> | null = null;

/** Called lazily from the webhook route — this collection is write-rare, no need to run it on every boot. */
export async function ensureSubscriptionIndexes(): Promise<void> {
  if (!indexesReady) {
    indexesReady = (async () => {
      const collection = await getCollection();
      await collection.createIndex({ userId: 1 }, { unique: true });
      await collection.createIndex({ paddleSubscriptionId: 1 });
    })();
  }
  return indexesReady;
}
