"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Linkedin, Instagram, ArrowUpRight, Mail, Phone } from "lucide-react";
import MouseParticles from "./MouseParticles";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative w-full bg-flow-bg text-flow-text pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-10 md:pb-12 overflow-hidden border-t border-flow-border"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      <MouseParticles />

      {/* Aurora accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora-blob aurora-1 w-[50vw] h-[50vw] -bottom-[15vw] -right-[10vw] opacity-40 animate-aurora" />
        <div className="aurora-blob aurora-2 w-[40vw] h-[40vw] bottom-[5vh] -left-[15vw] opacity-30 animate-aurora-alt" />
      </div>

      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-30" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 md:gap-12 lg:gap-16 mb-16 md:mb-20 lg:mb-24">
          {/* Main CTA */}
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-1 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
              Let's Talk
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-bold mb-6 leading-tight text-flow-text"
              style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)" }}
            >
              Let's build something
              <br />
              <span className="text-aurora-shimmer">unreal.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-flow-textSoft text-base mb-10 max-w-md"
            >
              Combining creativity, strategy, and technology to shape the future of your brand.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link
                href="/contact"
                className="shine group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-aurora-grad shadow-aurora overflow-hidden"
              >
                <span className="relative">Start a Project</span>
                <ArrowUpRight className="relative w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-6 lg:items-end w-full lg:w-auto mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-4 text-flow-text font-semibold"
            >
              <a
                href="mailto:contact@creativesurf.agency"
                className="group flex items-center gap-3 hover:text-aurora-1 transition-colors min-w-0"
              >
                <span className="flex-shrink-0 p-2 rounded-full glass border border-flow-border group-hover:border-aurora-1/40 transition-colors">
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
                  <a
                    href="https://wa.me/8801988467099"
                    target="_blank"
                    rel="noopener noreferrer"
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
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 grid grid-cols-3 gap-3 w-full"
            >
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/company/creative-surf-agency/", label: "LinkedIn" },
                { Icon: Instagram, href: "https://www.instagram.com/creative.surf.agency/", label: "Instagram" },
                { Icon: Facebook, href: "https://www.facebook.com/creative.surf.agency/", label: "Facebook" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group conic-ring relative flex flex-col items-center justify-center p-4 rounded-2xl glass border border-flow-border hover:border-aurora-1/40 transition-all"
                >
                  <Icon
                    size={22}
                    strokeWidth={2}
                    className="text-flow-textSoft group-hover:text-aurora-1 transition-colors"
                  />
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-8 border-t border-flow-border flex flex-col md:flex-row justify-between items-center gap-2"
        >
          <p className="text-sm text-flow-textSoft font-medium text-center">
            © {new Date().getFullYear()} Creative Surf. All rights reserved.
          </p>
          <p className="text-xs text-flow-textSoft tracking-wide uppercase font-semibold">
            Crafted with <span className="text-aurora">aurora</span> energy
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
