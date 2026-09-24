"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Check,
  ChevronRight,
  Code2,
  Compass,
  DollarSign,
  Eye,
  Globe,
  Handshake,
  Heart,
  Layers,
  Lightbulb,
  LineChart,
  Mail,
  MapPin,
  Megaphone,
  Monitor,
  MousePointerClick,
  PenLine,
  Phone,
  Plus,
  Quote,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { ActionButton, EASE, KineticHeading, Kicker, Magnetic, ParallaxLayer, SectionHead, Tilt3D } from "./home/shared";

/* ========================================================================== *
 * Page kit — the building blocks every marketing page is assembled from, so
 * the site reads as one authored piece rather than a stack of templates.
 *
 * Pages are server components; these are client components. Functions can't
 * cross that boundary, so icons are passed by name and resolved here.
 * ========================================================================== */

export const ICONS = {
  award: Award,
  book: BookOpen,
  briefcase: Briefcase,
  cart: ShoppingCart,
  chart: BarChart3,
  code: Code2,
  compass: Compass,
  dollar: DollarSign,
  eye: Eye,
  globe: Globe,
  handshake: Handshake,
  heart: Heart,
  layers: Layers,
  lightbulb: Lightbulb,
  lineChart: LineChart,
  mail: Mail,
  megaphone: Megaphone,
  monitor: Monitor,
  pen: PenLine,
  phone: Phone,
  pin: MapPin,
  pointer: MousePointerClick,
  rocket: Rocket,
  search: Search,
  shield: ShieldCheck,
  sparkles: Sparkles,
  star: Star,
  target: Target,
  trending: TrendingUp,
  trophy: Trophy,
  users: Users,
  wrench: Wrench,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;
type IconProp = IconName | LucideIcon;

function resolveIcon(icon: IconProp | undefined, fallback: LucideIcon = Sparkles): LucideIcon {
  if (!icon) return fallback;
  return typeof icon === "string" ? ICONS[icon] ?? fallback : icon;
}

export type Crumb = { label: string; href?: string };
export type Action = { label: string; href: string };

/* -------------------------------------------------------------------------- */
/* Emblem — an icon suspended in turning rings, tilting with the cursor.       */
/* -------------------------------------------------------------------------- */

export function Emblem({
  icon,
  chips = [],
  numeral,
  className = "",
}: {
  icon?: IconProp;
  chips?: string[];
  numeral?: string;
  className?: string;
}) {
  const still = !!useReducedMotion();
  const Icon = resolveIcon(icon);
  const spin = (duration: number, reverse = false) =>
    still ? undefined : { rotate: reverse ? -360 : 360, transition: { duration, repeat: Infinity, ease: "linear" as const } };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
      className={`relative mx-auto w-full max-w-[26rem] aspect-square ${className}`}
    >
      <Tilt3D className="w-full h-full" max={10}>
        <div className="absolute inset-0 rounded-[1.75rem] hairline-card overflow-hidden">
          <div className="absolute inset-0 bg-grid-fine opacity-30" />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 50%, rgb(var(--accent-1) / 0.18), transparent 60%)" }}
          />
          {numeral && (
            <span
              aria-hidden
              className="absolute -bottom-6 -right-2 display select-none tabular-nums text-flow-text/[0.05]"
              style={{ fontSize: "12rem", lineHeight: 1 }}
            >
              {numeral}
            </span>
          )}
        </div>

        <ParallaxLayer depth={14} className="absolute inset-[12%] pointer-events-none">
          <motion.div
            animate={spin(40)}
            className="w-full h-full rounded-full border border-dashed"
            style={{ borderColor: "rgb(var(--accent-1) / 0.3)" }}
          />
        </ParallaxLayer>
        <ParallaxLayer depth={24} className="absolute inset-[24%] pointer-events-none">
          <motion.div animate={spin(26, true)} className="relative w-full h-full rounded-full border border-flow-border">
            <span
              className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
              style={{ background: "rgb(var(--accent-2))", boxShadow: "0 0 16px rgb(var(--accent-2) / 0.8)" }}
            />
          </motion.div>
        </ParallaxLayer>

        <ParallaxLayer depth={40} className="absolute inset-0 grid place-items-center pointer-events-none">
          <motion.div
            animate={still ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="grid place-items-center w-28 h-28 rounded-3xl text-white bg-aurora-grad shadow-aurora"
          >
            <Icon className="w-12 h-12" strokeWidth={1.5} />
          </motion.div>
        </ParallaxLayer>

        {chips.slice(0, 3).map((chip, i) => (
          <ParallaxLayer
            key={chip}
            depth={30 + i * 8}
            className={`absolute pointer-events-none max-w-[60%] ${
              ["top-[9%] left-[5%]", "top-[46%] right-[3%]", "bottom-[9%] left-[10%]"][i]
            }`}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.9 + i * 0.15 }}
              className="inline-flex items-center gap-1.5 rounded-full glass-strong border border-flow-border px-3 py-1.5 text-[11px] font-semibold text-flow-text shadow-soft"
            >
              <Check className="w-3 h-3 flex-shrink-0 text-aurora-1" />
              <span className="truncate">{chip}</span>
            </motion.span>
          </ParallaxLayer>
        ))}
      </Tilt3D>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* PageHero                                                                     */
