"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"

export function ConditionalNavbar() {
  const pathname = usePathname()
  if (pathname.startsWith("/real-estate")) return null
  return <Navbar />
}
