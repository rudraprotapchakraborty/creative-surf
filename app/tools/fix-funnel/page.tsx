"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useT } from "@/lib/i18n";
import { fixFunnelMessages } from "@/lib/i18n/messages/fixFunnel";

/** Industry option values and their benchmark rates are data, not copy. */
const INDUSTRY_KEYS = [
  "ecommerce",
  "saas",
  "finance",
  "healthcare",
  "education",
  "travel",
  "realestate",
  "other",
] as const;

const INDUSTRY_BENCHMARKS: Record<string, string> = {
  ecommerce: "3.2%",
  saas: "5.0%",
  finance: "4.5%",
  healthcare: "3.8%",
  education: "4.0%",
  travel: "2.8%",
  realestate: "2.5%",
};

const HOW_IT_WORKS_ICONS = [BarChart3, LineChart, CheckCircle];
const USE_CASE_META = [
  { value: "ecommerce", icon: ShoppingCart },
  { value: "saas", icon: Users },
  { value: "services", icon: DollarSign },
];
const TESTIMONIAL_NAMES = ["Sarah Johnson", "Michael Chen", "Jessica Williams"];

function StarRow() {
  return (
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
  );
}

export default function FixFunnelPage() {
  const t = useT(fixFunnelMessages);
  const [currentStep, setCurrentStep] = useState(1);
  const [funnelData, setFunnelData] = useState({
    industry: "",
    visitors: "",
    conversions: "",
    revenue: "",
  });
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFunnelData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetTool = () => {
    setCurrentStep(1);
    setFunnelData({
      industry: "",
      visitors: "",
      conversions: "",
      revenue: "",
    });
    setShowResults(false);
  };

  const stepLabels = t.list("tool.stepLabels");
  const howItWorks = t
    .raw<{ title: string; body: string }[]>("howItWorks.items", [])
    .map((item, i) => ({ ...item, icon: HOW_IT_WORKS_ICONS[i] ?? BarChart3 }));
  const useCaseTabs = t.list("useCases.tabs");
  const useCases = t
    .raw<{ title: string; body: string; issuesTitle: string; issues: string[] }[]>(
      "useCases.items",
      [],
    )
    .map((item, i) => ({ ...item, ...USE_CASE_META[i] }));
  const testimonials = t
    .raw<{ role: string; quote: string }[]>("testimonials.items", [])
    .map((item, i) => ({ ...item, name: TESTIMONIAL_NAMES[i] ?? "" }));
  const faq = t.raw<{ question: string; answer: string }[]>("faq.items", []);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("hero.title")}</h1>
              <p className="text-xl md:text-2xl mb-6">{t("hero.subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-flow-card"
                  onClick={() =>
                    document
                      .getElementById("tool-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {t("hero.cta")} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-[300px] md:h-[400px] w-full">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt={t("hero.imageAlt")}
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
      <section id="tool-section" className="py-16 bg-flow-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("tool.title")}</h2>
            <p className="text-lg text-flow-textSoft max-w-3xl mx-auto">{t("tool.intro")}</p>
          </div>

          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardContent className="p-6 md:p-8">
              {!showResults ? (
                <div>
                  <div className="flex justify-between mb-8">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`flex flex-col items-center ${
                          currentStep >= step
                            ? "text-blue-600"
                            : "text-flow-textSoft"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                            currentStep > step
                              ? "bg-blue-600 text-white"
                              : currentStep === step
                              ? "border-2 border-blue-600 text-blue-600"
                              : "border-2 border-flow-border text-flow-textSoft"
                          }`}
                        >
                          {currentStep > step ? (
                            <CheckCircle className="h-6 w-6" />
                          ) : (
                            step
                          )}
                        </div>
                        <span className="text-sm hidden md:block">
                          {stepLabels[step - 1]}
                        </span>
                      </div>
                    ))}
                  </div>

                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">{t("tool.steps.industry.title")}</h3>
                      <p className="text-flow-textSoft">{t("tool.steps.industry.body")}</p>
                      <div>
                        <label
                          htmlFor="industry"
                          className="block text-sm font-medium text-flow-textSoft mb-1"
                        >
                          {t("tool.steps.industry.label")}
                        </label>
                        <select
                          id="industry"
                          name="industry"
                          value={funnelData.industry}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-flow-border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="" disabled>
                            {t("tool.steps.industry.placeholder")}
                          </option>
                          {INDUSTRY_KEYS.map((key) => (
                            <option key={key} value={key}>
                              {t(`tool.industries.${key}`)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">{t("tool.steps.traffic.title")}</h3>
                      <p className="text-flow-textSoft">{t("tool.steps.traffic.body")}</p>
                      <div>
                        <label
                          htmlFor="visitors"
                          className="block text-sm font-medium text-flow-textSoft mb-1"
                        >
                          {t("tool.steps.traffic.label")}
                        </label>
                        <input
                          type="number"
                          id="visitors"
                          name="visitors"
                          value={funnelData.visitors}
                          onChange={handleInputChange}
                          placeholder={t("tool.steps.traffic.placeholder")}
                          className="w-full p-3 border border-flow-border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">{t("tool.steps.conversions.title")}</h3>
                      <p className="text-flow-textSoft">{t("tool.steps.conversions.body")}</p>
                      <div>
                        <label
                          htmlFor="conversions"
                          className="block text-sm font-medium text-flow-textSoft mb-1"
                        >
                          {t("tool.steps.conversions.label")}
                        </label>
                        <input
                          type="number"
                          id="conversions"
                          name="conversions"
                          value={funnelData.conversions}
                          onChange={handleInputChange}
                          placeholder={t("tool.steps.conversions.placeholder")}
                          className="w-full p-3 border border-flow-border rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                      <h3 className="text-xl font-semibold">{t("tool.steps.revenue.title")}</h3>
                      <p className="text-flow-textSoft">{t("tool.steps.revenue.body")}</p>
                      <div>
                        <label
                          htmlFor="revenue"
                          className="block text-sm font-medium text-flow-textSoft mb-1"
                        >
                          {t("tool.steps.revenue.label")}
                        </label>
                        <input
                          type="number"
                          id="revenue"
                          name="revenue"
                          value={funnelData.revenue}
                          onChange={handleInputChange}
                          placeholder={t("tool.steps.revenue.placeholder")}
                          className="w-full p-3 border border-flow-border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                          min="0"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      disabled={currentStep === 1}
                    >
                      {t("tool.back")}
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
                      {currentStep < 4 ? t("tool.next") : t("tool.analyze")}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">{t("results.title")}</h3>
                    <p className="text-flow-textSoft">{t("results.subtitle")}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <BarChart3 className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold mb-1">{t("results.currentTitle")}</h4>
                        <p className="text-3xl font-bold text-blue-600">
                          $
                          {Number.parseInt(funnelData.visitors) *
                            (Number.parseFloat(funnelData.conversions) / 100) *
                            Number.parseInt(funnelData.revenue) || 0}
                        </p>
                        <p className="text-sm text-flow-textSoft">{t("results.currentLabel")}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <LineChart className="h-10 w-10 text-green-600 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold mb-1">{t("results.potentialTitle")}</h4>
                        <p className="text-3xl font-bold text-green-600">
                          +$
                          {Number.parseInt(funnelData.visitors) *
                            ((Number.parseFloat(funnelData.conversions) * 1.5) /
                              100) *
                            Number.parseInt(funnelData.revenue) -
                            Number.parseInt(funnelData.visitors) *
                              (Number.parseFloat(funnelData.conversions) /
                                100) *
                              Number.parseInt(funnelData.revenue) || 0}
                        </p>
                        <p className="text-sm text-flow-textSoft">{t("results.potentialLabel")}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <AlertCircle className="h-10 w-10 text-amber-600 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold mb-1">{t("results.benchmarkTitle")}</h4>
                        <p className="text-3xl font-bold text-amber-600">
                          {INDUSTRY_BENCHMARKS[funnelData.industry] ?? "3.5%"}
                        </p>
                        <p className="text-sm text-flow-textSoft">{t("results.benchmarkLabel")}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold mb-4">
                      {t("results.recommendationsTitle")}
                    </h4>
                    <ul className="space-y-3">
                      {t.list("results.recommendations").map((recommendation) => (
                        <li key={recommendation} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={resetTool} variant="outline">
                      {t("results.startOver")}
                    </Button>
                    <Button asChild>
                      <Link href="/contact">{t("results.customStrategy")}</Link>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("howItWorks.title")}</h2>
            <p className="text-lg text-flow-textSoft max-w-3xl mx-auto">{t("howItWorks.intro")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-flow-textSoft">{item.body}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-flow-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("useCases.title")}</h2>
            <p className="text-lg text-flow-textSoft max-w-3xl mx-auto">{t("useCases.intro")}</p>
          </div>

          <Tabs defaultValue="ecommerce" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              {useCases.map((useCase, index) => (
                <TabsTrigger key={useCase.value} value={useCase.value!}>
                  {useCaseTabs[index]}
                </TabsTrigger>
              ))}
            </TabsList>
            {useCases.map((useCase) => {
              const Icon = useCase.icon ?? ShoppingCart;
              return (
                <TabsContent key={useCase.value} value={useCase.value!} className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <Icon className="h-12 w-12 text-blue-600 mb-4" />
                          <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                          <p className="text-flow-textSoft">{useCase.body}</p>
                        </div>
                        <div className="md:w-2/3">
                          <h4 className="font-semibold mb-3">{useCase.issuesTitle}</h4>
                          <ul className="space-y-2">
                            {useCase.issues.map((issue) => (
                              <li key={issue} className="flex items-start">
                                <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("testimonials.title")}</h2>
            <p className="text-lg text-flow-textSoft max-w-3xl mx-auto">{t("testimonials.intro")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-flow-card mr-4"></div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-flow-textSoft">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-flow-textSoft mb-4">"{testimonial.quote}"</p>
                  <StarRow />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-flow-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("faq.title")}</h2>
            <p className="text-lg text-flow-textSoft max-w-3xl mx-auto">{t("faq.intro")}</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faq.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index + 1}`}
                  className="bg-flow-surface rounded-lg shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-left font-semibold">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("cta.title")}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{t("cta.body")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-flow-card"
              onClick={() =>
                document
                  .getElementById("tool-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {t("cta.primary")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="/contact">{t("cta.secondary")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
