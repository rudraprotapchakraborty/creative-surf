"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { useT } from "@/lib/i18n";
import { fixFunnelMessages } from "@/lib/i18n/messages/fixFunnel";
import { commonMessages } from "@/lib/i18n/messages/common";
import {
  CardGrid,
  CheckList,
  ClosingCta,
  FaqSection,
  PageHero,
  PageShell,
  Section,
  StatBand,
  TabbedPanels,
  TestimonialGrid,
  type IconName,
} from "@/app/components/kit";
import { ActionButton, EASE } from "@/app/components/home/shared";

/** Industry option values and their benchmark rates are data, not copy. */
const INDUSTRY_KEYS = ["ecommerce", "saas", "finance", "healthcare", "education", "travel", "realestate", "other"] as const;

const INDUSTRY_BENCHMARKS: Record<string, string> = {
  ecommerce: "3.2%",
  saas: "5.0%",
  finance: "4.5%",
  healthcare: "3.8%",
  education: "4.0%",
  travel: "2.8%",
  realestate: "2.5%",
};

const HOW_IT_WORKS_ICONS: IconName[] = ["chart", "lineChart", "target"];
const USE_CASE_ICONS: IconName[] = ["cart", "users", "dollar"];
const TESTIMONIAL_NAMES = ["Sarah Johnson", "Michael Chen", "Jessica Williams"];

/** The uplift the "potential" figure models: conversion rate × 1.5. */
const UPLIFT = 1.5;

const STEPS = [
  { key: "industry", field: "industry" },
  { key: "traffic", field: "visitors" },
  { key: "conversions", field: "conversions" },
  { key: "revenue", field: "revenue" },
] as const;

type FunnelData = { industry: string; visitors: string; conversions: string; revenue: string };

const money = (n: number) => `$${Math.round(Math.max(0, n)).toLocaleString("en-US")}`;

