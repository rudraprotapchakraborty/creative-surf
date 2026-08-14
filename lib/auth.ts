import jwt from 'jsonwebtoken'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-prod'
export const COOKIE_NAME = 'cs-auth-token'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export type Role = 'admin' | 'user'

export interface AuthPayload {
  /** Mongo `_id` for accounts created through registration, username for the legacy admin. */
  sub: string
  role: Role
  email?: string
  username?: string
  name?: string
  /** Google profile picture, carried in the token so the navbar avatar needs no extra request. */
  avatar?: string
}

/** Legacy tokens (issued before roles existed) carry `{ username, admin: true }`. */
interface RawPayload extends Partial<AuthPayload> {
  admin?: boolean
}

export function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

/**
 * Verifies a token and normalises it to the current shape. Tokens issued by the
 * pre-roles admin login stay valid until they expire, and map to `role: 'admin'`.
 */
export function verifyToken(token: string): AuthPayload | null {
  try {
    const raw = jwt.verify(token, JWT_SECRET) as RawPayload

    const role: Role = raw.role ?? (raw.admin ? 'admin' : 'user')
    const sub = raw.sub ?? raw.username ?? raw.email
    if (!sub) return null

    return {
      sub,
      role,
      email: raw.email,
      username: raw.username,
      name: raw.name,
      avatar: raw.avatar,
    }
  } catch {
    return null
  }
}

/** Reads the session cookie off a request. Returns null when signed out or invalid. */
export function getAuth(request: NextRequest): AuthPayload | null {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}

export function isAdmin(payload: AuthPayload | null): boolean {
  return payload?.role === 'admin'
}

/**
 * Guard for admin-only API routes. Returns a response to send back when the
 * caller is not an admin, or `null` when the request may proceed.
 *
 * Signed-in non-admins get 403 rather than 401 so the client can tell "log in"
 * apart from "your account cannot do this".
 */
export function requireAdmin(request: NextRequest): NextResponse | null {
  const auth = getAuth(request)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isAdmin(auth)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  return null
}

/** Attaches the session cookie to a response. */
export function setSessionCookie(response: NextResponse, token: string): NextResponse {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })
  return response
}
