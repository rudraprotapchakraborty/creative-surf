import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Heart, Users, Lightbulb, Target, Shield, Globe } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "Our Core Values",
  description: "Discover the core values that drive Creative Surf's culture, decisions, and client relationships.",
  path: "/about/values",
})

// Core values data
const coreValues = [
  {
    icon: Heart,
    title: "Client Success",
    description:
      "We measure our success by the results we deliver for our clients. Your growth is our primary goal and the foundation of everything we do.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe in the power of teamwork, both internally and with our clients. By working together, we achieve greater results than any of us could accomplish alone.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We stay at the forefront of digital marketing trends and technologies to provide cutting-edge solutions that give our clients a competitive advantage.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We are committed to delivering exceptional quality in everything we do, from strategy development to execution and reporting.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We operate with honesty, transparency, and ethical practices. We do what's right for our clients, even when it's not the easiest path.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Globe,
    title: "Responsibility",
    description:
      "We recognize our responsibility to our community and the environment. We strive to make a positive impact through sustainable practices and community involvement.",
    color: "bg-teal-100 text-teal-600",
  },
]

export default function ValuesPage() {
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
          <span className="text-gray-700 font-medium">Our Values</span>
        </div>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Core Values</h1>
              <p className="text-xl text-gray-600 mb-6">
                At Creative Surf, our values are more than just words on a wall. They guide our decisions, shape our
                culture, and define how we work with our clients and each other.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                These principles have been at the heart of our company since day one and continue to drive our success
                and growth.
              </p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=800&width=600&text=Our+Values"
                alt="Creative Surf Core Values"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">The Principles That Guide Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className={`${value.color} p-3 rounded-full w-fit mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Values in Action */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values in Action</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Values+in+Action"
                alt="Creative Surf Values in Action"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">How We Live Our Values Every Day</h3>
              <p className="text-gray-600 mb-4">
                Our values aren't just aspirational statements—they're reflected in our daily work and decisions. From
                the way we structure our teams to how we approach client challenges, our values are embedded in
                everything we do.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-2 mt-1">
                    <ChevronRight className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">We celebrate client wins as our own successes</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-2 mt-1">
                    <ChevronRight className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">We invest in continuous learning and development</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-2 mt-1">
                    <ChevronRight className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">We provide transparent reporting and honest feedback</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-2 mt-1">
                    <ChevronRight className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">We support community initiatives and sustainable practices</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Community Initiatives */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Community Initiatives</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Education+Initiatives"
                  alt="Education Initiatives"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Education Initiatives</h3>
                <p className="text-gray-600 mb-4">
                  We partner with local schools and universities to provide digital marketing education and internship
                  opportunities for students.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Environmental+Efforts"
                  alt="Environmental Efforts"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Environmental Efforts</h3>
                <p className="text-gray-600 mb-4">
                  Our sustainability initiatives include reducing our carbon footprint, implementing paperless
                  processes, and organizing community clean-up events.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Nonprofit+Support"
                  alt="Nonprofit Support"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Nonprofit Support</h3>
                <p className="text-gray-600 mb-4">
                  We provide pro bono digital marketing services to selected nonprofit organizations each year to help
                  them amplify their impact.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Share Our Values?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            If our values resonate with you, we'd love to explore how we can work together—whether as a client, partner,
            or team member.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-blue-700">
              <Link href="/about/careers">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

