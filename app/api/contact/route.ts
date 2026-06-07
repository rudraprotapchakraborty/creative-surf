import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    const db = await getDb()
    await db.collection('contact_submissions').insertOne({
      name,
      email,
      subject: subject || '',
      message,
      createdAt: new Date(),
      read: false,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}
