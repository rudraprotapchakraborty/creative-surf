import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "Web Channel Call Tracking",
  description: "Track and analyze phone calls generated from your digital marketing channels to measure true ROI.",
  path: "/digital-marketing/digital-intelligence/web-channel-call-tracking",
})

export default function WebChannelCallTrackingPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8 flex-wrap">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/digital-marketing" className="hover:text-blue-600">
            Digital Marketing
          </Link>
          <span className="mx-2">/</span>
          <Link href="/digital-marketing/digital-intelligence" className="hover:text-blue-600">
            Digital Intelligence
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Web Channel Call Tracking</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Web Channel Call Tracking</h1>
            <p className="text-xl text-gray-600 mb-6">
              Track and analyze phone calls generated from your digital marketing channels to measure true ROI.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Identify which marketing channels drive phone calls</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Measure the quality and conversion rate of phone leads</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Optimize marketing spend based on complete conversion data</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Integrate call data with your CRM and analytics platforms</p>
              </div>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Request a Consultation</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=800&width=600&text=Call+Tracking"
              alt="Web Channel Call Tracking"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">How Web Channel Call Tracking Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Dynamic Number Insertion</h3>
              <p className="text-gray-600">
                Unique phone numbers are dynamically displayed to visitors based on their traffic source.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Call Recording & Analysis</h3>
              <p className="text-gray-600">
                Calls are recorded and analyzed for quality, conversion, and marketing insights.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Data Integration</h3>
              <p className="text-gray-600">
                Call data is integrated with your analytics and CRM platforms for complete reporting.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Track Your Call Conversions?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Contact us today to learn how our Web Channel Call Tracking can help you optimize your marketing ROI.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

