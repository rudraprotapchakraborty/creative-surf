"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimatePresence, m as motion } from "framer-motion"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Eye, EyeOff, Save, X, Plus } from "lucide-react"
import { useT } from "@/lib/i18n"
import { editorMessages } from "@/lib/i18n/messages/editor"
import { editorUiMessages } from "@/lib/i18n/messages/editorUi"
import ImageUpload from "@/components/ui/ImageUpload"
import BlogRichTextEditor from "@/components/ui/BlogRichTextEditor"
import BlogSeoPanel from "@/components/ui/BlogSeoPanel"
import BlogKeyTakeawaysPanel from "@/components/ui/BlogKeyTakeawaysPanel"
import BlogKeyTakeaways from "@/components/blog/BlogKeyTakeaways"
import { blogMarkdownComponents } from "@/lib/blog-markdown"
import { normalizeBlogMarkdown } from "@/lib/blog-markdown-normalize"
import {
  DEFAULT_BLOG_SEO,
  getBlogLinkValidationMessage,
  normalizeKeyTakeaways,
  pickBlogSeoFields,
  sanitizeBlogSeoLinks,
  type BlogSeoFields,
} from "@/lib/blog-types"
import { LogoSpinner } from "@/components/ui/LogoSpinner"
import { commonMessages } from "@/lib/i18n/messages/common"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { JournalCover } from "./JournalParts"

interface BlogForm {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  authors: string[]
  readTime: string
  keyTakeaways: string[]
  coverImage: string
  metaDescription: string
  inboundLinks: BlogSeoFields["inboundLinks"]
  outboundLinks: BlogSeoFields["outboundLinks"]
}

const CATEGORIES = ["Digital Marketing", "Lead Generation", "AI & Creative", "Branding", "Video Production", "Web Development", "SEO", "Design", "UX", "Strategy", "General"]

const DEFAULT_FORM: BlogForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "General",
  tags: [],
  authors: ["Creative Surf"],
  readTime: "5 min read",
  keyTakeaways: [],
  coverImage: "",
  ...DEFAULT_BLOG_SEO,
}

