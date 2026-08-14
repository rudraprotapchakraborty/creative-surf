"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Waves } from "lucide-react"

/**
 * The glass card and aurora backdrop shared by the sign-in, registration and
 * verification screens, so all three read as one flow.
 */
export function AuthShell({
  brand,
  title,
  subtitle,
  footer,
  children,
}: {
  brand: string
  title: string
  subtitle?: string
  footer?: ReactNode
  children: ReactNode
}) {
  return (
    // Top padding clears the fixed navbar. Padding rather than a margin so the
    // card still centres in the space that is left, instead of being pushed off
    // centre on tall screens.
    <main className="min-h-screen flex items-center justify-center bg-flow-bg px-4 pt-28 sm:pt-32 pb-16 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="aurora-blob animate-aurora"
          style={{
            width: 600,
            height: 600,
            top: "-15%",
            left: "-10%",
            background: "radial-gradient(circle, rgb(var(--accent-1) / 0.18), transparent 65%)",
          }}
        />
        <div
          className="aurora-blob animate-aurora-alt"
          style={{
            width: 500,
            height: 500,
            bottom: "-10%",
            right: "-5%",
            background: "radial-gradient(circle, rgb(var(--accent-2) / 0.15), transparent 65%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass rounded-2xl p-8 shadow-xl" style={{ border: "1px solid var(--flow-border-strong)" }}>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
            >
              <Waves size={18} className="text-white" />
            </div>
            <span
              className="font-bold text-flow-text"
              style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem" }}
            >
              {brand}
            </span>
          </div>

          <div className="text-center mb-8">
            <h1
              className="font-bold text-flow-text mb-2"
              style={{ fontSize: "1.6rem", fontFamily: "var(--font-heading)" }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm" style={{ color: "rgb(var(--flow-text-soft))" }}>
                {subtitle}
              </p>
            )}
          </div>

          {children}
        </div>

        {footer && (
          <div className="text-center text-xs mt-6" style={{ color: "rgb(var(--flow-text-soft))" }}>
            {footer}
          </div>
        )}
      </motion.div>
    </main>
  )
}

/** Inline validation / server error banner. */
export function AuthError({ message }: { message: string }) {
  if (!message) return null
  return (
    <motion.p
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-sm text-center py-2 px-4 rounded-lg"
      style={{
        background: "rgb(239 68 68 / 0.1)",
        color: "rgb(239 68 68)",
        border: "1px solid rgb(239 68 68 / 0.2)",
      }}
    >
      {message}
    </motion.p>
  )
}

/** Success / informational banner, same shape as {@link AuthError}. */
export function AuthNotice({ message }: { message: string }) {
  if (!message) return null
  return (
    <motion.p
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-sm text-center py-2 px-4 rounded-lg"
      style={{
        background: "rgb(var(--accent-1) / 0.1)",
        color: "rgb(var(--accent-1))",
        border: "1px solid rgb(var(--accent-1) / 0.25)",
      }}
    >
      {message}
    </motion.p>
  )
}

/** Primary gradient submit button with a busy state. */
export function AuthSubmit({
  loading,
  label,
  loadingLabel,
}: {
  loading: boolean
  label: string
  loadingLabel: string
}) {
  return (
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
          {loadingLabel}
        </span>
      ) : (
        label
      )}
    </button>
  )
}
