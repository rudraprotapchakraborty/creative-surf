"use client";

import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isRE = pathname.startsWith("/real-estate");

  const navLinks = isRE
    ? [
        { label: "Home",     href: "/real-estate" },
        { label: "Projects", href: "/real-estate/projects" },
      ]
    : [
        { label: "Home",  href: "/" },
        { label: "Blogs", href: "/blogs" },
      ];

  const specialBtn = isRE
    ? { label: "Marketing", href: "/" }
    : { label: "Real Estate", href: "/real-estate" };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrolledClass = "glass-strong border border-flow-border shadow-soft";

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[5000]">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`
            w-full px-4 md:px-5 py-2 md:py-2.5 flex items-center justify-between
            rounded-full transition-all duration-500
            ${scrolledClass}
          `}
        >
          {/* LOGO */}
          <Link href={isRE ? "/real-estate" : "/"} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-aurora-grad rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <img
                src="/logo.png"
                alt="logo"
                className="relative w-7 h-7 md:w-8 md:h-8 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="font-heading font-extrabold text-lg md:text-xl tracking-tight text-flow-text">
              Creative <span className="text-aurora">Surf</span>
            </span>
          </Link>

          {/* DESKTOP — nav pill */}
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

          {/* DESKTOP — special button (Real Estate / Marketing) */}
          <div className="hidden md:flex">
            <Link
              href={specialBtn.href}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:opacity-80"
              style={{
                color: isRE ? "#0066A2" : "#B8892A",
                borderColor: isRE ? "#0066A230" : "#B8892A40",
                backgroundColor: isRE ? "#0066A210" : "#B8892A10",
              }}
            >
              {specialBtn.label}
            </Link>
          </div>

          {/* DESKTOP — theme + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className={`shine relative group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white overflow-hidden ${isRE ? "" : "bg-aurora-grad shadow-aurora"}`}
              style={isRE ? { background: "linear-gradient(135deg,#B8892A,#D4A843)" } : undefined}
            >
              <span className="relative">Get Started</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* MOBILE — toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              className="p-2 rounded-full text-flow-text hover:bg-flow-card transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setMobileOpen(false)}
            />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed top-[4.5rem] left-4 right-4 max-w-sm mx-auto z-[9999] glass-strong border border-flow-border rounded-2xl shadow-soft overflow-hidden"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            {/* Nav links */}
            <div className="flex flex-col p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-flow-textSoft hover:text-flow-text hover:bg-flow-card transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={specialBtn.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-flow-card"
                style={{ color: isRE ? "#0066A2" : "#B8892A" }}
              >
                {specialBtn.label}
              </Link>
            </div>

            {/* Divider + CTA */}
            <div className="border-t border-flow-border p-2">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="group flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
