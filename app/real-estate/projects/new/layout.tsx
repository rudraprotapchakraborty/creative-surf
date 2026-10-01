import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("newProject", "/real-estate/projects/new", { noIndex: true })
}

export default function NewProjectLayout({ children }: { children: React.ReactNode }) {
  return children
}
