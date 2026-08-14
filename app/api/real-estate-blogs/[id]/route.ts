import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'
import { requireAdmin } from '@/lib/auth'

function toObjectId(id: string) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const db = await getDb()
    const oid = toObjectId(id)

    const blog = await db.collection('real_estate_blogs').findOne(
      oid ? { $or: [{ slug: id }, { _id: oid }] } : { slug: id }
    )

    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(blog)
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const { id } = await params
    const db = await getDb()
    const oid = toObjectId(id)
    if (!oid) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const data = await request.json()
    delete data._id

    const result = await db.collection('real_estate_blogs').findOneAndUpdate(
      { _id: oid },
      { $set: { ...data, updatedAt: new Date() } },
      { returnDocument: 'after' }
    )

    if (!result) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const { id } = await params
    const db = await getDb()
    const oid = toObjectId(id)
    if (!oid) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    await db.collection('real_estate_blogs').deleteOne({ _id: oid })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
