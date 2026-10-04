"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { useT, useLocale, formatDateForLocale, type Locale } from "@/lib/i18n"
import { blogsMessages } from "@/lib/i18n/messages/blogs"
import { commonMessages } from "@/lib/i18n/messages/common"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { Clock, LogIn, Plus } from "lucide-react"
import BlogCardActions from "@/components/blog/BlogCardActions"
import BlogComments from "@/components/blog/BlogComments"
import { EMPTY_ENGAGEMENT, type BlogEngagement } from "@/lib/blog-engagement-shared"
import { getVisitorId } from "@/lib/visitor-id"
import { cn } from "@/lib/utils"
import { ButtonLink, EASE, Meta } from "@/app/components/editorial"
import { FeedSkeleton, JournalCover, Monogram, PostMenu } from "./JournalParts"

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
  /** The owner's profile picture, attached by the API when the account has one. */
  authorAvatar?: string
}

/** How many posts render before the scroll sentinel pulls in the next batch. */
const PAGE_SIZE = 5

function formatDate(dateStr: string, locale: Locale) {
  return formatDateForLocale(dateStr, locale, { month: "short", day: "numeric", year: "numeric" })
}

/**
 * The blog as a journal: a masthead, one ruled row of topics, and the posts
 * as editorial entries — words on the left, the picture on the right — rather
 * than a stack of social-feed cards. Everything the feed did still works in
 * place: likes, shares, the inline comment thread, owners' edit and delete,
 * and the next batch arriving as you near the end.
 */
