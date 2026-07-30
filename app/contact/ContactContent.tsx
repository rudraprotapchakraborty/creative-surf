"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Mail, Phone, Clock, Send, CheckCircle, ArrowUpRight } from "lucide-react"

import { useT } from "@/lib/i18n"
import { contactMessages } from "@/lib/i18n/messages/contact"

const ACCENT = "rgb(var(--accent-1))"
const ACCENT_SOFT = "rgb(var(--accent-1) / 0.1)"

export default function ContactContent() {
  const t = useT(contactMessages)

  const contactItems = [
    { icon: MapPin, label: t("info.address"), value: t("info.addressValue"), href: null },
    { icon: Mail,   label: t("info.email"),   value: "contact@creativesurf.agency", href: "mailto:contact@creativesurf.agency" },
    { icon: Phone,  label: t("info.phone"),   value: "+880 1988-467099", href: "https://wa.me/8801988467099" },
    { icon: Clock,  label: t("info.hours"),   value: t("info.hoursValue"), href: null },
  ]

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  function set(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSent(true)
        setForm({ name: "", email: "", subject: "", message: "" })
      } else {
        setError(t("form.errorGeneric"))
      }
    } catch {
      setError(t("form.errorNetwork"))
    } finally {
      setSending(false)
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
  const inputStyle = {
    background: "var(--flow-bg)",
    border: "1px solid var(--flow-border-strong)",
    color: "rgb(var(--flow-text))",
  }

  return (
    <main className="min-h-screen bg-flow-bg text-flow-text relative overflow-hidden">
      {/* Aurora blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="aurora-blob animate-aurora" style={{ width: 700, height: 700, top: "-15%", left: "-10%", background: "radial-gradient(circle, rgb(var(--accent-1) / 0.1), transparent 65%)" }} />
        <div className="aurora-blob animate-aurora-alt" style={{ width: 600, height: 600, bottom: "-10%", right: "-5%", background: "radial-gradient(circle, rgb(var(--accent-2) / 0.08), transparent 65%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-20">

        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 mb-4">
            <span className="w-5 h-[2px]" style={{ background: ACCENT }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
              {t("eyebrow")}
            </span>
          </span>
          <h1 className="font-bold text-flow-text leading-tight mb-4" style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", fontFamily: "var(--font-heading)" }}>
            {t("headingLine1")}<br className="hidden sm:block" /> {t("headingLine2")}
          </h1>
          <p className="text-base sm:text-lg max-w-xl leading-relaxed" style={{ color: "rgb(var(--flow-text-soft))" }}>
            {t("intro")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* ─── Form ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-6 sm:p-8 md:p-10 h-full" style={{ border: "1px solid var(--flow-border-strong)" }}>
              <h2 className="font-bold text-flow-text mb-7 text-xl sm:text-2xl" style={{ fontFamily: "var(--font-heading)" }}>
                {t("form.title")}
              </h2>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ background: ACCENT_SOFT }}>
                    <CheckCircle size={30} style={{ color: ACCENT }} />
                  </div>
                  <h3 className="font-bold text-xl text-flow-text">{t("form.successTitle")}</h3>
                  <p className="text-sm max-w-sm" style={{ color: "rgb(var(--flow-text-soft))" }}>
                    {t("form.successBody")}
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-sm font-semibold"
                    style={{ color: ACCENT }}
                  >
                    {t("form.sendAnother")}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgb(var(--flow-text-soft))" }}>{t("form.name")}</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => set("name", e.target.value)}
                        placeholder={t("form.namePlaceholder")}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgb(var(--flow-text-soft))" }}>{t("form.email")}</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => set("email", e.target.value)}
                        placeholder={t("form.emailPlaceholder")}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgb(var(--flow-text-soft))" }}>{t("form.subject")}</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={e => set("subject", e.target.value)}
                      placeholder={t("form.subjectPlaceholder")}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgb(var(--flow-text-soft))" }}>{t("form.message")}</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={e => set("message", e.target.value)}
                      placeholder={t("form.messagePlaceholder")}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                      style={inputStyle}
                    />
                  </div>

                  {error && (
                    <p className="text-sm px-4 py-2.5 rounded-xl" style={{ background: "rgb(239 68 68 / 0.1)", color: "rgb(239 68 68)", border: "1px solid rgb(239 68 68 / 0.2)" }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white shine relative overflow-hidden transition-all"
                    style={{ background: `linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))`, boxShadow: "0 4px 18px rgb(var(--accent-1) / 0.3)" }}
                  >
                    {sending ? (
                      <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />{t("form.sending")}</>
                    ) : (
                      <><Send size={14} />{t("form.submit")}</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* ─── Contact Info ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <div className="glass rounded-2xl p-6 sm:p-7" style={{ border: "1px solid var(--flow-border-strong)" }}>
              <h3 className="font-bold text-flow-text mb-6 text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                {t("info.title")}
              </h3>
              <div className="space-y-5">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center" style={{ background: ACCENT_SOFT }}>
                      <Icon size={15} style={{ color: ACCENT }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "rgb(var(--flow-text-soft))" }}>{label}</p>
                      {href ? (
                        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                          className="text-sm font-medium text-flow-text hover:opacity-70 transition-opacity flex items-center gap-1">
                          {value}
                          <ArrowUpRight size={11} className="opacity-40" />
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-flow-text">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick CTA */}
            <div
              className="glass rounded-2xl p-6 sm:p-7"
              style={{ border: "1px solid var(--flow-border-strong)", background: ACCENT_SOFT }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: ACCENT }}>{t("whatsapp.title")}</p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgb(var(--flow-text-soft))" }}>
                {t("whatsapp.body")}
              </p>
              <a
                href="https://wa.me/8801988467099"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: `linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))`, boxShadow: "0 4px 14px rgb(var(--accent-1) / 0.25)" }}
              >
                <Phone size={13} /> {t("whatsapp.cta")}
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  )
}
