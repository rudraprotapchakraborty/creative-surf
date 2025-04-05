import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "SEO & Lead Generation",
  description:
    "Drive qualified traffic and convert visitors into leads with our comprehensive SEO and lead generation services.",
  path: "/seo-lead-generation",
})

export default function SEOLeadGenerationPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">SEO & Lead Generation</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Drive qualified traffic and convert visitors into leads with our comprehensive SEO and lead generation
          services.
        </p>

        {/* Main Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Link href="/seo-lead-generation/organic-search" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600">Organic Search</h2>
              <p className="text-gray-600 mb-4">
                Improve your visibility in search engines and drive sustainable organic traffic.
              </p>
              <Button variant="link" className="p-0 group-hover:text-blue-600">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>

          <Link href="/seo-lead-generation/digital-advertising" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600">Digital Advertising</h2>
              <p className="text-gray-600 mb-4">
                Strategic paid advertising campaigns to reach your target audience and drive conversions.
              </p>
              <Button variant="link" className="p-0 group-hover:text-blue-600">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>

          <Link href="/seo-lead-generation/ecommerce" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600">Ecommerce</h2>
              <p className="text-gray-600 mb-4">
                Specialized SEO and advertising strategies for ecommerce businesses to drive sales.
              </p>
              <Button variant="link" className="p-0 group-hover:text-blue-600">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>

          <Link href="/seo-lead-generation/learn" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600">Learn</h2>
              <p className="text-gray-600 mb-4">
                Educational resources to help you understand and implement effective SEO strategies.
              </p>
              <Button variant="link" className="p-0 group-hover:text-blue-600">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>
        </div>

        {/* Featured Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Featured SEO & Lead Generation Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=SEO+Services"
                  alt="SEO Services"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">SEO Services</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive SEO strategies to improve your search engine rankings and drive organic traffic.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/seo-lead-generation/organic-search/seo-services">Learn More</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=PPC+Management"
                  alt="PPC Management"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">PPC Management</h3>
                <p className="text-gray-600 mb-4">
                  Strategic pay-per-click campaigns to drive targeted traffic and maximize your ROI.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/seo-lead-generation/digital-advertising/ppc-management">Learn More</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Ecommerce+SEO"
                  alt="Ecommerce SEO"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Ecommerce SEO</h3>
                <p className="text-gray-600 mb-4">
                  Specialized SEO strategies for ecommerce websites to increase visibility and drive sales.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/seo-lead-generation/ecommerce/ecommerce-seo">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Online Presence?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Let's discuss how our SEO and lead generation services can help your business achieve its goals.
          </p>
          <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

