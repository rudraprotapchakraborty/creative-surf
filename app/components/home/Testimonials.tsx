"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { EASE, SectionHead } from "./shared";

const REVIEW_META = [
  { name: "Sarah Johnson", company: "TechVision Inc.", rating: 5 },
  { name: "Michael Chen", company: "Innovate Solutions", rating: 5 },
  { name: "Emily Rodriguez", company: "StyleHouse Boutique", rating: 5 },
];

/** How long each testimonial stays up before the next one takes over, in ms. */
const DWELL_MS = 7000;

type Review = (typeof REVIEW_META)[number] & { position: string; text: string };

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid flex-shrink-0 place-items-center rounded-full font-bold text-white",
        size === "md" ? "h-12 w-12 text-sm" : "h-9 w-9 text-[11px]"
      )}
      style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
    >
      {initials(name)}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} / 5`}>
      {[...Array(5)].map((_, s) => (
        <Star
          key={s}
          aria-hidden
          className={cn("h-4 w-4", s < rating ? "text-aurora-warm fill-aurora-warm" : "text-flow-border")}
        />
      ))}
    </div>
  );
}

/**
 * One quote at a time, set large, with the reviewers as tabs underneath. The
 * active tab carries a bar that fills over the dwell time; the bar finishing is
 * what advances the carousel, so pausing it (hover or keyboard focus) pauses
 * the rotation too. Reduced motion stops the bar, and with it the autoplay.
 */
export default function Testimonials() {
  const t = useT(homeMessages);
  const tx = useT(homeExtraMessages);
  const still = useReducedMotion() ?? false;
  const reviews: Review[] = REVIEW_META.map((meta, i) => ({
    ...meta,
    position: t(`reviews.items.${i}.position`),
    text: t(`reviews.items.${i}.text`),
  }));

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = (next: number, dir: number) => {
    setDirection(dir);
    setActive((next + reviews.length) % reviews.length);
  };

  const current = reviews[active];

  return (
    <section className="relative section-py section-px bg-flow-surface text-flow-text overflow-hidden border-t border-flow-border">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-30" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHead
          className="mb-14 sm:mb-16"
          label={t("reviews.badge")}
          heading={t("reviews.headingLine1")}
          accent={t("reviews.headingAccent")}
        />

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
          }}
        >
          {/* ---- The quote ---- */}
          <div className="relative overflow-hidden rounded-[1.75rem] border border-flow-border bg-flow-bg px-6 py-12 sm:px-14 sm:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-50"
              style={{ background: "radial-gradient(circle, rgb(var(--accent-2) / 0.18), transparent 65%)" }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-6 top-2 sm:left-10 sm:top-4 font-serif leading-none text-aurora select-none"
              style={{ fontSize: "clamp(6rem, 14vw, 10rem)", opacity: 0.22 }}
            >
              “
            </span>

            <div className="relative min-h-[15rem] sm:min-h-[13rem]" aria-live={paused ? "polite" : "off"}>
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.figure
                  key={active}
                  custom={direction}
                  initial={still ? { opacity: 0 } : { opacity: 0, x: 40 * direction, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={still ? { opacity: 0 } : { opacity: 0, x: -40 * direction, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="flex flex-col items-center text-center"
                >
                  <StarRating rating={current.rating} />
                  <blockquote
                    className="display text-flow-text/90 my-7 max-w-3xl"
                    style={{ fontSize: "clamp(1.25rem, 2.6vw, 2rem)", lineHeight: 1.3 }}
                  >
                    “{current.text}”
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <Avatar name={current.name} />
                    <div className="text-left">
                      <div className="font-bold text-flow-text text-sm">{current.name}</div>
                      <div className="text-xs text-flow-textSoft">
                        {current.position}, {current.company}
                      </div>
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>

          {/* ---- Reviewer tabs + arrows ---- */}
          <div className="mt-5 flex items-stretch gap-3">
            <button
              type="button"
              onClick={() => go(active - 1, -1)}
              aria-label={tx("reviews.prev")}
              className="focus-ring hidden sm:grid w-12 flex-shrink-0 place-items-center rounded-2xl border border-flow-border bg-flow-bg text-flow-textSoft transition-colors hover:border-aurora-1/40 hover:text-aurora-1"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="grid flex-1 grid-cols-3 gap-3">
              {reviews.map((review, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={review.name}
                    type="button"
                    onClick={() => go(i, i >= active ? 1 : -1)}
                    aria-label={tx("reviews.showFrom", { name: review.name })}
                    aria-pressed={isActive}
                    className={cn(
                      "focus-ring group relative flex items-center justify-center sm:justify-start gap-3 overflow-hidden rounded-2xl border px-3 py-3 sm:px-4 text-left transition-colors duration-300",
                      isActive
                        ? "border-aurora-1/35 bg-flow-bg"
                        : "border-flow-border bg-flow-bg/60 hover:bg-flow-bg hover:border-flow-borderStrong"
                    )}
                  >
                    <span className={cn("transition-opacity duration-300", isActive ? "opacity-100" : "opacity-55 group-hover:opacity-90")}>
                      <Avatar name={review.name} size="sm" />
                    </span>
                    <span className="hidden min-w-0 sm:block">
                      <span className={cn("block truncate text-sm font-semibold", isActive ? "text-flow-text" : "text-flow-textSoft")}>
                        {review.name}
                      </span>
                      <span className="block truncate text-[11px] text-flow-textSoft/80">{review.company}</span>
                    </span>

                    {/* Dwell timer — its end advances the carousel. */}
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-flow-border">
                      {isActive && (
                        <span
                          key={`${active}-${direction}`}
                          className="animate-fill-x absolute inset-0 bg-aurora-grad"
                          data-paused={paused ? "" : undefined}
                          style={{ "--fill-duration": `${DWELL_MS}ms` } as React.CSSProperties}
                          onAnimationEnd={() => go(active + 1, 1)}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => go(active + 1, 1)}
              aria-label={tx("reviews.next")}
              className="focus-ring hidden sm:grid w-12 flex-shrink-0 place-items-center rounded-2xl border border-flow-border bg-flow-bg text-flow-textSoft transition-colors hover:border-aurora-1/40 hover:text-aurora-1"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
