import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'

/**
 * Uploads an image to ImgBB and returns the hosted URL.
 *
 * The ImgBB API key lives only on the server (IMGBB_API_KEY env var) so it is
 * never exposed to the browser. The client sends a base64 data URL; we strip the
 * prefix and forward the raw base64 to ImgBB, then hand back the public image URL
 * which gets stored in the database (just like a normal URL).
 */
export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.IMGBB_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Image upload is not configured. Add IMGBB_API_KEY to your environment.' },
      { status: 500 }
    )
  }

  try {
    const { image, name } = await request.json()
    if (!image || typeof image !== 'string') {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    // ImgBB wants the raw base64 payload, without the `data:image/...;base64,` prefix.
    const base64 = image.includes(',') ? image.split(',')[1] : image

    const body = new URLSearchParams()
    body.append('image', base64)
    if (name && typeof name === 'string') body.append('name', name.slice(0, 80))

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body,
    })

    const data = await res.json().catch(() => null)
    const url: string | undefined = data?.data?.url

    if (!res.ok || !url) {
      const message = data?.error?.message || 'Image host rejected the upload.'
      return NextResponse.json({ error: message }, { status: 502 })
    }

    return NextResponse.json({ url, displayUrl: data.data.display_url ?? url })
  } catch {
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 })
  }
}
