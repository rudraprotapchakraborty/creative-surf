"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Send } from "lucide-react"
import { useT, useLocale, formatDateForLocale } from "@/lib/i18n"
import { blogsMessages } from "@/lib/i18n/messages/blogs"
import {
  MAX_COMMENT_LENGTH,
  MAX_NAME_LENGTH,
  type BlogComment,
} from "@/lib/blog-engagement-shared"

/**
 * Comment section for a blog post. Anchored at `#comments` so the Comment
 * button on a blog card can deep-link straight to it. No sign-in required —
 * a visitor supplies a display name with each comment.
 */
export default function BlogComments({ blogId }: { blogId: string }) {
  const t = useT(blogsMessages)
  const locale = useLocale()
  const [comments, setComments] = useState<BlogComment[] | null>(null)
  const [name, setName] = useState("")
  const [text, setText] = useState("")
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState("")
  const sectionRef = useRef<HTMLElement>(null)
  const didAnchorScroll = useRef(false)

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/blogs/${blogId}/comments`)
      setComments(res.ok ? await res.json() : [])
    } catch {
      setComments([])
    }
  }, [blogId])

  useEffect(() => { load() }, [load])

  /**
   * Deep links from a blog card arrive as `/blogs/<slug>#comments`. The native
   * anchor jump fires before the article body and this list have rendered, so
   * it lands short — scroll once the comments are in and the layout is final.
   */
  useEffect(() => {
    if (didAnchorScroll.current || comments === null) return
    if (window.location.hash !== "#comments") return
    didAnchorScroll.current = true
    // `html { scroll-behavior: smooth }` in globals.css drives the easing.
    sectionRef.current?.scrollIntoView({ block: "start" })
  }, [comments])

  // Remember the commenter's name so repeat visitors do not retype it.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("cs-commenter-name")
      if (saved) setName(prev => prev || saved)
    } catch {}
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedText = text.trim()
    if (!trimmedName || !trimmedText || posting) return

    setPosting(true)
    setError("")
    try {
      const res = await fetch(`/api/blogs/${blogId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, text: trimmedText }),
      })
      if (!res.ok) throw new Error("post failed")
      const created: BlogComment = await res.json()
      setComments(prev => [created, ...(prev ?? [])])
      setText("")
      try { window.localStorage.setItem("cs-commenter-name", trimmedName) } catch {}
    } catch {
      setError(t("commentFailed"))
    }
    setPosting(false)
  }

  const fieldStyle = {
    background: "rgb(var(--flow-border) / 0.5)",
    border: "1px solid var(--flow-border-strong)",
  }

  return (
    <section
      id="comments"
      ref={sectionRef}
      // Clears the fixed navbar when the page jumps to this anchor.
      style={{ borderTop: "1px solid var(--flow-border)", scrollMarginTop: 96 }}
      className="mt-8 pt-6 sm:pt-8"
    >
      <h2 className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: "rgb(var(--flow-text-soft))" }}>
        {t("commentsTitle")}
        {comments && comments.length > 0 && ` (${comments.length})`}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 mb-8">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={MAX_NAME_LENGTH}
          placeholder={t("yourName")}
          required
          className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none text-flow-text"
          style={fieldStyle}
        />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          maxLength={MAX_COMMENT_LENGTH}
          rows={4}
          placeholder={t("writeComment")}
          required
          className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none resize-y text-flow-text"
          style={fieldStyle}
        />
        {error && <p className="text-xs" style={{ color: "rgb(239 68 68)" }}>{error}</p>}
        <button
          type="submit"
          disabled={posting || !name.trim() || !text.trim()}
          className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
        >
          <Send size={14} />
          {posting ? t("posting") : t("postComment")}
        </button>
      </form>

      {comments === null && (
        <div className="flex justify-center py-6">
          <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: "rgb(var(--accent-1) / 0.2)", borderTopColor: "rgb(var(--accent-1))" }} />
        </div>
      )}

      {comments?.length === 0 && (
        <p className="text-sm" style={{ color: "rgb(var(--flow-text-soft))" }}>{t("noComments")}</p>
      )}

      {comments && comments.length > 0 && (
        <ul className="flex flex-col gap-5">
          {comments.map(c => (
            <li key={c._id} className="flex gap-3">
              <div
                className="shrink-0 flex items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ width: 36, height: 36, background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
                aria-hidden="true"
              >
                {c.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-sm font-bold text-flow-text">{c.name}</span>
                  <span className="text-[11px]" style={{ color: "rgb(var(--flow-text-soft))" }}>
                    {formatDateForLocale(c.createdAt, locale, { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mt-1 whitespace-pre-wrap break-words" style={{ color: "rgb(var(--flow-text-soft))" }}>
                  {c.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
