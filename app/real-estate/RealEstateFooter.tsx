"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, Linkedin, Instagram, Facebook, ArrowUpRight } from "lucide-react"

const G  = "#B8892A"
const B  = "#0066A2"
const EASE = [0.16, 1, 0.3, 1] as const

export default function RealEstateFooter() {
  return (
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

        {/* Bottom: CTA + copyright */}
        <div className="flex flex-col gap-6">
          <div>
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
            <p className="text-xs text-white/50 font-medium">© {new Date().getFullYear()} Creative Surf. All rights reserved.</p>
            <p className="text-xs text-white/50 tracking-widest uppercase font-semibold">Crafted with <span style={{ color: G }}>aurora</span> energy</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
