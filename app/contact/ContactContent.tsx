"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Check, Copy, Plus } from "lucide-react"

import { useT } from "@/lib/i18n"
import { contactMessages } from "@/lib/i18n/messages/contact"
import { cn } from "@/lib/utils"
import { EASE, FaqSection, Meta } from "@/app/components/editorial"

const EMAIL = "creativesurfcs@gmail.com"
const WHATSAPP = "https://wa.me/8801988467099"

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  socialUrl: "",
  comments: "",
  howDidYouHear: "",
}

const INPUT =
  "w-full rounded-[10px] bg-cs-surface px-4 text-[15px] text-cs-ink outline-none ring-1 ring-inset ring-cs-ink/15 transition-shadow duration-200 placeholder:text-cs-ink3/70 hover:ring-cs-ink/30 focus:ring-2 focus:ring-cs-blue"
const LABEL = "mb-2 block text-[13px] font-semibold tracking-[-0.005em] text-cs-ink"

/** Dhaka time, ticking — the studio's own clock, beside its hours. */
function useDhakaTime() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit" })
    const tick = () => setTime(format.format(new Date()))
    tick()
    const id = window.setInterval(tick, 20_000)
    return () => clearInterval(id)
  }, [])
  return time
}

/** One numbered group of the form: the step label hangs left, the fields sit right. */
function Step({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-y-6 border-t border-cs-ink/10 py-10 sm:grid-cols-[9rem_1fr] sm:gap-x-8">
      <legend className="sr-only">{title}</legend>
      {/* The legend names the group for assistive tech; this is its visible twin. */}
      <p aria-hidden className="cs-meta flex items-baseline gap-3 text-cs-ink3">
        <span className="tabular-nums text-cs-ink">{index}</span>
        {title}
      </p>
      <div className="space-y-6">{children}</div>
    </fieldset>
  )
}

/**
 * The contact page as a single working surface: the brief on the left, set
 * on the paper in three numbered steps, and the direct lines on the right for
 * anyone who would rather just talk. No card around the form — it is the page.
 */
