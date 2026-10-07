import { cookies } from "next/headers"
import { COOKIE_NAME, verifyToken } from "@/lib/auth"
import { listPublishedBlogs } from "@/lib/blogs-feed"
import BlogsClient, { type Blog } from "@/app/blogs/BlogsClient"

/**
 * The real-estate journal: the marketing blog's page in the real-estate
 * colours. Rendered on the server for the same reasons — posts in the first
 * paint, and the admin's "new post" prompt right without waiting on a fetch.
 */
export default async function RealEstateBlogsPage() {
  const token = (await cookies()).get(COOKIE_NAME)?.value
  const session = token ? verifyToken(token) : null

  // A database hiccup shows an empty journal rather than an error page.
  const blogs = await listPublishedBlogs("real_estate_blogs").catch(() => [])

  return (
    <BlogsClient
      section="real-estate"
      initialBlogs={blogs as unknown as Blog[]}
      initialViewer={session ? { sub: session.sub, name: session.name || session.email || "", avatar: session.avatar } : null}
      initialIsAdmin={session?.role === "admin"}
    />
  )
}
