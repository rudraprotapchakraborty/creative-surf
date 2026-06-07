"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import {
  Building2, Users, Handshake, Mail, Phone, ArrowUpRight, ArrowRight,
  Award, Shield, Lightbulb, Leaf, Star, CheckCircle,
  BarChart3, Headphones, Zap, Globe, TrendingUp, ChevronRight,
} from "lucide-react"
import { Facebook, Linkedin, Instagram } from "lucide-react"

/* ── palette ──────────────────────────────────────── */
const G  = "#B8892A"   // gold
const GL = "#D4A843"   // gold light
const B  = "#0066A2"   // cs blue
// theme-aware backgrounds use Tailwind flow-* classes, not hardcoded hex

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ── data ─────────────────────────────────────────── */
const stats = [
  { val: 200, sfx: "+",  lbl: "Projects Listed" },
  { val: 50,  sfx: "+",  lbl: "Developer Partners" },
  { val: 10,  sfx: "K+", lbl: "Qualified Buyers" },
  { val: 98,  sfx: "%",  lbl: "Client Satisfaction" },
]

const objectives = [
  { n: "01", title: "Digital Ecosystem",   body: "Build a dedicated platform for Dhaka developers to showcase residential and commercial projects at scale." },
  { n: "02", title: "Maximum Visibility",  body: "Leverage SEO, social media, and performance ads to deliver peak exposure for every listed property." },
  { n: "03", title: "Qualified Reach",     body: "Connect developers with land-share opportunities to the right buyers through intelligent audience targeting." },
  { n: "04", title: "Measurable ROI",      body: "Maintain the highest standard of creativity, transparency, and results for every partner." },
]

const values = [
  { icon: Lightbulb, title: "Innovation",     desc: "We constantly evolve our strategies to stay ahead of market trends.", size: "large" },
  { icon: Award,     title: "Excellence",     desc: "Outstanding quality in every listing and interaction.", size: "small" },
  { icon: Shield,    title: "Integrity",      desc: "Full transparency in every partnership.", size: "small" },
  { icon: Star,      title: "Client Success", desc: "Your project's success is our ultimate metric.", size: "small" },
  { icon: Leaf,      title: "Sustainability", desc: "We promote responsible, green development.", size: "small" },
  { icon: Users,     title: "Collaboration",  desc: "We work as a true extension of your team.", size: "large" },
]

const features = [
  { icon: CheckCircle, n: "01", title: "Verified Listings",  desc: "Every property verified with professional photography, accurate floor data, and quality-checked copy." },
  { icon: TrendingUp,  n: "02", title: "Targeted Reach",     desc: "Data-driven campaigns that find qualified buyers and investors actively searching in Dhaka." },
  { icon: Globe,       n: "03", title: "Expert Team",        desc: "Specialists in both digital marketing and Bangladesh's real estate landscape." },
  { icon: BarChart3,   n: "04", title: "Live Analytics",     desc: "Real-time dashboards tracking every impression, click, and conversion." },
  { icon: Headphones,  n: "05", title: "Dedicated Support",  desc: "A personal account manager for every developer partner — one point of contact." },
  { icon: Zap,         n: "06", title: "Fast Onboarding",    desc: "Get your project listed and live in 48 hours. We do the heavy lifting." },
]

const services = [
  {
    num: "01", title: "Listing & Management", accent: B,
    tagline: "Your property, professionally presented.",
    items: [
      { sub: "Professional Listings", text: "Photography, floor plans, virtual tours, and compelling copy that converts browsers into buyers." },
      { sub: "Project Microsites",    text: "Dedicated SEO-optimised landing pages built to capture and convert leads at scale." },
    ],
  },
  {
    num: "02", title: "Digital Campaigns", accent: G,
    tagline: "Reach buyers where they actually look.",
    items: [
      { sub: "Search & Social Ads", text: "Targeted Google, Facebook, and Instagram campaigns reaching qualified buyers at the right moment." },
      { sub: "SEO & Content",       text: "Long-term organic visibility through keyword strategy and local SEO that drives high-intent traffic." },
    ],
  },
  {
    num: "03", title: "Brand & Analytics", accent: "#22c55e",
    tagline: "Build trust. Measure everything.",
    items: [
      { sub: "Developer Branding",   text: "A trusted online identity — logo, brand voice, social presence, and reputation management." },
      { sub: "Performance Reports",  text: "Monthly deep-dive reports with actionable insights on reach, engagement, and conversions." },
    ],
  },
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

function Counter({ val, sfx }: { val: number; sfx: string }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let c = 0
    const step = val / 50
    const t = setInterval(() => {
      c += step
      if (c >= val) { setN(val); clearInterval(t) } else setN(Math.floor(c))
    }, 30)
    return () => clearInterval(t)
  }, [inView, val])
  return <span ref={ref}>{n}{sfx}</span>
}

