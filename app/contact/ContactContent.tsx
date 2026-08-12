"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle,
  MessageSquare,
  Mail,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
  ChevronDown,
  Copy,
  Check,
  Send
} from "lucide-react"

import { useT } from "@/lib/i18n"
import { contactMessages } from "@/lib/i18n/messages/contact"
import WaveBackdrop from "@/app/components/WaveBackdrop"

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface FAQItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How fast will Creative Surf respond to my inquiry?",
    answer:
      "We review every submission carefully and reach back out within 24 business hours with an initial consultation plan tailored for your brand.",
  },
  {
    question: "What is included in a Social Media Audit?",
    answer:
      "Our audit analyzes your current profile performance, audience engagement metrics, visual branding, content hooks, and competitor positioning with actionable growth steps.",
  },
  {
    question: "Can you tailor a custom package for my budget and goals?",
    answer:
      "Yes! We customize every agreement based on your target channels, posting frequency, ad spend management, and desired growth timeline.",
  },
  {
    question: "Do you manage both organic content and paid ad campaigns?",
    answer:
      "Full-funnel digital strategy is our core specialty. We combine high-impact organic content creation with ROI-focused paid campaigns.",
  },
  {
    question: "How does onboarding work once we decide to partner?",
    answer:
      "Following your inquiry, we arrange a brief discovery call, deliver a custom proposal, align on key assets, and kick off execution within 5–7 business days.",
  },
]

