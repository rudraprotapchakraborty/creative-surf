"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { useT } from "@/lib/i18n";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { EASE, Magnetic } from "./shared";

export default function CTA() {
  const t = useT(homeExtraMessages);

  return (
    <section className="relative section-px pt-6 pb-16 sm:pb-20 bg-flow-bg">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-flow-text px-6 sm:px-14 py-16 sm:py-24 text-center"
        >
          {/* Aurora glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full opacity-30"
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-flow-bg/15 text-xs font-bold uppercase tracking-[0.24em] text-aurora-3 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-3 animate-pulse" />
              {t("cta.badge")}
            </span>

            <h2
              className="font-bold leading-[1.05] text-flow-bg mb-6"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.6rem)" }}
            >
              {t("cta.headingLine1")}
              <br />
              <span className="text-aurora-shimmer">{t("cta.headingAccent")}</span>
            </h2>

            <p className="text-flow-bg/60 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              <Magnetic>
                <Link
                  href="/contact"
                  className="focus-ring group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm sm:text-base text-flow-text bg-flow-bg transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {t("cta.ctaPrimary")}
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Magnetic>

              <a
                href={`mailto:${t("cta.ctaSecondary")}`}
                className="focus-ring group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm sm:text-base text-flow-bg border border-flow-bg/20 hover:border-flow-bg/40 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {t("cta.ctaSecondary")}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
