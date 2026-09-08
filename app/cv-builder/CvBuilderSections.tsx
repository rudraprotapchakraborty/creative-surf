"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaButton, Eyebrow, Reveal, Section, SectionHeading } from "@/components/premium";
import {
  BadgeCheck,
  Check,
  FileCheck2,
  Globe2,
  Minus,
  PenLine,
  ShieldCheck,
  Target,
  Users,
  X,
} from "lucide-react";
import { useT } from "@/lib/i18n";
import { cvBuilderMessages } from "@/lib/i18n/messages/cvBuilder";

/**
 * Everything below the builder itself: the case for using this tool rather
 * than a writing assistant, a general chatbot, or a template site.
 *
 * Split out of CvBuilderClient purely for size — it holds no tool state.
 */

type Card = { title: string; body: string };
type Step = { title: string; body: string };
type Faq = { q: string; a: string };
type CompareRow = { label: string; us: string; assistant: string; chatbot: string; sites: string };

/** Icons pair with the "why" cards by position — presentation, not copy. */
const WHY_ICONS = [ShieldCheck, PenLine, Target, FileCheck2, Globe2, Users];

/**
 * How each comparison cell reads at a glance. Kept out of the message files
 * because a tick is not a translation — the wording beside it is.
 */
const COMPARE_MARKS: Record<keyof Omit<CompareRow, "label">, ("yes" | "no" | "partial")[]> = {
  us: ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes"],
  assistant: ["no", "no", "no", "no", "partial", "partial", "partial", "no"],
  chatbot: ["partial", "partial", "partial", "no", "no", "partial", "yes", "no"],
  sites: ["partial", "yes", "no", "partial", "partial", "no", "no", "partial"],
};

