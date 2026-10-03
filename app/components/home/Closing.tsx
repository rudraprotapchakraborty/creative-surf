"use client";

import { MessageCircle } from "lucide-react";
import { useT } from "@/lib/i18n";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { ButtonLink, Meta, Reveal } from "@/app/components/editorial";

/** A thin sine, two screens wide, so it can slide by one and loop unseen. */
function horizon(periods: number, amplitude: number) {
  const width = 2000;
  let d = "M0,20";
  for (let x = 10; x <= width; x += 10) {
    d += ` L${x},${(20 + Math.sin((x / width) * periods * Math.PI * 2) * amplitude).toFixed(1)}`;
  }
  return d;
}

const HORIZON = horizon(6, 9);

/**
 * The close. One question, set as large as the page sets anything after the
 * wordmark, and the three ways to answer it in order of commitment: start a
 * project, write, or message. The drifting line underneath is the hero's
 * swell come back round as the horizon the footer sits on.
 */
export default function Closing() {
  const t = useT(homeExtraMessages);
  const email = t("cta.ctaSecondary");

  return (
    <section aria-labelledby="closing-title" className="relative overflow-hidden bg-cs-bg pb-28 pt-24 md:pb-36 md:pt-32 xl:pt-40">
      <div className="cs-container">
        <Reveal>
          <Meta index="06">{t("sections.contact")}</Meta>
          <h2
            id="closing-title"
            className="cs-display mt-8 text-cs-ink"
            style={{ fontSize: "clamp(3rem, 9.2vw, 9rem)", lineHeight: 0.92, letterSpacing: "-0.05em" }}
          >
            {t("cta.headingLine1")} <span className="cs-accent text-cs-blue">{t("cta.headingAccent")}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid gap-10 border-t border-cs-ink/10 pt-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <p className="cs-lede max-w-[30rem] text-cs-ink2 lg:col-span-5">{t("cta.subtitle")}</p>

          <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href="/contact">{t("cta.ctaPrimary")}</ButtonLink>
              <ButtonLink
                href="https://wa.me/8801988467099"
                external
                variant="secondary"
                icon="up-right"
              >
                <span className="inline-flex items-center gap-2">
                  <MessageCircle aria-hidden className="h-4 w-4" />
                  {t("closing.whatsapp")}
                </span>
              </ButtonLink>
            </div>
            <p className="text-cs-ink2">
              <span className="text-[15px]">{t("closing.or")}</span>{" "}
              <a
                href={`mailto:${email}`}
                className="cs-focus cs-underline break-all rounded-sm text-[clamp(1.25rem,2vw,1.625rem)] font-medium tracking-[-0.03em] text-cs-ink transition-colors hover:text-cs-blue"
              >
                {email}
              </a>
            </p>
          </div>
        </Reveal>
      </div>

      <div aria-hidden className="cs-horizon pointer-events-none absolute inset-x-0 bottom-0 h-10 overflow-hidden">
        <svg viewBox="0 0 2000 40" preserveAspectRatio="none" className="cs-swell-slow h-full w-[200%]">
          <path d={HORIZON} fill="none" stroke="rgb(var(--cs-cyan) / 0.45)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </section>
  );
}
