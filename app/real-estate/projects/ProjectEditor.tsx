"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, X, Plus, Trash2 } from "lucide-react"

interface ProjectForm {
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
  rooftopFeatures: string[]
  groundFloorFeatures: string[]
  coverImage: string
  images: string[]
}

const STATUS_OPTIONS = ["Ongoing", "Completed", "Upcoming"]

const DEFAULT_FORM: ProjectForm = {
  name: "",
  slug: "",
  subtitle: "",
  status: "Ongoing",
  plotNo: "",
  roadNo: "",
  sector: "",
  plotSize: "",
  numberOfUnits: "",
  buildingDetails: "",
  flatSize: "",
  description: "",
  rooftopFeatures: [],
  groundFloorFeatures: [],
  coverImage: "",
  images: [],
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/(^-|-$)/g, "")
}

function FeatureListEditor({
  label, items, onChange,
}: { label: string; items: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState("")

  function add() {
    const val = input.trim()
    if (val && !items.includes(val)) onChange([...items, val])
    setInput("")
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); add() }
  }

  return (
    <div className="glass rounded-xl p-4" style={{ border: "1px solid var(--flow-border)" }}>
      <label className="block text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgb(var(--flow-text-soft))" }}>
        {label}
      </label>
      <div className="space-y-1.5 mb-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-flow-text">
            <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "rgb(var(--accent-1))" }} />
            <span className="flex-1 leading-snug">{item}</span>
            <button
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="shrink-0 opacity-40 hover:opacity-100 transition-opacity mt-0.5"
            >
              <X size={11} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Add feature and press Enter…"
          className="flex-1 bg-transparent outline-none text-xs text-flow-text placeholder:opacity-30 border-b pb-1"
          style={{ borderColor: "var(--flow-border)" }}
        />
        <button
          onClick={add}
          className="shrink-0 p-1 rounded-lg transition-all"
          style={{ background: "rgb(var(--accent-1) / 0.1)", color: "rgb(var(--accent-1))" }}
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  )
}

function ImageListEditor({ label, items, onChange }: { label: string; items: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState("")

  function add() {
    const val = input.trim()
    if (val && !items.includes(val)) onChange([...items, val])
    setInput("")
  }

  return (
    <div className="glass rounded-xl p-4" style={{ border: "1px solid var(--flow-border)" }}>
      <label className="block text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgb(var(--flow-text-soft))" }}>
        {label}
      </label>
      <div className="space-y-2 mb-3">
        {items.map((url, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="flex-1 text-xs truncate text-flow-text opacity-70 font-mono">{url}</span>
            <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="shrink-0 opacity-40 hover:opacity-100 transition-opacity">
              <Trash2 size={11} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add() } }}
          placeholder="Paste image URL and press Enter…"
          className="flex-1 bg-transparent outline-none text-xs text-flow-text placeholder:opacity-30 border-b pb-1"
          style={{ borderColor: "var(--flow-border)" }}
        />
        <button onClick={add} className="shrink-0 p-1 rounded-lg" style={{ background: "rgb(var(--accent-1) / 0.1)", color: "rgb(var(--accent-1))" }}>
          <Plus size={13} />
        </button>
      </div>
    </div>
  )
}

