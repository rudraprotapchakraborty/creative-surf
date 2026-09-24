import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import { getTranslator } from "@/lib/i18n/server"
import { aboutReviewsMessages } from "@/lib/i18n/messages/aboutReviews"
import { commonMessages } from "@/lib/i18n/messages/common"
import { CardGrid, PageHero, PageShell, Section, StatBand, TestimonialGrid, type IconName } from "@/app/components/kit"
import { ContactCta } from "@/app/components/kit-sections"

/** Reviewer identities and scores are facts; role, date and quote are translated. */
const REVIEW_META = [
  { name: "Sarah Johnson", company: "TechVision Inc.", rating: 5 },
  { name: "Michael Chen", company: "Innovate Solutions", rating: 5 },
  { name: "Emily Rodriguez", company: "StyleHouse Boutique", rating: 5 },
  { name: "David Wilson", company: "Global Logistics Partners", rating: 4 },
  { name: "Jennifer Lee", company: "HealthTech Solutions", rating: 5 },
  { name: "Robert Martinez", company: "Artisan Crafts Co.", rating: 5 },
]

/**
 * Platform summaries. These deliberately don't link out: the previous links
 * went to each platform's home page, not to a Creative Surf profile. Add the
 * profile URLs here once they exist.
 */
const PLATFORMS = [
  { name: "Google", rating: "4.9", count: 87 },
  { name: "Clutch", rating: "4.8", count: 42 },
  { name: "Trustpilot", rating: "4.7", count: 63 },
]

const averageRating = REVIEW_META.reduce((acc, review) => acc + review.rating, 0) / REVIEW_META.length

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(aboutReviewsMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about/reviews",
  })
}

export default async function ReviewsPage() {
  const t = await getTranslator(aboutReviewsMessages)
  const c = await getTranslator(commonMessages)

  const reviews = t
    .raw<{ position: string; date: string; text: string }[]>("reviews", [])
    .map((review, i) => ({
      quote: review.text,
      name: REVIEW_META[i]?.name ?? "",
      role: [review.position, REVIEW_META[i]?.company, review.date].filter(Boolean).join(" · "),
      rating: REVIEW_META[i]?.rating ?? 5,
    }))

  const recognition = t
    .raw<{ name: string; event: string }[]>("recognition.items", [])
    .map((item) => ({ title: item.name, description: item.event, icon: "award" as IconName }))

  const platforms = PLATFORMS.map((platform) => ({
    title: platform.name,
    description: t("platforms.summary", { rating: platform.rating, count: platform.count }),
    icon: "star" as IconName,
  }))

  return (
    <PageShell>
      <PageHero
        crumbs={[
          { label: c("breadcrumb.home"), href: "/" },
          { label: c("breadcrumb.about"), href: "/about" },
          { label: t("breadcrumbCurrent") },
        ]}
        kicker={c("breadcrumb.about")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primary={{ label: t("cta.button"), href: "/contact" }}
      />

      <section className="section-px bg-flow-bg">
        <div className="mx-auto max-w-3xl">
          <StatBand
            items={[
              { value: averageRating.toFixed(1), label: t("hero.outOfFive", { rating: averageRating.toFixed(1) }) },
              { value: String(reviews.length), label: t("hero.basedOn", { count: reviews.length }) },
            ]}
          />
        </div>
      </section>

      <Section grid>
        <TestimonialGrid items={reviews} />
      </Section>

      <Section title={t("recognition.title")}>
        <CardGrid items={recognition} columns={4} numbered={false} compact />
      </Section>

      <Section grid title={t("platforms.title")}>
        <CardGrid items={platforms} columns={3} numbered={false} compact />
      </Section>

      <ContactCta title={t("cta.title")} body={t("cta.body")} button={t("cta.button")} />
    </PageShell>
  )
}
