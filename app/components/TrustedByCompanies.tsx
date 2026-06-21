"use client";

import React from "react";
import MovingLogos from "./MovingLogos";
import { motion } from "framer-motion";

const TrustedByCompanies: React.FC = () => {
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-1">
            <span className="w-1.5 h-1.5 rounded-full bg-aurora-1" />
            Our Clients
          </span>
          <p className="text-flow-textSoft font-medium text-sm md:text-base">
            Trusted by forward-thinking teams worldwide
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
