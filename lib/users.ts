import bcrypt from 'bcryptjs'
import { randomInt } from 'crypto'
import { ObjectId, type Collection, type WithId } from 'mongodb'
import { getDb } from '@/lib/mongodb'
import type { AuthPayload, Role } from '@/lib/auth'

export type AuthProvider = 'password' | 'google'

export interface UserDoc {
  /** Lowercased, trimmed — the unique key for an account. */
  email?: string
  /** Retained for the original admin account, which signs in by username. */
  username?: string
  name?: string
  password?: string
  role: Role
  providers: AuthProvider[]
  googleId?: string
  avatar?: string
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
}

export interface OtpDoc {
  email: string
  purpose: OtpPurpose
  codeHash: string
  expiresAt: Date
  attempts: number
  lastSentAt: Date
  /** Registration details held until the code is confirmed, so an unverified email never becomes an account. */
  pending?: { name: string; password: string }
}

export type OtpPurpose = 'verify' | 'reset'

export const OTP_TTL_MS = 10 * 60 * 1000
export const OTP_RESEND_COOLDOWN_MS = 60 * 1000
export const OTP_MAX_ATTEMPTS = 5

let indexesReady: Promise<void> | null = null

/** Mongo's codes for "an index on these keys/name already exists, with other options". */
const INDEX_CONFLICT_CODES = new Set([85, 86])

/**
 * Creates an index, rebuilding it when an older one with the same name exists
 * under different options.
 *
 * The site shipped with a plain `unique` index on `username`. That predates
 * self-registration, where accounts have an email and no username — under a
 * non-partial unique index every such account indexes as `null` and the second
 * one to register is rejected. Replacing it is required for registration to
 * work at all, and costs nothing but a rebuild on a small collection.
 */
async function ensureIndex(
  collection: Collection<any>,
  keys: Record<string, 1 | -1>,
  options: Parameters<Collection['createIndex']>[1],
): Promise<void> {
  try {
    await collection.createIndex(keys, options)
  } catch (err) {
    const code = (err as { code?: number }).code
    if (!code || !INDEX_CONFLICT_CODES.has(code)) throw err

    const name = Object.entries(keys).map(([field, dir]) => `${field}_${dir}`).join('_')
    await collection.dropIndex(name)
    await collection.createIndex(keys, options)
  }
}

async function ensureIndexes(): Promise<void> {
  if (!indexesReady) {
    indexesReady = (async () => {
      const db = await getDb()
      const users = db.collection('users')
      const otps = db.collection('auth_otps')

      // Partial filters so accounts that legitimately lack one identifier
      // (email-only members, the username-only admin) do not collide on null.
      await ensureIndex(users, { email: 1 }, {
        unique: true,
        partialFilterExpression: { email: { $type: 'string' } },
      })
      await ensureIndex(users, { username: 1 }, {
        unique: true,
        partialFilterExpression: { username: { $type: 'string' } },
      })

      // Mongo drops expired codes on its own; no cleanup job to run.
      await ensureIndex(otps, { expiresAt: 1 }, { expireAfterSeconds: 0 })
      await ensureIndex(otps, { email: 1, purpose: 1 }, { unique: true })
    })().catch(err => {
      // Let a later call retry rather than caching the failure forever.
      indexesReady = null
      throw err
    })
  }
  return indexesReady
}

export async function usersCollection(): Promise<Collection<UserDoc>> {
  await ensureIndexes()
  const db = await getDb()
  return db.collection<UserDoc>('users')
}

async function otpsCollection(): Promise<Collection<OtpDoc>> {
  await ensureIndexes()
  const db = await getDb()
  return db.collection<OtpDoc>('auth_otps')
}

export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase()
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(normaliseEmail(email))
}

/** Returns an error message when the password is too weak, or null when it passes. */
export function validatePassword(password: string): string | null {
  if (typeof password !== 'string' || password.length < 8) {
    return 'Password must be at least 8 characters.'
  }
  if (password.length > 200) return 'Password is too long.'
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Password must contain at least one letter and one number.'
  }
  return null
}

export async function findUserByEmail(email: string): Promise<WithId<UserDoc> | null> {
  const users = await usersCollection()
  return users.findOne({ email: normaliseEmail(email) })
}

