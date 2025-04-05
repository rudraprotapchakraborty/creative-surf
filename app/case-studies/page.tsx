import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateMetadata({
  title: "Case Studies",
  description: "Explore our successful projects and learn how we've helped businesses achieve their goals.",
  path: "/case-studies",
})

const caseStudies = [
  {
    title: "Global E-commerce Redesign",
    client: "FashionForward Inc.",
    description: "Complete overhaul of an international e-commerce platform resulting in 43% increase in conversions",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["E-commerce", "UX Design", "Frontend Development"],
    link: "/case-studies/ecommerce-redesign",
    results: [
      "43% increase in conversion rate",
      "65% improvement in page load speed",
      "27% increase in average order value",
    ],
  },
  {
    title: "Luxury Brand Social Campaign",
    client: "Elegance Timepieces",
    description: "Integrated social media campaign for a luxury watch brand that increased engagement by 78%",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Social Media", "Content Creation", "Brand Strategy"],
    link: "/case-studies/luxury-social-campaign",
    results: [
      "78% increase in social media engagement",
      "120% growth in Instagram followers",
      "35% boost in website traffic from social channels",
    ],
  },
  {
    title: "SaaS Marketing Website",
    client: "CloudSolutions Pro",
    description: "Modern, conversion-focused website for a B2B SaaS company that doubled qualified lead generation",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Web Development", "SEO", "Lead Generation"],
    link: "/case-studies/saas-marketing-website",
    results: [
      "100% increase in qualified leads",
      "54% improvement in organic search rankings",
      "3.5x increase in demo requests",
    ],
  },
  {
    title: "Mobile App Launch Campaign",
    client: "FinTech Revolution",
    description:
      "Comprehensive marketing strategy for a fintech app launch that achieved 100,000+ downloads in first month",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["App Marketing", "Digital Advertising", "Content Strategy"],
    link: "/case-studies/fintech-app-launch",
    results: [
      "100,000+ app downloads in the first month",
      "Featured in 'New Apps We Love' on App Store",
      "45% lower cost-per-install than industry average",
    ],
  },
]

export default function CaseStudiesPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Our Case Studies</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Explore how we've helped businesses across various industries achieve remarkable growth and success through
          our innovative digital marketing strategies.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Image
                src={study.image || "/placeholder.svg"}
                alt={study.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">{study.title}</h2>
                <p className="text-blue-600 font-semibold mb-2">{study.client}</p>
                <p className="text-gray-600 mb-4">{study.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-semibold mb-2">Key Results:</h3>
                <ul className="list-disc list-inside mb-4 text-gray-600">
                  {study.results.map((result, resultIndex) => (
                    <li key={resultIndex}>{result}</li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link href={study.link} className="flex items-center justify-center">
                    Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

