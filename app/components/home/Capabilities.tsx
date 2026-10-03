"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { servicesMessages } from "@/lib/i18n/messages/services";
import { SERVICES } from "@/app/services/catalog";
import { Reveal, SectionIntro, TextLink } from "@/app/components/editorial";

type ServiceCopy = { title: string; description: string; tags: string[] };

/**
 * The services as an index rather than a card grid: one ruled row each, the
 * name set large, the pitch and its disciplines beside it. Everything is
 * visible at once — hovering only colours and shifts a row, never resizes
 * it, so the list doesn't jump about under a moving pointer.
 *
 * Copy comes from the services messages so the homepage and /services can't
 * advertise different things.
 */
export default function Capabilities() {
  const t = useT(homeMessages);
  const tx = useT(homeExtraMessages);
  const ts = useT(servicesMessages);

  const services = ts
    .raw<ServiceCopy[]>("items", [])
    .slice(0, SERVICES.length)
    .map((copy, i) => ({ ...copy, ...SERVICES[i] }));

  return (
    <section id="services" aria-labelledby="capabilities-title" className="cs-section bg-cs-bg">
      <div className="cs-container">
        <SectionIntro
          id="capabilities-title"
          index="01"
          label={tx("sections.capabilities")}
          line={t("services.headingLine1")}
          accent={t("services.headingAccent")}
          lede={ts("offerSubtitle")}
          aside={<TextLink href="/services">{ts("viewAll")}</TextLink>}
        />

        <ol className="mt-14 border-t border-cs-ink/10 sm:mt-20">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={Math.min(i, 3) * 0.05} y={14}>
              <Link
                href={`/services/${service.slug}`}
                aria-label={tx("capabilities.explore", { name: service.title })}
                className="cs-focus group relative grid grid-cols-[2.25rem_1fr_auto] gap-x-3 gap-y-3 border-b border-cs-ink/10 py-6 outline-offset-[-2px] sm:grid-cols-[3rem_1fr_auto] sm:py-8 lg:grid-cols-12 lg:gap-x-8 lg:py-9"
              >
                {/* Hover wash: grows from the left edge, behind the row. It
                    overhangs the row so the text keeps the grid's left edge
                    without sitting hard against the wash's. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-4 -right-4 rounded-lg origin-left scale-x-0 bg-cs-sunken transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 motion-reduce:transition-none"
                />

                <span className="cs-meta relative pt-[0.6rem] tabular-nums text-cs-ink3 transition-colors duration-300 group-hover:text-cs-blue lg:col-span-1 lg:col-start-1 lg:pt-[0.85rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative lg:col-span-5 lg:col-start-2">
                  <span
                    className="block font-medium text-cs-ink transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-cs-blue motion-reduce:transform-none"
                    style={{ fontSize: "clamp(1.6rem, 3.1vw, 2.75rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
                  >
                    {service.title}
                  </span>
                </span>

                <span className="relative col-span-2 col-start-2 lg:col-span-5 lg:col-start-7 lg:pt-1.5">
                  <span className="block max-w-[32rem] text-[15px] leading-relaxed text-cs-ink2">
                    {service.description}
                  </span>
                  <span className="cs-meta mt-3 flex flex-wrap gap-x-2 text-cs-ink3">
                    {service.tags.map((tag, ti) => (
                      <span key={tag}>
                        {ti > 0 && <span aria-hidden className="mr-2 opacity-50">/</span>}
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>

                <span className="relative col-start-3 row-start-1 flex justify-end pt-1.5 lg:col-span-1 lg:col-start-12 lg:pt-2.5">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-cs-ink/15 text-cs-ink2 transition-[background-color,border-color,color,transform] duration-300 group-hover:border-cs-blue group-hover:bg-cs-blue group-hover:text-cs-onBlue">
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45 motion-reduce:transition-none"
                    />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