/** The login form takes one field, so an identifier may be an email or the admin's username. */
export async function findUserByIdentifier(identifier: string): Promise<WithId<UserDoc> | null> {
  const users = await usersCollection()
  const value = identifier.trim().toLowerCase()
  return users.findOne(value.includes('@') ? { email: value } : { username: value })
}

/**
 * Resolves the account behind a session. `sub` is a Mongo id for every account
 * created since registration shipped, but legacy admin tokens carry a username.
 */
export async function findUserByAuth(sub: string): Promise<WithId<UserDoc> | null> {
  const users = await usersCollection()
  if (ObjectId.isValid(sub) && new ObjectId(sub).toString() === sub) {
    const byId = await users.findOne({ _id: new ObjectId(sub) })
    if (byId) return byId
  }
  return users.findOne({ username: sub.toLowerCase() })
}

/** Returns an error message when the display name is unusable, or null when it passes. */
export function validateName(name: unknown): string | null {
  if (typeof name !== 'string') return 'Name is required.'
  const trimmed = name.trim()
  if (trimmed.length < 1) return 'Name cannot be empty.'
  if (trimmed.length > 80) return 'Name must be 80 characters or fewer.'
  return null
}

export async function updateName(id: ObjectId, name: string): Promise<void> {
  const users = await usersCollection()
  await users.updateOne({ _id: id }, { $set: { name: name.trim(), updatedAt: new Date() } })
}

export interface DirectoryEntry {
  id: string
  name: string
  email?: string
  username?: string
  role: Role
  providers: AuthProvider[]
  avatar?: string
  createdAt?: string
  lastLoginAt?: string
}

/**
 * Every account, for the admin dashboard. Explicitly projects the fields it
 * returns so a password hash can never reach the client by accident.
 */
export async function listAccounts(): Promise<DirectoryEntry[]> {
  const users = await usersCollection()
  const docs = await users
    .find({}, { projection: { password: 0 } })
    .sort({ createdAt: 1 })
    .toArray()

  return docs.map(doc => ({
    id: doc._id.toString(),
    name: doc.name || doc.username || doc.email || 'Unknown',
    email: doc.email,
    username: doc.username,
    role: doc.role ?? 'admin',
    providers: doc.providers ?? ['password'],
    avatar: doc.avatar,
    createdAt: doc.createdAt?.toISOString(),
    lastLoginAt: doc.lastLoginAt?.toISOString(),
  }))
}

export function toAuthPayload(user: WithId<UserDoc>): AuthPayload {
  return {
    sub: user._id.toString(),
    // Documents predating self-registration carry no `role`. The only accounts
    // that could exist back then were the hand-created admins, so they stay admins.
    role: user.role ?? 'admin',
    email: user.email,
    username: user.username,
    name: user.name || user.username || user.email,
    avatar: user.avatar,
  }
}

export async function touchLastLogin(id: ObjectId): Promise<void> {
  const users = await usersCollection()
  await users.updateOne({ _id: id }, { $set: { lastLoginAt: new Date() } })
}

/**
 * Creates the account for a confirmed email. New accounts are always `user` —
 * admin is only ever granted by promoting an account directly in the database.
 */
export async function createVerifiedUser(input: {
  email: string
  name: string
  password: string
}): Promise<WithId<UserDoc>> {
  const users = await usersCollection()
  const now = new Date()
  const doc: UserDoc = {
    email: normaliseEmail(input.email),
    name: input.name.trim() || normaliseEmail(input.email).split('@')[0],
    password: input.password,
    role: 'user',
    providers: ['password'],
    emailVerified: true,
    createdAt: now,
    updatedAt: now,
    lastLoginAt: now,
  }
  const result = await users.insertOne(doc as UserDoc)
  return { ...doc, _id: result.insertedId } as WithId<UserDoc>
}

/**
 * Signs in (or creates) the account behind a verified Google profile. When the
 * email already has a password account, Google is linked to it rather than
 * creating a duplicate — Google has verified the same address.
 */