export default function BlogsPage() {
  const t = useT(blogsMessages)
  const tc = useT(commonMessages)
  const locale = useLocale()
  const still = useReducedMotion() ?? false
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [engagement, setEngagement] = useState<Record<string, BlogEngagement>>({})
  const [visitorId, setVisitorId] = useState("")
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  /** Signed-in account, or null when logged out. */
  const [viewer, setViewer] = useState<{ sub: string; name: string; avatar?: string } | null>(null)
  const [activeCategory, setActiveCategory] = useState("All")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({})
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef<HTMLDivElement>(null)

  /**
   * Compact age ("3h", "2d"). Anything older than about a month reads better
   * as a real date than as an ever-growing week count.
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
      setViewer({ sub: d.user?.sub ?? "", name: d.username || d.user?.name || "", avatar: d.user?.avatar })
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

  // One batched request for every post's like/comment counts, re-run once the
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

  // Switching topic restarts the feed at the top of the new list.
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

  /** Most-liked posts, for the rail. */
  const trending = useMemo(() => {
    return [...blogs]
      .sort((a, b) => (engagement[b._id]?.likes ?? 0) - (engagement[a._id]?.likes ?? 0))
      .slice(0, 4)
      .filter(b => (engagement[b._id]?.likes ?? 0) > 0)
  }, [blogs, engagement])

  const topicCount = Math.max(0, categories.length - 1)

  return (
    <div className="bg-cs-bg text-cs-ink">
      {/* ─── Masthead ─── */}
      <header className="pt-[5.25rem] sm:pt-24 lg:pt-[6.5rem]">
        <div className="cs-container">
          <motion.div
            initial={still ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="cs-meta flex items-center justify-between gap-6 border-b border-cs-ink/10 pb-4 text-cs-ink3"
          >
            <Breadcrumbs items={[{ label: tc("breadcrumb.blogs") }]} />
            {!loading && (
              <p className="tabular-nums">
                {blogs.length} {t("postsLabel")} <span aria-hidden className="mx-1.5 opacity-50">·</span> {topicCount}{" "}
                {t("topicsLabel")}
              </p>
            )}
          </motion.div>

          <div className="grid gap-y-8 pb-12 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-x-8 lg:pb-16 lg:pt-20">
            <div className="lg:col-span-8">
              <h1 className="overflow-hidden pb-[0.08em]">
                <motion.span
                  className="cs-display block text-cs-ink"
                  style={{ fontSize: "clamp(3rem, 8.4vw, 8rem)", lineHeight: 0.92, letterSpacing: "-0.055em" }}
                  initial={still ? false : { y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.05 }}
                >
                  {t("title")}
                </motion.span>
              </h1>
              <motion.p
                initial={still ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
                className="cs-lede mt-7 max-w-[36rem] text-cs-ink2"
              >
                {t("subtitle")}
              </motion.p>
            </div>

            {/* Posting: open to any signed-in account, and visible — not hidden —
                to everyone else, as a way in. */}
            <motion.div
              initial={still ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex items-end lg:col-span-4 lg:justify-end"
            >
              {viewer ? (
                <div className="flex items-center gap-4">
                  <Monogram name={viewer.name || t("brand")} src={viewer.avatar} size={40} />
                  <div>
                    <p className="text-sm text-cs-ink2">{t("composerPrompt")}</p>
                    <Link
                      href="/blogs/new"
                      className="cs-focus group mt-1 inline-flex items-center gap-1.5 rounded-sm text-[15px] font-semibold text-cs-blue"
                    >
                      <Plus aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                      <span className="cs-underline">{t("newPost")}</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <ButtonLink href="/login" variant="secondary" size="md" icon="none">
                  <span className="inline-flex items-center gap-2">
                    <LogIn aria-hidden className="h-4 w-4" />
                    {t("loginToPost")}
                  </span>
                </ButtonLink>
              )}
            </motion.div>
          </div>
        </div>
      </header>

      {/* ─── Topics ─── */}
      {categories.length > 1 && (
        <nav aria-label={t("categoriesTitle")} className="border-y border-cs-ink/10">
          <div className="cs-container">
            <ul className="-mx-2 flex flex-wrap gap-x-1 gap-y-1 py-3">
              {categories.map(cat => {
                const active = activeCategory === cat
                return (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      aria-pressed={active}
                      className={cn(
                        "cs-focus relative rounded-md px-2.5 py-2 text-sm font-medium tracking-[-0.01em] transition-colors duration-200",
                        active ? "text-cs-ink" : "text-cs-ink3 hover:text-cs-ink"
                      )}
                    >
                      {cat === "All" ? t("categoryAll") : cat}
                      {active && (
                        <motion.span
                          layoutId="journal-topic"
                          aria-hidden
                          className="absolute inset-x-2.5 bottom-0.5 h-[2px] rounded-full bg-cs-blue"
                          transition={still ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                        />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      )}

      {/* ─── Feed + rail ─── */}
      <div className="cs-container grid gap-y-16 pb-24 pt-4 lg:grid-cols-12 lg:gap-x-8 lg:pb-32">
        <section aria-label={t("title")} className="min-w-0 lg:col-span-8">
          {loading && <FeedSkeleton />}

          {!loading && filtered.length === 0 && (
            <div className="border-t border-cs-ink/10 py-20">
              <Meta>{t("emptyTitle")}</Meta>
              <p className="cs-h3 mt-6 max-w-[28rem] text-cs-ink">{viewer ? t("emptyAdmin") : t("emptyPublic")}</p>
              {viewer && (
                <div className="mt-8">
                  <ButtonLink href="/blogs/new">{t("writeFirst")}</ButtonLink>
                </div>
              )}
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <>
              <AnimatePresence initial={false}>
                {visible.map((blog, i) => {
                  const author = blog.author || t("brand")
                  const commentsOpen = Boolean(openComments[blog._id])
                  const lead = i === 0
                  return (
                    <motion.article
                      key={blog._id}
                      layout={still ? false : "position"}
                      initial={still ? false : { opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={still ? { opacity: 0 } : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.6, ease: EASE, delay: still ? 0 : (i % PAGE_SIZE) * 0.05 }}
                      aria-labelledby={`post-${blog._id}`}
                      className={cn("border-t border-cs-ink/10", lead ? "pb-12 pt-8" : "py-10")}
                    >
                      <div className={cn("grid gap-6 md:gap-8", lead ? "" : "md:grid-cols-[1fr_0.85fr]")}>
                        {/* Words */}
                        <div className={cn("min-w-0", lead ? "order-2" : "order-2 md:order-1")}>
                          <div className="flex items-start justify-between gap-4">
                            <p className="cs-meta flex flex-wrap items-center gap-x-2 gap-y-1 text-cs-ink3">
                              <button
                                type="button"
                                onClick={() => setActiveCategory(blog.category)}
                                className="cs-focus rounded-sm text-cs-blue transition-colors hover:text-cs-blueHover"
                              >
                                {blog.category}
                              </button>
                              <span aria-hidden className="opacity-50">/</span>
                              <time dateTime={blog.createdAt} title={formatDate(blog.createdAt, locale)}>
                                {relativeTime(blog.createdAt)}
                              </time>
                              {blog.readTime && (
                                <>
                                  <span aria-hidden className="opacity-50">/</span>
                                  <span className="inline-flex items-center gap-1">
                                    <Clock aria-hidden size={11} /> {blog.readTime}
                                  </span>
                                </>
                              )}
                            </p>
                            {canManage(blog) && (
                              <PostMenu
                                open={menuOpenId === blog._id}
                                onToggle={() => setMenuOpenId(menuOpenId === blog._id ? null : blog._id)}
                                editHref={`/blogs/edit/${blog._id}`}
                                onDelete={() => handleDelete(blog._id, blog.title)}
                                deleting={deletingId === blog._id}
                                labels={{ edit: t("edit"), delete: t("delete") }}
                              />
                            )}
                          </div>

                          <h2 id={`post-${blog._id}`} className="mt-4">
                            <Link
                              href={`/blogs/${blog.slug}`}
                              className="cs-focus rounded-sm font-medium text-cs-ink transition-colors duration-200 hover:text-cs-blue"
                              style={{
                                fontSize: lead ? "clamp(1.9rem, 3.6vw, 3.25rem)" : "clamp(1.45rem, 2.1vw, 1.875rem)",
                                lineHeight: 1.08,
                                letterSpacing: "-0.04em",
                                textWrap: "balance",
                              }}
                            >
                              {blog.title}
                            </Link>
                          </h2>

                          <p className={cn("mt-4 text-cs-ink2", lead ? "cs-lede max-w-[40rem]" : "line-clamp-3 text-[15px] leading-relaxed")}>
                            {blog.excerpt}
                          </p>

                          <p className="mt-5 flex items-center gap-2.5 text-sm font-medium text-cs-ink">
                            <Monogram name={author} src={blog.authorAvatar} size={26} />
                            {author}
                          </p>
                        </div>

                        {/* Picture */}
                        <Link
                          href={`/blogs/${blog.slug}`}
                          tabIndex={-1}
                          aria-hidden
                          className={cn(
                            "group relative block overflow-hidden rounded-lg bg-cs-sunken ring-1 ring-inset ring-cs-ink/[0.06]",
                            lead ? "order-1 aspect-[16/8]" : "order-1 aspect-[16/10] md:order-2"
                          )}
                        >
                          {blog.coverImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={blog.coverImage}
                              alt=""
                              loading={i < 2 ? "eager" : "lazy"}
                              decoding="async"
                              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
                            />
                          ) : (
                            <JournalCover category={blog.category} brand={t("brand")} />
                          )}
                        </Link>
                      </div>

                      {/* Engagement + inline thread */}
                      <div className="mt-6">
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
                              transition={{ duration: 0.3, ease: EASE }}
                              style={{ overflow: "hidden" }}
                            >
                              <BlogComments blogId={blog._id} variant="feed" onCountChange={handleCommentCount} />
                              <div className="flex items-center justify-between gap-3 pt-3">
                                <Link
                                  href={`/blogs/${blog.slug}`}
                                  className="cs-focus cs-underline rounded-sm text-[13px] font-semibold text-cs-blue"
                                >
                                  {t("readFullPost")} →
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => toggleComments(blog._id)}
                                  className="cs-focus rounded-sm text-[13px] font-semibold text-cs-ink3 transition-colors hover:text-cs-ink"
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
                <div ref={sentinelRef} className="flex justify-center border-t border-cs-ink/10 py-10">
                  <button
                    type="button"
                    onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                    className="cs-focus inline-flex h-11 items-center gap-2.5 rounded-[10px] border border-cs-ink/15 px-5 text-sm font-semibold text-cs-ink transition-colors hover:border-cs-ink/35"
                  >
                    <span
                      aria-hidden
                      className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-cs-ink/15 border-t-cs-blue motion-reduce:animate-none"
                    />
                    {t("loadMore")}
                  </button>
                </div>
              )}
              {!hasMore && filtered.length > PAGE_SIZE && (
                <p className="cs-meta border-t border-cs-ink/10 py-10 text-center text-cs-ink3">{t("allCaughtUp")}</p>
              )}
            </>
          )}
        </section>

        {/* ─── Rail ─── */}
        <aside className="hidden lg:col-span-3 lg:col-start-10 lg:block">
          <div className="sticky top-24 pt-8">
            <dl className="grid grid-cols-2 border-y border-cs-ink/10">
              {[
                { value: blogs.length, label: t("postsLabel") },
                { value: topicCount, label: t("topicsLabel") },
              ].map((stat, i) => (
                <div key={stat.label} className={cn("flex flex-col py-5", i > 0 && "border-l border-cs-ink/10 pl-5")}>
                  <dt className="order-2 mt-2 text-sm text-cs-ink2">{stat.label}</dt>
                  <dd className="order-1 text-[2.5rem] font-medium leading-none tabular-nums tracking-[-0.045em]">
                    {loading ? "—" : stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            {trending.length > 0 && (
              <div className="mt-10">
                <h2 className="cs-meta text-cs-ink">{t("trendingTitle")}</h2>
                <ol className="mt-4">
                  {trending.map((b, i) => (
                    <li key={b._id} className="border-t border-cs-ink/10 first:border-t-0">
                      <Link href={`/blogs/${b.slug}`} className="cs-focus group grid grid-cols-[1.75rem_1fr] gap-x-2 rounded-sm py-4">
                        <span className="cs-accent text-xl leading-none text-cs-cyan" aria-hidden>
                          {i + 1}
                        </span>
                        <span className="min-w-0">
                          <span className="line-clamp-2 text-[15px] font-medium leading-snug tracking-[-0.015em] text-cs-ink transition-colors group-hover:text-cs-blue">
                            {b.title}
                          </span>
                          <span className="cs-meta mt-1.5 block text-cs-ink3">
                            {t(
                              (engagement[b._id]?.likes ?? 0) === 1 ? "likeCountOne" : "likesCount",
                              { count: engagement[b._id]?.likes ?? 0 }
                            )}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
