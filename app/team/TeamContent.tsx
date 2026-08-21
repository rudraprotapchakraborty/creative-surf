"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Crown, Code2, PenLine } from "lucide-react";
import { useT } from "@/lib/i18n";
import { teamMessages } from "@/lib/i18n/messages/team";

/**
 * Names are proper nouns and stay in code; the role label, bio and accent are
 * looked up per member so the page follows the visitor's language.
 */
const TEAM = [
  {
    name: "Mehedee Hasaan",
    roleKey: "roles.ceo",
    bioKey: "bios.ceo",
    icon: Crown,
    accent: "linear-gradient(135deg,#B8892A,#D4A843)",
  },
  {
    name: "Rudra Protap Chakraborty",
    roleKey: "roles.webDeveloper",
    bioKey: "bios.webDeveloper",
    icon: Code2,
    accent: "linear-gradient(135deg,#0066A2,#0EA5E9)",
  },
  {
    name: "Sharif",
    roleKey: "roles.writer",
    bioKey: "bios.writer",
    icon: PenLine,
    accent: "linear-gradient(135deg,#7C3AED,#C084FC)",
  },
] as const;

/** "Rudra Protap Chakraborty" → "RC" */
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function TeamContent() {
  const t = useT(teamMessages);

  return (
    <main className="min-h-screen bg-flow-bg">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <motion.div
          className="container mx-auto px-6 relative z-10 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-flow-border text-xs font-semibold tracking-wide uppercase text-flow-textSoft">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-6 font-heading text-4xl md:text-6xl font-extrabold tracking-tight text-flow-text">
            {t("hero.title")}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-flow-textSoft max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* TEAM GRID */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {TEAM.map((member, i) => {
              const Icon = member.icon;
              return (
                <motion.article
                  key={member.name}
                  className="group relative glass border border-flow-border rounded-3xl p-8 text-center shadow-soft transition-transform duration-300 hover:-translate-y-2"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Avatar */}
                  <div className="relative mx-auto w-24 h-24">
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                      style={{ background: member.accent }}
                    />
                    <div
                      className="relative w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-extrabold tracking-wide"
                      style={{ background: member.accent }}
                    >
                      {initials(member.name)}
                    </div>
                    <span
                      className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center bg-flow-card border border-flow-border text-flow-text"
                      aria-hidden
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                  </div>

                  <h2 className="mt-6 font-heading text-xl font-bold text-flow-text">
                    {member.name}
                  </h2>
                  <p
                    className="mt-1 text-xs font-semibold uppercase tracking-widest bg-clip-text text-transparent"
                    style={{ backgroundImage: member.accent }}
                  >
                    {t(member.roleKey)}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-flow-textSoft">
                    {t(member.bioKey)}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <motion.div
          className="container mx-auto px-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="max-w-3xl mx-auto glass-strong border border-flow-border rounded-3xl px-8 py-12 text-center shadow-soft">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-flow-text">
              {t("cta.title")}
            </h2>
            <p className="mt-3 text-flow-textSoft">{t("cta.body")}</p>
            <Link
              href="/contact"
              className="shine group mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-aurora-grad shadow-aurora text-sm font-semibold text-white"
            >
              {t("cta.button")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
