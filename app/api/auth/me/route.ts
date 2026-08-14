import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const payload = getAuth(request)
  if (!payload) return NextResponse.json({ authenticated: false })

  return NextResponse.json({
    authenticated: true,
    user: payload,
    // Kept for callers written against the original response shape.
    username: payload.username || payload.name || payload.email,
    role: payload.role,
  })
}