function Mark({ kind }: { kind: "yes" | "no" | "partial" }) {
  if (kind === "yes") {
    return (
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aurora-grad text-white">
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
    );
  }
  if (kind === "no") {
    return (
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-flow-text/10 text-flow-textSoft">
        <X className="h-3 w-3" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-flow-border text-flow-textSoft">
      <Minus className="h-3 w-3" strokeWidth={3} />
    </span>
  );
}

export default function CvBuilderSections() {
  const t = useT(cvBuilderMessages);

  const whyCards = t.raw<Card[]>("why.cards", []);
  const compareRows = t.raw<CompareRow[]>("compare.rows", []);
  const howSteps = t.raw<Step[]>("how.steps", []);
  const faqItems = t.raw<Faq[]>("faq.items", []);

  return (
    <>
      {/* WHY ------------------------------------------------------------- */}
      <Section id="why" surface>
        <SectionHeading
          eyebrow={t("why.eyebrow")}
          title={t("why.title")}
          highlight={t("why.highlight")}
          description={t("why.description")}
          align="center"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyCards.map((card, index) => {
            const Icon = WHY_ICONS[index] ?? ShieldCheck;
            return (
              <Reveal key={card.title} delay={index * 0.05}>
                <article className="premium-card group h-full p-6 sm:p-7">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-aurora-grad text-white shadow-aurora transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-flow-text">{card.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-flow-textSoft">{card.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* HONESTY --------------------------------------------------------- */}
      <Section id="honesty">
        <SectionHeading
          eyebrow={t("honesty.eyebrow")}
          title={t("honesty.title")}
          highlight={t("honesty.highlight")}
          description={t("honesty.description")}
          align="center"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <figure className="h-full rounded-3xl border border-flow-border bg-flow-surface p-6 sm:p-7">
              <figcaption className="text-xs font-bold uppercase tracking-[0.16em] text-flow-textSoft">
                {t("honesty.typedLabel")}
              </figcaption>
              <blockquote className="mt-4 font-mono text-sm leading-relaxed text-flow-text">
                {t("honesty.typedBody")}
              </blockquote>
            </figure>
          </Reveal>

          <Reveal delay={0.08}>
            <figure className="h-full rounded-3xl border border-red-500/25 bg-red-500/[0.06] p-6 sm:p-7">
              <figcaption className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-red-600 dark:text-red-400">
                <X className="h-3.5 w-3.5" strokeWidth={3} />
                {t("honesty.genericLabel")}
              </figcaption>
              <blockquote className="mt-4 text-sm leading-relaxed text-flow-text">
                {t("honesty.genericBody")}
              </blockquote>
              <p className="mt-4 border-t border-red-500/20 pt-3 text-xs font-medium text-red-600 dark:text-red-400">
                {t("honesty.genericNote")}
              </p>
            </figure>
          </Reveal>

          <Reveal delay={0.16}>
            <figure className="h-full rounded-3xl border border-aurora-1/30 bg-aurora-soft p-6 sm:p-7">
              <figcaption className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-aurora-1">
                <BadgeCheck className="h-3.5 w-3.5" />
                {t("honesty.oursLabel")}
              </figcaption>
              <blockquote className="mt-4 text-sm leading-relaxed text-flow-text">
                {t("honesty.oursBody")}
              </blockquote>
              <p className="mt-4 border-t border-aurora-1/20 pt-3 text-xs font-medium text-aurora-1">
                {t("honesty.oursNote")}
              </p>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* COMPARISON ------------------------------------------------------ */}
      <Section id="compare" surface className="scroll-mt-28">
        <SectionHeading
          eyebrow={t("compare.eyebrow")}
          title={t("compare.title")}
          highlight={t("compare.highlight")}
          description={t("compare.description")}
          align="center"
          className="mx-auto"
        />

        <Reveal className="mt-14">
          {/* The table keeps its own scroller so the page never scrolls sideways. */}
          <div className="overflow-x-auto rounded-3xl border border-flow-border bg-flow-card backdrop-blur-md">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead>
                <tr className="border-b border-flow-border">
                  <th scope="col" className="w-[26%] p-5 text-xs font-bold uppercase tracking-[0.16em] text-flow-textSoft">
                    {t("compare.feature")}
                  </th>
                  <th scope="col" className="w-[20%] bg-aurora-soft p-5 text-sm font-bold text-flow-text">
                    {t("compare.columns.us")}
                  </th>
                  <th scope="col" className="w-[18%] p-5 text-sm font-semibold text-flow-textSoft">
                    {t("compare.columns.assistant")}
                  </th>
                  <th scope="col" className="w-[18%] p-5 text-sm font-semibold text-flow-textSoft">
                    {t("compare.columns.chatbot")}
                  </th>
                  <th scope="col" className="w-[18%] p-5 text-sm font-semibold text-flow-textSoft">
                    {t("compare.columns.sites")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, index) => (
                  <tr key={row.label} className="border-b border-flow-border/60 last:border-0">
                    <th scope="row" className="p-5 align-top text-sm font-semibold text-flow-text">
                      {row.label}
                    </th>
                    {(["us", "assistant", "chatbot", "sites"] as const).map((column) => (
                      <td
                        key={column}
                        className={`p-5 align-top text-sm ${
                          column === "us"
                            ? "bg-aurora-soft font-semibold text-flow-text"
                            : "text-flow-textSoft"
                        }`}
                      >
                        <span className="flex items-start gap-2.5">
                          <Mark kind={COMPARE_MARKS[column][index] ?? "partial"} />
                          <span>{row[column]}</span>
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-flow-textSoft">
            {t("compare.note")}
          </p>
        </Reveal>
      </Section>

      {/* HOW IT WORKS ---------------------------------------------------- */}
      <Section id="how">
        <SectionHeading
          eyebrow={t("how.eyebrow")}
          title={t("how.title")}
          highlight={t("how.highlight")}
          description={t("how.description")}
          align="center"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {howSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <article className="premium-card h-full p-7">
                <span className="text-5xl font-extrabold leading-none text-aurora tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-base font-bold text-flow-text">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-flow-textSoft">{step.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ ------------------------------------------------------------- */}
      <Section id="faq" surface>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={t("faq.eyebrow")}
              title={t("faq.title")}
              highlight={t("faq.highlight")}
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={item.q}
                    value={`faq-${index}`}
                    className="border-b border-flow-border"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-flow-text hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-relaxed text-flow-textSoft">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* CLOSING CTA ----------------------------------------------------- */}
      <Section id="cv-cta">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-flow-border bg-flow-card p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-aurora-mesh opacity-70" aria-hidden />
            <div className="relative z-10 mx-auto max-w-2xl">
              <Eyebrow>{t("hero.badge")}</Eyebrow>
              <h2
                className="mt-6 font-bold leading-[1.1] text-flow-text"
                style={{ fontSize: "clamp(1.85rem, 3.2vw, 2.9rem)" }}
              >
                {t("finalCta.title")} <span className="text-aurora">{t("finalCta.highlight")}</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-flow-textSoft">
                {t("finalCta.description")}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <CtaButton href="#builder">{t("finalCta.primary")}</CtaButton>
                <CtaButton href="/contact" variant="outline" showIcon={false}>
                  {t("finalCta.secondary")}
                </CtaButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
