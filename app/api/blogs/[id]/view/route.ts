import { NextRequest, NextResponse } from "next/server"
import { recordBlogView, toBlogObjectId } from "@/lib/blog-engagement"

/** Counts one open of a blog post. Called by the post page on mount. */
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!toBlogObjectId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 })

    return NextResponse.json(await recordBlogView(id))
  } catch {
    return NextResponse.json({ error: "Failed to record view" }, { status: 500 })
  }
}
