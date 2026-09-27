"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, BarChart3, Handshake, Plus, Target, Users2, type LucideIcon } from "lucide-react";

import { useT } from "@/lib/i18n";
import { servicesMessages } from "@/lib/i18n/messages/services";
import { ActionButton, Beam, EASE, KineticHeading, Kicker, Magnetic, SectionHead } from "@/app/components/home/shared";
import { SERVICES, type ServiceEntry } from "./catalog";
import { ClosingCta, type FaqItem, type ServiceCopy } from "./parts";

type Step = { step: string; description: string };
type Pillar = { title: string; description: string };
type Service = ServiceCopy & ServiceEntry;

const PILLAR_ICONS: LucideIcon[] = [Target, BarChart3, Users2, Handshake];

/* ------------------------------------------------------------------ *
 * Hero — copy on the left, the six services orbiting the logo on the
 * right. The orbit is the page's table of contents: every icon is a link.
 * ------------------------------------------------------------------ */

function ServiceOrbit({ services }: { services: Service[] }) {
  return (
    <div
      className="orbit relative mx-auto aspect-square w-full max-w-[27rem]"
      style={{ "--orbit-duration": "70s" } as React.CSSProperties}
    >
      {/* Rings */}
      <span aria-hidden className="absolute inset-[6%] rounded-full border border-dashed border-flow-borderStrong" />
      <span aria-hidden className="absolute inset-[24%] rounded-full border border-flow-border" />
      <span
        aria-hidden
        className="absolute inset-[18%] rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, rgb(var(--accent-2) / 0.22), transparent 68%)" }}
      />

      {/* Centre: the mark, with a ring that pulses out from it */}
      <div className="absolute inset-[31%] grid place-items-center">
        <span aria-hidden className="absolute inset-0 rounded-full glass border border-flow-border" />
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: "rgb(var(--accent-2) / 0.5)" }}
          animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" draggable={false} className="relative w-[64%] h-[64%] object-contain" />
      </div>

      {/* The turning ring of services */}
      <div className="orbit-spin absolute inset-0">
        {services.map(({ slug, title, icon: Icon }, i) => {
          const angle = (i / services.length) * Math.PI * 2 - Math.PI / 2;
          const r = 44; // % of the box — sits on the dashed ring at inset 6%.
          return (
            <div
              key={slug}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + r * Math.cos(angle)}%`, top: `${50 + r * Math.sin(angle)}%` }}
            >
              <div className="orbit-counter">
                <Link
                  href={`/services/${slug}`}
                  aria-label={title}
                  className="focus-ring group relative grid place-items-center w-14 h-14 rounded-2xl border border-flow-border bg-flow-bg shadow-[0_10px_30px_-14px_rgb(var(--accent-1)/0.5)] transition-all duration-300 hover:scale-110 hover:border-transparent hover:bg-aurora-grad"
                >
                  <Icon className="w-5 h-5 text-aurora-1 transition-colors duration-300 group-hover:text-white" />
                  <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-flow-text px-2.5 py-1 text-[11px] font-semibold text-flow-bg opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100">
                    {title}
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Hero({ services }: { services: Service[] }) {
  const t = useT(servicesMessages);
  const still = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // The copy lifts and fades as the hero scrolls away, so the page reads as
  // moving past it rather than the section simply being cut off.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Doubled so the marquee can loop at -50% without a visible seam.
  const marquee = [...services, ...services];

  return (
    <section ref={ref} className="relative overflow-hidden bg-flow-bg text-flow-text pt-32 sm:pt-40 pb-14 sm:pb-16">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-40" />
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full aurora-1"
        style={{ width: "46vw", height: "46vw", top: "-14vw", left: "-10vw", filter: "blur(90px)", opacity: 0.35 }}
        animate={still ? undefined : { scale: [1, 1.15, 1], x: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full aurora-2"
        style={{ width: "40vw", height: "40vw", top: "-8vw", right: "-12vw", filter: "blur(90px)", opacity: 0.3 }}
        animate={still ? undefined : { scale: [1.1, 1, 1.1], y: [0, 40, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 section-px mx-auto max-w-7xl grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        <motion.div
          style={still ? undefined : { y: copyY, opacity: copyOpacity }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <Kicker>{t("hero.kicker")}</Kicker>
          </motion.div>

          <KineticHeading
            className="display mt-8 flex flex-col items-center [&>div]:justify-center lg:items-start lg:[&>div]:justify-start"
            style={{ fontSize: "clamp(2.4rem, 4.3vw, 4.1rem)" }}
            delay={0.15}
            lines={[{ text: t("hero.title") }, { text: t("hero.titleAccent"), accent: true }]}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
            className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-flow-textSoft"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <Magnetic>
              <Link href="/contact" className="focus-ring inline-block rounded-xl">
                <ActionButton>{t("hero.ctaPrimary")}</ActionButton>
              </Link>
            </Magnetic>
            <a
              href="#offer"
              className="focus-ring group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl micro text-flow-text border border-flow-border hover:border-aurora-1/40 transition-colors"
            >
              {t("hero.ctaSecondary")}
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          className="hidden lg:block"
        >
          <ServiceOrbit services={services} />
        </motion.div>
      </div>

      {/* Service ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative z-10 mt-14 sm:mt-16 flex overflow-hidden border-y border-flow-border py-5"
        aria-hidden
      >
        <div className="absolute inset-y-0 left-0 w-[12vw] bg-gradient-to-r from-flow-bg to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-[12vw] bg-gradient-to-l from-flow-bg to-transparent z-10" />
        <motion.div
          animate={still ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 36, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-10 pr-10 w-max"
        >
          {marquee.map((service, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className="display-sm text-xl sm:text-2xl text-flow-text/80">{service.title}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-1/60" />
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Offer — a bento of the six services, closing on a call to action.
 * ------------------------------------------------------------------ */

/**
 * Column spans on a three-column grid: 2+1 / 1+2 / 1+1+CTA. Two wide cards
 * break the rows up so six equal tiles don't read as a spreadsheet.
 */
const BENTO_WIDE = new Set([0, 3]);

function ServiceTile({ service, index, cta }: { service: Service; index: number; cta: string }) {
  const { title, description, tags, icon: Icon, slug } = service;
  const wide = BENTO_WIDE.has(index);
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgb(var(--accent-1) / 0.12), transparent 70%)`;
  const edge = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, rgb(var(--accent-2) / 0.6), transparent 70%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.08 }}
      className={`h-full ${wide ? "md:col-span-2" : ""}`}
    >
      <Link
        href={`/services/${slug}`}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(e.clientX - r.left);
          my.set(e.clientY - r.top);
        }}
        className="focus-ring group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] p-px transition-transform duration-500 hover:-translate-y-1"
        style={{ background: "var(--flow-border)" }}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: edge }}
        />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-flow-bg p-7 sm:p-8">
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: spotlight }}
          />

          {/* Wide tiles carry the icon again, huge and faint — texture for the extra width. */}
          {wide && (
            <Icon
              aria-hidden
              strokeWidth={0.75}
              className="pointer-events-none absolute -right-8 -bottom-10 w-60 h-60 text-aurora-1/[0.07] transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-105"
            />
          )}

          <div className="relative flex items-start justify-between">
            <span
              className="relative grid place-items-center w-12 h-12 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:border-transparent group-hover:bg-aurora-grad"
              style={{ border: "1px solid rgb(var(--accent-1) / 0.22)" }}
            >
              <span aria-hidden className="absolute inset-0 rounded-xl bg-aurora-1/10 group-hover:opacity-0 transition-opacity duration-500" />
              <Icon className="relative w-5 h-5 text-aurora-1 transition-colors duration-500 group-hover:text-white" />
            </span>
            <span className="micro text-flow-textSoft/50 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          </div>

          <div className={`relative mt-8 ${wide ? "max-w-md" : ""}`}>
            <h3 className="display-sm text-xl sm:text-[1.35rem] text-flow-text transition-colors duration-300 group-hover:text-aurora-1">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-flow-textSoft">{description}</p>
          </div>

          <div className="relative mt-5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="micro text-[10px] px-2.5 py-1 rounded-md"
                style={{ background: "rgb(var(--accent-1) / 0.07)", color: "rgb(var(--accent-2))" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="relative mt-auto pt-8 inline-flex items-center gap-2 micro text-flow-text">
            <span className="relative">
              {cta}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-aurora-1 transition-transform duration-500 group-hover:scale-x-100" />
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function Offer({ services }: { services: Service[] }) {
  const t = useT(servicesMessages);
  return (
    <section id="offer" className="relative scroll-mt-28 section-py section-px bg-flow-bg text-flow-text overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHead
          align="split"
          className="mb-14 sm:mb-16"
          label={t("offerKicker")}
          heading={t("offerTitle")}
          accent={t("offerAccent")}
          subline={t("offerSubtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((service, i) => (
            <ServiceTile key={service.slug} service={service} index={i} cta={t("explore")} />
          ))}

          {/* Closing tile: the way in, for anyone who has seen enough. */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
            className="md:col-span-2 lg:col-span-1"
          >
            <Link
              href="/contact"
              className="focus-ring group relative flex h-full min-h-[16rem] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-aurora-grad p-7 sm:p-8 text-white"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 w-64 h-64 rounded-full border border-white/20 transition-transform duration-700 group-hover:scale-110"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 w-40 h-40 rounded-full border border-white/25 transition-transform duration-700 group-hover:scale-125"
              />
              <span className="relative micro text-white/75">{t("cta.kicker")}</span>
              <span className="relative mt-10 flex items-end justify-between gap-6">
                <span className="display text-white" style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)", lineHeight: 1.05 }}>
                  {t("hero.ctaPrimary")}
                </span>
                <span className="grid place-items-center w-14 h-14 flex-shrink-0 rounded-2xl bg-white text-aurora-1 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-45">
                  <ArrowUpRight className="w-6 h-6 transition-transform duration-500 group-hover:-rotate-45" />
                </span>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Process — a timeline whose rail fills as you scroll through it, each
 * stage lighting up as the fill reaches it.
 * ------------------------------------------------------------------ */

function Process() {
  const t = useT(servicesMessages);
  const steps = t.raw<Step[]>("process", []);
  const still = useReducedMotion() ?? false;
  const railRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const [scrolled, setScrolled] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const last = Math.max(steps.length - 1, 1);
    setScrolled(Math.min(steps.length, Math.floor(v * last + 0.001) + 1));
  });
  // Reduced motion skips the scrub and shows every stage lit.
  const reached = still ? steps.length : scrolled;

  return (
    <section className="relative section-py section-px bg-flow-bg text-flow-text overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-25" />
      <div className="relative z-10 mx-auto max-w-7xl grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead
            className="lg:items-start lg:text-left lg:[&>span:first-child]:mx-0"
            label={t("processKicker")}
            heading={t("processTitle")}
            accent={t("processAccent")}
            subline={t("processSubtitle")}
          />
          {/* Where the reader is in the process, as a count. */}
          <p className="mt-8 hidden lg:flex items-baseline gap-2 text-flow-textSoft" aria-hidden>
            <span className="display text-5xl text-aurora tabular-nums">{String(Math.max(reached, 1)).padStart(2, "0")}</span>
            <span className="micro">/ {String(steps.length).padStart(2, "0")}</span>
          </p>
        </div>

        <ol ref={railRef} className="relative">
          {/* Rail: a quiet track with a gradient fill driven by scroll. */}
          <span aria-hidden className="absolute left-[1.375rem] top-2 bottom-2 w-px bg-flow-border" />
          <motion.span
            aria-hidden
            className="absolute left-[1.375rem] top-2 bottom-2 w-px origin-top"
            style={{
              scaleY: still ? 1 : fill,
              background: "linear-gradient(to bottom, rgb(var(--accent-1)), rgb(var(--accent-2)))",
              boxShadow: "0 0 12px rgb(var(--accent-2) / 0.6)",
            }}
          />

          {steps.map((item, i) => {
            const lit = i < reached;
            return (
              <motion.li
                key={item.step}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="group relative pl-20 pb-10 last:pb-0"
              >
                <span
                  className={`absolute left-0 top-0 grid place-items-center w-11 h-11 rounded-full border text-sm font-semibold tabular-nums transition-all duration-500 ${
                    lit
                      ? "border-transparent text-white shadow-[0_10px_26px_-10px_rgb(var(--accent-1)/0.7)]"
                      : "bg-flow-bg border-flow-border text-flow-textSoft"
                  }`}
                  style={lit ? { background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" } : undefined}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={`hairline-card p-6 sm:p-7 transition-colors duration-500 ${lit ? "!border-aurora-1/30" : ""}`}>
                  <h3 className="display-sm text-lg sm:text-xl text-flow-text">{item.step}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-flow-textSoft">{item.description}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Why us — a dark band, so the page changes key before the FAQ.
 * ------------------------------------------------------------------ */

function Why() {
  const t = useT(servicesMessages);
  const pillars = t.raw<Pillar[]>("why", []);

  return (
    <section className="relative section-px py-10 sm:py-14 bg-flow-bg text-flow-text">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-flow-text text-flow-bg px-6 py-14 sm:p-14 lg:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(rgb(var(--accent-3)/0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--accent-3)/0.06) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-24 w-[34rem] h-[34rem] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, rgb(var(--accent-2)) 0%, transparent 70%)" }}
          />

          <div className="relative z-10">
            <SectionHead
              align="split"
              onDark
              className="mb-12 sm:mb-16"
              label={t("whyKicker")}
              heading={t("whyTitle")}
              accent={t("whyAccent")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-flow-bg/10">
              {pillars.map((pillar, i) => {
                const Icon = PILLAR_ICONS[i] ?? Target;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                    className={`group relative pt-8 pb-2 sm:pr-8 lg:px-7 border-flow-bg/10 ${i > 0 ? "lg:border-l" : "lg:pl-0"} ${
                      i % 2 === 1 ? "sm:border-l sm:pl-8" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="grid place-items-center w-11 h-11 rounded-xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-6"
                        style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </span>
                      <span className="micro text-flow-bg/35 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="display-sm mt-6 text-lg text-flow-bg">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-flow-bg/60">{pillar.description}</p>
                    <span
                      aria-hidden
                      className="absolute left-0 right-0 top-0 h-px origin-left scale-x-0 bg-aurora-grad transition-transform duration-700 group-hover:scale-x-100"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * FAQ — heading and a way to ask on the left, answers on the right.
 * ------------------------------------------------------------------ */

function Faq() {
  const t = useT(servicesMessages);
  const items = t.raw<FaqItem[]>("faq", []);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative section-py section-px bg-flow-bg text-flow-text">
      <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="lg:sticky lg:top-32 lg:self-start flex flex-col items-start"
        >
          <Beam className="!mx-0 max-w-[12rem] mb-8" />
          <span className="micro mb-5 text-flow-textSoft">{t("faqKicker")}</span>
          <h2 className="display text-flow-text" style={{ fontSize: "clamp(2.1rem, 5vw, 4rem)" }}>
            {t("faqTitle")}
            <br />
            <span className="text-aurora">{t("faqAccent")}</span>
          </h2>
          <Link
            href="/contact"
            className="focus-ring group mt-8 inline-flex items-center gap-2 micro text-flow-text hover:text-aurora-1 transition-colors"
          >
            {t("cta.button")}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="border-t border-flow-border">
          {items.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `services-faq-${i}`;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                className="relative border-b border-flow-border"
              >
                {/* Open item gets a gradient bar on the left edge. */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-aurora-grad origin-top transition-transform duration-500 ${
                    isOpen ? "scale-y-100" : "scale-y-0"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="focus-ring group flex w-full items-center gap-5 py-6 pl-5 pr-1 text-left rounded-lg"
                >
                  <span className={`micro tabular-nums transition-colors duration-300 ${isOpen ? "text-aurora-1" : "text-flow-textSoft/50"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 display-sm text-base sm:text-lg transition-colors duration-300 ${
                      isOpen ? "text-flow-text" : "text-flow-text/85 group-hover:text-aurora-1"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className={`grid place-items-center flex-shrink-0 w-9 h-9 rounded-full border transition-colors duration-300 ${
                      isOpen ? "border-transparent bg-aurora-grad text-white" : "border-flow-border text-aurora-1"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pl-[3.75rem] pr-12 pb-7 -mt-1 text-sm sm:text-[0.95rem] leading-relaxed text-flow-textSoft">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ServicesContent() {
  const t = useT(servicesMessages);
  const services: Service[] = t
    .raw<ServiceCopy[]>("items", [])
    .slice(0, SERVICES.length)
    .map((copy, i) => ({ ...copy, ...SERVICES[i] }));

  return (
    <main className="flex flex-col min-h-screen bg-flow-bg">
      <Hero services={services} />
      <Offer services={services} />
      <Process />
      <Why />
      <Faq />
      <ClosingCta
        kicker={t("cta.kicker")}
        title={t("cta.title")}
        accent={t("cta.titleAccent")}
        body={t("cta.body")}
        button={t("cta.button")}
      />
    </main>
  );
}
