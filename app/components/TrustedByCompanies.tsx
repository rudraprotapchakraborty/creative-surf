"use client";

import React from "react";
import MovingLogos from "./MovingLogos";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";

const TrustedByCompanies: React.FC = () => {
  const t = useT(homeMessages);

  return (
    <section className="relative w-full py-20 bg-flow-bg overflow-hidden border-t border-flow-border">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-25" />

      <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-center gap-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-1 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
            {t("trustedBy.badge")}
          </span>
          <h2
            className="font-bold text-flow-text leading-tight mb-3"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)" }}
          >
            {t("trustedBy.headingStart")} <span className="text-aurora">{t("trustedBy.headingAccent")}</span> {t("trustedBy.headingEnd")}
          </h2>
          <p className="text-flow-textSoft font-medium text-sm md:text-base">
            {t("trustedBy.subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Logos grid */}
      <div className="w-full relative mt-4">
        <MovingLogos />
      </div>
    </section>
  );
};

export default TrustedByCompanies;
