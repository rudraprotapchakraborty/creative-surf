import { NextRequest, NextResponse } from 'next/server'
import { getAuth, setSessionCookie, signToken } from '@/lib/auth'
import { findUserByAuth, toAuthPayload, updateName, validateName } from '@/lib/users'

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
