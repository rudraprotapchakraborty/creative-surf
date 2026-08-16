"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";
import { Kicker } from "./shared";

const LOGOS = [
  { src: "/bridgepoint.jpg", name: "Bridge Point" },
  { src: "/beeteam.jpeg", name: "Bee Team" },
  { src: "/icreation.jpeg", name: "iCreation" },
  { src: "/hm.jpeg", name: "HM Production" },
  { src: "/nextgen.png", name: "NextGen Development Properties" },
  { src: "/springfield.png", name: "Springfield" },
  { src: "/wedvisa.png", name: "Wedvisa" },
  { src: "/channel_i.png", name: "Channel I" },
  { src: "/apex-footwear-ltd--600.png", name: "Apex Footwear Ltd" },
];

export default function TrustedBy() {
  const t = useT(homeMessages);
  const row = [...LOGOS, ...LOGOS];

  return (
    <section className="relative w-full section-py bg-flow-bg overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-25" />

      <div className="section-px mx-auto max-w-7xl flex flex-col items-center text-center relative z-10 mb-14">
        <div className="mb-6"><Kicker>{t("trustedBy.badge")}</Kicker></div>
        <h2 className="font-bold text-flow-text leading-tight mb-3" style={{ fontSize: "clamp(2.1rem, 4vw, 3.6rem)" }}>
          {t("trustedBy.headingStart")} <span className="text-aurora">{t("trustedBy.headingAccent")}</span> {t("trustedBy.headingEnd")}
        </h2>
        <p className="text-flow-textSoft font-medium text-sm md:text-base">{t("trustedBy.subtitle")}</p>
      </div>

      {/* Infinite logo marquee */}
      <div className="relative w-full flex overflow-hidden">
        <div className="absolute top-0 left-0 w-[10vw] h-full bg-gradient-to-r from-flow-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[10vw] h-full bg-gradient-to-l from-flow-bg to-transparent z-10 pointer-events-none" />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 38, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-5 sm:gap-6 px-4 w-max"
        >
          {row.map((logo, i) => (
            <div
              key={i}
              className="group conic-ring relative w-36 h-24 sm:w-44 sm:h-28 flex-shrink-0 rounded-2xl bg-white border border-flow-border shadow-soft flex items-center justify-center p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-aurora"
            >
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
