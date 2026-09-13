"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useT } from "@/lib/i18n";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { ActionButton, EASE, Magnetic, SectionHead } from "./shared";

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
            <SectionHead
              onDark
              label={t("cta.badge")}
              heading={t("cta.headingLine1")}
              accent={t("cta.headingAccent")}
              subline={t("cta.subtitle")}
              className="mb-10"
            />

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              <Magnetic>
                <Link href="/contact" className="focus-ring inline-block">
                  <ActionButton onDark>{t("cta.ctaPrimary")}</ActionButton>
                </Link>
              </Magnetic>

              <a
                href={`mailto:${t("cta.ctaSecondary")}`}
                className="focus-ring group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl micro text-flow-bg border border-flow-bg/20 hover:border-flow-bg/45 transition-colors"
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
