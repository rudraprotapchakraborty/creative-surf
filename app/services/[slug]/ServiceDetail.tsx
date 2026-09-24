"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { useT } from "@/lib/i18n";
import { servicesMessages } from "@/lib/i18n/messages/services";
import { serviceDetailsMessages } from "@/lib/i18n/messages/serviceDetails";
import {
  ActionButton,
  EASE,
  KineticHeading,
  Kicker,
  Magnetic,
  SectionHead,
} from "@/app/components/home/shared";
import { SERVICES, serviceIndex, type ServiceEntry } from "../catalog";
import { ClosingCta, FaqSection, ServiceCard, type FaqItem, type ServiceCopy } from "../parts";
import { Emblem } from "@/app/components/kit";

type Block = { title: string; description: string };
type Detail = { tagline: string; intro: string; includes: Block[]; outcomes: Block[]; faq: FaqItem[] };

function Hero({
  service,
  index,
  copy,
  detail,
  next,
}: {
  service: ServiceEntry;
  index: number;
  copy: ServiceCopy;
  detail: Detail;
  next: { slug: string; title: string };
}) {
  const t = useT(serviceDetailsMessages);
  const still = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-flow-bg text-flow-text pt-32 sm:pt-40 pb-16 sm:pb-24">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-40" />
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full aurora-1"
        style={{ width: "44vw", height: "44vw", top: "-16vw", left: "-12vw", filter: "blur(90px)", opacity: 0.3 }}
        animate={still ? undefined : { scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={still ? undefined : { y, opacity }} className="relative z-10 section-px mx-auto max-w-7xl">
        {/* Breadcrumb row */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center justify-between gap-3 mb-12 sm:mb-16"
        >
          <Link
            href="/services"
            className="focus-ring group inline-flex items-center gap-2 micro text-flow-textSoft hover:text-flow-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {t("labels.back")}
          </Link>
          <Link
            href={`/services/${next.slug}`}
            className="focus-ring group inline-flex items-center gap-2 micro text-flow-textSoft hover:text-flow-text transition-colors"
          >
            <span className="hidden sm:inline">{t("labels.next")}:</span>
            <span className="text-flow-text">{next.title}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
              <Kicker>
                {String(index + 1).padStart(2, "0")} {t("labels.of")} {String(SERVICES.length).padStart(2, "0")}
              </Kicker>
            </motion.div>

            <KineticHeading
              className="display mt-7"
              style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.75rem)" }}
              delay={0.1}
              lines={[{ text: copy.title }]}
            />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
              className="mt-4 display-sm text-aurora"
              style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)" }}
            >
              {detail.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
              className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-flow-textSoft"
            >
              {detail.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <Link href="/contact" className="focus-ring inline-block rounded-xl">
                  <ActionButton>{t("labels.heroCta")}</ActionButton>
                </Link>
              </Magnetic>
              {service.hub && (
                <Link
                  href={service.hub}
                  className="focus-ring group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl micro text-flow-text border border-flow-border hover:border-aurora-1/40 transition-colors"
                >
                  {t("labels.deeper")}
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              )}
            </motion.div>
          </div>

          <Emblem icon={service.icon} chips={copy.tags} numeral={String(index + 1).padStart(2, "0")} />
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Includes({ items }: { items: Block[] }) {
  const t = useT(serviceDetailsMessages);
  return (
    <section className="relative section-py section-px bg-flow-bg text-flow-text overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHead
          className="mb-14 sm:mb-20"
          label={t("labels.includesKicker")}
          heading={t("labels.includesTitle")}
          accent={t("labels.includesAccent")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 2) * 0.1 }}
              className="group hairline-card relative overflow-hidden p-7 sm:p-9 flex gap-6"
            >
              <span
                aria-hidden
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full aurora-1 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
              />
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.2 + (i % 2) * 0.1 }}
                className="relative flex-shrink-0 grid place-items-center w-11 h-11 rounded-full text-white bg-aurora-grad shadow-aurora"
              >
                <Check className="w-5 h-5" />
              </motion.span>
              <div className="relative">
                <span className="micro text-flow-textSoft/60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display-sm mt-2 text-lg sm:text-xl text-flow-text">{item.title}</h3>
                <p className="mt-2 text-sm sm:text-[0.95rem] leading-relaxed text-flow-textSoft">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Outcomes({ items }: { items: Block[] }) {
  const t = useT(serviceDetailsMessages);
  return (
    <section className="relative section-py section-px bg-flow-bg text-flow-text overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-25" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHead
          className="mb-14 sm:mb-20"
          label={t("labels.outcomesKicker")}
          heading={t("labels.outcomesTitle")}
          accent={t("labels.outcomesAccent")}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
            >
              <span
                className="display block tabular-nums text-aurora"
                style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* The rule draws itself in as the column arrives. */}
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, ease: EASE, delay: 0.2 + i * 0.12 }}
                className="mt-4 block h-px w-full origin-left"
                style={{ background: "linear-gradient(90deg, rgb(var(--accent-1)), transparent)" }}
              />
              <h3 className="display-sm mt-6 text-xl text-flow-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-flow-textSoft max-w-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OtherServices({ current, items }: { current: number; items: ServiceCopy[] }) {
  const t = useT(serviceDetailsMessages);
  const tServices = useT(servicesMessages);
  const others = SERVICES.map((service, i) => ({ service, i })).filter(({ i }) => i !== current);

  return (
    <section className="relative section-py section-px bg-flow-bg text-flow-text">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          className="mb-14 sm:mb-16"
          label={t("labels.otherKicker")}
          heading={t("labels.otherTitle")}
          accent={t("labels.otherAccent")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {others.map(({ service, i }) =>
            items[i] ? (
              <ServiceCard
                key={service.slug}
                title={items[i].title}
                description={items[i].description}
                icon={service.icon}
                href={`/services/${service.slug}`}
                index={i}
                cta={tServices("explore")}
                compact
              />
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}

export default function ServiceDetail({ slug }: { slug: string }) {
  const t = useT(serviceDetailsMessages);
  const tServices = useT(servicesMessages);

  const index = serviceIndex(slug);
  const service = SERVICES[index];
  const items = tServices.raw<ServiceCopy[]>("items", []);
  const copy = items[index];
  const detail = t.raw<Detail>(`services.${slug}`);

  const nextIndex = (index + 1) % SERVICES.length;
  const next = { slug: SERVICES[nextIndex].slug, title: items[nextIndex]?.title ?? "" };

  return (
    <main className="flex flex-col min-h-screen bg-flow-bg">
      <Hero service={service} index={index} copy={copy} detail={detail} next={next} />
      <Includes items={detail.includes} />
      <Outcomes items={detail.outcomes} />
      <FaqSection
        kicker={t("labels.faqKicker")}
        title={t("labels.faqTitle")}
        accent={t("labels.faqAccent")}
        items={detail.faq}
        idPrefix={slug}
      />
      <OtherServices current={index} items={items} />
      <ClosingCta
        kicker={t("labels.ctaKicker")}
        title={t("labels.ctaTitle")}
        accent={t("labels.ctaAccent")}
        body={t("labels.ctaBody")}
        button={t("labels.ctaButton")}
      />
    </main>
  );
}
