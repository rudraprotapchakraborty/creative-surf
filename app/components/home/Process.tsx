"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { EASE, SectionHead } from "./shared";

type Step = { title: string; description: string };

export default function Process() {
  const t = useT(homeExtraMessages);
  const steps = t.raw<Step[]>("process.steps", []);

  return (
    <section className="relative section-py section-px bg-flow-bg text-flow-text overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-25" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHead
          className="mb-16 sm:mb-24"
          label={t("process.badge")}
          heading={t("process.headingLine1")}
          accent={t("process.headingAccent")}
        />

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-flow-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              className="relative flex flex-col"
            >
              {/* The step number is set large and light — it orders the column
                  without competing with the step's own title. */}
              <div className="relative z-10 flex items-baseline gap-4 mb-4">
                <span
                  className="display flex-shrink-0 bg-flow-bg pr-2 tabular-nums"
                  style={{ fontSize: "2.75rem", color: "rgb(var(--accent-1) / 0.55)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="lg:hidden h-px flex-1 bg-flow-border" />
              </div>
              <h3 className="display-sm text-lg sm:text-xl text-flow-text mb-2.5">{step.title}</h3>
              <p className="text-sm text-flow-textSoft leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
