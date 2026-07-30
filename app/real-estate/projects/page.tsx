"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2, MapPin, Building2, LogOut } from "lucide-react"
import { useT } from "@/lib/i18n"
import { realEstateProjectsMessages } from "@/lib/i18n/messages/realEstateProjects"

interface Project {
  _id: string
  name: string
  slug: string
  subtitle: string
  status: string
  plotNo: string
  roadNo: string
  sector: string
  plotSize: string
  numberOfUnits: string
  buildingDetails: string
  flatSize: string
  description: string
  coverImage: string
  googleMapUrl: string
  createdAt: string
}

const STATUS_COLOR: Record<string, string> = {
  Ongoing:   "#0066A2",
  Completed: "#16a34a",
  Upcoming:  "#B8892A",
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function ProjectsPage() {
  const t = useT(realEstateProjectsMessages)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminUsername, setAdminUsername] = useState("")
  const [activeStatus, setActiveStatus] = useState("All")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/real-estate-projects")
      if (res.ok) setProjects(await res.json())
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProjects()
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      if (d.authenticated) { setIsAdmin(true); setAdminUsername(d.username) }
    }).catch(() => {})
  }, [fetchProjects])

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    setIsAdmin(false)
    setAdminUsername("")
    router.refresh()
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(t("list.confirmDelete", { name }))) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/real-estate-projects/${id}`, { method: "DELETE" })
      if (res.ok) setProjects(prev => prev.filter(p => p._id !== id))
    } catch {}
    setDeletingId(null)
  }

  const statuses = ["All", ...Array.from(new Set(projects.map(p => p.status)))]
  const filtered = (activeStatus === "All" ? projects : projects.filter(p => p.status === activeStatus))
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }))

  return (
    <main className="min-h-screen bg-flow-bg relative">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="aurora-blob animate-aurora" style={{ width: 700, height: 700, top: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(0,102,162,0.1), transparent 65%)" }} />
        <div className="aurora-blob animate-aurora-alt" style={{ width: 600, height: 600, bottom: "5%", right: "-8%", background: "radial-gradient(circle, rgba(184,137,42,0.08), transparent 65%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-20">

        {/* ─── Header ─── */}
        <div className="flex flex-col gap-4 mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5"
          >
            <div>
              <span className="inline-flex items-center gap-2 mb-4">
                <span className="w-5 h-[2px]" style={{ background: "#B8892A" }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#B8892A" }}>
                  {t("list.eyebrow")}
                </span>
              </span>
              <h1 className="font-bold text-flow-text leading-tight mb-3" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                {t("list.title")}
              </h1>
              <p className="max-w-lg text-sm sm:text-base leading-relaxed" style={{ color: "rgb(var(--flow-text-soft))" }}>
                {t("list.subtitle")}
              </p>
            </div>

            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap"
              >
                <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: "rgba(184,137,42,0.1)", color: "#B8892A" }}>
                  @{adminUsername}
                </span>
                <Link
                  href="/real-estate/projects/new"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shine relative overflow-hidden transition-all"
                  style={{ background: "#B8892A", boxShadow: "0 4px 18px rgba(184,137,42,0.35)" }}
                >
                  <Plus size={15} />
                  {t("list.newProject")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl transition-colors hover:opacity-70"
                  style={{ background: "rgb(var(--flow-border))", color: "rgb(var(--flow-text))" }}
                  title={t("list.logout")}
                >
                  <LogOut size={15} />
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* ─── Status filter ─── */}
        {statuses.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2 mb-8 sm:mb-12"
          >
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={
                  activeStatus === s
                    ? { background: "#0066A2", color: "#fff", boxShadow: "0 2px 12px rgba(0,102,162,0.3)" }
                    : { background: "var(--flow-card)", color: "rgb(var(--flow-text))", border: "1px solid var(--flow-border-strong)" }
                }
              >
                {s === "All" ? t("list.statusAll") : s}
              </button>
            ))}
          </motion.div>
        )}

        {/* ─── Loading ─── */}
        {loading && (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "rgba(0,102,162,0.2)", borderTopColor: "#0066A2" }} />
          </div>
        )}

        {/* ─── Empty ─── */}
        {!loading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center" style={{ background: "rgba(184,137,42,0.1)" }}>
              <Building2 size={28} style={{ color: "#B8892A" }} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-flow-text">{t("list.emptyTitle")}</h3>
            <p className="text-sm mb-6" style={{ color: "rgb(var(--flow-text-soft))" }}>
              {isAdmin ? t("list.emptyAdmin") : t("list.emptyPublic")}
            </p>
            {isAdmin && (
              <Link href="/real-estate/projects/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#B8892A", boxShadow: "0 4px 18px rgba(184,137,42,0.35)" }}>
                <Plus size={15} /> {t("list.addFirst")}
              </Link>
            )}
          </motion.div>
        )}

        {/* ─── Projects grid ─── */}
        {!loading && filtered.length > 0 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
          >
            <AnimatePresence>
              {filtered.map(project => (
                <motion.article
                  key={project._id}
                  variants={fadeUp}
                  layout
                  className="glass rounded-2xl overflow-hidden flex flex-col"
                  style={{ border: "1px solid var(--flow-border-strong)" }}
                >
                  {/* Cover image */}
                  {project.coverImage && (
                    <Link
                      href={`/real-estate/projects/${project.slug}`}
                      className="relative block w-full overflow-hidden group"
                      style={{ height: 200 }}
                    >
                      <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
                    </Link>
                  )}

                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    {/* Status + admin controls */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                        style={{ background: STATUS_COLOR[project.status] ?? "#0066A2" }}
                      >
                        {project.status}
                      </span>
                      {isAdmin && (
                        <div className="flex gap-1.5">
                          <Link
                            href={`/real-estate/projects/edit/${project._id}`}
                            className="p-1.5 rounded-lg transition-all"
                            style={{ background: "rgba(184,137,42,0.1)", color: "#B8892A" }}
                            title={t("list.edit")}
                          >
                            <Pencil size={12} />
                          </Link>
                          <button
                            onClick={() => handleDelete(project._id, project.name)}
                            disabled={deletingId === project._id}
                            className="p-1.5 rounded-lg transition-all"
                            style={{ background: "rgb(239 68 68 / 0.1)", color: "rgb(239 68 68)" }}
                            title={t("list.delete")}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      )}
                    </div>

                    <Link href={`/real-estate/projects/${project.slug}`} className="group">
                      <h3 className="font-bold text-flow-text mb-1 leading-snug text-base sm:text-[1.05rem] transition-colors group-hover:text-[#0066A2]">
                        {project.name}
                      </h3>
                    </Link>
                    {project.subtitle && (
                      <p className="text-[11px] font-semibold uppercase tracking-wider mb-3 opacity-60">{project.subtitle}</p>
                    )}

                    {/* Address */}
                    {(project.plotNo || project.roadNo || project.sector) && (
                      <div className="mb-4 text-xs" style={{ color: "rgb(var(--flow-text-soft))" }}>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={10} />
                          {[project.plotNo && `Plot-${project.plotNo}`, project.roadNo && `Rd-${project.roadNo}`, project.sector && `Sec-${project.sector}`].filter(Boolean).join(", ")}
                        </span>
                      </div>
                    )}

                    <div className="mt-auto pt-3 flex justify-end" style={{ borderTop: "1px solid var(--flow-border)" }}>
                      <Link
                        href={`/real-estate/projects/${project.slug}`}
                        className="text-[11px] font-semibold"
                        style={{ color: "#0066A2" }}
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </main>
  )
}