export default function ContactContent() {
  const t = useT(contactMessages)

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    socialUrl: "",
    comments: "",
    howDidYouHear: "",
  })

  const defaultServices = [
    "Social Media Management",
    "Social Media Audit",
    "Content Creation",
    "Pinterest Management",
    "I don't see what I'm looking for, can we chat?",
  ]

  const translatedList = t.list("form.serviceOptions")
  const serviceOptions: string[] =
    Array.isArray(translatedList) && translatedList.length > 0
      ? translatedList
      : defaultServices

  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [copiedEmail, setCopiedEmail] = useState(false)

  function handleChange(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleServiceToggle(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    )
  }

  function copyEmailToClipboard() {
    navigator.clipboard.writeText("creativesurfcs@gmail.com")
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setError(t("form.errorGeneric") as string)
      return
    }

    if (selectedServices.length === 0) {
      setError("Please select at least one service option.")
      return
    }

    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          services: selectedServices,
        }),
      })

      if (res.ok) {
        setSent(true)
        setForm({
          firstName: "",
          lastName: "",
          companyName: "",
          email: "",
          socialUrl: "",
          comments: "",
          howDidYouHear: "",
        })
        setSelectedServices([])
      } else {
        setError(t("form.errorGeneric") as string)
      }
    } catch {
      setError(t("form.errorNetwork") as string)
    } finally {
      setSending(false)
    }
  }

  const pillInputClass =
    "w-full rounded-full border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/70 px-5 py-3.5 text-sm text-slate-900 dark:text-neutral-100 placeholder:text-slate-400 dark:placeholder:text-neutral-500 outline-none focus:border-slate-900 dark:focus:border-neutral-100 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-neutral-100/10 transition-all shadow-xs"

  return (
    <main className="min-h-screen bg-[#f8f9fa] dark:bg-neutral-950 text-slate-900 dark:text-neutral-100 relative overflow-hidden">
      {/* ─── Ambient Backdrop Mesh & Waves ─── */}
      <div className="absolute inset-0 bg-aurora-mesh opacity-50 pointer-events-none animate-mesh" />
      <div className="absolute inset-0 bg-grid mask-radial pointer-events-none opacity-25" />

      {/* Floating Aurora Blobs */}
      <div
        className="absolute pointer-events-none rounded-full animate-aurora"
        style={{
          width: "45vw",
          height: "45vw",
          top: "-15vw",
          left: "-10vw",
          background: "radial-gradient(circle, rgb(var(--accent-1) / 0.16), transparent 65%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full animate-aurora-alt"
        style={{
          width: "40vw",
          height: "40vw",
          bottom: "10vw",
          right: "-10vw",
          background: "radial-gradient(circle, rgb(var(--accent-2) / 0.14), transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      {/* Ocean Wave Backdrops */}
      <WaveBackdrop corner="br" size="lg" opacity={0.35} showTop id="contact-wave-br" />
      <WaveBackdrop corner="tl" size="md" opacity={0.2} id="contact-wave-tl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-28">
        
        {/* ─── HERO HEADER ─── */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-slate-300 dark:border-neutral-800 shadow-xs backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-800 dark:text-neutral-200">
              CREATIVE SURF · GET IN TOUCH
            </span>
          </motion.div>

          {/* Main Title Lines */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-neutral-100 leading-tight mb-5"
          >
            {t("headerLine1")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="text-base sm:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto"
          >
            {t("headerLine2")}
          </motion.p>

          {/* Trust Feature Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/60 dark:bg-neutral-900/60 text-xs font-semibold text-slate-700 dark:text-neutral-300">
              <Zap size={14} className="text-amber-500" />
              <span>24h Response Time</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/60 dark:bg-neutral-900/60 text-xs font-semibold text-slate-700 dark:text-neutral-300">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>100% Privacy Protected</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/60 dark:bg-neutral-900/60 text-xs font-semibold text-slate-700 dark:text-neutral-300">
              <Star size={14} className="text-sky-500" />
              <span>150+ Brands Accelerated</span>
            </div>
          </motion.div>
        </div>

        {/* ─── MAIN FORM CONTAINER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="max-w-[800px] mx-auto mb-20"
        >
          <div className="relative group">
            {/* Ambient Card Outer Glow */}
            <div className="absolute -inset-1 rounded-[38px] sm:rounded-[46px] bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-purple-500/20 blur-xl opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />

            <div className="relative border border-slate-900/90 dark:border-neutral-700 rounded-[32px] sm:rounded-[44px] bg-white/95 dark:bg-neutral-900/95 p-6 sm:p-10 md:p-14 shadow-2xl backdrop-blur-md">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center mb-2">
                    <CheckCircle size={34} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-2xl text-slate-900 dark:text-neutral-100">
                    {t("form.successTitle")}
                  </h3>
                  <p className="text-sm sm:text-base max-w-md text-slate-600 dark:text-neutral-300 leading-relaxed">
                    {t("form.successBody")}
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-neutral-100 underline hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    {t("form.sendAnother")}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                  {/* 1. Name Field */}
                  <div>
                    <label className="block text-base font-semibold text-slate-900 dark:text-neutral-100 mb-3">
                      {t("form.name")}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm text-slate-700 dark:text-neutral-300 mb-1.5">
                          {t("form.firstName")}{" "}
                          <span className="text-slate-500 dark:text-neutral-400 font-normal text-xs sm:text-sm">
                            {t("form.required")}
                          </span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                          className={pillInputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-700 dark:text-neutral-300 mb-1.5">
                          {t("form.lastName")}{" "}
                          <span className="text-slate-500 dark:text-neutral-400 font-normal text-xs sm:text-sm">
                            {t("form.required")}
                          </span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                          className={pillInputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-800 dark:text-neutral-200 mb-1.5">
                      {t("form.company")}
                    </label>
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) => handleChange("companyName", e.target.value)}
                      className={pillInputClass}
                    />
                  </div>

                  {/* 3. Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-800 dark:text-neutral-200 mb-1.5">
                      {t("form.email")}{" "}
                      <span className="text-slate-500 dark:text-neutral-400 font-normal text-xs sm:text-sm">
                        {t("form.required")}
                      </span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={pillInputClass}
                    />
                  </div>

                  {/* 4. Social Media URL */}
                  <div>
                    <label className="block text-sm font-medium text-slate-800 dark:text-neutral-200 mb-1.5">
                      {t("form.socialUrl")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("form.socialPlaceholder")}
                      value={form.socialUrl}
                      onChange={(e) => handleChange("socialUrl", e.target.value)}
                      className={pillInputClass}
                    />
                  </div>

                  {/* 5. Services Interested In */}
                  <div>
                    <label className="block text-sm font-medium text-slate-800 dark:text-neutral-200 mb-3">
                      {t("form.servicesTitle")}{" "}
                      <span className="text-slate-500 dark:text-neutral-400 font-normal text-xs sm:text-sm">
                        {t("form.required")}
                      </span>
                    </label>
                    <div className="space-y-3">
                      {serviceOptions.map((service) => {
                        const isSelected = selectedServices.includes(service)
                        return (
                          <label
                            key={service}
                            onClick={() => handleServiceToggle(service)}
                            className="flex items-center gap-3.5 cursor-pointer group select-none py-0.5"
                          >
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                                isSelected
                                  ? "border-slate-900 bg-slate-900 dark:border-neutral-100 dark:bg-neutral-100 shadow-xs scale-105"
                                  : "border-slate-300 dark:border-neutral-600 group-hover:border-slate-500 bg-white dark:bg-neutral-900"
                              }`}
                            >
                              {isSelected && (
                                <div className="w-2 h-2 rounded-full bg-white dark:bg-neutral-900" />
                              )}
                            </div>
                            <span className="text-sm text-slate-800 dark:text-neutral-200 font-normal">
                              {service}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  {/* 6. Additional Comments */}
                  <div>
                    <label className="block text-sm font-medium text-slate-800 dark:text-neutral-200 mb-1.5">
                      {t("form.comments")}
                    </label>
                    <textarea
                      rows={4}
                      value={form.comments}
                      onChange={(e) => handleChange("comments", e.target.value)}
                      className="w-full rounded-2xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/70 p-4 text-sm text-slate-900 dark:text-neutral-100 outline-none focus:border-slate-900 dark:focus:border-neutral-100 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-neutral-100/10 transition-all resize-y shadow-xs"
                    />
                  </div>

                  {/* 7. How did you hear about us? */}
                  <div>
                    <label className="block text-sm font-medium text-slate-800 dark:text-neutral-200 mb-1.5">
                      {t("form.howDidYouHear")}
                    </label>
                    <input
                      type="text"
                      value={form.howDidYouHear}
                      onChange={(e) => handleChange("howDidYouHear", e.target.value)}
                      className={pillInputClass}
                    />
                  </div>

                  {/* Error Message Display */}
                  {error && (
                    <p className="text-sm px-4 py-2.5 rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-800">
                      {error}
                    </p>
                  )}

                  {/* 8. SUBMIT Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      disabled={sending}
                      className="bg-black dark:bg-white text-white dark:text-black font-extrabold tracking-[0.22em] text-xs sm:text-sm uppercase px-14 py-4 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.98] transition-all cursor-pointer shadow-xl disabled:opacity-50 inline-flex items-center gap-2 group"
                    >
                      {sending ? (
                        t("form.submitting")
                      ) : (
                        <>
                          <span>{t("form.submit")}</span>
                          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>

        {/* ─── QUICK CONNECT DIRECT CARDS GRID ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-24"
        >
          {/* Card 1: WhatsApp */}
          <div className="glass rounded-3xl p-7 border border-slate-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 shadow-lg flex flex-col justify-between hover:border-emerald-500/50 transition-colors group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MessageSquare size={22} />
              </div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-neutral-100 mb-2">
                WhatsApp Strategy Chat
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed mb-6">
                Need an instant answer? Chat directly with our campaign leads on WhatsApp for immediate feedback.
              </p>
            </div>
            <a
              href="https://wa.me/8801988467099"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm w-fit"
            >
              <span>Chat on WhatsApp</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Card 2: Email Copy */}
          <div className="glass rounded-3xl p-7 border border-slate-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 shadow-lg flex flex-col justify-between hover:border-sky-500/50 transition-colors group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Mail size={22} />
              </div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-neutral-100 mb-2">
                Direct Email Inbox
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed mb-6">
                Send RFPs, detailed briefs, or collaboration inquiries directly to our team inbox.
              </p>
            </div>
            <button
              onClick={copyEmailToClipboard}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:opacity-90 text-xs font-bold uppercase tracking-wider transition-all shadow-sm w-fit cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check size={14} className="text-emerald-400 dark:text-emerald-600" />
                  <span>Copied Email!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Email Address</span>
                </>
              )}
            </button>
          </div>

          {/* Card 3: Location & Hours */}
          <div className="glass rounded-3xl p-7 border border-slate-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 shadow-lg flex flex-col justify-between hover:border-purple-500/50 transition-colors group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MapPin size={22} />
              </div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-neutral-100 mb-2">
                Agency Headquarters
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed mb-2">
                Dhaka, Bangladesh
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400 mb-4">
                <Clock size={13} />
                <span>Mon–Fri: 9:00 AM – 6:00 PM (GMT+6)</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for New Projects</span>
            </div>
          </div>
        </motion.div>

        {/* ─── FREQUENTLY ASKED QUESTIONS (FAQ) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[11px] font-bold uppercase tracking-widest mb-3">
              <Sparkles size={13} />
              GOT QUESTIONS?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-neutral-100">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer gap-4"
                  >
                    <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-neutral-100">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-slate-900 dark:text-neutral-100" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="px-6 pb-6 text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed border-t border-slate-100 dark:border-neutral-800/60 pt-4"
                      >
                        {item.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.div>

      </div>
    </main>
  )
}
