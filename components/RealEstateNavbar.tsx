"use client";

import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useT } from "@/lib/i18n";
import { navMessages } from "@/lib/i18n/messages/nav";
import { commonMessages } from "@/lib/i18n/messages/common";

export function RealEstateNavbar() {
  const t = useT(navMessages);
  const c = useT(commonMessages);
  const navLinks = [
    { label: t("links.home"),     href: "/" },
    { label: t("links.projects"), href: "/real-estate/projects" },
  ];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[5000]">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`w-full px-4 md:px-5 py-1 md:py-1.5 flex items-center justify-between rounded-full transition-all duration-500 border ${
            scrolled
              ? "glass-strong border-flow-border shadow-sm"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-aurora-grad rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <img
                src="/logo.png"
                alt={t("logoAlt")}
                className="relative w-6 h-6 md:w-7 md:h-7 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="font-heading font-extrabold text-lg md:text-xl tracking-tight text-flow-text">
              Creative <span className="text-aurora">Surf</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-0.5 glass border border-flow-border px-1.5 py-1 rounded-full">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-flow-textSoft text-xs font-semibold hover:text-flow-text hover:bg-flow-card transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              href="/contact"
              className="shine relative group inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-aurora-grad shadow-aurora overflow-hidden"
            >
              <span className="relative">{t("cta")}</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              aria-label={c("labels.toggleMenu")}
              className="p-2 rounded-full text-flow-text hover:bg-flow-card transition-colors"
            >
              <Menu size={22} />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-flow-bg/90 backdrop-blur-2xl z-[9999]"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
              <div className="aurora-blob aurora-1 w-[60vw] h-[60vw] -top-[20vw] -right-[20vw]" />
              <div className="aurora-blob aurora-2 w-[50vw] h-[50vw] bottom-[-10vw] -left-[10vw]" />
            </div>

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 h-full w-[88%] max-w-[380px] glass-strong border-l border-flow-border p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-flow-text font-heading font-extrabold text-xl">{c("labels.menu")}</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-flow-text p-2 rounded-full hover:bg-flow-card transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col gap-1 w-full">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-flow-text text-2xl md:text-3xl font-heading font-extrabold py-3 hover:text-aurora-1 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-flow-border space-y-4">
                <LanguageSwitcher variant="inline" onSelect={() => setMobileOpen(false)} />
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="shine relative group w-full flex items-center justify-center gap-2 py-4 rounded-full text-lg font-semibold bg-aurora-grad text-white shadow-aurora overflow-hidden"
                >
                  <span className="relative">{t("cta")}</span>
                  <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