export default function FixFunnelPage() {
  const t = useT(fixFunnelMessages);
  const c = useT(commonMessages);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<FunnelData>({ industry: "", visitors: "", conversions: "", revenue: "" });
  const [showResults, setShowResults] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const go = (delta: number) => {
    setDirection(delta);
    if (delta > 0 && step === STEPS.length - 1) setShowResults(true);
    else setStep((s) => Math.min(Math.max(s + delta, 0), STEPS.length - 1));
  };

  const reset = () => {
    setDirection(-1);
    setStep(0);
    setData({ industry: "", visitors: "", conversions: "", revenue: "" });
    setShowResults(false);
  };

  const visitors = Number.parseFloat(data.visitors) || 0;
  const rate = (Number.parseFloat(data.conversions) || 0) / 100;
  const order = Number.parseFloat(data.revenue) || 0;
  const current = visitors * rate * order;
  const potential = visitors * rate * UPLIFT * order - current;

  const stepLabels = t.list("tool.stepLabels");
  const currentField = STEPS[step].field;
  const canAdvance = Boolean(data[currentField]);

  const howItWorks = t
    .raw<{ title: string; body: string }[]>("howItWorks.items", [])
    .map((item, i) => ({ title: item.title, description: item.body, icon: HOW_IT_WORKS_ICONS[i] }));
  const useCaseTabs = t.list("useCases.tabs");
  const useCases = t
    .raw<{ title: string; body: string; issuesTitle: string; issues: string[] }[]>("useCases.items", [])
    .map((item, i) => ({
      label: useCaseTabs[i] ?? item.title,
      title: item.title,
      body: `${item.body} ${item.issuesTitle}`,
      points: item.issues,
      icon: USE_CASE_ICONS[i],
    }));
  const testimonials = t
    .raw<{ role: string; quote: string }[]>("testimonials.items", [])
    .map((item, i) => ({ quote: item.quote, role: item.role, name: TESTIMONIAL_NAMES[i] ?? "", rating: 5 }));
  const faq = t
    .raw<{ question: string; answer: string }[]>("faq.items", [])
    .map((item) => ({ q: item.question, a: item.answer }));

  const inputClass =
    "w-full rounded-xl border border-flow-border bg-flow-bg px-4 py-3.5 text-flow-text outline-none transition-colors focus:border-aurora-1/60 focus:ring-2 focus:ring-aurora-1/20";

  const field = (() => {
    const key = STEPS[step].key;
    const common = { name: currentField, value: data[currentField], onChange, className: inputClass, id: currentField };
    if (key === "industry") {
      return (
        <select {...common} required>
          <option value="" disabled>
            {t("tool.steps.industry.placeholder")}
          </option>
          {INDUSTRY_KEYS.map((k) => (
            <option key={k} value={k}>
              {t(`tool.industries.${k}`)}
            </option>
          ))}
        </select>
      );
    }
    const extra = key === "conversions" ? { min: "0", max: "100", step: "0.1" } : { min: "0" };
    return <input {...common} {...extra} type="number" inputMode="decimal" placeholder={t(`tool.steps.${key}.placeholder`)} required />;
  })();

  return (
    <PageShell>
      <PageHero
        crumbs={[{ label: c("breadcrumb.home"), href: "/" }, { label: c("breadcrumb.tools") }, { label: t("hero.title") }]}
        kicker={c("breadcrumb.tools")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primary={{ label: t("hero.cta"), href: "#tool-section" }}
        icon="lineChart"
        chips={stepLabels.slice(0, 3)}
      />

      <Section id="tool-section" grid title={t("tool.title")} subline={t("tool.intro")} width="normal">
        <div className="mx-auto max-w-3xl hairline-card overflow-hidden">
          {!showResults ? (
            <div className="p-7 sm:p-10">
              {/* Progress */}
              <div className="relative mb-10">
                <div className="absolute left-4 right-4 top-4 h-px bg-flow-border" />
                <motion.div
                  className="absolute left-4 top-4 h-px origin-left bg-aurora-grad"
                  style={{ right: "1rem" }}
                  animate={{ scaleX: step / (STEPS.length - 1) }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
                <ol className="relative flex justify-between">
                  {STEPS.map((s, i) => {
                    const done = i < step;
                    const active = i === step;
                    return (
                      <li key={s.key} className="flex flex-col items-center gap-2">
                        <motion.span
                          animate={{ scale: active ? 1.12 : 1 }}
                          className={`grid place-items-center w-8 h-8 rounded-full text-xs font-semibold transition-colors ${
                            done
                              ? "bg-aurora-grad text-white"
                              : active
                              ? "bg-flow-bg border-2 border-aurora-1 text-aurora-1"
                              : "bg-flow-bg border border-flow-border text-flow-textSoft"
                          }`}
                        >
                          {done ? <Check className="w-4 h-4" /> : i + 1}
                        </motion.span>
                        <span className={`hidden sm:block micro text-[10px] ${active ? "text-flow-text" : "text-flow-textSoft"}`}>
                          {stepLabels[i]}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="relative min-h-[13rem]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -40 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <h3 className="display-sm text-xl sm:text-2xl text-flow-text">{t(`tool.steps.${STEPS[step].key}.title`)}</h3>
                    <p className="mt-2 text-sm text-flow-textSoft">{t(`tool.steps.${STEPS[step].key}.body`)}</p>
                    <label htmlFor={currentField} className="mt-6 mb-2 block micro text-flow-textSoft">
                      {t(`tool.steps.${STEPS[step].key}.label`)}
                    </label>
                    {field}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={step === 0}
                  className="focus-ring inline-flex items-center gap-2 rounded-xl border border-flow-border px-5 py-3 micro text-flow-text transition-opacity disabled:opacity-30"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("tool.back")}
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  disabled={!canAdvance}
                  className="focus-ring inline-flex items-center gap-2 rounded-xl bg-aurora-grad px-6 py-3 micro text-white shadow-aurora transition-opacity disabled:opacity-40 disabled:shadow-none"
                >
                  {step < STEPS.length - 1 ? t("tool.next") : t("tool.analyze")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="p-7 sm:p-10"
            >
              <div className="text-center">
                <h3 className="display text-aurora" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)" }}>
                  {t("results.title")}
                </h3>
                <p className="mt-2 text-sm text-flow-textSoft">{t("results.subtitle")}</p>
              </div>

              <div className="mt-8">
                <StatBand
                  items={[
                    { value: money(current), label: t("results.currentTitle") },
                    { value: `+${money(potential)}`, label: t("results.potentialTitle") },
                    { value: INDUSTRY_BENCHMARKS[data.industry] ?? "3.5%", label: t("results.benchmarkTitle") },
                  ]}
                />
              </div>

              <div className="mt-8 rounded-2xl border border-flow-border p-7" style={{ background: "rgb(var(--accent-1) / 0.05)" }}>
                <h4 className="display-sm text-lg text-flow-text">{t("results.recommendationsTitle")}</h4>
                <CheckList items={t.list("results.recommendations")} className="mt-5" />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={reset}
                  className="focus-ring inline-flex items-center gap-2 rounded-xl border border-flow-border px-5 py-3.5 micro text-flow-text"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t("results.startOver")}
                </button>
                <Link href="/contact" className="focus-ring inline-block rounded-xl">
                  <ActionButton>{t("results.customStrategy")}</ActionButton>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </Section>

      <Section title={t("howItWorks.title")} subline={t("howItWorks.intro")}>
        <CardGrid items={howItWorks} columns={3} />
      </Section>

      <Section grid title={t("useCases.title")} subline={t("useCases.intro")}>
        <TabbedPanels tabs={useCases} id="funnel-use-cases" />
      </Section>

      <Section title={t("testimonials.title")} subline={t("testimonials.intro")}>
        <TestimonialGrid items={testimonials} />
      </Section>

      <FaqSection title={t("faq.title")} items={faq} idPrefix="fix-funnel" />

      <ClosingCta
        title={t("cta.title")}
        body={t("cta.body")}
        button={t("cta.primary")}
        href="#tool-section"
        secondary={{ label: t("cta.secondary"), href: "/contact" }}
      />
    </PageShell>
  );
}
