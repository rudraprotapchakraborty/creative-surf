"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { useT, useLocale, formatDateForLocale, type Locale } from "@/lib/i18n"
import { blogsMessages } from "@/lib/i18n/messages/blogs"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Plus, Pencil, Trash2, MoreHorizontal, Clock, LogIn } from "lucide-react"
import BlogCardActions from "@/components/blog/BlogCardActions"
import BlogComments from "@/components/blog/BlogComments"
import { EMPTY_ENGAGEMENT, type BlogEngagement } from "@/lib/blog-engagement-shared"
import { getVisitorId } from "@/lib/visitor-id"

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
  /** Account that wrote the post. Absent on posts saved before ownership existed. */
  authorId?: string
}

const CATEGORY_EMOJI: Record<string, string> = {
  Strategy: "🎯", Marketing: "📈", Design: "🎨", SEO: "🔍",
  "Social Media": "📱", Content: "✍️", General: "💡", Technology: "⚡",
  Business: "💼", Branding: "🌟", UX: "🖥️", Analytics: "📊",
  Growth: "🚀", Copywriting: "🖊️", Advertising: "📣",
  "Lead Generation": "🧲", "AI & Creative": "🤖", "Video Production": "🎬",
  "Web Development": "🌐", "Digital Marketing": "📣",
}

/** How many posts render before the scroll sentinel pulls in the next batch. */
const PAGE_SIZE = 5

function formatDate(dateStr: string, locale: Locale) {
  return formatDateForLocale(dateStr, locale, { month: "short", day: "numeric", year: "numeric" })
}

/** Initials for the post author's avatar, e.g. "Creative Surf" → "CS". */
function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "CS"
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase()
}

/**
 * A deterministic accent per author so the same byline always gets the same
 * avatar colour, without storing one on the post.
 */
