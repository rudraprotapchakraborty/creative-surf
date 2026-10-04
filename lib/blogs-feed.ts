import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"

/**
 * The published feed, newest first, each post carrying its owner's profile
 * picture for the byline. Shared by GET /api/blogs and the server-rendered
 * /blogs page, so the page arrives with its posts already in the HTML.
 *
 * Returned as plain JSON values (ids and dates as strings), the same shape the
 * API has always sent, so it can be handed straight to a client component.
 */
export async function listPublishedBlogs() {
  const db = await getDb()
  const blogs = await db.collection("blogs").find({ published: true }).sort({ createdAt: -1 }).toArray()

  // One query for the whole feed, projected to the avatar alone so no other
  // account field is exposed.
  const ownerIds = Array.from(
    new Set(blogs.map((b) => b.authorId).filter((id): id is string => typeof id === "string" && ObjectId.isValid(id)))
  )
  const owners = ownerIds.length
    ? await db
        .collection("users")
        .find({ _id: { $in: ownerIds.map((id) => new ObjectId(id)) } }, { projection: { avatar: 1 } })
        .toArray()
    : []
  const avatars = new Map(owners.filter((o) => o.avatar).map((o) => [o._id.toString(), String(o.avatar)]))

  const feed = blogs.map((b) => ({ ...b, authorAvatar: (b.authorId && avatars.get(b.authorId)) || undefined }))
  // Through JSON, exactly as the API response does: ObjectId and Date become strings.
  return JSON.parse(JSON.stringify(feed)) as Record<string, unknown>[]
}