/* ── page ─────────────────────────────────────────── */
export default function RealEstatePage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const imgY    = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const fade    = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const [activeService, setActiveService] = useState(0)

  return (
    <div className="bg-flow-bg" style={{ fontFamily: "var(--font-re)" }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes floatA  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-24px) rotate(4deg)} }
        @keyframes floatB  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(18px) rotate(-3deg)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes pulse   { 0%,100%{opacity:.15} 50%{opacity:.35} }
        @keyframes drawH   { from{width:0} to{width:100%} }
        .shimmer-gold {
          background: linear-gradient(90deg,${G},${GL},#F5D78E,${GL},${G});
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmer 4s linear infinite;
        }
        .float-a { animation:floatA 6s ease-in-out infinite; }
        .float-b { animation:floatB 8s ease-in-out infinite; }
        .spin-slow { animation:spin 20s linear infinite; }
        .pulse-shape { animation:pulse 4s ease-in-out infinite; }
        .perspective { perspective:1200px; }
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
                className="block font-bold leading-[1.05]"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3.8rem)", color: li === 2 ? G : "white" }}
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
          ABOUT — overlapping editorial layout
      ════════════════════════════════════════ */}
      <section id="about" className="relative overflow-hidden py-16 md:py-28 px-6 sm:px-10 lg:px-20 xl:px-28 bg-flow-surface">
        {/* giant decorative number behind everything */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute -top-8 -right-8 font-black select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(140px,22vw,280px)", color: `${G}06`, fontFamily: "var(--font-re)" }}
        >01</motion.div>

        <div className="relative z-10 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          {/* left — text content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <Tag label="About the Platform" />
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
              className="font-bold leading-tight text-flow-textmb-8"
              style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)" }}
            >
              Where Developers <br />
              <span className="shimmer-gold">Meet Their Buyers</span>
            </motion.h2>

            {[
              "Creative Surf Real Estate is a rapidly growing digital platform dedicated to connecting Dhaka's developers with qualified buyers and investors across every property type.",
              "Our team merges digital marketing expertise with deep knowledge of Bangladesh's property market — crafting listings, running campaigns, and building the online presence that drives real enquiries.",
              "We are committed to quality, transparency, and measurable results. Your vision, combined with our expertise, creates the perfect balance between reach and results.",
            ].map((p, i) => (
              <motion.p
                key={i}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
                className="text-flow-textSoft leading-relaxed mb-5 text-[0.95rem]"
              >{p}</motion.p>
            ))}

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }}
              className="mt-8"
            >
              <Link href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: G }}
              >
                Start a conversation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* right — image with layered gold frame */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="relative"
          >
            {/* offset gold frame behind */}
            <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl" style={{ border: `1px solid ${G}40` }} />
            {/* image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image src="/about.jpeg" alt="About" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-flow-surface/40 to-transparent" />
            </div>
            {/* floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
              className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-md bg-flow-surface border"
              style={{ borderColor: `${G}35` }}
            >
              <div className="text-2xl font-black shimmer-gold">200+</div>
              <div className="text-xs text-flow-textSoft uppercase tracking-wider mt-0.5">Projects Delivered</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          OBJECTIVES — full-width numbered rows
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 bg-flow-bg">
        {/* background label */}
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
          <span className="font-black opacity-[0.025] text-flow-textleading-none" style={{ fontSize: "clamp(80px,15vw,180px)" }}>
            OBJECTIVES
          </span>
        </div>

        <div className="relative z-10 px-6 sm:px-10 lg:px-20 xl:px-28 mb-16">
          <Tag label="Our Objectives" />
          <h2 className="font-bold text-flow-text" style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)" }}>
            What We Set Out <span className="shimmer-gold">To Achieve</span>
          </h2>
        </div>

        <div className="relative z-10">
          {objectives.map(({ n, title, body }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              className="group relative flex items-start gap-4 sm:gap-8 lg:gap-16 px-6 sm:px-10 lg:px-20 xl:px-28 py-8 sm:py-10 border-t cursor-default transition-colors duration-300 hover:bg-flow-card"
              style={{ borderColor: `${G}15` }}
            >
              {/* animated left accent on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" style={{ background: `linear-gradient(180deg,${G},transparent)` }} />

              {/* large number */}
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 + 0.2 }}
                className="flex-shrink-0 font-black leading-none select-none"
                style={{ fontSize: "clamp(2.5rem,7vw,7rem)", color: `${G}22` }}
              >{n}</motion.span>

              {/* content */}
              <div className="flex-1 pt-3 lg:flex lg:items-start lg:gap-12">
                <h3
                  className="font-bold text-flow-texttext-xl lg:text-2xl mb-3 lg:mb-0 lg:w-64 flex-shrink-0 group-hover:text-[#D4A843] transition-colors duration-300"
                >{title}</h3>
                <p className="text-flow-textSoft leading-relaxed flex-1">{body}</p>
              </div>

              {/* arrow on hover */}
              <ChevronRight
                className="hidden sm:block flex-shrink-0 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                style={{ color: G }}
                size={20}
              />
            </motion.div>
          ))}
          <div className="border-t mx-6 sm:mx-10 lg:mx-20 xl:mx-28" style={{ borderColor: `${G}15` }} />
        </div>
      </section>

      {/* ════════════════════════════════════════
          VISION — full-bleed typographic
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-flow-surface">
        {/* blob decorations */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: `${G}10` }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: `${B}10` }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-20 py-16 lg:py-32 text-center">
          <Tag label="Our Vision" />

          {/* giant quote mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-black leading-none mb-4 select-none"
            style={{ fontSize: "clamp(6rem,15vw,12rem)", color: `${G}15`, lineHeight: 0.8 }}
          >"</motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="font-semibold text-flow-text/85 leading-snug mb-10"
            style={{ fontSize: "clamp(1.5rem,3vw,2.5rem)" }}
          >
            To become Bangladesh's most trusted digital gateway for real estate discovery — making property transactions
            <span className="shimmer-gold"> transparent, accessible, and inspiring</span> for developers and buyers alike.
          </motion.blockquote>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            className="h-[1px] w-24 mx-auto mb-6 origin-center"
            style={{ background: G }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-xs uppercase tracking-[0.3em] font-bold"
            style={{ color: `${G}80` }}
          >Creative Surf Real Estate</motion.p>
        </div>

        {/* mission strip attached below */}
        <div className="relative z-10 border-t" style={{ borderColor: `${G}15` }}>
          <div className="grid lg:grid-cols-[280px_1fr] gap-0">
            {/* left label */}
            <div className="flex items-center justify-center px-10 py-10 lg:py-12 border-b lg:border-b-0 lg:border-r" style={{ borderColor: `${G}15` }}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ border: `1px solid ${G}50` }}>
                  <TrendingUp className="w-7 h-7" style={{ color: G }} />
                </div>
                <div className="text-xs uppercase tracking-[0.25em] font-bold" style={{ color: G }}>Our Mission</div>
              </div>
            </div>
            {/* right text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="px-6 sm:px-10 lg:px-12 py-10 lg:py-12 flex items-center"
            >
              <p className="text-flow-textSoft text-lg leading-relaxed max-w-3xl">
                To empower real estate developers across Dhaka with world-class digital marketing tools and a dedicated platform that delivers measurable results — connecting the right properties with the right buyers at exactly the right time, every time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CORE VALUES — bento grid
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 md:py-24 px-6 sm:px-10 lg:px-20 xl:px-28 bg-flow-bg">
        <div className="relative z-10 mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <Tag label="Core Values" />
            <h2 className="font-bold text-flow-text" style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)" }}>
              The Principles<br /><span className="shimmer-gold">That Define Us</span>
            </h2>
          </div>
          <p className="text-flow-textSoft/70 text-sm max-w-xs lg:text-right leading-relaxed">
            Every decision, every campaign, every result — anchored to these values.
          </p>
        </div>

        {/* bento grid */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map(({ icon: Icon, title, desc, size }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className={`group relative rounded-2xl p-7 cursor-default overflow-hidden ${size === "large" ? "lg:col-span-1 lg:row-span-2" : ""}`}
              style={{
                background: "var(--flow-surface)",
                border: `1px solid ${G}18`,
              }}
            >
              {/* hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ boxShadow: `inset 0 0 40px ${G}10`, background: `radial-gradient(circle at 50% 0%,${G}08,transparent 70%)` }} />

              {/* icon */}
              <motion.div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${G}18`, border: `1px solid ${G}30` }}
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Icon className="w-5 h-5" style={{ color: G }} />
              </motion.div>

              <h3 className="font-bold text-flow-texttext-base mb-3 group-hover:text-[#D4A843] transition-colors duration-300">{title}</h3>
              <p className="text-flow-textSoft text-sm leading-relaxed">{desc}</p>

              {/* corner decoration on large cards */}
              {size === "large" && (
                <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full opacity-20 spin-slow pointer-events-none"
                  style={{ border: `1px dashed ${G}` }} />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY CHOOSE US — alternating feature rows
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 bg-flow-surface">
        <div className="px-6 sm:px-10 lg:px-20 xl:px-28 mb-16">
          <Tag label="Why Choose Us" />
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-bold text-flow-text" style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)" }}>
              What Sets Us <span className="shimmer-gold">Apart</span>
            </h2>
            <p className="text-flow-textSoft/70 text-sm max-w-xs lg:text-right leading-relaxed">
              Choosing the right digital partner is critical. Here is what Creative Surf delivers.
            </p>
          </div>
        </div>

        <div>
          {features.map(({ icon: Icon, n, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="group flex items-start gap-4 sm:gap-8 lg:gap-16 px-6 sm:px-10 lg:px-20 xl:px-28 py-8 sm:py-10 border-t transition-colors duration-300 hover:bg-flow-card cursor-default"
              style={{ borderColor: `${G}12` }}
            >
              {/* number */}
              <span className="flex-shrink-0 font-black text-sm mt-1" style={{ color: `${G}50` }}>{n}</span>

              {/* icon circle */}
              <motion.div
                className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: `${G}15`, border: `1px solid ${G}30` }}
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="w-5 h-5" style={{ color: G }} />
              </motion.div>

              {/* text */}
              <div className="flex-1 lg:flex lg:items-start lg:gap-12">
                <h3 className="font-bold text-flow-texttext-lg lg:text-xl mb-2 lg:mb-0 lg:w-56 flex-shrink-0 group-hover:text-[#D4A843] transition-colors duration-300">{title}</h3>
                <p className="text-flow-textSoft leading-relaxed flex-1">{desc}</p>
              </div>

              {/* right accent line on hover */}
              <div className="hidden sm:block flex-shrink-0 w-8 h-[1px] mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: G }} />
            </motion.div>
          ))}
          <div className="border-t mx-6 sm:mx-10 lg:mx-20 xl:mx-28" style={{ borderColor: `${G}12` }} />
        </div>
      </section>

      {/* ════════════════════════════════════════
          SERVICES — vertical tab selector
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-8 lg:px-20 xl:px-28 bg-flow-bg">
        <div className="mb-16">
          <Tag label="Our Services" />
          <h2 className="font-bold text-flow-text" style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)" }}>
            Everything You Need <span className="shimmer-gold">To Get Found</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-4 lg:gap-8 perspective">
          {/* tab list */}
          <div className="flex flex-col gap-2">
            {services.map(({ num, title, accent }, i) => (
              <button
                key={num}
                onClick={() => setActiveService(i)}
                className={`group relative w-full text-left px-4 py-3.5 sm:px-6 sm:py-5 rounded-xl transition-all duration-300 ${activeService === i ? "text-flow-text bg-flow-surface" : "text-flow-textSoft/70 hover:text-flow-textSoft"}`}
                style={{
                  border: activeService === i ? `1px solid ${accent}40` : "1px solid transparent",
                }}
              >
                <div className="font-black text-xs mb-1" style={{ color: activeService === i ? accent : `${accent}60` }}>{num}</div>
                <div className="font-bold text-sm lg:text-base">{title}</div>
                {activeService === i && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
                    style={{ background: accent }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* content panel */}
          <AnimatePresence mode="wait">
            {services.map(({ num, title, accent, tagline, items }, i) =>
              activeService === i ? (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 20, rotateX: 8 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative rounded-2xl p-5 sm:p-8 lg:p-12 overflow-hidden"
                  style={{ background: "var(--flow-surface)", border: `1px solid ${accent}30` }}
                >
                  {/* top accent bar */}
                  <motion.div
                    className="absolute top-0 left-0 h-[3px] rounded-t-2xl"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.7, ease: EASE }}
                    style={{ background: `linear-gradient(90deg,${accent},transparent)` }}
                  />

                  {/* bg number watermark */}
                  <div className="absolute bottom-4 right-8 font-black text-[8rem] leading-none select-none pointer-events-none" style={{ color: `${accent}06` }}>{num}</div>

                  <div className="relative z-10">
                    <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>{num} · {title}</div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-flow-text mb-5 lg:mb-8">{tagline}</h3>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {items.map(({ sub, text }, j) => (
                        <motion.div
                          key={sub}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + j * 0.1, ease: EASE }}
                          className="p-5 rounded-xl"
                          style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
                            <span className="font-semibold text-flow-texttext-sm">{sub}</span>
                          </div>
                          <p className="text-flow-textSoft text-sm leading-relaxed">{text}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t flex items-center justify-between" style={{ borderColor: `${accent}20` }}>
                      <span className="text-flow-textSoft/50 text-xs">Service {num} of 03</span>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-sm font-semibold"
                        style={{ color: accent }}
                      >
                        Enquire now <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </section>


      {/* ════════════════════════════════════════
          PROJECTS CTA
      ════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-20 xl:px-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${B}08 0%, ${G}05 100%)` }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-10"
          >
            <div>
              <span className="inline-flex items-center gap-2 mb-4">
                <span className="w-5 h-[2px]" style={{ background: B }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: B }}>Our Portfolio</span>
              </span>
              <h2 className="font-black leading-tight mb-4" style={{ fontFamily: "var(--font-re)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "rgb(var(--flow-text))" }}>
                Explore Our <span style={{ color: G }}>Projects</span>
              </h2>
              <p className="max-w-lg text-sm sm:text-base leading-relaxed" style={{ color: "rgb(var(--flow-text-soft))" }}>
                Browse our curated portfolio of premium residential developments — complete with floor plans, specs, and full project details.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/real-estate/projects"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-white transition-all"
                style={{ background: G, boxShadow: `0 8px 32px ${G}60` }}
              >
                View All Projects
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="relative min-h-[90vh] flex flex-col overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/real-estate-reimagined.png" alt="Dhaka skyline" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col justify-between min-h-[90vh] px-6 sm:px-10 lg:px-20 xl:px-28 pt-16 sm:pt-28 pb-10">

          {/* Top row: heading left, contact info right */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE }}
                className="font-black leading-[1.0] uppercase"
                style={{ fontFamily: "var(--font-re)", fontSize: "clamp(2rem,7vw,8rem)", color: B }}
              >Real Estate.</motion.p>
              <motion.p
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                className="font-black leading-[1.0] uppercase"
                style={{ fontFamily: "var(--font-re)", fontSize: "clamp(2rem,7vw,8rem)", color: G }}
              >Reimagined.</motion.p>
            </div>

            <div className="flex flex-col gap-6 lg:items-end w-full lg:w-auto mt-4 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className="flex flex-col gap-4 text-white font-semibold"
              >
                <a href="mailto:contact@creativesurf.agency" className="group flex items-center gap-3 hover:text-white/70 transition-colors min-w-0">
                  <span className="flex-shrink-0 p-2 rounded-full glass border border-flow-border group-hover:border-white/40 transition-colors">
                    <Mail className="w-4 h-4 text-aurora-1" />
                  </span>
                  <span className="break-all text-sm sm:text-base">contact@creativesurf.agency</span>
                </a>
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 p-2 rounded-full glass border border-flow-border">
                    <Phone className="w-4 h-4 text-aurora-1" />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm sm:text-base">+880 1988-467099</span>
                    <a href="https://wa.me/8801988467099" target="_blank" rel="noopener noreferrer"
                      className="shine inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white overflow-hidden self-start"
                      style={{ background: "#25D366", boxShadow: "0 2px 10px #25D36640" }}
                    >
                      <Phone className="w-3 h-3" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
                className="mt-8 grid grid-cols-3 gap-3 w-full"
              >
                {[
                  { Icon: Linkedin,  href: "https://www.linkedin.com/company/creative-surf-agency/",  label: "LinkedIn" },
                  { Icon: Instagram, href: "https://www.instagram.com/creative.surf.agency/",         label: "Instagram" },
                  { Icon: Facebook,  href: "https://www.facebook.com/creative.surf.agency/",          label: "Facebook" },
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="group conic-ring relative flex flex-col items-center justify-center p-4 rounded-2xl glass border border-flow-border hover:border-white/40 transition-all">
                    <Icon size={22} strokeWidth={2} className="text-white/70 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white"
                  style={{ background: G, boxShadow: `0 4px 20px ${G}50` }}
                >
                  Start a Project
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>
            </div>

            <div className="pt-5 border-t border-white/25 flex flex-col sm:flex-row justify-between items-center gap-2">
              <p className="text-xs text-flow-textSoft/70 font-medium">© {new Date().getFullYear()} Creative Surf. All rights reserved.</p>
              <p className="text-xs text-flow-textSoft/70 tracking-widest uppercase font-semibold">Crafted with <span style={{ color: G }}>aurora</span> energy</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
