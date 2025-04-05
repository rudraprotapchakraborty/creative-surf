import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, BarChart2, Search, Settings, FileText } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "SEO Services",
  description:
    "Comprehensive SEO strategies to improve your search engine rankings and drive organic traffic to your website.",
  path: "/seo-lead-generation/organic-search/seo-services",
})

export default function SEOServicesPage() {
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
          <Link href="/seo-lead-generation/organic-search" className="hover:text-blue-600">
            Organic Search
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">SEO Services</span>
        </div>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">SEO Services</h1>
            <p className="text-xl text-gray-600 mb-6">
              Comprehensive SEO strategies to improve your search engine rankings and drive organic traffic to your
              website.
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
              <Link href="/contact">Request a Free SEO Consultation</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=800&width=600&text=SEO+Services"
              alt="SEO Services"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Our Approach Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our SEO Approach</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Research & Analysis</h3>
              <p className="text-gray-600">
                We conduct thorough research to understand your industry, competitors, and target audience to develop an
                effective SEO strategy.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">On-Page Optimization</h3>
              <p className="text-gray-600">
                We optimize your website's content, meta tags, and structure to improve its relevance and visibility for
                target keywords.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Content Strategy</h3>
              <p className="text-gray-600">
                We develop a content strategy that addresses your audience's needs and positions your brand as an
                authority in your industry.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                <BarChart2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Monitoring & Reporting</h3>
              <p className="text-gray-600">
                We continuously monitor your SEO performance and provide regular reports with actionable insights for
                ongoing improvement.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Benefits of Our SEO Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Increased Organic Traffic</h3>
              <p className="text-gray-600 mb-4">
                Our SEO strategies are designed to increase your visibility in search results, driving more organic
                traffic to your website.
              </p>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500&text=Traffic+Growth"
                  alt="Increased Organic Traffic"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Higher Quality Leads</h3>
              <p className="text-gray-600 mb-4">
                By targeting the right keywords and optimizing your content, we help you attract visitors who are more
                likely to convert into customers.
              </p>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500&text=Lead+Quality"
                  alt="Higher Quality Leads"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Improved User Experience</h3>
              <p className="text-gray-600 mb-4">
                Our SEO services include optimizing your website's structure and content to provide a better experience
                for your visitors.
              </p>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500&text=User+Experience"
                  alt="Improved User Experience"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Long-Term Results</h3>
              <p className="text-gray-600 mb-4">
                Unlike paid advertising, SEO provides sustainable, long-term results that continue to benefit your
                business over time.
              </p>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500&text=Long+Term+Growth"
                  alt="Long-Term Results"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Case Study</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Case+Study"
                alt="SEO Case Study"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">
                How We Increased Organic Traffic by 150% for a B2B Software Company
              </h3>
              <p className="text-gray-600 mb-4">
                A B2B software company came to us struggling to generate leads through their website. Through our
                comprehensive SEO strategy, we were able to:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Increase organic traffic by 150% in 6 months</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Improve keyword rankings for 50+ high-value terms</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Generate 40% more qualified leads through the website</p>
                </li>
              </ul>
              <Button asChild variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                <Link href="/case-studies/b2b-software-seo">
                  Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">SEO Service Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-gray-400">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <p className="text-gray-600 mb-4">For small businesses just getting started with SEO</p>
              <div className="text-3xl font-bold mb-4">
                $1,500<span className="text-lg text-gray-600">/mo</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Keyword research (up to 20 keywords)</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">On-page optimization (up to 10 pages)</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Monthly performance reporting</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Basic technical SEO audit</p>
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/contact?package=seo-basic">Get Started</Link>
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-600 transform scale-105">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <p className="text-gray-600 mb-4">For growing businesses seeking comprehensive SEO</p>
              <div className="text-3xl font-bold mb-4">
                $3,000<span className="text-lg text-gray-600">/mo</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Keyword research (up to 50 keywords)</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">On-page optimization (up to 25 pages)</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Content creation (2 blog posts per month)</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Comprehensive technical SEO audit</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Competitor analysis</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Bi-weekly performance reporting</p>
                </li>
              </ul>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/contact?package=seo-professional">Get Started</Link>
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-gray-400">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-4">For large businesses with complex SEO needs</p>
              <div className="text-3xl font-bold mb-4">
                $5,000+<span className="text-lg text-gray-600">/mo</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Comprehensive keyword research</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Full website optimization</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Content creation (4+ blog posts per month)</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Advanced technical SEO implementation</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">In-depth competitor analysis</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Weekly performance reporting</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Dedicated SEO manager</p>
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/contact?package=seo-enterprise">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">How long does it take to see results from SEO?</h3>
              <p className="text-gray-600">
                SEO is a long-term strategy. While some improvements can be seen within a few weeks, significant results
                typically take 3-6 months. The timeline depends on factors like your website's current state,
                competition, and the aggressiveness of your strategy.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">What makes your SEO services different?</h3>
              <p className="text-gray-600">
                We take a data-driven, transparent approach to SEO. We focus on delivering measurable results and
                providing clear reporting so you can see the impact of our work. Our strategies are customized to your
                specific business goals and target audience.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Do you guarantee first-page rankings?</h3>
              <p className="text-gray-600">
                No reputable SEO agency can guarantee specific rankings as search algorithms are constantly evolving. We
                focus on implementing proven strategies that improve your visibility and drive qualified traffic, but we
                don't make promises we can't keep.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">What do I need to provide to get started?</h3>
              <p className="text-gray-600">
                To get started, we'll need access to your website analytics, search console, and CMS. We'll also conduct
                an initial consultation to understand your business goals, target audience, and current marketing
                efforts.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Search Rankings?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Contact us today to discuss how our SEO services can help your business grow.
          </p>
          <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/contact">Get a Free SEO Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

