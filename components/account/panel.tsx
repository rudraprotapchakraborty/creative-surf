"use client"

import { motion } from "framer-motion"

/** A titled block of profile content. Sentence-case heading, not a micro-label. */
export function Panel({
  title,
  subtitle,
  icon,
  action,
  children,
}: {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-5 sm:p-6"
      style={{ background: "var(--flow-card)", border: "1px solid var(--flow-border)" }}
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-base font-bold text-flow-text">
            {icon}
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-xs" style={{ color: "rgb(var(--flow-text-soft))" }}>
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </header>
      {children}
    </motion.section>
  )
}
