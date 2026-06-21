import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/(^-|-$)/g, '')
}

export async function GET() {
  try {
    const db = await getDb()
    const blogs = await db.collection('real_estate_blogs').find({ published: true }).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(blogs)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const db = await getDb()
    const data = await request.json()

    if (!data.slug && data.title) data.slug = slugify(data.title)

    const now = new Date()
    const doc = { ...data, createdAt: now, updatedAt: now }

    const result = await db.collection('real_estate_blogs').insertOne(doc)
    return NextResponse.json({ ...doc, _id: result.insertedId }, { status: 201 })
  } catch (err: any) {
    if (err.code === 11000) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}
