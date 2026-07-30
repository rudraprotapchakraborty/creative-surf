import type { Metadata } from "next"
import { generateMetadata as buildMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Users, Heart, GraduationCap, Clock, MapPin } from "lucide-react"
import { getTranslator } from "@/lib/i18n/server"
import { aboutCareersMessages } from "@/lib/i18n/messages/aboutCareers"
import { commonMessages } from "@/lib/i18n/messages/common"

const BENEFIT_ICONS = [Heart, Clock, GraduationCap, Users]

/** Application URLs stay stable in English so links don't break per locale. */
const JOB_SLUGS = [
  "senior-seo-specialist",
  "web-developer",
  "social-media-manager",
  "digital-marketing-intern",
]

const TESTIMONIAL_META = [
  { name: "Alex Chen", avatar: "/placeholder.svg?height=100&width=100" },
  { name: "Sarah Johnson", avatar: "/placeholder.svg?height=100&width=100" },
  { name: "Michael Rodriguez", avatar: "/placeholder.svg?height=100&width=100" },
]

type Job = {
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(aboutCareersMessages)
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about/careers",
  })
}

export default async function CareersPage() {
  const t = await getTranslator(aboutCareersMessages)
  const c = await getTranslator(commonMessages)

  const benefits = t
    .raw<{ title: string; description: string }[]>("benefits.items", [])
    .map((benefit, i) => ({ ...benefit, icon: BENEFIT_ICONS[i] ?? Heart }))

  const testimonials = t
    .raw<{ position: string; years: string; quote: string }[]>("testimonials.items", [])
    .map((testimonial, i) => ({ ...testimonial, ...TESTIMONIAL_META[i] }))

  const jobOpenings = t
    .raw<Job[]>("openings.jobs", [])
    .map((job, i) => ({ ...job, slug: JOB_SLUGS[i] ?? "" }))

  const steps = t.raw<{ title: string; description: string }[]>("process.steps", [])

  return (
    <div className="bg-flow-bg min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-flow-textSoft mb-8">
          <Link href="/" className="hover:text-blue-600">
            {c("breadcrumb.home")}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/about" className="hover:text-blue-600">
            {c("breadcrumb.about")}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-flow-textSoft font-medium">{t("breadcrumbCurrent")}</span>
        </div>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("hero.title")}</h1>
              <p className="text-xl text-flow-textSoft mb-6">{t("hero.p1")}</p>
              <p className="text-lg text-flow-textSoft mb-8">{t("hero.p2")}</p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="#current-openings">{t("hero.cta")}</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=800&width=600&text=Team+Collaboration"
                alt={t("hero.imageAlt")}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Culture Section */}
        <div className="bg-flow-surface rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("culture.title")}</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Company+Culture"
                alt={t("culture.imageAlt")}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">{t("culture.subtitle")}</h3>
              <p className="text-flow-textSoft mb-4">{t("culture.p1")}</p>
              <p className="text-flow-textSoft mb-4">{t("culture.p2")}</p>
              <div className="flex items-center text-blue-600">
                <Users className="h-5 w-5 mr-2" />
                <span className="font-medium">{t("culture.note")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("benefits.title")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="bg-flow-surface rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-flow-textSoft">{benefit.description}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold mb-3">{t("benefits.extraTitle")}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {t.list("benefits.extras").map((perk) => (
                <div key={perk} className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-2 mt-1">
                    <ChevronRight className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-flow-textSoft">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Employee Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("testimonials.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-flow-surface rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name ?? ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-flow-textSoft">{testimonial.position}</p>
                    <p className="text-xs text-blue-600">{testimonial.years}</p>
                  </div>
                </div>
                <p className="text-flow-textSoft italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Openings Section */}
        <div id="current-openings" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("openings.title")}</h2>
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <div key={index} className="bg-flow-surface rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <p className="text-blue-600">{job.department}</p>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    <div className="flex items-center mr-4">
                      <MapPin className="h-4 w-4 text-flow-textSoft mr-1" />
                      <span className="text-sm text-flow-textSoft">{job.location}</span>
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {job.type}
                    </div>
                  </div>
                </div>
                <p className="text-flow-textSoft mb-4">{job.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">{t("openings.requirementsLabel")}</h4>
                  <ul className="list-disc list-inside text-flow-textSoft space-y-1">
                    {job.requirements.map((req, reqIndex) => (
                      <li key={reqIndex}>{req}</li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="w-full md:w-auto">
                  <Link href={`/about/careers/${job.slug}`}>{t("openings.apply")}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-flow-surface rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("process.title")}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-flow-textSoft">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">{t("cta.body")}</p>
          <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-flow-card">
            <Link href="/contact?subject=Career Inquiry">{t("cta.button")}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
