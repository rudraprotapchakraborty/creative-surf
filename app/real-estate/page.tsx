"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import {
  motion, useScroll, useTransform, useInView, AnimatePresence,
  useMotionValue, animate,
} from "framer-motion"
import {
  Building2, Users, Handshake, Mail, Phone, ArrowUpRight, ArrowRight,
  Award, Shield, Lightbulb, Leaf, Star, CheckCircle,
  BarChart3, Headphones, Zap, Globe, TrendingUp,
} from "lucide-react"

/* ── palette ──────────────────────────────────────── */
const G  = "#B8892A"   // gold
const GL = "#D4A843"   // gold light
const B  = "#0066A2"   // cs blue
// theme-aware backgrounds use Tailwind flow-* classes, not hardcoded hex

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ── data ─────────────────────────────────────────── */


const objectives = [
  { icon: Building2, n: "01", title: "Digital Ecosystem",   body: "Build a dedicated platform for Dhaka developers to showcase residential and commercial projects at scale." },
  { icon: Lightbulb, n: "02", title: "Maximum Visibility",  body: "Leverage SEO, social media, and performance ads to deliver peak exposure for every listed property." },
  { icon: Users, n: "03", title: "Qualified Reach",     body: "Connect developers with land-share opportunities to the right buyers through intelligent audience targeting." },
  { icon: Award, n: "04", title: "Measurable ROI",      body: "Maintain the highest standard of creativity, transparency, and results for every partner." },
]

const testimonials = [
  {
    quote: "Creative Surf turned our listings into a steady pipeline of qualified buyers. The campaigns paid for themselves within the first month.",
    name: "Tanvir Ahmed",
    role: "Managing Director",
    project: "Skyline Developments",
  },
  {
    quote: "Professional photography, a dedicated microsite, and real analytics — finally a partner that understands both marketing and property.",
    name: "Nusrat Jahan",
    role: "Head of Sales",
    project: "Bashundhara Heights",
  },
  {
    quote: "Our project was live in 48 hours and fully booked ahead of schedule. The transparency and reporting are unmatched in Dhaka.",
    name: "Rafiqul Islam",
    role: "Chairman",
    project: "Green Meadows",
  },
]

const processSteps = [
  { step: "01", title: "Discover", body: "Share your project details — location, inventory, target audience. We analyze market demand and define your property's unique digital positioning." },
  { step: "02", title: "Design", body: "We build dedicated, SEO-optimized project microsites and craft premium ad campaigns tailored to your development." },
  { step: "03", title: "Deploy", body: "We launch targeted, high-performance campaigns across search and social channels to capture qualified buyer inquiries." },
  { step: "04", title: "Deliver", body: "We pass pre-qualified leads directly to your sales team, tracking conversions and optimizing until your inventory is fully booked." },
]

/* ── micro components ─────────────────────────────── */

function Tag({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE }}
      className="inline-flex items-center gap-2 mb-8"
    >
      <span className="w-5 h-[2px]" style={{ background: G }} />
      <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: G }}>{label}</span>
    </motion.div>
  )
}



