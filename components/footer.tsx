"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Facebook, Instagram, Linkedin } from "lucide-react";
import { useT } from "@/lib/i18n";
import { footerMessages } from "@/lib/i18n/messages/footer";

const NAV = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "blogs", href: "/blogs" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

const SOCIALS = [
  { Icon: Linkedin, href: "https://www.linkedin.com/company/creative-surf-agency/", label: "LinkedIn" },
  { Icon: Instagram, href: "https://www.instagram.com/creative.surf.agency/", label: "Instagram" },
  { Icon: Facebook, href: "https://www.facebook.com/creative.surf.agency/", label: "Facebook" },
];

const EMAIL = "creativesurfcs@gmail.com";
const PHONE = "+880 1988-467099";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="cs-meta mb-5 text-cs-ink3">{children}</h2>;
}

/**
 * A quiet footer. Every page already ends on its own call to action, so the
 * footer doesn't shout a second one — it is a directory: who we are, where to
 * go, how to reach us. The wordmark set huge and faint along the bottom is
 * the homepage's first line returning as the site's last.
 */
export function Footer() {
  const t = useT(footerMessages);

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-cs-ink/10 bg-cs-bg text-cs-ink">
      <div className="cs-container pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ---- Studio ---- */}
          <div className="lg:col-span-5">
            <Link href="/" className="cs-focus inline-flex items-center gap-2.5 rounded-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.webp" alt="" width={28} height={28} className="h-7 w-7" loading="lazy" />
              <span className="text-[17px] font-extrabold tracking-[-0.035em]">
                Creative <span className="text-cs-blue">Surf</span>
              </span>
            </Link>
            <p className="mt-5 max-w-[22rem] text-[15px] leading-relaxed text-cs-ink2">{t("blurb")}</p>
            <Link
              href="/contact"
              className="cs-focus group mt-7 inline-flex h-11 items-center gap-2 rounded-[10px] bg-cs-blue px-4 text-sm font-semibold text-cs-onBlue transition-colors duration-200 hover:bg-cs-blueHover"
            >
              {t("cta")}
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* ---- Explore ---- */}
          <nav aria-labelledby="footer-explore" className="lg:col-span-2 lg:col-start-7">
            <ColumnTitle>
              <span id="footer-explore">{t("exploreTitle")}</span>
            </ColumnTitle>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="cs-focus cs-underline rounded-sm text-[15px] font-medium text-cs-ink2 transition-colors hover:text-cs-ink"
                  >
                    {t(`links.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Contact ---- */}
          <div className="lg:col-span-4 lg:col-start-9">
            <ColumnTitle>{t("contactTitle")}</ColumnTitle>
            <address className="not-italic">
              <ul className="space-y-3 text-[15px]">
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="cs-focus cs-underline break-all rounded-sm font-medium text-cs-ink transition-colors hover:text-cs-blue"
                  >
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
                    className="cs-focus cs-underline rounded-sm text-cs-ink2 transition-colors hover:text-cs-ink"
                  >
                    {PHONE}
                  </a>
                </li>
                <li className="text-cs-ink2">{t("location")}</li>
                <li>
                  <a
                    href="https://wa.me/8801988467099"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cs-focus group inline-flex items-center gap-1.5 rounded-sm font-medium text-cs-ink transition-colors hover:text-cs-blue"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                    <span className="cs-underline">{t("whatsapp")}</span>
                    <ArrowUpRight
                      aria-hidden
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              </ul>
            </address>

            <ul className="mt-7 flex items-center gap-2">
              {SOCIALS.map(({ Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="cs-focus grid h-10 w-10 place-items-center rounded-full border border-cs-ink/15 text-cs-ink2 transition-colors duration-200 hover:border-cs-ink hover:bg-cs-ink hover:text-cs-bg"
                  >
                    <Icon aria-hidden size={16} strokeWidth={1.9} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Legal ---- */}
        <div className="mt-16 flex flex-col gap-4 border-t border-cs-ink/10 py-6 text-[13px] text-cs-ink3 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights", { year: new Date().getFullYear() })}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link href="/terms" className="cs-focus cs-underline rounded-sm transition-colors hover:text-cs-ink">
                {t("terms")}
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="cs-focus cs-underline rounded-sm transition-colors hover:text-cs-ink">
                {t("privacy")}
              </Link>
            </li>
            <li className="cs-meta">23.81° N · 90.41° E</li>
          </ul>
        </div>
      </div>

      {/* The wordmark, returning. Decorative: the logo link above names it. */}
      <div aria-hidden className="cs-container select-none overflow-hidden">
        <p
          className="translate-y-[0.2em] whitespace-nowrap font-extrabold leading-[0.8] text-cs-ink/[0.06]"
          style={{ fontSize: "clamp(3rem, 15vw, 13.5rem)", letterSpacing: "-0.055em" }}
        >
          Creative Surf
        </p>
      </div>
    </footer>
  );
}
