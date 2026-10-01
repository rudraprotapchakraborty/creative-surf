import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"
import ProjectEditorWrapper from "./ProjectEditorWrapper"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  return pageMetadata("editProject", `/real-estate/projects/edit/${id}`, { noIndex: true })
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ProjectEditorWrapper projectId={id} />
}
