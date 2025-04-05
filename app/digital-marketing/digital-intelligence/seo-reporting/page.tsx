import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, BarChart2, LineChart, TrendingUp, PieChart } from "lucide-react"

export const metadata: Metadata = generateMetadata({
  title: "SEO Reporting & Forecasting",
  description:
    "Comprehensive SEO performance reports with predictive analytics to guide your digital marketing strategy.",
  path: "/digital-marketing/digital-intelligence/seo-reporting",
})

export default function SEOReportingPage() {
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
          <span className="text-gray-700">SEO Reporting & Forecasting</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">SEO Reporting & Forecasting</h1>
            <p className="text-xl text-gray-600 mb-6">
              Gain actionable insights with comprehensive SEO performance reports and predictive analytics to guide your
              strategy.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Detailed keyword ranking reports with competitive analysis</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Traffic and conversion analytics tied to SEO performance</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Predictive modeling to forecast future SEO results</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Custom dashboards tailored to your business KPIs</p>
              </div>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Request a Demo</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=800&width=600&text=SEO+Reporting"
              alt="SEO Reporting & Forecasting"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Our SEO Reporting & Forecasting Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Comprehensive Dashboards</h3>
              <p className="text-gray-600">
                Custom dashboards that visualize your SEO performance metrics in real-time.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <LineChart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Keyword Tracking</h3>
              <p className="text-gray-600">
                Monitor your rankings for hundreds of keywords across multiple search engines.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Predictive Analytics</h3>
              <p className="text-gray-600">
                AI-powered forecasting to predict future SEO performance and identify opportunities.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <PieChart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Competitor Analysis</h3>
              <p className="text-gray-600">
                Compare your SEO performance against competitors and identify gaps and opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">How Our SEO Reporting Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Data Collection</h3>
              <p className="text-gray-600">
                We connect to your analytics platforms and SEO tools to gather comprehensive data about your website's
                performance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Analysis & Insights</h3>
              <p className="text-gray-600">
                Our experts analyze the data to identify trends, opportunities, and areas for improvement in your SEO
                strategy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Forecasting & Recommendations</h3>
              <p className="text-gray-600">
                We provide predictive forecasts and actionable recommendations to improve your SEO performance.
              </p>
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
                alt="SEO Reporting Case Study"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">
                How We Increased Organic Traffic by 150% for a B2B Software Company
              </h3>
              <p className="text-gray-600 mb-4">
                Using our SEO reporting and forecasting tools, we identified key opportunities for a B2B software
                company to improve their organic search visibility. By implementing our recommendations, they achieved:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">150% increase in organic traffic within 6 months</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">200% increase in lead generation from organic search</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">35% reduction in cost per acquisition</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Improve Your SEO Performance?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Contact us today to learn how our SEO Reporting & Forecasting services can help you achieve better results
            from your SEO efforts.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

