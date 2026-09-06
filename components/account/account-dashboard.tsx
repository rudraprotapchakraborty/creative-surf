"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Check,
  Download,
  Eye,
  FileText,
  Loader2,
  Mail,
  MessageSquare,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  ShieldOff,
  Trash2,
  Users,
  X,
} from "lucide-react"
import { formatDateForLocale, useLocale, useT } from "@/lib/i18n"
import { authMessages } from "@/lib/i18n/messages/auth"
import type { AuthPayload } from "@/lib/auth"
import type { DirectoryEntry } from "@/lib/users"
import type { SavedCvDoc } from "@/lib/cv-types"
import { buildCvHtml, printCvDocument } from "@/lib/cv-document"
import { Avatar } from "@/components/auth/user-menu"
import { Panel } from "@/components/account/panel"
import { ChatTranscriptsSection, useChatTranscripts } from "@/components/account/chat-transcripts"
import { CvPreviewModal } from "@/components/account/cv-preview-modal"

interface Directory {
  admins: DirectoryEntry[]
  members: DirectoryEntry[]
  total: number
}

/** The account record behind the session token — joining date and providers. */
interface Profile {
  createdAt: string | null
  lastLoginAt: string | null
  providers: string[]
  emailVerified: boolean
}

/** Section headings the PDF renderer needs; the saved CV keeps its own language. */
const CV_LABELS = {
  summary: "Profile",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  languages: "Languages",
}

