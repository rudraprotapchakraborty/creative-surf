"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";
import { EASE } from "./shared";

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

type Logo = (typeof LOGOS)[number];

/**
 * One marquee row. The logos are laid down twice so the CSS animation can
 * slide the track by exactly half its width and loop without a seam; the
 * second copy is hidden from assistive tech so each client is announced once.
 */
function LogoRow({ logos, reverse = false, duration }: { logos: Logo[]; reverse?: boolean; duration: number }) {
  return (
    <div
      className="marquee-track flex w-max gap-4 sm:gap-5 pr-4 sm:pr-5"
      data-reverse={reverse ? "" : undefined}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      {[...logos, ...logos].map((logo, i) => (
        <div
          key={`${logo.name}-${i}`}
          aria-hidden={i >= logos.length || undefined}
          className="group relative flex h-20 w-40 sm:h-24 sm:w-48 flex-shrink-0 items-center justify-center rounded-2xl border border-flow-border bg-white p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-aurora-1/40 hover:shadow-[0_12px_32px_-12px_rgb(var(--accent-1)/0.35)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt={i < logos.length ? `${logo.name} logo` : ""}
            loading="lazy"
            draggable={false}
            className="max-h-full max-w-full object-contain opacity-[0.85] transition-[opacity,transform] duration-500 group-hover:opacity-100 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * The first thing under the hero, so it is a band rather than a full section:
 * a compact heading and two rows of client logos drifting in opposite
 * directions. Pointing at the band pauses it, so a logo can actually be read.
 */
export default function TrustedBy() {
  const t = useT(homeMessages);
  const reversed = [...LOGOS].reverse();

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

      <div
        className="marquee relative flex flex-col gap-4 sm:gap-5"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <LogoRow logos={LOGOS} duration={42} />
        <LogoRow logos={reversed} duration={48} reverse />
      </div>
    </section>
  );
}
