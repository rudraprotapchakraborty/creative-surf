"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, LogIn, LogOut, ShieldCheck, UserRound } from "lucide-react"
import type { AuthPayload } from "@/lib/auth"
import { NAVBAR_PANEL_TOP, NAVBAR_RIGHT_OFFSET } from "@/lib/navbar-offset"

/**
 * Shared open/close + outside-click/Escape wiring for the navbar's dropdowns.
 */
function useDropdown() {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      if (triggerRef.current?.contains(target)) return
      if (panelRef.current?.contains(target)) return
      setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("touchstart", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("touchstart", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return { open, setOpen, triggerRef, panelRef }
}

/**
 * Renders the dropdown panel in place by default. When `detached`, it's
 * portaled to `document.body` and pinned to the navbar's right edge instead —
 * needed because these mobile triggers live inside the header's transformed
 * box, which would otherwise hijack `position: fixed` and misalign the panel.
 */
function DropdownPanel({
  detached,
  panelRef,
  className,
  children,
}: {
  detached?: boolean
  panelRef: React.RefObject<HTMLDivElement | null>
  className: string
  children: React.ReactNode
}) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const panel = (
    <motion.div
      ref={panelRef}
      role="menu"
      initial={{ opacity: 0, y: -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className={detached ? `fixed ${className}` : `absolute top-[calc(100%+0.6rem)] right-0 ${className}`}
      style={detached ? { top: NAVBAR_PANEL_TOP, right: NAVBAR_RIGHT_OFFSET } : undefined}
    >
      {children}
    </motion.div>
  )

  if (!detached) return panel
  if (!mounted) return null
  return createPortal(panel, document.body)
}

/**
 * Avatar button in the navbar that opens a Profile / Log out menu.
 *
 * Mirrors LanguageSwitcher: same outside-click and Escape handling, same
 * glass-strong panel, so the two dropdowns in the navbar behave identically.
 */
export function UserMenu({
  user,
  labels,
  detached,
}: {
  user: AuthPayload
  labels: { menu: string; profile: string; logout: string; loggingOut: string }
  /** Mobile usage: portals the panel so it aligns with the navbar's right edge. */
  detached?: boolean
}) {
  const router = useRouter()
  const { open, setOpen, triggerRef, panelRef } = useDropdown()
  const [busy, setBusy] = React.useState(false)

  async function handleLogout() {
    setBusy(true)
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setOpen(false)
      router.push("/")
      router.refresh()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="relative" ref={triggerRef}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={labels.menu}
        className="rounded-full transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora-1"
      >
        <Avatar user={user} size={32} badgeAdmin />
      </button>

      <AnimatePresence>
        {open && (
          <DropdownPanel
            detached={detached}
            panelRef={panelRef}
            className="min-w-[13rem] p-1.5 rounded-2xl glass-strong border border-flow-border shadow-soft z-[6000]"
          >
            {/* Identity header — who you are actually signed in as. */}
            <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-flow-border mb-1.5">
              <Avatar user={user} size={34} />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-flow-text truncate">
                  {user.name || user.email}
                </p>
                {user.email && (
                  <p className="text-xs text-flow-textSoft truncate">{user.email}</p>
                )}
              </div>
            </div>

            <Link
              href="/account"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-flow-textSoft hover:text-flow-text hover:bg-flow-card transition-colors"
            >
              <UserRound className="w-4 h-4" />
              {labels.profile}
            </Link>

            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              disabled={busy}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-flow-textSoft hover:text-flow-text hover:bg-flow-card transition-colors disabled:opacity-60"
            >
              <LogOut className="w-4 h-4" />
              {busy ? labels.loggingOut : labels.logout}
            </button>
          </DropdownPanel>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Signed-out counterpart to UserMenu — same avatar-button/dropdown shape, but
 * a plain guest icon opening onto Login / Register instead of an avatar
 * opening onto Profile / Log out.
 */
export function GuestMenu({
  labels,
  detached,
}: {
  labels: { menu: string; login: string; register: string }
  /** Mobile usage: portals the panel so it aligns with the navbar's right edge. */
  detached?: boolean
}) {
  const { open, setOpen, triggerRef, panelRef } = useDropdown()

  return (
    <div className="relative" ref={triggerRef}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={labels.menu}
        className="flex items-center justify-center rounded-full bg-flow-card border border-flow-border text-flow-textSoft transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora-1"
        style={{ width: 32, height: 32 }}
      >
        <UserRound size={19} />
      </button>

      <AnimatePresence>
        {open && (
          <DropdownPanel
            detached={detached}
            panelRef={panelRef}
            className="min-w-[11rem] p-1.5 rounded-2xl glass-strong border border-flow-border shadow-soft z-[6000]"
          >
            <Link
              href="/login"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-flow-textSoft hover:text-flow-text hover:bg-flow-card transition-colors mb-1"
            >
              <LogIn className="w-4 h-4" />
              {labels.login}
            </Link>

            <Link
              href="/register"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
            >
              {labels.register}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </DropdownPanel>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Google's profile picture when there is one, otherwise the initial on the
 * brand gradient. Plain `img` rather than `next/image` because the Google CDN
 * host would otherwise need whitelisting in next.config.
 */
export function Avatar({
  user,
  size = 32,
  badgeAdmin = false,
}: {
  user: AuthPayload
  size?: number
  /** Shows the admin shield on the corner of the avatar. */
  badgeAdmin?: boolean
}) {
  const [failed, setFailed] = React.useState(false)
  const label = user.name || user.email || "?"
  const showBadge = badgeAdmin && user.role === "admin"

  const face =
    user.avatar && !failed ? (
      <img
        src={user.avatar}
        alt=""
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="rounded-full object-cover"
        style={{ width: size, height: size, border: "1px solid var(--flow-border-strong)" }}
      />
    ) : (
      <span
        aria-hidden
        className="rounded-full flex items-center justify-center font-bold text-white select-none"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.42,
          background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))",
        }}
      >
        {label.trim().charAt(0).toUpperCase()}
      </span>
    )

  if (!showBadge) return face

  const badgeSize = Math.max(13, Math.round(size * 0.42))

  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      {face}
      <span
        className="absolute flex items-center justify-center rounded-full text-white"
        style={{
          width: badgeSize,
          height: badgeSize,
          right: -1,
          bottom: -1,
          background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))",
          // Cuts the badge out of the avatar rather than sitting flat on it.
          boxShadow: "0 0 0 2px rgb(var(--flow-bg))",
        }}
      >
        <ShieldCheck size={Math.round(badgeSize * 0.62)} strokeWidth={2.6} />
      </span>
    </span>
  )
}
