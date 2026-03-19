"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="p-2 rounded-sm text-flow-text/70 transition-colors">
        <div className="w-5 h-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-sm text-flow-text/70 hover:text-flow-green transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
         <Sun className="h-5 w-5" />
      ) : (
         <Moon className="h-5 w-5" />
      )}
    </button>
  )
}