/* -------------------------------------------------------------------------- */

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 micro text-flow-textSoft">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${i}`} className="inline-flex items-center gap-1.5">
              {crumb.href && !last ? (
                <Link href={crumb.href} className="focus-ring hover:text-flow-text transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className={last ? "text-flow-text" : ""} aria-current={last ? "page" : undefined}>
                  {crumb.label}
                </span>
              )}
              {!last && <ChevronRight className="w-3 h-3 opacity-50" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Page opener. With a `visual` (an icon emblem) or `highlights` it splits into
 * copy + visual; without, it centres like a manifesto.
 */
export function PageHero({
  kicker,
  title,
  accent,
  subtitle,
  crumbs,
  primary,
  secondary,
  highlights,
  icon,
  chips,
}: {
  kicker?: string;
  title: string;
  accent?: string;
  subtitle?: string;
  crumbs?: Crumb[];
  primary?: Action;
  secondary?: Action;
  highlights?: string[];
  icon?: IconName;
  chips?: string[];
}) {
  const still = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const split = Boolean(icon);
  const lines = [{ text: title }, ...(accent ? [{ text: accent, accent: true }] : [])];

  const copy = (
    <div className={split ? "" : "flex flex-col items-center text-center"}>
      {kicker && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
          <Kicker>{kicker}</Kicker>
        </motion.div>
      )}

      <KineticHeading
        className={`display mt-7 ${split ? "" : "flex flex-col items-center [&>div]:justify-center"}`}
        style={{ fontSize: split ? "clamp(2.3rem, 5.2vw, 4.4rem)" : "clamp(2.4rem, 6.2vw, 5.1rem)" }}
        delay={0.1}
        lines={lines}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          className={`mt-6 text-base sm:text-lg leading-relaxed text-flow-textSoft ${split ? "max-w-xl" : "max-w-2xl"}`}
        >
          {subtitle}
        </motion.p>
      )}

      {highlights && highlights.length > 0 && (
        <ul className={`mt-7 grid gap-2.5 ${split ? "" : "text-left"}`}>
          {highlights.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.7 + i * 0.08 }}
              className="flex items-start gap-3 text-sm sm:text-[0.95rem] text-flow-textSoft"
            >
              <span className="mt-0.5 grid place-items-center w-5 h-5 flex-shrink-0 rounded-full text-white bg-aurora-grad">
                <Check className="w-3 h-3" />
              </span>
              {item}
            </motion.li>
          ))}
        </ul>
      )}

      {(primary || secondary) && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
          className={`mt-10 flex flex-wrap items-center gap-4 ${split ? "" : "justify-center"}`}
        >
          {primary && (
            <Magnetic>
              <Link href={primary.href} className="focus-ring inline-block rounded-xl">
                <ActionButton>{primary.label}</ActionButton>
              </Link>
            </Magnetic>
          )}
          {secondary && <GhostLink {...secondary} />}
        </motion.div>
      )}
    </div>
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-flow-bg text-flow-text pt-32 sm:pt-40 pb-16 sm:pb-24">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-40" />
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full aurora-1"
        style={{ width: "46vw", height: "46vw", top: "-16vw", left: "-12vw", filter: "blur(90px)", opacity: 0.32 }}
        animate={still ? undefined : { scale: [1, 1.15, 1], x: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full aurora-2"
        style={{ width: "40vw", height: "40vw", top: "-8vw", right: "-14vw", filter: "blur(90px)", opacity: 0.26 }}
        animate={still ? undefined : { scale: [1.1, 1, 1.1], y: [0, 40, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={still ? undefined : { y, opacity }} className="relative z-10 section-px mx-auto max-w-7xl">
        {crumbs && crumbs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className={`mb-10 sm:mb-14 ${split ? "" : "flex justify-center"}`}
          >
            <Breadcrumbs crumbs={crumbs} />
          </motion.div>
        )}

        {split ? (
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
            {copy}
            <Emblem icon={icon} chips={chips} />
          </div>
        ) : (
          <div className="mx-auto max-w-5xl">{copy}</div>
        )}
      </motion.div>
    </section>
  );
}

/** Quiet outlined link — the secondary action beside an ActionButton. */
export function GhostLink({ label, href, scroll = false }: Action & { scroll?: boolean }) {
  return (
    <Link
      href={href}
      className="focus-ring group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl micro text-flow-text border border-flow-border hover:border-aurora-1/40 transition-colors"
    >
      {label}
      {scroll || href.startsWith("#") ? (
        <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
      ) : (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                      */
/* -------------------------------------------------------------------------- */

export function Section({
  id,
  kicker,
  title,
  accent,
  subline,
  children,
  grid = false,
  width = "wide",
}: {
  id?: string;
  kicker?: string;
  title?: string;
  accent?: string;
  subline?: string;
  children: React.ReactNode;
  /** Faint drafting grid behind the section — use on alternating sections. */
  grid?: boolean;
  width?: "wide" | "normal" | "narrow";
}) {
  const max = { wide: "max-w-7xl", normal: "max-w-5xl", narrow: "max-w-3xl" }[width];
  return (
    <section id={id} className="relative scroll-mt-28 section-py section-px bg-flow-bg text-flow-text overflow-hidden">
      {grid && <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-25" />}
      <div className={`relative z-10 mx-auto ${max}`}>
        {title && (
          <SectionHead className="mb-14 sm:mb-20" label={kicker} heading={title} accent={accent} subline={subline} />
        )}
        {children}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Cards                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Card with a cursor-tracking spotlight and a lit border. Becomes a link only
 * when given an href — pass hrefs through `liveHref` so none lead nowhere.
 */
export function SpotlightCard({
  title,
  description,
  points,
  stat,
  tags,
  eyebrow,
  icon,
  href,
  index,
  cta,
  compact = false,
  numbered = true,
}: {
  title: string;
  description?: string;
  tags?: string[];
  points?: string[];
  stat?: { value: string; label?: string };
  eyebrow?: string;
  icon?: IconProp;
  href?: string;
  index: number;
  cta?: string;
  compact?: boolean;
  numbered?: boolean;
}) {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgb(var(--accent-1) / 0.12), transparent 70%)`;
  const edge = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgb(var(--accent-2) / 0.55), transparent 70%)`;
  const Icon = icon ? resolveIcon(icon) : null;

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const shellClass =
    "focus-ring group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] p-px transition-transform duration-500 hover:-translate-y-1";

  const inner = (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: edge }}
      />
      <div className={`relative flex h-full flex-col rounded-[calc(1.25rem-1px)] bg-flow-bg ${compact ? "p-6" : "p-7 sm:p-8"}`}>
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        {(Icon || numbered) && (
          <div className="relative flex items-start justify-between">
            {Icon ? (
              <div
                className={`grid place-items-center rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${
                  compact ? "w-10 h-10" : "w-12 h-12"
                }`}
                style={{ background: "rgb(var(--accent-1) / 0.1)", border: "1px solid rgb(var(--accent-1) / 0.22)" }}
              >
                <Icon className={compact ? "w-4 h-4" : "w-5 h-5"} style={{ color: "rgb(var(--accent-1))" }} />
              </div>
            ) : (
              <span />
            )}
            {numbered && <span className="micro text-flow-textSoft/50 tabular-nums">{String(index + 1).padStart(2, "0")}</span>}
          </div>
        )}

        {eyebrow && <span className={`relative micro text-aurora-1 ${Icon || numbered ? "mt-6" : ""}`}>{eyebrow}</span>}

        <h3
          className={`relative display-sm text-flow-text transition-colors duration-300 group-hover:text-aurora-1 ${
            eyebrow ? "mt-2" : Icon || numbered ? (compact ? "mt-6" : "mt-8") : ""
          } ${compact ? "text-lg" : "text-xl sm:text-[1.3rem]"}`}
        >
          {title}
        </h3>
        {description && (
          <p className={`relative mt-3 text-sm leading-relaxed text-flow-textSoft ${compact ? "line-clamp-3" : ""}`}>{description}</p>
        )}

        {points && points.length > 0 && <CheckList items={points} className="relative mt-5 !gap-2 [&_li]:text-[0.85rem]" />}

        {tags && tags.length > 0 && (
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
        )}

        {stat && (
          <div className="relative mt-6 pt-5 border-t border-flow-border">
            {stat.label && <span className="block micro text-flow-textSoft/70">{stat.label}</span>}
            <span className="mt-1 block display-sm text-lg text-aurora">{stat.value}</span>
          </div>
        )}

        {href && cta && (
          <span className={`relative mt-auto inline-flex items-center gap-2 micro text-flow-text ${compact ? "pt-6" : "pt-8"}`}>
            <span className="relative">
              {cta}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-aurora-1 transition-transform duration-500 group-hover:scale-x-100" />
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.08 }}
      className="h-full"
    >
      {href ? (
        <Link href={href} onPointerMove={onPointerMove} className={shellClass} style={{ background: "var(--flow-border)" }}>
          {inner}
        </Link>
      ) : (
        <div onPointerMove={onPointerMove} className={shellClass} style={{ background: "var(--flow-border)" }}>
          {inner}
        </div>
      )}
    </motion.div>
  );
}

export type CardItem = {
  title: string;
  description?: string;
  points?: string[];
  stat?: { value: string; label?: string };
  href?: string;
  icon?: IconName;
  tags?: string[];
  eyebrow?: string;
};

export function CardGrid({
  items,
  cta,
  columns = 3,
  compact = false,
  numbered = true,
}: {
  items: CardItem[];
  cta?: string;
  columns?: 2 | 3 | 4;
  compact?: boolean;
  numbered?: boolean;
}) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <div className={`grid grid-cols-1 ${cols} gap-4 sm:gap-5`}>
      {items.map((item, i) => (
        <SpotlightCard key={`${item.title}-${i}`} {...item} index={i} cta={cta} compact={compact} numbered={numbered} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FeatureSplit — copy on one side, an emblem on the other.                    */
/* -------------------------------------------------------------------------- */

export function FeatureSplit({
  id,
  kicker,
  title,
  accent,
  paragraphs = [],
  points = [],
  icon,
  chips,
  reverse = false,
  action,
}: {
  kicker?: string;
  title: string;
  accent?: string;
  paragraphs?: string[];
  points?: string[];
  id?: string;
  icon?: IconName;
  chips?: string[];
  reverse?: boolean;
  action?: Action;
}) {
  return (
    <section id={id} className="relative scroll-mt-28 section-py section-px bg-flow-bg text-flow-text overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: reverse ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className={reverse ? "lg:order-2" : ""}
        >
          {kicker && <span className="micro text-flow-textSoft">{kicker}</span>}
          <h2 className="display mt-4 text-flow-text" style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}>
            {title}
            {accent && (
              <>
                <br />
                <span className="text-aurora">{accent}</span>
              </>
            )}
          </h2>
          <div className="mt-6 space-y-4">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-base leading-relaxed text-flow-textSoft">
                {p}
              </p>
            ))}
          </div>
          {points.length > 0 && <CheckList items={points} className="mt-7" />}
          {action && (
            <div className="mt-9">
              <GhostLink {...action} />
            </div>
          )}
        </motion.div>
        <div className={reverse ? "lg:order-1" : ""}>
          <Emblem icon={icon} chips={chips} />
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`grid gap-3 ${className}`}>
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
          className="flex items-start gap-3 text-sm sm:text-[0.95rem] leading-relaxed text-flow-textSoft"
        >
          <span className="mt-0.5 grid place-items-center w-5 h-5 flex-shrink-0 rounded-full text-white bg-aurora-grad">
            <Check className="w-3 h-3" />
          </span>
          {item}
        </motion.li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Timeline — a rail that fills as you scroll through it.                      */
/* -------------------------------------------------------------------------- */

export type TimelineItem = { label?: string; title: string; body?: string; points?: string[] };

export function Timeline({ items, pointsLabel }: { items: TimelineItem[]; pointsLabel?: string }) {
  const railRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <ol ref={railRef} className="relative mx-auto max-w-3xl">
      <span aria-hidden className="absolute left-[1.625rem] top-2 bottom-2 w-px bg-flow-border" />
      <motion.span
        aria-hidden
        className="absolute left-[1.625rem] top-2 bottom-2 w-px origin-top"
        style={{
          scaleY: fill,
          background: "linear-gradient(to bottom, rgb(var(--accent-1)), rgb(var(--accent-2)))",
          boxShadow: "0 0 12px rgb(var(--accent-2) / 0.6)",
        }}
      />
      {items.map((item, i) => (
        <motion.li
          key={`${item.title}-${i}`}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="group relative pl-20 pb-10 last:pb-0"
        >
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="absolute left-0 top-0 grid place-items-center w-[3.25rem] h-[3.25rem] rounded-full bg-flow-bg border border-flow-border text-xs font-semibold tabular-nums text-aurora-1 transition-colors duration-300 group-hover:border-aurora-1/50"
          >
            {item.label ?? String(i + 1).padStart(2, "0")}
          </motion.span>
          <div className="hairline-card p-6 sm:p-7">
            <h3 className="display-sm text-lg sm:text-xl text-flow-text">{item.title}</h3>
            {item.body && <p className="mt-2 text-sm leading-relaxed text-flow-textSoft">{item.body}</p>}
            {item.points && item.points.length > 0 && (
              <div className="mt-5 pt-5 border-t border-flow-border">
                {pointsLabel && <span className="micro text-flow-textSoft/70">{pointsLabel}</span>}
                <CheckList items={item.points} className="mt-3" />
              </div>
            )}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

/* -------------------------------------------------------------------------- */
/* Stats — numbers count up when they scroll into view.                        */
/* -------------------------------------------------------------------------- */

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const still = !!useReducedMotion();
  // Split "250+", "$1.2M", "98%" into prefix, number and suffix; count the number.
  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  const [display, setDisplay] = useState(match && !still ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!match || !inView || still) return;
    const target = parseFloat(match[2].replace(/,/g, ""));
    const decimals = (match[2].split(".")[1] ?? "").length;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) =>
        setDisplay(`${match[1]}${v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${match[3]}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, still]);

  return <span ref={ref}>{display}</span>;
}

export function StatBand({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className={`grid grid-cols-2 ${items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-px overflow-hidden rounded-[1.25rem] border border-flow-border bg-flow-border`}>
      {items.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
          className="bg-flow-bg p-7 sm:p-9 text-center"
        >
          <div className="display tabular-nums text-aurora" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)" }}>
            <CountUp value={stat.value} />
          </div>
          <div className="mt-2 micro text-flow-textSoft">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* LinkDirectory — grouped link lists, for the sitemap and similar indexes.     */
/* -------------------------------------------------------------------------- */

export type DirectoryGroup = { title: string; href?: string; icon?: IconName; links: Action[] };

export function LinkDirectory({ groups }: { groups: DirectoryGroup[] }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
      {groups.map((group, i) => {
        const Icon = resolveIcon(group.icon, Layers);
        const heading = (
          <span className="flex items-center gap-3">
            <span
              className="grid place-items-center w-10 h-10 rounded-xl flex-shrink-0"
              style={{ background: "rgb(var(--accent-1) / 0.1)", border: "1px solid rgb(var(--accent-1) / 0.22)" }}
            >
              <Icon className="w-4 h-4" style={{ color: "rgb(var(--accent-1))" }} />
            </span>
            <span className="display-sm text-lg text-flow-text">{group.title}</span>
          </span>
        );
        return (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
            className="break-inside-avoid hairline-card p-7"
          >
            {group.href ? (
              <Link href={group.href} className="focus-ring group inline-flex items-center gap-2 hover:text-aurora-1">
                {heading}
                <ArrowUpRight className="w-4 h-4 text-flow-textSoft transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ) : (
              heading
            )}
            {group.links.length > 0 && (
              <ul className="mt-5 space-y-1 border-t border-flow-border pt-4">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="focus-ring group flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 -mx-2 text-sm text-flow-textSoft transition-colors hover:bg-flow-text/[0.04] hover:text-flow-text"
                    >
                      {link.label}
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PeopleStrip — a row of portraits (or initials) that lift on hover.          */
/* -------------------------------------------------------------------------- */

export type Person = { name: string; role: string; photo?: string | null; initials: string; accent: string };

export function PeopleStrip({ people, action }: { people: Person[]; action?: Action }) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {people.map((person, i) => (
          <motion.div
            key={person.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
            className="group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-flow-border transition-transform duration-500 group-hover:-translate-y-1.5">
              {person.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={person.photo}
                  alt={person.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="grid h-full w-full place-items-center" style={{ background: person.accent }}>
                  <span className="display text-white/90" style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)" }}>
                    {person.initials}
                  </span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <h3 className="mt-4 display-sm text-base text-flow-text">{person.name}</h3>
            <p className="mt-0.5 text-xs text-flow-textSoft">{person.role}</p>
          </motion.div>
        ))}
      </div>
      {action && (
        <div className="mt-12 flex justify-center">
          <GhostLink {...action} />
        </div>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* TabbedPanels — a pill switcher whose indicator glides between tabs.         */
/* -------------------------------------------------------------------------- */

export type TabPanel = { label: string; title: string; body?: string; points?: string[]; icon?: IconName };

export function TabbedPanels({ tabs, id }: { tabs: TabPanel[]; id: string }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  if (!tab) return null;
  const Icon = resolveIcon(tab.icon, Layers);

  return (
    <div className="mx-auto max-w-4xl">
      <div role="tablist" className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-2xl glass border border-flow-border p-1">
        {tabs.map((item, i) => (
          <button
            key={item.label}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            onClick={() => setActive(i)}
            className={`focus-ring relative rounded-xl px-5 py-2.5 text-xs font-semibold transition-colors ${
              i === active ? "text-white" : "text-flow-textSoft hover:text-flow-text"
            }`}
          >
            {i === active && (
              <motion.span
                layoutId={`${id}-indicator`}
                className="absolute inset-0 rounded-xl bg-aurora-grad shadow-aurora"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{item.label}</span>
          </button>
        ))}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="relative mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="hairline-card grid gap-8 p-8 sm:p-10 md:grid-cols-[auto_1fr] md:items-start"
          >
            <div className="grid place-items-center w-20 h-20 rounded-2xl text-white bg-aurora-grad shadow-aurora">
              <Icon className="w-9 h-9" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="display-sm text-xl sm:text-2xl text-flow-text">{tab.title}</h3>
              {tab.body && <p className="mt-3 text-[0.95rem] leading-relaxed text-flow-textSoft">{tab.body}</p>}
              {tab.points && tab.points.length > 0 && <CheckList items={tab.points} className="mt-6 sm:grid-cols-2" />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Pricing                                                                      */
/* -------------------------------------------------------------------------- */

export type PricingTier = {
  name: string;
  audience?: string;
  price: string;
  period?: string;
  features: string[];
  href: string;
  cta: string;
  highlight?: boolean;
  badge?: string;
};

export function PricingGrid({ tiers }: { tiers: PricingTier[] }) {
  return (
    <div className={`grid grid-cols-1 ${tiers.length >= 3 ? "lg:grid-cols-3" : "md:grid-cols-2"} gap-5 items-stretch`}>
      {tiers.map((tier, i) => (
        <motion.div
          key={tier.name}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
          className={`relative rounded-[1.5rem] p-px ${tier.highlight ? "lg:-my-4" : ""}`}
          style={{
            background: tier.highlight
              ? "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)), rgb(var(--accent-3)))"
              : "var(--flow-border)",
          }}
        >
          <div className="relative flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-flow-bg p-8">
            {tier.highlight && (
              <>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-60"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgb(var(--accent-1) / 0.14), transparent 60%)" }}
                />
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-aurora-grad px-4 py-1 micro text-[10px] text-white shadow-aurora">
                    {tier.badge}
                  </span>
                )}
              </>
            )}
            <h3 className="relative display-sm text-xl text-flow-text">{tier.name}</h3>
            {tier.audience && <p className="relative mt-2 text-sm text-flow-textSoft">{tier.audience}</p>}
            <div className="relative mt-6 flex items-baseline gap-1">
              <span className={`display tabular-nums ${tier.highlight ? "text-aurora" : "text-flow-text"}`} style={{ fontSize: "2.75rem" }}>
                {tier.price}
              </span>
              {tier.period && <span className="text-sm text-flow-textSoft">{tier.period}</span>}
            </div>
            <div className="relative my-7 h-px bg-flow-border" />
            <CheckList items={tier.features} className="relative" />
            <div className="relative mt-auto pt-9">
              <Link
                href={tier.href}
                className={`focus-ring group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 micro transition-all ${
                  tier.highlight
                    ? "text-white bg-aurora-grad shadow-aurora hover:opacity-90"
                    : "text-flow-text border border-flow-border hover:border-aurora-1/40"
                }`}
              >
                {tier.cta}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Testimonials                                                                 */
/* -------------------------------------------------------------------------- */

export type TestimonialItem = { quote: string; name: string; role?: string; rating?: number };

export function TestimonialGrid({ items }: { items: TestimonialItem[] }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
      {items.map((item, i) => (
        <motion.figure
          key={`${item.name}-${i}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
          className="group break-inside-avoid hairline-card p-7 relative overflow-hidden"
        >
          <Quote className="absolute -top-2 -right-2 w-20 h-20 text-aurora-1/[0.07] transition-transform duration-700 group-hover:rotate-12" />
          {item.rating ? (
            <div className="flex gap-0.5 mb-4" aria-label={`${item.rating} / 5`}>
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className={`w-4 h-4 ${s < item.rating! ? "fill-amber-400 text-amber-400" : "text-flow-border"}`} />
              ))}
            </div>
          ) : null}
          <blockquote className="relative text-[0.95rem] leading-relaxed text-flow-text">“{item.quote}”</blockquote>
          <figcaption className="relative mt-5 flex items-center gap-3">
            <span className="grid place-items-center w-9 h-9 rounded-full text-white text-sm font-semibold bg-aurora-grad">
              {item.name.charAt(0)}
            </span>
            <span>
              <span className="block text-sm font-semibold text-flow-text">{item.name}</span>
              {item.role && <span className="block text-xs text-flow-textSoft">{item.role}</span>}
            </span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ                                                                          */
/* -------------------------------------------------------------------------- */

export type FaqItem = { q: string; a: string };

export function FaqSection({
  kicker,
  title,
  accent,
  items,
  idPrefix,
}: {
  kicker?: string;
  title: string;
  accent?: string;
  items: FaqItem[];
  idPrefix: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative section-py section-px bg-flow-bg text-flow-text">
      <div className="mx-auto max-w-3xl">
        <SectionHead className="mb-12 sm:mb-16" label={kicker} heading={title} accent={accent} />
        <div className="flex flex-col gap-3">
          {items.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `${idPrefix}-faq-${i}`;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                className={`hairline-card overflow-hidden ${isOpen ? "!border-aurora-1/35" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="focus-ring flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="display-sm text-base sm:text-lg text-flow-text">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="grid place-items-center flex-shrink-0 w-8 h-8 rounded-full border border-flow-border text-aurora-1"
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
                    >
                      <p className="px-6 pb-6 -mt-1 text-sm sm:text-[0.95rem] leading-relaxed text-flow-textSoft">{faq.a}</p>
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

/* -------------------------------------------------------------------------- */
/* ClosingCta — the dark panel every page ends on.                              */
/* -------------------------------------------------------------------------- */

export function ClosingCta({
  kicker,
  title,
  accent,
  body,
  button,
  href = "/contact",
  secondary,
}: {
  kicker?: string;
  title: string;
  accent?: string;
  body?: string;
  button: string;
  href?: string;
  secondary?: Action;
}) {
  return (
    <section className="relative section-px pt-6 pb-16 sm:pb-20 bg-flow-bg">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-flow-text px-6 sm:px-14 py-16 sm:py-24 text-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full opacity-30 animate-pulse-glow"
            style={{ background: "radial-gradient(circle, rgb(var(--accent-2)) 0%, transparent 65%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(rgb(var(--accent-3)/0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--accent-3)/0.05) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="relative z-10 flex flex-col items-center">
            <SectionHead onDark label={kicker} heading={title} accent={accent} subline={body} className="mb-10" />
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <Link href={href} className="focus-ring inline-block rounded-xl">
                  <ActionButton onDark>{button}</ActionButton>
                </Link>
              </Magnetic>
              {secondary && (
                <Link
                  href={secondary.href}
                  className="focus-ring inline-flex items-center gap-2 px-7 py-3.5 rounded-xl micro text-flow-bg border border-flow-bg/20 hover:border-flow-bg/45 transition-colors"
                >
                  {secondary.label}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Wraps a page's sections in the shared canvas. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-screen bg-flow-bg">{children}</div>;
}
