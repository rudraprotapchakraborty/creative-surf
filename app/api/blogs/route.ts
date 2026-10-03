import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'
import { requireUser } from '@/lib/auth'
import { sanitizeBlogInput, validateBlogInput } from '@/lib/blog-input'

export async function GET() {
  try {
    const db = await getDb()
    const blogs = await db.collection('blogs').find({ published: true }).sort({ createdAt: -1 }).toArray()

    // Each owner's profile picture, for the byline. One query for the whole
    // feed, projected to the avatar alone so no other account field is exposed.
    const ownerIds = Array.from(new Set(blogs.map(b => b.authorId).filter((id): id is string => typeof id === 'string' && ObjectId.isValid(id))))
    const owners = ownerIds.length
      ? await db
          .collection('users')
          .find({ _id: { $in: ownerIds.map(id => new ObjectId(id)) } }, { projection: { avatar: 1 } })
          .toArray()
      : []
    const avatars = new Map(owners.filter(o => o.avatar).map(o => [o._id.toString(), String(o.avatar)]))

    return NextResponse.json(
      blogs.map(b => ({ ...b, authorAvatar: (b.authorId && avatars.get(b.authorId)) || undefined }))
    )
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}

/** Any signed-in account may publish; the session decides who owns the result. */
export async function POST(request: NextRequest) {
  const gate = requireUser(request)
  if ('denied' in gate) return gate.denied
  const { auth } = gate

  try {
    const db = await getDb()
    const input = sanitizeBlogInput(await request.json())

    const invalid = validateBlogInput(input)
    if (invalid) return NextResponse.json({ error: invalid }, { status: 400 })

    const now = new Date()
    const doc = {
      ...input,
      // Stamped from the token, never from the body — this is what every later
      // edit and delete check is measured against.
      authorId: auth.sub,
      authorRole: auth.role,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection('blogs').insertOne(doc)
    return NextResponse.json({ ...doc, _id: result.insertedId }, { status: 201 })
  } catch (err: any) {
    if (err.code === 11000) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}
