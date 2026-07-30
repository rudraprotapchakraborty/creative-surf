import type { Metadata } from "next";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  ShoppingCart,
  Palette,
  Code,
  BarChart,
  CreditCard,
  Users,
} from "lucide-react";
import { getTranslator } from "@/lib/i18n/server";
import { designMessages } from "@/lib/i18n/messages/design";

const FEATURE_ICONS = [ShoppingCart, Palette, Code, BarChart, CreditCard, Users];

/** Tab values and platform names are product names, not copy. */
const PLATFORM_META = [
  { value: "shopify", label: "Shopify" },
  { value: "woocommerce", label: "WooCommerce" },
  { value: "magento", label: "Magento" },
  { value: "bigcommerce", label: "BigCommerce" },
];

const TESTIMONIAL_NAMES = ["Sarah Johnson", "Michael Chen", "Jessica Williams"];

type Card2 = { title: string; body: string };
type Platform = { title: string; body: string; imageAlt: string; points: string[] };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(designMessages);
  return buildMetadata({
    title: t("ecommerceDesign.metaTitle"),
    description: t("ecommerceDesign.metaDescription"),
    path: "/ux-interactive/design/ecommerce-design",
  });
}

export default async function EcommerceDesignPage() {
  const t = await getTranslator(designMessages);

  const stats = t.raw<{ value: string; label: string }[]>("ecommerceDesign.stats", []);
  const features = t
    .raw<Card2[]>("ecommerceDesign.features.items", [])
    .map((feature, i) => ({ ...feature, icon: FEATURE_ICONS[i] ?? ShoppingCart }));
  const steps = t.raw<Card2[]>("ecommerceDesign.process.steps", []);
  const platforms = t
    .raw<Platform[]>("ecommerceDesign.platforms.items", [])
    .map((platform, i) => ({ ...platform, ...PLATFORM_META[i] }));
  const portfolioResults = t.list("ecommerceDesign.portfolio.results");
  const testimonials = t
    .raw<{ company: string; quote: string }[]>("ecommerceDesign.testimonials.items", [])
    .map((testimonial, i) => ({ ...testimonial, name: TESTIMONIAL_NAMES[i] ?? "" }));
  const faq = t.raw<{ question: string; answer: string }[]>("ecommerceDesign.faq.items", []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("ecommerceDesign.hero.title")}</h1>
              <p className="text-xl mb-8">{t("ecommerceDesign.hero.subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-flow-card">
                  <Link href="/contact">{t("ecommerceDesign.hero.primary")}</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-blue-800"
                >
                  <Link href="/portfolio">{t("ecommerceDesign.hero.secondary")}</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt={t("ecommerceDesign.hero.imageAlt")}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-flow-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="p-6 bg-flow-surface rounded-lg shadow-sm">
                <p className="text-3xl md:text-4xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-flow-textSoft">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("ecommerceDesign.features.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-0 shadow-md">
                  <CardContent className="pt-6">
                    <div className="mb-4 text-blue-600">
                      <Icon size={48} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-flow-textSoft">{feature.body}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-flow-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("ecommerceDesign.process.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="bg-flow-surface p-6 rounded-lg shadow-sm relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 mt-2">{step.title}</h3>
                <p className="text-flow-textSoft">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Expertise */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("ecommerceDesign.platforms.title")}
          </h2>
          <Tabs defaultValue="shopify" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              {platforms.map((platform) => (
                <TabsTrigger key={platform.value} value={platform.value!}>
                  {platform.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {platforms.map((platform) => (
              <TabsContent
                key={platform.value}
                value={platform.value!}
                className="p-6 bg-flow-surface rounded-lg shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{platform.title}</h3>
                    <p className="mb-4">{platform.body}</p>
                    <ul className="space-y-2">
                      {platform.points.map((point) => (
                        <li key={point} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative h-[250px]">
                    <Image
                      src="/placeholder.svg?height=250&width=400"
                      alt={platform.imageAlt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 bg-flow-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t("ecommerceDesign.portfolio.title")}
          </h2>
          <p className="text-center text-flow-textSoft mb-12 max-w-3xl mx-auto">
            {t("ecommerceDesign.portfolio.intro")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden border-0 shadow-md">
                <div className="relative h-[250px]">
                  <Image
                    src={`/placeholder.svg?height=250&width=400&text=Case+Study+${item}`}
                    alt={t("ecommerceDesign.portfolio.clientLabel", { index: item })}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {t("ecommerceDesign.portfolio.clientLabel", { index: item })}
                  </h3>
                  <p className="text-flow-textSoft mb-4">{portfolioResults[item - 1]}</p>
                  <Button variant="outline" className="w-full">
                    {t("ecommerceDesign.portfolio.viewCaseStudy")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/portfolio">{t("ecommerceDesign.portfolio.viewFull")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("ecommerceDesign.testimonials.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-flow-textSoft text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-flow-textSoft italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-flow-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("ecommerceDesign.faq.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faq.map((item, index) => (
              <div key={index} className="bg-flow-surface p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3">{item.question}</h3>
                <p className="text-flow-textSoft">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("ecommerceDesign.cta.title")}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{t("ecommerceDesign.cta.body")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-flow-card">
              <Link href="/contact">{t("ecommerceDesign.cta.primary")}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-blue-800"
            >
              <Link href="/contact">{t("ecommerceDesign.cta.secondary")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
