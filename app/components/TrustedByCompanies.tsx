"use client";

import React from "react";
import MovingLogos from "./MovingLogos";
import { motion } from "framer-motion";

const TrustedByCompanies: React.FC = () => {
  return (
    <section className="w-full py-24 bg-flow-card overflow-hidden border-t border-flow-border">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-flow-text/60 font-medium text-sm tracking-widest uppercase mb-2">
            Trusted by forward-thinking teams worldwide
          </p>
        </motion.div>

      </div>

      {/* Edge-to-Edge Logos container */}
      <div className="w-full relative mt-8">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-flow-card to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-flow-card to-transparent pointer-events-none" />
        
        <MovingLogos />
      </div>
    </section>
  );
};

export default TrustedByCompanies;