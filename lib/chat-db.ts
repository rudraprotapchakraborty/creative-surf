import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { Locale } from "@/lib/i18n/config";
import type { ChatTranscript, StoredChatMessage } from "@/lib/chat-types";

const COLLECTION_NAME = "chats";

/**
 * Transcripts are kept indefinitely — there is no TTL index here on purpose.
 * If that changes, a TTL on `updatedAt` is the one-line way to add expiry.
 */

export interface SaveTurnInput {
  conversationId: string;
  visitorId: string;
  userId?: string;
  userEmail?: string;
  locale: Locale;
  pagePath: string;
  /** The full exchange so far, ending with the answer just given. */
  messages: { role: "user" | "assistant"; content: string }[];
}

/**
 * Writes the conversation as it stands after a completed turn.
 *
 * An upsert on `conversationId` rather than an append: the client already holds
 * the authoritative transcript, so replacing it keeps the stored copy identical
 * to what the visitor sees even if a turn was retried or a request was dropped.
 *
 * The cost of replacing is that a naive write would restamp every message with
 * the current time on every turn, so the timestamps of turns already on record
 * are carried across by position — messages are only ever appended, so the
 * first N of the incoming transcript are the N already stored.
 */
export async function saveChatTurn(input: SaveTurnInput): Promise<void> {
  const db = await getDb();
  const collection = db.collection(COLLECTION_NAME);

  const existing = await collection.findOne<{ messages?: StoredChatMessage[] }>(
    { conversationId: input.conversationId },
    { projection: { messages: 1 } }
  );
  const known = existing?.messages ?? [];

  const now = new Date();
  const nowIso = now.toISOString();
  const messages: StoredChatMessage[] = input.messages.map((message, index) => ({
    role: message.role,
    content: message.content,
    at: known[index]?.at ?? nowIso,
  }));

  const firstUser = messages.find((message) => message.role === "user");

  await collection.updateOne(
    { conversationId: input.conversationId },
    {
      $set: {
        visitorId: input.visitorId,
        userId: input.userId || "",
        userEmail: input.userEmail || "",
        locale: input.locale,
        pagePath: input.pagePath,
        messages,
        messageCount: messages.length,
        firstMessage: firstUser?.content.slice(0, 300) || "",
        updatedAt: now,
      },
      $setOnInsert: { conversationId: input.conversationId, createdAt: now },
    },
    { upsert: true }
  );
}

function toTranscript(doc: Record<string, any>): ChatTranscript {
  return {
    _id: doc._id.toString(),
    conversationId: doc.conversationId,
    visitorId: doc.visitorId || "",
    userId: doc.userId || "",
    userEmail: doc.userEmail || "",
    locale: doc.locale,
    pagePath: doc.pagePath || "",
    messages: Array.isArray(doc.messages) ? doc.messages : [],
    messageCount: doc.messageCount ?? 0,
    firstMessage: doc.firstMessage || "",
    createdAt: doc.createdAt?.toISOString?.() ?? String(doc.createdAt ?? ""),
    updatedAt: doc.updatedAt?.toISOString?.() ?? String(doc.updatedAt ?? ""),
  };
}

/** Every conversation, newest activity first. Admin-only — the route enforces that. */
export async function listChatTranscripts(limit = 200): Promise<ChatTranscript[]> {
  const db = await getDb();
  const docs = await db
    .collection(COLLECTION_NAME)
    .find({})
    .sort({ updatedAt: -1 })
    .limit(limit)
    .toArray();

  return docs.map(toTranscript);
}

/** Total conversations on record, for the dashboard's stat line. */
export async function countChatTranscripts(): Promise<number> {
  const db = await getDb();
  return db.collection(COLLECTION_NAME).countDocuments({});
}

/** Removes one conversation. Permanent — there is nothing to restore it from. */
export async function deleteChatTranscript(id: string): Promise<boolean> {
  const db = await getDb();

  let oid: ObjectId;
  try {
    oid = new ObjectId(id);
  } catch {
    return false;
  }

  const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: oid });
  return result.deletedCount === 1;
}
