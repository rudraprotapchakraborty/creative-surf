"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { teamMessages } from "@/lib/i18n/messages/team";
import { commonMessages } from "@/lib/i18n/messages/common";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink, EASE, Meta, Reveal } from "@/app/components/editorial";
import { TEAM } from "./members";

/** Time zone per city, for the live clocks. Cities are proper nouns in members.ts. */
const ZONES: Record<string, string> = {
  Dhaka: "Asia/Dhaka",
  Kolkata: "Asia/Kolkata",
  Innsbruck: "Europe/Vienna",
};

type Member = (typeof TEAM)[number];

/** One clock per city, ticking together so they can never disagree. */
function useClocks(zones: string[]) {
  const [times, setTimes] = React.useState<Record<string, string>>({});
  const key = zones.join("|");
  React.useEffect(() => {
    const formats = key.split("|").map((zone) => [
      zone,
      new Intl.DateTimeFormat("en-GB", { timeZone: zone, hour: "2-digit", minute: "2-digit" }),
    ] as const);
    const tick = () => setTimes(Object.fromEntries(formats.map(([zone, f]) => [zone, f.format(new Date())])));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, [key]);
  return times;
}

function Portrait({ member }: { member: Member }) {
  return (
    <span className="relative block aspect-square w-full overflow-hidden rounded-lg bg-cs-sunken ring-1 ring-inset ring-cs-ink/[0.06]">
      {member.photo ? (
        <Image src={member.photo} alt="" fill sizes="(min-width: 1024px) 9rem, 5.5rem" className="object-cover" />
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 grid place-items-center font-extrabold tracking-[-0.04em] text-cs-ink/70"
          style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.5rem)" }}
        >
          {member.initials}
        </span>
      )}
    </span>
  );
}

/**
 * The team as a masthead: a roster of ruled rows rather than a grid of
 * profile cards. Each row reads left to right the way a credit does — who,
 * what they do, what that means, how to reach them. The strip above it puts
 * the studio on the map with live local times, the same detail the homepage
 * dateline uses.
 */
