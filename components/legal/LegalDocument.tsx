"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { useT } from "@/lib/i18n";
import { footerMessages } from "@/lib/i18n/messages/footer";
import { cn } from "@/lib/utils";
import { Masthead, TextLink } from "@/app/components/editorial";

/**
 * Renders a legal document (terms, privacy policy) from translated content so
 * the same layout serves every locale. It is set for reading: a numbered
 * contents list in the rail that follows along, the text at a comfortable
 * measure beside it, and a thin progress line across the top of the window.
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
      return <h3 className="mb-2 mt-9 text-[1.1875rem] font-semibold tracking-[-0.02em] text-cs-ink">{block.text}</h3>;
    case "strong":
      return <p className="mt-5 font-semibold text-cs-ink">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-4 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="grid grid-cols-[1.25rem_1fr]">
              <span aria-hidden className="mt-[0.7rem] h-px w-2.5 bg-cs-ink3" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="mt-4">{block.text}</p>;
  }
}

const sectionId = (i: number) => `legal-section-${i + 1}`;
const pad = (n: number) => String(n).padStart(2, "0");

const DOCUMENTS = [
  { href: "/terms", key: "terms" },
  { href: "/privacy-policy", key: "privacy" },
] as const;

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
  const t = useT(footerMessages);
  const pathname = usePathname();
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

  // Headed sections are numbered in reading order; an unheaded preamble isn't.
  let n = 0;
  const numbered = sections.map((section) => (section.heading ? ++n : 0));
  const headed = sections.map((section, i) => ({ heading: section.heading, i })).filter((s) => s.heading);
  const others = DOCUMENTS.filter((d) => d.href !== pathname);

  return (
    <div className="bg-cs-bg text-cs-ink">
      <motion.div
        aria-hidden
        className="fixed left-0 right-0 top-0 z-[5001] h-[2px] origin-left bg-cs-cyan"
        style={{ scaleX: progress }}
      />

      <Masthead
        crumbs={[{ label: breadcrumbCurrent }]}
        datelineAside={lastUpdatedLabel}
        index="01"
        label={t("legal.label")}
        title={title}
        titleSize="clamp(2.5rem, 5.6vw, 5rem)"
      />

      <div className="cs-container grid gap-y-12 pb-24 lg:grid-cols-12 lg:gap-x-8 lg:pb-32">
        {/* Contents */}
        {headed.length > 0 && (
          <nav aria-label={t("legal.contents")} className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24">
              <p className="cs-meta border-b border-cs-ink/10 pb-3 text-cs-ink">{t("legal.contents")}</p>
              <ol>
                {headed.map(({ heading, i }) => (
                  <li key={i} className="border-b border-cs-ink/10">
                    <a
                      href={`#${sectionId(i)}`}
                      aria-current={active === i ? "location" : undefined}
                      className={cn(
                        "cs-focus grid grid-cols-[1.75rem_1fr] rounded-sm py-2.5 text-[13.5px] leading-snug transition-colors duration-200",
                        active === i ? "font-medium text-cs-ink" : "text-cs-ink3 hover:text-cs-ink"
                      )}
                    >
                      <span className={cn("cs-meta pt-[0.15rem] tabular-nums", active === i ? "text-cs-cyan" : "")}>
                        {pad(numbered[i])}
                      </span>
                      <span>{heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        )}

        {/* The document */}
        <article className={cn("min-w-0 text-[1.0625rem] leading-[1.75] text-cs-ink2", headed.length > 0 ? "lg:col-span-7 lg:col-start-5" : "lg:col-span-8 lg:col-start-4")}>
          {sections.map((section, i) => (
            <section
              key={section.heading ?? i}
              id={sectionId(i)}
              aria-labelledby={section.heading ? `${sectionId(i)}-h` : undefined}
              className={cn("scroll-mt-24 border-t border-cs-ink/10 py-10 first:pt-0 first:border-t-0 sm:py-12")}
            >
              {section.heading && (
                <h2 id={`${sectionId(i)}-h`} className="grid grid-cols-[2.5rem_1fr] items-baseline sm:grid-cols-[3rem_1fr]">
                  <span aria-hidden className="cs-accent text-cs-cyan" style={{ fontSize: "1.75rem", lineHeight: 1 }}>
                    {pad(numbered[i])}
                  </span>
                  <span className="text-[1.5rem] font-medium leading-tight tracking-[-0.03em] text-cs-ink sm:text-[1.75rem]">
                    {section.heading}
                  </span>
                </h2>
              )}
              <div className={section.heading ? "mt-2 sm:pl-12" : ""}>
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </div>
            </section>
          ))}

          {/* After the last word: someone to ask, and the other documents. */}
          <footer className="mt-4 grid gap-10 border-t border-cs-ink/10 pt-10 sm:grid-cols-2">
            <div>
              <p className="text-[1.25rem] font-medium tracking-[-0.025em] text-cs-ink">{t("legal.questions")}</p>
              <p className="mt-2 text-[15px] leading-relaxed">{t("legal.questionsBody")}</p>
              <div className="mt-5">
                <TextLink href="/contact">{t("links.contact")}</TextLink>
              </div>
            </div>
            {others.length > 0 && (
              <div>
                <p className="cs-meta border-b border-cs-ink/10 pb-3 text-cs-ink">{t("legal.others")}</p>
                <ul>
                  {others.map((doc) => (
                    <li key={doc.href} className="border-b border-cs-ink/10">
                      <Link
                        href={doc.href}
                        className="cs-focus group flex items-center justify-between rounded-sm py-3 text-[15px] font-medium text-cs-ink transition-colors hover:text-cs-blue"
                      >
                        {t(doc.key)}
                        <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </footer>
        </article>
      </div>
    </div>
  );
}
