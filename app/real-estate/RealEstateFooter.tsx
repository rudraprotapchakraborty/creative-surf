"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, Linkedin, Instagram, Facebook, ArrowUpRight, MapPin } from "lucide-react"

const G  = "#B8892A"
const B  = "#0066A2"
const EASE = [0.16, 1, 0.3, 1] as const

const NAV = [
  { label: "Home",     href: "/" },
  { label: "Projects", href: "/real-estate/projects" },
  { label: "Blogs",    href: "/real-estate/blogs" },
  { label: "Contact",  href: "/contact" },
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
  return (
    <footer className="relative overflow-hidden">
      {/* Background skyline */}
      <div className="absolute inset-0">
        <Image src="/real-estate-reimagined.png" alt="Dhaka skyline" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 pt-12 sm:pt-14 pb-7">

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, ease: EASE }}
          className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.8fr_1.4fr] gap-8 lg:gap-14"
        >
          {/* Brand */}
          <div>
            <p
              className="font-black leading-[0.95] uppercase tracking-tight"
              style={{ fontFamily: "var(--font-re)", fontSize: "clamp(1.8rem,4vw,3.25rem)" }}
            >
              <span style={{ color: B }}>Real Estate.</span>{" "}
              <span style={{ color: G }}>Reimagined.</span>
            </p>
            <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-md">
              We craft standout digital experiences for property developers — from immersive project
              showcases to marketing that moves the market.
            </p>
            <Link
              href="/contact"
              className="group mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white hover:-translate-y-0.5 hover:brightness-110 transition-all duration-300"
              style={{ background: G, boxShadow: `0 6px 24px ${G}55` }}
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-5">Explore</h3>
            <ul className="flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-base font-medium text-white/75 hover:text-white transition-colors"
                  >
                    <span className="h-px w-0 group-hover:w-5 transition-all duration-300" style={{ background: G }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact card — footer is always over the dark skyline, so use fixed dark glass (not theme-aware) */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.07] backdrop-blur-xl p-5 sm:p-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">Get in touch</h3>

            <div className="flex flex-col gap-3 text-white">
              <a href="mailto:contact@creativesurf.agency" className="group flex items-center gap-3 hover:text-white transition-colors">
                <span className="flex-shrink-0 grid place-items-center w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 group-hover:border-white/40 transition-colors">
                  <Mail className="w-4 h-4" style={{ color: G }} />
                </span>
                <span className="text-sm sm:text-base break-all text-white/85">contact@creativesurf.agency</span>
              </a>

              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 grid place-items-center w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                  <Phone className="w-4 h-4" style={{ color: G }} />
                </span>
                <span className="text-sm sm:text-base text-white/85">+880 1988-467099</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 grid place-items-center w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                  <MapPin className="w-4 h-4" style={{ color: G }} />
                </span>
                <span className="text-sm sm:text-base text-white/85">Dhaka, Bangladesh</span>
              </div>
            </div>

            <a
              href="https://wa.me/8801988467099"
              target="_blank"
              rel="noopener noreferrer"
              className="shine relative mt-5 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden hover:brightness-110 transition-all"
              style={{ background: "#25D366", boxShadow: "0 4px 16px #25D36645" }}
            >
              <WhatsAppIcon className="w-4 h-4" />
              Chat on WhatsApp
            </a>

            {/* Socials */}
            <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group conic-ring grid place-items-center w-11 h-11 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={18} strokeWidth={2} className="text-white/70 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-10 pt-5 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="Creative Surf" width={22} height={22} className="opacity-90" />
              <p className="text-xs text-white/50 font-medium">
                © {new Date().getFullYear()} Creative Surf. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/50">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
          <p className="text-xs text-white/45 tracking-widest uppercase font-semibold">
            Crafted with <span style={{ color: G }}>aurora</span> energy
          </p>
        </div>
      </div>
    </footer>
  )
}
