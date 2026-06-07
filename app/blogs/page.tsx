"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2, Clock, User, LogOut, Calendar } from "lucide-react"

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  tags: string[]
  author: string
  readTime: string
  published: boolean
  createdAt: string
}

const CATEGORY_COLOR = "rgb(var(--accent-1))"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminUsername, setAdminUsername] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await fetch("/api/blogs")
      if (res.ok) setBlogs(await res.json())
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchBlogs()
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      if (d.authenticated) { setIsAdmin(true); setAdminUsername(d.username) }
    }).catch(() => {})
  }, [fetchBlogs])

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    setIsAdmin(false)
    setAdminUsername("")
    router.refresh()
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" })
      if (res.ok) setBlogs(prev => prev.filter(b => b._id !== id))
    } catch {}
    setDeletingId(null)
  }

  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category)))]
  const filtered = activeCategory === "All" ? blogs : blogs.filter(b => b.category === activeCategory)

  return (
    <main className="min-h-screen bg-flow-bg relative">
      {/* Aurora background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="aurora-blob animate-aurora" style={{ width: 700, height: 700, top: "-10%", left: "-5%", background: "radial-gradient(circle, rgb(var(--accent-1) / 0.12), transparent 65%)" }} />
        <div className="aurora-blob animate-aurora-alt" style={{ width: 600, height: 600, bottom: "5%", right: "-8%", background: "radial-gradient(circle, rgb(var(--accent-2) / 0.1), transparent 65%)" }} />
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
                <span className="w-5 h-[2px]" style={{ background: "rgb(var(--accent-1))" }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "rgb(var(--accent-1))" }}>
                  Creative Surf · Blogs
                </span>
              </span>
              <h1
                className="font-bold text-flow-text leading-tight mb-3"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                Insights &amp; Ideas
              </h1>
              <p className="max-w-lg text-sm sm:text-base leading-relaxed" style={{ color: "rgb(var(--flow-text-soft))" }}>
                Expert takes on digital marketing, UX design, SEO, and brand strategy — straight from the Creative Surf team.
              </p>
            </div>

            {/* Admin bar */}
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap"
              >
                <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: "rgb(var(--accent-1) / 0.1)", color: "rgb(var(--accent-1))" }}>
                  @{adminUsername}
                </span>
                <Link
                  href="/blogs/new"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shine relative overflow-hidden transition-all"
                  style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))", boxShadow: "0 4px 18px rgb(var(--accent-1) / 0.3)" }}
                >
                  <Plus size={15} />
                  New Post
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl transition-colors hover:opacity-70"
                  style={{ background: "rgb(var(--flow-border))", color: "rgb(var(--flow-text))" }}
                  title="Logout"
                >
                  <LogOut size={15} />
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* ─── Category filter ─── */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2 mb-8 sm:mb-12"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={
                  activeCategory === cat
                    ? { background: "rgb(var(--accent-1))", color: "#fff", boxShadow: "0 2px 12px rgb(var(--accent-1) / 0.3)" }
                    : { background: "var(--flow-card)", color: "rgb(var(--flow-text))", border: "1px solid var(--flow-border-strong)" }
                }
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* ─── Loading ─── */}
        {loading && (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "rgb(var(--accent-1) / 0.2)", borderTopColor: "rgb(var(--accent-1))" }} />
          </div>
        )}

        {/* ─── Empty ─── */}
        {!loading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center" style={{ background: "rgb(var(--accent-1) / 0.08)" }}>
              <span className="text-3xl">✍️</span>
            </div>
            <h3 className="font-bold text-xl mb-2 text-flow-text">No posts yet</h3>
            <p className="text-sm mb-6" style={{ color: "rgb(var(--flow-text-soft))" }}>
              {isAdmin ? "Create your first blog post to get started." : "Check back soon for insights from the Creative Surf team."}
            </p>
            {isAdmin && (
              <Link href="/blogs/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}>
                <Plus size={15} /> Write First Post
              </Link>
            )}
          </motion.div>
        )}

        {/* ─── Blog grid ─── */}
        {!loading && filtered.length > 0 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
          >
            <AnimatePresence>
              {filtered.map(blog => (
                <motion.article
                  key={blog._id}
                  variants={fadeUp}
                  layout
                  className="glass rounded-2xl overflow-hidden flex flex-col"
                  style={{ border: "1px solid var(--flow-border-strong)" }}
                >
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    {/* Category + Admin controls */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                        style={{ background: CATEGORY_COLOR }}
                      >
                        {blog.category}
                      </span>
                      {isAdmin && (
                        <div className="flex gap-1.5">
                          <Link
                            href={`/blogs/edit/${blog._id}`}
                            className="p-1.5 rounded-lg transition-all"
                            style={{ background: "rgb(var(--accent-1) / 0.1)", color: "rgb(var(--accent-1))" }}
                            title="Edit"
                          >
                            <Pencil size={12} />
                          </Link>
                          <button
                            onClick={() => handleDelete(blog._id, blog.title)}
                            disabled={deletingId === blog._id}
                            className="p-1.5 rounded-lg transition-all"
                            style={{ background: "rgb(239 68 68 / 0.1)", color: "rgb(239 68 68)" }}
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      )}
                    </div>

                    <h3 className="font-bold text-flow-text mb-2 leading-snug line-clamp-2 text-base sm:text-[1.05rem]">
                      {blog.title}
                    </h3>
                    <p className="text-xs leading-relaxed mb-4 line-clamp-3 flex-1" style={{ color: "rgb(var(--flow-text-soft))" }}>
                      {blog.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-2 pt-3 flex-wrap" style={{ borderTop: "1px solid var(--flow-border)" }}>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]" style={{ color: "rgb(var(--flow-text-soft))" }}>
                        <span className="flex items-center gap-1"><User size={10} />{blog.author}</span>
                        <span className="flex items-center gap-1"><Clock size={10} />{blog.readTime}</span>
                        <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(blog.createdAt)}</span>
                      </div>
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="text-[11px] font-semibold shrink-0"
                        style={{ color: "rgb(var(--accent-1))" }}
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!isAdmin && !loading && (
          <div className="mt-16 text-center">
            <Link href="/login" className="text-xs opacity-30 hover:opacity-60 transition-opacity" style={{ color: "rgb(var(--flow-text))" }}>
              Admin
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
