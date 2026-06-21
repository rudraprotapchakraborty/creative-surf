"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Creative Surf — shared premium UI primitives.
 *
 * These are the building blocks for the site-wide premium design system.
 * Everything is theme-token aware (flow-* / aurora-*) so it works in both
 * light and dark mode automatically. Import from "@/components/premium".
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Reveal — scroll-triggered fade/slide. Wrap any block to animate it in.    */
/* -------------------------------------------------------------------------- */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Eyebrow — the small uppercase pill label used above headings.             */
/* -------------------------------------------------------------------------- */
export function Eyebrow({
  children,
  icon: Icon,
  className,
}: {
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-1",
        className
      )}
    >
      {Icon ? (
        <Icon className="w-3.5 h-3.5" />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
      )}
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  SectionHeading — eyebrow + headline (with gradient highlight) + blurb.    */
/* -------------------------------------------------------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  highlight?: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2
          className="mt-6 font-bold text-flow-text leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 3.6vw, 3.25rem)" }}
        >
          {title}
          {highlight ? (
            <>
              {" "}
              <span className="text-aurora">{highlight}</span>
            </>
          ) : null}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-5 text-flow-textSoft text-base sm:text-lg leading-relaxed",
              centered ? "max-w-2xl" : "max-w-xl"
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  CtaButton — premium link button. variants: primary | outline | ghost.     */
/* -------------------------------------------------------------------------- */
export function CtaButton({
  href,
  children,
  variant = "primary",
  icon: Icon = ArrowRight,
  showIcon = true,
  external = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  icon?: LucideIcon | null;
  showIcon?: boolean;
  external?: boolean;
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm transition-all focus-ring";
  const variants: Record<string, string> = {
    primary: "px-7 py-3.5 text-white bg-aurora-grad shadow-aurora hover:opacity-95",
    outline:
      "px-7 py-3.5 text-flow-text glass border border-flow-borderStrong hover:border-aurora-1/40",
    ghost: "px-2 py-1 text-flow-textSoft hover:text-flow-text",
  };
  const cls = cn(base, variants[variant], className);
  const inner = (
    <>
      {children}
      {showIcon && Icon ? (
        <Icon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      ) : null}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  PremiumCard — glass card with built-in hover lift.                        */
/* -------------------------------------------------------------------------- */
export function PremiumCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("premium-card p-6 sm:p-8", className)}>{children}</div>;
}

/* -------------------------------------------------------------------------- */
/*  FeatureCard — icon + title + description card.                            */
/* -------------------------------------------------------------------------- */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon?: LucideIcon;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("premium-card group p-6 sm:p-8", className)}>
      {Icon ? (
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-aurora-grad text-white shadow-aurora transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </div>
      ) : null}
      <h3 className="text-lg font-bold text-flow-text mb-2">{title}</h3>
      {description ? (
        <p className="text-flow-textSoft text-sm leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stat — large number + caption.                                           */
/* -------------------------------------------------------------------------- */
export function Stat({
  value,
  label,
  className,
}: {
  value: React.ReactNode;
  label: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="text-3xl sm:text-4xl font-extrabold text-flow-text tabular-nums leading-none">
        {value}
      </span>
      <span className="mt-2 text-xs sm:text-sm font-medium text-flow-textSoft">
        {label}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section — consistent padded section shell with token background.          */
/* -------------------------------------------------------------------------- */
export function Section({
  children,
  className,
  innerClassName,
  id,
  surface = false,
  bordered = true,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  surface?: boolean;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative section-px section-py text-flow-text overflow-hidden",
        surface ? "bg-flow-surface" : "bg-flow-bg",
        bordered && "border-t border-flow-border",
        className
      )}
    >
      <div className={cn("mx-auto max-w-7xl relative z-10", innerClassName)}>
        {children}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  PageHero — premium inner-page hero. Mesh + grid backdrop, animated in.    */
/* -------------------------------------------------------------------------- */
export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  actions,
  breadcrumb,
  align = "left",
  className,
  children,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  highlight?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
}) {
  const centered = align === "center";
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-flow-bg text-flow-text section-px pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 border-b border-flow-border",
        className
      )}
    >
      {/* Ambient backdrop */}
      <div className="absolute inset-0 bg-aurora-mesh opacity-60 pointer-events-none animate-mesh" />
      <div className="absolute inset-0 bg-grid mask-radial pointer-events-none opacity-30" />
      <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-overlay pointer-events-none" />

      <div
        className={cn(
          "relative z-10 mx-auto max-w-7xl flex flex-col",
          centered && "items-center text-center"
        )}
      >
        {breadcrumb ? <div className="mb-6">{breadcrumb}</div> : null}
        {eyebrow ? (
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}
        <Reveal delay={0.05}>
          <h1
            className="mt-6 font-bold leading-[1.05] text-flow-text"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
          >
            {title}
            {highlight ? (
              <>
                {" "}
                <span className="text-aurora">{highlight}</span>
              </>
            ) : null}
          </h1>
        </Reveal>
        {description ? (
          <Reveal delay={0.1}>
            <p className="mt-6 text-flow-textSoft text-base sm:text-lg leading-relaxed max-w-2xl">
              {description}
            </p>
          </Reveal>
        ) : null}
        {actions ? (
          <Reveal delay={0.15}>
            <div
              className={cn(
                "mt-9 flex flex-wrap gap-4",
                centered && "justify-center"
              )}
            >
              {actions}
            </div>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}
