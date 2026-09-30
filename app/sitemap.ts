import type { MetadataRoute } from "next"
import { getDb } from "@/lib/mongodb"
import { LIVE_PATHS } from "@/lib/routes"
import { SERVICES } from "@/app/services/catalog"

const BASE_URL = "https://www.creativesurf.agency"

/** Rebuild at most hourly, so new posts and projects show up without a deploy. */
export const revalidate = 3600

type Doc = { slug?: string; _id: unknown; updatedAt?: Date | string; createdAt?: Date | string }

function lastModified(doc: Doc) {
  const date = doc.updatedAt ?? doc.createdAt
  return date ? new Date(date) : undefined
}

/**
 * Pages that come out of the database: both blogs (published posts only, the
 * same filter their pages use) and the real-estate projects. If the database
 * is unreachable the sitemap still ships with the fixed pages.
 */
async function dataEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const db = await getDb()
    const projection = { slug: 1, updatedAt: 1, createdAt: 1 }
    const [blogs, realEstateBlogs, projects] = await Promise.all([
      db.collection<Doc>("blogs").find({ published: true }, { projection }).toArray(),
      db.collection<Doc>("real_estate_blogs").find({ published: true }, { projection }).toArray(),
      db.collection<Doc>("real_estate_projects").find({}, { projection }).toArray(),
    ])

    const entries = (docs: Doc[], prefix: string, fallbackToId = false) =>
      docs
        .map(doc => ({ doc, key: doc.slug || (fallbackToId ? String(doc._id) : "") }))
        .filter(({ key }) => key)
        .map(({ doc, key }) => ({ url: `${BASE_URL}${prefix}/${encodeURIComponent(key)}`, lastModified: lastModified(doc) }))

    return [
      ...entries(blogs, "/blogs"),
      ...entries(realEstateBlogs, "/real-estate/blogs"),
      // The project page also accepts an id, for any project saved without a slug.
      ...entries(projects, "/real-estate/projects", true),
    ]
  } catch (err) {
    console.error("sitemap: could not load posts and projects", err)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fixed = LIVE_PATHS.map(path => ({ url: path === "/" ? BASE_URL : `${BASE_URL}${path}` }))
  const services = SERVICES.map(service => ({ url: `${BASE_URL}/services/${service.slug}` }))
  return [...fixed, ...services, ...(await dataEntries())]
}
