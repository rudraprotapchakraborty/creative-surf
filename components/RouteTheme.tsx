"use client"

import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

export function RouteTheme() {
  const { setTheme } = useTheme()
  const pathname = usePathname()
  const prevPathname = useRef<string | null>(null)

  useEffect(() => {
    const prev = prevPathname.current
    if (prev === pathname) return
    const isRE  = pathname.startsWith("/real-estate")
    const wasRE = prev?.startsWith("/real-estate") ?? false
    prevPathname.current = pathname

    // Only override the theme when crossing the real-estate boundary.
    // Inside the real-estate section we respect the user's toggle, so
    // navigating between real-estate pages no longer resets to dark.
    if (isRE && !wasRE) {
      setTheme("dark")               // entering real-estate → dark by default
    } else if (!isRE && (wasRE || prev === null)) {
      setTheme("light")              // main site stays light
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return null
}
