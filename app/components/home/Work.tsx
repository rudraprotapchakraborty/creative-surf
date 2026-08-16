"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, Users, TrendingUp, ArrowRight, MapPin } from "lucide-react";

import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";
import { EASE } from "./shared";

const PILL_ICONS = [MapPin, Building2, Users];

export default function Work() {
  const t = useT(homeMessages);

  const stats = [
    { icon: Building2, label: t("realEstate.stats.projects"), value: "50+" },
    { icon: Users, label: t("realEstate.stats.leads"), value: "2,400+" },
    { icon: TrendingUp, label: t("realEstate.stats.quality"), value: "94%" },
  ];

  const images = [
    { src: "/1.png", alt: t("realEstate.images.alt1"), caption: t("realEstate.images.caption1") },
    { src: "/2.png", alt: t("realEstate.images.alt2"), caption: t("realEstate.images.caption2") },
    { src: "/3.png", alt: t("realEstate.images.alt3"), caption: t("realEstate.images.caption3") },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-16, 30]);
  const y3 = useTransform(scrollYProgress, [0, 1], [46, -16]);
  const yValues = [y1, y2, y3];

  return (
    <section id="work" ref={containerRef} className="relative section-py section-px bg-flow-bg">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-flow-text text-flow-bg">
          {/* Ambient */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(rgb(var(--accent-3)/0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--accent-3)/0.06) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-24 w-[560px] h-[560px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, rgb(var(--accent-2)) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-14 lg:gap-10 p-7 sm:p-12 lg:p-16">
            {/* Left — text */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-flow-bg/15 text-xs font-bold uppercase tracking-[0.2em] text-aurora-3 mb-6 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-aurora-3 animate-pulse" />
                {t("realEstate.badge")}
              </span>

              <h2
                className="font-bold leading-tight mb-3 text-flow-bg"
                style={{ fontSize: "clamp(2rem,3.6vw,3.4rem)" }}
              >
                {t("realEstate.headingLine1")}
                <br />
                <span className="text-aurora-shimmer">{t("realEstate.headingAccent")}</span>
              </h2>

              <p className="text-flow-bg/50 text-sm font-medium uppercase tracking-widest mb-5">
                {t("realEstate.subline")}
              </p>

              <p className="text-flow-bg/70 text-base leading-relaxed max-w-lg mb-8">
                {t("realEstate.bodyStart")}{" "}
                <span className="text-flow-bg font-semibold">{t("realEstate.bodyStrong")}</span>{" "}
                {t("realEstate.bodyEnd")}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {t.list("realEstate.pills").map((label, i) => ({ icon: PILL_ICONS[i] ?? MapPin, label })).map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-flow-bg/15 text-aurora-3"
                  >
                    <Icon className="w-3 h-3" />
                    {label}
                  </div>
                ))}
              </div>

              {/* Big stat callouts */}
              <div className="flex flex-wrap gap-x-10 gap-y-6 mb-10">
                {stats.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex flex-col items-start gap-1">
                    <Icon className="w-4 h-4 mb-1 text-aurora-3" />
                    <span className="text-3xl sm:text-4xl font-extrabold text-flow-bg tabular-nums leading-none">
                      {value}
                    </span>
                    <span className="text-xs text-flow-bg/55 leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/real-estate"
                className="group inline-flex items-center gap-3 w-fit px-7 py-3.5 rounded-full font-semibold text-sm text-flow-text bg-flow-bg transition-transform duration-300 hover:-translate-y-0.5"
              >
                {t("realEstate.cta")}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Right — image mosaic */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            >
              <div className="relative h-[420px] sm:h-[480px] lg:h-full lg:min-h-[480px] flex gap-3">
                <motion.div style={{ y: yValues[0] }} className="flex-1 flex flex-col justify-end">
                  <div className="relative h-[75%] rounded-2xl overflow-hidden shadow-2xl">
                    <Image src={images[0].src} alt={images[0].alt} fill className="object-cover object-center" sizes="(max-width:768px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-white/80 flex-shrink-0" />
                      <span className="text-white/90 text-xs font-medium truncate">{images[0].caption}</span>
                    </div>
                  </div>
                </motion.div>

                <div className="flex-1 flex flex-col gap-3">
                  <motion.div style={{ y: yValues[1] }} className="flex-1">
                    <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                      <Image src={images[1].src} alt={images[1].alt} fill className="object-cover object-center" sizes="(max-width:768px) 50vw, 25vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-white/90 text-xs font-medium">{images[1].caption}</span>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div style={{ y: yValues[2] }} className="flex-1">
                    <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                      <Image src={images[2].src} alt={images[2].alt} fill className="object-cover object-top" sizes="(max-width:768px) 50vw, 25vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-white/90 text-xs font-medium">{images[2].caption}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 sm:-left-6 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl bg-flow-bg"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
                >
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-flow-text">{t("realEstate.floatingTitle")}</div>
                  <div className="text-[0.65rem] text-flow-textSoft">{t("realEstate.floatingSub")}</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
