"use client";

import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuthUser } from "@/components/auth/use-auth-user";
import { GuestMenu, UserMenu } from "@/components/auth/user-menu";
import { useT } from "@/lib/i18n";
import { navMessages } from "@/lib/i18n/messages/nav";
import { NAVBAR_PANEL_TOP, NAVBAR_RIGHT_OFFSET } from "@/lib/navbar-offset";

export function Navbar() {
  const pathname = usePathname();
  const t = useT(navMessages);
  const { user } = useAuthUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isRE = pathname.startsWith("/real-estate");

  const navLinks = isRE
    ? [
        { label: t("links.home"),     href: "/real-estate" },
        { label: t("links.projects"), href: "/real-estate/projects" },
        { label: t("links.blogs"),    href: "/real-estate/blogs" },
      ]
    : [
        { label: t("links.home"),      href: "/" },
        { label: t("links.blogs"),     href: "/blogs" },
        { label: t("links.cvBuilder"), href: "/cv-builder" },
      ];

  const sections = [
    { label: t("sections.marketing"),  href: "/",            active: !isRE },
    { label: t("sections.realEstate"), href: "/real-estate", active: isRE  },
  ];
  // Active index drives the sliding indicator (transform-based, so it never
  // depends on scroll position — avoids the layoutId "fly from bottom" jump).
  const activeIndex = isRE ? 1 : 0;
  const activeGrad = isRE
    ? "linear-gradient(135deg,#B8892A,#D4A843)"
    : "linear-gradient(135deg,#0066A2,#0EA5E9)";
  const pillSpring = { type: "spring", stiffness: 400, damping: 34 } as const;

  // Shared by the desktop "Sign up" / "Account" button — whichever is showing is
  // the single primary action, so it keeps the section's accent gradient.
  const primaryPillClass = `shine relative group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white overflow-hidden whitespace-nowrap ${
    isRE ? "" : "bg-aurora-grad shadow-aurora"
  }`;
  const primaryPillStyle = isRE
    ? { background: "linear-gradient(135deg,#B8892A,#D4A843)" }
    : undefined;

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
            w-full px-5 md:px-7 py-2.5 md:py-3 flex items-center justify-between gap-3 md:gap-6
            rounded-full transition-all duration-500
            ${scrolledClass}
          `}
        >
          {/* LOGO */}
          <Link href={isRE ? "/real-estate" : "/"} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-aurora-grad rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <img
                src={isRE ? "/logo2.png" : "/logo.png"}
                alt={t("logoAlt")}
                className="relative w-7 h-7 md:w-8 md:h-8 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="font-heading font-extrabold text-lg md:text-xl tracking-tight text-flow-text">
              Creative <span className="text-aurora">Surf</span>
            </span>
          </Link>

          {/* DESKTOP — nav pill */}
          <div className="hidden md:flex items-center gap-1 glass border border-flow-border px-2 py-1.5 rounded-full">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-flow-textSoft text-xs font-semibold hover:text-flow-text hover:bg-flow-card transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* DESKTOP — section toggle (Marketing ⇄ Real Estate) */}
          <div className="hidden md:flex relative items-stretch rounded-full glass border border-flow-border p-1">
            {/* sliding indicator */}
            <motion.span
              aria-hidden
              className="absolute top-1 bottom-1 left-1 rounded-full shadow-sm"
              style={{ width: "calc(50% - 0.25rem)", background: activeGrad }}
              initial={false}
              animate={{ x: `${activeIndex * 100}%` }}
              transition={pillSpring}
            />
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                aria-current={s.active ? "page" : undefined}
                className={`relative z-10 flex-1 whitespace-nowrap text-center px-5 py-2 rounded-full text-xs font-semibold transition-colors ${
                  s.active ? "text-white" : "text-flow-textSoft hover:text-flow-text"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>

          {/* DESKTOP — language + theme + auth */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            {user ? (
              <UserMenu
                user={user}
                labels={{
                  menu: t("accountMenu"),
                  profile: t("profile"),
                  logout: t("logout"),
                  loggingOut: t("loggingOut"),
                }}
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 rounded-full text-xs font-semibold text-flow-textSoft hover:text-flow-text hover:bg-flow-card transition-all whitespace-nowrap"
                >
                  {t("login")}
                </Link>
                <Link href="/register" className={primaryPillClass} style={primaryPillStyle}>
                  <span className="relative">{t("register")}</span>
                  <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </>
            )}
          </div>

          {/* MOBILE — toggle */}
          <div className="md:hidden flex items-center gap-1">
            {user ? (
              <UserMenu
                user={user}
                detached
                labels={{
                  menu: t("accountMenu"),
                  profile: t("profile"),
                  logout: t("logout"),
                  loggingOut: t("loggingOut"),
                }}
              />
            ) : (
              <GuestMenu
                detached
                labels={{
                  menu: t("account"),
                  login: t("login"),
                  register: t("register"),
                }}
              />
            )}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label={t("toggleMenu")}
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
            className="fixed w-[min(24rem,calc(100vw-2rem))] z-[9999] glass-strong border border-flow-border rounded-2xl shadow-soft overflow-hidden"
            style={{ top: NAVBAR_PANEL_TOP, right: NAVBAR_RIGHT_OFFSET, fontFamily: "var(--font-jakarta)" }}
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
              {/* Section toggle (Marketing ⇄ Real Estate) */}
              <div className="mt-1 relative flex p-1 rounded-2xl glass border border-flow-border">
                {/* sliding indicator */}
                <motion.span
                  aria-hidden
                  className="absolute top-1 bottom-1 left-1 rounded-xl"
                  style={{ width: "calc(50% - 0.25rem)", background: activeGrad }}
                  initial={false}
                  animate={{ x: `${activeIndex * 100}%` }}
                  transition={pillSpring}
                />
                {sections.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={s.active ? "page" : undefined}
                    className={`relative z-10 flex-1 whitespace-nowrap text-center px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      s.active ? "text-white" : "text-flow-textSoft"
                    }`}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>

              {/* Theme */}
              <div className="mt-1">
                <ThemeToggle
                  variant="inline"
                  labels={{ light: t("lightMode"), dark: t("darkMode") }}
                />
              </div>
            </div>

            {/* Language */}
            <div className="border-t border-flow-border p-2">
              <LanguageSwitcher variant="inline" onSelect={() => setMobileOpen(false)} />
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
