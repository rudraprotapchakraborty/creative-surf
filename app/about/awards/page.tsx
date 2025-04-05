import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Trophy, Award, Star, Medal } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "Awards & Recognition",
  description:
    "Explore the awards and industry recognition Creative Surf has received for excellence in digital marketing, web design, and client satisfaction.",
  path: "/about/awards",
})

// Sample awards data - in a real application, this would come from a database or API
const awards = [
  {
    year: "2024",
    awards: [
      {
        name: "Digital Marketing Excellence Award",
        organization: "Digital Innovation Awards",
        description: "Recognized for outstanding performance and innovation in digital marketing campaigns.",
        icon: Trophy,
      },
      {
        name: "Best SEO Agency",
        organization: "Marketing Excellence Awards",
        description: "Awarded for exceptional results and innovative strategies in search engine optimization.",
        icon: Award,
      },
      {
        name: "Top 10 Web Design Firms",
        organization: "Design Industry Association",
        description: "Named one of the top web design firms for creative excellence and client satisfaction.",
        icon: Star,
      },
    ],
  },
  {
    year: "2023",
    awards: [
      {
        name: "Best Place to Work",
        organization: "Employer Excellence Awards",
        description: "Recognized for outstanding workplace culture, employee satisfaction, and growth opportunities.",
        icon: Medal,
      },
      {
        name: "Innovation in Social Media Marketing",
        organization: "Social Media Marketing Association",
        description:
          "Awarded for groundbreaking social media campaigns that delivered exceptional results for clients.",
        icon: Trophy,
      },
      {
        name: "Rising Star Agency",
        organization: "Marketing Industry Network",
        description: "Recognized as one of the fastest-growing and most promising agencies in the industry.",
        icon: Star,
      },
    ],
  },
  {
    year: "2022",
    awards: [
      {
        name: "Client Satisfaction Excellence",
        organization: "Customer Experience Awards",
        description: "Awarded for maintaining the highest standards of client satisfaction and service excellence.",
        icon: Award,
      },
      {
        name: "Best Content Marketing Campaign",
        organization: "Content Marketing Institute",
        description:
          "Recognized for an innovative content strategy that significantly increased client engagement and conversions.",
        icon: Trophy,
      },
    ],
  },
  {
    year: "2021",
    awards: [
      {
        name: "Emerging Digital Agency of the Year",
        organization: "Digital Business Awards",
        description: "Recognized as the most promising new agency demonstrating exceptional growth and client results.",
        icon: Trophy,
      },
    ],
  },
]

// Industry certifications
const certifications = [
  {
    name: "Google Partner",
    logo: "/placeholder.svg?height=100&width=200&text=Google+Partner",
    description: "Certified Google Partner with specializations in Search, Display, and Video advertising.",
  },
  {
    name: "Meta Business Partner",
    logo: "/placeholder.svg?height=100&width=200&text=Meta+Business+Partner",
    description: "Certified Meta Business Partner with expertise in Facebook and Instagram advertising.",
  },
  {
    name: "HubSpot Solutions Partner",
    logo: "/placeholder.svg?height=100&width=200&text=HubSpot+Partner",
    description: "Certified HubSpot Solutions Partner with expertise in inbound marketing and CRM implementation.",
  },
  {
    name: "Shopify Partner",
    logo: "/placeholder.svg?height=100&width=200&text=Shopify+Partner",
    description: "Certified Shopify Partner specializing in e-commerce website development and optimization.",
  },
]

export default function AwardsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-700 font-medium">Awards</span>
        </div>

        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Awards & Recognition</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We're proud to be recognized for our commitment to excellence, innovation, and client success in the digital
            marketing industry.
          </p>
          <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl max-w-4xl mx-auto">
            <Image
              src="/placeholder.svg?height=600&width=1200&text=Awards+and+Recognition"
              alt="Creative Surf Awards and Recognition"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Awards Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Awards Timeline</h2>

          <div className="space-y-16">
            {awards.map((yearGroup) => (
              <div key={yearGroup.year} className="relative">
                <div className="bg-blue-600 text-white text-2xl font-bold rounded-lg p-4 inline-block mb-8">
                  {yearGroup.year}
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {yearGroup.awards.map((award, index) => {
                    const Icon = award.icon
                    return (
                      <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{award.name}</h3>
                        <p className="text-blue-600 font-medium mb-3">{award.organization}</p>
                        <p className="text-gray-600">{award.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Certifications */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Industry Certifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center p-4">
                <div className="relative h-24 mb-4">
                  <Image src={cert.logo || "/placeholder.svg"} alt={cert.name} fill className="object-contain" />
                </div>
                <h3 className="font-bold mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Award Highlight */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Digital Agency of the Year Finalist</h2>
              <p className="text-lg mb-6">
                We're proud to have been named a finalist for the prestigious Digital Agency of the Year award at the
                2024 Digital Excellence Awards. This recognition highlights our team's dedication to delivering
                exceptional results for our clients and pushing the boundaries of digital marketing innovation.
              </p>
              <div className="flex items-center">
                <Trophy className="h-8 w-8 mr-3" />
                <span className="text-xl font-semibold">2024 Digital Excellence Awards</span>
              </div>
            </div>
            <div className="relative h-[300px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Award+Ceremony"
                alt="Digital Agency of the Year Award Ceremony"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Client Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Award-Winning Client Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=E-commerce+Success"
                  alt="E-commerce Success Story"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Award className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-600 font-medium">Best E-commerce Campaign</span>
                </div>
                <h3 className="text-xl font-bold mb-2">StyleHouse Boutique</h3>
                <p className="text-gray-600 mb-4">
                  Our award-winning e-commerce strategy increased online sales by 78% and expanded their customer base
                  across three new markets.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/case-studies/stylehouse-boutique">View Case Study</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=SEO+Success"
                  alt="SEO Success Story"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Award className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-600 font-medium">Best SEO Campaign</span>
                </div>
                <h3 className="text-xl font-bold mb-2">TechVision Inc.</h3>
                <p className="text-gray-600 mb-4">
                  Our SEO strategy helped TechVision achieve a 150% increase in organic traffic and a 200% increase in
                  qualified leads.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/case-studies/techvision-seo">View Case Study</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Social+Media+Success"
                  alt="Social Media Success Story"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Award className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-600 font-medium">Best Social Media Campaign</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Innovate Solutions</h3>
                <p className="text-gray-600 mb-4">
                  Our innovative social media campaign helped this startup achieve 120% growth in followers and secure
                  Series A funding.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/case-studies/innovate-social">View Case Study</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work with an Award-Winning Agency?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Partner with Creative Surf and experience the difference that award-winning digital marketing can make for
            your business.
          </p>
          <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

