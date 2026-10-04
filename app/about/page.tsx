import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { aboutMessages } from "@/lib/i18n/messages/about"
import { aboutApproachMessages } from "@/lib/i18n/messages/aboutApproach"
import { aboutHistoryMessages } from "@/lib/i18n/messages/aboutHistory"
import { aboutValuesMessages } from "@/lib/i18n/messages/aboutValues"
import { aboutAwardsMessages } from "@/lib/i18n/messages/aboutAwards"
import { aboutCareersMessages } from "@/lib/i18n/messages/aboutCareers"
import { aboutReviewsMessages } from "@/lib/i18n/messages/aboutReviews"
import { commonMessages } from "@/lib/i18n/messages/common"
import { kitMessages } from "@/lib/i18n/messages/kit"
import { teamMessages } from "@/lib/i18n/messages/team"
import { footerMessages } from "@/lib/i18n/messages/footer"
import { TEAM } from "@/app/team/members"
import { cn } from "@/lib/utils"
import {
  ButtonLink,
  ClosingBlock,
  Masthead,
  Meta,
  Reveal,
  SectionIntro,
  TextLink,
} from "@/app/components/editorial"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(aboutMessages)
  return {
    ...buildMetadata({
      title: t("metaTitle"),
      description: t("metaDescription"),
      path: "/about",
    }),
  }
}

const pad = (n: number) => String(n).padStart(2, "0")

/**
 * /about, as a short read: who we are → the story, set as a long-read
 * → what we hold to → the people → where to go next →
 * the ask. Rendered on the server; only the reveals hydrate.
 */
