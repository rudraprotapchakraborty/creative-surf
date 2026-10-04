"use client";

import { BadgeCheck, Check, Minus, X } from "lucide-react";
import { useT } from "@/lib/i18n";
import { cvBuilderMessages } from "@/lib/i18n/messages/cvBuilder";
import { cn } from "@/lib/utils";
import { ButtonLink, FaqList, Meta, Reveal, SectionIntro, TextLink } from "@/app/components/editorial";

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

const pad = (n: number) => String(n).padStart(2, "0");

function Mark({ kind }: { kind: "yes" | "no" | "partial" }) {
  if (kind === "yes") {
    return (
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cs-blue text-cs-onBlue">
        <Check aria-hidden className="h-3 w-3" strokeWidth={3} />
      </span>
    );
  }
  if (kind === "no") {
    return (
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cs-ink/[0.08] text-cs-ink3">
        <X aria-hidden className="h-3 w-3" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ring-cs-ink/20 text-cs-ink3">
      <Minus aria-hidden className="h-3 w-3" strokeWidth={3} />
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
    <div className="bg-cs-bg text-cs-ink">
      {/* WHY: six reasons in a ruled three-up grid ---------------------- */}
      <section id="why" aria-labelledby="why-title" className="border-t border-cs-ink/10 py-24 md:py-32">
        <div className="cs-container">
          <SectionIntro
            id="why-title"
            index="02"
            label={t("why.eyebrow")}
            line={t("why.title")}
            accent={t("why.highlight")}
            lede={t("why.description")}
          />
          <ul className="mt-14 grid border-t border-cs-ink/10 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
            {whyCards.map((card, i) => (
              <Reveal
                as="li"
                key={card.title}
                delay={(i % 3) * 0.06}
                className={cn(
                  "border-b border-cs-ink/10 py-9",
                  i % 2 === 1 ? "md:border-l md:pl-8" : "md:pr-8",
                  i % 3 === 0 ? "lg:border-l-0 lg:pl-0 lg:pr-8" : i % 3 === 1 ? "lg:border-l lg:px-8" : "lg:border-l lg:pl-8 lg:pr-0"
                )}
              >
                <p className="cs-meta tabular-nums text-cs-ink3">{pad(i + 1)}</p>
                <h3 className="mt-4 text-[1.375rem] font-medium leading-tight tracking-[-0.03em]">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cs-ink2">{card.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* HONESTY: the same notes, three ways ------------------------------ */}
      <section id="honesty" aria-labelledby="honesty-title" className="scroll-mt-16 bg-cs-sunken py-24 md:py-32">
        <div className="cs-container">
          <SectionIntro
            id="honesty-title"
            index="03"
            label={t("honesty.eyebrow")}
            line={t("honesty.title")}
            accent={t("honesty.highlight")}
            lede={t("honesty.description")}
          />
          <div className="mt-14 grid gap-4 sm:mt-20 lg:grid-cols-3">
            <Reveal as="figure" className="flex flex-col rounded-lg bg-cs-surface p-6 ring-1 ring-inset ring-cs-ink/10 sm:p-7">
              <figcaption className="cs-meta text-cs-ink3">{t("honesty.typedLabel")}</figcaption>
              <blockquote className="mt-5 font-meta text-[13px] leading-relaxed text-cs-ink">{t("honesty.typedBody")}</blockquote>
            </Reveal>

            <Reveal as="figure" delay={0.08} className="flex flex-col rounded-lg bg-cs-surface p-6 ring-1 ring-inset ring-red-500/25 sm:p-7">
              <figcaption className="cs-meta flex items-center gap-2 text-red-600 dark:text-red-400">
                <X aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
                {t("honesty.genericLabel")}
              </figcaption>
              <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-cs-ink2">
                {t("honesty.genericBody")}
              </blockquote>
              <p className="mt-5 border-t border-red-500/20 pt-4 text-[13px] font-medium text-red-600 dark:text-red-400">
                {t("honesty.genericNote")}
              </p>
            </Reveal>

            <Reveal as="figure" delay={0.16} className="flex flex-col rounded-lg bg-cs-ink p-6 text-cs-bg sm:p-7">
              <figcaption className="cs-meta flex items-center gap-2 text-cs-cyan">
                <BadgeCheck aria-hidden className="h-3.5 w-3.5" />
                {t("honesty.oursLabel")}
              </figcaption>
              <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed">{t("honesty.oursBody")}</blockquote>
              <p className="mt-5 border-t border-cs-bg/15 pt-4 text-[13px] font-medium text-cs-bg/70">{t("honesty.oursNote")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMPARISON: a ruled table, our column picked out ------------------ */}
      <section id="compare" aria-labelledby="compare-title" className="scroll-mt-16 py-24 md:py-32">
        <div className="cs-container">
          <SectionIntro
            id="compare-title"
            index="04"
            label={t("compare.eyebrow")}
            line={t("compare.title")}
            accent={t("compare.highlight")}
            lede={t("compare.description")}
          />
          <Reveal className="mt-14 sm:mt-20">
            {/* The table keeps its own scroller so the page never scrolls sideways. */}
            <div className="overflow-x-auto border-t border-cs-ink/10">
              <table className="w-full min-w-[820px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-cs-ink/10">
                    <th scope="col" className="cs-meta w-[26%] py-5 pr-5 font-medium text-cs-ink3">
                      {t("compare.feature")}
                    </th>
                    <th scope="col" className="w-[20%] bg-cs-blue/[0.06] p-5 text-[15px] font-semibold text-cs-ink">
                      {t("compare.columns.us")}
                    </th>
                    {(["assistant", "chatbot", "sites"] as const).map((c) => (
                      <th key={c} scope="col" className="w-[18%] p-5 text-[15px] font-medium text-cs-ink2">
                        {t(`compare.columns.${c}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, index) => (
                    <tr key={row.label} className="border-b border-cs-ink/10">
                      <th scope="row" className="py-5 pr-5 align-top text-[15px] font-medium text-cs-ink">
                        {row.label}
                      </th>
                      {(["us", "assistant", "chatbot", "sites"] as const).map((column) => (
                        <td
                          key={column}
                          className={cn(
                            "p-5 align-top text-sm leading-relaxed",
                            column === "us" ? "bg-cs-blue/[0.06] font-medium text-cs-ink" : "text-cs-ink2"
                          )}
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
          <p className="mt-6 max-w-[44rem] text-[13px] leading-relaxed text-cs-ink3">{t("compare.note")}</p>
        </div>
      </section>

      {/* HOW: three steps, serif numerals --------------------------------- */}
      <section id="how" aria-labelledby="how-title" className="relative overflow-hidden bg-cs-deep py-24 text-cs-deepInk md:py-32">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgb(var(--cs-cyan) / 0.5), transparent)" }}
        />
        <div className="cs-container">
          <SectionIntro
            id="how-title"
            index="05"
            label={t("how.eyebrow")}
            line={t("how.title")}
            accent={t("how.highlight")}
            lede={t("how.description")}
            tone="deep"
          />
          <ol className="mt-14 grid gap-12 sm:mt-20 md:grid-cols-3 md:gap-8">
            {howSteps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.1} className="border-t border-cs-deepInk/20 pt-8">
                <span className="cs-accent block text-cs-cyan" style={{ fontSize: "clamp(3.25rem, 5vw, 4.5rem)", lineHeight: 0.85 }} aria-hidden>
                  {pad(i + 1)}
                </span>
                <h3 className="mt-6 text-[1.5rem] font-medium leading-tight tracking-[-0.035em]">{step.title}</h3>
                <p className="mt-3 max-w-[22rem] text-[15px] leading-relaxed text-cs-deepInk/70">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ ---------------------------------------------------------------- */}
      <section id="faq" aria-labelledby="cv-faq-title" className="py-24 md:py-32">
        <div className="cs-container">
          <SectionIntro
            id="cv-faq-title"
            index="06"
            label={t("faq.eyebrow")}
            line={t("faq.title")}
            accent={t("faq.highlight")}
            breakBeforeAccent={false}
          />
          <div className="mt-12 lg:ml-[calc(25%+0.5rem)]">
            <FaqList items={faqItems} />
          </div>
        </div>
      </section>

      {/* CLOSE -------------------------------------------------------------- */}
      <section id="cv-cta" className="pb-24 md:pb-32">
        <div className="cs-container">
          <Reveal className="grid gap-8 border-t border-cs-ink/10 pt-12 lg:grid-cols-12 lg:gap-x-8 lg:pt-16">
            <div className="lg:col-span-3">
              <Meta index="07">{t("hero.badge")}</Meta>
            </div>
            <div className="lg:col-span-9">
              <h2
                className="cs-display text-cs-ink"
                style={{ fontSize: "clamp(2.5rem, 6.4vw, 6rem)", lineHeight: 0.95, letterSpacing: "-0.05em" }}
              >
                {t("finalCta.title")} <span className="cs-accent text-cs-blue">{t("finalCta.highlight")}</span>
              </h2>
              <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="cs-lede max-w-[28rem] text-cs-ink2">{t("finalCta.description")}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                  <ButtonLink href="#builder">{t("finalCta.primary")}</ButtonLink>
                  <TextLink href="/contact">{t("finalCta.secondary")}</TextLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