/** Reads the writer list off a saved post, falling back to the legacy single `author` field. */
function toAuthorList(data: { authors?: unknown; author?: unknown }): string[] {
  const list = Array.isArray(data.authors)
    ? data.authors.map(String).map(a => a.trim()).filter(Boolean)
    : []
  if (list.length) return list
  const legacy = typeof data.author === "string" ? data.author.trim() : ""
  return legacy ? [legacy] : ["Creative Surf"]
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
  const t = useT(editorMessages)
  const tUi = useT(editorUiMessages)
  const tc = useT(commonMessages)
  const isEdit = !!blogId
  const [form, setForm] = useState<BlogForm>(DEFAULT_FORM)
  const [tagInput, setTagInput] = useState("")
  const [authorInput, setAuthorInput] = useState("")
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(isEdit)
  const [showSeoValidation, setShowSeoValidation] = useState(false)
  const [viewer, setViewer] = useState<{ sub: string; role: string } | null>(null)
  /** Owner of the post being edited — "" for a new post. */
  const [ownerId, setOwnerId] = useState("")
  const router = useRouter()

  // Auth guard — any signed-in account may write; the API is what actually
  // enforces who may edit an existing post.
  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.json())
      .then(d => {
        if (!d.authenticated) router.push("/login")
        else setViewer({ sub: d.user?.sub ?? "", role: d.role })
      })
      .catch(() => router.push("/login"))
  }, [router])

  // Load existing blog for edit
  useEffect(() => {
    if (!isEdit || !blogId) return
    fetch(`/api/blogs/${blogId}`)
      .then(r => r.json())
      .then(data => {
        const seo = pickBlogSeoFields(data)
        setForm({
          title: data.title ?? "",
          slug: data.slug ?? "",
          excerpt: data.excerpt ?? "",
          content: data.content ?? "",
          category: data.category ?? "General",
          tags: data.tags ?? [],
          authors: toAuthorList(data),
          readTime: data.readTime ?? "5 min read",
          keyTakeaways: normalizeKeyTakeaways(data.keyTakeaways),
          coverImage: data.coverImage ?? "",
          ...seo,
        })
        setOwnerId(typeof data.authorId === "string" ? data.authorId : "")
        setLoading(false)
      })
      .catch(() => { setError("Failed to load blog post."); setLoading(false) })
  }, [isEdit, blogId])

  /**
   * Don't sit in an editor whose Save the API will refuse. Mirrors
   * `canManageBlog` — admins edit anything, writers only their own, and posts
   * saved before ownership existed carry no `authorId` so they stay admin-only.
   */
  useEffect(() => {
    if (!isEdit || loading || !viewer) return
    const mayEdit = viewer.role === "admin" || (!!ownerId && ownerId === viewer.sub)
    if (!mayEdit) router.push("/blogs")
  }, [isEdit, loading, viewer, ownerId, router])

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

  function addAuthor(e: React.KeyboardEvent) {
    if ((e.key === "Enter" || e.key === ",") && authorInput.trim()) {
      e.preventDefault()
      const author = authorInput.trim().replace(/,+$/, "")
      if (author && !form.authors.includes(author)) {
        set("authors", [...form.authors, author])
      }
      setAuthorInput("")
    }
  }

  function removeAuthor(author: string) {
    set("authors", form.authors.filter(a => a !== author))
  }

  async function handleSave() {
    setError("")

    if (!form.title.trim()) { setError(t("errors.titleRequired")); return }
    if (!form.slug.trim()) { setError(t("errors.slugRequired")); return }
    if (!form.content.trim()) { setError(t("errors.contentRequired")); return }

    if (getBlogLinkValidationMessage(form.inboundLinks, form.outboundLinks)) {
      setShowSeoValidation(true)
      return
    }
    setShowSeoValidation(false)

    // Pick up a name typed but not yet committed with Enter.
    const authors = [...new Set([...form.authors, authorInput.trim()].filter(Boolean))]
    if (!authors.length) authors.push("Creative Surf")

    const payload = {
      ...form,
      authors,
      author: authors.join(", "),
      keyTakeaways: normalizeKeyTakeaways(form.keyTakeaways),
      published: true,
      inboundLinks: sanitizeBlogSeoLinks(form.inboundLinks),
      outboundLinks: sanitizeBlogSeoLinks(form.outboundLinks),
    }

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
        setError(d.error || t("errors.saveFailed"))
        setSaving(false)
        return
      }

      const saved = await res.json()
      router.push(`/blogs/${saved.slug}`)
    } catch {
      setError(t("errors.network"))
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cs-bg">
        <LogoSpinner size={56} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cs-bg text-cs-ink">
      <div className="cs-container pt-[5.25rem] sm:pt-24 lg:pt-[6.5rem]">
        {/* Dateline: the way back, what this is, and how long it reads. */}
        <div className="cs-meta flex items-center justify-between gap-6 border-b border-cs-ink/10 pb-4 text-cs-ink3">
          <Breadcrumbs
            structuredData={false}
            items={[{ label: tc("breadcrumb.blogs"), href: "/blogs" }, { label: isEdit ? t("editPost") : t("newPost") }]}
          />
          <p className="tabular-nums">
            {form.category}
            {form.readTime && (
              <>
                <span aria-hidden className="mx-2 opacity-50">·</span>
                {form.readTime}
              </>
            )}
          </p>
        </div>
      </div>

      <div className="cs-container pb-32 pt-10 sm:pt-14">
        {preview ? (
          /* ─── Preview: the post as a reader will see it ─── */
          <article className="mx-auto max-w-[46rem]">
            <p className="cs-meta text-cs-blue">{form.category}</p>
            <h1
              className="cs-display mt-5 text-cs-ink"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1, letterSpacing: "-0.05em" }}
            >
              {form.title || t("untitled")}
            </h1>
            {form.excerpt && <p className="cs-lede mt-6 text-cs-ink2">{form.excerpt}</p>}
            {form.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.coverImage} alt="" className="mt-10 aspect-[16/9] w-full rounded-lg object-cover" />
            )}
            <div className="mt-10">
              <BlogKeyTakeaways items={form.keyTakeaways} title={tUi("takeaways.label")} />
            </div>
            <div className="prose-blog">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={blogMarkdownComponents}>
                {normalizeBlogMarkdown(form.content) || t("noContent")}
              </ReactMarkdown>
            </div>
          </article>
        ) : (
          /* ─── Writing ─── */
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            {/* The manuscript */}
            <div className="min-w-0 space-y-8 lg:col-span-8">
              <label className="block">
                <span className="sr-only">{t("titlePlaceholder")}</span>
                {/* A textarea, so a long headline wraps the way it will on the page. */}
                <textarea
                  value={form.title}
                  onChange={e => handleTitleChange(e.target.value.replace(/\n/g, " "))}
                  placeholder={t("titlePlaceholder")}
                  rows={2}
                  className="block w-full resize-none bg-transparent font-medium text-cs-ink outline-none placeholder:text-cs-ink3/60"
                  style={{ fontSize: "clamp(2rem, 4.4vw, 3.5rem)", lineHeight: 1.04, letterSpacing: "-0.045em" }}
                />
              </label>

              <label className="block border-t border-cs-ink/10 pt-5">
                <span className="cs-meta mb-3 block text-cs-ink3">{t("excerptLabel")}</span>
                <textarea
                  value={form.excerpt}
                  onChange={e => set("excerpt", e.target.value)}
                  placeholder={t("excerptPlaceholder")}
                  rows={3}
                  className="cs-lede block w-full resize-none bg-transparent text-cs-ink2 outline-none placeholder:text-cs-ink3/60"
                />
              </label>

              <BlogKeyTakeawaysPanel frame="ruled" value={form.keyTakeaways} onChange={items => set("keyTakeaways", items)} />

              <div className="border-t border-cs-ink/10 pt-5">
                <p className="cs-meta mb-4 text-cs-ink3">{t("contentLabel")}</p>
                <div className="rounded-lg bg-cs-surface p-4 ring-1 ring-inset ring-cs-ink/10 sm:p-6">
                  <BlogRichTextEditor
                    value={form.content}
                    onChange={md => { set("content", md); set("readTime", calcReadTime(md)) }}
                    placeholder={t("contentPlaceholder")}
                    minHeight={420}
                  />
                </div>
              </div>
            </div>

            {/* The details, in the rail */}
            <aside className="space-y-8 lg:col-span-4 lg:pl-4">
              <label className="block border-t border-cs-ink/10 pt-5">
                <span className="cs-meta mb-3 block text-cs-ink3">{t("categoryLabel")}</span>
                <select
                  value={form.category}
                  onChange={e => set("category", e.target.value)}
                  className="cs-focus h-11 w-full rounded-[10px] bg-cs-surface px-3 text-[15px] text-cs-ink outline-none ring-1 ring-inset ring-cs-ink/15 focus:ring-2 focus:ring-cs-blue"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>

              <div className="border-t border-cs-ink/10 pt-5">
                <p className="cs-meta mb-3 text-cs-ink3">{t("coverImageLabel")}</p>
                <ImageUpload
                  value={form.coverImage}
                  onChange={v => set("coverImage", v)}
                  placeholder={<JournalCover category={form.category} brand="Creative Surf" />}
                />
              </div>

              <ChipField
                label={t("tagsLabel")}
                items={form.tags}
                onRemove={removeTag}
                input={tagInput}
                onInput={setTagInput}
                onKeyDown={addTag}
                placeholder={t("tagPlaceholder")}
              />

              <ChipField
                label={t("authorsLabel")}
                items={form.authors}
                onRemove={removeAuthor}
                input={authorInput}
                onInput={setAuthorInput}
                onKeyDown={addAuthor}
                placeholder={t("authorPlaceholder")}
              />

              <BlogSeoPanel
                frame="ruled"
                value={{
                  metaDescription: form.metaDescription,
                  inboundLinks: form.inboundLinks,
                  outboundLinks: form.outboundLinks,
                }}
                showValidation={showSeoValidation}
                onChange={seo => {
                  setShowSeoValidation(false)
                  setForm(prev => ({ ...prev, ...seo }))
                }}
              />
            </aside>
          </div>
        )}
      </div>

      {/* ─── Action bar: always within reach, never under the site header ─── */}
      <div className="sticky bottom-0 z-30 border-t border-cs-ink/10 bg-cs-bg/90 backdrop-blur-xl backdrop-saturate-150">
        <div className="cs-container flex items-center justify-between gap-4 py-3">
          <button
            type="button"
            onClick={() => setPreview(v => !v)}
            aria-pressed={preview}
            className="cs-focus inline-flex h-11 items-center gap-2 rounded-[10px] px-4 text-sm font-semibold text-cs-ink ring-1 ring-inset ring-cs-ink/15 transition-colors hover:bg-cs-ink/[0.04]"
          >
            {preview ? <EyeOff aria-hidden size={15} /> : <Eye aria-hidden size={15} />}
            {preview ? t("editorMode") : t("preview")}
          </button>

          <AnimatePresence>
            {error && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="hidden min-w-0 flex-1 items-center justify-center gap-2 text-sm text-red-600 dark:text-red-400 sm:flex"
              >
                <span className="truncate">{error}</span>
                <button type="button" onClick={() => setError("")} aria-label="×" className="cs-focus shrink-0 rounded-sm">
                  <X aria-hidden size={14} />
                </button>
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            aria-busy={saving || undefined}
            className="cs-focus inline-flex h-11 items-center gap-2 rounded-[10px] bg-cs-blue px-5 text-sm font-semibold text-cs-onBlue transition-colors hover:bg-cs-blueHover disabled:cursor-progress disabled:opacity-70"
          >
            {saving ? (
              <>
                <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" />
                {t("saving")}
              </>
            ) : (
              <>
                <Save aria-hidden size={15} />
                {isEdit ? t("updatePost") : t("publishPost")}
              </>
            )}
          </button>
        </div>
        {/* Phones: the error gets its own line under the controls. */}
        {error && (
          <p role="alert" className="cs-container pb-3 text-sm text-red-600 dark:text-red-400 sm:hidden">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

/** Tags and writers: chips you can remove, and a field that adds one on Enter. */
function ChipField({
  label,
  items,
  onRemove,
  input,
  onInput,
  onKeyDown,
  placeholder,
}: {
  label: string
  items: string[]
  onRemove: (item: string) => void
  input: string
  onInput: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  placeholder: string
}) {
  return (
    <div className="border-t border-cs-ink/10 pt-5">
      <p className="cs-meta mb-3 text-cs-ink3">{label}</p>
      {items.length > 0 && (
        <ul className="mb-3 flex flex-wrap gap-1.5">
          {items.map(item => (
            <li key={item} className="inline-flex items-center gap-1 rounded-md bg-cs-ink/[0.06] py-1 pl-2.5 pr-1 text-[13px] font-medium text-cs-ink">
              {item}
              <button
                type="button"
                onClick={() => onRemove(item)}
                aria-label={`${label}: ${item} ×`}
                className="cs-focus grid h-5 w-5 place-items-center rounded text-cs-ink3 transition-colors hover:text-cs-ink"
              >
                <X aria-hidden size={11} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <input
        type="text"
        value={input}
        onChange={e => onInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label={label}
        className="h-11 w-full rounded-[10px] bg-cs-surface px-3 text-[15px] text-cs-ink outline-none ring-1 ring-inset ring-cs-ink/15 placeholder:text-cs-ink3/70 focus:ring-2 focus:ring-cs-blue"
      />
    </div>
  )
}
