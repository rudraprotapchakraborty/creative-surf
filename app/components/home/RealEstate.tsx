"use client";

import * as React from "react";
import Image from "next/image";
import { m as motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { CountUp } from "./shared";
import { AccentHeading, ButtonLink, Meta, Reveal } from "@/app/components/editorial";

/**
 * The real-estate arm, as the page's one dark band — deep water after the
 * shallows. It borrows the gold the real-estate side uses everywhere else
 * (its logo, its navbar switch), so the colour itself says "this is the other
 * business" before a word is read.
 */
export default function RealEstate() {
  const t = useT(homeMessages);
  const tx = useT(homeExtraMessages);
  const still = useReducedMotion() ?? false;
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Two speeds of drift, so the photographs separate into layers on scroll.
  const slow = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [40, -40]);
  const fast = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [90, -70]);

  const stats = [
    { value: "50+", label: t("realEstate.stats.projects") },
    { value: "2,400+", label: t("realEstate.stats.leads") },
    { value: "94%", label: t("realEstate.stats.quality") },
  ];

  return (
    <section
      id="real-estate"
      aria-labelledby="real-estate-title"
      className="relative overflow-hidden bg-cs-deep py-24 text-cs-deepInk md:py-32 xl:py-40"
    >
      {/* A single horizon line of light, top edge — the only ornament. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgb(var(--cs-gold) / 0.5), transparent)" }}
      />

      <div ref={ref} className="cs-container grid gap-16 lg:grid-cols-12 lg:gap-8">
        {/* ---- Copy ---- */}
        <div className="lg:col-span-5">
          <Reveal>
            <Meta index="03" tone="gold">
              {tx("sections.realEstate")}
            </Meta>
            <AccentHeading
              id="real-estate-title"
              className="mt-8 text-cs-deepInk"
              line={t("realEstate.headingLine1")}
              accent={t("realEstate.headingAccent")}
              accentClassName="text-cs-gold"
            />
            <p className="cs-lede mt-8 max-w-[30rem] text-cs-deepInk/70">
              {t("realEstate.bodyStart")}{" "}
              <strong className="font-semibold text-cs-deepInk">{t("realEstate.bodyStrong")}</strong>{" "}
              {t("realEstate.bodyEnd")}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="cs-meta mt-8 flex flex-wrap gap-x-5 gap-y-2 text-cs-deepInk/60">
              {t.list("realEstate.pills").map((pill) => (
                <li key={pill} className="flex items-center gap-2">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-cs-gold" />
                  {pill}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href="/real-estate" variant="gold">
                {t("realEstate.cta")}
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* ---- Photographs, each at its own ratio: these are posters with
            type set into them, so any crop would cut a headline. ---- */}
        <div className="relative lg:col-span-6 lg:col-start-7">
          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            <motion.figure style={{ y: slow }} className="col-span-7 self-end">
              <div className="relative aspect-[788/1400] overflow-hidden rounded-lg">
                <Image
                  src="/1.webp"
                  alt={t("realEstate.images.alt1")}
                  fill
                  sizes="(min-width: 1024px) 26vw, 55vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="cs-meta mt-3 text-cs-deepInk/55">{t("realEstate.images.caption1")}</figcaption>
            </motion.figure>

            <div className="col-span-5 flex flex-col gap-3 pt-10 sm:gap-4 sm:pt-16">
              <motion.figure style={{ y: fast }}>
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src="/2.webp"
                    alt={t("realEstate.images.alt2")}
                    fill
                    sizes="(min-width: 1024px) 19vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="cs-meta mt-3 text-cs-deepInk/55">{t("realEstate.images.caption2")}</figcaption>
              </motion.figure>
              <motion.figure style={{ y: fast }}>
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src="/3.webp"
                    alt={t("realEstate.images.alt3")}
                    fill
                    sizes="(min-width: 1024px) 19vw, 40vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="cs-meta mt-3 text-cs-deepInk/55">{t("realEstate.images.caption3")}</figcaption>
              </motion.figure>
            </div>
          </div>
        </div>

        {/* ---- Figures: a ruled ledger across the full width ---- */}
        <dl className="grid grid-cols-1 border-t border-cs-deepInk/15 sm:grid-cols-3 lg:col-span-12">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="flex items-baseline justify-between gap-6 border-b border-cs-deepInk/15 py-6 sm:flex-col sm:items-start sm:justify-start sm:gap-0 sm:border-b-0 sm:border-l sm:py-8 sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="order-2 text-sm text-cs-deepInk/60 sm:mt-3">{stat.label}</dt>
              <dd
                className="order-1 font-medium tabular-nums tracking-[-0.045em] text-cs-deepInk"
                style={{ fontSize: "clamp(2.5rem, 4.6vw, 4.25rem)", lineHeight: 1 }}
              >
                <CountUp value={stat.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