export default function TeamContent() {
  const t = useT(teamMessages);
  const tc = useT(commonMessages);
  const still = useReducedMotion() ?? false;

  const cities = Array.from(
    TEAM.reduce((map, member) => {
      const [city, country] = member.location.split(",").map((s) => s.trim());
      const entry = map.get(city) ?? { city, country, count: 0 };
      entry.count += 1;
      map.set(city, entry);
      return map;
    }, new Map<string, { city: string; country: string; count: number }>()).values()
  );
  const countries = new Set(cities.map((c) => c.country)).size;
  const times = useClocks(cities.map((c) => ZONES[c.city] ?? "UTC"));

  return (
    <div className="bg-cs-bg text-cs-ink">
      {/* ---- Masthead ---- */}
      <section aria-labelledby="team-title" className="pb-16 pt-[5.25rem] sm:pt-24 lg:pb-24 lg:pt-[6.5rem]">
        <div className="cs-container">
          <motion.div
            initial={still ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="cs-meta flex items-center justify-between gap-6 border-b border-cs-ink/10 pb-4 text-cs-ink3"
          >
            <Breadcrumbs items={[{ label: tc("breadcrumb.team") }]} />
            <p className="text-right">
              {t("meta.count", { people: TEAM.length, cities: cities.length, countries })}
            </p>
          </motion.div>

          <div className="grid gap-y-6 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-x-8 lg:pt-20">
            <motion.div
              initial={still ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-3 lg:pt-5"
            >
              <Meta index="01">{t("hero.eyebrow")}</Meta>
            </motion.div>
            <div className="lg:col-span-9">
              <h1 id="team-title" className="overflow-hidden pb-[0.08em]">
                <motion.span
                  className="cs-display block text-cs-ink"
                  style={{ fontSize: "clamp(3.25rem, 9vw, 8.5rem)", lineHeight: 0.92, letterSpacing: "-0.055em" }}
                  initial={still ? false : { y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.05 }}
                >
                  {t("hero.title")}
                </motion.span>
              </h1>
              <motion.p
                initial={still ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
                className="cs-lede mt-8 max-w-[34rem] text-cs-ink2"
              >
                {t("hero.subtitle")}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Where we work ---- */}
      <section aria-labelledby="where-title" className="border-y border-cs-ink/10">
        <div className="cs-container grid gap-y-5 py-7 lg:grid-cols-12 lg:gap-x-8 lg:py-9">
          <h2 id="where-title" className="cs-meta text-cs-ink lg:col-span-3 lg:pt-1">
            {t("meta.where")}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 lg:col-span-9">
            {cities.map((c, i) => {
              const time = times[ZONES[c.city] ?? "UTC"];
              return (
                <li
                  key={c.city}
                  className={`flex items-baseline justify-between gap-4 py-3 sm:block sm:py-0 ${
                    i > 0 ? "border-t border-cs-ink/10 sm:border-l sm:border-t-0 sm:pl-6" : ""
                  }`}
                >
                  <p className="text-[1.375rem] font-medium leading-tight tracking-[-0.03em]">{c.city}</p>
                  <p className="cs-meta mt-1.5 text-cs-ink3 sm:mt-2">
                    {c.country} · {c.count === 1 ? t("meta.person") : t("meta.people", { count: c.count })}
                    {time && (
                      <>
                        {" · "}
                        <span className="text-cs-ink">
                          <span className="sr-only">{t("meta.localTime")} </span>
                          {time}
                        </span>
                      </>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---- Roster ---- */}
      <section aria-labelledby="roster-title" className="py-20 md:py-28">
        <div className="cs-container">
          <Reveal className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-8">
            {/* The label is the visible heading; the h2 carries it for assistive tech. */}
            <div aria-hidden className="lg:col-span-3">
              <Meta index="02">{t("meta.roster")}</Meta>
            </div>
            <h2 id="roster-title" className="sr-only lg:col-span-9">
              {t("meta.roster")}
            </h2>
          </Reveal>

          <ol className="mt-10 border-t border-cs-ink/10 lg:mt-12">
            {TEAM.map((member, i) => (
              <Reveal
                as="li"
                key={member.name}
                delay={Math.min(i, 3) * 0.05}
                y={16}
                className="grid grid-cols-[5.5rem_1fr] gap-x-5 gap-y-5 border-b border-cs-ink/10 py-8 sm:grid-cols-[7rem_1fr] lg:grid-cols-12 lg:gap-x-8 lg:py-10"
              >
                <span className="cs-meta hidden pt-1 tabular-nums text-cs-ink3 lg:col-span-1 lg:block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="lg:col-span-2">
                  <Portrait member={member} />
                </div>

                <div className="min-w-0 lg:col-span-4">
                  <h3
                    className="font-medium text-cs-ink"
                    style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
                  >
                    {member.name}
                  </h3>
                  <p className="cs-meta mt-3 text-cs-blue">{t(member.roleKey)}</p>
                  <p className="cs-meta mt-1.5 text-cs-ink3">{member.location}</p>
                </div>

                <div className="col-span-2 lg:col-span-5">
                  <p className="cs-lede max-w-[32rem] text-cs-ink2">{t(member.bioKey)}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="cs-focus cs-underline mt-5 inline-block break-all rounded-sm text-[15px] font-medium text-cs-ink transition-colors hover:text-cs-blue"
                  >
                    <span className="sr-only">{t("meta.contactLabel")} {member.name}: </span>
                    {member.email}
                  </a>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Close ---- */}
      <section aria-labelledby="team-cta" className="pb-24 md:pb-32">
        <div className="cs-container">
          <Reveal className="grid gap-8 border-t border-cs-ink/10 pt-12 lg:grid-cols-12 lg:gap-x-8 lg:pt-16">
            <div className="lg:col-span-3">
              <Meta index="03">{t("cta.button")}</Meta>
            </div>
            <div className="lg:col-span-9">
              <h2
                id="team-cta"
                className="cs-display text-cs-ink"
                style={{ fontSize: "clamp(2.5rem, 6.4vw, 6rem)", lineHeight: 0.95, letterSpacing: "-0.05em" }}
              >
                {t("cta.title")}
              </h2>
              <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="cs-lede max-w-[28rem] text-cs-ink2">{t("cta.body")}</p>
                <ButtonLink href="/contact">{t("cta.button")}</ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