export function AccountDashboard({ initialUser }: { initialUser: AuthPayload }) {
  const t = useT(authMessages)
  const locale = useLocale()
  const [user, setUser] = useState(initialUser)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [directory, setDirectory] = useState<Directory | null>(null)
  const [cvs, setCvs] = useState<SavedCvDoc[] | null>(null)

  const isAdmin = user.role === "admin"
  const { chats, total: chatTotal, failed: chatsFailed, remove: removeChat } = useChatTranscripts(isAdmin)
  const [tab, setTab] = useState<AdminTab>("people")

  useEffect(() => {
    let active = true
    fetch("/api/account")
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (active && d?.profile) setProfile(d.profile) })
      .catch(() => {})
    return () => { active = false }
  }, [])

  const loadCvs = useCallback(() => {
    fetch("/api/cv/saved")
      .then(r => (r.ok ? r.json() : null))
      .then(d => setCvs(d?.cvs ?? []))
      .catch(() => setCvs([]))
  }, [])

  useEffect(() => { loadCvs() }, [loadCvs])

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
    (iso?: string | null) =>
      iso ? formatDateForLocale(iso, locale, { month: "short", day: "numeric", year: "numeric" }) : t("never"),
    [locale, t],
  )

  const monthYear = useCallback(
    (iso?: string | null) =>
      iso ? formatDateForLocale(iso, locale, { month: "long", year: "numeric" }) : null,
    [locale],
  )

  const [busyUserId, setBusyUserId] = useState<string | null>(null)
  const [directoryError, setDirectoryError] = useState("")
  const [userQuery, setUserQuery] = useState("")

  /** Filters both groups by name or email, the two things you'd search a person by. */
  const visiblePeople = useMemo(() => {
    if (!directory) return null
    const needle = userQuery.trim().toLowerCase()
    if (!needle) return directory

    const matches = (entry: DirectoryEntry) =>
      `${entry.name} ${entry.email ?? ""}`.toLowerCase().includes(needle)

    return {
      admins: directory.admins.filter(matches),
      members: directory.members.filter(matches),
      total: directory.total,
    }
  }, [directory, userQuery])

  const noPeopleMatch =
    !!visiblePeople && visiblePeople.admins.length === 0 && visiblePeople.members.length === 0

  /** Applies a change to whichever group the account is in, without a refetch. */
  const replaceEntry = useCallback((id: string, next: DirectoryEntry | null) => {
    setDirectory(prev => {
      if (!prev) return prev
      const all = [...prev.admins, ...prev.members]
        .map(e => (e.id === id ? next : e))
        .filter((e): e is DirectoryEntry => e !== null)
      return {
        admins: all.filter(e => e.role === "admin"),
        members: all.filter(e => e.role !== "admin"),
        total: all.length,
      }
    })
  }, [])

  const toggleRole = useCallback(
    async (entry: DirectoryEntry) => {
      const role = entry.role === "admin" ? "user" : "admin"
      const label = role === "admin" ? t("roleAdmin") : t("roleUser")
      if (!window.confirm(t("roleChangeConfirm", { name: entry.name, role: label }))) return

      setBusyUserId(entry.id)
      setDirectoryError("")
      try {
        const res = await fetch(`/api/admin/users/${entry.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role }),
        })
        const data = await res.json().catch(() => null)
        if (!res.ok) {
          setDirectoryError(data?.error || t("genericError"))
          return
        }
        replaceEntry(entry.id, { ...entry, role })
      } catch {
        setDirectoryError(t("genericError"))
      } finally {
        setBusyUserId(null)
      }
    },
    [replaceEntry, t],
  )

  const deleteUser = useCallback(
    async (entry: DirectoryEntry) => {
      if (!window.confirm(t("deleteUserConfirm", { name: entry.name }))) return

      setBusyUserId(entry.id)
      setDirectoryError("")
      try {
        const res = await fetch(`/api/admin/users/${entry.id}`, { method: "DELETE" })
        const data = await res.json().catch(() => null)
        if (!res.ok) {
          setDirectoryError(data?.error || t("genericError"))
          return
        }
        replaceEntry(entry.id, null)
        // Their CVs went with the account, so the list on screen is now stale.
        loadCvs()
      } catch {
        setDirectoryError(t("genericError"))
      } finally {
        setBusyUserId(null)
      }
    },
    [loadCvs, replaceEntry, t],
  )

  const signInMethod =
    !profile ? null
      : profile.providers.length > 1 ? t("methodBoth")
      : profile.providers[0] === "google" ? t("methodGoogle")
      : t("methodPassword")

  return (
    <main className="min-h-screen bg-flow-bg pb-24">
      <ProfileHeader
        user={user}
        isAdmin={isAdmin}
        memberSince={monthYear(profile?.createdAt)}
        cvCount={cvs?.length ?? null}
        peopleCount={isAdmin ? directory?.total ?? null : null}
        chatCount={isAdmin ? chatTotal : null}
        onSaved={setUser}
      />

      <div className="mx-auto w-[95%] max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
          <aside className="lg:col-span-1 lg:sticky lg:top-28">
            <Panel title={t("profileAbout")}>
              <DetailRow icon={<Mail size={14} />} label={t("accountEmail")} value={user.email || "—"} />
              <DetailRow
                icon={<ShieldCheck size={14} />}
                label={t("accountRole")}
                value={isAdmin ? t("roleAdmin") : t("roleUser")}
              />
              {signInMethod && <DetailRow label={t("signInMethod")} value={signInMethod} />}
              <DetailRow label={t("joined")} value={formatDate(profile?.createdAt)} />
              <DetailRow label={t("lastSeen")} value={formatDate(profile?.lastLoginAt)} />
            </Panel>
          </aside>

          <div className="lg:col-span-2 space-y-5">
            {/*
              An admin has three unrelated collections to look through, and
              stacking them made the page a long scroll where the last one was
              never seen. A member has only their own CVs, so tabs would be a
              control with nothing to switch between — they keep the plain panel.
            */}
            {isAdmin ? (
              <>
                <TabBar
                  active={tab}
                  onChange={setTab}
                  tabs={[
                    { id: "people", label: t("tabPeople"), icon: <Users size={14} />, count: directory?.total },
                    { id: "cvs", label: t("tabCvs"), icon: <FileText size={14} />, count: cvs?.length },
                    { id: "chats", label: t("tabChats"), icon: <MessageSquare size={14} />, count: chatTotal ?? undefined },
                  ]}
                />

                {tab === "people" && (
                  <Panel
                    title={t("peopleTitle")}
                    subtitle={t("peopleSubtitle")}
                    icon={<Users size={15} />}
                    action={
                      directory && directory.total > 0 ? (
                        <label className="relative shrink-0">
                          <Search
                            size={13}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                            style={{ color: "rgb(var(--flow-text-soft))" }}
                          />
                          <input
                            value={userQuery}
                            onChange={e => setUserQuery(e.target.value)}
                            placeholder={t("userSearch")}
                            aria-label={t("userSearch")}
                            className="w-36 rounded-full py-1.5 pl-8 pr-3 text-xs outline-none transition-all focus:w-48 sm:w-44 sm:focus:w-60"
                            style={{
                              background: "rgb(var(--flow-surface))",
                              border: "1px solid var(--flow-border-strong)",
                              color: "rgb(var(--flow-text))",
                            }}
                          />
                        </label>
                      ) : undefined
                    }
                  >
                    {directoryError && (
                      <p
                        className="mb-3 rounded-xl px-3 py-2 text-xs"
                        style={{ background: "rgb(239 68 68 / 0.1)", color: "rgb(239 68 68)" }}
                      >
                        {directoryError}
                      </p>
                    )}

                    {noPeopleMatch ? (
                      <p className="py-8 text-center text-sm" style={{ color: "rgb(var(--flow-text-soft))" }}>
                        {t("userNoMatches")}
                      </p>
                    ) : (
                      <>
                        <PeopleGroup title={t("administrators")} count={visiblePeople?.admins.length}>
                          {(visiblePeople?.admins ?? []).map(entry => (
                            <PersonRow
                              key={entry.id}
                              entry={entry}
                              t={t}
                              formatDate={formatDate}
                              isSelf={entry.id === user.sub}
                              busy={busyUserId === entry.id}
                              onToggleRole={toggleRole}
                              onDelete={deleteUser}
                            />
                          ))}
                        </PeopleGroup>

                        <PeopleGroup title={t("members")} count={visiblePeople?.members.length}>
                          {visiblePeople && visiblePeople.members.length === 0 ? (
                            <p className="text-sm py-2" style={{ color: "rgb(var(--flow-text-soft))" }}>
                              {t("noMembers")}
                            </p>
                          ) : (
                            (visiblePeople?.members ?? []).map(entry => (
                              <PersonRow
                                key={entry.id}
                                entry={entry}
                                t={t}
                                formatDate={formatDate}
                                isSelf={entry.id === user.sub}
                                busy={busyUserId === entry.id}
                                onToggleRole={toggleRole}
                                onDelete={deleteUser}
                              />
                            ))
                          )}
                        </PeopleGroup>
                      </>
                    )}
                  </Panel>
                )}

                {tab === "cvs" && (
                  <SavedCvsSection
                    cvs={cvs}
                    isAdmin
                    currentUserId={user.sub}
                    formatDate={formatDate}
                    onDeleted={id => setCvs(prev => (prev ?? []).filter(c => c._id !== id))}
                  />
                )}

                {tab === "chats" && (
                  <ChatTranscriptsSection
                    chats={chats}
                    failed={chatsFailed}
                    formatDate={formatDate}
                    onDeleted={removeChat}
                  />
                )}
              </>
            ) : (
              <SavedCvsSection
                cvs={cvs}
                isAdmin={false}
                currentUserId={user.sub}
                formatDate={formatDate}
                onDeleted={id => setCvs(prev => (prev ?? []).filter(c => c._id !== id))}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

/**
 * Cover band, overlapping avatar, name and a short stat line.
 *
 * The name is edited in place here rather than through a "Display name" row
 * further down: on a profile the name is the headline, so that is where you
 * expect to change it.
 */
function ProfileHeader({
  user,
  isAdmin,
  memberSince,
  cvCount,
  peopleCount,
  chatCount,
  onSaved,
}: {
  user: AuthPayload
  isAdmin: boolean
  memberSince: string | null
  cvCount: number | null
  peopleCount: number | null
  chatCount: number | null
  onSaved: (user: AuthPayload) => void
}) {
  const t = useT(authMessages)

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Cover */}
      <div className="relative h-40 sm:h-52 overflow-hidden border-b border-flow-border">
        <div className="absolute inset-0 bg-aurora-mesh opacity-80" aria-hidden />
        <div className="absolute inset-0 bg-grid mask-radial opacity-25" aria-hidden />
        <div className="absolute inset-0 bg-grain opacity-[0.05] mix-blend-overlay" aria-hidden />
      </div>

      <div className="mx-auto w-[95%] max-w-6xl">
        {/* Avatar rides the cover's lower edge, the way a profile page reads. */}
        <div className="-mt-12 sm:-mt-14 flex flex-col gap-5 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4 min-w-0">
            <span
              className="shrink-0 rounded-full p-1"
              style={{ background: "rgb(var(--flow-bg))" }}
            >
              <Avatar user={user} size={96} badgeAdmin />
            </span>
            <div className="min-w-0 pb-1">
              <NameHeading user={user} onSaved={onSaved} />
              <p className="mt-1 text-sm truncate" style={{ color: "rgb(var(--flow-text-soft))" }}>
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
              style={
                isAdmin
                  ? { background: "rgb(var(--accent-1) / 0.12)", color: "rgb(var(--accent-1))", border: "1px solid rgb(var(--accent-1) / 0.25)" }
                  : { background: "rgb(var(--flow-surface))", color: "rgb(var(--flow-text-soft))", border: "1px solid var(--flow-border-strong)" }
              }
            >
              {isAdmin && <ShieldCheck size={13} />}
              {isAdmin ? t("roleAdmin") : t("roleUser")}
            </span>
          </div>
        </div>

        {/* Stat line — figures rather than another label/value table. */}
        <dl className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-flow-border py-5 mb-8">
          <Stat value={cvCount} label={t("statCvs")} />
          {peopleCount !== null && <Stat value={peopleCount} label={t("statPeople")} />}
          {chatCount !== null && <Stat value={chatCount} label={t("statChats")} />}
          {memberSince && (
            <div className="flex flex-col">
              <dd className="text-lg font-bold text-flow-text leading-none">{memberSince}</dd>
              <dt className="mt-1.5 text-xs" style={{ color: "rgb(var(--flow-text-soft))" }}>
                {t("memberSince")}
              </dt>
            </div>
          )}
        </dl>
      </div>
    </motion.header>
  )
}

function Stat({ value, label }: { value: number | null; label: string }) {
  return (
    <div className="flex flex-col">
      {/* A dash until the count lands, so the figure never flashes a wrong zero. */}
      <dd className="text-lg font-bold text-flow-text leading-none tabular-nums">
        {value === null ? "—" : value}
      </dd>
      <dt className="mt-1.5 text-xs" style={{ color: "rgb(var(--flow-text-soft))" }}>
        {label}
      </dt>
    </div>
  )
}

/** The display name as the page's heading, editable in place. */
function NameHeading({ user, onSaved }: { user: AuthPayload; onSaved: (user: AuthPayload) => void }) {
  const t = useT(authMessages)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(user.name || "")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

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
      } else {
        setError(data.error || t("genericError"))
      }
    } catch {
      setError(t("genericError"))
    } finally {
      setSaving(false)
    }
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") save()
              if (e.key === "Escape") { setEditing(false); setError("") }
            }}
            autoFocus
            maxLength={80}
            className="min-w-0 flex-1 rounded-lg px-3 py-1.5 text-xl font-bold outline-none"
            style={{
              background: "rgb(var(--flow-surface))",
              border: "1px solid var(--flow-border-strong)",
              color: "rgb(var(--flow-text))",
            }}
          />
          <button
            type="button"
            onClick={save}
            disabled={saving}
            aria-label={t("save")}
            className="shrink-0 rounded-lg p-2 text-white disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
          </button>
          <button
            type="button"
            onClick={() => { setEditing(false); setDraft(user.name || ""); setError("") }}
            aria-label={t("cancel")}
            className="shrink-0 rounded-lg p-2 hover:bg-flow-card transition-colors"
            style={{ color: "rgb(var(--flow-text-soft))" }}
          >
            <X size={15} />
          </button>
        </div>
        {error && <p className="text-xs" style={{ color: "rgb(239 68 68)" }}>{error}</p>}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 min-w-0">
      <h1
        className="font-bold text-flow-text truncate"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontFamily: "var(--font-heading)" }}
      >
        {user.name || user.email}
      </h1>
      <button
        type="button"
        onClick={() => { setDraft(user.name || ""); setEditing(true) }}
        aria-label={t("edit")}
        title={t("edit")}
        className="shrink-0 rounded-lg p-1.5 transition-colors hover:bg-flow-card hover:text-flow-text"
        style={{ color: "rgb(var(--flow-text-soft))", border: "1px solid var(--flow-border)" }}
      >
        <Pencil size={15} />
      </button>
    </div>
  )
}

type AdminTab = "people" | "cvs" | "chats"

interface TabDef {
  id: AdminTab
  label: string
  icon: React.ReactNode
  /** Undefined until that collection loads, so the badge never flashes a zero. */
  count?: number
}

/**
 * Switches the admin column between its three collections.
 *
 * The moving pill is a shared `layoutId`, so the highlight slides between tabs
 * instead of cutting — the one animation that makes a tab bar read as one
 * control rather than three buttons. It scrolls horizontally on narrow screens
 * rather than wrapping to a second row.
 */
function TabBar({
  active,
  onChange,
  tabs,
}: {
  active: AdminTab
  onChange: (tab: AdminTab) => void
  tabs: TabDef[]
}) {
  return (
    <div
      role="tablist"
      className="flex gap-1 overflow-x-auto rounded-full p-1"
      style={{ background: "var(--flow-card)", border: "1px solid var(--flow-border)" }}
    >
      {tabs.map(tab => {
        const selected = tab.id === active
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            className="relative flex flex-1 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm"
            style={{ color: selected ? "#fff" : "rgb(var(--flow-text-soft))" }}
          >
            {selected && (
              <motion.span
                layoutId="account-tab-pill"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-full shadow-aurora"
                style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-bold"
                  style={
                    selected
                      ? { background: "rgba(255,255,255,0.22)", color: "#fff" }
                      : {
                          background: "rgb(var(--flow-surface))",
                          border: "1px solid var(--flow-border-strong)",
                          color: "rgb(var(--flow-text-soft))",
                        }
                  }
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/** One fact about the account. Left label, right value, no boxed-row chrome. */
function DetailRow({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-flow-border py-2.5 last:border-0 last:pb-0">
      <span className="flex items-center gap-2 text-sm shrink-0" style={{ color: "rgb(var(--flow-text-soft))" }}>
        {icon}
        {label}
      </span>
      <span className="text-sm font-medium truncate text-flow-text">{value}</span>
    </div>
  )
}

function SavedCvsSection({
  cvs,
  isAdmin,
  currentUserId,
  formatDate,
  onDeleted,
}: {
  cvs: SavedCvDoc[] | null
  isAdmin: boolean
  /** Whose CVs may be reopened for editing — an admin's reach stops at delete. */
  currentUserId: string
  formatDate: (iso?: string | null) => string
  onDeleted: (id: string) => void
}) {
  const t = useT(authMessages)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [previewing, setPreviewing] = useState<SavedCvDoc | null>(null)

  const handleDownload = (cv: SavedCvDoc) => {
    printCvDocument(buildCvHtml(cv.cvData, CV_LABELS), cv.cvData.fullName)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm(t("deleteCvConfirm"))) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/cv/saved/${id}`, { method: "DELETE" })
      if (res.ok) onDeleted(id)
    } catch {
      /* Leaving the card in place is the honest outcome of a failed delete. */
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <Panel
      title={isAdmin ? t("allCvsTitle") : t("savedCvsTitle")}
      icon={<FileText size={15} />}
      action={
        cvs && cvs.length > 0 && !isAdmin ? (
          <Link
            href="/cv-builder"
            className="shine inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-aurora"
            style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
          >
            <Plus size={13} />
            {t("createFirstCv")}
          </Link>
        ) : undefined
      }
    >
      {cvs === null ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin" style={{ color: "rgb(var(--accent-1))" }} />
        </div>
      ) : cvs.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 px-4 py-12 text-center">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: "rgb(var(--accent-1) / 0.1)", border: "1px solid rgb(var(--accent-1) / 0.2)" }}
          >
            <FileText className="h-6 w-6" style={{ color: "rgb(var(--accent-1))" }} />
          </div>
          <p className="text-sm" style={{ color: "rgb(var(--flow-text-soft))" }}>
            {isAdmin ? t("cvsEmptyAdmin") : t("cvsEmptyMember")}
          </p>
          {!isAdmin && (
            <Link
              href="/cv-builder"
              className="shine mt-1 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-semibold text-white shadow-aurora"
              style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
            >
              <Plus size={14} />
              {t("createFirstCv")}
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cvs.map(cv => (
            <CvThumbnailCard
              key={cv._id}
              cv={cv}
              showUserEmail={isAdmin}
              canEdit={cv.userId === currentUserId}
              formatDate={formatDate}
              onView={setPreviewing}
              onDownload={handleDownload}
              onDelete={handleDelete}
              deleting={deletingId === cv._id}
            />
          ))}
        </div>
      )}

      <CvPreviewModal
        cv={previewing?.cvData ?? null}
        labels={CV_LABELS}
        title={previewing?.title ?? ""}
        ownerEmail={isAdmin ? previewing?.userEmail : undefined}
        onClose={() => setPreviewing(null)}
        onDownload={() => previewing && handleDownload(previewing)}
      />
    </Panel>
  )
}

