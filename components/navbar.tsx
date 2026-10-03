"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuthUser } from "@/components/auth/use-auth-user";
import { GuestMenu, UserMenu } from "@/components/auth/user-menu";
import { useT } from "@/lib/i18n";
import { navMessages } from "@/lib/i18n/messages/nav";

type NavSection = { label: string; href: string; active: boolean };

/** Measuring before paint keeps the indicator from flashing in from zero width. */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** The real-estate side's gold, as used by its logo and its own chrome. */
const RE_GOLD = "#B8892A";

/**
 * The Marketing / Real Estate switch, shared by the bar and the mobile sheet.
 *
 * The indicator is measured off the active link rather than assuming equal
 * halves: the labels are different lengths, and different again in every
 * locale, so a fractional width would sit visibly off the word it highlights.
 */
function SectionToggle({
  sections,
  color,
  onColor,
  size,
  className,
  onSelect,
}: {
  sections: NavSection[];
  color: string;
  onColor: string;
  size: "sm" | "lg";
  className?: string;
  onSelect?: () => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });
  // The first measurement lands without a transition; otherwise the pill
  // visibly grows from nothing on every page load.
  const [settled, setSettled] = useState(false);
  const activeHref = sections.find((section) => section.active)?.href;

  useIsomorphicLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const active = list.querySelector<HTMLElement>("[data-active='true']");
      if (active) setIndicator({ x: active.offsetLeft - list.clientLeft, width: active.offsetWidth });
    };
    measure();
    const frame = requestAnimationFrame(() => setSettled(true));
    // Labels reflow when the locale or the viewport changes — both move the pill.
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [activeHref, sections.length]);

  return (
    <div ref={listRef} className={`relative flex items-stretch rounded-full bg-cs-ink/[0.05] p-1 ${className ?? ""}`}>
      <span
        aria-hidden
        className={`absolute bottom-1 left-0 top-1 rounded-full ${settled ? "transition-[transform,width] duration-300 ease-out" : ""}`}
        style={{ background: color, width: indicator.width, transform: `translateX(${indicator.x}px)` }}
      />
      {sections.map((section) => (
        <Link
          key={section.href}
          href={section.href}
          onClick={onSelect}
          data-active={section.active}
          aria-current={section.active ? "page" : undefined}
          className={`cs-focus relative z-10 flex-1 whitespace-nowrap rounded-full text-center font-semibold transition-colors duration-200 ${
            size === "sm" ? "px-3 py-1.5 text-[12px]" : "px-4 py-3 text-sm"
          } ${section.active ? onColor : "text-cs-ink2 hover:text-cs-ink"}`}
        >
          {section.label}
        </Link>
      ))}
    </div>
  );
}

/**
 * The site header: a full-width bar that is transparent over the top of a
 * page, gains a surface and hairline once content scrolls under it, steps out
 * of the way while you read down, and comes back the moment you scroll up.
 * It never hides while focus is inside it, so keyboard users can't lose it.
 *
 * Below `lg` the links move into a full-screen sheet, set large, with the
 * primary action pinned to the bottom of the screen where a thumb can reach.
 */
