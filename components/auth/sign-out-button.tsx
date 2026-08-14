"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export function SignOutButton({
  label,
  loadingLabel,
  redirectTo = "/login",
  onDone,
}: {
  label: string
  loadingLabel: string
  /** Where to land after signing out. The account page sends you to /login; the navbar sends you home. */
  redirectTo?: string
  onDone?: () => void
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSignOut() {
    setLoading(true)
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      onDone?.()
      router.push(redirectTo)
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-85 disabled:opacity-60"
      style={{
        background: "rgb(var(--flow-surface) / 0.8)",
        border: "1px solid var(--flow-border-strong)",
        color: "rgb(var(--flow-text))",
      }}
    >
      <LogOut size={15} />
      {loading ? loadingLabel : label}
    </button>
  )
}