function accentOf(name: string) {
  const palette = [
    ["#0066A2", "#0EA5E9"], ["#7C3AED", "#C084FC"], ["#0F766E", "#2DD4BF"],
    ["#BE123C", "#FB7185"], ["#B8892A", "#D4A843"], ["#1D4ED8", "#60A5FA"],
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0
  const [from, to] = palette[Math.abs(hash) % palette.length]
  return `linear-gradient(135deg, ${from}, ${to})`
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function BlogsPage() {
  const t = useT(blogsMessages)
  const locale = useLocale()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [engagement, setEngagement] = useState<Record<string, BlogEngagement>>({})
  const [visitorId, setVisitorId] = useState("")
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  /** Signed-in account, or null when logged out. */
  const [viewer, setViewer] = useState<{ sub: string; name: string } | null>(null)
  const [activeCategory, setActiveCategory] = useState("All")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({})
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef<HTMLDivElement>(null)

  /**
   * Facebook-style compact age ("3h", "2d"). Anything older than about a month
   * reads better as a real date than as an ever-growing week count.
   */
  const relativeTime = useCallback(
    (dateStr: string) => {
      const diffMs = Date.now() - new Date(dateStr).getTime()
      if (Number.isNaN(diffMs)) return formatDate(dateStr, locale)
      const mins = Math.floor(diffMs / 60000)
      if (mins < 1) return t("timeJustNow")
      if (mins < 60) return t("timeMinutes", { count: mins })
      const hours = Math.floor(mins / 60)
      if (hours < 24) return t("timeHours", { count: hours })
      const days = Math.floor(hours / 24)
      if (days < 7) return t("timeDays", { count: days })
      const weeks = Math.floor(days / 7)
      if (weeks < 5) return t("timeWeeks", { count: weeks })
      return formatDate(dateStr, locale)
    },
    [locale, t]
  )

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await fetch("/api/blogs")
      if (res.ok) setBlogs(await res.json())
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchBlogs()
    setVisitorId(getVisitorId())
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      if (!d.authenticated) return
      if (d.role === "admin") setIsAdmin(true)
      setViewer({ sub: d.user?.sub ?? "", name: d.username || d.user?.name || "" })
    }).catch(() => {})
  }, [fetchBlogs])

  /**
   * Mirrors `canManageBlog` on the server. The API is the real gate — this only
   * decides whether the menu is worth showing.
   */
  const canManage = useCallback(
    (blog: Blog) => isAdmin || (!!viewer && !!blog.authorId && blog.authorId === viewer.sub),
    [isAdmin, viewer]
  )

  // One batched request for every card's like/comment counts, re-run once the
  // visitor id is known so the heart can render in its "already liked" state.
  useEffect(() => {
    if (blogs.length === 0) return
    const ids = blogs.map(b => b._id).join(",")
    const query = new URLSearchParams({ ids })
    if (visitorId) query.set("visitorId", visitorId)

    let cancelled = false
    fetch(`/api/blogs/engagement?${query}`)
      .then(r => (r.ok ? r.json() : {}))
      .then(data => { if (!cancelled) setEngagement(data) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [blogs, visitorId])

  const handleEngagementChange = useCallback((blogId: string, next: BlogEngagement) => {
    setEngagement(prev => ({ ...prev, [blogId]: next }))
  }, [])

  /**
   * Keeps the summary row honest when a comment is posted inline. Returns the
   * previous state untouched when the count already matches, so the thread
   * reporting its count on open cannot churn a re-render of the whole feed.
   */
  const handleCommentCount = useCallback((blogId: string, count: number) => {
    setEngagement(prev => {
      const current = prev[blogId] ?? EMPTY_ENGAGEMENT
      if (current.comments === count) return prev
      return { ...prev, [blogId]: { ...current, comments: count } }
    })
  }, [])

  const toggleComments = useCallback((blogId: string) => {
    setOpenComments(prev => ({ ...prev, [blogId]: !prev[blogId] }))
  }, [])

  async function handleDelete(id: string, title: string) {
    setMenuOpenId(null)
    if (!confirm(t("confirmDelete", { title }))) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" })
      if (res.ok) setBlogs(prev => prev.filter(b => b._id !== id))
    } catch {}
    setDeletingId(null)
  }

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(blogs.map(b => b.category)))],
    [blogs]
  )
  const filtered = useMemo(
    () => (activeCategory === "All" ? blogs : blogs.filter(b => b.category === activeCategory)),
    [blogs, activeCategory]
  )
  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  // Switching category restarts the feed at the top of the new list.
  useEffect(() => { setVisibleCount(PAGE_SIZE) }, [activeCategory])

  /** Infinite scroll — reveal the next batch as the sentinel enters view. */
  useEffect(() => {
    if (!hasMore) return
    const node = sentinelRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) setVisibleCount(c => c + PAGE_SIZE)
      },
      { rootMargin: "400px" }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, filtered.length])

  // Any outside click dismisses an open post menu.
  useEffect(() => {
    if (!menuOpenId) return
    const close = () => setMenuOpenId(null)
    window.addEventListener("click", close)
    return () => window.removeEventListener("click", close)
  }, [menuOpenId])

  /** Most-liked posts, for the right rail. */
  const trending = useMemo(() => {
    return [...blogs]
      .sort((a, b) => (engagement[b._id]?.likes ?? 0) - (engagement[a._id]?.likes ?? 0))
      .slice(0, 4)
      .filter(b => (engagement[b._id]?.likes ?? 0) > 0)
  }, [blogs, engagement])

  const railCard = {
    background: "var(--flow-card)",
    border: "1px solid var(--flow-border-strong)",
  }

  return (
    <main className="min-h-screen bg-flow-bg relative">
      {/* Aurora background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="aurora-blob animate-aurora" style={{ width: 700, height: 700, top: "-10%", left: "-5%", background: "radial-gradient(circle, rgb(var(--accent-1) / 0.12), transparent 65%)" }} />
        <div className="aurora-blob animate-aurora-alt" style={{ width: 600, height: 600, bottom: "5%", right: "-8%", background: "radial-gradient(circle, rgb(var(--accent-2) / 0.1), transparent 65%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-20">

        {/* ─── Three-column shell: rail · feed · rail ─── */}
        <div className="flex justify-center gap-6 xl:gap-8">

          {/* Left rail — category nav */}
          <aside className="hidden lg:block w-[240px] shrink-0">
            <div className="sticky top-24 flex flex-col gap-4">
              <nav className="rounded-2xl p-3" style={railCard}>
                <h2 className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgb(var(--flow-text-soft))" }}>
                  {t("categoriesTitle")}
                </h2>
                <ul className="flex flex-col gap-0.5">
                  {categories.map(cat => {
                    const active = activeCategory === cat
                    return (
                      <li key={cat}>
                        <button
                          onClick={() => setActiveCategory(cat)}
                          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] font-semibold text-left transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.05]"
                          style={active ? { background: "rgb(var(--accent-1) / 0.12)", color: "rgb(var(--accent-1))" } : { color: "rgb(var(--flow-text))" }}
                          aria-current={active ? "page" : undefined}
                        >
                          <span className="text-base leading-none w-5 text-center shrink-0" aria-hidden>
                            {cat === "All" ? "🗂️" : CATEGORY_EMOJI[cat] ?? "💡"}
                          </span>
                          <span className="truncate">{cat === "All" ? t("categoryAll") : cat}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>

            </div>
          </aside>

          {/* ─── Center feed ─── */}
          <div className="w-full max-w-[640px] min-w-0">

            {/* Heading — lives in the column so it lines up with the posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 mb-2.5">
                <span className="w-5 h-[2px]" style={{ background: "rgb(var(--accent-1))" }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "rgb(var(--accent-1))" }}>
                  {t("eyebrow")}
                </span>
              </span>
              <h1 className="font-bold text-flow-text leading-tight mb-1.5" style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.25rem)" }}>
                {t("title")}
              </h1>
              <p className="text-[13.5px] leading-relaxed" style={{ color: "rgb(var(--flow-text-soft))" }}>
                {t("subtitle")}
              </p>
            </motion.div>

            {/* Category chips — the rail is hidden below lg, so the feed keeps its own.
                Wraps onto rows rather than scrolling, so every topic is reachable. */}
            {categories.length > 1 && (
              <div className="lg:hidden flex flex-wrap gap-2 mb-4">
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
                    {cat === "All" ? t("categoryAll") : cat}
                  </button>
                ))}
              </div>
            )}

            {/*
              Composer — open to any signed-in account. Signed out, the same
              control is blurred behind a sign-in prompt so the ability to post
              is visible rather than hidden.
            */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl mb-4 overflow-hidden"
              style={railCard}
            >
              <div
                className={`p-3.5 flex items-center gap-3 ${viewer ? "" : "pointer-events-none select-none"}`}
                style={viewer ? undefined : { filter: "blur(3px)", opacity: 0.55 }}
                aria-hidden={viewer ? undefined : true}
              >
                <div
                  className="shrink-0 flex items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ width: 40, height: 40, background: accentOf(viewer?.name || "Creative Surf") }}
                  aria-hidden
                >
                  {initialsOf(viewer?.name || "Creative Surf")}
                </div>
                {viewer ? (
                  <Link
                    href="/blogs/new"
                    className="flex-1 px-4 py-2.5 rounded-full text-sm transition-colors hover:opacity-80"
                    style={{ background: "rgb(var(--flow-border) / 0.6)", color: "rgb(var(--flow-text-soft))" }}
                  >
                    {t("composerPrompt")}
                  </Link>
                ) : (
                  <span
                    className="flex-1 px-4 py-2.5 rounded-full text-sm"
                    style={{ background: "rgb(var(--flow-border) / 0.6)", color: "rgb(var(--flow-text-soft))" }}
                  >
                    {t("composerPrompt")}
                  </span>
                )}
              </div>

              {!viewer && (
                <div className="absolute inset-0 flex items-center justify-center px-4">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
                  >
                    <LogIn size={15} />
                    {t("loginToPost")}
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Loading */}
            {loading && (
              <div className="flex flex-col gap-4">
                {[0, 1, 2].map(i => (
                  <div key={i} className="rounded-2xl p-4 animate-pulse" style={railCard}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="rounded-full" style={{ width: 40, height: 40, background: "rgb(var(--flow-border))" }} />
                      <div className="flex-1">
                        <div className="h-3 w-32 rounded mb-2" style={{ background: "rgb(var(--flow-border))" }} />
                        <div className="h-2.5 w-20 rounded" style={{ background: "rgb(var(--flow-border))" }} />
                      </div>
                    </div>
                    <div className="h-4 w-3/4 rounded mb-2.5" style={{ background: "rgb(var(--flow-border))" }} />
                    <div className="h-3 w-full rounded mb-2" style={{ background: "rgb(var(--flow-border))" }} />
                    <div className="rounded-xl mt-3" style={{ height: 200, background: "rgb(var(--flow-border))" }} />
                  </div>
                ))}
              </div>
            )}

            {/* Empty */}
            {!loading && filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center rounded-2xl"
                style={railCard}
              >
                <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center" style={{ background: "rgb(var(--accent-1) / 0.08)" }}>
                  <span className="text-3xl">✍️</span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-flow-text">{t("emptyTitle")}</h3>
                <p className="text-sm mb-6" style={{ color: "rgb(var(--flow-text-soft))" }}>
                  {viewer ? t("emptyAdmin") : t("emptyPublic")}
                </p>
                {viewer && (
                  <Link href="/blogs/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}>
                    <Plus size={15} /> {t("writeFirst")}
                  </Link>
                )}
              </motion.div>
            )}

            {/* ─── Post feed ─── */}
            {!loading && filtered.length > 0 && (
              <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-4">
                <AnimatePresence>
                  {visible.map(blog => {
                    const author = blog.author || t("brand")
                    const commentsOpen = Boolean(openComments[blog._id])
                    return (
                      <motion.article
                        key={blog._id}
                        variants={fadeUp}
                        layout
                        className="rounded-2xl overflow-hidden"
                        style={railCard}
                      >
                        {/* Post header — avatar, byline, age, admin menu */}
                        <header className="flex items-start gap-3 p-4 pb-3">
                          <div
                            className="shrink-0 flex items-center justify-center rounded-full text-[13px] font-bold text-white"
                            style={{ width: 42, height: 42, background: accentOf(author) }}
                            aria-hidden
                          >
                            {initialsOf(author)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-flow-text leading-tight truncate">{author}</p>
                            <div className="flex items-center gap-1.5 mt-0.5 text-[11px] flex-wrap" style={{ color: "rgb(var(--flow-text-soft))" }}>
                              <time dateTime={blog.createdAt} title={formatDate(blog.createdAt, locale)}>
                                {relativeTime(blog.createdAt)}
                              </time>
                              <span aria-hidden>·</span>
                              <button
                                onClick={() => setActiveCategory(blog.category)}
                                className="font-semibold hover:underline"
                                style={{ color: "rgb(var(--accent-1))" }}
                              >
                                {CATEGORY_EMOJI[blog.category] ?? "💡"} {blog.category}
                              </button>
                              {blog.readTime && (
                                <>
                                  <span aria-hidden>·</span>
                                  <span className="inline-flex items-center gap-1">
                                    <Clock size={11} /> {blog.readTime}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {canManage(blog) && (
                            <div className="relative shrink-0">
                              <button
                                onClick={e => { e.stopPropagation(); setMenuOpenId(menuOpenId === blog._id ? null : blog._id) }}
                                className="p-1.5 rounded-full transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.07]"
                                style={{ color: "rgb(var(--flow-text-soft))" }}
                                aria-haspopup="menu"
                                aria-expanded={menuOpenId === blog._id}
                                aria-label={t("edit")}
                              >
                                <MoreHorizontal size={18} />
                              </button>
                              {menuOpenId === blog._id && (
                                <div
                                  onClick={e => e.stopPropagation()}
                                  role="menu"
                                  className="absolute right-0 top-9 z-20 w-40 rounded-xl overflow-hidden py-1"
                                  style={{ background: "var(--flow-card-strong, rgb(var(--flow-bg)))", border: "1px solid var(--flow-border-strong)", boxShadow: "0 8px 28px rgba(0,0,0,0.18)" }}
                                >
                                  <Link
                                    href={`/blogs/edit/${blog._id}`}
                                    role="menuitem"
                                    className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.07]"
                                    style={{ color: "rgb(var(--flow-text))" }}
                                  >
                                    <Pencil size={14} /> {t("edit")}
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(blog._id, blog.title)}
                                    disabled={deletingId === blog._id}
                                    role="menuitem"
                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.07] disabled:opacity-50"
                                    style={{ color: "rgb(239 68 68)" }}
                                  >
                                    <Trash2 size={14} /> {t("delete")}
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </header>

                        {/* Post body */}
                        <div className="px-4 pb-3">
                          <Link href={`/blogs/${blog.slug}`} className="group">
                            <h2 className="font-bold text-flow-text leading-snug mb-1.5 text-[1.15rem] transition-colors group-hover:text-aurora-1">
                              {blog.title}
                            </h2>
                          </Link>
                          <p className="text-[13.5px] leading-relaxed line-clamp-3" style={{ color: "rgb(var(--flow-text-soft))" }}>
                            {blog.excerpt}
                          </p>
                        </div>

                        {/* Cover — full-bleed, the way a feed photo reads */}
                        <Link href={`/blogs/${blog.slug}`} className="block w-full overflow-hidden group" style={{ aspectRatio: "16 / 9" }}>
                          {blog.coverImage ? (
                            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                          ) : (
                            <div className="w-full h-full relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.03]">
                              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0d1117 0%, #1a1040 60%, #0d1b2a 100%)" }} />
                              <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                              <div className="absolute" style={{ width: 180, height: 180, borderRadius: "50%", background: "rgb(var(--accent-1) / 0.3)", filter: "blur(44px)", top: -40, right: 20 }} />
                              <div className="absolute" style={{ width: 130, height: 130, borderRadius: "50%", background: "rgb(var(--accent-2) / 0.2)", filter: "blur(34px)", bottom: -20, left: 0 }} />
                              <div className="absolute" style={{ width: "200%", height: "1px", background: "linear-gradient(90deg, transparent, rgb(var(--accent-1) / 0.7), transparent)", top: "46%", left: "-50%", transform: "rotate(-5deg)" }} />
                              <div className="absolute" style={{ fontSize: "5.5rem", lineHeight: 1, right: "7%", top: "50%", transform: "translateY(-52%) rotate(8deg)", filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.5))", userSelect: "none" }} aria-hidden>
                                {CATEGORY_EMOJI[blog.category] ?? "💡"}
                              </div>
                              <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">
                                <span style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgb(var(--accent-1) / 0.9)" }}>{blog.category}</span>
                                <div style={{ maxWidth: "64%" }}>
                                  <span style={{ fontSize: "clamp(1rem, 3vw, 1.4rem)", fontWeight: 900, color: "white", fontFamily: "var(--font-heading)", lineHeight: 1.25, textShadow: "0 2px 12px rgba(0,0,0,0.7)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                    {blog.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <div style={{ width: 18, height: 18, borderRadius: 5, background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <span style={{ fontSize: 8, fontWeight: 900, color: "white" }}>CS</span>
                                  </div>
                                  <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em" }}>{t("brand")}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Link>

                        {/* Engagement bar + inline thread */}
                        <div className="px-4 pb-3">
                          <BlogCardActions
                            blogId={blog._id}
                            slug={blog.slug}
                            title={blog.title}
                            visitorId={visitorId}
                            engagement={engagement[blog._id] ?? EMPTY_ENGAGEMENT}
                            onEngagementChange={handleEngagementChange}
                            onToggleComments={() => toggleComments(blog._id)}
                            commentsOpen={commentsOpen}
                          />

                          <AnimatePresence initial={false}>
                            {commentsOpen && (
                              <motion.div
                                key="thread"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                style={{ overflow: "hidden" }}
                              >
                                <BlogComments
                                  blogId={blog._id}
                                  variant="feed"
                                  onCountChange={handleCommentCount}
                                />
                                <div className="pt-3 flex items-center justify-between gap-3">
                                  <Link
                                    href={`/blogs/${blog.slug}`}
                                    className="text-[12px] font-semibold hover:underline"
                                    style={{ color: "rgb(var(--accent-1))" }}
                                  >
                                    {t("readFullPost")} →
                                  </Link>
                                  <button
                                    onClick={() => toggleComments(blog._id)}
                                    className="text-[12px] font-semibold hover:underline"
                                    style={{ color: "rgb(var(--flow-text-soft))" }}
                                  >
                                    {t("hideComments")}
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.article>
                    )
                  })}
                </AnimatePresence>

                {/*
                  Scrolling past this pulls in the next batch. The button is a
                  real fallback, not decoration — if IntersectionObserver never
                  fires, it keeps the rest of the feed reachable.
                */}
                {hasMore && (
                  <div ref={sentinelRef} className="flex justify-center py-8">
                    <button
                      onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-colors hover:opacity-80"
                      style={{ background: "var(--flow-card)", border: "1px solid var(--flow-border-strong)", color: "rgb(var(--flow-text))" }}
                    >
                      <span className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: "rgb(var(--accent-1) / 0.25)", borderTopColor: "rgb(var(--accent-1))" }} aria-hidden />
                      {t("loadMore")}
                    </button>
                  </div>
                )}
                {!hasMore && filtered.length > PAGE_SIZE && (
                  <p className="text-center py-8 text-[13px] font-medium" style={{ color: "rgb(var(--flow-text-soft))" }}>
                    ✓ {t("allCaughtUp")}
                  </p>
                )}
              </motion.div>
            )}
          </div>

          {/* Right rail — trending */}
          <aside className="hidden xl:block w-[280px] shrink-0">
            <div className="sticky top-24 flex flex-col gap-4">
              <div className="rounded-2xl p-4" style={railCard}>
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="shrink-0 flex items-center justify-center rounded-xl text-[11px] font-black text-white"
                    style={{ width: 34, height: 34, background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
                    aria-hidden
                  >
                    CS
                  </div>
                  <span className="text-sm font-bold text-flow-text">{t("brand")}</span>
                </div>
                {/* Stats, not the subtitle — that already heads the feed column. */}
                <div className="flex items-center gap-5">
                  <span>
                    <span className="block text-lg font-bold leading-none text-flow-text">{blogs.length}</span>
                    <span className="block text-[11px] mt-1" style={{ color: "rgb(var(--flow-text-soft))" }}>
                      {t("postsLabel")}
                    </span>
                  </span>
                  <span>
                    <span className="block text-lg font-bold leading-none text-flow-text">{Math.max(0, categories.length - 1)}</span>
                    <span className="block text-[11px] mt-1" style={{ color: "rgb(var(--flow-text-soft))" }}>
                      {t("topicsLabel")}
                    </span>
                  </span>
                </div>
              </div>

              {trending.length > 0 && (
                <div className="rounded-2xl p-4" style={railCard}>
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "rgb(var(--flow-text-soft))" }}>
                    🔥 {t("trendingTitle")}
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {trending.map(b => (
                      <li key={b._id}>
                        <Link href={`/blogs/${b.slug}`} className="flex gap-2.5 group">
                          <span className="text-base leading-none shrink-0 mt-0.5" aria-hidden>
                            {CATEGORY_EMOJI[b.category] ?? "💡"}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[12.5px] font-semibold leading-snug line-clamp-2 text-flow-text transition-colors group-hover:text-aurora-1">
                              {b.title}
                            </span>
                            <span className="block text-[11px] mt-0.5" style={{ color: "rgb(var(--flow-text-soft))" }}>
                              {t(
                                (engagement[b._id]?.likes ?? 0) === 1 ? "likeCountOne" : "likesCount",
                                { count: engagement[b._id]?.likes ?? 0 }
                              )}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
