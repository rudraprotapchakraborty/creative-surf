import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-prod'
export const COOKIE_NAME = 'cs-auth-token'

export function signToken(username: string): string {
  return jwt.sign({ username, admin: true }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { username: string; admin: boolean } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { username: string; admin: boolean }
  } catch {
    return null
  }
}
