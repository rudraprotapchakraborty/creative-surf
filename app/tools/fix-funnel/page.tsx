"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronRight,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Users,
  DollarSign,
  LineChart,
  ShoppingCart,
  AlertCircle,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FixFunnelPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [funnelData, setFunnelData] = useState({
    industry: "",
    visitors: "",
    conversions: "",
    revenue: "",
  })
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFunnelData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetTool = () => {
    setCurrentStep(1)
    setFunnelData({
      industry: "",
      visitors: "",
      conversions: "",
      revenue: "",
    })
    setShowResults(false)
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Fix Your Funnel</h1>
              <p className="text-xl md:text-2xl mb-6">
                Identify conversion bottlenecks and unlock revenue potential with our free funnel analysis tool
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-gray-100"
                  onClick={() => document.getElementById("tool-section")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Analyze My Funnel <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-[300px] md:h-[400px] w-full">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Funnel Analysis Dashboard"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section id="tool-section" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Analyze Your Conversion Funnel</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Enter your website data below to receive a personalized analysis of your conversion funnel with actionable
              recommendations to improve your results.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardContent className="p-6 md:p-8">
              {!showResults ? (
                <div>
                  <div className="flex justify-between mb-8">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`flex flex-col items-center ${currentStep >= step ? "text-blue-600" : "text-gray-400"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                            currentStep > step
                              ? "bg-blue-600 text-white"
                              : currentStep === step
                                ? "border-2 border-blue-600 text-blue-600"
                                : "border-2 border-gray-300 text-gray-400"
                          }`}
                        >
                          {currentStep > step ? <CheckCircle className="h-6 w-6" /> : step}
                        </div>
                        <span className="text-sm hidden md:block">
                          {step === 1 ? "Industry" : step === 2 ? "Traffic" : step === 3 ? "Conversions" : "Revenue"}
                        </span>
                      </div>
                    ))}
                  </div>

                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Select Your Industry</h3>
                      <p className="text-gray-600">We'll benchmark your performance against industry standards.</p>
                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                          Industry
                        </label>
                        <select
                          id="industry"
                          name="industry"
                          value={funnelData.industry}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="" disabled>
                            Select your industry
                          </option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="saas">SaaS</option>
                          <option value="finance">Finance</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="education">Education</option>
                          <option value="travel">Travel & Hospitality</option>
                          <option value="realestate">Real Estate</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Website Traffic</h3>
                      <p className="text-gray-600">Tell us about your monthly website visitors.</p>
                      <div>
                        <label htmlFor="visitors" className="block text-sm font-medium text-gray-700 mb-1">
                          Monthly Website Visitors
                        </label>
                        <input
                          type="number"
                          id="visitors"
                          name="visitors"
                          value={funnelData.visitors}
                          onChange={handleInputChange}
                          placeholder="e.g., 10000"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Conversion Rate</h3>
                      <p className="text-gray-600">What percentage of visitors convert to leads or customers?</p>
                      <div>
                        <label htmlFor="conversions" className="block text-sm font-medium text-gray-700 mb-1">
                          Conversion Rate (%)
                        </label>
                        <input
                          type="number"
                          id="conversions"
                          name="conversions"
                          value={funnelData.conversions}
                          onChange={handleInputChange}
                          placeholder="e.g., 2.5"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Average Revenue</h3>
                      <p className="text-gray-600">What is your average revenue per conversion?</p>
                      <div>
                        <label htmlFor="revenue" className="block text-sm font-medium text-gray-700 mb-1">
                          Average Revenue Per Conversion ($)
                        </label>
                        <input
                          type="number"
                          id="revenue"
                          name="revenue"
                          value={funnelData.revenue}
                          onChange={handleInputChange}
                          placeholder="e.g., 100"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                          min="0"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 1}>
                      Back
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      disabled={
                        (currentStep === 1 && !funnelData.industry) ||
                        (currentStep === 2 && !funnelData.visitors) ||
                        (currentStep === 3 && !funnelData.conversions) ||
                        (currentStep === 4 && !funnelData.revenue)
                      }
                    >
                      {currentStep < 4 ? "Next" : "Analyze My Funnel"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">Your Funnel Analysis</h3>
                    <p className="text-gray-600">Based on your inputs, here's how your funnel is performing</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <BarChart3 className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold mb-1">Current Performance</h4>
                        <p className="text-3xl font-bold text-blue-600">
                          $
                          {Number.parseInt(funnelData.visitors) *
                            (Number.parseFloat(funnelData.conversions) / 100) *
                            Number.parseInt(funnelData.revenue) || 0}
                        </p>
                        <p className="text-sm text-gray-500">Monthly Revenue</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <LineChart className="h-10 w-10 text-green-600 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold mb-1">Potential Growth</h4>
                        <p className="text-3xl font-bold text-green-600">
                          +$
                          {Number.parseInt(funnelData.visitors) *
                            ((Number.parseFloat(funnelData.conversions) * 1.5) / 100) *
                            Number.parseInt(funnelData.revenue) -
                            Number.parseInt(funnelData.visitors) *
                              (Number.parseFloat(funnelData.conversions) / 100) *
                              Number.parseInt(funnelData.revenue) || 0}
                        </p>
                        <p className="text-sm text-gray-500">Additional Revenue Potential</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <AlertCircle className="h-10 w-10 text-amber-600 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold mb-1">Industry Benchmark</h4>
                        <p className="text-3xl font-bold text-amber-600">
                          {funnelData.industry === "ecommerce"
                            ? "3.2%"
                            : funnelData.industry === "saas"
                              ? "5.0%"
                              : funnelData.industry === "finance"
                                ? "4.5%"
                                : funnelData.industry === "healthcare"
                                  ? "3.8%"
                                  : funnelData.industry === "education"
                                    ? "4.0%"
                                    : funnelData.industry === "travel"
                                      ? "2.8%"
                                      : funnelData.industry === "realestate"
                                        ? "2.5%"
                                        : "3.5%"}
                        </p>
                        <p className="text-sm text-gray-500">Average Conversion Rate</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold mb-4">Recommendations to Improve Your Funnel</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Optimize your landing pages with clearer CTAs and value propositions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Implement A/B testing to identify the most effective page elements</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Streamline your checkout or form submission process to reduce abandonment</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Set up retargeting campaigns to re-engage visitors who didn't convert</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Improve page load speed to reduce bounce rates and improve user experience</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={resetTool} variant="outline">
                      Start Over
                    </Button>
                    <Button asChild>
                      <Link href="/proposal">Get a Custom Funnel Strategy</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Funnel Analysis Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our tool uses industry benchmarks and conversion optimization best practices to identify opportunities in
              your sales funnel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Data Analysis</h3>
                <p className="text-gray-600">
                  We analyze your current traffic, conversion rates, and revenue to establish your baseline performance.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LineChart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Benchmark Comparison</h3>
                <p className="text-gray-600">
                  Your metrics are compared against industry standards to identify gaps and opportunities.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Actionable Recommendations</h3>
                <p className="text-gray-600">
                  Receive personalized suggestions to optimize each stage of your conversion funnel.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Can Benefit</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our funnel analysis tool helps businesses of all sizes identify and fix conversion bottlenecks.
            </p>
          </div>

          <Tabs defaultValue="ecommerce" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
              <TabsTrigger value="saas">SaaS</TabsTrigger>
              <TabsTrigger value="services">Service Businesses</TabsTrigger>
            </TabsList>
            <TabsContent value="ecommerce" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <ShoppingCart className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">E-commerce Stores</h3>
                      <p className="text-gray-600">
                        Identify why shoppers abandon carts and optimize your product pages for higher conversion rates.
                      </p>
                    </div>
                    <div className="md:w-2/3">
                      <h4 className="font-semibold mb-3">Common E-commerce Funnel Issues:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>High cart abandonment rates (industry average: 69.57%)</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Poor product page conversion rates</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Checkout friction points causing drop-offs</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Low average order value</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="saas" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <Users className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">SaaS Companies</h3>
                      <p className="text-gray-600">
                        Optimize your trial-to-paid conversion rates and reduce churn in your subscription funnel.
                      </p>
                    </div>
                    <div className="md:w-2/3">
                      <h4 className="font-semibold mb-3">Common SaaS Funnel Issues:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Low trial-to-paid conversion rates</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>High customer acquisition costs</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Poor onboarding completion rates</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Early subscription cancellations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="services" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <DollarSign className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Service Businesses</h3>
                      <p className="text-gray-600">
                        Improve lead generation and consultation booking rates for your service-based business.
                      </p>
                    </div>
                    <div className="md:w-2/3">
                      <h4 className="font-semibold mb-3">Common Service Business Funnel Issues:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Low form completion rates</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Poor lead quality</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Low consultation booking rates</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>High no-show rates for consultations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how businesses have improved their conversion rates using our funnel analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">E-commerce Director</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "The funnel analysis tool helped us identify a major drop-off point in our checkout process. After
                  implementing the recommended changes, our conversion rate increased by 28%."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Michael Chen</h4>
                    <p className="text-sm text-gray-500">Marketing Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "We were struggling with low lead quality. The funnel analysis helped us restructure our lead capture
                  forms, resulting in 35% fewer but much higher quality leads that convert better."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Jessica Williams</h4>
                    <p className="text-sm text-gray-500">SaaS Founder</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Our trial-to-paid conversion rate was stuck at 8%. After using the funnel analysis tool and
                  implementing the recommendations, we've increased it to 12.5%, which has been transformative for our
                  business."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our funnel analysis tool.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-semibold">How accurate is the funnel analysis?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Our funnel analysis tool uses industry benchmarks and conversion optimization best practices to
                  provide accurate insights. The recommendations are based on data from thousands of successful websites
                  and campaigns across various industries.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="bg-white rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-semibold">Is my data secure?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Yes, we take data security seriously. The information you provide is used only for generating your
                  funnel analysis and is not stored or shared with third parties. We do not require any sensitive
                  business information to provide our analysis.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="bg-white rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-semibold">How do I implement the recommendations?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  After receiving your analysis, you can implement the recommendations yourself or work with our team of
                  experts who can help you implement the changes. We offer custom funnel optimization services to help
                  you maximize your results.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="bg-white rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-semibold">How long does it take to see results?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Most businesses start seeing improvements within 2-4 weeks of implementing our recommendations.
                  However, the timeline can vary depending on your traffic volume, industry, and the specific changes
                  implemented.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="bg-white rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-semibold">Can I get a more detailed analysis?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Yes! Our free tool provides a basic analysis, but we also offer in-depth custom funnel audits that
                  include detailed heatmap analysis, user session recordings, and personalized optimization strategies.
                  Contact us for more information.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Optimize Your Conversion Funnel?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get started with our free analysis tool or contact our experts for a comprehensive funnel audit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100"
              onClick={() => document.getElementById("tool-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              Analyze My Funnel Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/proposal">Get Expert Help</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