function CvThumbnailCard({
  cv,
  showUserEmail,
  canEdit,
  formatDate,
  onView,
  onDownload,
  onDelete,
  deleting,
}: {
  cv: SavedCvDoc
  showUserEmail?: boolean
  /** False on someone else's CV, so an admin gets view and delete but not edit. */
  canEdit: boolean
  formatDate: (iso?: string | null) => string
  onView: (cv: SavedCvDoc) => void
  onDownload: (cv: SavedCvDoc) => void
  onDelete: (id: string) => void
  deleting: boolean
}) {
  const t = useT(authMessages)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.32)

  // The preview is a real A4 render scaled to the card, so it matches the PDF.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const updateScale = () => {
      if (el.clientWidth > 0) setScale(el.clientWidth / 794)
    }
    updateScale()
    const ro = new ResizeObserver(updateScale)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const html = useMemo(() => buildCvHtml(cv.cvData, CV_LABELS), [cv.cvData])

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-aurora"
      style={{ background: "rgb(var(--flow-surface))", border: "1px solid var(--flow-border)" }}
    >
      <div
        ref={containerRef}
        className="relative aspect-[1/1.3] w-full select-none overflow-hidden border-b border-flow-border bg-white"
      >
        <div style={{ width: 794, height: 1123, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <iframe
            title={cv.title}
            srcDoc={html}
            sandbox=""
            tabIndex={-1}
            className="pointer-events-none h-[1123px] w-[794px] border-0 bg-white"
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-4 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          style={{ background: "rgb(var(--flow-bg) / 0.82)" }}
        >
          {/* Reading it is the common case and costs nothing, so it leads. */}
          <button
            onClick={() => onView(cv)}
            className="shine flex w-36 items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-aurora"
            style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
          >
            <Eye size={13} />
            {t("viewCv")}
          </button>
          <button
            onClick={() => onDownload(cv)}
            className="flex w-36 items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-flow-text transition-colors hover:bg-flow-card"
            style={{ background: "rgb(var(--flow-surface))", border: "1px solid var(--flow-border-strong)" }}
          >
            <Download size={13} />
            {t("downloadPdf")}
          </button>
          {canEdit && (
            <Link
              href={`/cv-builder?id=${cv._id}`}
              className="flex w-36 items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-flow-text transition-colors hover:bg-flow-card"
              style={{ background: "rgb(var(--flow-surface))", border: "1px solid var(--flow-border-strong)" }}
            >
              <Pencil size={13} />
              {t("openCv")}
            </Link>
          )}
          <button
            onClick={() => cv._id && onDelete(cv._id)}
            disabled={deleting}
            className="flex items-center gap-1.5 pt-1 text-xs transition-colors disabled:opacity-60"
            style={{ color: "rgb(239 68 68)" }}
          >
            {deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
            {t("deleteCv")}
          </button>
        </div>
      </div>

      <div className="flex items-start justify-between gap-2 p-3.5">
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-xs font-bold text-flow-text" title={cv.title}>
            {cv.title}
          </h4>
          <p className="mt-0.5 truncate text-[11px]" style={{ color: "rgb(var(--flow-text-soft))" }}>
            {showUserEmail && cv.userEmail ? `${cv.userEmail} · ` : ""}
            {formatDate(cv.createdAt as string)}
          </p>
        </div>
        <span
          className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{
            background: "rgb(var(--accent-1) / 0.1)",
            color: "rgb(var(--accent-1))",
            border: "1px solid rgb(var(--accent-1) / 0.2)",
          }}
        >
          {cv.inputData?.language || "English"}
        </span>
      </div>
    </div>
  )
}

