"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"

export function ThemeForcer({ theme }: { theme: "light" | "dark" }) {
  const { setTheme, resolvedTheme } = useTheme()
  const prev = useRef<string | undefined>(undefined)

  useEffect(() => {
    prev.current = resolvedTheme
    setTheme(theme)
    return () => {
      if (prev.current) setTheme(prev.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
