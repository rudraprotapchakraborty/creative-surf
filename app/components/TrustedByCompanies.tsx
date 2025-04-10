"use client";
import React from "react";
import MovingLogos from "./MovingLogos";
import { motion } from "framer-motion";

const TrustedByCompanies: React.FC = () => {
  return (
    <section className="relative z-10 py-16 px-4 sm:px-8 rounded-2xl mx-auto max-w-7xl">
      <div className="w-full flex flex-col items-center justify-center">
        <MovingLogos />
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center text-4xl sm:text-5xl font-extrabold mt-8 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-transparent bg-clip-text"
        >
          Trusted by 50+ Companies Worldwide
        </motion.h2>
      </div>
    </section>
  );
};

export default TrustedByCompanies;
