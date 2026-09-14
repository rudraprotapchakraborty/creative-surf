/**
 * Uploads an image to ImgBB and hands back the hosted URL.
 *
 * Shared by every route that accepts an image so the API key, the payload
 * shape and the failure messages live in one place. The key is read here, on
 * the server, and never reaches the browser.
 */

export type ImgbbResult = { url: string; displayUrl: string };

export class ImgbbError extends Error {
  /** The status to send back: 500 when we are misconfigured, 502 when the host refused. */
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ImgbbError";
    this.status = status;
  }
}

export function isImgbbConfigured(): boolean {
  return Boolean(process.env.IMGBB_API_KEY);
}

export async function uploadToImgbb(image: string, name?: string): Promise<ImgbbResult> {
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    throw new ImgbbError("Image upload is not configured. Add IMGBB_API_KEY to your environment.", 500);
  }

  // ImgBB wants the raw base64 payload, without the `data:image/...;base64,` prefix.
  const base64 = image.includes(",") ? image.split(",")[1] : image;

  const body = new URLSearchParams();
  body.append("image", base64);
  if (name) body.append("name", name.slice(0, 80));

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { method: "POST", body });
  const data = await res.json().catch(() => null);
  const url: string | undefined = data?.data?.url;

  if (!res.ok || !url) {
    throw new ImgbbError(data?.error?.message || "Image host rejected the upload.", 502);
  }

  return { url, displayUrl: data.data.display_url ?? url };
}