/* ── page ─────────────────────────────────────────── */
export default function RealEstatePage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const imgY    = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const fade    = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const [activeTab, setActiveTab] = useState<'background' | 'message'>('background')

  type FeaturedProject = {
    _id: string; name: string; slug: string; subtitle?: string
    status: string; coverImage?: string
    plotNo?: string; roadNo?: string; sector?: string
  }
  const [featured, setFeatured] = useState<FeaturedProject[]>([])
  useEffect(() => {
    fetch("/api/real-estate-projects")
      .then((r) => (r.ok ? r.json() : []))
      .then((d: FeaturedProject[]) => setFeatured(Array.isArray(d) ? d.slice(0, 6) : []))
      .catch(() => {})
  }, [])

  return (
    <div className="bg-flow-bg" style={{ fontFamily: "var(--font-re)" }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes floatA  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-24px) rotate(4deg)} }
        @keyframes floatB  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(18px) rotate(-3deg)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes pulse   { 0%,100%{opacity:.15} 50%{opacity:.35} }
        @keyframes drawH   { from{width:0} to{width:100%} }
        @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .shimmer-gold {
          background: linear-gradient(90deg,${G},${GL},#F5D78E,${GL},${G});
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmer 4s linear infinite;
        }
        .font-serif-re {
          font-family: var(--font-re-display), "Fraunces", ui-serif, Georgia, serif;
          letter-spacing:-0.02em;
          font-feature-settings:"liga","ss01";
        }
        .float-a { animation:floatA 6s ease-in-out infinite; }
        .float-b { animation:floatB 8s ease-in-out infinite; }
        .float-badge { animation:floatBadge 6s ease-in-out infinite; }
        .spin-slow { animation:spin 20s linear infinite; }
        .pulse-shape { animation:pulse 4s ease-in-out infinite; }
        .perspective { perspective:1200px; }
        .glass-re {
          background: var(--flow-card-strong);
          backdrop-filter: blur(18px) saturate(150%);
          -webkit-backdrop-filter: blur(18px) saturate(150%);
        }
      `}</style>

      {/* ════════════════════════════════════════
          HERO — full screen, layered composition
      ════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        {/* background image with parallax */}
        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          <Image src="/real-estate-hero.png" alt="" fill className="object-cover object-right" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
        </motion.div>

        {/* floating ring decorations */}
        <div className="absolute top-32 left-[38%] w-64 h-64 rounded-full float-a pointer-events-none hidden sm:block" style={{ border: `1px solid ${G}20` }} />
        <div className="absolute bottom-24 left-[42%] w-40 h-40 rounded-full float-b pointer-events-none hidden sm:block" style={{ border: `1px solid ${G}30` }} />
        <div className="absolute top-40 left-[35%] w-8 h-8 rounded-full pulse-shape pointer-events-none hidden sm:block" style={{ background: `${G}30` }} />

        {/* content */}
        <motion.div
          className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-10 lg:px-20 xl:px-28 pt-24 pb-20"
          style={{ y: textY, opacity: fade }}
        >

          <Tag label="Creative Surf · Real Estate" />

          {/* headline */}
          <div className="mb-5">
            {["Build the project.", "Let us help it", "get discovered."].map((line, li) => (
              <motion.h1
                key={li}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 + li * 0.15 }}
                className="font-serif-re block font-medium leading-[1.04]"
                style={{ fontSize: "clamp(2.1rem, 4.2vw, 4.2rem)", color: li === 2 ? G : "white", fontStyle: li === 2 ? "italic" : "normal" }}
              >
                {line}
              </motion.h1>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="text-white/65 text-base leading-relaxed max-w-md mb-7"
          >
            Dhaka's dedicated digital platform connecting real estate developers
            with qualified buyers, investors, and land-share partners.
          </motion.p>

          {/* feature row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {[
              { icon: Building2,  lbl: "List your project" },
              { icon: Users,      lbl: "Reach buyers" },
              { icon: Handshake,  lbl: "Close deals" },
            ].map(({ icon: Icon, lbl }, i) => (
              <motion.div
                key={lbl}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1, ease: EASE }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium text-white/80"
                style={{ background: `${G}18`, border: `1px solid ${G}35` }}
              >
                <Icon className="w-4 h-4" style={{ color: G }} />
                {lbl}
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, ease: EASE }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white"
              style={{ background: `linear-gradient(135deg,${G},${GL})` }}
            >
              Get Listed Today
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link href="#about"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white/70 border"
              style={{ borderColor: `${G}40` }}
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/30">Scroll</span>
          <div className="w-[1px] h-10 overflow-hidden" style={{ background: `${G}30` }}>
            <motion.div
              className="w-full h-full"
              style={{ background: G }}
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>





      {/* ════════════════════════════════════════
          ABOUT — merged tab layout (exactly like Springfield)
      ════════════════════════════════════════ */}
      <section id="about" className="relative overflow-hidden py-24 md:py-32 px-6 sm:px-10 lg:px-20 xl:px-28 bg-flow-surface">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* left column — image container */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative lg:col-span-5"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/about.jpeg"
                  alt="About"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <div>
                    <div className="text-xs uppercase tracking-widest opacity-80">Portal</div>
                    <div className="font-serif-re text-2xl">Creative Surf</div>
                  </div>
                  <Link
                    href="/real-estate/projects"
                    className="grid place-items-center w-12 h-12 rounded-full bg-white/15 backdrop-blur-md hover:bg-white hover:text-zinc-900 transition-colors"
                    aria-label="View projects"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

            </motion.div>

            {/* right column — content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-7"
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: G, background: `${G}1a`, boxShadow: `0 0 0 1px ${G}33` }}
              >
                About us
              </span>
              <h2 className="mt-5 font-serif-re text-4xl md:text-5xl text-flow-text leading-[1.05] text-balance">
                Building the future of <span className="shimmer-gold italic">Dhaka Real Estate</span>.
              </h2>

              <div className="mt-8 inline-flex bg-flow-bg rounded-full p-1 border" style={{ borderColor: "var(--flow-border)" }}>
                <button
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeTab === 'background'
                      ? 'bg-flow-surface text-flow-text shadow-md border'
                      : 'text-flow-textSoft hover:text-flow-text'
                  }`}
                  style={{
                    borderColor: activeTab === 'background' ? 'var(--flow-border)' : 'transparent',
                  }}
                  onClick={() => setActiveTab('background')}
                >
                  Background
                </button>
                <button
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeTab === 'message'
                      ? 'bg-flow-surface text-flow-text shadow-md border'
                      : 'text-flow-textSoft hover:text-flow-text'
                  }`}
                  style={{
                    borderColor: activeTab === 'message' ? 'var(--flow-border)' : 'transparent',
                  }}
                  onClick={() => setActiveTab('message')}
                >
                  Message
                </button>
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 text-flow-textSoft font-light leading-relaxed"
              >
                {activeTab === 'background' ? (
                  <div className="space-y-5">
                    <p>
                      <strong className="text-flow-text font-medium">
                        Creative Surf Real Estate
                      </strong>{' '}
                      is a rapidly growing digital platform dedicated to connecting Dhaka's developers with qualified buyers and investors across every property type.
                    </p>
                    <p>
                      Our team merges digital marketing expertise with deep knowledge of Bangladesh's property market — crafting listings, running campaigns, and building the online presence that drives real enquiries. We are committed to quality, transparency, and measurable results.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4 pt-6">
                      {[
                        {
                          name: 'Digital Ecosystem',
                          desc: 'Build a dedicated platform for Dhaka developers to showcase residential and commercial projects at scale.',
                        },
                        {
                          name: 'Maximum Visibility',
                          desc: 'Leverage SEO, social media, and performance ads to deliver peak exposure for every listed property.',
                        },
                        {
                          name: 'Qualified Reach',
                          desc: 'Connect developers with land-share opportunities to the right buyers through intelligent audience targeting.',
                        },
                      ].map((g) => (
                        <div
                          key={g.name}
                          className="rounded-2xl border bg-flow-surface p-5"
                          style={{ borderColor: "var(--flow-border)" }}
                        >
                          <h4 className="font-semibold text-flow-text text-sm mb-2">
                            {g.name}
                          </h4>
                          <p className="text-xs leading-relaxed text-flow-textSoft">{g.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-3xl border p-8 md:p-10" style={{ borderColor: `${G}33`, background: `linear-gradient(135deg, ${G}06, ${B}06)` }}>
                    <p className="font-serif-re italic text-2xl md:text-3xl text-flow-text leading-snug">
                      &ldquo;To become Bangladesh's most trusted digital gateway for real estate discovery — making property transactions transparent, accessible, and inspiring for developers and buyers alike.&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full grid place-items-center text-white font-bold" style={{ background: `linear-gradient(135deg, ${G}, ${GL})` }}>
                        CS
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-flow-text">
                          Creative Surf Real Estate
                        </div>
                        <div className="text-xs text-flow-textSoft">
                          Vision & Mission Statement
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ════════════════════════════════════════
          OBJECTIVES — card grid (exactly like Springfield's Why Springfield)
      ════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 sm:px-10 lg:px-20 xl:px-28 bg-flow-bg/65 backdrop-blur-md">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: G, background: `${G}1a`, boxShadow: `0 0 0 1px ${G}33` }}
            >
              Our Objectives
            </span>
            <h2 className="mt-5 font-serif-re text-4xl md:text-5xl text-flow-text leading-tight text-balance">
              What We Set Out <span className="shimmer-gold italic">To Achieve</span>
            </h2>
            <p className="mt-4 text-flow-textSoft text-lg">
              Four pillars of excellence driving digital results for our developer partners across Bangladesh.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.12 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {objectives.map((w, i) => (
              <motion.div
                key={w.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
                }}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl p-8 border shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                style={{ background: "var(--flow-surface)", borderColor: "var(--flow-border)" }}
              >
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl group-hover:bg-[#B8892A]/12 transition-colors duration-500" style={{ background: `${G}06` }} />
                <div className="relative z-10">
                  <span className="inline-grid place-items-center w-12 h-12 rounded-2xl mb-5" style={{ background: `${G}1a`, color: G }}>
                    <w.icon size={22} />
                  </span>
                  <h3 className="text-lg font-bold text-flow-text mb-2 group-hover:text-[#D4A843] transition-colors duration-300">
                    {w.title}
                  </h3>
                  <p className="text-sm text-flow-textSoft leading-relaxed">
                    {w.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ════════════════════════════════════════
          FEATURED PROJECTS — image showcase grid
      ════════════════════════════════════════ */}
      {featured.length > 0 && (
        <section className="relative overflow-hidden py-14 md:py-20 px-6 sm:px-10 lg:px-20 xl:px-28 bg-flow-surface">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <Tag label="Selected Works" />
              <h2 className="font-serif-re font-medium text-flow-text" style={{ fontSize: "clamp(2.1rem,3.8vw,3.5rem)" }}>
                Projects That <span className="shimmer-gold italic">Define Us</span>
              </h2>
            </div>
            <Link
              href="/real-estate/projects"
              className="group inline-flex items-center gap-2 text-sm font-semibold shrink-0"
              style={{ color: G }}
            >
              View all projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featured.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <Link
                  href={`/real-estate/projects/${p.slug}`}
                  className="group relative block overflow-hidden rounded-3xl aspect-[4/5] shadow-xl"
                  style={{ background: "#0a0a0a" }}
                >
                  {p.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.coverImage}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg,${G}22,${B}22)` }}>
                      <Building2 className="w-12 h-12" style={{ color: `${G}88` }} />
                    </div>
                  )}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 45%, transparent 75%)" }} />
                  <div className="relative h-full flex flex-col justify-end p-6 text-white">
                    <span
                      className="self-start mb-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em]"
                      style={{ background: `${G}cc`, color: "#fff" }}
                    >
                      {p.status}
                    </span>
                    <h3 className="font-serif-re font-medium text-2xl leading-tight">{p.name}</h3>
                    {(p.plotNo || p.roadNo || p.sector) && (
                      <p className="text-sm text-white/65 mt-1 line-clamp-1">
                        {[p.plotNo && `Plot-${p.plotNo}`, p.roadNo && `Rd-${p.roadNo}`, p.sector && `Sec-${p.sector}`].filter(Boolean).join(", ")}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold opacity-90 group-hover:gap-3 transition-all">
                      Discover <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}


      {/* ════════════════════════════════════════
          THE PROCESS — campaign pipeline
      ════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 sm:px-10 lg:px-20 xl:px-28 bg-gradient-to-br from-zinc-950 to-[#040b18] text-white overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-55" style={{ backgroundImage: 'radial-gradient(rgba(184, 137, 42, 0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div aria-hidden className="absolute -top-32 -left-20 w-[36rem] h-[36rem] rounded-full bg-[#B8892A]/10 blur-3xl pointer-events-none" />
        <div aria-hidden className="absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-[#0066A2]/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-2xl mb-16"
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: G, background: `${G}1a`, boxShadow: `0 0 0 1px ${G}33` }}
            >
              The process
            </span>
            <h2 className="font-serif-re mt-5 text-4xl md:text-5xl leading-tight text-balance text-white">
              From onboarding to sold out, in four considered steps.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {processSteps.map((s) => (
              <motion.div
                key={s.step}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                }}
                className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-7 hover:border-[#B8892A]/40 transition-colors duration-300"
              >
                <span className="font-serif-re text-5xl text-white/15 transition-colors duration-300 group-hover:text-[#B8892A]">
                  {s.step}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          TESTIMONIALS — partner voices
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-14 md:py-20 px-6 sm:px-10 lg:px-20 xl:px-28 bg-flow-bg">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex justify-center">
            <Tag label="Partner Voices" />
          </div>
          <h2 className="font-serif-re font-medium text-flow-text" style={{ fontSize: "clamp(2.1rem,3.8vw,3.5rem)" }}>
            Trusted by Dhaka's <span className="shimmer-gold italic">Best Developers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="relative rounded-3xl p-8 overflow-hidden"
              style={{ background: "var(--flow-surface)", border: `1px solid ${G}1f` }}
            >
              <span aria-hidden className="font-serif-re absolute top-5 right-7 text-7xl leading-none select-none" style={{ color: `${G}1f` }}>&ldquo;</span>
              <div className="flex items-center gap-1 mb-4">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="w-4 h-4" style={{ color: GL, fill: GL }} />
                ))}
              </div>
              <blockquote className="relative text-flow-textSoft leading-relaxed text-[0.95rem] italic">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-6 flex items-center gap-3" style={{ borderTop: `1px solid ${G}1f` }}>
                <div className="grid place-items-center w-11 h-11 rounded-full text-white font-bold shrink-0" style={{ background: `linear-gradient(135deg,${G},${GL})` }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-flow-text">{t.name}</div>
                  <div className="text-xs text-flow-textSoft">{t.role} · {t.project}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>



    </div>
  )
}
