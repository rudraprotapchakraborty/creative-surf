"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Instagram, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import MouseParticles from "./MouseParticles";

const NAV = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Blogs",    href: "/blogs" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
];

const SOCIALS = [
  { Icon: Linkedin,  href: "https://www.linkedin.com/company/creative-surf-agency/", label: "LinkedIn" },
  { Icon: Instagram, href: "https://www.instagram.com/creative.surf.agency/",        label: "Instagram" },
  { Icon: Facebook,  href: "https://www.facebook.com/creative.surf.agency/",         label: "Facebook" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative w-full bg-flow-bg text-flow-text pt-20 sm:pt-24 pb-8 overflow-hidden border-t border-flow-border"
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
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.8fr_1.4fr] gap-10 lg:gap-14"
        >
          {/* Brand + CTA */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
              Let's Talk
            </span>
            <h2
              className="font-bold leading-tight text-flow-text"
              style={{ fontSize: "clamp(1.9rem,3.2vw,3rem)" }}
            >
              Let's build something
              <br />
              <span className="text-aurora-shimmer">unreal.</span>
            </h2>
            <p className="mt-4 text-flow-textSoft text-base leading-relaxed max-w-md">
              Combining creativity, strategy, and technology to shape the future of your brand.
            </p>
            <Link
              href="/contact"
              className="shine group relative mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-aurora-grad shadow-aurora overflow-hidden"
            >
              <span className="relative">Start a Project</span>
              <ArrowUpRight className="relative w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-flow-textSoft/60 mb-5">Explore</h3>
            <ul className="flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-base font-medium text-flow-textSoft hover:text-flow-text transition-colors"
                  >
                    <span className="h-px w-0 group-hover:w-5 bg-aurora-1 transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact card */}
          <div className="glass-strong rounded-3xl border border-flow-border p-5 sm:p-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-flow-textSoft/60 mb-4">Get in touch</h3>

            <div className="flex flex-col gap-3 text-flow-text">
              <a href="mailto:contact@creativesurf.agency" className="group flex items-center gap-3 hover:text-aurora-1 transition-colors">
                <span className="flex-shrink-0 grid place-items-center w-10 h-10 rounded-xl glass border border-flow-border group-hover:border-aurora-1/40 transition-colors">
                  <Mail className="w-4 h-4 text-aurora-1" />
                </span>
                <span className="text-sm sm:text-base break-all">contact@creativesurf.agency</span>
              </a>

              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 grid place-items-center w-10 h-10 rounded-xl glass border border-flow-border">
                  <Phone className="w-4 h-4 text-aurora-1" />
                </span>
                <span className="text-sm sm:text-base">+880 1988-467099</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 grid place-items-center w-10 h-10 rounded-xl glass border border-flow-border">
                  <MapPin className="w-4 h-4 text-aurora-1" />
                </span>
                <span className="text-sm sm:text-base">Dhaka, Bangladesh</span>
              </div>
            </div>

            <a
              href="https://wa.me/8801988467099"
              target="_blank"
              rel="noopener noreferrer"
              className="shine relative mt-5 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden hover:brightness-110 transition-all"
              style={{ background: "#25D366", boxShadow: "0 4px 16px #25D36645" }}
            >
              <Phone className="w-4 h-4" />
              Chat on WhatsApp
            </a>

            {/* Socials */}
            <div className="mt-5 pt-5 border-t border-flow-border flex items-center gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group conic-ring grid place-items-center w-11 h-11 rounded-2xl glass border border-flow-border hover:border-aurora-1/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={18} strokeWidth={2} className="text-flow-textSoft group-hover:text-aurora-1 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-flow-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="Creative Surf" width={22} height={22} className="opacity-90" />
              <p className="text-xs text-flow-textSoft font-medium">
                © {new Date().getFullYear()} Creative Surf. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-flow-textSoft">
              <Link href="/terms" className="hover:text-flow-text transition-colors">
                Terms of Service
              </Link>
              <span className="w-1 h-1 rounded-full bg-flow-border" />
              <Link href="/privacy-policy" className="hover:text-flow-text transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
          <p className="text-xs text-flow-textSoft tracking-widest uppercase font-semibold">
            Crafted with <span className="text-aurora">aurora</span> energy
          </p>
        </div>
      </div>
    </footer>
  );
}
