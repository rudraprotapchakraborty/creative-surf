"use client";

import { Star } from "lucide-react";
import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { cn } from "@/lib/utils";
import { Reveal, SectionIntro } from "@/app/components/editorial";

const REVIEWS = [
  { name: "Sarah Johnson", company: "TechVision Inc.", rating: 5, figure: "+45%" },
  { name: "Michael Chen", company: "Innovate Solutions", rating: 5, figure: null },
  { name: "Emily Rodriguez", company: "StyleHouse Boutique", rating: 5, figure: "+78%" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function Attribution({ name, role, company, rating }: { name: string; role: string; company: string; rating: number }) {
  return (
    <figcaption className="flex items-center gap-3.5">
      <span
        aria-hidden
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cs-ink text-[13px] font-semibold tracking-wide text-cs-bg"
      >
        {initials(name)}
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold tracking-[-0.01em] text-cs-ink">{name}</span>
        <span className="block text-sm text-cs-ink2">
          {role}, {company}
        </span>
      </span>
      <span className="ml-auto flex gap-0.5 self-start pt-1" role="img" aria-label={`${rating} / 5`}>
        {Array.from({ length: 5 }, (_, s) => (
          <Star
            key={s}
            aria-hidden
            className={cn("h-3.5 w-3.5", s < rating ? "fill-cs-ink text-cs-ink" : "text-cs-ink/20")}
          />
        ))}
      </span>
    </figcaption>
  );
}

/**
 * Three clients, all on the page at once — no carousel to wait on or chase.
 * The first is the lead quote, set large in the serif; the other two stand
 * beside it in the grotesk. Where a client gave a number, the number is
 * pulled out, because "+45%" is what a skimming reader will remember.
 */
export default function Voices() {
  const t = useT(homeMessages);
  const tx = useT(homeExtraMessages);

  const reviews = REVIEWS.map((meta, i) => ({
    ...meta,
    role: t(`reviews.items.${i}.position`),
    text: t(`reviews.items.${i}.text`),
  }));
  const [lead, ...rest] = reviews;

  return (
    <section aria-labelledby="voices-title" className="bg-cs-bg py-24 md:py-32 xl:py-40">
      <div className="cs-container">
        <SectionIntro
          id="voices-title"
          index="05"
          label={tx("sections.voices")}
          line={t("reviews.headingLine1")}
          accent={t("reviews.headingAccent")}
          breakBeforeAccent={false}
        />

        <div className="mt-14 grid gap-14 border-t border-cs-ink/10 pt-12 sm:mt-20 lg:grid-cols-12 lg:gap-8 lg:pt-16">
          {/* ---- Lead quote ---- */}
          <Reveal as="figure" className="flex flex-col lg:col-span-7 lg:pr-10">
            {lead.figure && (
              <p className="cs-meta flex items-baseline gap-3 text-cs-ink3">
                <span className="text-[2.75rem] font-semibold normal-case tracking-[-0.045em] text-cs-blue" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {lead.figure}
                </span>
                {tx("swell.series.0.label")}
              </p>
            )}
            <blockquote
              className="mt-8 flex-1 font-editorial text-cs-ink"
              style={{ fontSize: "clamp(1.75rem, 3.1vw, 2.75rem)", lineHeight: 1.18, letterSpacing: "-0.015em", textWrap: "pretty" }}
            >
              <span aria-hidden className="text-cs-ink3">“</span>
              {lead.text}
              <span aria-hidden className="text-cs-ink3">”</span>
            </blockquote>
            <div className="mt-10 max-w-[34rem]">
              <Attribution name={lead.name} role={lead.role} company={lead.company} rating={lead.rating} />
            </div>
          </Reveal>

          {/* ---- Supporting quotes ---- */}
          <div className="flex flex-col lg:col-span-5 lg:border-l lg:border-cs-ink/10 lg:pl-8">
            {rest.map((review, i) => (
              <Reveal
                as="figure"
                key={review.name}
                delay={0.1 + i * 0.08}
                className={cn("flex flex-col", i > 0 && "mt-12 border-t border-cs-ink/10 pt-12")}
              >
                {review.figure && (
                  <p className="cs-meta flex items-baseline gap-2.5 text-cs-ink3">
                    <span className="text-2xl font-semibold normal-case tracking-[-0.04em] text-cs-blue" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {review.figure}
                    </span>
                    {tx("swell.series.1.label")}
                  </p>
                )}
                <blockquote
                  className={cn("text-cs-ink", review.figure && "mt-5")}
                  style={{ fontSize: "1.1875rem", lineHeight: 1.5, letterSpacing: "-0.012em", textWrap: "pretty" }}
                >
                  “{review.text}”
                </blockquote>
                <div className="mt-7">
                  <Attribution name={review.name} role={review.role} company={review.company} rating={review.rating} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
