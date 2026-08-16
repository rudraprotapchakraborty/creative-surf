"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, User, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";
import { EASE, Kicker } from "./shared";

const REVIEW_META = [
  { name: "Sarah Johnson", company: "TechVision Inc.", rating: 5 },
  { name: "Michael Chen", company: "Innovate Solutions", rating: 5 },
  { name: "Emily Rodriguez", company: "StyleHouse Boutique", rating: 5 },
];

type Review = (typeof REVIEW_META)[number] & { position: string; text: string };

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, s) => (
        <Star key={s} className={cn("h-4 w-4", s < rating ? "text-aurora-warm fill-aurora-warm" : "text-flow-border")} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const t = useT(homeMessages);
  const reviews: Review[] = REVIEW_META.map((meta, i) => ({
    ...meta,
    position: t(`reviews.items.${i}.position`),
    text: t(`reviews.items.${i}.text`),
  }));

  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % reviews.length), 6000);
    return () => clearInterval(id);
  }, [reviews.length]);

  const current = reviews[active];

  return (
    <section className="relative section-py section-px bg-flow-surface text-flow-text overflow-hidden border-t border-flow-border">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-30" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="mb-6"><Kicker>{t("reviews.badge")}</Kicker></div>
          <h2 className="font-bold text-flow-text leading-tight" style={{ fontSize: "clamp(2.1rem,4vw,3.6rem)" }}>
            {t("reviews.headingLine1")}<br />
            <span className="text-aurora">{t("reviews.headingAccent")}</span>
          </h2>
        </motion.div>

        {/* Featured rotating quote */}
        <div className="relative min-h-[280px] sm:min-h-[240px] flex flex-col items-center text-center">
          <Quote
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 opacity-[0.08] pointer-events-none"
            style={{ color: "rgb(var(--accent-1))" }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative flex flex-col items-center"
            >
              <StarRating rating={current.rating} />
              <blockquote
                className="font-semibold text-flow-text/90 leading-snug my-7 max-w-3xl"
                style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.75rem)" }}
              >
                "{current.text}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-flow-cardSolid border border-flow-borderStrong flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-flow-textSoft" strokeWidth={1.5} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-flow-text text-sm">{current.name}</div>
                  <div className="text-xs text-flow-textSoft">
                    {current.position}, {current.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Selector dots */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {reviews.map((review, i) => (
            <button
              key={review.name}
              onClick={() => setActive(i)}
              aria-label={`Show testimonial from ${review.name}`}
              className="focus-ring rounded-full transition-all duration-300"
              style={{
                width: active === i ? "2rem" : "0.5rem",
                height: "0.5rem",
                background: active === i ? "rgb(var(--accent-1))" : "rgb(var(--accent-1) / 0.25)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
