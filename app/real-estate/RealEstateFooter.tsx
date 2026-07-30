"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Mail, Phone, Linkedin, Instagram, Facebook, ArrowUpRight, MapPin } from "lucide-react"
import { useT } from "@/lib/i18n"
import { realEstateFooterMessages } from "@/lib/i18n/messages/realEstateFooter"

const G  = "#B8892A"
const GL = "#D4A843"
const B  = "#0066A2"
const EASE = [0.16, 1, 0.3, 1] as const

const NAV = [
  { key: "home",     href: "/" },
  { key: "projects", href: "/real-estate/projects" },
  { key: "blogs",    href: "/real-estate/blogs" },
  { key: "contact",  href: "/contact" },
]

const SOCIALS = [
  { Icon: Linkedin,  href: "https://www.linkedin.com/company/creative-surf-agency/", label: "LinkedIn" },
  { Icon: Instagram, href: "https://www.instagram.com/creative.surf.agency/",        label: "Instagram" },
  { Icon: Facebook,  href: "https://www.facebook.com/creative.surf.agency/",         label: "Facebook" },
]

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.205zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
}

export default function RealEstateFooter() {
  // The home page ends with an overlapping CTA card; give the footer extra
  // top room there so the card lands over the skyline (Spring Field style).
  const pathname = usePathname()
  const t = useT(realEstateFooterMessages)
  const hasOverlapCard = pathname === "/real-estate"

  return (
    <footer className="relative">
      {/* Overlapping CTA card — Spring Field style, home page only.
          Lives in a transparent zone so its top sits over the light page
          while its bottom dips onto the dark block below. */}
      {hasOverlapCard && (
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative -mb-12 sm:-mb-16 overflow-hidden rounded-[36px] text-white"
            style={{ background: `linear-gradient(135deg, ${GL} 0%, ${G} 45%, #8a6418 100%)`, boxShadow: `0 30px 80px -30px ${G}99` }}
          >
            {/* faint building watermark, washed to read as solid brand color */}
            <div className="absolute inset-0 opacity-[0.22]">
              <Image src="/real-estate-hero.png" alt="" fill className="object-cover object-top" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(110deg, ${G}f2 0%, #8a6418e6 100%)` }} />
            </div>

            <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <span className="text-[11px] tracking-[0.3em] font-bold uppercase text-white/70">{t("cta.badge")}</span>
                <h2
                  className="font-medium leading-[1.05] mt-3 text-white"
                  style={{ fontSize: "clamp(2.1rem,4.4vw,3.6rem)", fontFamily: "var(--font-re-display)", letterSpacing: "-0.02em" }}
                >
                  {t("cta.heading")}
                </h2>
                <p className="text-white/85 mt-3 max-w-2xl leading-relaxed">
                  {t("cta.body")}
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link
                  href="/real-estate/projects"
                  className="inline-flex items-center gap-2 bg-white text-[#8a6418] px-6 py-3.5 rounded-full font-semibold shadow-lg hover:scale-[1.03] transition-transform"
                >
                  {t("cta.primary")}
                  <ArrowUpRight className="w-[18px] h-[18px]" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-transparent border border-white/40 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors"
                >
                  {t("cta.secondary")}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Dark skyline block */}
      <div className="relative overflow-hidden">
        {/* Background skyline */}
        <div className="absolute inset-0">
          <Image src="/real-estate-reimagined.png" alt={t("skylineAlt")} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        <div className={`relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 pb-8 ${hasOverlapCard ? "pt-28 sm:pt-36" : "pt-16 sm:pt-20"}`}>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, ease: EASE }}
            className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.8fr_1.4fr] gap-8 lg:gap-14"
          >
            {/* Brand */}
            <div className="flex flex-col items-start">
              <p
                className="font-black leading-[1.05] uppercase tracking-tight"
                style={{ fontFamily: "var(--font-re)", fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
              >
                <span style={{ color: B }}>{t("brand.line1")}</span>
                <br />
                <span style={{ color: G }}>{t("brand.line2")}</span>
              </p>
              <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-md">
                {t("brand.blurb")}
              </p>
              <Link
                href="/contact"
                className="group mt-6 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white hover:-translate-y-0.5 hover:brightness-110 transition-all duration-300"
                style={{ background: G, boxShadow: `0 8px 30px ${G}75` }}
              >
                {t("brand.cta")}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6">{t("exploreTitle")}</h3>
              <ul className="flex flex-col gap-4">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-base font-medium text-white/75 hover:text-white transition-colors"
                    >
                      <span className="h-px w-0 group-hover:w-5 transition-all duration-300" style={{ background: G }} />
                      {t(`links.${item.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact card */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.07] backdrop-blur-xl p-6 sm:p-7">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-5">{t("contactTitle")}</h3>

              <div className="flex flex-col gap-4 text-white">
                <a href="mailto:contact@creativesurf.agency" className="group flex items-center gap-3 hover:text-white transition-colors">
                  <span className="flex-shrink-0 grid place-items-center w-10 h-10 rounded-full bg-white/[0.08] border border-white/10 group-hover:border-white/40 transition-colors">
                    <Mail className="w-4 h-4" style={{ color: G }} />
                  </span>
                  <span className="text-sm sm:text-base break-all text-white/85">contact@creativesurf.agency</span>
                </a>

                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 grid place-items-center w-10 h-10 rounded-full bg-white/[0.08] border border-white/10">
                    <Phone className="w-4 h-4" style={{ color: G }} />
                  </span>
                  <span className="text-sm sm:text-base text-white/85">+880 1988-467099</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 grid place-items-center w-10 h-10 rounded-full bg-white/[0.08] border border-white/10">
                    <MapPin className="w-4 h-4" style={{ color: G }} />
                  </span>
                  <span className="text-sm sm:text-base text-white/85">{t("location")}</span>
                </div>
              </div>

              <a
                href="https://wa.me/8801988467099"
                target="_blank"
                rel="noopener noreferrer"
                className="shine relative mt-6 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold text-white overflow-hidden hover:brightness-110 transition-all"
                style={{ background: "#25D366", boxShadow: "0 6px 20px rgba(37, 211, 102, 0.45)" }}
              >
                <WhatsAppIcon className="w-4 h-4" />
                {t("whatsapp")}
              </a>

              {/* Socials */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group grid place-items-center w-10 h-10 rounded-full bg-white/[0.08] border border-white/10 hover:border-white/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    <Icon size={16} strokeWidth={2} className="text-white/70 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6 text-xs text-white/50 font-medium">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
              <div className="flex items-center gap-2.5">
                <Image src="/logo2.png" alt="Creative Surf" width={20} height={20} className="opacity-90" />
                <span>{t("rights", { year: new Date().getFullYear() })}</span>
              </div>
              <div className="hidden sm:block text-white/20">•</div>
              <div className="flex items-center gap-4">
                <Link href="/terms" className="hover:text-white transition-colors">
                  {t("terms")}
                </Link>
                <span className="text-white/20">•</span>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  {t("privacy")}
                </Link>
              </div>
            </div>
            <div className="text-[10px] sm:text-xs text-white/45 tracking-[0.2em] uppercase font-bold">
              {t("craftedPre")} <span style={{ color: GL }}>{t("craftedAccent")}</span> {t("craftedPost")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
