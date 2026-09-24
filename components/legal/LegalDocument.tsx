"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { PageHero, PageShell } from "@/app/components/kit";
import { EASE } from "@/app/components/home/shared";

/**
 * Renders a legal document (terms, privacy policy) from translated content so
 * the same layout serves every locale: a sticky contents list that tracks the
 * section being read, and a reading-progress bar across the top.
 */

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "strong"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export type LegalSection = {
  heading?: string;
  blocks: LegalBlock[];
};

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "h3":
      return <h3 className="display-sm text-lg text-flow-text mt-7 mb-2">{block.text}</h3>;
    case "strong":
      return <p className="leading-relaxed mt-4 font-semibold text-flow-text">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-3 space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[0.6rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-aurora-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="leading-relaxed mt-3">{block.text}</p>;
  }
}

const sectionId = (i: number) => `legal-section-${i + 1}`;

export default function LegalDocument({
  breadcrumbHome,
  breadcrumbCurrent,
  title,
  lastUpdatedLabel,
  sections,
}: {
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  title: string;
  lastUpdatedLabel: string;
  sections: LegalSection[];
}) {
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });

  // Highlight whichever section sits nearest the top of the reading area.
  useEffect(() => {
    const nodes = sections.map((_, i) => document.getElementById(sectionId(i))).filter(Boolean) as HTMLElement[];
    if (nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(nodes.indexOf(visible[0].target as HTMLElement));
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);

  const headed = sections.map((section, i) => ({ heading: section.heading, i })).filter((s) => s.heading);

  return (
    <PageShell>
      <motion.div
        aria-hidden
        className="fixed left-0 right-0 top-0 z-[4999] h-[3px] origin-left bg-aurora-grad"
        style={{ scaleX: progress }}
      />

      <PageHero
        crumbs={[{ label: breadcrumbHome, href: "/" }, { label: breadcrumbCurrent }]}
        kicker={lastUpdatedLabel}
        title={title}
      />

      <section className="relative section-px pb-24 bg-flow-bg text-flow-text">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)]">
          {headed.length > 0 && (
            <nav aria-label={title} className="hidden lg:block">
              <ol className="sticky top-32 space-y-1 border-l border-flow-border">
                {headed.map(({ heading, i }) => (
                  <li key={i}>
                    <a
                      href={`#${sectionId(i)}`}
                      className={`focus-ring relative -ml-px block border-l py-1.5 pl-4 text-sm transition-colors ${
                        active === i
                          ? "border-aurora-1 text-flow-text font-medium"
                          : "border-transparent text-flow-textSoft hover:text-flow-text"
                      }`}
                    >
                      {heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="hairline-card p-7 sm:p-12 text-[0.95rem] text-flow-textSoft">
            {sections.map((section, i) => (
              <motion.div
                key={section.heading ?? i}
                id={sectionId(i)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`scroll-mt-32 ${i > 0 ? "mt-10 pt-10 border-t border-flow-border" : ""}`}
              >
                {section.heading && <h2 className="display-sm text-xl sm:text-2xl text-flow-text mb-3">{section.heading}</h2>}
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