function PeopleGroup({
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
    <div className="pt-4 first:pt-0">
      <h3 className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: "rgb(var(--flow-text-soft))" }}>
        {title}
        {count !== undefined && (
          <span
            className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-bold"
            style={{
              background: "rgb(var(--flow-surface))",
              border: "1px solid var(--flow-border-strong)",
              color: "rgb(var(--flow-text-soft))",
            }}
          >
            {count}
          </span>
        )}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

function PersonRow({
  entry,
  t,
  formatDate,
  isSelf,
  busy,
  onToggleRole,
  onDelete,
}: {
  entry: DirectoryEntry
  t: ReturnType<typeof useT<typeof authMessages.en>>
  formatDate: (iso?: string | null) => string
  /** Your own row carries no controls — see the guard in the API for why. */
  isSelf: boolean
  busy: boolean
  onToggleRole: (entry: DirectoryEntry) => void
  onDelete: (entry: DirectoryEntry) => void
}) {
  const method =
    entry.providers.length > 1
      ? t("methodBoth")
      : entry.providers[0] === "google"
        ? t("methodGoogle")
        : t("methodPassword")

  const isEntryAdmin = entry.role === "admin"

  return (
    <div className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-flow-surface">
      <Avatar user={{ ...entry, sub: entry.id } as AuthPayload} size={36} badgeAdmin />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 truncate text-sm font-semibold text-flow-text">
          <span className="truncate">{entry.name}</span>
          {isSelf && (
            <span
              className="shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold"
              style={{
                background: "rgb(var(--accent-1) / 0.12)",
                color: "rgb(var(--accent-1))",
              }}
            >
              {t("youBadge")}
            </span>
          )}
        </p>
        <p className="truncate text-xs" style={{ color: "rgb(var(--flow-text-soft))" }}>
          {entry.email} · {method}
        </p>
      </div>

      <div className="hidden shrink-0 text-right lg:block">
        <p className="text-xs" style={{ color: "rgb(var(--flow-text-soft))" }}>
          {t("joined")} {formatDate(entry.createdAt)}
        </p>
        <p className="text-xs" style={{ color: "rgb(var(--flow-text-soft))" }}>
          {t("lastSeen")} {formatDate(entry.lastLoginAt)}
        </p>
      </div>

      {!isSelf && (
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onToggleRole(entry)}
            disabled={busy}
            aria-label={isEntryAdmin ? t("makeMember") : t("makeAdmin")}
            title={isEntryAdmin ? t("makeMember") : t("makeAdmin")}
            className="rounded-lg p-2 transition-colors hover:bg-flow-card disabled:opacity-50"
            style={{ color: isEntryAdmin ? "rgb(var(--accent-1))" : "rgb(var(--flow-text-soft))" }}
          >
            {busy ? (
              <Loader2 size={14} className="animate-spin" />
            ) : isEntryAdmin ? (
              <ShieldCheck size={14} />
            ) : (
              <ShieldOff size={14} />
            )}
          </button>

          <button
            type="button"
            onClick={() => onDelete(entry)}
            disabled={busy}
            aria-label={t("deleteUser")}
            title={t("deleteUser")}
            className="rounded-lg p-2 transition-colors hover:bg-flow-card disabled:opacity-50"
            style={{ color: "rgb(239 68 68)" }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
