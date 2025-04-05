import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateMetadata({
  title: "How Much Should a Website Cost?",
  description:
    "Learn about website development costs and what factors influence pricing for different types of websites.",
  path: "/about/pricing/website-cost",
})

export default function WebsiteCostPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8 flex-wrap">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>
          <span className="mx-2">/</span>
          <Link href="/about/pricing" className="hover:text-blue-600">
            Pricing Guides
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Website Cost</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">How Much Should a Website Cost?</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Understanding website development costs and what factors influence pricing for different types of websites.
        </p>

        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <div className="prose max-w-none">
            <h2>Website Cost Factors</h2>
            <p>
              The cost of a website can vary significantly based on several factors. Understanding these factors can
              help you budget appropriately for your website project.
            </p>

            <h3>Website Type</h3>
            <p>Different types of websites have different complexity levels and therefore different costs:</p>
            <ul>
              <li>
                <strong>Basic informational website:</strong> $5,000 - $10,000
              </li>
              <li>
                <strong>Small business website:</strong> $10,000 - $25,000
              </li>
              <li>
                <strong>E-commerce website:</strong> $25,000 - $50,000+
              </li>
              <li>
                <strong>Custom web application:</strong> $50,000 - $250,000+
              </li>
            </ul>

            {/* Content would continue here */}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Contact us today for a personalized quote for your website project.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">Get a Free Website Quote</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

