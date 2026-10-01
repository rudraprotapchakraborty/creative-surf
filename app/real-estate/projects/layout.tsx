import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("realEstateProjects", "/real-estate/projects")
}

export default function RealEstateProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
