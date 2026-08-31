import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import {
  COMMENTS_COLLECTION,
  MAX_COMMENT_LENGTH,
  MAX_NAME_LENGTH,
  ensureEngagementIndexes,
  serializeComment,
  toBlogObjectId,
} from "@/lib/blog-engagement"

const MAX_COMMENTS_RETURNED = 100

/** Newest-first comments for one post. Public — commenting needs no account. */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!toBlogObjectId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 })

    const db = await getDb()
    const docs = await db
      .collection(COMMENTS_COLLECTION)
      .find({ blogId: id })
      .sort({ createdAt: -1 })
      .limit(MAX_COMMENTS_RETURNED)
      .toArray()

    return NextResponse.json(docs.map(d => serializeComment(d as Record<string, unknown>)))
  } catch {
    return NextResponse.json({ error: "Failed to load comments" }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const oid = toBlogObjectId(id)
    if (!oid) return NextResponse.json({ error: "Invalid id" }, { status: 400 })

    const body = await request.json().catch(() => ({}))
    const name = String(body.name ?? "").trim().slice(0, MAX_NAME_LENGTH)
    const text = String(body.text ?? "").trim().slice(0, MAX_COMMENT_LENGTH)

    if (!name || !text) {
      return NextResponse.json({ error: "Name and comment are required" }, { status: 400 })
    }

    const db = await getDb()
    // Reject comments on posts that do not exist or are not public yet.
    const blog = await db.collection("blogs").findOne({ _id: oid, published: true }, { projection: { _id: 1 } })
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 })

    await ensureEngagementIndexes()
    const doc = { blogId: id, name, text, createdAt: new Date() }
    const result = await db.collection(COMMENTS_COLLECTION).insertOne(doc)

    return NextResponse.json(
      serializeComment({ ...doc, _id: result.insertedId }),
      { status: 201 }
    )
  } catch {
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 })
  }
}
