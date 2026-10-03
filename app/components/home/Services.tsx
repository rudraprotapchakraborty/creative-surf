"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";
import { servicesMessages } from "@/lib/i18n/messages/services";
import { SERVICES } from "@/app/services/catalog";
import { EASE, SectionHead } from "./shared";

type ServiceCopy = { title: string; description: string; tags: string[] };

/**
 * An index of what we do, with a preview. On desktop the list sits beside a
 * panel that shows whichever service is hovered or focused — its pitch, tags
 * and a way in — so the homepage can say more without growing longer. On
 * small screens each row carries its own one-line pitch instead.
 *
 * The list and copy come from the services messages, so the homepage and the
 * /services page can never advertise different services.
 */
export default function Services() {
  const t = useT(homeMessages);
  const ts = useT(servicesMessages);
  const still = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);

  const services = ts
    .raw<ServiceCopy[]>("items", [])
    .slice(0, SERVICES.length)
    .map((service, i) => ({ ...service, ...SERVICES[i] }));

  const current = services[active] ?? services[0];

  // Spotlight that follows the pointer across the preview panel.
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(460px circle at ${mx}px ${my}px, rgb(var(--accent-1) / 0.12), transparent 70%)`;

  if (!current) return null;
  const CurrentIcon = current.icon;

  return (
    <section id="services" className="relative section-py section-px bg-flow-bg text-flow-text overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHead
          className="mb-12 sm:mb-16"
          label={t("services.badge")}
          heading={t("services.headingLine1")}
          accent={t("services.headingAccent")}
          subline={ts("offerSubtitle")}
          aside={
            <Link
              href="/services"
              className="focus-ring group inline-flex items-center gap-2 micro text-flow-text hover:text-aurora-1 transition-colors"
            >
              {ts("viewAll")}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* ---- The index ---- */}
          <ul className="border-t border-flow-border">
            {services.map(({ title, tags, description, icon: Icon, slug }, i) => {
              const isActive = i === active;
              return (
                <motion.li
                  key={slug}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                  className="relative border-b border-flow-border"
                >
                  <Link
                    href={`/services/${slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={isActive ? "true" : undefined}
                    className="focus-ring group relative flex items-center gap-4 px-2 sm:px-4 py-4 sm:py-5 rounded-lg"
                  >
                    {/* Active wash — slides between rows rather than blinking. */}
                    {isActive && (
                      <motion.span
                        layoutId="services-active"
                        aria-hidden
                        className="absolute inset-0 hidden lg:block rounded-lg"
                        style={{ background: "linear-gradient(90deg, rgb(var(--accent-1) / 0.09), rgb(var(--accent-1) / 0.02))" }}
                        transition={still ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="services-bar"
                        aria-hidden
                        className="absolute left-0 top-3 bottom-3 hidden lg:block w-[3px] rounded-full bg-aurora-grad"
                        transition={still ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}

                    <span
                      className={`relative micro w-6 tabular-nums transition-colors duration-300 ${
                        isActive ? "lg:text-aurora-1" : ""
                      } text-flow-textSoft/50`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="relative grid place-items-center w-10 h-10 flex-shrink-0 rounded-xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                      style={{ background: "rgb(var(--accent-1) / 0.1)", border: "1px solid rgb(var(--accent-1) / 0.18)" }}
                    >
                      <Icon className="w-[18px] h-[18px]" style={{ color: "rgb(var(--accent-1))" }} />
                    </span>

                    <span className="relative min-w-0 flex-1">
                      <span
                        className={`block display-sm text-base sm:text-lg transition-colors duration-300 truncate ${
                          isActive ? "lg:text-aurora-1" : ""
                        } text-flow-text group-hover:text-aurora-1`}
                      >
                        {title}
                      </span>
                      <span className="block text-xs text-flow-textSoft truncate">{tags.join(" · ")}</span>
                      {/* Small screens have no preview panel, so the pitch rides along. */}
                      <span className="mt-1.5 block text-[13px] leading-relaxed text-flow-textSoft/90 line-clamp-2 lg:hidden">
                        {description}
                      </span>
                    </span>

                    <ArrowUpRight
                      className={`relative w-4 h-4 flex-shrink-0 transition-all duration-300 group-hover:text-aurora-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        isActive ? "lg:text-aurora-1" : "text-flow-textSoft"
                      }`}
                    />
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* ---- The preview (desktop) ---- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="hidden lg:block"
          >
            <div
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                mx.set(e.clientX - r.left);
                my.set(e.clientY - r.top);
              }}
              className="relative h-full min-h-[26rem] overflow-hidden rounded-[1.75rem] border border-flow-border bg-flow-cardSolid"
            >
              {/* Ambient: brand glow, fine grid, pointer spotlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-32 -right-32 w-[26rem] h-[26rem] rounded-full opacity-60"
                style={{ background: "radial-gradient(circle, rgb(var(--accent-2) / 0.22), transparent 65%)" }}
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-fine mask-radial-br opacity-40" />
              <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.slug}
                  initial={still ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={still ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative flex h-full flex-col p-9 xl:p-11"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="grid place-items-center w-16 h-16 rounded-2xl shadow-[0_14px_34px_-12px_rgb(var(--accent-1)/0.55)]"
                      style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
                    >
                      <CurrentIcon className="w-7 h-7 text-white" />
                    </span>
                    <span
                      aria-hidden
                      className="display tabular-nums leading-none text-transparent"
                      style={{ fontSize: "5.5rem", WebkitTextStroke: "1px rgb(var(--accent-1) / 0.28)" }}
                    >
                      {String(active + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-8 display-sm text-flow-text" style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)" }}>
                    {current.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-flow-textSoft">{current.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {current.tags.map((tag) => (
                      <span
                        key={tag}
                        className="micro text-[10px] px-3 py-1.5 rounded-lg"
                        style={{ background: "rgb(var(--accent-1) / 0.08)", color: "rgb(var(--accent-2))" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/services/${current.slug}`}
                    className="focus-ring group mt-auto pt-10 inline-flex w-fit items-center gap-2 micro text-flow-text"
                  >
                    <span className="relative">
                      {ts("explore")} {current.title}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-aurora-1 transition-transform duration-500 group-hover:scale-x-100" />
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
