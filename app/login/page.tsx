"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, User, Waves } from "lucide-react"
import { useT } from "@/lib/i18n"
import { loginMessages } from "@/lib/i18n/messages/login"

function LoginForm() {
  const t = useT(loginMessages)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("from") || "/blogs"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        router.push(redirect)
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || t("invalidCredentials"))
      }
    } catch {
      setError(t("genericError"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-flow-bg px-4 relative overflow-hidden"
    >
      {/* Aurora background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="aurora-blob animate-aurora"
          style={{ width: 600, height: 600, top: "-15%", left: "-10%", background: "radial-gradient(circle, rgb(var(--accent-1) / 0.18), transparent 65%)" }}
        />
        <div
          className="aurora-blob animate-aurora-alt"
          style={{ width: 500, height: 500, bottom: "-10%", right: "-5%", background: "radial-gradient(circle, rgb(var(--accent-2) / 0.15), transparent 65%)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="glass rounded-2xl p-8 shadow-xl" style={{ border: "1px solid var(--flow-border-strong)" }}>
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
            >
              <Waves size={18} className="text-white" />
            </div>
            <span className="font-bold text-flow-text" style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem" }}>
              {t("brand")}
            </span>
          </div>

          <div className="text-center mb-8">
            <h1
              className="font-bold text-flow-text mb-2"
              style={{ fontSize: "1.6rem", fontFamily: "var(--font-heading)" }}
            >
              {t("title")}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgb(var(--flow-text-soft))" }}>
                {t("username")}
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" style={{ color: "rgb(var(--flow-text))" }} />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgb(var(--flow-surface) / 0.8)",
                    border: "1px solid var(--flow-border-strong)",
                    color: "rgb(var(--flow-text))",
                  }}
                  placeholder={t("usernamePlaceholder")}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgb(var(--flow-text-soft))" }}>
                {t("password")}
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" style={{ color: "rgb(var(--flow-text))" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgb(var(--flow-surface) / 0.8)",
                    border: "1px solid var(--flow-border-strong)",
                    color: "rgb(var(--flow-text))",
                  }}
                  placeholder={t("passwordPlaceholder")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70 transition-opacity"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-center py-2 px-4 rounded-lg"
                style={{ background: "rgb(239 68 68 / 0.1)", color: "rgb(239 68 68)", border: "1px solid rgb(239 68 68 / 0.2)" }}
              >
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3 rounded-xl font-semibold text-sm text-white overflow-hidden shine transition-all duration-200 mt-2"
              style={{
                background: loading
                  ? "rgb(var(--accent-1) / 0.5)"
                  : "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))",
                boxShadow: loading ? "none" : "0 4px 20px rgb(var(--accent-1) / 0.35)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  {t("signingIn")}
                </span>
              ) : (
                t("submit")
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "rgb(var(--flow-text-soft))" }}>
          {t("footer")}
        </p>
      </motion.div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
