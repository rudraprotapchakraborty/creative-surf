"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { useT } from "@/lib/i18n";
import { servicesMessages } from "@/lib/i18n/messages/services";
import { serviceDetailsMessages } from "@/lib/i18n/messages/serviceDetails";
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
import { SERVICES, serviceIndex } from "../catalog";
import type { FaqItem, ServiceCopy } from "../parts";

type Block = { title: string; description: string };
type Detail = { tagline: string; intro: string; includes: Block[]; outcomes: Block[]; faq: FaqItem[] };

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The masthead's side column: the service's own spec — its number in the
 * series, the disciplines it covers — set like a colophon.
 */
function Spec({ index, tags, label }: { index: number; tags: string[]; label: string }) {
  return (
    <div className="flex h-full flex-col gap-8 lg:items-end lg:text-right">
      <p className="cs-accent text-cs-cyan" style={{ fontSize: "clamp(4rem, 7vw, 7rem)", lineHeight: 0.85 }} aria-hidden>
        {pad(index + 1)}
      </p>
      <div className="w-full">
        <p className="cs-meta border-b border-cs-ink/10 pb-3 text-cs-ink">{label}</p>
        <ul>
          {tags.map((tag) => (
            <li key={tag} className="border-b border-cs-ink/10 py-3 text-[15px] font-medium tracking-[-0.015em] text-cs-ink2">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** What's included, as a ruled two-by-two: numbered, checked, no boxes. */
function Includes({ items }: { items: Block[] }) {
  const t = useT(serviceDetailsMessages);
  return (
    <section aria-labelledby="includes-title" className="bg-cs-bg py-24 text-cs-ink md:py-32">
      <div className="cs-container">
        <SectionIntro
          id="includes-title"
          index="02"
          label={t("labels.includesKicker")}
          line={t("labels.includesTitle")}
          accent={t("labels.includesAccent")}
        />
        <ul className="mt-14 grid border-t border-cs-ink/10 sm:mt-20 md:grid-cols-2 lg:ml-[calc(25%+0.5rem)]">
          {items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 2) * 0.08}
              className={cn(
                "grid grid-cols-[2rem_1fr] gap-x-4 border-b border-cs-ink/10 py-9",
                i % 2 === 1 ? "md:border-l md:pl-8" : "md:pr-8"
              )}
            >
              <span aria-hidden className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-cs-blue text-cs-onBlue">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <div>
                <p className="cs-meta tabular-nums text-cs-ink3">{pad(i + 1)}</p>
                <h3 className="mt-2 text-[1.375rem] font-medium leading-tight tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cs-ink2">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Outcomes on the deep band: three columns, serif numerals, rules drawing in. */
function Outcomes({ items }: { items: Block[] }) {
  const t = useT(serviceDetailsMessages);
  const still = useReducedMotion() ?? false;
  return (
    <section aria-labelledby="outcomes-title" className="relative overflow-hidden bg-cs-deep py-24 text-cs-deepInk md:py-32">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgb(var(--cs-cyan) / 0.5), transparent)" }}
      />
      <div className="cs-container">
        <SectionIntro
          id="outcomes-title"
          index="03"
          label={t("labels.outcomesKicker")}
          line={t("labels.outcomesTitle")}
          accent={t("labels.outcomesAccent")}
          tone="deep"
        />
        <ul className="mt-14 grid gap-12 sm:mt-20 md:grid-cols-3 md:gap-8">
          {items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.1}>
              <span className="cs-accent block text-cs-cyan" style={{ fontSize: "clamp(3.25rem, 5vw, 4.5rem)", lineHeight: 0.85 }} aria-hidden>
                {pad(i + 1)}
              </span>
              <motion.span
                aria-hidden
                initial={still ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.1 }}
                className="mt-6 block h-px w-full origin-left bg-cs-deepInk/25"
              />
              <h3 className="mt-6 font-medium" style={{ fontSize: "clamp(1.5rem, 2.2vw, 1.875rem)", lineHeight: 1.1, letterSpacing: "-0.035em" }}>
                {item.title}
              </h3>
              <p className="mt-3 max-w-[22rem] text-[15px] leading-relaxed text-cs-deepInk/70">{item.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The other five, as a compact ruled index — the same device as the homepage's list. */
function OtherServices({ current, items }: { current: number; items: ServiceCopy[] }) {
  const t = useT(serviceDetailsMessages);
  const tServices = useT(servicesMessages);
  const others = SERVICES.map((service, i) => ({ service, i })).filter(({ i }) => i !== current && items[i]);

  return (
    <section aria-labelledby="other-title" className="border-t border-cs-ink/10 bg-cs-bg py-24 text-cs-ink md:py-32">
      <div className="cs-container">
        <SectionIntro
          id="other-title"
          index="05"
          label={t("labels.otherKicker")}
          line={t("labels.otherTitle")}
          accent={t("labels.otherAccent")}
        />
        <ol className="mt-12 border-t border-cs-ink/10 lg:ml-[calc(25%+0.5rem)]">
          {others.map(({ service, i }) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="cs-focus group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 border-b border-cs-ink/10 py-6 outline-offset-[-2px]"
              >
                <span className="cs-meta tabular-nums text-cs-ink3 transition-colors group-hover:text-cs-blue">{pad(i + 1)}</span>
                <span className="min-w-0">
                  <span
                    className="block font-medium text-cs-ink transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:text-cs-blue motion-reduce:transform-none"
                    style={{ fontSize: "clamp(1.375rem, 2.2vw, 1.875rem)", lineHeight: 1.1, letterSpacing: "-0.035em" }}
                  >
                    {items[i].title}
                  </span>
                  <span className="mt-1.5 block truncate text-sm text-cs-ink3">{items[i].tags.join(" · ")}</span>
                </span>
                <span className="grid h-9 w-9 place-items-center self-center rounded-full border border-cs-ink/15 text-cs-ink2 transition-colors duration-300 group-hover:border-cs-blue group-hover:bg-cs-blue group-hover:text-cs-onBlue">
                  <ArrowUpRight aria-hidden className="h-4 w-4" />
                  <span className="sr-only">
                    {tServices("explore")} {items[i].title}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * /services/[slug]: masthead with the service's spec beside it → what's in it
 * → what it gets you → questions → its neighbours → the ask. The dateline
 * doubles as the series navigation: back to the index, on to the next.
 */
export default function ServiceDetail({ slug }: { slug: string }) {
  const t = useT(serviceDetailsMessages);
  const tServices = useT(servicesMessages);
  const tc = useT(commonMessages);

  const index = serviceIndex(slug);
  const service = SERVICES[index];
  const items = tServices.raw<ServiceCopy[]>("items", []);
  const copy = items[index];
  const detail = t.raw<Detail>(`services.${slug}`);

  const nextIndex = (index + 1) % SERVICES.length;
  const next = { slug: SERVICES[nextIndex].slug, title: items[nextIndex]?.title ?? "" };

  return (
    <div className="flex min-h-screen flex-col bg-cs-bg text-cs-ink">
      <Masthead
        crumbs={[{ label: tc("breadcrumb.services"), href: "/services" }, { label: copy.title }]}
        datelineAside={
          <Link
            href={`/services/${next.slug}`}
            className="cs-focus group inline-flex items-center gap-2 rounded-sm transition-colors hover:text-cs-ink"
          >
            <span className="hidden sm:inline">{t("labels.next")}:</span>
            <span className="text-cs-ink">{next.title}</span>
            <ArrowRight aria-hidden className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        }
        index="01"
        label={`${pad(index + 1)} ${t("labels.of")} ${pad(SERVICES.length)}`}
        title={copy.title}
        lede={
          <>
            <p className="cs-accent text-cs-blue" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", lineHeight: 1.1 }}>
              {detail.tagline}
            </p>
            <p className="mt-6">{detail.intro}</p>
          </>
        }
        actions={
          <>
            <ButtonLink href="/contact">{t("labels.heroCta")}</ButtonLink>
            {service.hub && <TextLink href={service.hub}>{t("labels.deeper")}</TextLink>}
          </>
        }
        side={<Spec index={index} tags={copy.tags} label={t("labels.specLabel")} />}
        titleSize="clamp(2.75rem, 6.4vw, 6rem)"
      />
      <Includes items={detail.includes} />
      <Outcomes items={detail.outcomes} />
      <FaqSection
        id={`${slug}-faq`}
        index="04"
        label={t("labels.faqKicker")}
        line={t("labels.faqTitle")}
        accent={t("labels.faqAccent")}
        items={detail.faq}
      />
      <OtherServices current={index} items={items} />
      <ClosingBlock
        index="06"
        label={t("labels.ctaKicker")}
        title={t("labels.ctaTitle")}
        accent={t("labels.ctaAccent")}
        body={t("labels.ctaBody")}
        button={t("labels.ctaButton")}
      />
    </div>
  );
}
