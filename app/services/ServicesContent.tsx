"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { useT } from "@/lib/i18n";
import { servicesMessages } from "@/lib/i18n/messages/services";
import { commonMessages } from "@/lib/i18n/messages/common";
import { cn } from "@/lib/utils";
import {
  ButtonLink,
  ClosingBlock,
  FaqSection,
  Masthead,
  Reveal,
  SectionIntro,
  TextLink,
} from "@/app/components/editorial";
import { SERVICES, type ServiceEntry } from "./catalog";
import type { FaqItem, ServiceCopy } from "./parts";

type Step = { step: string; description: string };
type Pillar = { title: string; description: string };
type Service = ServiceCopy & ServiceEntry;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The masthead's side column: the six services as a table of contents, so
 * the page's whole offer is legible before the first scroll.
 */
function Contents({ services }: { services: Service[] }) {
  const t = useT(servicesMessages);
  return (
    <nav aria-label={t("offerKicker")}>
      <p className="cs-meta border-b border-cs-ink/10 pb-3 text-cs-ink">{t("offerKicker")}</p>
      <ol>
        {services.map((s, i) => (
          <li key={s.slug} className="border-b border-cs-ink/10">
            <Link
              href={`/services/${s.slug}`}
              className="cs-focus group flex items-baseline gap-3 rounded-sm py-3 text-[15px] font-medium tracking-[-0.015em] text-cs-ink2 transition-colors hover:text-cs-blue"
            >
              <span className="cs-meta tabular-nums text-cs-ink3">{pad(i + 1)}</span>
              <span className="flex-1">{s.title}</span>
              <ArrowUpRight
                aria-hidden
                className="h-3.5 w-3.5 self-center opacity-0 transition-[opacity,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * The six disciplines as a ruled grid — cells divided by hairlines, not boxed
 * as cards. Each cell is one link; hover washes it and slides the numeral.
 */
function Disciplines({ services }: { services: Service[] }) {
  const t = useT(servicesMessages);
  return (
    <section id="offer" aria-labelledby="offer-title" className="scroll-mt-16 bg-cs-bg py-24 text-cs-ink md:py-32">
      <div className="cs-container">
        <SectionIntro
          id="offer-title"
          index="02"
          label={t("offerKicker")}
          line={t("offerTitle")}
          accent={t("offerAccent")}
          lede={t("offerSubtitle")}
        />

        <ul className="mt-14 grid border-t border-cs-ink/10 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s.slug}
              delay={(i % 3) * 0.06}
              y={16}
              className={cn(
                "border-b border-cs-ink/10",
                // Hairlines between columns only: two up on tablets, three on desktop.
                i % 2 === 1 ? "md:border-l" : "md:border-l-0",
                i % 3 === 0 ? "lg:border-l-0" : "lg:border-l"
              )}
            >
              <Link
                href={`/services/${s.slug}`}
                className={cn(
                  "cs-focus group relative flex h-full flex-col overflow-hidden py-9 outline-offset-[-2px] md:py-10",
                  // Outer columns sit flush on the grid edge; inner gutters get the padding.
                  i % 2 === 0 ? "md:pl-0 md:pr-8" : "md:pl-8 md:pr-0",
                  i % 3 === 0 ? "lg:pl-0 lg:pr-8" : i % 3 === 1 ? "lg:px-8" : "lg:pl-8 lg:pr-0"
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-cs-sunken transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 motion-reduce:transition-none"
                />
                <span className="relative flex items-start justify-between">
                  <span
                    className="cs-accent text-cs-cyan transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                    style={{ fontSize: "3rem", lineHeight: 0.9 }}
                    aria-hidden
                  >
                    {pad(i + 1)}
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-cs-ink/15 text-cs-ink2 transition-colors duration-300 group-hover:border-cs-blue group-hover:bg-cs-blue group-hover:text-cs-onBlue">
                    <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </span>
                <h3
                  className="relative mt-10 font-medium text-cs-ink"
                  style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
                >
                  {s.title}
                </h3>
                <p className="relative mt-4 max-w-[26rem] flex-1 text-[15px] leading-relaxed text-cs-ink2">{s.description}</p>
                <p className="cs-meta relative mt-6 flex flex-wrap gap-x-2 text-cs-ink3">
                  {s.tags.map((tag, ti) => (
                    <span key={tag}>
                      {ti > 0 && <span aria-hidden className="mr-2 opacity-50">/</span>}
                      {tag}
                    </span>
                  ))}
                </p>
                <span className="sr-only">
                  {t("explore")} {s.title}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * The five stages as a ledger: one ruled row, a tide line drawing across it
 * as it scrolls into view, each stage dropping its marker as the line passes.
 */
function Process() {
  const t = useT(servicesMessages);
  const steps = t.raw<Step[]>("process", []);
  const still = useReducedMotion() ?? false;

  return (
    <section aria-labelledby="process-title" className="bg-cs-sunken py-24 text-cs-ink md:py-32">
      <div className="cs-container">
        <SectionIntro
          id="process-title"
          index="03"
          label={t("processKicker")}
          line={t("processTitle")}
          accent={t("processAccent")}
          lede={t("processSubtitle")}
        />

        <div className="relative mt-16 sm:mt-20">
          {/* The tide line (wide screens): drawn once, left to right. */}
          <span aria-hidden className="absolute inset-x-0 top-[5px] hidden h-px bg-cs-ink/10 lg:block">
            <motion.span
              className="absolute inset-0 origin-left bg-cs-cyan"
              initial={still ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
            />
          </span>

          <ol className="grid gap-y-0 lg:grid-cols-5 lg:gap-x-8">
            {steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.step}
                delay={still ? 0 : 0.2 + i * 0.28}
                y={10}
                className="grid grid-cols-[2.5rem_1fr] border-t border-cs-ink/10 py-8 first:border-t-0 lg:block lg:border-t-0 lg:py-0"
              >
                <span aria-hidden className="relative mt-1 block h-[11px] w-[11px] rounded-full border-2 border-cs-cyan bg-cs-sunken lg:mt-0" />
                <div className="lg:mt-8">
                  <p className="cs-meta tabular-nums text-cs-ink3">{pad(i + 1)}</p>
                  <h3 className="mt-3 text-[1.375rem] font-medium leading-tight tracking-[-0.03em]">{s.step}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-cs-ink2">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Why us, as the page's deep band: four claims set large, two by two. */
function Why() {
  const t = useT(servicesMessages);
  const pillars = t.raw<Pillar[]>("why", []);

  return (
    <section aria-labelledby="why-title" className="relative overflow-hidden bg-cs-deep py-24 text-cs-deepInk md:py-32">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgb(var(--cs-cyan) / 0.5), transparent)" }}
      />
      <div className="cs-container">
        <SectionIntro
          id="why-title"
          index="04"
          label={t("whyKicker")}
          line={t("whyTitle")}
          accent={t("whyAccent")}
          tone="deep"
        />
        <ul className="mt-14 grid border-t border-cs-deepInk/15 sm:mt-20 md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={(i % 2) * 0.08}
              className={cn(
                "border-b border-cs-deepInk/15 py-10 md:py-12",
                i % 2 === 1 ? "md:border-l md:pl-10" : "md:pr-10"
              )}
            >
              <p className="cs-meta tabular-nums text-cs-gold">{pad(i + 1)}</p>
              <h3
                className="mt-5 font-medium"
                style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.25rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
              >
                {p.title}
              </h3>
              <p className="cs-lede mt-4 max-w-[28rem] text-cs-deepInk/70">{p.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * /services: a contents page first, then the detail. Masthead with the six
 * services listed beside it → the disciplines → how an engagement runs → why
 * us → questions → the ask.
 */
export default function ServicesContent() {
  const t = useT(servicesMessages);
  const tc = useT(commonMessages);
  const services: Service[] = t
    .raw<ServiceCopy[]>("items", [])
    .slice(0, SERVICES.length)
    .map((copy, i) => ({ ...copy, ...SERVICES[i] }));
  const faq = t.raw<FaqItem[]>("faq", []);

  return (
    <div className="flex min-h-screen flex-col bg-cs-bg text-cs-ink">
      <Masthead
        crumbs={[{ label: tc("breadcrumb.services") }]}
        datelineAside={`${pad(services.length)} — ${t("offerKicker")}`}
        index="01"
        label={t("hero.kicker")}
        title={t("hero.title")}
        accent={t("hero.titleAccent")}
        lede={t("hero.subtitle")}
        actions={
          <>
            <ButtonLink href="/contact">{t("hero.ctaPrimary")}</ButtonLink>
            <TextLink href="#offer">{t("hero.ctaSecondary")}</TextLink>
          </>
        }
        side={<Contents services={services} />}
        titleSize="clamp(2.6rem, 5.6vw, 5.5rem)"
      />
      <Disciplines services={services} />
      <Process />
      <Why />
      <FaqSection id="services-faq" index="05" label={t("faqKicker")} line={t("faqTitle")} accent={t("faqAccent")} items={faq} />
      <ClosingBlock
        index="06"
        label={t("cta.kicker")}
        title={t("cta.title")}
        accent={t("cta.titleAccent")}
        body={t("cta.body")}
        button={t("cta.button")}
      />
    </div>
  );
}