export default function ContactContent() {
  const t = useT(contactMessages)
  const params = useSearchParams()
  const still = useReducedMotion() ?? false
  const time = useDhakaTime()

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

  const required = <span className="font-normal text-cs-ink3"> {t("form.required")}</span>
  const badges = t.list("badges")
  const faq = t.raw<{ q: string; a: string }[]>("faq", [])

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
            <p>
              <span className="text-cs-ink">Creative Surf</span>
              <span aria-hidden className="mx-2 opacity-50">/</span>
              {t("kicker")}
            </p>
            <p className="flex items-center gap-2.5">
              <span aria-hidden className="relative flex h-2 w-2">
                <span className="cs-pulse absolute inset-0 rounded-full bg-cs-cyan" />
                <span className="relative h-2 w-2 rounded-full bg-cs-cyan" />
              </span>
              <span className="text-cs-ink">{t("cards.hqAvailable")}</span>
            </p>
          </motion.div>

          <div className="grid gap-y-8 pb-14 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-x-8 lg:pb-20 lg:pt-20">
            <div className="lg:col-span-3 lg:pt-3">
              <Meta index="01">{t("kicker")}</Meta>
            </div>
            <div className="lg:col-span-9">
              <motion.h1
                initial={still ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.05 }}
                className="cs-display max-w-[16ch] text-cs-ink"
                style={{ fontSize: "clamp(2.4rem, 5.2vw, 5rem)", lineHeight: 0.98, letterSpacing: "-0.05em" }}
              >
                {t("headerLine1")}
              </motion.h1>
              <motion.p
                initial={still ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
                className="cs-lede mt-8 max-w-[36rem] text-cs-ink2"
              >
                {t("headerLine2")}
              </motion.p>

              <motion.ul
                initial={still ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-10 grid border-y border-cs-ink/10 sm:grid-cols-3"
              >
                {badges.map((badge, i) => (
                  <li
                    key={badge}
                    className={cn(
                      "cs-meta flex items-center gap-2.5 py-4 text-cs-ink",
                      i > 0 && "border-t border-cs-ink/10 sm:border-l sm:border-t-0 sm:pl-5"
                    )}
                  >
                    <Check aria-hidden className="h-3.5 w-3.5 text-cs-blue" strokeWidth={2.5} />
                    {badge}
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </header>

      {/* ─── The brief + direct lines ─── */}
      <section aria-label={t("kicker")} className="pb-24 md:pb-32">
        <div className="cs-container grid gap-y-16 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  role="status"
                  initial={still ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="border-t border-cs-ink/10 py-16 sm:py-24"
                >
                  <motion.span
                    initial={still ? false : { scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                    className="grid h-14 w-14 place-items-center rounded-full bg-cs-blue text-cs-onBlue"
                  >
                    <Check aria-hidden className="h-6 w-6" strokeWidth={2.5} />
                  </motion.span>
                  <h2
                    className="cs-display mt-8 text-cs-ink"
                    style={{ fontSize: "clamp(2.25rem, 4.4vw, 3.75rem)", lineHeight: 1, letterSpacing: "-0.045em" }}
                  >
                    {t("form.successTitle")}
                  </h2>
                  <p className="cs-lede mt-5 max-w-[32rem] text-cs-ink2">{t("form.successBody")}</p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="cs-focus cs-underline mt-8 rounded-sm text-[15px] font-semibold text-cs-blue"
                  >
                    {t("form.sendAnother")}
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0 }}>
                  <Step index="01" title={t("steps.you")}>
                    <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
                      <div>
                        <label htmlFor="firstName" className={LABEL}>
                          {t("form.firstName")}
                          {required}
                        </label>
                        <input id="firstName" type="text" required autoComplete="given-name" value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className={cn(INPUT, "h-12")} />
                      </div>
                      <div>
                        <label htmlFor="lastName" className={LABEL}>
                          {t("form.lastName")}
                          {required}
                        </label>
                        <input id="lastName" type="text" required autoComplete="family-name" value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className={cn(INPUT, "h-12")} />
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
                      <div>
                        <label htmlFor="email" className={LABEL}>
                          {t("form.email")}
                          {required}
                        </label>
                        <input id="email" type="email" required autoComplete="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={cn(INPUT, "h-12")} />
                      </div>
                      <div>
                        <label htmlFor="companyName" className={LABEL}>
                          {t("form.company")}
                        </label>
                        <input id="companyName" type="text" autoComplete="organization" value={form.companyName} onChange={(e) => handleChange("companyName", e.target.value)} className={cn(INPUT, "h-12")} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="socialUrl" className={LABEL}>
                        {t("form.socialUrl")}
                      </label>
                      <input id="socialUrl" type="text" inputMode="url" placeholder={t("form.socialPlaceholder")} value={form.socialUrl} onChange={(e) => handleChange("socialUrl", e.target.value)} className={cn(INPUT, "h-12")} />
                    </div>
                  </Step>

                  <Step index="02" title={t("steps.need")}>
                    <div role="group" aria-labelledby="services-label">
                      <p id="services-label" className={LABEL}>
                        {t("form.servicesTitle")}
                        {required}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {serviceOptions.map((service) => {
                          const selected = selectedServices.includes(service)
                          return (
                            <button
                              key={service}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => handleServiceToggle(service)}
                              className={cn(
                                "cs-focus inline-flex min-h-11 items-center gap-2 rounded-[10px] px-4 py-2 text-left text-sm font-medium transition-[background-color,color,box-shadow] duration-200",
                                selected
                                  ? "bg-cs-ink text-cs-bg"
                                  : "text-cs-ink2 ring-1 ring-inset ring-cs-ink/15 hover:text-cs-ink hover:ring-cs-ink/35"
                              )}
                            >
                              <span aria-hidden className="relative h-3.5 w-3.5 shrink-0">
                                <Plus
                                  className={cn("absolute inset-0 h-3.5 w-3.5 transition-[transform,opacity] duration-300", selected ? "rotate-90 opacity-0" : "opacity-60")}
                                />
                                <Check
                                  strokeWidth={3}
                                  className={cn("absolute inset-0 h-3.5 w-3.5 transition-[transform,opacity] duration-300", selected ? "scale-100 opacity-100" : "scale-50 opacity-0")}
                                />
                              </span>
                              {service}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </Step>

                  <Step index="03" title={t("steps.brief")}>
                    <div>
                      <label htmlFor="comments" className={LABEL}>
                        {t("form.comments")}
                      </label>
                      <textarea id="comments" rows={5} value={form.comments} onChange={(e) => handleChange("comments", e.target.value)} className={cn(INPUT, "min-h-[9rem] resize-y py-3 leading-relaxed")} />
                    </div>
                    <div>
                      <label htmlFor="howDidYouHear" className={LABEL}>
                        {t("form.howDidYouHear")}
                      </label>
                      <input id="howDidYouHear" type="text" value={form.howDidYouHear} onChange={(e) => handleChange("howDidYouHear", e.target.value)} className={cn(INPUT, "h-12")} />
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          role="alert"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-start gap-2.5 rounded-[10px] bg-red-500/[0.08] px-4 py-3 text-sm leading-snug text-red-700 ring-1 ring-inset ring-red-500/20 dark:text-red-300"
                        >
                          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[13px] leading-snug text-cs-ink3">{t("privacyNote")}</p>
                      <button
                        type="submit"
                        disabled={sending}
                        aria-busy={sending || undefined}
                        className="cs-focus group inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-[10px] bg-cs-blue px-6 text-[15px] font-semibold tracking-[-0.01em] text-cs-onBlue transition-[background-color,opacity] duration-200 hover:bg-cs-blueHover disabled:cursor-progress disabled:opacity-70"
                      >
                        {sending && <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" />}
                        {sending ? t("form.submitting") : t("form.submit")}
                        {!sending && <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                      </button>
                    </div>
                  </Step>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* ─── Direct lines ─── */}
          <aside aria-labelledby="channels-title" className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h2 id="channels-title" className="cs-meta border-t border-cs-ink/10 pt-10 text-cs-ink">
                {t("channelsTitle")}
              </h2>

              <ul className="mt-6">
                <li className="border-b border-cs-ink/10 pb-7">
                  <p className="text-[1.375rem] font-medium leading-tight tracking-[-0.03em]">{t("cards.whatsappTitle")}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-cs-ink2">{t("cards.whatsappBody")}</p>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cs-focus group mt-5 inline-flex h-11 items-center gap-2.5 rounded-[10px] bg-cs-ink px-4 text-sm font-semibold text-cs-bg transition-opacity hover:opacity-90"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                    {t("cards.whatsappCta")}
                    <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>

                <li className="border-b border-cs-ink/10 py-7">
                  <p className="text-[1.375rem] font-medium leading-tight tracking-[-0.03em]">{t("cards.emailTitle")}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-cs-ink2">{t("cards.emailBody")}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
                    <a href={`mailto:${EMAIL}`} className="cs-focus cs-underline break-all rounded-sm text-[15px] font-semibold text-cs-ink transition-colors hover:text-cs-blue">
                      {EMAIL}
                    </a>
                    <button
                      type="button"
                      onClick={copyEmailToClipboard}
                      className="cs-focus inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-[13px] font-semibold text-cs-ink2 ring-1 ring-inset ring-cs-ink/15 transition-colors hover:text-cs-ink"
                    >
                      {copiedEmail ? <Check aria-hidden className="h-3.5 w-3.5 text-cs-blue" /> : <Copy aria-hidden className="h-3.5 w-3.5" />}
                      <span aria-live="polite">{copiedEmail ? t("cards.emailCopied") : t("cards.emailCopy")}</span>
                    </button>
                  </div>
                </li>

                <li className="py-7">
                  <p className="text-[1.375rem] font-medium leading-tight tracking-[-0.03em]">{t("cards.hqTitle")}</p>
                  <p className="mt-2 text-[15px] text-cs-ink2">{t("cards.hqLocation")}</p>
                  <p className="cs-meta mt-4 text-cs-ink3">{t("cards.hqHours")}</p>
                  {time && (
                    <p className="cs-meta mt-2 text-cs-ink3">
                      {t("localTime")} · <span className="tabular-nums text-cs-ink">{time}</span>
                    </p>
                  )}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ─── Questions ─── */}
      <FaqSection id="faq-title" index="02" label={t("faqKicker")} line={t("faqTitle")} accent={t("faqAccent")} items={faq} />
    </div>
  )
}
