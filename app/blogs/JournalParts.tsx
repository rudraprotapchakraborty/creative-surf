"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

/** Initials for a byline, e.g. "Creative Surf" → "CS". */
export function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "CS"
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase()
}

/**
 * A byline's mark: the account's profile picture when it has one, otherwise
 * its initials, ink on paper — the same mark the testimonials use. A picture
 * that fails to load falls back to the initials rather than a broken image.
 */
export function Monogram({ name, src, size = 32 }: { name: string; src?: string; size?: number }) {
  const [failed, setFailed] = useState(false)
  if (src && !failed) {
    return (
      // Plain img: Google's avatar host isn't whitelisted for next/image.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="shrink-0 rounded-full object-cover ring-1 ring-cs-ink/10"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <span
      aria-hidden
      className="grid shrink-0 place-items-center rounded-full bg-cs-ink font-semibold tracking-wide text-cs-bg"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {initialsOf(name)}
    </span>
  )
}

/** A seamless thin swell for the typographic covers. */
const SWELL = (() => {
  let d = "M0,30"
  for (let x = 10; x <= 800; x += 10) d += ` L${x},${(30 + Math.sin((x / 800) * Math.PI * 6) * 8).toFixed(1)}`
  return d
})()

/**
 * The cover for a post that has no image: its topic, set large in the serif
 * on the deep-water surface, instead of a stock gradient. It names the topic
 * rather than repeating the title, which already sits beside it.
 */
export function JournalCover({ category, brand }: { category: string; brand: string }) {
  return (
    <span className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-cs-deep p-5 text-cs-deepInk sm:p-6">
      <span className="cs-meta text-cs-deepInk/55">{brand}</span>
      <span
        className="cs-accent line-clamp-2 max-w-[90%] text-cs-deepInk"
        style={{ fontSize: "clamp(2rem, 4.4vw, 3.75rem)", lineHeight: 0.95 }}
      >
        {category}
      </span>
      <svg
        aria-hidden
        viewBox="0 0 800 60"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-1/3 h-10 w-full"
      >
        <path d={SWELL} fill="none" stroke="rgb(var(--cs-cyan) / 0.35)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  )
}

/** Placeholder entries shaped like the real ones, so the page doesn't jump when posts land. */
export function FeedSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      {[0, 1, 2].map(i => (
        <div key={i} className="grid gap-6 border-t border-cs-ink/10 py-10 md:grid-cols-[1fr_0.85fr] md:gap-8">
          <div>
            <div className="h-2.5 w-40 rounded-full bg-cs-ink/[0.07]" />
            <div className="mt-6 h-7 w-11/12 rounded-md bg-cs-ink/[0.08]" />
            <div className="mt-3 h-7 w-2/3 rounded-md bg-cs-ink/[0.08]" />
            <div className="mt-6 h-3 w-full rounded-full bg-cs-ink/[0.06]" />
            <div className="mt-2.5 h-3 w-4/5 rounded-full bg-cs-ink/[0.06]" />
          </div>
          <div className="aspect-[16/10] rounded-lg bg-cs-ink/[0.06]" />
        </div>
      ))}
    </div>
  )
}

/** The owner's Edit / Delete menu on a post. */
export function PostMenu({
  open,
  onToggle,
  editHref,
  onDelete,
  deleting,
  labels,
}: {
  open: boolean
  onToggle: () => void
  editHref: string
  onDelete: () => void
  deleting: boolean
  labels: { edit: string; delete: string }
}) {
  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={e => {
          e.stopPropagation()
          onToggle()
        }}
        className="cs-focus -my-2 grid h-9 w-9 place-items-center rounded-full text-cs-ink3 transition-colors hover:bg-cs-ink/[0.05] hover:text-cs-ink"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={labels.edit}
      >
        <MoreHorizontal size={18} />
      </button>
      {open && (
        <div
          onClick={e => e.stopPropagation()}
          role="menu"
          className="absolute right-0 top-9 z-20 w-40 overflow-hidden rounded-lg bg-cs-surface py-1 shadow-[0_18px_40px_-16px_rgb(var(--cs-ink)/0.35)] ring-1 ring-cs-ink/10"
        >
          <Link
            href={editHref}
            role="menuitem"
            className="cs-focus flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-cs-ink transition-colors hover:bg-cs-ink/[0.04]"
          >
            <Pencil size={14} /> {labels.edit}
          </Link>
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            role="menuitem"
            className="cs-focus flex w-full items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-red-600 transition-colors hover:bg-cs-ink/[0.04] disabled:opacity-50 dark:text-red-400"
          >
            <Trash2 size={14} /> {labels.delete}
          </button>
        </div>
      )}
    </div>
  )
}
