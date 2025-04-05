import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, MapPin, Search, Star, TrendingUp, Users, ChevronRight } from "lucide-react"

export default function LocalSEOPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#051C2C] to-[#0A2A42] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Local SEO Services That Drive Foot Traffic & Revenue
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200">
                Dominate local search results, attract nearby customers, and grow your business with our data-driven
                local SEO strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Get a Free Consultation
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  View Pricing
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-[280px] md:h-[320px]">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Local SEO illustration showing a map with business locations"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">46%</p>
              <p className="text-gray-700">of all Google searches are looking for local information</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">88%</p>
              <p className="text-gray-700">of consumers who search locally on mobile visit a store within 24 hours</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">78%</p>
              <p className="text-gray-700">of local mobile searches result in offline purchases</p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Local SEO Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What is Local SEO?</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Local SEO is the process of optimizing your online presence to attract more business from relevant local
              searches. These searches take place on Google and other search engines.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Why Local SEO Matters</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Increased Visibility in Local Searches</p>
                      <p className="text-gray-600">
                        Appear in the "Local Pack," Google Maps, and local organic results.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Higher Conversion Rates</p>
                      <p className="text-gray-600">Local searchers have high intent and are more likely to convert.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Mobile Search Dominance</p>
                      <p className="text-gray-600">
                        Capture the growing number of "near me" searches on mobile devices.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Competitive Advantage</p>
                      <p className="text-gray-600">
                        Stand out from local competitors who aren't optimizing for local search.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative h-[350px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Local search results on Google showing map and business listings"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Local SEO Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Local SEO Services</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We offer comprehensive local SEO solutions tailored to your business needs and goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Google Business Profile Optimization</h3>
              <p className="text-gray-700 mb-4">
                We optimize your Google Business Profile to improve visibility in local search results and Google Maps.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Profile verification & setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Category optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Photo & video management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Q&A monitoring & management</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Review Management</h3>
              <p className="text-gray-700 mb-4">
                We help you generate, monitor, and respond to customer reviews across all platforms.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Review generation strategy</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Review monitoring tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Response templates & guidance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Reputation management</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Keyword Research</h3>
              <p className="text-gray-700 mb-4">
                We identify the most valuable local keywords to target for your business and location.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Geo-targeted keyword research</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Competitor keyword analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">"Near me" search optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Local intent mapping</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Link Building</h3>
              <p className="text-gray-700 mb-4">
                We build high-quality local backlinks to boost your site's authority in your service areas.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Local business directories</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Chamber of commerce listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Local sponsorship opportunities</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Community engagement</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Content Strategy</h3>
              <p className="text-gray-700 mb-4">
                We create location-specific content that resonates with your local audience and search engines.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Location pages development</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Local blog content</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Area-specific service pages</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Local event coverage</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Citation Building & Management</h3>
              <p className="text-gray-700 mb-4">
                We ensure your business information is consistent across all online directories and platforms.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">NAP consistency audit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Citation cleanup</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">New citation building</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Ongoing citation monitoring</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Local SEO Process</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We follow a proven, data-driven approach to boost your local search presence.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-blue-200 transform md:translate-x-[-0.5px]"></div>

              {/* Step 1 */}
              <div className="relative flex flex-col md:flex-row items-center md:items-start mb-12">
                <div className="order-1 md:order-1 w-full md:w-1/2 md:pr-8 text-right hidden md:block">
                  <h3 className="text-xl font-semibold mb-2">Local SEO Audit</h3>
                  <p className="text-gray-700 mb-4">
                    We analyze your current local presence, identify opportunities, and develop a tailored strategy.
                  </p>
                </div>
                <div className="order-2 md:order-2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-4 md:mb-0 md:mx-0">
                  1
                </div>
                <div className="order-3 md:order-3 w-full md:w-1/2 md:pl-8 md:text-left block md:hidden">
                  <h3 className="text-xl font-semibold mb-2">Local SEO Audit</h3>
                  <p className="text-gray-700 mb-4">
                    We analyze your current local presence, identify opportunities, and develop a tailored strategy.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col md:flex-row items-center md:items-start mb-12">
                <div className="order-1 md:order-3 w-full md:w-1/2 md:pl-8">
                  <h3 className="text-xl font-semibold mb-2">On-Page Optimization</h3>
                  <p className="text-gray-700 mb-4">
                    We optimize your website with local keywords, schema markup, and location-specific content.
                  </p>
                </div>
                <div className="order-2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-4 md:mb-0 md:mx-0">
                  2
                </div>
                <div className="order-3 md:order-1 w-full md:w-1/2 md:pr-8 md:text-right hidden md:block"></div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col md:flex-row items-center md:items-start mb-12">
                <div className="order-1 md:order-1 w-full md:w-1/2 md:pr-8 text-right hidden md:block">
                  <h3 className="text-xl font-semibold mb-2">Google Business Profile Optimization</h3>
                  <p className="text-gray-700 mb-4">
                    We fully optimize your GBP listing with accurate information, photos, posts, and Q&A management.
                  </p>
                </div>
                <div className="order-2 md:order-2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-4 md:mb-0 md:mx-0">
                  3
                </div>
                <div className="order-3 md:order-3 w-full md:w-1/2 md:pl-8 md:text-left block md:hidden">
                  <h3 className="text-xl font-semibold mb-2">Google Business Profile Optimization</h3>
                  <p className="text-gray-700 mb-4">
                    We fully optimize your GBP listing with accurate information, photos, posts, and Q&A management.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex flex-col md:flex-row items-center md:items-start mb-12">
                <div className="order-1 md:order-3 w-full md:w-1/2 md:pl-8">
                  <h3 className="text-xl font-semibold mb-2">Citation Building</h3>
                  <p className="text-gray-700 mb-4">
                    We create and manage consistent business listings across all relevant directories and platforms.
                  </p>
                </div>
                <div className="order-2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-4 md:mb-0 md:mx-0">
                  4
                </div>
                <div className="order-3 md:order-1 w-full md:w-1/2 md:pr-8 md:text-right hidden md:block"></div>
              </div>

              {/* Step 5 */}
              <div className="relative flex flex-col md:flex-row items-center md:items-start">
                <div className="order-1 md:order-1 w-full md:w-1/2 md:pr-8 text-right hidden md:block">
                  <h3 className="text-xl font-semibold mb-2">Ongoing Optimization & Reporting</h3>
                  <p className="text-gray-700 mb-4">
                    We continuously monitor performance, make adjustments, and provide detailed monthly reports.
                  </p>
                </div>
                <div className="order-2 md:order-2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-4 md:mb-0 md:mx-0">
                  5
                </div>
                <div className="order-3 md:order-3 w-full md:w-1/2 md:pl-8 md:text-left block md:hidden">
                  <h3 className="text-xl font-semibold mb-2">Ongoing Optimization & Reporting</h3>
                  <p className="text-gray-700 mb-4">
                    We continuously monitor performance, make adjustments, and provide detailed monthly reports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Local SEO Pricing</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Transparent pricing for our local SEO services. Choose the plan that fits your business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-6 text-center">
                <h3 className="text-xl font-semibold">Basic</h3>
                <p className="text-3xl font-bold mt-2">
                  $499<span className="text-sm font-normal text-gray-600">/mo</span>
                </p>
                <p className="text-gray-600 mt-2">For small local businesses</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Google Business Profile optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Local keyword research</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>20 local citations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Basic review management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Monthly reporting</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="border rounded-lg overflow-hidden shadow-lg relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
              <div className="bg-blue-50 p-6 text-center">
                <h3 className="text-xl font-semibold">Professional</h3>
                <p className="text-3xl font-bold mt-2">
                  $899<span className="text-sm font-normal text-gray-600">/mo</span>
                </p>
                <p className="text-gray-600 mt-2">For growing local businesses</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>50 local citations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Advanced review management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Local content creation (2 pieces/mo)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Local link building (5 links/mo)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Bi-weekly reporting</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-6 text-center">
                <h3 className="text-xl font-semibold">Enterprise</h3>
                <p className="text-3xl font-bold mt-2">
                  $1,499<span className="text-sm font-normal text-gray-600">/mo</span>
                </p>
                <p className="text-gray-600 mt-2">For multi-location businesses</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Everything in Professional</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>100+ local citations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Multi-location management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Local content creation (4 pieces/mo)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Local link building (10 links/mo)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Weekly reporting & strategy calls</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Local SEO Success Stories</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              See how we've helped local businesses dominate their markets.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Restaurant case study"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">Restaurant</div>
                <h3 className="text-xl font-bold mb-2">147% Increase in Local Search Visibility</h3>
                <p className="text-gray-700 mb-4">
                  We helped a local restaurant chain increase their Google Business Profile views by 147% and drive a
                  63% increase in direction requests.
                </p>
                <Link href="#" className="text-blue-600 font-medium flex items-center">
                  Read Case Study
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Dental practice case study"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">Dental Practice</div>
                <h3 className="text-xl font-bold mb-2">83% More New Patients from Local Search</h3>
                <p className="text-gray-700 mb-4">
                  Our local SEO strategy helped a dental practice rank in the top 3 for all major local keywords,
                  resulting in 83% more new patients.
                </p>
                <Link href="#" className="text-blue-600 font-medium flex items-center">
                  Read Case Study
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Home services case study"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">Home Services</div>
                <h3 className="text-xl font-bold mb-2">215% ROI from Local SEO Campaign</h3>
                <p className="text-gray-700 mb-4">
                  We helped a plumbing company dominate local search in 5 cities, resulting in a 215% ROI from their
                  local SEO investment.
                </p>
                <Link href="#" className="text-blue-600 font-medium flex items-center">
                  Read Case Study
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Get answers to common questions about our local SEO services.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">How long does it take to see results from local SEO?</h3>
              <p className="text-gray-700">
                Most clients begin to see improvements in local rankings within 30-60 days, with significant results
                typically appearing within 3-6 months. The timeline depends on your starting point, competition level,
                and the aggressiveness of your strategy.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Do I need a separate local SEO strategy for each location?</h3>
              <p className="text-gray-700">
                Yes, each location requires its own optimization strategy. This includes unique Google Business
                Profiles, location-specific content, and targeted citation building for each service area. Our
                multi-location packages are designed to efficiently manage this process.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">How do you measure the success of local SEO campaigns?</h3>
              <p className="text-gray-700">
                We track multiple KPIs including local pack rankings, organic rankings for local keywords, Google
                Business Profile metrics (views, clicks, calls, direction requests), website traffic from local
                searches, and most importantly, conversions from local search channels.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">What makes your local SEO services different?</h3>
              <p className="text-gray-700">
                Our approach combines data-driven strategies, hyper-local content creation, and advanced technical
                optimization. We also emphasize conversion rate optimization for local landing pages to ensure you're
                not just getting more visibility, but more customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-b from-[#051C2C] to-[#0A2A42] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Dominate Local Search?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Get a free local SEO audit and discover how we can help your business attract more local customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Your Free Local SEO Audit
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

