"use client";

import React from "react";
import MovingLogos from "./MovingLogos";
import { motion } from "framer-motion";

const TrustedByCompanies: React.FC = () => {
  return (
    <section className="relative z-10 w-full py-24 px-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden">
      <div className="w-full flex flex-col items-center justify-center text-center relative z-10">
        <MovingLogos />

        {/* Glowing blur circle behind heading */}
        <div className="absolute w-96 h-96 bg-cyan-700/30 rounded-full blur-3xl -z-10 top-20 left-1/2 -translate-x-1/2"></div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          className="px-4 text-4xl sm:text-5xl md:text-6xl text-white font-extrabold mt-14 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text tracking-tight drop-shadow-xl"
        >
          Trusted by{" "}
          <span className="relative inline-block text-white">
            <span className="underline decoration-wavy text-cyan-400 decoration-cyan-500">
              50+
            </span>
            <span className="absolute left-1/2 bottom-0 -mb-2 w-2 h-2 bg-cyan-500 rounded-full animate-ping"></span>
          </span>{" "}
          Companies Worldwide
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-6 px-4 text-lg sm:text-xl text-white/80 max-w-3xl tracking-wide"
        >
          Our clients span industries, countries, and visions. You're in good company.
        </motion.p>
      </div>
    </section>
  );
};

export default TrustedByCompanies;
