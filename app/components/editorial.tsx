"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";

/**
 * Primitives for the editorial layer (homepage, team, blogs). Everything here
 * reads its colour from the --cs-* role tokens, so a section never picks a
 * hue — it picks a role (ink, action, data) and the theme decides the value.
 */

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* -------------------------------------------------------------------------- */
/* Reveal                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Rises into place the first time it scrolls into view. Reduced motion skips
 * the movement and renders in place, rather than fading, so nothing is ever
 * hidden waiting on an observer.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "figure" | "header";
}) {
  const still = useReducedMotion() ?? false;
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={still ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}

/* -------------------------------------------------------------------------- */
/* Meta label                                                                  */
/* -------------------------------------------------------------------------- */

/** "01 — Capabilities": the mono index that opens every section. */
export function Meta({
  index,
  children,
  className,
  tone = "ink",
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "ink" | "gold" | "deep";
}) {
  const color =
    tone === "gold" ? "text-cs-gold" : tone === "deep" ? "text-cs-deepInk/60" : "text-cs-ink3";
  return (
    <p className={cn("cs-meta flex items-center gap-3", color, className)}>
      {index && <span className="tabular-nums">{index}</span>}
      {index && <span aria-hidden className="h-px w-6 bg-current opacity-50" />}
      <span>{children}</span>
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Heading with a serif accent                                                 */
/* -------------------------------------------------------------------------- */

/**
 * The page's one heading device: the line in the grotesk, the accent in the
 * serif italic. Breaking before the accent is a choice per heading, because
 * some short headings read better on a single line.
 */
export function AccentHeading({
  as: Tag = "h2",
  line,
  accent,
  className,
  breakBeforeAccent = true,
  accentClassName,
  id,
}: {
  as?: "h2" | "h3";
  line: React.ReactNode;
  accent?: React.ReactNode;
  className?: string;
  breakBeforeAccent?: boolean;
  accentClassName?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("cs-h2", className)}>
      {line}
      {accent && (
        <>
          {breakBeforeAccent ? <br /> : " "}
          <span className={cn("cs-accent", accentClassName)}>{accent}</span>
        </>
      )}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* Buttons                                                                     */
/* -------------------------------------------------------------------------- */

type ButtonVariant = "primary" | "secondary" | "deep" | "gold";
type ButtonSize = "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-cs-blue text-cs-onBlue hover:bg-cs-blueHover",
  secondary: "text-cs-ink border border-cs-ink/15 hover:border-cs-ink/35 hover:bg-cs-ink/[0.03]",
  // For the dark band: a light face, so the band's one action is unmissable.
  deep: "bg-cs-deepInk text-cs-deep hover:bg-white",
  gold: "bg-cs-gold text-[#140e02] hover:brightness-110",
};

const SIZES: Record<ButtonSize, string> = {
  md: "h-10 px-4 text-[13px] gap-2",
  lg: "h-12 px-5 text-[15px] gap-2.5",
};

/**
 * A link that looks like a button. The arrow is the only thing that moves on
 * hover — it travels out and a twin slides in behind it, so the motion says
 * "this goes somewhere" without the whole control jumping about.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "lg",
  external = false,
  icon = "right",
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  icon?: "right" | "up-right" | "none";
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  const classes = cn(
    "cs-focus group/btn relative inline-flex items-center justify-center whitespace-nowrap rounded-[10px] font-semibold tracking-[-0.01em]",
    "transition-[background-color,border-color,color,filter] duration-200 ease-out",
    VARIANTS[variant],
    SIZES[size],
    className
  );

  const Icon = icon === "up-right" ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      {icon !== "none" && (
        <span aria-hidden className="relative -mr-0.5 inline-flex h-4 w-4 overflow-hidden">
          <Icon
            className={cn(
              "absolute inset-0 h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              icon === "up-right"
                ? "group-hover/btn:translate-x-4 group-hover/btn:-translate-y-4"
                : "group-hover/btn:translate-x-4"
            )}
          />
          <Icon
            className={cn(
              "absolute inset-0 h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              icon === "up-right"
                ? "-translate-x-4 translate-y-4 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
                : "-translate-x-4 group-hover/btn:translate-x-0"
            )}
          />
        </span>
      )}
    </>
  );

  if (external || /^(mailto:|tel:|https?:)/.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

/**
 * A quiet text link with a drawn underline and a small arrow, for secondary
 * routes that shouldn't compete with a button.
 */
export function TextLink({
  href,
  children,
  className,
  tone = "ink",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "ink" | "deep" | "gold";
}) {
  const color =
    tone === "deep"
      ? "text-cs-deepInk hover:text-white"
      : tone === "gold"
        ? "text-cs-gold"
        : "text-cs-ink hover:text-cs-blue";
  return (
    <Link
      href={href}
      className={cn(
        "cs-focus group/tl inline-flex items-center gap-1.5 rounded-sm text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-200",
        color,
        className
      )}
    >
      <span className="cs-underline pb-0.5">{children}</span>
      <ArrowUpRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tl:-translate-y-0.5 group-hover/tl:translate-x-0.5"
      />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Section opener                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The opener used by most sections: the meta label hangs in the left rail
 * (the first three columns), the heading takes the rest, and an optional lede
 * and link sit under the heading. On phones the rail collapses above.
 *
 * The rail is what holds the page together — every section's first line of
 * text starts on the same vertical — so sections that want a different shape
 * still start from it.
 */
export function SectionIntro({
  index,
  label,
  line,
  accent,
  lede,
  aside,
  id,
  tone = "ink",
  className,
  breakBeforeAccent,
}: {
  index: string;
  label: React.ReactNode;
  line: React.ReactNode;
  accent?: React.ReactNode;
  lede?: React.ReactNode;
  aside?: React.ReactNode;
  id?: string;
  tone?: "ink" | "deep";
  className?: string;
  breakBeforeAccent?: boolean;
}) {
  return (
    <Reveal as="header" className={cn("grid gap-y-6 lg:grid-cols-12 lg:gap-x-8", className)}>
      <div className="lg:col-span-3 lg:pt-[0.9rem]">
        <Meta index={index} tone={tone === "deep" ? "gold" : "ink"}>
          {label}
        </Meta>
      </div>
      <div className="lg:col-span-9">
        <AccentHeading
          id={id}
          line={line}
          accent={accent}
          breakBeforeAccent={breakBeforeAccent}
          className={tone === "deep" ? "text-cs-deepInk" : "text-cs-ink"}
          accentClassName={tone === "deep" ? "text-cs-gold" : "text-cs-ink2"}
        />
        {(lede || aside) && (
          <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
            {lede && (
              <p className={cn("cs-lede max-w-[34rem]", tone === "deep" ? "text-cs-deepInk/70" : "text-cs-ink2")}>
                {lede}
              </p>
            )}
            {aside && <div className="shrink-0">{aside}</div>}
          </div>
        )}
      </div>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Page masthead                                                               */
/* -------------------------------------------------------------------------- */

/**
 * The opening of an interior page: a mono dateline across the top, the meta
 * label in the rail, the display heading beside it, and an optional lede,
 * actions and side column. Interior pages share it so they open the same way
 * the homepage does, a size down.
 */
export function Masthead({
  crumbs,
  dateline,
  datelineAside,
  index,
  label,
  title,
  accent,
  lede,
  actions,
  side,
  titleSize = "clamp(2.75rem, 7vw, 6.5rem)",
}: {
  /** The breadcrumb trail after Home; takes the place of a plain dateline. */
  crumbs?: Crumb[];
  dateline?: React.ReactNode;
  datelineAside?: React.ReactNode;
  index: string;
  label: React.ReactNode;
  title: React.ReactNode;
  accent?: React.ReactNode;
  lede?: React.ReactNode;
  actions?: React.ReactNode;
  side?: React.ReactNode;
  titleSize?: string;
}) {
  const still = useReducedMotion() ?? false;
  const fade = (delay: number) => ({
    initial: still ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <header className="bg-cs-bg pt-[5.25rem] text-cs-ink sm:pt-24 lg:pt-[6.5rem]">
      <div className="cs-container">
        <motion.div
          {...fade(0)}
          className="cs-meta flex items-center justify-between gap-6 border-b border-cs-ink/10 pb-4 text-cs-ink3"
        >
          {crumbs ? <Breadcrumbs items={crumbs} /> : <div>{dateline}</div>}
          {datelineAside && <div className="text-right">{datelineAside}</div>}
        </motion.div>

        <div className="grid gap-y-8 pb-14 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-x-8 lg:pb-20 lg:pt-20">
          <motion.div {...fade(0.05)} className="lg:col-span-3 lg:pt-3">
            <Meta index={index}>{label}</Meta>
          </motion.div>
          <div className={side ? "lg:col-span-6" : "lg:col-span-9"}>
            <motion.h1
              {...fade(0.1)}
              className="cs-display text-cs-ink"
              style={{ fontSize: titleSize, lineHeight: 0.95, letterSpacing: "-0.052em" }}
            >
              {title}
              {accent && (
                <>
                  {" "}
                  <span className="cs-accent text-cs-blue">{accent}</span>
                </>
              )}
            </motion.h1>
            {lede && (
              <motion.div {...fade(0.25)} className="cs-lede mt-8 max-w-[36rem] text-cs-ink2">
                {lede}
              </motion.div>
            )}
            {actions && (
              <motion.div {...fade(0.35)} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                {actions}
              </motion.div>
            )}
          </div>
          {side && (
            <motion.div {...fade(0.4)} className="lg:col-span-3 lg:pt-3">
              {side}
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Questions as ruled disclosure rows. Native <details>, so it opens from the
 * keyboard, works before hydration and is announced correctly for free.
 */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-cs-ink/10">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-cs-ink/10">
          <summary className="cs-focus flex cursor-pointer list-none items-start justify-between gap-6 rounded-sm py-6 [&::-webkit-details-marker]:hidden">
            <span className="text-[1.1875rem] font-medium leading-snug tracking-[-0.02em] text-cs-ink transition-colors group-hover:text-cs-blue sm:text-[1.375rem]">
              {item.q}
            </span>
            <span
              aria-hidden
              className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1 ring-inset ring-cs-ink/15 transition-transform duration-300 group-open:rotate-45"
            >
              <Plus className="h-4 w-4" />
            </span>
          </summary>
          <p className="cs-lede max-w-[44rem] pb-7 pr-14 text-cs-ink2">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/** A section with the FAQ list under the standard rail opener. */
export function FaqSection({
  index,
  label,
  line,
  accent,
  items,
  id,
}: {
  index: string;
  label: React.ReactNode;
  line: React.ReactNode;
  accent?: React.ReactNode;
  items: { q: string; a: string }[];
  id: string;
}) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby={id} className="border-t border-cs-ink/10 bg-cs-bg py-24 text-cs-ink md:py-32">
      <div className="cs-container">
        <SectionIntro id={id} index={index} label={label} line={line} accent={accent} breakBeforeAccent={false} />
        <div className="mt-12 lg:ml-[25%] lg:pl-2">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Closing                                                                     */
/* -------------------------------------------------------------------------- */

/** An interior page's last word: one large question, a line of context, the action. */
export function ClosingBlock({
  index,
  label,
  title,
  accent,
  body,
  button,
  href = "/contact",
}: {
  index: string;
  label: React.ReactNode;
  title: React.ReactNode;
  accent?: React.ReactNode;
  body?: React.ReactNode;
  button: React.ReactNode;
  href?: string;
}) {
  return (
    <section className="bg-cs-bg pb-24 text-cs-ink md:pb-32">
      <div className="cs-container">
        <Reveal className="grid gap-8 border-t border-cs-ink/10 pt-12 lg:grid-cols-12 lg:gap-x-8 lg:pt-16">
          <div className="lg:col-span-3">
            <Meta index={index}>{label}</Meta>
          </div>
          <div className="lg:col-span-9">
            <h2
              className="cs-display text-cs-ink"
              style={{ fontSize: "clamp(2.5rem, 6.4vw, 6rem)", lineHeight: 0.95, letterSpacing: "-0.05em" }}
            >
              {title}
              {accent && (
                <>
                  {" "}
                  <span className="cs-accent text-cs-blue">{accent}</span>
                </>
              )}
            </h2>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {body && <p className="cs-lede max-w-[28rem] text-cs-ink2">{body}</p>}
              <ButtonLink href={href}>{button}</ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
