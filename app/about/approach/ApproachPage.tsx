import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Target, Lightbulb, BarChart, Users, Zap } from "lucide-react"

export default function ApproachPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#051C2C] to-[#0A2A42] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Approach</h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6">
              How we deliver exceptional results through our proven methodology
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#051C2C] mb-4">Our Philosophy</h2>
            <p className="text-lg text-gray-700">
              At Creative Surf, we believe in a data-driven, client-focused approach that delivers measurable results.
              Our methodology combines strategic thinking, creative excellence, and technical expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Strategic Focus</h3>
              <p className="text-gray-700">
                We begin with understanding your business goals and target audience to create strategies that align with
                your objectives.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Data-Driven Decisions</h3>
              <p className="text-gray-700">
                We leverage analytics and market research to inform our strategies and continuously optimize for better
                performance.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Creative Innovation</h3>
              <p className="text-gray-700">
                We combine creativity with technology to develop innovative solutions that help your brand stand out in
                a crowded market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#051C2C] mb-4">Our Process</h2>
            <p className="text-lg text-gray-700">A systematic approach that ensures consistent quality and results</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Process Steps */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[21px] top-0 bottom-0 w-1 bg-blue-200 hidden md:block"></div>

              {/* Step 1 */}
              <div className="flex flex-col md:flex-row mb-12 relative">
                <div className="flex-shrink-0 flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold z-10">
                    1
                  </div>
                </div>
                <div className="md:ml-8 mt-4 md:mt-0">
                  <h3 className="text-xl font-bold text-[#051C2C] mb-2">Discovery & Analysis</h3>
                  <p className="text-gray-700 mb-4">
                    We begin by understanding your business, goals, target audience, and competitive landscape. Our team
                    conducts thorough research and analysis to identify opportunities and challenges.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold mb-2">What to expect:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Comprehensive business analysis</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Competitive landscape evaluation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Target audience research</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row mb-12 relative">
                <div className="flex-shrink-0 flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold z-10">
                    2
                  </div>
                </div>
                <div className="md:ml-8 mt-4 md:mt-0">
                  <h3 className="text-xl font-bold text-[#051C2C] mb-2">Strategy Development</h3>
                  <p className="text-gray-700 mb-4">
                    Based on our findings, we develop a customized strategy that aligns with your business objectives.
                    We establish clear KPIs and create a roadmap for implementation.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold mb-2">What to expect:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Customized strategic plan</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Clear KPIs and success metrics</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Resource allocation and timeline</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row mb-12 relative">
                <div className="flex-shrink-0 flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold z-10">
                    3
                  </div>
                </div>
                <div className="md:ml-8 mt-4 md:mt-0">
                  <h3 className="text-xl font-bold text-[#051C2C] mb-2">Execution & Implementation</h3>
                  <p className="text-gray-700 mb-4">
                    Our expert team executes the strategy with precision and attention to detail. We leverage the latest
                    tools and technologies to deliver high-quality results.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold mb-2">What to expect:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Skilled execution by specialists</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Regular progress updates</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Quality assurance at every step</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row relative">
                <div className="flex-shrink-0 flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold z-10">
                    4
                  </div>
                </div>
                <div className="md:ml-8 mt-4 md:mt-0">
                  <h3 className="text-xl font-bold text-[#051C2C] mb-2">Measurement & Optimization</h3>
                  <p className="text-gray-700 mb-4">
                    We continuously monitor performance, analyze results, and make data-driven optimizations to improve
                    outcomes and maximize ROI.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold mb-2">What to expect:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Comprehensive performance reporting</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Data-driven optimization recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Continuous improvement cycle</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#051C2C] mb-4">Our Methodology</h2>
            <p className="text-lg text-gray-700">
              The core principles that guide our work and ensure exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Client Partnership</h3>
              </div>
              <p className="text-gray-700">
                We view ourselves as an extension of your team, working collaboratively to achieve your goals. Our
                transparent communication and regular updates ensure you're always informed and involved.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Agile Execution</h3>
              </div>
              <p className="text-gray-700">
                Our agile approach allows us to adapt quickly to changing market conditions and business needs. We
                iterate rapidly, test continuously, and optimize for maximum impact.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="flex items-center mb-4">
                <BarChart className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Results-Focused</h3>
              </div>
              <p className="text-gray-700">
                We're obsessed with delivering measurable results that impact your bottom line. Every strategy and
                tactic is designed with clear objectives and KPIs in mind.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="flex items-center mb-4">
                <Lightbulb className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Continuous Innovation</h3>
              </div>
              <p className="text-gray-700">
                We stay at the forefront of industry trends and technologies to bring innovative solutions that give
                your business a competitive edge in the market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#051C2C] mb-4">Our Approach in Action</h2>
            <p className="text-lg text-gray-700">
              See how our methodology has delivered exceptional results for our clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Case Study 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="E-commerce Growth Case Study"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-sm font-medium text-blue-600 mb-2 block">E-commerce</span>
                <h3 className="text-xl font-bold mb-2">300% Revenue Growth</h3>
                <p className="text-gray-700 mb-4">
                  How we helped an e-commerce brand triple their revenue through strategic digital marketing.
                </p>
                <Link href="#" className="text-blue-600 font-medium flex items-center">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="B2B Lead Generation Case Study"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-sm font-medium text-blue-600 mb-2 block">B2B</span>
                <h3 className="text-xl font-bold mb-2">10x Lead Generation</h3>
                <p className="text-gray-700 mb-4">
                  How our approach helped a B2B company increase qualified leads by 10x in 6 months.
                </p>
                <Link href="#" className="text-blue-600 font-medium flex items-center">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Brand Transformation Case Study"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-sm font-medium text-blue-600 mb-2 block">Brand Transformation</span>
                <h3 className="text-xl font-bold mb-2">Brand Relaunch Success</h3>
                <p className="text-gray-700 mb-4">
                  How we helped a legacy brand transform digitally and capture a new market segment.
                </p>
                <Link href="#" className="text-blue-600 font-medium flex items-center">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-[#051C2C] to-[#0A2A42] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Experience Our Approach?</h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Let's discuss how our proven methodology can help your business achieve exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-[#051C2C] hover:bg-gray-100">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/proposal">Get a Proposal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}