export default async function AboutPage() {
  const t = await getTranslator(aboutMessages)
  const c = await getTranslator(commonMessages)
  const k = await getTranslator(kitMessages)
  const tm = await getTranslator(teamMessages)
  const tf = await getTranslator(footerMessages)

  const values = t.raw<{ title: string; description: string }[]>("values.items", [])

  // Each About sub-page, introduced by its own translated heading.
  const [approach, history, valuesPage, awards, careers, reviews] = await Promise.all([
    getTranslator(aboutApproachMessages),
    getTranslator(aboutHistoryMessages),
    getTranslator(aboutValuesMessages),
    getTranslator(aboutAwardsMessages),
    getTranslator(aboutCareersMessages),
    getTranslator(aboutReviewsMessages),
  ])
  const subPages = [
    { title: approach("hero.title"), description: approach("hero.subtitle"), href: "/about/approach" },
    { title: history("hero.title"), description: history("hero.subtitle"), href: "/about/history" },
    { title: valuesPage("hero.title"), description: valuesPage("hero.p1"), href: "/about/values" },
    { title: awards("hero.title"), description: awards("hero.subtitle"), href: "/about/awards" },
    { title: careers("hero.title"), description: careers("hero.p1"), href: "/about/careers" },
    { title: reviews("hero.title"), description: reviews("hero.subtitle"), href: "/about/reviews" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-cs-bg text-cs-ink">
      <Masthead
        crumbs={[{ label: c("breadcrumb.about") }]}
        datelineAside={tf("location")}
        index="01"
        label={c("breadcrumb.about")}
        title={t("hero.title")}
        lede={t("hero.subtitle")}
        actions={
          <>
            <ButtonLink href="/contact">{t("cta.button")}</ButtonLink>
            <TextLink href="#story">{t("story.title")}</TextLink>
          </>
        }
      />

      {/* ─── Story: a long-read beside the rail ─── */}
      <section id="story" aria-labelledby="story-title" className="scroll-mt-16 pb-24 md:pb-32">
        <div className="cs-container">


          <div className="grid gap-y-8 border-t border-cs-ink/10 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-3 lg:pt-3">
              <Meta index="02">{t("story.title")}</Meta>
            </div>
            <Reveal className="lg:col-span-7">
              <h2 id="story-title" className="sr-only">
                {t("story.title")}
              </h2>
              <p
                className="font-medium text-cs-ink"
                style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)", lineHeight: 1.2, letterSpacing: "-0.03em", textWrap: "pretty" }}
              >
                {t("story.p1")}
              </p>
              <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.75] text-cs-ink2 sm:pl-[12%]">
                <p>{t("story.p2")}</p>
                <p>{t("story.p3")}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Values: a ruled three-up ─── */}
      <section aria-labelledby="values-title" className="bg-cs-sunken py-24 md:py-32">
        <div className="cs-container">
          <SectionIntro id="values-title" index="03" label={k("highlightsKicker")} line={t("values.title")} />
          <ul className="mt-14 grid border-t border-cs-ink/10 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <Reveal
                as="li"
                key={value.title}
                delay={(i % 3) * 0.06}
                className={cn(
                  "border-b border-cs-ink/10 py-9",
                  i % 2 === 1 ? "md:border-l md:pl-8" : "md:pr-8",
                  i % 3 === 0 ? "lg:border-l-0 lg:pl-0 lg:pr-8" : i % 3 === 1 ? "lg:border-l lg:px-8" : "lg:border-l lg:pl-8 lg:pr-0"
                )}
              >
                <span aria-hidden className="cs-accent block text-cs-cyan" style={{ fontSize: "2.75rem", lineHeight: 0.9 }}>
                  {pad(i + 1)}
                </span>
                <h3 className="mt-6 text-[1.5rem] font-medium leading-tight tracking-[-0.035em]">{value.title}</h3>
                <p className="mt-3 max-w-[22rem] text-[15px] leading-relaxed text-cs-ink2">{value.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── People: the real team, shared with /team ─── */}
      <section aria-labelledby="people-title" className="py-24 md:py-32">
        <div className="cs-container">
          <SectionIntro
            id="people-title"
            index="04"
            label={tm("hero.eyebrow")}
            line={tm("hero.title")}
            lede={tm("hero.subtitle")}
            aside={<TextLink href="/team">{tm("hero.title")}</TextLink>}
            breakBeforeAccent={false}
          />
          <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 sm:mt-20 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
            {TEAM.map((member, i) => (
              <Reveal as="li" key={member.name} delay={i * 0.05}>
                <Link href="/team" className="cs-focus group block rounded-lg">
                  <span className="relative block aspect-[4/5] overflow-hidden rounded-lg bg-cs-sunken ring-1 ring-inset ring-cs-ink/[0.06]">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 16vw, 45vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="absolute inset-0 grid place-items-center font-extrabold tracking-[-0.04em] text-cs-ink/60"
                        style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
                      >
                        {member.initials}
                      </span>
                    )}
                  </span>
                  <span className="mt-4 block text-[1.0625rem] font-medium leading-snug tracking-[-0.02em] text-cs-ink transition-colors group-hover:text-cs-blue">
                    {member.name}
                  </span>
                  <span className="cs-meta mt-1.5 block text-cs-ink3">{tm(member.roleKey)}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── More about us: a ruled index of the sub-pages ─── */}
      <section aria-labelledby="explore-title" className="border-t border-cs-ink/10 py-24 md:py-32">
        <div className="cs-container">
          <SectionIntro id="explore-title" index="05" label={k("explore")} line={c("breadcrumb.about")} />
          <ol className="mt-12 border-t border-cs-ink/10 lg:ml-[calc(25%+0.5rem)]">
            {subPages.map((page, i) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="cs-focus group grid grid-cols-[2.5rem_1fr_auto] gap-x-4 border-b border-cs-ink/10 py-6 outline-offset-[-2px] sm:grid-cols-[2.5rem_minmax(0,0.9fr)_minmax(0,1.1fr)_auto] sm:items-baseline"
                >
                  <span className="cs-meta pt-1.5 tabular-nums text-cs-ink3 transition-colors group-hover:text-cs-blue sm:pt-0">{pad(i + 1)}</span>
                  <span
                    className="font-medium text-cs-ink transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:text-cs-blue motion-reduce:transform-none"
                    style={{ fontSize: "clamp(1.375rem, 2.2vw, 1.875rem)", lineHeight: 1.1, letterSpacing: "-0.035em" }}
                  >
                    {page.title}
                  </span>
                  <span className="col-start-2 mt-2 line-clamp-2 text-[15px] leading-relaxed text-cs-ink2 sm:col-start-3 sm:mt-0">
                    {page.description}
                  </span>
                  <span className="col-start-3 row-start-1 grid h-9 w-9 place-items-center self-start rounded-full border border-cs-ink/15 text-cs-ink2 transition-colors duration-300 group-hover:border-cs-blue group-hover:bg-cs-blue group-hover:text-cs-onBlue sm:col-start-4 sm:self-center">
                    <ArrowUpRight aria-hidden className="h-4 w-4" />
                    <span className="sr-only">{k("learnMore")}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ClosingBlock
        index="06"
        label={t("cta.button")}
        title={t("cta.title")}
        body={t("cta.body")}
        button={t("cta.button")}
      />
    </div>
  )
}
