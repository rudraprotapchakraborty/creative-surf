"use client"

import { useCallback, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, Pencil, Users, X } from "lucide-react"
import { formatDateForLocale, useLocale, useT } from "@/lib/i18n"
import { authMessages } from "@/lib/i18n/messages/auth"
import type { AuthPayload } from "@/lib/auth"
import type { DirectoryEntry } from "@/lib/users"
import { Avatar } from "@/components/auth/user-menu"

interface Directory {
  admins: DirectoryEntry[]
  members: DirectoryEntry[]
  total: number
}

export function AccountDashboard({ initialUser }: { initialUser: AuthPayload }) {
  const t = useT(authMessages)
  const locale = useLocale()
  const [user, setUser] = useState(initialUser)
  const [directory, setDirectory] = useState<Directory | null>(null)

  const isAdmin = user.role === "admin"

  // The account directory is admin-only, so members never issue the request.
  useEffect(() => {
    if (!isAdmin) return
    let active = true
    fetch("/api/admin/users")
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (active && d) setDirectory(d) })
      .catch(() => {})
    return () => { active = false }
  }, [isAdmin])

  const formatDate = useCallback(
    (iso?: string) => (iso ? formatDateForLocale(iso, locale, { month: "short", day: "numeric", year: "numeric" }) : t("never")),
    [locale, t],
  )

  return (
    <main className="min-h-screen bg-flow-bg px-4 pt-28 sm:pt-32 pb-20">
      <div className="max-w-5xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 mb-8"
        >
          <Avatar user={user} size={64} />
          <div className="min-w-0 flex-1">
            <h1
              className="font-bold text-flow-text truncate"
              style={{ fontSize: "1.6rem", fontFamily: "var(--font-heading)" }}
            >
              {user.name || user.username || user.email}
            </h1>
            <p className="text-sm truncate" style={{ color: "rgb(var(--flow-text-soft))" }}>
              {user.email || user.username}
            </p>
          </div>
          {/* Signing out and the admin badge both live on the navbar avatar,
              so neither is repeated here. */}
        </motion.header>

        <Card title={t("profileDetails")}>
          <NameRow user={user} onSaved={setUser} />
          <Row label={t("accountEmail")} value={user.email || user.username || "—"} />
          {isAdmin && <Row label={t("accountRole")} value={t("roleAdmin")} />}
        </Card>

        {isAdmin && (
          <div className="mt-6">
            <Card title={t("usersTitle")} icon={<Users size={15} />}>
              <Section title={t("administrators")} count={directory?.admins.length}>
                {(directory?.admins ?? []).map(entry => (
                  <PersonRow key={entry.id} entry={entry} t={t} formatDate={formatDate} />
                ))}
              </Section>

              <Section title={t("members")} count={directory?.members.length}>
                {directory && directory.members.length === 0 ? (
                  <p className="text-sm py-3" style={{ color: "rgb(var(--flow-text-soft))" }}>
                    {t("noMembers")}
                  </p>
                ) : (
                  (directory?.members ?? []).map(entry => (
                    <PersonRow key={entry.id} entry={entry} t={t} formatDate={formatDate} />
                  ))
                )}
              </Section>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}

/** Inline display-name editor. Saving re-issues the session cookie server-side. */
function NameRow({ user, onSaved }: { user: AuthPayload; onSaved: (user: AuthPayload) => void }) {
  const t = useT(authMessages)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(user.name || "")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)

  async function save() {
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: draft }),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        onSaved(data.user)
        setEditing(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
      } else {
        setError(data.error || t("genericError"))
      }
    } catch {
      setError(t("genericError"))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="py-3 px-4 rounded-xl"
      style={{ background: "rgb(var(--flow-surface) / 0.8)", border: "1px solid var(--flow-border-strong)" }}
    >
      <div className="flex items-center justify-between gap-4">
        <span
          className="text-xs font-semibold uppercase tracking-widest shrink-0"
          style={{ color: "rgb(var(--flow-text-soft))" }}
        >
          {t("displayName")}
        </span>

        {editing ? (
          <div className="flex items-center gap-2 flex-1 justify-end">
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") save()
                if (e.key === "Escape") setEditing(false)
              }}
              autoFocus
              maxLength={80}
              className="min-w-0 flex-1 max-w-xs px-3 py-1.5 rounded-lg text-sm outline-none"
              style={{
                background: "rgb(var(--flow-bg))",
                border: "1px solid var(--flow-border-strong)",
                color: "rgb(var(--flow-text))",
              }}
            />
            <button
              type="button"
              onClick={save}
              disabled={saving}
              aria-label={t("save")}
              className="p-1.5 rounded-lg text-white disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
            >
              <Check size={15} />
            </button>
            <button
              type="button"
              onClick={() => { setEditing(false); setDraft(user.name || ""); setError("") }}
              aria-label={t("cancel")}
              className="p-1.5 rounded-lg hover:bg-flow-card transition-colors"
              style={{ color: "rgb(var(--flow-text-soft))" }}
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-medium truncate" style={{ color: "rgb(var(--flow-text))" }}>
              {user.name || "—"}
            </span>
            <button
              type="button"
              onClick={() => { setDraft(user.name || ""); setEditing(true) }}
              aria-label={t("edit")}
              className="p-1.5 rounded-lg hover:bg-flow-card transition-colors shrink-0"
              style={{ color: "rgb(var(--flow-text-soft))" }}
            >
              <Pencil size={14} />
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-xs mt-2 text-right" style={{ color: "rgb(239 68 68)" }}>{error}</p>}
      {saved && (
        <p className="text-xs mt-2 text-right" style={{ color: "rgb(var(--accent-1))" }}>{t("nameUpdated")}</p>
      )}
    </div>
  )
}

