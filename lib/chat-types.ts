import type { Locale } from "@/lib/i18n/config";

/** One turn in a saved conversation. */
export interface StoredChatMessage {
  role: "user" | "assistant";
  content: string;
  at: string;
}

/**
 * A whole conversation, as the admin dashboard receives it.
 *
 * One document per conversation rather than per message: the thing anyone ever
 * wants to read is the exchange, and keeping it together means reading it is a
 * single lookup instead of a sort-and-group.
 */
export interface ChatTranscript {
  _id: string;
  /** Client-minted id, stable for as long as the visitor keeps the tab open. */
  conversationId: string;
  /** Per-browser id from lib/visitor-id.ts — the only handle on an anonymous visitor. */
  visitorId: string;
  /** Set when the visitor happened to be signed in; empty otherwise. */
  userId: string;
  userEmail: string;
  locale: Locale;
  /** The page the visitor was on when they opened the chat. */
  pagePath: string;
  messages: StoredChatMessage[];
  messageCount: number;
  /** The opening question, kept denormalised so the list needs no message scan. */
  firstMessage: string;
  createdAt: string;
  updatedAt: string;
}
