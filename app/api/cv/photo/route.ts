import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { ImgbbError, uploadToImgbb } from "@/lib/imgbb";

export const runtime = "nodejs";

/**
 * Hosts a CV photo and returns its URL.
 *
 * Separate from `/api/upload`, which is admin-only: a candidate uploading their
 * own headshot is not an editor uploading site artwork, so it gets its own
 * route with its own limits rather than a loosened guard on that one.
 */

/** Roughly 4 MB of image once base64's ~33% overhead is taken off. */
const MAX_DATA_URL_LENGTH = 5_600_000;

/** What a headshot can be. No SVG: it is a script vector, not a photograph. */
const ALLOWED = /^data:image\/(png|jpeg|jpg|webp|gif|avif);base64,/i;

export async function POST(request: NextRequest) {
  const guard = requireUser(request);
  if ("denied" in guard) return guard.denied;

  try {
    const { image, name } = await request.json();
    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "No image provided." }, { status: 400 });
    }
    if (!ALLOWED.test(image)) {
      return NextResponse.json(
        { error: "That file type isn't supported. Use a PNG, JPEG or WebP photo." },
        { status: 400 }
      );
    }
    if (image.length > MAX_DATA_URL_LENGTH) {
      return NextResponse.json({ error: "That photo is too large. Keep it under 4 MB." }, { status: 413 });
    }

    const { url } = await uploadToImgbb(image, typeof name === "string" ? name : undefined);
    return NextResponse.json({ url });
  } catch (err) {
    if (err instanceof ImgbbError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