function PersonRow({
  entry,
  t,
  formatDate,
}: {
  entry: DirectoryEntry
  t: ReturnType<typeof useT<typeof authMessages.en>>
  formatDate: (iso?: string) => string
}) {
  const method =
    entry.providers.length > 1
      ? t("methodBoth")
      : entry.providers[0] === "google"
        ? t("methodGoogle")
        : t("methodPassword")

  return (
    <div
      className="flex items-center gap-3 py-2.5 px-3 rounded-xl"
      style={{ background: "rgb(var(--flow-surface) / 0.8)", border: "1px solid var(--flow-border-strong)" }}
    >
      <Avatar user={{ ...entry, sub: entry.id } as AuthPayload} size={32} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate" style={{ color: "rgb(var(--flow-text))" }}>
          {entry.name}
        </p>
        <p className="text-xs truncate" style={{ color: "rgb(var(--flow-text-soft))" }}>
          {entry.email || entry.username} · {method}
        </p>
      </div>
      <div className="text-right shrink-0 hidden sm:block">
        <p className="text-xs" style={{ color: "rgb(var(--flow-text-soft))" }}>
          {t("joined")} {formatDate(entry.createdAt)}
        </p>
        <p className="text-xs" style={{ color: "rgb(var(--flow-text-soft))" }}>
          {t("lastSeen")} {formatDate(entry.lastLoginAt)}
        </p>
      </div>
    </div>
  )
}

function Card({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-2xl p-6"
      style={{ border: "1px solid var(--flow-border-strong)" }}
    >
      <h2
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4"
        style={{ color: "rgb(var(--flow-text-soft))" }}
      >
        {icon}
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </motion.section>
  )
}

function Section({
  title,
  count,
  children,
}: {
  title: string
  /** Undefined until the directory loads, so the pill does not flash a zero. */
  count?: number
  children: React.ReactNode
}) {
  return (
    <div className="pt-2 first:pt-0">
      <h3
        className="flex items-center gap-2 text-xs font-bold mb-2"
        style={{ color: "rgb(var(--flow-text))" }}
      >
        {title}
        {count !== undefined && (
          <span
            className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-[10px] font-bold"
            style={{
              background: "rgb(var(--flow-surface) / 0.9)",
              border: "1px solid var(--flow-border-strong)",
              color: "rgb(var(--flow-text-soft))",
            }}
          >
            {count}
          </span>
        )}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between gap-4 py-3 px-4 rounded-xl"
      style={{ background: "rgb(var(--flow-surface) / 0.8)", border: "1px solid var(--flow-border-strong)" }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "rgb(var(--flow-text-soft))" }}
      >
        {label}
      </span>
      <span className="text-sm font-medium truncate" style={{ color: "rgb(var(--flow-text))" }}>
        {value}
      </span>
    </div>
  )
}

