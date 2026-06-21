"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Pencil, Trash2, MapPin, Building2, Home, Users, Layers, Clock, Calendar, User } from "lucide-react"

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
  rooftopFeatures: string[]
  groundFloorFeatures: string[]
  coverImage: string
  images: string[]
  googleMapUrl: string
  createdAt: string
}

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

function formatBlogDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

const STATUS_COLOR: Record<string, string> = {
  Ongoing:   "#0066A2",
  Completed: "#16a34a",
  Upcoming:  "#B8892A",
}

const SPEC_ICONS: Record<string, React.ElementType> = {
  plotNo: MapPin,
  roadNo: MapPin,
  sector: MapPin,
  plotSize: Home,
  numberOfUnits: Users,
  buildingDetails: Layers,
  flatSize: Building2,
}

const SPEC_LABELS: Record<string, string> = {
  plotNo: "Plot No",
  roadNo: "Road No",
  sector: "Sector",
  plotSize: "Plot Size",
  numberOfUnits: "Number of Units",
  buildingDetails: "Building Details",
  flatSize: "Flat Size",
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    fetch(`/api/real-estate-projects/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { setProject(data); setLoading(false) })
      .catch(() => setLoading(false))

    fetch("/api/real-estate-blogs")
      .then(r => r.ok ? r.json() : [])
      .then(data => setBlogs(data))
      .catch(() => {})

    fetch("/api/auth/me")
      .then(r => r.json())
      .then(d => { if (d.authenticated) setIsAdmin(true) })
      .catch(() => {})
  }, [id])

  async function handleDelete() {
    if (!project || !confirm(`Delete "${project.name}"? This cannot be undone.`)) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/real-estate-projects/${project._id}`, { method: "DELETE" })
      if (res.ok) router.push("/real-estate/projects")
    } catch {}
    setDeleting(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-flow-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "rgba(0,102,162,0.2)", borderTopColor: "#0066A2" }} />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-flow-bg flex flex-col items-center justify-center gap-4">
        <h2 className="font-bold text-2xl text-flow-text">Project not found</h2>
        <Link href="/real-estate/projects" className="text-sm font-semibold" style={{ color: "#0066A2" }}>← Back to Projects</Link>
      </div>
    )
  }

  const specs = (["plotNo", "roadNo", "sector", "plotSize", "numberOfUnits", "buildingDetails", "flatSize"] as const)
    .filter(k => project[k])

  const allImages = [project.coverImage, ...(project.images ?? [])].filter(Boolean)

  const relatedBlogs = blogs.filter(blog => {
    const nameMatch = project.name && (
      blog.title.toLowerCase().includes(project.name.toLowerCase()) || 
      blog.tags?.some(t => t.toLowerCase() === project.name.toLowerCase())
    );
    const sectorMatch = project.sector && (
      blog.title.toLowerCase().includes(project.sector.toLowerCase()) || 
      blog.tags?.some(t => t.toLowerCase() === project.sector.toLowerCase())
    );
    const subtitleMatch = project.subtitle && (
      blog.title.toLowerCase().includes(project.subtitle.toLowerCase()) || 
      blog.tags?.some(t => t.toLowerCase() === project.subtitle.toLowerCase())
    );
    return nameMatch || sectorMatch || subtitleMatch;
  });

  const displayBlogs = [...relatedBlogs];
  for (const blog of blogs) {
    if (displayBlogs.length >= 3) break;
    if (!displayBlogs.some(b => b._id === blog._id)) {
      displayBlogs.push(blog);
    }
  }

  return (
    <main className="min-h-screen bg-flow-bg relative">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="aurora-blob animate-aurora" style={{ width: 700, height: 700, top: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(0,102,162,0.08), transparent 65%)" }} />
        <div className="aurora-blob animate-aurora-alt" style={{ width: 600, height: 600, bottom: "5%", right: "-8%", background: "radial-gradient(circle, rgba(184,137,42,0.06), transparent 65%)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-20">

        {/* ─── Nav ─── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8 sm:mb-12"
        >
          <Link href="/real-estate/projects" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-70" style={{ color: "#0066A2" }}>
            <ArrowLeft size={15} /> All Projects
          </Link>

          {isAdmin && (
            <div className="flex gap-2">
              <Link
                href={`/real-estate/projects/edit/${project._id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{ background: "rgba(0,102,162,0.1)", color: "#0066A2" }}
              >
                <Pencil size={12} /> Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{ background: "rgb(239 68 68 / 0.1)", color: "rgb(239 68 68)" }}
              >
                <Trash2 size={12} /> {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          )}
        </motion.div>

        {/* ─── Hero: image + title ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: title & status */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-6 self-start"
              style={{ background: STATUS_COLOR[project.status] ?? "#0066A2" }}
            >
              {project.status} Project
            </span>

            <h1 className="font-bold text-flow-text leading-tight mb-2" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "var(--font-heading)" }}>
              {project.name}
            </h1>

            {project.subtitle && (
              <p className="text-sm font-bold uppercase tracking-[0.25em] mb-6 opacity-60">{project.subtitle}</p>
            )}

            {project.description && (
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgb(var(--flow-text-soft))" }}>
                {project.description}
              </p>
            )}
          </motion.div>

          {/* Right: cover image */}
          {project.coverImage && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{ border: "1px solid var(--flow-border-strong)", minHeight: 280 }}
              onClick={() => setSelectedImage(project.coverImage)}
            >
              <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover" style={{ minHeight: 280 }} />
            </motion.div>
          )}
        </div>

        {/* ─── Specs table ─── */}
        {specs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-6 mb-10"
            style={{ border: "1px solid var(--flow-border-strong)" }}
          >
            <h2 className="font-bold text-base mb-5 uppercase tracking-widest" style={{ color: "#0066A2", fontSize: "0.75rem" }}>
              Project Details
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-6">
              {specs.map(key => {
                const Icon = SPEC_ICONS[key] ?? Building2
                return (
                  <div key={key}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest mb-1 opacity-50">{SPEC_LABELS[key]}</p>
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-flow-text">
                      <Icon size={13} style={{ color: "#0066A2", flexShrink: 0 }} />
                      {project[key]}
                    </p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* ─── Location Map ─── */}
        {(() => {
          const DHAKA_DEFAULT = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117964.97260849693!2d90.34937955!3d23.7806207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1718983200000!5m2!1sen!2sbd"
          const isEmbed = project.googleMapUrl?.includes("google.com/maps/embed")
          const mapSrc = isEmbed ? project.googleMapUrl : DHAKA_DEFAULT
          const hasCustomUrl = !!project.googleMapUrl

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mb-10"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: "#0066A2", fontSize: "0.75rem" }}>
                  <MapPin size={13} style={{ color: "#0066A2" }} />
                  Location
                  {!hasCustomUrl && (
                    <span className="text-[9px] font-normal opacity-40 normal-case tracking-normal">— Dhaka overview</span>
                  )}
                </h2>
                {hasCustomUrl && (
                  <a
                    href={project.googleMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold transition-opacity hover:opacity-70"
                    style={{ color: "#B8892A" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View on Google Maps
                  </a>
                )}
              </div>
              <div
                className="rounded-2xl overflow-hidden relative"
                style={{ border: "1px solid var(--flow-border-strong)", height: 360 }}
              >
                <iframe
                  key={mapSrc}
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={hasCustomUrl ? `${project.name} location` : "Dhaka, Bangladesh"}
                />
                {hasCustomUrl && !isEmbed && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: "var(--flow-surface)" }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,102,162,0.12)", border: "1px solid rgba(0,102,162,0.25)" }}>
                      <MapPin size={26} style={{ color: "#0066A2" }} />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: "#0066A2" }}>Tap to open on Google Maps</span>
                    <a
                      href={project.googleMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium px-4 py-2 rounded-full transition-opacity hover:opacity-80"
                      style={{ background: "rgba(0,102,162,0.12)", color: "#0066A2", border: "1px solid rgba(0,102,162,0.25)" }}
                    >
                      Open in Maps →
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })()}

        {/* ─── Features sections ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {project.rooftopFeatures?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass rounded-2xl p-6"
              style={{ border: "1px solid var(--flow-border-strong)" }}
            >
              <h2 className="font-bold mb-4 uppercase tracking-widest" style={{ color: "#B8892A", fontSize: "0.7rem" }}>
                Rooftop Features
              </h2>
              <ul className="space-y-2.5">
                {project.rooftopFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "rgb(var(--flow-text))" }}>
                    <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#B8892A" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {project.groundFloorFeatures?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="glass rounded-2xl p-6"
              style={{ border: "1px solid var(--flow-border-strong)" }}
            >
              <h2 className="font-bold mb-4 uppercase tracking-widest" style={{ color: "#0066A2", fontSize: "0.7rem" }}>
                Ground Floor Features
              </h2>
              <ul className="space-y-2.5">
                {project.groundFloorFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "rgb(var(--flow-text))" }}>
                    <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#0066A2" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* ─── Image gallery ─── */}
        {allImages.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10"
          >
            <h2 className="font-bold mb-5 uppercase tracking-widest" style={{ color: "rgb(var(--flow-text-soft))", fontSize: "0.7rem" }}>
              Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {allImages.map((url, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ aspectRatio: "4/3", border: "1px solid var(--flow-border)" }}
                  onClick={() => setSelectedImage(url)}
                >
                  <img src={url} alt={`${project.name} ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        )}


        {/* ─── Related/Latest Blogs ─── */}
        {displayBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-16 pt-12 border-t"
            style={{ borderColor: "var(--flow-border-strong)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-2 mb-3">
                  <span className="w-4 h-[2px]" style={{ background: "#B8892A" }} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em]" style={{ color: "#B8892A" }}>
                    Real Estate Insights
                  </span>
                </span>
                <h2 className="font-bold text-flow-text text-xl sm:text-2xl" style={{ fontFamily: "var(--font-heading)" }}>
                  Latest Articles &amp; Advice
                </h2>
              </div>
              <Link href="/real-estate/blogs" className="text-xs font-semibold hover:opacity-75 transition-opacity" style={{ color: "#0066A2" }}>
                View All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayBlogs.map(blog => (
                <article
                  key={blog._id}
                  className="glass rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
                  style={{ border: "1px solid var(--flow-border-strong)" }}
                >
                  {/* Cover */}
                  <Link href={`/real-estate/blogs/${blog.slug}`} className="block w-full overflow-hidden group" style={{ height: 160 }}>
                    {blog.coverImage ? (
                      <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center px-5 text-center transition-transform duration-500 group-hover:scale-105" style={{ background: "linear-gradient(135deg, rgba(184,137,42,0.15), rgba(0,102,162,0.15))" }}>
                        <span className="font-bold text-xs leading-snug line-clamp-3" style={{ color: "rgb(var(--flow-text-soft))" }}>
                          {blog.title}
                        </span>
                      </div>
                    )}
                  </Link>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="mb-2">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-white" style={{ background: "#B8892A" }}>
                        {blog.category}
                      </span>
                    </div>

                    <Link href={`/real-estate/blogs/${blog.slug}`} className="group">
                      <h3 className="font-bold text-flow-text mb-2 leading-snug line-clamp-2 text-sm sm:text-base transition-colors group-hover:text-[#0066A2]">
                        {blog.title}
                      </h3>
                    </Link>

                    <p className="text-xs leading-relaxed mb-4 line-clamp-2 flex-1" style={{ color: "rgb(var(--flow-text-soft))" }}>
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between gap-2 pt-3" style={{ borderTop: "1px solid var(--flow-border)" }}>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px]" style={{ color: "rgb(var(--flow-text-soft))" }}>
                        <span className="flex items-center gap-1"><User size={9} />{blog.author}</span>
                        <span className="flex items-center gap-1"><Clock size={9} />{blog.readTime}</span>
                      </div>
                      <Link href={`/real-estate/blogs/${blog.slug}`} className="text-[10px] font-semibold shrink-0" style={{ color: "#0066A2" }}>
                        Read →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* ─── Lightbox ─── */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-full rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white text-lg font-bold"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            ×
          </button>
        </div>
      )}
    </main>
  )
}
