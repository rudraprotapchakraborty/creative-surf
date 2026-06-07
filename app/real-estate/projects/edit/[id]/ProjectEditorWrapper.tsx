"use client"

import ProjectEditor from "../../ProjectEditor"

export default function ProjectEditorWrapper({ projectId }: { projectId: string }) {
  return <ProjectEditor projectId={projectId} />
}
