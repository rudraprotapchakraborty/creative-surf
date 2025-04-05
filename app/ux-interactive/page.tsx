import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "UX & Interactive",
  description:
    "Create engaging digital experiences that delight users and drive conversions with our UX and interactive services.",
  path: "/ux-interactive",
})

export default function UXInteractivePage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">UX & Interactive</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Create engaging digital experiences that delight users and drive conversions with our UX and interactive
          services.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Link href="/ux-interactive/design" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600">Design</h2>
              <p className="text-gray-600 mb-4">
                User-centered design services that create beautiful and functional digital experiences.
              </p>
              <Button variant="link" className="p-0 group-hover:text-blue-600">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>

          <Link href="/ux-interactive/content-marketing" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600">Content Marketing</h2>
              <p className="text-gray-600 mb-4">
                Strategic content creation and distribution to engage your audience and drive action.
              </p>
              <Button variant="link" className="p-0 group-hover:text-blue-600">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>

          <Link href="/ux-interactive/development" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600">Development</h2>
              <p className="text-gray-600 mb-4">
                Custom web development services that bring your digital vision to life.
              </p>
              <Button variant="link" className="p-0 group-hover:text-blue-600">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>

          <Link href="/ux-interactive/challenges" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600">Challenges We Solve</h2>
              <p className="text-gray-600 mb-4">
                Solutions to common digital experience challenges that businesses face.
              </p>
              <Button variant="link" className="p-0 group-hover:text-blue-600">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Ready to create exceptional digital experiences? Contact us to discuss your project.
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

