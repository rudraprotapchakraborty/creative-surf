"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";

type ServiceCopy = { title: string };

export default function MarqueeStrip() {
  const t = useT(homeMessages);
  const titles = t.raw<ServiceCopy[]>("services.items", []).map((s) => s.title);
  const row = [...titles, ...titles];

  return (
    <div className="relative w-full overflow-hidden bg-flow-text py-5 sm:py-6">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        className="flex items-center gap-10 sm:gap-14 whitespace-nowrap w-max"
      >
        {row.map((title, i) => (
          <div key={i} className="flex items-center gap-10 sm:gap-14">
            <span
              className="font-bold uppercase tracking-tight text-flow-bg/90"
              style={{ fontSize: "clamp(1.1rem, 2.6vw, 1.9rem)" }}
            >
              {title}
            </span>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-aurora-2 flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
