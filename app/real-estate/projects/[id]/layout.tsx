import type { Metadata } from "next"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { pageMetadata } from "@/lib/page-metadata"

type ProjectMeta = {
  name?: string
  subtitle?: string
  description?: string
  sector?: string
  coverImage?: string
}

/** Same lookup as the project API: by slug, or by id for older links. */
async function findProject(id: string): Promise<ProjectMeta | null> {
  try {
    const db = await getDb()
    const query = ObjectId.isValid(id)
      ? { $or: [{ slug: id }, { _id: new ObjectId(id) }] }
      : { slug: id }
    return await db
      .collection<ProjectMeta>("real_estate_projects")
      .findOne(query, { projection: { name: 1, subtitle: 1, description: 1, sector: 1, coverImage: 1 } })
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const path = `/real-estate/projects/${id}`
  const project = await findProject(id)
  if (!project?.name) return pageMetadata("realEstateProject", path)

  const summary = (project.subtitle || project.description || "").replace(/\s+/g, " ").trim()
  const location = project.sector ? ` in ${project.sector}, Dhaka` : " in Dhaka"
  return buildMetadata({
    title: `${project.name} | Creative Surf Real Estate`,
    description: summary
      ? summary.slice(0, 160)
      : `${project.name}: plot, unit and building details for this real estate project${location}.`,
    image: project.coverImage || undefined,
    path,
  })
}

export default function ProjectDetailLayout({ children }: { children: React.ReactNode }) {
  return children
}