export function Navbar() {
  const pathname = usePathname();
  const t = useT(navMessages);
  const { user } = useAuthUser();
  const still = useReducedMotion() ?? false;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const isRE = pathname.startsWith("/real-estate");

  const navLinks = isRE
    ? [
        { label: t("links.home"), href: "/real-estate" },
        { label: t("links.projects"), href: "/real-estate/projects" },
        { label: t("links.blogs"), href: "/real-estate/blogs" },
      ]
    : [
        { label: t("links.home"), href: "/" },
        { label: t("links.services"), href: "/services" },
        { label: t("links.blogs"), href: "/blogs" },
        { label: t("links.cvBuilder"), href: "/cv-builder" },
        { label: t("links.team"), href: "/team" },
      ];
  // The logo already goes home, so the bar skips the "Home" link; the sheet,
  // which is a full table of contents, keeps it.
  const barLinks = navLinks.slice(1);

  const sections = [
    { label: t("sections.marketing"), href: "/", active: !isRE },
    { label: t("sections.realEstate"), href: "/real-estate", active: isRE },
  ];
  const sectionColor = isRE ? RE_GOLD : "rgb(var(--cs-blue))";
  // Text on that colour. White fails on gold and on the lighter dark-mode
  // blue, so each side names its own.
  const onSection = isRE ? "text-[#140e02]" : "text-cs-onBlue";

  // Section landing pages match exactly; everything else by prefix, so a blog
  // post still lights up "Blogs".
  const isCurrentPage = (href: string) =>
    href === "/" || href === "/real-estate" ? pathname === href : pathname.startsWith(href);

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  // Scroll: surface after the first few pixels; hide on the way down, show on
  // the way up. One listener, one frame of work at most.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > last + 6 && y > 160) setHidden(true);
      else if (y < last - 6 || y < 160) setHidden(false);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // A navigation closes the sheet.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Sheet open: lock the page, move focus in, let Escape close it, and hand
  // focus back to the toggle afterwards.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = sheetRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen;
  const ctaHref = "/contact";
  const ctaLabel = isRE ? t("links.contact") : t("startProject");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[5000] transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-within:translate-y-0 ${
          hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          solid
            ? "border-b border-cs-ink/10 bg-cs-bg/85 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        <nav aria-label={t("mainNav")} className="cs-container flex h-16 items-center gap-6">
          {/* ---- Logo ---- */}
          <Link
            href={isRE ? "/real-estate" : "/"}
            className="cs-focus group -ml-1 flex shrink-0 items-center gap-2.5 rounded-md px-1 py-1"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={isRE ? "/logo2.webp" : "/logo.webp"}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-12"
            />
            <span className="text-[17px] font-extrabold tracking-[-0.035em] text-cs-ink">
              Creative <span style={{ color: isRE ? RE_GOLD : "rgb(var(--cs-blue))" }}>Surf</span>
              <span className="sr-only"> — {t("links.home")}</span>
            </span>
          </Link>

          {/* ---- Desktop links ---- */}
          <ul className="hidden items-center gap-1 lg:flex">
            {barLinks.map((link) => {
              const current = isCurrentPage(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className={`cs-focus relative block rounded-md px-3 py-2 text-[13.5px] font-medium tracking-[-0.005em] transition-colors duration-200 ${
                      current ? "text-cs-ink" : "text-cs-ink2 hover:text-cs-ink"
                    }`}
                  >
                    {link.label}
                    {current && (
                      <span
                        aria-hidden
                        className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                        style={{ background: sectionColor }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ---- Desktop utilities ---- */}
          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <SectionToggle sections={sections} color={sectionColor} onColor={onSection} size="sm" />
            <span aria-hidden className="mx-1 h-5 w-px bg-cs-ink/10" />
            <LanguageSwitcher />
            <ThemeToggle />
            {user ? (
              <UserMenu
                user={user}
                labels={{ menu: t("accountMenu"), profile: t("profile"), logout: t("logout"), loggingOut: t("loggingOut") }}
              />
            ) : (
              <GuestMenu labels={{ menu: t("account"), login: t("login"), register: t("register") }} />
            )}
            <Link
              href={ctaHref}
              className={`cs-focus group/cta ml-2 inline-flex h-10 items-center gap-2 rounded-[10px] px-4 text-[13px] font-semibold transition-[filter,background-color] ${onSection} duration-200 hover:brightness-110`}
              style={{ background: sectionColor }}
            >
              {ctaLabel}
              <ArrowRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5"
              />
            </Link>
          </div>

          {/* ---- Compact bar ---- */}
          <div className="ml-auto flex items-center gap-1 lg:hidden">
            {user && (
              <UserMenu
                user={user}
                labels={{ menu: t("accountMenu"), profile: t("profile"), logout: t("logout"), loggingOut: t("loggingOut") }}
              />
            )}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="site-menu"
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
              className="cs-focus -mr-2 flex h-11 items-center gap-2.5 rounded-md px-2 text-[13px] font-semibold text-cs-ink"
            >
              <span className="hidden sm:inline">{mobileOpen ? t("closeMenu") : t("openMenu")}</span>
              {/* Two bars that cross into an X — the icon is the state. */}
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    mobileOpen ? "top-[5px] rotate-45" : "top-0.5"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    mobileOpen ? "top-[5px] -rotate-45" : "top-[9px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* ---- Mobile sheet ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="site-menu"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("mainNav")}
            initial={still ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={still ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={still ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-[4990] flex flex-col overflow-y-auto bg-cs-bg px-5 pb-6 pt-20 sm:px-8 lg:hidden"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => {
                const current = isCurrentPage(link.href);
                return (
                  <motion.li
                    key={link.href}
                    initial={still ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.08 + i * 0.045 }}
                    className="border-b border-cs-ink/10"
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={current ? "page" : undefined}
                      className="cs-focus flex items-baseline gap-4 rounded-md py-4"
                    >
                      <span className="cs-meta w-6 tabular-nums text-cs-ink3">{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className={`text-[2rem] font-medium leading-none tracking-[-0.04em] ${
                          current ? "text-cs-ink" : "text-cs-ink2"
                        }`}
                      >
                        {link.label}
                      </span>
                      {current && (
                        <span aria-hidden className="ml-auto h-1.5 w-1.5 self-center rounded-full" style={{ background: sectionColor }} />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={still ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col gap-4"
            >
              <SectionToggle sections={sections} color={sectionColor} onColor={onSection} size="lg" onSelect={closeMenu} />
              <ThemeToggle variant="inline" labels={{ light: t("lightMode"), dark: t("darkMode") }} />
              <LanguageSwitcher variant="inline" onSelect={closeMenu} />
            </motion.div>

            <div className="mt-auto flex flex-col gap-3 pt-10">
              {!user && (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="cs-focus flex h-12 items-center justify-center rounded-[10px] border border-cs-ink/15 text-[15px] font-semibold text-cs-ink"
                  >
                    {t("login")}
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="cs-focus flex h-12 items-center justify-center rounded-[10px] border border-cs-ink/15 text-[15px] font-semibold text-cs-ink"
                  >
                    {t("register")}
                  </Link>
                </div>
              )}
              <Link
                href={ctaHref}
                onClick={closeMenu}
                className={`cs-focus flex h-14 items-center justify-center gap-2 rounded-[10px] text-base font-semibold ${onSection}`}
                style={{ background: sectionColor }}
              >
                {ctaLabel}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
