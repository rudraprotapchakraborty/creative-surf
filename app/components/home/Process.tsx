"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { EASE, Kicker } from "./shared";

type Step = { title: string; description: string };

export default function Process() {
  const t = useT(homeExtraMessages);
  const steps = t.raw<Step[]>("process.steps", []);

  return (
    <section className="relative section-py section-px bg-flow-bg text-flow-text overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-25" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start mb-16 sm:mb-20"
        >
          <div className="mb-6"><Kicker>{t("process.badge")}</Kicker></div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 w-full">
            <h2 className="font-bold text-flow-text leading-tight" style={{ fontSize: "clamp(2.1rem,4vw,3.6rem)" }}>
              {t("process.headingLine1")}<br />
              <span className="text-aurora">{t("process.headingAccent")}</span>
            </h2>
            <p className="text-flow-textSoft text-base max-w-sm lg:text-right leading-relaxed">
              {t("process.intro")}
            </p>
          </div>
        </motion.div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-flow-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              className="relative flex flex-col"
            >
              <div className="relative z-10 flex items-center gap-4 mb-5">
                <span
                  className="flex-shrink-0 grid place-items-center w-12 h-12 rounded-2xl font-bold text-sm bg-flow-bg border-2"
                  style={{ borderColor: "rgb(var(--accent-1) / 0.35)", color: "rgb(var(--accent-1))" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="lg:hidden h-px flex-1 bg-flow-border" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-flow-text mb-2">{step.title}</h3>
              <p className="text-sm text-flow-textSoft leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
