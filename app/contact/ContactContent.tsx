"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, CheckCircle, Clock, Copy, Mail, MapPin, MessageSquare, ShieldCheck, Star, Zap } from "lucide-react"

import { useT } from "@/lib/i18n"
import { contactMessages } from "@/lib/i18n/messages/contact"
import WaveBackdrop from "@/app/components/WaveBackdrop"
import { FaqSection, PageHero, PageShell } from "@/app/components/kit"
import { EASE } from "@/app/components/home/shared"

const EMAIL = "creativesurfcs@gmail.com"
const WHATSAPP = "https://wa.me/8801988467099"
const BADGE_ICONS = [Zap, ShieldCheck, Star]

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  socialUrl: "",
  comments: "",
  howDidYouHear: "",
}

export default function ContactContent() {
  const t = useT(contactMessages)
  const params = useSearchParams()

  const [form, setForm] = useState(EMPTY_FORM)
  const serviceOptions = t.list("form.serviceOptions")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [copiedEmail, setCopiedEmail] = useState(false)

  // Other pages deep-link here with context — a pricing tier, a job title —
  // so the enquiry arrives already saying what it's about.
  useEffect(() => {
    const context = [params.get("subject"), params.get("package")].filter(Boolean).join(" · ")
    if (context) setForm((prev) => (prev.comments ? prev : { ...prev, comments: `${context}\n\n` }))
  }, [params])

  function handleChange(key: keyof typeof EMPTY_FORM, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleServiceToggle(service: string) {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  function copyEmailToClipboard() {
    navigator.clipboard.writeText(EMAIL)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setError(t("form.errorGeneric"))
      return
    }
    if (selectedServices.length === 0) {
      setError(t("errorServices"))
      return
    }

    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, services: selectedServices }),
      })
      if (res.ok) {
        setSent(true)
        setForm(EMPTY_FORM)
        setSelectedServices([])
      } else {
        setError(t("form.errorGeneric"))
      }
    } catch {
      setError(t("form.errorNetwork"))
    } finally {
      setSending(false)
    }
  }

  const inputClass =
    "w-full rounded-xl border border-flow-border bg-flow-bg px-4 py-3.5 text-sm text-flow-text placeholder:text-flow-textSoft/60 outline-none transition-all focus:border-aurora-1/60 focus:ring-2 focus:ring-aurora-1/20"
  const labelClass = "mb-2 block micro text-[10px] text-flow-textSoft"
  const required = <span className="normal-case tracking-normal font-normal opacity-70">{t("form.required")}</span>

  const badges = t.list("badges")
  const faq = t.raw<{ q: string; a: string }[]>("faq", [])

  const cards = [
    {
      icon: MessageSquare,
      title: t("cards.whatsappTitle"),
      body: t("cards.whatsappBody"),
      action: (
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-xl bg-aurora-grad px-5 py-3 micro text-[10px] text-white shadow-aurora"
        >
          {t("cards.whatsappCta")}
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      ),
    },
    {
      icon: Mail,
      title: t("cards.emailTitle"),
      body: t("cards.emailBody"),
      action: (
        <button
          type="button"
          onClick={copyEmailToClipboard}
          className="focus-ring inline-flex items-center gap-2 rounded-xl border border-flow-border px-5 py-3 micro text-[10px] text-flow-text hover:border-aurora-1/40"
        >
          {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedEmail ? t("cards.emailCopied") : t("cards.emailCopy")}
        </button>
      ),
    },
    {
      icon: MapPin,
      title: t("cards.hqTitle"),
      body: t("cards.hqLocation"),
      extra: (
        <span className="mt-2 flex items-center gap-2 text-xs text-flow-textSoft">
          <Clock className="w-3.5 h-3.5" />
          {t("cards.hqHours")}
        </span>
      ),
      action: (
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {t("cards.hqAvailable")}
        </span>
      ),
    },
  ]

  return (
    <PageShell>
      <div className="relative">
        <WaveBackdrop corner="br" size="lg" opacity={0.25} showTop id="contact-wave-br" />

        <PageHero kicker={t("kicker")} title={t("headerLine1")} subtitle={t("headerLine2")} />

        {/* Trust badges */}
        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
          className="relative z-10 -mt-8 mb-12 flex flex-wrap items-center justify-center gap-3 section-px"
        >
          {badges.map((badge, i) => {
            const Icon = BADGE_ICONS[i] ?? Star
            return (
              <li key={badge} className="inline-flex items-center gap-2 rounded-full glass border border-flow-border px-4 py-2 text-xs font-semibold text-flow-text">
                <Icon className="w-3.5 h-3.5 text-aurora-1" />
                {badge}
              </li>
            )
          })}
        </motion.ul>

        {/* Form */}
        <section className="relative z-10 section-px pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="relative mx-auto max-w-3xl rounded-[2rem] p-px"
            style={{ background: "linear-gradient(135deg, rgb(var(--accent-1) / 0.5), var(--flow-border), rgb(var(--accent-2) / 0.5))" }}
          >
            <div className="relative rounded-[calc(2rem-1px)] bg-flow-bg p-6 sm:p-10 md:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-70"
                style={{ background: "radial-gradient(circle at 50% 0%, rgb(var(--accent-1) / 0.08), transparent 55%)" }}
              />
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="relative flex flex-col items-center justify-center gap-4 py-16 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
                      className="grid place-items-center w-16 h-16 rounded-full text-white bg-aurora-grad shadow-aurora"
                    >
                      <CheckCircle className="w-8 h-8" />
                    </motion.span>
                    <h3 className="display-sm text-2xl text-flow-text">{t("form.successTitle")}</h3>
                    <p className="max-w-md text-sm sm:text-base leading-relaxed text-flow-textSoft">{t("form.successBody")}</p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="focus-ring mt-2 micro text-flow-text underline underline-offset-4 hover:text-aurora-1"
                    >
                      {t("form.sendAnother")}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0 }} className="relative space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                      <div>
                        <label htmlFor="firstName" className={labelClass}>
                          {t("form.firstName")} {required}
                        </label>
                        <input id="firstName" type="text" required autoComplete="given-name" value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="lastName" className={labelClass}>
                          {t("form.lastName")} {required}
                        </label>
                        <input id="lastName" type="text" required autoComplete="family-name" value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className={inputClass} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                      <div>
                        <label htmlFor="email" className={labelClass}>
                          {t("form.email")} {required}
                        </label>
                        <input id="email" type="email" required autoComplete="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="companyName" className={labelClass}>
                          {t("form.company")}
                        </label>
                        <input id="companyName" type="text" autoComplete="organization" value={form.companyName} onChange={(e) => handleChange("companyName", e.target.value)} className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="socialUrl" className={labelClass}>
                        {t("form.socialUrl")}
                      </label>
                      <input id="socialUrl" type="text" placeholder={t("form.socialPlaceholder")} value={form.socialUrl} onChange={(e) => handleChange("socialUrl", e.target.value)} className={inputClass} />
                    </div>

                    <fieldset>
                      <legend className={labelClass}>
                        {t("form.servicesTitle")} {required}
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {serviceOptions.map((service) => {
                          const selected = selectedServices.includes(service)
                          return (
                            <button
                              key={service}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => handleServiceToggle(service)}
                              className={`focus-ring relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2 text-sm transition-colors ${
                                selected
                                  ? "border-transparent text-white"
                                  : "border-flow-border text-flow-textSoft hover:border-aurora-1/40 hover:text-flow-text"
                              }`}
                            >
                              <AnimatePresence>
                                {selected && (
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-aurora-grad"
                                  />
                                )}
                              </AnimatePresence>
                              <motion.span
                                animate={{ width: selected ? 14 : 0, opacity: selected ? 1 : 0 }}
                                transition={{ duration: 0.25, ease: EASE }}
                                className="relative inline-flex overflow-hidden"
                              >
                                <Check className="w-3.5 h-3.5 flex-shrink-0" />
                              </motion.span>
                              <span className="relative">{service}</span>
                            </button>
                          )
                        })}
                      </div>
                    </fieldset>

                    <div>
                      <label htmlFor="comments" className={labelClass}>
                        {t("form.comments")}
                      </label>
                      <textarea id="comments" rows={4} value={form.comments} onChange={(e) => handleChange("comments", e.target.value)} className={`${inputClass} resize-y`} />
                    </div>

                    <div>
                      <label htmlFor="howDidYouHear" className={labelClass}>
                        {t("form.howDidYouHear")}
                      </label>
                      <input id="howDidYouHear" type="text" value={form.howDidYouHear} onChange={(e) => handleChange("howDidYouHear", e.target.value)} className={inputClass} />
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          role="alert"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="rounded-xl border border-red-300/60 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-center pt-2">
                      <button
                        type="submit"
                        disabled={sending}
                        className="focus-ring group inline-flex items-center gap-2 rounded-xl bg-aurora-grad px-10 py-4 micro text-white shadow-aurora transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                      >
                        {sending ? t("form.submitting") : t("form.submit")}
                        {!sending && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Direct channels */}
      <section className="section-px pb-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="group hairline-card flex flex-col justify-between p-7"
              >
                <div>
                  <span
                    className="mb-5 grid place-items-center w-12 h-12 rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ background: "rgb(var(--accent-1) / 0.1)", border: "1px solid rgb(var(--accent-1) / 0.22)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "rgb(var(--accent-1))" }} />
                  </span>
                  <h3 className="display-sm text-lg text-flow-text">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-flow-textSoft">{card.body}</p>
                  {card.extra}
                </div>
                <div className="mt-6">{card.action}</div>
              </motion.div>
            )
          })}
        </div>
      </section>

      <FaqSection kicker={t("faqKicker")} title={t("faqTitle")} accent={t("faqAccent")} items={faq} idPrefix="contact" />
    </PageShell>
  )
}
