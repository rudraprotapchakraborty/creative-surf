import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateMetadata({
  title: "Website Design Services",
  description:
    "Professional website design services that create beautiful, functional, and conversion-focused websites.",
  path: "/ux-interactive/design/website-design",
})

export default function WebsiteDesignPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8 flex-wrap">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/ux-interactive" className="hover:text-blue-600">
            UX & Interactive
          </Link>
          <span className="mx-2">/</span>
          <Link href="/ux-interactive/design" className="hover:text-blue-600">
            Design
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Website Design</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Website Design Services</h1>
            <p className="text-xl text-gray-600 mb-6">
              Professional website design services that create beautiful, functional, and conversion-focused websites.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Custom designs tailored to your brand and business goals</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Mobile-responsive layouts that work on all devices</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">User experience optimization for better engagement</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">SEO-friendly architecture built into every design</p>
              </div>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Request a Design Consultation</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=800&width=600&text=Website+Design"
              alt="Website Design Services"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content for the page would continue here */}
      </div>
    </div>
  )
}

