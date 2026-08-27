import { cache } from "react"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"
import { pickBlogSeoFields, type BlogSeoFields } from "@/lib/blog-types"

export interface BlogRecord {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  tags: string[]
  /** Display line kept for cards, metadata and the post meta row (all writers joined). */
  author: string
  /** One entry per writer; falls back to `[author]` for posts saved before multi-writer support. */
  authors: string[]
  readTime: string
  published: boolean
  createdAt: string
  updatedAt?: string
  metaDescription: string
  inboundLinks: BlogSeoFields["inboundLinks"]
  outboundLinks: BlogSeoFields["outboundLinks"]
}

function serializeBlog(doc: Record<string, unknown>): BlogRecord {
  const seo = pickBlogSeoFields(doc as Partial<BlogSeoFields>)
  const author = String(doc.author ?? "Creative Surf")
  const authors = Array.isArray(doc.authors)
    ? doc.authors.map(String).map(a => a.trim()).filter(Boolean)
    : []
  return {
    _id: String(doc._id),
    title: String(doc.title ?? ""),
    slug: String(doc.slug ?? ""),
    excerpt: String(doc.excerpt ?? ""),
    content: String(doc.content ?? ""),
    coverImage: String(doc.coverImage ?? ""),
    category: String(doc.category ?? "General"),
    tags: Array.isArray(doc.tags) ? doc.tags.map(String) : [],
    author,
    authors: authors.length ? authors : [author],
    readTime: String(doc.readTime ?? "5 min read"),
    published: Boolean(doc.published),
    createdAt: doc.createdAt ? new Date(doc.createdAt as string | Date).toISOString() : new Date().toISOString(),
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt as string | Date).toISOString() : undefined,
    metaDescription: seo.metaDescription,
    inboundLinks: seo.inboundLinks,
    outboundLinks: seo.outboundLinks,
  }
}

function toObjectId(id: string) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null
}

export const getCreativeSurfBlogBySlug = cache(async (slug: string): Promise<BlogRecord | null> => {
  const db = await getDb()
  const doc = await db.collection("blogs").findOne({ slug, published: true })
  return doc ? serializeBlog(doc as Record<string, unknown>) : null
})

export const getRealEstateBlogBySlug = cache(async (slug: string): Promise<BlogRecord | null> => {
  const db = await getDb()
  const doc = await db.collection("real_estate_blogs").findOne({ slug, published: true })
  return doc ? serializeBlog(doc as Record<string, unknown>) : null
})

export async function getCreativeSurfBlogByIdOrSlug(id: string): Promise<BlogRecord | null> {
  const db = await getDb()
  const oid = toObjectId(id)
  const doc = await db.collection("blogs").findOne(
    oid ? { $or: [{ slug: id }, { _id: oid }] } : { slug: id }
  )
  return doc ? serializeBlog(doc as Record<string, unknown>) : null
}

export async function getRealEstateBlogByIdOrSlug(id: string): Promise<BlogRecord | null> {
  const db = await getDb()
  const oid = toObjectId(id)
  const doc = await db.collection("real_estate_blogs").findOne(
    oid ? { $or: [{ slug: id }, { _id: oid }] } : { slug: id }
  )
  return doc ? serializeBlog(doc as Record<string, unknown>) : null
}