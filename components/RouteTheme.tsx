"use client"

import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

export function RouteTheme() {
  const { setTheme } = useTheme()
  const pathname = usePathname()
  const prevPathname = useRef<string | null>(null)

  useEffect(() => {
    if (prevPathname.current === pathname) return
    prevPathname.current = pathname
    setTheme(pathname.startsWith("/real-estate") ? "dark" : "light")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return null
}
