"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, Users, TrendingUp, ArrowRight, MapPin } from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stats = [
  { icon: Building2, label: "Projects Marketed", value: "50+" },
  { icon: Users,     label: "Verified Leads",    value: "2,400+" },
  { icon: TrendingUp,label: "Avg. Lead Quality", value: "94%" },
];

const images = [
  { src: "/1.png", alt: "Springfield – Bashundhara R/A", caption: "Bashundhara R/A" },
  { src: "/2.png", alt: "Spacious Living, Perfectly Designed", caption: "2200 SqFt · 18 Katha" },
  { src: "/3.png", alt: "Ongoing Project – Springfield",     caption: "Ongoing Project" },
];

export default function RealEstateSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -20]);

  const yValues = [y1, y2, y3];

  return (
    <section
      ref={containerRef}
      id="real-estate"
      className="relative overflow-hidden border-t border-flow-border bg-flow-bg"
    >
      {/* Subtle architectural grid bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--accent-1)/0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--accent-1)/0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 w-[700px] h-[700px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, rgb(var(--accent-2)) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl py-20 sm:py-24 md:py-28 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">

          {/* ───── Left: Text ───── */}
          <motion.div
            className="lg:w-1/2 flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {/* Niche badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-1 mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-1 animate-pulse" />
              Real Estate Marketing
            </span>

            {/* Headline */}
            <h2
              className="font-bold text-flow-text leading-tight mb-3"
              style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)" }}
            >
              Your project deserves
              <br />
              <span className="text-aurora-shimmer">the right audience.</span>
            </h2>

            {/* Niche sub-line */}
            <p className="text-flow-textSoft text-sm font-medium uppercase tracking-widest mb-5">
              Let us help it reach its niche.
            </p>

            {/* Body */}
            <p className="text-flow-textSoft text-base leading-relaxed max-w-lg mb-8">
              Connect with verified buyers, investors, and land share partners.{" "}
              <span className="text-flow-text font-semibold">No time wasters</span> — only
              high-intent leads who are ready to move.
            </p>

            {/* Proof pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {[
                { icon: MapPin, label: "Bashundhara R/A" },
                { icon: Building2, label: "Apartment Projects" },
                { icon: Users, label: "Land Share Partners" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgb(var(--accent-1)/0.08)",
                    border: "1px solid rgb(var(--accent-1)/0.18)",
                    color: "rgb(var(--accent-1))",
                  }}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-start gap-1 p-4 rounded-2xl border border-flow-border bg-flow-cardSolid"
                >
                  <Icon className="w-4 h-4 mb-1" style={{ color: "rgb(var(--accent-2))" }} />
                  <span
                    className="text-xl font-black text-flow-text"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {value}
                  </span>
                  <span className="text-[0.7rem] text-flow-textSoft leading-tight">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/real-estate"
              className="group inline-flex items-center gap-3 w-fit px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))",
                color: "#fff",
                boxShadow: "0 0 24px rgb(var(--accent-1)/0.3)",
              }}
            >
              Explore Real Estate Marketing
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* ───── Right: Image Mosaic ───── */}
          <motion.div
            className="lg:w-1/2 w-full relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            <div className="relative h-[520px] sm:h-[580px] flex gap-3">

              {/* Column 1 — tall, offset down */}
              <motion.div style={{ y: yValues[0] }} className="flex-1 flex flex-col justify-end">
                <div className="relative h-[75%] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src={images[0].src}
                    alt={images[0].alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width:768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-white/80 flex-shrink-0" />
                    <span className="text-white/90 text-xs font-medium truncate">{images[0].caption}</span>
                  </div>
                </div>
              </motion.div>

              {/* Column 2 — two stacked cards */}
              <div className="flex-1 flex flex-col gap-3">
                <motion.div style={{ y: yValues[1] }} className="flex-1">
                  <div className="relative h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image
                      src={images[1].src}
                      alt={images[1].alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width:768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-white/90 text-xs font-medium">{images[1].caption}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div style={{ y: yValues[2] }} className="flex-1">
                  <div className="relative h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image
                      src={images[2].src}
                      alt={images[2].alt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width:768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-white/90 text-xs font-medium">{images[2].caption}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>

            {/* Floating "niche" card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
              className="absolute -bottom-4 -left-4 sm:-left-6 glass border border-flow-border rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
              >
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-flow-text">Niche Audience</div>
                <div className="text-[0.65rem] text-flow-textSoft">Real-estate buyers &amp; investors</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
