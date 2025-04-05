import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "Organic Search Services",
  description:
    "Improve your visibility in search engines and drive sustainable organic traffic with our organic search services.",
  path: "/seo-lead-generation/organic-search",
})

export default function OrganicSearchPage() {
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
          <span className="text-gray-700">Organic Search</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Organic Search Services</h1>
            <p className="text-xl text-gray-600 mb-6">
              Improve your visibility in search engines and drive sustainable organic traffic with our comprehensive
              organic search services.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Customized SEO strategies tailored to your business goals</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Comprehensive keyword research and content optimization</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Technical SEO audits and implementation</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Regular reporting and performance analysis</p>
              </div>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Request a Consultation</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=800&width=600&text=Organic+Search"
              alt="Organic Search Services"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Organic Search Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/seo-lead-generation/organic-search/seo-services" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">SEO Services</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive SEO strategies to improve your search engine rankings and drive organic traffic.
                </p>
                <div className="text-blue-600 flex items-center group-hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/seo-lead-generation/organic-search/enterprise-seo" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">Enterprise SEO Services</h3>
                <p className="text-gray-600 mb-4">
                  Specialized SEO solutions for large organizations with complex websites and multiple stakeholders.
                </p>
                <div className="text-blue-600 flex items-center group-hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/seo-lead-generation/organic-search/digital-marketing" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">Digital Marketing Services</h3>
                <p className="text-gray-600 mb-4">
                  Integrated digital marketing strategies that combine SEO with other channels for maximum impact.
                </p>
                <div className="text-blue-600 flex items-center group-hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/seo-lead-generation/organic-search/local-seo" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">Local SEO Services</h3>
                <p className="text-gray-600 mb-4">
                  Targeted strategies to improve your visibility in local search results and attract nearby customers.
                </p>
                <div className="text-blue-600 flex items-center group-hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/seo-lead-generation/organic-search/google-local-services" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">
                  Google Local Services Ads Management
                </h3>
                <p className="text-gray-600 mb-4">
                  Strategic management of Google Local Services Ads to generate high-quality leads for your business.
                </p>
                <div className="text-blue-600 flex items-center group-hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/seo-lead-generation/organic-search/seo-audits" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">SEO Audits</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive analysis of your website to identify SEO issues and opportunities for improvement.
                </p>
                <div className="text-blue-600 flex items-center group-hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/seo-lead-generation/organic-search/generative-engine-optimization" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">
                  Generative Engine & Chat Optimization
                </h3>
                <p className="text-gray-600 mb-4">
                  Cutting-edge strategies to optimize your content for AI-powered search engines and chat interfaces.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Search Visibility?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Contact us today to discuss how our organic search services can help your business grow.
          </p>
          <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