export default function ProjectEditor({ projectId }: { projectId?: string }) {
  const isEdit = !!projectId
  const [form, setForm] = useState<ProjectForm>(DEFAULT_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(isEdit)
  const router = useRouter()

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.json())
      .then(d => { if (!d.authenticated) router.push("/login?from=/real-estate/projects") })
      .catch(() => router.push("/login?from=/real-estate/projects"))
  }, [router])

  useEffect(() => {
    if (!isEdit || !projectId) return
    fetch(`/api/real-estate-projects/${projectId}`)
      .then(r => r.json())
      .then(data => {
        setForm({
          name: data.name ?? "",
          slug: data.slug ?? "",
          subtitle: data.subtitle ?? "",
          status: data.status ?? "Ongoing",
          plotNo: data.plotNo ?? "",
          roadNo: data.roadNo ?? "",
          sector: data.sector ?? "",
          plotSize: data.plotSize ?? "",
          numberOfUnits: data.numberOfUnits ?? "",
          buildingDetails: data.buildingDetails ?? "",
          flatSize: data.flatSize ?? "",
          description: data.description ?? "",
          rooftopFeatures: data.rooftopFeatures ?? [],
          groundFloorFeatures: data.groundFloorFeatures ?? [],
          coverImage: data.coverImage ?? "",
          images: data.images ?? [],
        })
        setLoading(false)
      })
      .catch(() => { setError("Failed to load project."); setLoading(false) })
  }, [isEdit, projectId])

  const set = useCallback(<K extends keyof ProjectForm>(key: K, value: ProjectForm[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }, [])

  function handleNameChange(val: string) {
    set("name", val)
    set("slug", slugify(val))
  }

  async function handleSave() {
    setError("")
    if (!form.name.trim()) { setError("Project name is required."); return }

    setSaving(true)
    try {
      const res = await fetch(
        isEdit ? `/api/real-estate-projects/${projectId}` : "/api/real-estate-projects",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      )

      if (!res.ok) {
        const d = await res.json()
        setError(d.error || "Failed to save.")
        setSaving(false)
        return
      }

      const saved = await res.json()
      router.push(`/real-estate/projects/${saved._id}`)
    } catch {
      setError("Network error. Please try again.")
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-flow-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "rgb(var(--accent-1) / 0.2)", borderTopColor: "rgb(var(--accent-1))" }} />
      </div>
    )
  }

  const fieldClass = "w-full bg-transparent outline-none text-sm text-flow-text placeholder:opacity-30 border-b pb-1"
  const fieldStyle = { borderColor: "var(--flow-border)" }

  return (
    <main className="min-h-screen bg-flow-bg">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="aurora-blob animate-aurora" style={{ width: 600, height: 600, top: "-10%", right: "-5%", background: "radial-gradient(circle, rgb(var(--accent-1) / 0.1), transparent 65%)" }} />
      </div>

      {/* Sticky header */}
      <div className="sticky top-0 z-30 border-b" style={{ background: "var(--flow-card-strong)", borderColor: "var(--flow-border)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/real-estate/projects" className="p-2 rounded-lg transition-colors hover:opacity-70" style={{ color: "rgb(var(--flow-text))" }}>
              <ArrowLeft size={16} />
            </Link>
            <span className="font-semibold text-sm text-flow-text" style={{ fontFamily: "var(--font-heading)" }}>
              {isEdit ? "Edit Project" : "New Project"}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="sticky top-[53px] z-20 px-6 py-2 text-sm text-center text-white"
          style={{ background: "rgb(239 68 68)" }}
        >
          {error}
          <button onClick={() => setError("")} className="ml-3 opacity-70 hover:opacity-100"><X size={13} /></button>
        </motion.div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 sm:gap-8">

          {/* ─── Left: main fields ─── */}
          <div className="space-y-5">
            {/* Name */}
            <div>
              <input
                type="text"
                value={form.name}
                onChange={e => handleNameChange(e.target.value)}
                placeholder="Project name…"
                className="w-full font-bold outline-none bg-transparent text-flow-text placeholder:text-flow-text/20 border-b pb-3 transition-colors"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontFamily: "var(--font-heading)", borderColor: "var(--flow-border-strong)" }}
              />
            </div>

            {/* Subtitle */}
            <div className="glass rounded-xl p-4" style={{ border: "1px solid var(--flow-border)" }}>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgb(var(--flow-text-soft))" }}>Subtitle / Society</label>
              <input type="text" value={form.subtitle} onChange={e => set("subtitle", e.target.value)} placeholder="e.g. JOLSHIRI ABASHON" className={fieldClass} style={fieldStyle} />
            </div>

            {/* Plot details grid */}
            <div className="glass rounded-xl p-4" style={{ border: "1px solid var(--flow-border)" }}>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgb(var(--flow-text-soft))" }}>Plot Details</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {([
                  ["plotNo", "Plot No"],
                  ["roadNo", "Road No"],
                  ["sector", "Sector"],
                  ["plotSize", "Plot Size"],
                  ["numberOfUnits", "Number of Units"],
                  ["buildingDetails", "Building Details"],
                  ["flatSize", "Flat Size"],
                ] as [keyof ProjectForm, string][]).map(([key, lbl]) => (
                  <div key={key}>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest mb-1.5 opacity-60">{lbl}</label>
                    <input
                      type="text"
                      value={form[key] as string}
                      onChange={e => set(key, e.target.value)}
                      placeholder={`e.g. ${key === "plotSize" ? "5 Katha" : key === "flatSize" ? "2850 sft." : "..."}`}
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="glass rounded-xl p-4" style={{ border: "1px solid var(--flow-border)" }}>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgb(var(--flow-text-soft))" }}>Features Description</label>
              <textarea
                value={form.description}
                onChange={e => set("description", e.target.value)}
                placeholder="Describe the project's key features…"
                rows={4}
                className="w-full bg-transparent outline-none resize-none text-sm leading-relaxed text-flow-text placeholder:opacity-30"
              />
            </div>

            <FeatureListEditor label="Rooftop Features" items={form.rooftopFeatures} onChange={v => set("rooftopFeatures", v)} />
            <FeatureListEditor label="Ground Floor Features" items={form.groundFloorFeatures} onChange={v => set("groundFloorFeatures", v)} />
          </div>

          {/* ─── Right: meta sidebar ─── */}
          <div className="space-y-4">
            {/* Status */}
            <div className="glass rounded-xl p-4" style={{ border: "1px solid var(--flow-border)" }}>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgb(var(--flow-text-soft))" }}>Status</label>
              <select value={form.status} onChange={e => set("status", e.target.value)} className="w-full bg-transparent outline-none text-sm text-flow-text">
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Cover Image */}
            <div className="glass rounded-xl p-4" style={{ border: "1px solid var(--flow-border)" }}>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgb(var(--flow-text-soft))" }}>Cover Image URL</label>
              <input type="text" value={form.coverImage} onChange={e => set("coverImage", e.target.value)} placeholder="https://…" className={fieldClass} style={fieldStyle} />
              {form.coverImage && (
                <img src={form.coverImage} alt="cover preview" className="mt-3 w-full rounded-lg object-cover" style={{ maxHeight: 140 }} />
              )}
            </div>

            <ImageListEditor label="Additional Images" items={form.images} onChange={v => set("images", v)} />
          </div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="sticky bottom-0 z-30 border-t" style={{ background: "var(--flow-card-strong)", borderColor: "var(--flow-border)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm flex items-center gap-2" style={{ color: "rgb(239 68 68)" }}>
              {error}
              <button onClick={() => setError("")}><X size={13} /></button>
            </motion.p>
          )}
          <div className="ml-auto">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white shine relative overflow-hidden transition-all"
              style={{ background: "#B8892A", boxShadow: "0 4px 18px rgba(184,137,42,0.35)" }}
            >
              {saving ? (
                <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Saving…</>
              ) : (
                <><Save size={14} />{isEdit ? "Update Project" : "Add Project"}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