export async function upsertGoogleUser(profile: {
  googleId: string
  email: string
  name?: string
  picture?: string
}): Promise<WithId<UserDoc>> {
  const users = await usersCollection()
  const email = normaliseEmail(profile.email)
  const now = new Date()

  const existing = await users.findOne({ email })
  if (existing) {
    await users.updateOne(
      { _id: existing._id },
      {
        $set: {
          googleId: profile.googleId,
          emailVerified: true,
          avatar: existing.avatar || profile.picture,
          name: existing.name || profile.name,
          updatedAt: now,
          lastLoginAt: now,
        },
        $addToSet: { providers: 'google' as AuthProvider },
      },
    )
    return (await users.findOne({ _id: existing._id })) as WithId<UserDoc>
  }

  const doc: UserDoc = {
    email,
    name: profile.name || email.split('@')[0],
    role: 'user',
    providers: ['google'],
    googleId: profile.googleId,
    avatar: profile.picture,
    emailVerified: true,
    createdAt: now,
    updatedAt: now,
    lastLoginAt: now,
  }
  const result = await users.insertOne(doc as UserDoc)
  return { ...doc, _id: result.insertedId } as WithId<UserDoc>
}

function randomCode(): string {
  // randomInt keeps the code unguessable; Math.random would not.
  return String(randomInt(0, 1_000_000)).padStart(6, '0')
}

export interface IssueOtpResult {
  code: string
  retryAfterMs?: number
}

/**
 * Issues a code for an email, replacing any outstanding one. Returns
 * `retryAfterMs` instead of a code when the caller is inside the cooldown.
 */
export async function issueOtp(
  email: string,
  purpose: OtpPurpose,
  pending?: OtpDoc['pending'],
): Promise<IssueOtpResult> {
  const otps = await otpsCollection()
  const key = { email: normaliseEmail(email), purpose }
  const now = new Date()

  const existing = await otps.findOne(key)
  if (existing) {
    const elapsed = now.getTime() - existing.lastSentAt.getTime()
    if (elapsed < OTP_RESEND_COOLDOWN_MS) {
      return { code: '', retryAfterMs: OTP_RESEND_COOLDOWN_MS - elapsed }
    }
  }

  // A resend passes no `pending`, so carry the original signup details forward.
  const carried = pending ?? existing?.pending

  const code = randomCode()
  await otps.replaceOne(
    key,
    {
      ...key,
      codeHash: await bcrypt.hash(code, 10),
      expiresAt: new Date(now.getTime() + OTP_TTL_MS),
      attempts: 0,
      lastSentAt: now,
      ...(carried ? { pending: carried } : {}),
    },
    { upsert: true },
  )

  return { code }
}

/**
 * Discards an issued code. Used when the email fails to send, so a delivery
 * problem does not leave the visitor sitting through a resend cooldown for a
 * code that never arrived.
 */
export async function clearOtp(email: string, purpose: OtpPurpose): Promise<void> {
  const otps = await otpsCollection()
  await otps.deleteOne({ email: normaliseEmail(email), purpose })
}

/**
 * Lifts the resend cooldown without touching the pending signup details.
 *
 * Deleting the record outright would discard `pending` and bounce the visitor
 * back to the signup form; on a failed *resend* they should just be able to
 * press the button again.
 */
export async function allowOtpRetry(email: string, purpose: OtpPurpose): Promise<void> {
  const otps = await otpsCollection()
  await otps.updateOne({ email: normaliseEmail(email), purpose }, { $set: { lastSentAt: new Date(0) } })
}

export type OtpCheck =
  | { ok: true; pending?: OtpDoc['pending'] }
  | { ok: false; reason: 'missing' | 'expired' | 'too-many-attempts' | 'mismatch' }

/** Consumes a code. A correct code is deleted so it cannot be replayed. */
export async function verifyOtp(email: string, purpose: OtpPurpose, code: string): Promise<OtpCheck> {
  const otps = await otpsCollection()
  const key = { email: normaliseEmail(email), purpose }

  const doc = await otps.findOne(key)
  if (!doc) return { ok: false, reason: 'missing' }

  if (doc.expiresAt.getTime() < Date.now()) {
    await otps.deleteOne(key)
    return { ok: false, reason: 'expired' }
  }

  if (doc.attempts >= OTP_MAX_ATTEMPTS) {
    await otps.deleteOne(key)
    return { ok: false, reason: 'too-many-attempts' }
  }

  if (!(await bcrypt.compare(String(code).trim(), doc.codeHash))) {
    await otps.updateOne(key, { $inc: { attempts: 1 } })
    return { ok: false, reason: 'mismatch' }
  }

  await otps.deleteOne(key)
  return { ok: true, pending: doc.pending }
}
