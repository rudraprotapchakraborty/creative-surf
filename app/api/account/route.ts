import { NextRequest, NextResponse } from 'next/server'
import { getAuth, setSessionCookie, signToken } from '@/lib/auth'
import { findUserByAuth, toAuthPayload, updateName, validateName } from '@/lib/users'

/**
 * The signed-in account's own profile.
 *
 * The session token carries only what the navbar needs, so joining date and
 * sign-in providers have to come from the account record — the profile page
 * shows both, and until now they were reachable only through the admin
 * directory.
 */
export async function GET(request: NextRequest) {
  const auth = getAuth(request)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const user = await findUserByAuth(auth.sub)
    if (!user) return NextResponse.json({ error: 'Account not found.' }, { status: 404 })

    // Explicit field list: the record holds a password hash.
    return NextResponse.json({
      profile: {
        createdAt: user.createdAt?.toISOString() ?? null,
        lastLoginAt: user.lastLoginAt?.toISOString() ?? null,
        providers: user.providers ?? ['password'],
        emailVerified: Boolean(user.emailVerified),
      },
    })
  } catch (err) {
    console.error('Loading the profile failed:', err)
    return NextResponse.json({ error: 'Could not load your profile.' }, { status: 500 })
  }
}

/** Updates the signed-in account's own display name. Any role may do this. */
export async function PATCH(request: NextRequest) {
  const auth = getAuth(request)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { name } = await request.json()

    const invalid = validateName(name)
    if (invalid) return NextResponse.json({ error: invalid }, { status: 400 })

    const user = await findUserByAuth(auth.sub)
    if (!user) return NextResponse.json({ error: 'Account not found.' }, { status: 404 })

    await updateName(user._id, name)

    // The name lives in the token, so re-issue it — otherwise the navbar and
    // dashboard keep showing the old name until the cookie expires.
    const payload = toAuthPayload({ ...user, name: name.trim() })
    const response = NextResponse.json({ success: true, user: payload })
    return setSessionCookie(response, signToken(payload))
  } catch (err) {
    console.error('Updating the profile failed:', err)
    return NextResponse.json({ error: 'Could not save your changes. Please try again.' }, { status: 500 })
  }
}
