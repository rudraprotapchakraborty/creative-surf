import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "Digital Advertising Services",
  description: "Strategic paid advertising campaigns to reach your target audience and drive conversions.",
  path: "/seo-lead-generation/digital-advertising",
})

export default function DigitalAdvertisingPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/seo-lead-generation" className="hover:text-blue-600">
            SEO & Lead Generation
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Digital Advertising</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Digital Advertising Services</h1>
            <p className="text-xl text-gray-600 mb-6">
              Strategic paid advertising campaigns to reach your target audience and drive conversions.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Targeted PPC campaigns across major platforms</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Strategic social media advertising</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Advanced audience targeting and retargeting</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Continuous optimization for maximum ROI</p>
              </div>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Request a Consultation</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=800&width=600&text=Digital+Advertising"
              alt="Digital Advertising Services"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Digital Advertising Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/seo-lead-generation/digital-advertising/ppc-management" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">PPC Management Services</h3>
                <p className="text-gray-600 mb-4">
                  Strategic pay-per-click campaigns to drive targeted traffic and maximize your ROI.
                </p>
                <div className="text-blue-600 flex items-center group-hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/seo-lead-generation/digital-advertising/enterprise-ppc" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">Enterprise PPC Management Services</h3>
                <p className="text-gray-600 mb-4">
                  Specialized PPC management for large organizations with complex advertising needs.
                </p>
                <div className="text-blue-600 flex items-center group-hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/seo-lead-generation/digital-advertising/social-media-advertising" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">Social Media Advertising</h3>
                <p className="text-gray-600 mb-4">
                  Targeted advertising campaigns across major social media platforms to reach your ideal audience.
                </p>
                <div className="text-blue-600 flex items-center group-hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/seo-lead-generation/digital-advertising/enterprise-social-media" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">
                  Enterprise Social Media Advertising
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive social media advertising strategies for large organizations with multiple brands or
                  locations.
                </p>
                <div className="text-blue-600 flex items-center group-hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/seo-lead-generation/digital-advertising/programmatic-advertising" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">Programmatic Advertising Services</h3>
                <p className="text-gray-600 mb-4">
                  Automated, data-driven advertising that targets specific audiences across multiple platforms.
                </p>
                <div className="text-blue-600 flex items-center group-hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/seo-lead-generation/digital-advertising/geofencing" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">Addressable Geofencing Services</h3>
                <p className="text-gray-600 mb-4">
                  Location-based advertising that targets users in specific geographic areas for highly relevant
                  messaging.
                </p>
                <div className="text-blue-600 flex items-center group-hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Advertising Results?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Contact us today to discuss how our digital advertising services can help your business grow.
          </p>
          <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

