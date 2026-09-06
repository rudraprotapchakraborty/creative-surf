import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { deleteChatTranscript } from "@/lib/chat-db";

export const runtime = "nodejs";

/**
 * Removes one transcript for good.
 *
 * Transcripts are kept indefinitely, so this is the only way anything leaves
 * the collection — for a test run, a spam session, or a visitor who asks for
 * their conversation to be deleted.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing conversation ID" }, { status: 400 });
  }

  try {
    const success = await deleteChatTranscript(id);
    if (!success) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete chat transcript:", err);
    return NextResponse.json({ error: "Failed to delete conversation" }, { status: 500 });
  }
}
