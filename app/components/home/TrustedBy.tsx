"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";
import { EASE } from "./shared";

const LOGOS = [
  { src: "/bridgepoint.webp", name: "Bridge Point" },
  { src: "/beeteam.webp", name: "Bee Team" },
  { src: "/icreation.webp", name: "iCreation" },
  { src: "/hm.webp", name: "HM Production" },
  { src: "/nextgen.webp", name: "NextGen Development Properties" },
  { src: "/springfield.webp", name: "Springfield" },
  { src: "/wedvisa.webp", name: "Wedvisa" },
  { src: "/channel_i.webp", name: "Channel I" },
  { src: "/apex-footwear-ltd--600.webp", name: "Apex Footwear Ltd" },
  { src: "/brisket.webp", name: "Brisket & Bistro" },
  { src: "/namimoon.webp", name: "Nami Moon" },
  { src: "/waffletime.webp", name: "Waffle Time" },
  { src: "/zafenity.webp", name: "Zafenity" },
  { src: "/ghuddy.webp", name: "Ghuddy" },
  { src: "/masalaking.webp", name: "Masala King" },
  { src: "/kudos.webp", name: "Kudos" },
];

/**
 * The first thing under the hero, so it is a band rather than a full section:
 * a compact heading and a static grid of equal square client-logo tiles.
 */
export default function TrustedBy() {
  const t = useT(homeMessages);

  return (
    <section aria-labelledby="trusted-heading" className="relative w-full py-16 sm:py-20 bg-flow-bg overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="section-px relative z-10 mx-auto mb-10 sm:mb-12 flex max-w-7xl flex-col items-center text-center"
      >
        <span className="micro mb-4 inline-flex items-center gap-3 text-flow-textSoft">
          <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-aurora-1/60" />
          {t("trustedBy.badge")}
          <span aria-hidden className="h-px w-8 bg-gradient-to-l from-transparent to-aurora-1/60" />
        </span>
        <h2
          id="trusted-heading"
          className="display text-flow-text"
          style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)" }}
        >
          {t("trustedBy.headingStart")} <span className="text-aurora">{t("trustedBy.headingAccent")}</span>{" "}
          {t("trustedBy.headingEnd")}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-flow-textSoft">{t("trustedBy.subtitle")}</p>
      </motion.div>

      <ul className="section-px relative z-10 mx-auto grid max-w-7xl grid-cols-4 gap-3 sm:gap-4 lg:grid-cols-8">
        {LOGOS.map((logo, i) => (
          <motion.li
            key={logo.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 8) * 0.04, ease: EASE }}
            className="group aspect-square overflow-hidden rounded-2xl border border-flow-border bg-white transition-[border-color,box-shadow] duration-300 hover:border-aurora-1/40 hover:shadow-[0_12px_32px_-12px_rgb(var(--accent-1)/0.35)]"
          >
            {/* Each file is pre-padded to a square on its own background, so it fills the tile edge to edge. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={`${logo.name} logo`}
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
