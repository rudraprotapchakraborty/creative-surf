"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { m as motion } from "framer-motion"
import { useTheme } from "next-themes"

const pillSpring = { type: "spring", stiffness: 400, damping: 34 } as const

/**
 * `variant="inline"` renders a segmented Light/Dark pill with a sliding
 * indicator — same shape as the navbar's Marketing/Real Estate toggle — which
 * reads better inside the mobile hamburger sheet than a bare icon button.
 */
export function ThemeToggle({
  variant = "icon",
  labels,
}: {
  variant?: "icon" | "inline"
  labels?: { light: string; dark: string }
}) {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (variant === "inline") {
    if (!mounted) return <div className="h-11" />

    const isDark = theme === "dark"
    return (
      <div className="relative flex p-1 rounded-full bg-cs-ink/[0.05]">
        <motion.span
          aria-hidden
          className="absolute top-1 bottom-1 left-1 rounded-full bg-cs-ink"
          style={{ width: "calc(50% - 0.25rem)" }}
          initial={false}
          animate={{ x: isDark ? "100%" : "0%" }}
          transition={pillSpring}
        />
        <button
          type="button"
          onClick={() => setTheme("light")}
          aria-current={!isDark ? "true" : undefined}
          className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            !isDark ? "text-cs-bg" : "text-cs-ink2"
          }`}
        >
          <Sun className="w-4 h-4" />
          {labels?.light ?? "Light"}
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          aria-current={isDark ? "true" : undefined}
          className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            isDark ? "text-cs-bg" : "text-cs-ink2"
          }`}
        >
          <Moon className="w-4 h-4" />
          {labels?.dark ?? "Dark"}
        </button>
      </div>
    )
  }

  if (!mounted) {
    return (
      <button className="p-2 rounded-full text-flow-textSoft transition-colors">
        <div className="w-5 h-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full text-flow-textSoft hover:text-aurora-1 hover:bg-flow-card transition-colors"
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
