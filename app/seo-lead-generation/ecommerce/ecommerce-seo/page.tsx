import type { Metadata } from "next";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  LineChart,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { getTranslator } from "@/lib/i18n/server";
import { ecommerceSeoMessages } from "@/lib/i18n/messages/ecommerceSeo";

const SERVICE_ICONS = [ShoppingCart, LineChart, TrendingUp, Users, Star, Zap];

/** Tab values and platform names stay untranslated — they are product names. */
const PLATFORM_META = [
  { value: "shopify", label: "Shopify" },
  { value: "woocommerce", label: "WooCommerce" },
  { value: "magento", label: "Magento" },
  { value: "bigcommerce", label: "BigCommerce" },
];

const CASE_STUDY_HREFS = [
  "/case-studies/fashion-retailer",
  "/case-studies/home-goods",
  "/case-studies/electronics-store",
];

const TESTIMONIAL_NAMES = ["Sarah Johnson", "Michael Chen", "Jessica Martinez"];

type Service = { title: string; body: string; points: string[] };
type Platform = { title: string; body: string; imageAlt: string; points: string[] };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(ecommerceSeoMessages);
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/seo-lead-generation/ecommerce/ecommerce-seo",
  });
}

export default async function EcommerceSEOPage() {
  const t = await getTranslator(ecommerceSeoMessages);

  const stats = t.raw<{ value: string; label: string }[]>("stats", []);
  const services = t
    .raw<Service[]>("services.items", [])
    .map((service, i) => ({ ...service, icon: SERVICE_ICONS[i] ?? ShoppingCart }));
  const steps = t.raw<{ title: string; body: string }[]>("process.steps", []);
  const platforms = t
    .raw<Platform[]>("platforms.items", [])
    .map((platform, i) => ({ ...platform, ...PLATFORM_META[i] }));
  const caseStudies = t
    .raw<{ tag: string; title: string; body: string; result: string; imageAlt: string }[]>(
      "caseStudies.items",
      [],
    )
    .map((study, i) => ({ ...study, href: CASE_STUDY_HREFS[i] ?? "#" }));
  const testimonials = t
    .raw<{ quote: string; role: string }[]>("testimonials.items", [])
    .map((testimonial, i) => ({ ...testimonial, name: TESTIMONIAL_NAMES[i] }));
  const faq = t.raw<{ question: string; answer: string }[]>("faq.items", []);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("hero.title")}</h1>
              <p className="text-xl mb-8 text-blue-100">{t("hero.subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-blue-50">
                  <Link href="/contact">
                    {t("hero.ctaPrimary")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#case-studies">{t("hero.ctaSecondary")}</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt={t("hero.imageAlt")}
                  width={500}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white text-blue-900 p-4 rounded-lg shadow-lg">
                  <p className="font-bold text-xl">{t("hero.badgeValue")}</p>
                  <p className="text-sm">{t("hero.badgeLabel")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-flow-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.value} className="bg-flow-bg p-6 rounded-lg text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-flow-textSoft">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-flow-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("services.title")}</h2>
            <p className="text-xl text-flow-textSoft max-w-3xl mx-auto">{t("services.intro")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                      <Icon className="h-6 w-6 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-flow-textSoft mb-4">{service.body}</p>
                    <ul className="space-y-2">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-flow-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("process.title")}</h2>
            <p className="text-xl text-flow-textSoft max-w-3xl mx-auto">{t("process.intro")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="bg-blue-50 rounded-lg p-6 h-full">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-flow-textSoft">{step.body}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ChevronRight className="h-8 w-8 text-blue-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Expertise */}
      <section className="py-16 bg-flow-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("platforms.title")}</h2>
            <p className="text-xl text-flow-textSoft max-w-3xl mx-auto">{t("platforms.intro")}</p>
          </div>

          <Tabs defaultValue="shopify" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              {platforms.map((platform) => (
                <TabsTrigger key={platform.value} value={platform.value!}>
                  {platform.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {platforms.map((platform) => (
              <TabsContent key={platform.value} value={platform.value!} className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <Image
                          src="/placeholder.svg?height=200&width=200"
                          alt={platform.imageAlt}
                          width={200}
                          height={200}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-xl font-bold mb-3">{platform.title}</h3>
                        <p className="text-flow-textSoft mb-4">{platform.body}</p>
                        <ul className="space-y-2">
                          {platform.points.map((point) => (
                            <li key={point} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-16 bg-flow-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("caseStudies.title")}</h2>
            <p className="text-xl text-flow-textSoft max-w-3xl mx-auto">{t("caseStudies.intro")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.title} className="overflow-hidden border-0 shadow-lg">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt={study.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {study.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                  <p className="text-flow-textSoft mb-4">{study.body}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-flow-textSoft">{t("caseStudies.resultsLabel")}</p>
                      <p className="font-medium">{study.result}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={study.href}>
                        {t("caseStudies.readMore")} <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild>
              <Link href="/case-studies">
                {t("caseStudies.viewAll")} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-flow-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("testimonials.title")}</h2>
            <p className="text-xl text-flow-textSoft max-w-3xl mx-auto">{t("testimonials.intro")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-flow-textSoft mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-flow-card mr-4"></div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-flow-textSoft">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-flow-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("faq.title")}</h2>
            <p className="text-xl text-flow-textSoft max-w-3xl mx-auto">{t("faq.intro")}</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faq.map((item) => (
                <Card key={item.question} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.question}</h3>
                    <p className="text-flow-textSoft">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{t("cta.body")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-blue-50">
              <Link href="/contact">
                {t("cta.primary")} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
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
