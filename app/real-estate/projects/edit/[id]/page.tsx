import ProjectEditorWrapper from "./ProjectEditorWrapper"

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ProjectEditorWrapper projectId={id} />
}
