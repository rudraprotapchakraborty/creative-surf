import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "Digital Intelligence Services",
  description: "Data-driven insights to inform your marketing strategy and maximize ROI.",
  path: "/digital-marketing/digital-intelligence",
})

export default function DigitalIntelligencePage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/digital-marketing" className="hover:text-blue-600">
            Digital Marketing
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Digital Intelligence</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Digital Intelligence Services</h1>
            <p className="text-xl text-gray-600 mb-6">
              Harness the power of data to make informed marketing decisions and drive measurable results.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Comprehensive analytics setup and tracking implementation</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Custom reporting dashboards tailored to your business goals</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Actionable insights to optimize marketing performance</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Competitive analysis to identify market opportunities</p>
              </div>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Request a Consultation</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Digital Intelligence Services"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Digital Intelligence Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3">Web Channel Call Tracking</h3>
              <p className="text-gray-600">
                Track and analyze phone calls generated from your digital marketing channels to measure true ROI.
              </p>
              <Link
                href="/digital-marketing/digital-intelligence/web-channel-call-tracking"
                className="text-blue-600 flex items-center mt-4 hover:underline"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3">SEO Reporting & Forecasting</h3>
              <p className="text-gray-600">
                Comprehensive SEO performance reports with predictive analytics to guide your strategy.
              </p>
              <Link
                href="/digital-marketing/digital-intelligence/seo-reporting"
                className="text-blue-600 flex items-center mt-4 hover:underline"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3">Channel Attribution & Forecasting</h3>
              <p className="text-gray-600">
                Understand which marketing channels drive the most value and predict future performance.
              </p>
              <Link
                href="/digital-marketing/digital-intelligence/channel-attribution"
                className="text-blue-600 flex items-center mt-4 hover:underline"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3">Digital Marketing Competitor Analysis</h3>
              <p className="text-gray-600">
                Gain insights into competitor strategies and identify opportunities to outperform them.
              </p>
              <Link
                href="/digital-marketing/digital-intelligence/competitor-analysis"
                className="text-blue-600 flex items-center mt-4 hover:underline"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3">Private Equity Due Diligence</h3>
              <p className="text-gray-600">
                Data-driven analysis to support investment decisions and identify growth opportunities.
              </p>
              <Link
                href="/digital-marketing/digital-intelligence/private-equity"
                className="text-blue-600 flex items-center mt-4 hover:underline"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3">Revenue Operations</h3>
              <p className="text-gray-600">
                Align your marketing, sales, and service operations to drive revenue growth.
              </p>
              <Link
                href="/digital-marketing/digital-intelligence/revenue-operations"
                className="text-blue-600 flex items-center mt-4 hover:underline"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Our team of digital intelligence experts is ready to help you harness the power of data to drive your
            business forward.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

