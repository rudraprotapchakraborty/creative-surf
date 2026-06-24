"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ArrowLeft, Eye, EyeOff, Save, X, Plus } from "lucide-react"
import ImageUpload from "@/components/ui/ImageUpload"

interface BlogForm {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  readTime: string
  coverImage: string
}

const CATEGORIES = ["Digital Marketing", "SEO", "Design", "UX", "Strategy", "General"]

const CATEGORY_EMOJI: Record<string, string> = {
  Strategy: "🎯", Marketing: "📈", Design: "🎨", SEO: "🔍",
  "Social Media": "📱", Content: "✍️", General: "💡", Technology: "⚡",
  Business: "💼", Branding: "🌟", UX: "🖥️", Analytics: "📊",
  Growth: "🚀", Copywriting: "🖊️", Advertising: "📣",
  "Digital Marketing": "📣",
}

const DEFAULT_FORM: BlogForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "General",
  tags: [],
  author: "Creative Surf",
  readTime: "5 min read",
  coverImage: "",
}

function calcReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export default function BlogEditor({ blogId }: { blogId?: string }) {
  const isEdit = !!blogId
  const [form, setForm] = useState<BlogForm>(DEFAULT_FORM)
  const [tagInput, setTagInput] = useState("")
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(isEdit)
  const router = useRouter()

  // Auth guard
  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.json())
      .then(d => { if (!d.authenticated) router.push("/login") })
      .catch(() => router.push("/login"))
  }, [router])

  // Load existing blog for edit
  useEffect(() => {
    if (!isEdit || !blogId) return
    fetch(`/api/blogs/${blogId}`)
      .then(r => r.json())
      .then(data => {
        setForm({
          title: data.title ?? "",
          slug: data.slug ?? "",
          excerpt: data.excerpt ?? "",
          content: data.content ?? "",
          category: data.category ?? "General",
          tags: data.tags ?? [],
          author: data.author ?? "Creative Surf",
          readTime: data.readTime ?? "5 min read",
          coverImage: data.coverImage ?? "",
        })
        setLoading(false)
      })
      .catch(() => { setError("Failed to load blog post."); setLoading(false) })
  }, [isEdit, blogId])

  const set = useCallback(<K extends keyof BlogForm>(key: K, value: BlogForm[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }, [])

  function handleTitleChange(val: string) {
    set("title", val)
    set("slug", slugify(val))
  }

  function addTag(e: React.KeyboardEvent) {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault()
      const tag = tagInput.trim().replace(/,+$/, "")
      if (tag && !form.tags.includes(tag)) {
        set("tags", [...form.tags, tag])
      }
      setTagInput("")
    }
  }

  function removeTag(tag: string) {
    set("tags", form.tags.filter(t => t !== tag))
  }

  async function handleSave() {
    setError("")

    if (!form.title.trim()) { setError("Title is required."); return }
    if (!form.slug.trim()) { setError("Slug is required."); return }
    if (!form.content.trim()) { setError("Content is required."); return }

    const payload = { ...form, published: true }

    setSaving(true)
    try {
      const res = await fetch(
        isEdit ? `/api/blogs/${blogId}` : "/api/blogs",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) {
        const d = await res.json()
        setError(d.error || "Failed to save. Please try again.")
        setSaving(false)
        return
      }

      const saved = await res.json()
      router.push(`/blogs/${saved.slug}`)
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

  return (
    <main className="min-h-screen bg-flow-bg">
      {/* Aurora bg */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="aurora-blob animate-aurora" style={{ width: 600, height: 600, top: "-10%", right: "-5%", background: "radial-gradient(circle, rgb(var(--accent-1) / 0.1), transparent 65%)" }} />
      </div>

      {/* Sticky header */}
      <div
        className="sticky top-0 z-30 border-b"
        style={{ background: "var(--flow-card-strong)", borderColor: "var(--flow-border)", backdropFilter: "blur(16px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/blogs"
              className="p-2 rounded-lg transition-colors hover:opacity-70"
              style={{ color: "rgb(var(--flow-text))" }}
            >
              <ArrowLeft size={16} />
            </Link>
            <span className="font-semibold text-sm text-flow-text" style={{ fontFamily: "var(--font-heading)" }}>
              {isEdit ? "Edit Post" : "New Post"}
            </span>
          </div>

          <button
            onClick={() => setPreview(v => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{ background: preview ? "rgb(var(--accent-1) / 0.15)" : "var(--flow-card)", color: "rgb(var(--flow-text))", border: "1px solid var(--flow-border-strong)" }}
          >
            {preview ? <EyeOff size={12} /> : <Eye size={12} />}
            {preview ? "Editor" : "Preview"}
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-[53px] z-20 px-6 py-2 text-sm text-center text-white"
          style={{ background: "rgb(239 68 68)" }}
        >
          {error}
          <button onClick={() => setError("")} className="ml-3 opacity-70 hover:opacity-100"><X size={13} /></button>
        </motion.div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-32">
        {preview ? (
          /* ─── Preview Mode ─── */
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgb(var(--accent-1))" }}>{form.category}</span>
            <h1 className="font-bold text-flow-text mt-3 mb-4 leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "var(--font-heading)" }}>
              {form.title || "Untitled Post"}
            </h1>
            {form.excerpt && (
              <p className="text-base leading-relaxed mb-8 font-medium" style={{ color: "rgb(var(--flow-text-soft))", borderLeft: "3px solid rgb(var(--accent-1))", paddingLeft: "1rem" }}>
                {form.excerpt}
              </p>
            )}
            <div className="prose-blog">
              <ReactMarkdown remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="font-bold text-flow-text mb-4 mt-8 text-2xl" style={{ fontFamily: "var(--font-heading)" }}>{children}</h1>,
                  h2: ({ children }) => <h2 className="font-bold text-flow-text mb-3 mt-7 text-xl" style={{ fontFamily: "var(--font-heading)" }}>{children}</h2>,
                  h3: ({ children }) => <h3 className="font-bold text-flow-text mb-2 mt-6 text-lg" style={{ fontFamily: "var(--font-heading)" }}>{children}</h3>,
                  p: ({ children }) => <p className="text-base leading-[1.85] mb-5" style={{ color: "rgb(var(--flow-text))" }}>{children}</p>,
                  li: ({ children }) => <li className="text-base leading-relaxed mb-1.5 flex gap-2" style={{ color: "rgb(var(--flow-text))" }}><span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ background: "rgb(var(--accent-1))" }} /><span>{children}</span></li>,
                  ul: ({ children }) => <ul className="mb-5 space-y-1 pl-0" style={{ listStyle: "none" }}>{children}</ul>,
                  blockquote: ({ children }) => <blockquote className="my-5 py-3 px-4 rounded-xl" style={{ background: "rgb(var(--accent-1) / 0.06)", borderLeft: "3px solid rgb(var(--accent-1))" }}>{children}</blockquote>,
                  code: ({ children }) => <code className="px-1.5 py-0.5 rounded text-sm font-mono" style={{ background: "rgb(var(--accent-1) / 0.1)", color: "rgb(var(--accent-1))" }}>{children}</code>,
                }}
              >
                {form.content || "*No content yet…*"}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          /* ─── Editor Mode ─── */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 sm:gap-8">
            {/* Left: main content */}
            <div className="space-y-5">
              {/* Title */}
              <div>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => handleTitleChange(e.target.value)}
                  placeholder="Post title…"
                  className="w-full font-bold outline-none bg-transparent text-flow-text placeholder:text-flow-text/20 border-b pb-3 transition-colors"
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    fontFamily: "var(--font-heading)",
                    borderColor: "var(--flow-border-strong)",
                  }}
                />
              </div>


              {/* Excerpt */}
              <div className="glass rounded-xl p-4" style={{ border: "1px solid var(--flow-border)" }}>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgb(var(--flow-text-soft))" }}>
                  Excerpt / Summary
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={e => set("excerpt", e.target.value)}
                  placeholder="A short summary of the post shown in blog listings…"
                  rows={3}
                  className="w-full bg-transparent outline-none resize-none text-sm leading-relaxed text-flow-text placeholder:opacity-30"
                />
              </div>

              {/* Content */}
              <div className="glass rounded-xl p-4" style={{ border: "1px solid var(--flow-border)" }}>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgb(var(--flow-text-soft))" }}>
                  Content <span className="normal-case font-normal opacity-60">(Markdown supported)</span>
                </label>
                <textarea
                  value={form.content}
                  onChange={e => { set("content", e.target.value); set("readTime", calcReadTime(e.target.value)) }}
                  placeholder={`# Heading\n\nWrite your blog content here. Markdown is supported.\n\n## Section\n\nParagraph text goes here…`}
                  rows={24}
                  className="w-full bg-transparent outline-none resize-y text-sm leading-relaxed font-mono text-flow-text placeholder:opacity-20"
                  style={{ minHeight: 280 }}
                />
              </div>
            </div>

            {/* Right: meta sidebar */}
            <div className="space-y-4">
              {/* Category */}
              <div className="glass rounded-xl p-4" style={{ border: "1px solid var(--flow-border)" }}>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgb(var(--flow-text-soft))" }}>Category</label>
                <select
                  value={form.category}
                  onChange={e => set("category", e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-flow-text"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Cover Image */}
              <div className="glass rounded-xl p-4" style={{ border: "1px solid var(--flow-border)" }}>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgb(var(--flow-text-soft))" }}>Cover Image</label>
                <ImageUpload
                  value={form.coverImage}
                  onChange={v => set("coverImage", v)}
                  placeholder={
                    <div className="w-full h-full relative overflow-hidden">
                      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0d1117 0%, #1a1040 60%, #0d1b2a 100%)" }} />
                      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
                      <div className="absolute" style={{ width: 90, height: 90, borderRadius: "50%", background: "rgb(var(--accent-1) / 0.3)", filter: "blur(22px)", top: -18, right: -8 }} />
                      <div className="absolute" style={{ width: 70, height: 70, borderRadius: "50%", background: "rgb(var(--accent-2) / 0.2)", filter: "blur(18px)", bottom: -10, left: -10 }} />
                      <div className="absolute" style={{ width: "200%", height: "1px", background: "linear-gradient(90deg, transparent, rgb(var(--accent-1) / 0.7), transparent)", top: "44%", left: "-50%", transform: "rotate(-6deg)" }} />
                      <div className="absolute" style={{ width: "200%", height: "1px", background: "linear-gradient(90deg, transparent, rgb(var(--accent-2) / 0.4), transparent)", top: "49%", left: "-50%", transform: "rotate(-6deg)" }} />
                      <div className="absolute" style={{ fontSize: "3rem", lineHeight: 1, right: "6%", top: "50%", transform: "translateY(-52%) rotate(8deg)", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))", userSelect: "none" }}>
                        {CATEGORY_EMOJI[form.category] ?? "💡"}
                      </div>
                    </div>
                  }
                />
              </div>

              {/* Tags */}
              <div className="glass rounded-xl p-4" style={{ border: "1px solid var(--flow-border)" }}>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgb(var(--flow-text-soft))" }}>Tags</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {form.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "rgb(var(--accent-1) / 0.1)", color: "rgb(var(--accent-1))" }}>
                      {tag}
                      <button onClick={() => removeTag(tag)} className="opacity-60 hover:opacity-100"><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  placeholder="Type tag + Enter"
                  className="w-full bg-transparent outline-none text-xs text-flow-text placeholder:opacity-30"
                />
              </div>

              {/* Author */}
              <div className="glass rounded-xl p-4" style={{ border: "1px solid var(--flow-border)" }}>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgb(var(--flow-text-soft))" }}>Author</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={e => set("author", e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-flow-text border-b pb-1"
                  style={{ borderColor: "var(--flow-border)" }}
                />
              </div>

              {/* Markdown cheatsheet */}
              <div className="glass rounded-xl p-4" style={{ border: "1px solid var(--flow-border)" }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgb(var(--flow-text-soft))" }}>Markdown Guide</p>
                <div className="space-y-1.5 text-xs font-mono" style={{ color: "rgb(var(--flow-text-soft))" }}>
                  {[
                    ["# H1", "## H2", "### H3"],
                    ["**bold**", "*italic*"],
                    ["- list item"],
                    ["> blockquote"],
                    ["`inline code`"],
                  ].map((row, i) => (
                    <div key={i} className="flex flex-wrap gap-2">
                      {row.map(r => <code key={r} className="px-1 rounded" style={{ background: "rgb(var(--flow-text) / 0.06)" }}>{r}</code>)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── Sticky bottom action bar ─── */}
      <div
        className="sticky bottom-0 z-30 border-t"
        style={{ background: "var(--flow-card-strong)", borderColor: "var(--flow-border)", backdropFilter: "blur(16px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm flex items-center gap-2"
              style={{ color: "rgb(239 68 68)" }}
            >
              {error}
              <button onClick={() => setError("")}><X size={13} /></button>
            </motion.p>
          )}
          <div className="ml-auto">
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white shine relative overflow-hidden transition-all"
              style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))", boxShadow: "0 4px 18px rgb(var(--accent-1) / 0.3)" }}
            >
              {saving ? (
                <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Saving…</>
              ) : (
                <><Save size={14} />{isEdit ? "Update Post" : "Publish Post"}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
