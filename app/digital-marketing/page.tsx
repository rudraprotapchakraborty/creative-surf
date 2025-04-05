import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "Digital Marketing Services",
  description:
    "Explore our comprehensive digital marketing services designed to drive growth and revenue for your business.",
  path: "/digital-marketing",
})

export default function DigitalMarketingPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Digital Marketing Services</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Comprehensive digital marketing solutions designed to drive growth and revenue for your business.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Link href="/digital-marketing/digital-intelligence" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600">Digital Intelligence</h2>
              <p className="text-gray-600 mb-4">
                Data-driven insights to inform your marketing strategy and maximize ROI.
              </p>
              <Button variant="link" className="p-0 group-hover:text-blue-600">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>

          <Link href="/digital-marketing/conversion" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600">Conversion</h2>
              <p className="text-gray-600 mb-4">
                Optimize your website and marketing funnels to convert more visitors into customers.
              </p>
              <Button variant="link" className="p-0 group-hover:text-blue-600">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>

          <Link href="/digital-marketing/marketing-automation" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600">Marketing Automation</h2>
              <p className="text-gray-600 mb-4">
                Streamline your marketing processes and nurture leads with automated workflows.
              </p>
              <Button variant="link" className="p-0 group-hover:text-blue-600">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>

          <Link href="/digital-marketing/commerce-platforms" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600">Commerce Platforms</h2>
              <p className="text-gray-600 mb-4">
                Optimize your presence on major commerce platforms to drive sales and growth.
              </p>
              <Button variant="link" className="p-0 group-hover:text-blue-600">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Ready to take your digital marketing to the next level? Contact us for a personalized strategy.
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

