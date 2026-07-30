"use client"

import { useEffect, useState } from "react"
import { useT, useLocale, formatDateForLocale, type Locale } from "@/lib/i18n"
import { blogPostMessages } from "@/lib/i18n/messages/blogPost"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { blogMarkdownComponents } from "@/lib/blog-markdown"
import { normalizeBlogMarkdown } from "@/lib/blog-markdown-normalize"
import BlogSeoLinks from "@/components/blog/BlogSeoLinks"
import type { BlogRecord } from "@/lib/blog-db"
import { ArrowLeft, Clock, Calendar, User, Tag, Pencil, Trash2 } from "lucide-react"

const CATEGORY_COLOR = "rgb(var(--accent-1))"

const CATEGORY_EMOJI: Record<string, string> = {
  Strategy: "🎯", Marketing: "📈", Design: "🎨", SEO: "🔍",
  "Social Media": "📱", Content: "✍️", General: "💡", Technology: "⚡",
  Business: "💼", Branding: "🌟", UX: "🖥️", Analytics: "📊",
  Growth: "🚀", Copywriting: "🖊️", Advertising: "📣",
}

function formatDate(dateStr: string, locale: Locale) {
  return formatDateForLocale(dateStr, locale, { month: "long", day: "numeric", year: "numeric" })
}

