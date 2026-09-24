"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, BarChart3, Handshake, Target, Users2, type LucideIcon } from "lucide-react";

import { useT } from "@/lib/i18n";
import { servicesMessages } from "@/lib/i18n/messages/services";
import { ActionButton, EASE, KineticHeading, Kicker, Magnetic, SectionHead } from "@/app/components/home/shared";
import { SERVICES } from "./catalog";
import { ClosingCta, FaqSection, ServiceCard, type FaqItem, type ServiceCopy } from "./parts";

type Step = { step: string; description: string };
type Pillar = { title: string; description: string };

const PILLAR_ICONS: LucideIcon[] = [Target, BarChart3, Users2, Handshake];

/* ------------------------------------------------------------------ *
 * Hero
 * ------------------------------------------------------------------ */

function Hero({ services }: { services: ServiceCopy[] }) {
  const t = useT(servicesMessages);
  const still = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // The copy lifts and fades as the hero scrolls away, so the page reads as
  // moving past it rather than the section simply being cut off.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Doubled so the marquee can loop at -50% without a visible seam.
  const marquee = [...services, ...services];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-flow-bg text-flow-text pt-36 sm:pt-44 pb-16 sm:pb-20"
    >
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-40" />
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full aurora-1"
        style={{ width: "46vw", height: "46vw", top: "-14vw", left: "-10vw", filter: "blur(90px)", opacity: 0.35 }}
        animate={still ? undefined : { scale: [1, 1.15, 1], x: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full aurora-2"
        style={{ width: "40vw", height: "40vw", top: "-8vw", right: "-12vw", filter: "blur(90px)", opacity: 0.3 }}
        animate={still ? undefined : { scale: [1.1, 1, 1.1], y: [0, 40, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={still ? undefined : { y: copyY, opacity: copyOpacity }}
        className="relative z-10 section-px mx-auto max-w-5xl flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Kicker>{t("hero.kicker")}</Kicker>
        </motion.div>

        <KineticHeading
          className="display mt-8 flex flex-col items-center [&>div]:justify-center"
          style={{ fontSize: "clamp(2.4rem, 6.4vw, 5.25rem)" }}
          delay={0.15}
          lines={[
            { text: t("hero.title") },
            { text: t("hero.titleAccent"), accent: true },
          ]}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-flow-textSoft"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <Link href="/contact" className="focus-ring inline-block rounded-xl">
              <ActionButton>{t("hero.ctaPrimary")}</ActionButton>
            </Link>
          </Magnetic>
          <a
            href="#offer"
            className="focus-ring group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl micro text-flow-text border border-flow-border hover:border-aurora-1/40 transition-colors"
          >
            {t("hero.ctaSecondary")}
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </motion.div>

      {/* Service ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative z-10 mt-16 sm:mt-20 flex overflow-hidden border-y border-flow-border py-5"
        aria-hidden
      >
        <div className="absolute inset-y-0 left-0 w-[12vw] bg-gradient-to-r from-flow-bg to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-[12vw] bg-gradient-to-l from-flow-bg to-transparent z-10" />
        <motion.div
          animate={still ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 36, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-10 pr-10 w-max"
        >
          {marquee.map((service, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className="display-sm text-xl sm:text-2xl text-flow-text/80">{service.title}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-1/60" />
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function Offer({ services }: { services: ServiceCopy[] }) {
  const t = useT(servicesMessages);
  return (
    <section id="offer" className="relative scroll-mt-28 section-py section-px bg-flow-bg text-flow-text overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHead
          className="mb-14 sm:mb-20"
          label={t("offerKicker")}
          heading={t("offerTitle")}
          accent={t("offerAccent")}
          subline={t("offerSubtitle")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.slice(0, SERVICES.length).map((service, i) => (
            <ServiceCard
              key={service.title}
              {...service}
              icon={SERVICES[i].icon}
              href={`/services/${SERVICES[i].slug}`}
              index={i}
              cta={t("explore")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Process — a timeline whose rail fills as you scroll through it.
 * ------------------------------------------------------------------ */

function Process() {
  const t = useT(servicesMessages);
  const steps = t.raw<Step[]>("process", []);
  const railRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <section className="relative section-py section-px bg-flow-bg text-flow-text overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine mask-radial pointer-events-none opacity-25" />
      <div className="relative z-10 mx-auto max-w-7xl grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead
            className="lg:items-start lg:text-left lg:[&>span:first-child]:mx-0"
            label={t("processKicker")}
            heading={t("processTitle")}
            accent={t("processAccent")}
            subline={t("processSubtitle")}
          />
        </div>

        <ol ref={railRef} className="relative">
          {/* Rail: a quiet track with a gradient fill driven by scroll. */}
          <span aria-hidden className="absolute left-[1.375rem] top-2 bottom-2 w-px bg-flow-border" />
          <motion.span
            aria-hidden
            className="absolute left-[1.375rem] top-2 bottom-2 w-px origin-top"
            style={{
              scaleY: fill,
              background: "linear-gradient(to bottom, rgb(var(--accent-1)), rgb(var(--accent-2)))",
              boxShadow: "0 0 12px rgb(var(--accent-2) / 0.6)",
            }}
          />

          {steps.map((item, i) => (
            <motion.li
              key={item.step}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="group relative pl-20 pb-12 last:pb-0"
            >
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                className="absolute left-0 top-0 grid place-items-center w-11 h-11 rounded-full bg-flow-bg border border-flow-border text-sm font-semibold tabular-nums text-aurora-1 transition-colors duration-300 group-hover:border-aurora-1/50"
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>
              <div className="hairline-card p-6 sm:p-7">
                <h3 className="display-sm text-lg sm:text-xl text-flow-text">{item.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-flow-textSoft">{item.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Why us
 * ------------------------------------------------------------------ */

function Why() {
  const t = useT(servicesMessages);
  const pillars = t.raw<Pillar[]>("why", []);

  return (
    <section className="relative section-py section-px bg-flow-bg text-flow-text overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHead className="mb-14 sm:mb-20" label={t("whyKicker")} heading={t("whyTitle")} accent={t("whyAccent")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i] ?? Target;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                className="group hairline-card relative overflow-hidden p-7"
              >
                <span
                  aria-hidden
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full aurora-2 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-50"
                />
                <Icon className="relative w-6 h-6 text-aurora-1 transition-transform duration-500 group-hover:-translate-y-1" />
                <h3 className="relative display-sm mt-6 text-lg text-flow-text">{pillar.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-flow-textSoft">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ServicesContent() {
  const t = useT(servicesMessages);
  const services = t.raw<ServiceCopy[]>("items", []);

  return (
    <main className="flex flex-col min-h-screen bg-flow-bg">
      <Hero services={services} />
      <Offer services={services} />
      <Process />
      <Why />
      <FaqSection
        kicker={t("faqKicker")}
        title={t("faqTitle")}
        accent={t("faqAccent")}
        items={t.raw<FaqItem[]>("faq", [])}
        idPrefix="services"
      />
      <ClosingCta
        kicker={t("cta.kicker")}
        title={t("cta.title")}
        accent={t("cta.titleAccent")}
        body={t("cta.body")}
        button={t("cta.button")}
      />
    </main>
  );
}
