"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: "Home", href: "/#home" },
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/#projects" },
    { label: "Pricing", href: "/#pricing" },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
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
          className={`
            w-full px-6 py-4 flex items-center justify-between
            rounded-full border transition-all duration-500
            ${scrolled 
              ? "bg-flow-card/90 border-flow-border backdrop-blur-xl shadow-sm" 
              : "bg-transparent border-transparent"}
          `}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="logo" className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:scale-110" />
            <span className={`font-heading font-extrabold text-lg md:text-xl tracking-tight transition-colors ${scrolled ? 'text-flow-text' : 'text-flow-text'}`}>
              Creative Surf
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8 bg-flow-card/50 px-8 py-2.5 rounded-sm border border-flow-border shadow-sm">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-flow-text/70 text-sm font-semibold hover:text-flow-green transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* DESKTOP CTA & TOGGLE */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/contact"
              className="
                px-6 py-2.5 rounded-sm text-sm font-semibold text-white
                bg-flow-green hover:bg-flow-buttonHover transition-colors shadow-sm
              "
            >
              Get Started
            </Link>
          </div>

          {/* MOBILE MENU BUTTON & TOGGLE */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={`p-2 rounded-sm transition-colors ${scrolled ? 'text-flow-text hover:bg-flow-border' : 'text-flow-text hover:bg-flow-card/50'}`}
            >
              <Menu size={24} />
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
            className="fixed inset-0 bg-flow-bg/95 backdrop-blur-xl z-[9999]"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 h-full w-[85%] max-w-[360px] bg-flow-card border-l border-flow-border shadow-xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-flow-text font-heading font-extrabold text-xl">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-flow-text p-2 rounded-sm hover:bg-flow-border transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6 w-full">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-flow-text/70 text-2xl font-semibold hover:text-flow-green transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-flow-border">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex justify-center py-4 rounded-sm text-lg font-semibold bg-flow-green text-white hover:bg-flow-buttonHover transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
