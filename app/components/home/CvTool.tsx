"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { useT } from "@/lib/i18n";
import { cvBuilderMessages } from "@/lib/i18n/messages/cvBuilder";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { AccentHeading, ButtonLink, EASE, Meta, Reveal } from "@/app/components/editorial";

const SCORE = 86;
const RING = 2 * Math.PI * 42;

/**
 * A fragment of the CV builder, not a screenshot of it: a CV sheet with the
 * ATS score panel laid over its corner. When it scrolls in, the gauge fills
 * and the requirements tick off one by one — the same moment the real tool
 * gives you, played back in a second and a half.
 */
function Fragment() {
  const t = useT(homeExtraMessages);
  const still = useReducedMotion() ?? false;
  const ref = React.useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const live = seen || still;
  const met = t.list("tool.met");
  const missing = t.list("tool.missing");
  const total = met.length + missing.length;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[34rem] pb-10 pr-4 sm:pr-10 lg:mx-0 lg:ml-auto">
      {/* ---- The CV sheet ---- */}
      <div
        aria-hidden
        className="relative aspect-[1/1.18] w-[82%] rounded-lg bg-cs-surface p-6 shadow-[0_1px_0_rgb(var(--cs-ink)/0.04),0_30px_60px_-30px_rgb(var(--cs-ink)/0.25)] ring-1 ring-cs-ink/[0.07] sm:p-8"
      >
        <p className="text-lg font-semibold tracking-[-0.02em] text-cs-ink sm:text-xl">{t("tool.cvName")}</p>
        <p className="mt-1 text-sm text-cs-ink2">{t("tool.cvRole")}</p>
        <div className="mt-5 h-px bg-cs-ink/10" />
        {[0.92, 0.78, 0.86, 0.6].map((w, i) => (
          <span key={i} className="mt-3 block h-2 rounded-full bg-cs-ink/[0.08]" style={{ width: `${w * 100}%` }} />
        ))}
        <span className="mt-6 block h-2 w-1/3 rounded-full bg-cs-ink/20" />
        {[0.88, 0.95, 0.7, 0.82, 0.55].map((w, i) => (
          <span key={i} className="mt-3 block h-2 rounded-full bg-cs-ink/[0.08]" style={{ width: `${w * 100}%` }} />
        ))}
        <span className="mt-6 block h-2 w-1/4 rounded-full bg-cs-ink/20" />
        {[0.9, 0.64].map((w, i) => (
          <span key={i} className="mt-3 block h-2 rounded-full bg-cs-ink/[0.08]" style={{ width: `${w * 100}%` }} />
        ))}
      </div>

      {/* ---- The score panel, laid over the sheet ---- */}
      <motion.div
        initial={still ? false : { opacity: 0, y: 24 }}
        animate={live ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="absolute bottom-0 right-0 w-[68%] min-w-[15.5rem] rounded-lg bg-cs-ink p-5 text-cs-bg shadow-[0_30px_60px_-24px_rgb(var(--cs-ink)/0.55)] sm:p-6"
      >
        <div className="flex items-center justify-between">
          <p className="cs-meta text-cs-bg/60">{t("tool.score")}</p>
          <p className="cs-meta rounded-full border border-cs-bg/20 px-2 py-0.5 text-cs-bg/60">{t("tool.example")}</p>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <svg viewBox="0 0 100 100" className="h-[4.5rem] w-[4.5rem] -rotate-90" role="img" aria-label={`${t("tool.score")}: ${SCORE} ${t("tool.scoreOf")}`}>
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="7" />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="rgb(var(--cs-cyan))"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={RING}
              initial={still ? false : { strokeDashoffset: RING }}
              animate={live ? { strokeDashoffset: RING * (1 - SCORE / 100) } : undefined}
              transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
            />
          </svg>
          <div>
            <p className="text-4xl font-semibold tabular-nums tracking-[-0.04em]">{SCORE}</p>
            <p className="text-xs text-cs-bg/60">{t("tool.scoreOf")}</p>
          </div>
        </div>

        <p className="cs-meta mt-5 text-cs-bg/60">
          {t("tool.covered")} · {met.length}/{total}
        </p>
        <ul className="mt-3 space-y-2 text-[13px]">
          {[...met.map((label) => ({ label, ok: true })), ...missing.map((label) => ({ label, ok: false }))].map(
            (item, i) => (
              <motion.li
                key={item.label}
                initial={still ? false : { opacity: 0, x: -8 }}
                animate={live ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.5, ease: EASE, delay: 0.7 + i * 0.14 }}
                className="flex items-center gap-2.5"
              >
                <span
                  className={
                    item.ok
                      ? "grid h-4 w-4 place-items-center rounded-full bg-cs-cyan text-cs-deep"
                      : "grid h-4 w-4 place-items-center rounded-full border border-cs-bg/35 text-cs-bg/60"
                  }
                >
                  {item.ok ? <Check className="h-2.5 w-2.5" strokeWidth={3.5} /> : <Minus className="h-2.5 w-2.5" strokeWidth={3} />}
                </span>
                <span className={item.ok ? "" : "text-cs-bg/60"}>
                  {item.label}
                  {!item.ok && <span className="text-cs-bg/45"> — {t("tool.missingHint")}</span>}
                </span>
              </motion.li>
            )
          )}
        </ul>
      </motion.div>
    </div>
  );
}

/**
 * The free CV builder, as an interlude. It isn't the agency's core offer, but
 * it is the clearest proof of the "AI-powered" in the tagline — something a
 * visitor can use in a minute, today, for nothing.
 */
export default function CvTool() {
  const t = useT(cvBuilderMessages);
  const tx = useT(homeExtraMessages);

  return (
    <section aria-labelledby="tool-title" className="relative overflow-hidden bg-cs-sunken py-24 md:py-32">
      <div className="cs-container grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <Meta index="04">{tx("sections.tool")}</Meta>
          <AccentHeading
            id="tool-title"
            className="mt-8 text-cs-ink"
            line={t("hero.title")}
            accent={t("hero.titleHighlight")}
            accentClassName="text-cs-blue"
          />
          <p className="cs-lede mt-7 max-w-[30rem] text-cs-ink2">{t("hero.subtitle")}</p>
          <ul className="mt-8 space-y-3">
            {t.list("hero.trust").map((item) => (
              <li key={item} className="flex items-center gap-3 text-[15px] text-cs-ink">
                <Check aria-hidden className="h-4 w-4 text-cs-blue" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href="/cv-builder">{t("hero.ctaPrimary")}</ButtonLink>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Fragment />
        </div>
      </div>
    </section>
  );
}
