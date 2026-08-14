"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Download, ExternalLink, FileText, Loader2, Pencil, Plus, Trash2, Users, X } from "lucide-react"
import { formatDateForLocale, useLocale, useT } from "@/lib/i18n"
import { authMessages } from "@/lib/i18n/messages/auth"
import type { AuthPayload } from "@/lib/auth"
import type { DirectoryEntry } from "@/lib/users"
import type { SavedCvDoc } from "@/lib/cv-types"
import { buildCvHtml } from "@/lib/cv-document"
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
      <div className="max-w-5xl mx-auto space-y-6">
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
        </motion.header>

        <Card title={t("profileDetails")}>
          <NameRow user={user} onSaved={setUser} />
          <Row label={t("accountEmail")} value={user.email || user.username || "—"} />
          {isAdmin && <Row label={t("accountRole")} value={t("roleAdmin")} />}
        </Card>

        {!isAdmin && <SavedCvsSection formatDate={formatDate} isAdmin={false} />}

        {isAdmin && (
          <div className="space-y-6">
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

            <SavedCvsSection formatDate={formatDate} isAdmin={true} />
          </div>
        )}
      </div>
    </main>
  )
}

function SavedCvsSection({ formatDate, isAdmin = false }: { formatDate: (iso?: string) => string; isAdmin?: boolean }) {
  const [cvs, setCvs] = useState<SavedCvDoc[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCvs = useCallback(() => {
    fetch("/api/cv/saved")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.cvs) setCvs(d.cvs);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchCvs();
  }, [fetchCvs]);

  const handleDownload = (cv: SavedCvDoc) => {
    const html = buildCvHtml(cv.cvData, {
      summary: "Profile",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      projects: "Projects",
      certifications: "Certifications",
      languages: "Languages",
    });

    const frame = document.createElement("iframe");
    frame.setAttribute("aria-hidden", "true");
    frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
    frame.srcdoc = html;

    frame.onload = () => {
      const win = frame.contentWindow;
      if (!win) return;
      win.focus();
      win.print();
      setTimeout(() => frame.remove(), 1000);
    };

    document.body.appendChild(frame);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this saved CV?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/cv/saved/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCvs((prev) => (prev ? prev.filter((c) => c._id !== id) : []));
      }
    } catch {
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Card title={isAdmin ? "All User CVs" : "My Saved CVs"} icon={<FileText size={15} />}>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-aurora" />
        </div>
      ) : !cvs || cvs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-aurora-grad/10 border border-aurora/20">
            <FileText className="h-6 w-6 text-aurora" />
          </div>
          <p className="text-sm" style={{ color: "rgb(var(--flow-text-soft))" }}>
            {isAdmin ? "No CVs have been generated by users yet." : "You haven't saved any CVs yet."}
          </p>
          {!isAdmin && (
            <Link href="/cv-builder">
              <button className="shine bg-aurora-grad shadow-aurora text-white text-xs font-semibold rounded-full px-5 py-2.5 flex items-center gap-1.5 cursor-pointer mt-1">
                <Plus size={14} /> Create your first CV
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {cvs.map((cv) => (
            <CvThumbnailCard
              key={cv._id}
              cv={cv}
              showUserEmail={isAdmin}
              formatDate={formatDate}
              onDownload={handleDownload}
              onDelete={handleDelete}
              deleting={deletingId === cv._id}
            />
          ))}
        </div>
      )}
    </Card>
  );
}

function CvThumbnailCard({
  cv,
  showUserEmail,
  formatDate,
  onDownload,
  onDelete,
  deleting,
}: {
  cv: SavedCvDoc;
  showUserEmail?: boolean;
  formatDate: (iso?: string) => string;
  onDownload: (cv: SavedCvDoc) => void;
  onDelete: (id: string) => void;
  deleting: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.32);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateScale = () => {
      if (el.clientWidth > 0) {
        setScale(el.clientWidth / 794);
      }
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const html = useMemo(() => {
    return buildCvHtml(cv.cvData, {
      summary: "Profile",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      projects: "Projects",
      certifications: "Certifications",
      languages: "Languages",
    });
  }, [cv.cvData]);

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-aurora hover:-translate-y-1"
      style={{
        background: "rgb(var(--flow-surface) / 0.8)",
        border: "1px solid var(--flow-border-strong)",
      }}
    >
      {/* Thumbnail Document Box */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[1/1.3] overflow-hidden bg-white/95 border-b border-flow-border select-none"
      >
        <div style={{ width: 794, height: 1123, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <iframe
            title={cv.title}
            srcDoc={html}
            sandbox=""
            tabIndex={-1}
            className="w-[794px] h-[1123px] border-0 pointer-events-none bg-white"
          />
        </div>

        {/* Action Overlay on Hover */}
        <div className="absolute inset-0 bg-flow-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2.5 p-4 backdrop-blur-[2px]">
          <button
            onClick={() => onDownload(cv)}
            className="shine bg-aurora-grad shadow-aurora text-white text-xs font-semibold rounded-full px-4 py-2 flex items-center justify-center gap-2 cursor-pointer w-36"
          >
            <Download size={13} /> Download PDF
          </button>
          <Link href={`/cv-builder?id=${cv._id}`} className="w-36">
            <button className="w-full bg-flow-surface hover:bg-flow-card border border-flow-border text-flow-text text-xs font-semibold rounded-full px-4 py-2 flex items-center justify-center gap-2 cursor-pointer transition-colors">
              <ExternalLink size={13} /> Edit CV
            </button>
          </Link>
          <button
            onClick={() => cv._id && onDelete(cv._id)}
            disabled={deleting}
            className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5 pt-1 cursor-pointer"
          >
            {deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />} Delete
          </button>
        </div>
      </div>

      {/* Thumbnail Card Footer */}
      <div className="p-3.5 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-flow-text truncate" title={cv.title}>
            {cv.title}
          </h4>
          <p className="text-[11px] text-flow-textSoft mt-0.5 truncate">
            {showUserEmail && cv.userEmail ? `${cv.userEmail} • ` : ""}
            {formatDate(cv.createdAt as string)}
          </p>
        </div>
        <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-aurora/10 text-aurora border border-aurora/20">
          {cv.inputData?.language || "English"}
        </span>
      </div>
    </div>
  );
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