export default function BlogPostClient({
  slug,
  initialBlog,
}: {
  slug: string
  initialBlog?: BlogRecord
}) {
  const t = useT(blogPostMessages)
  const locale = useLocale()
  const [blog, setBlog] = useState<BlogRecord | null>(initialBlog ?? null)
  const [loading, setLoading] = useState(!initialBlog)
  const [notFound, setNotFound] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!initialBlog) {
      fetch(`/api/blogs/${slug}`)
        .then(r => {
          if (!r.ok) { setNotFound(true); setLoading(false); return null }
          return r.json()
        })
        .then(data => { if (data) setBlog(data); setLoading(false) })
        .catch(() => { setNotFound(true); setLoading(false) })
    }

    fetch("/api/auth/me")
      .then(r => r.json())
      .then(d => { if (d.authenticated) setIsAdmin(true) })
      .catch(() => {})
  }, [slug, initialBlog])

  async function handleDelete() {
    if (!blog) return
    if (!confirm(t("confirmDelete"))) return
    await fetch(`/api/blogs/${blog._id}`, { method: "DELETE" })
    router.push("/blogs")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-flow-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "rgb(var(--accent-1) / 0.2)", borderTopColor: "rgb(var(--accent-1))" }} />
      </div>
    )
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-flow-bg flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="font-bold text-2xl sm:text-3xl text-flow-text">{t("notFound")}</h1>
        <Link href="/blogs" className="text-sm font-semibold" style={{ color: "rgb(var(--accent-1))" }}>{t("backToBlogs")}</Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-flow-bg">
      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="inline-block mb-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-white"
            style={{ background: CATEGORY_COLOR }}
          >
            {blog.category}
          </span>
          <h1
            className="font-bold text-flow-text leading-tight mb-4"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
          >
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm" style={{ color: "rgb(var(--flow-text-soft))" }}>
            <span className="flex items-center gap-1.5"><User size={12} />{blog.author}</span>
            <span className="flex items-center gap-1.5"><Clock size={12} />{blog.readTime}</span>
            <span className="flex items-center gap-1.5"><Calendar size={12} />{formatDate_CALL(blog.createdAt)}</span>
          </div>
        </motion.div>
      </div>

      {/* Action bar */}
      <div
        className="relative z-20 border-b"
        style={{ background: "var(--flow-card-strong)", borderColor: "var(--flow-border)", backdropFilter: "blur(16px)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "rgb(var(--flow-text))" }}
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">{t("backToBlogsShort")}</span>
            <span className="sm:hidden">{t("back")}</span>
          </Link>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <Link
                href={`/blogs/edit/${blog._id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background: "rgb(var(--accent-1) / 0.1)", color: "rgb(var(--accent-1))" }}
              >
                <Pencil size={12} /> {t("edit")}
              </Link>
              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background: "rgb(239 68 68 / 0.1)", color: "rgb(239 68 68)" }}
              >
                <Trash2 size={12} /> {t("delete")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cover image */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-2xl overflow-hidden"
          style={{ height: 300 }}
        >
          {blog.coverImage ? (
            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full relative overflow-hidden">
              {/* deep dark bg */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0d1117 0%, #1a1040 60%, #0d1b2a 100%)" }} />
              {/* dot grid */}
              <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
              {/* glow top-right */}
              <div className="absolute" style={{ width: 180, height: 180, borderRadius: "50%", background: "rgb(var(--accent-1) / 0.3)", filter: "blur(40px)", top: -40, right: -10 }} />
              {/* glow bottom-left */}
              <div className="absolute" style={{ width: 140, height: 140, borderRadius: "50%", background: "rgb(var(--accent-2) / 0.2)", filter: "blur(32px)", bottom: -20, left: -20 }} />
              {/* neon line 1 */}
              <div className="absolute" style={{ width: "200%", height: "1px", background: "linear-gradient(90deg, transparent, rgb(var(--accent-1) / 0.7), transparent)", top: "48%", left: "-50%", transform: "rotate(-5deg)" }} />
              {/* neon line 2 */}
              <div className="absolute" style={{ width: "200%", height: "1px", background: "linear-gradient(90deg, transparent, rgb(var(--accent-2) / 0.4), transparent)", top: "52%", left: "-50%", transform: "rotate(-5deg)" }} />
              {/* emoji right */}
              <div className="absolute" style={{ fontSize: "6rem", lineHeight: 1, right: "8%", top: "50%", transform: "translateY(-52%) rotate(8deg)", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))", userSelect: "none" }}>
                {CATEGORY_EMOJI[blog.category] ?? "💡"}
              </div>
              {/* content left */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                <span style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgb(var(--accent-1) / 0.9)" }}>{blog.category}</span>
                <div style={{ maxWidth: "60%" }}>
                  <span style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)", fontWeight: 900, color: "white", fontFamily: "var(--font-heading)", lineHeight: 1.25, textShadow: "0 2px 16px rgba(0,0,0,0.7)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {blog.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div style={{ width: 20, height: 20, borderRadius: 5, background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 9, fontWeight: 900, color: "white" }}>CS</span>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}>Creative Surf</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Article content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Excerpt */}
        {blog.excerpt && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 font-medium"
            style={{ color: "rgb(var(--flow-text-soft))", borderLeft: "3px solid rgb(var(--accent-1))", paddingLeft: "1.25rem" }}
          >
            {blog.excerpt}
          </motion.p>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={blogMarkdownComponents}>
            {normalizeBlogMarkdown(blog.content)}
          </ReactMarkdown>
        </motion.div>

        <BlogSeoLinks
          inboundLinks={blog.inboundLinks}
          outboundLinks={blog.outboundLinks}
          inboundTitle={t("seo.inbound")}
          outboundTitle={t("seo.outbound")}
        />

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="flex flex-wrap items-center gap-2 mt-10 sm:mt-12 pt-6 sm:pt-8"
            style={{ borderTop: "1px solid var(--flow-border)" }}
          >
            <Tag size={13} style={{ color: "rgb(var(--flow-text-soft))" }} />
            {blog.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: "rgb(var(--accent-1) / 0.08)", color: "rgb(var(--accent-1))" }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Back link */}
        <div className="mt-10 sm:mt-12 pt-5 sm:pt-6" style={{ borderTop: "1px solid var(--flow-border)" }}>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "rgb(var(--accent-1))" }}
          >
            <ArrowLeft size={14} />
            {t("backToAll")}
          </Link>
        </div>
      </div>
    </main>
  )
}
