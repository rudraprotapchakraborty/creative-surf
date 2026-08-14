import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { requireAdmin } from '@/lib/auth'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/(^-|-$)/g, '')
}

export async function GET() {
  try {
    const db = await getDb()
    const projects = await db.collection('real_estate_projects').find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const db = await getDb()
    const data = await request.json()

    if (!data.slug && data.name) data.slug = slugify(data.name)

    const now = new Date()
    const doc = { ...data, createdAt: now, updatedAt: now }

    const result = await db.collection('real_estate_projects').insertOne(doc)
    return NextResponse.json({ ...doc, _id: result.insertedId }, { status: 201 })
  } catch (err: any) {
    if (err.code === 11000) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
