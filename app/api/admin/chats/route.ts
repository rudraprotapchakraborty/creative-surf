import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { countChatTranscripts, listChatTranscripts } from "@/lib/chat-db";

export const runtime = "nodejs";
// Transcripts change as visitors chat, so this must never be cached.
export const dynamic = "force-dynamic";

/** Assistant transcripts for the admin dashboard. Admin-only. */
export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const [chats, total] = await Promise.all([listChatTranscripts(), countChatTranscripts()]);
    return NextResponse.json({ chats, total });
  } catch (err) {
    console.error("Listing chat transcripts failed:", err);
    return NextResponse.json({ error: "Could not load conversations." }, { status: 500 });
  }
}
