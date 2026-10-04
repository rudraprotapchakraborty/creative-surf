"use client";

import * as React from "react";
import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { ButtonLink, TextLink } from "@/app/components/editorial";
import SwellReport from "./SwellReport";

/**
 * The homepage intro curtain lifts at --cs-intro-lift (globals.css). The hero
 * sits under it from the first paint, and its entrances are timed from that
 * moment so they play in view rather than behind the curtain.
 */
const INTRO_LIFT_MS = 1000;
const afterIntro = (seconds: number) => `calc(var(--cs-intro-lift) + ${seconds}s)`;

/**
 * The wordmark is the headline, so it is set as one: "Creative" hangs off the
 * left edge, "Surf" drops to the right on the line below, and the tagline and
 * actions sit in the space the stagger opens up. The swell report below is
 * the ocean the old hero painted, redrawn as the outcomes the agency sells.
 *
 * The block is sized in the wordmark's own em, so the tagline's position stays
 * locked to the letterforms at every width instead of drifting off them.
 */

/** Dhaka time, ticking — a small proof of a real studio in a real place. */
function useDhakaTime() {
  const [time, setTime] = React.useState<string | null>(null);
  React.useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dhaka",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function Line({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    // The clip is padded below so descenders and the rising glyphs aren't
    // cropped, then pulled back so the padding doesn't open the leading.
    <span className={`block overflow-hidden pb-[0.08em] -mb-[0.08em] ${className ?? ""}`}>
      <span className="cs-rise inline-block" style={{ animationDelay: afterIntro(delay) }}>
        {children}
      </span>
    </span>
  );
}

export default function Hero() {
  const t = useT(homeExtraMessages);
  const th = useT(homeMessages);
  const time = useDhakaTime();
  // The swell draws its line once the intro curtain has lifted, not behind it.
  const [introDone, setIntroDone] = React.useState(false);
  React.useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), INTRO_LIFT_MS);
    return () => clearTimeout(timer);
  }, []);

  // Entrances are CSS (see .cs-enter / .cs-glide in globals.css), in the HTML
  // from the first paint and timed to begin as the intro curtain lifts.
  const delay = (seconds: number) => ({ animationDelay: afterIntro(seconds) });

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-cs-bg pt-[5.25rem] sm:pt-24 lg:pt-[6.5rem]"
    >
      <div className="cs-container">
        {/* ---- Dateline ---- */}
        <div
          style={delay(0.05)}
          className="cs-enter cs-meta flex items-center justify-between gap-6 border-b border-cs-ink/10 pb-4 text-cs-ink3"
        >
          <p>
            <span className="text-cs-ink">{t("hero.agency")}</span>
            <span aria-hidden className="mx-2 opacity-50">/</span>
            {t("hero.location")}
          </p>

          <ul aria-label={t("hero.disciplinesLabel")} className="hidden items-center gap-x-4 lg:flex xl:gap-x-5">
            {t.list("hero.disciplines").map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          <p className="flex items-center gap-3 tabular-nums">
            <span className="hidden sm:inline">{t("hero.coords")}</span>
            {time && (
              <span className="text-cs-ink">
                <span className="sr-only">Dhaka </span>
                {time} <span className="text-cs-ink3">GMT+6</span>
              </span>
            )}
          </p>
        </div>

        {/* ---- Wordmark + tagline ---- */}
        {/* Wordmark scale: as wide as a phone allows, then a touch under the
            full measure on larger screens so the swell clears the fold. */}
        <div className="relative pt-8 text-[clamp(4.4rem,23vw,7rem)] sm:pt-10 sm:text-[19vw] lg:pt-8 lg:text-[min(18vw,16rem)]">
          <h1
            id="hero-title"
            className="font-extrabold"
            style={{ fontSize: "1em", lineHeight: 0.84, letterSpacing: "-0.055em" }}
          >
            <Line delay={0.1} className="text-cs-blue">
              Creative
            </Line>
            {/* The lines are blocks, so without this the accessible name is "CreativeSurf". */}{" "}
            <Line delay={0.2} className="text-right text-cs-cyan">
              {/* Optical alignment: the S overshoots the right edge less than
                  the C does the left, so it's nudged to sit on the margin. */}
              <span className="inline-block translate-x-[0.03em]">Surf</span>
            </Line>
          </h1>

          {/* Tagline + actions: in the pocket the stagger opens beside "Surf"
              on wide screens, under the wordmark on narrow ones. Only these
              two go in the pocket — it is one line of the wordmark tall, and
              anything more would climb into "Creative". */}
          <div className="mt-8 max-w-[30rem] lg:absolute lg:bottom-[0.1em] lg:left-0 lg:mt-0 lg:max-w-[min(30rem,42%)]">
            <p
              className="cs-glide font-medium text-cs-ink"
              style={{ ...delay(0.3), fontSize: "clamp(1.45rem, 2.15vw, 2rem)", lineHeight: 1.12, letterSpacing: "-0.03em" }}
            >
              Surfing Growth with{" "}
              <span className="cs-accent whitespace-nowrap text-cs-blue">AI-Powered Creativity.</span>
            </p>
            <p style={delay(0.4)} className="cs-glide mt-4 max-w-[26rem] text-[15px] leading-relaxed text-cs-ink2 lg:hidden">
              {th("hero.subtitle")}
            </p>
            <div style={delay(0.5)} className="cs-enter mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href="/contact">{t("hero.ctaPrimary")}</ButtonLink>
              <TextLink href="#work">{t("hero.ctaSecondary")}</TextLink>
            </div>
          </div>
        </div>

        {/* ---- The swell ---- */}
        <div style={delay(0.6)} className="cs-glide mt-12 pb-10 sm:mt-14 lg:mt-10 lg:pb-14">
          <SwellReport ready={introDone} />
        </div>
      </div>
    </section>
  );
}
