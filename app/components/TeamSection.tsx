"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { User } from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const teamMembers = [
  { image: "https://i.ibb.co/PZTxMgTG/mehedee.jpg", name: "Mehedee", role: "Creative Director",      initials: "M" },
  { image: "/placeholder.svg?height=400&width=400",   name: "Rudra",   role: "Web Developer",          initials: "R" },
  { image: "/placeholder.svg?height=400&width=400",   name: "Arnob",   role: "Marketing Strategist",   initials: "A" },
  { image: "/placeholder.svg?height=400&width=400",   name: "Emon",    role: "UI/UX Designer",         initials: "E" },
  { image: "/placeholder.svg?height=400&width=400",   name: "Anthony", role: "Animator",               initials: "An" },
];

export default function TeamSection() {
  return (
    <section className="relative bg-flow-bg text-flow-text overflow-hidden border-t border-flow-border">

      {/* Header + grid */}
      <div className="py-20 sm:py-24 md:py-28 lg:py-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-bold uppercase tracking-[0.2em] text-aurora-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-2" />
              The Team
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
              <h2
                className="font-bold text-flow-text leading-tight"
                style={{ fontSize: "clamp(2rem,3.5vw,3.25rem)" }}
              >
                Meet our<br />
                <span className="text-aurora">visionaries.</span>
              </h2>
              <p className="text-flow-textSoft text-base max-w-xs leading-relaxed md:text-right">
                The creative minds behind every strategy, pixel, and result.
              </p>
            </div>
          </motion.div>

          {/* Team cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-flow-surface border border-flow-border">
                  {/* Photo or placeholder */}
                  {member.image.includes("placeholder") ? (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, rgb(var(--accent-1) / 0.12), rgb(var(--accent-2) / 0.08))`,
                      }}
                    >
                      <span
                        className="font-black select-none"
                        style={{
                          fontSize: "clamp(2.5rem, 6vw, 4rem)",
                          color: "rgb(var(--accent-1) / 0.25)",
                        }}
                      >
                        {member.initials}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  {/* Dark gradient overlay always present */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Name + role — pinned bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-white text-sm leading-tight">{member.name}</h3>
                    <p className="text-white/65 text-xs mt-0.5">{member.role}</p>
                  </div>

                  {/* Hover: aurora top glow */}
                  <div
                    className="absolute inset-x-0 top-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(180deg, rgb(var(--accent-1) / 0.35), transparent)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
