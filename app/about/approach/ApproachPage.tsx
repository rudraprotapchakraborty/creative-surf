import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Target,
  Lightbulb,
  BarChart,
  Users,
  Zap,
} from "lucide-react";
import { getTranslator } from "@/lib/i18n/server";
import { aboutApproachMessages } from "@/lib/i18n/messages/aboutApproach";

const PHILOSOPHY_ICONS = [Target, BarChart, Lightbulb];
const METHODOLOGY_ICONS = [Users, Zap, BarChart, Lightbulb];

type Card = { title: string; body: string };
type Step = { title: string; body: string; points: string[] };
type CaseStudy = { category: string; title: string; body: string; imageAlt: string };

export default async function ApproachPage() {
  const t = await getTranslator(aboutApproachMessages);

  const philosophy = t
    .raw<Card[]>("philosophy.cards", [])
    .map((card, i) => ({ ...card, icon: PHILOSOPHY_ICONS[i] ?? Target }));

  const steps = t.raw<Step[]>("process.steps", []);

  const methodology = t
    .raw<Card[]>("methodology.cards", [])
    .map((card, i) => ({ ...card, icon: METHODOLOGY_ICONS[i] ?? Users }));

  const caseStudies = t.raw<CaseStudy[]>("caseStudies.items", []);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#051C2C] to-[#0A2A42] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 md:py-20 bg-flow-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#051C2C] mb-4">
              {t("philosophy.title")}
            </h2>
            <p className="text-lg text-flow-textSoft">{t("philosophy.intro")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophy.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-flow-bg p-6 rounded-lg shadow-sm border border-flow-border"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                  <p className="text-flow-textSoft">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-20 bg-flow-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#051C2C] mb-4">
              {t("process.title")}
            </h2>
            <p className="text-lg text-flow-textSoft">{t("process.intro")}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Process Steps */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[21px] top-0 bottom-0 w-1 bg-blue-200 hidden md:block"></div>

              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className={`flex flex-col md:flex-row relative ${
                    index < steps.length - 1 ? "mb-12" : ""
                  }`}
                >
                  <div className="flex-shrink-0 flex items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold z-10">
                      {index + 1}
                    </div>
                  </div>
                  <div className="md:ml-8 mt-4 md:mt-0">
                    <h3 className="text-xl font-bold text-[#051C2C] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-flow-textSoft mb-4">{step.body}</p>
                    <div className="bg-flow-surface p-4 rounded-lg border border-flow-border">
                      <h4 className="font-semibold mb-2">{t("process.expectLabel")}</h4>
                      <ul className="space-y-2">
                        {step.points.map((point) => (
                          <li key={point} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-12 md:py-20 bg-flow-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#051C2C] mb-4">
              {t("methodology.title")}
            </h2>
            <p className="text-lg text-flow-textSoft">{t("methodology.intro")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {methodology.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <div className="flex items-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                  </div>
                  <p className="text-flow-textSoft">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-12 md:py-20 bg-flow-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#051C2C] mb-4">
              {t("caseStudies.title")}
            </h2>
            <p className="text-lg text-flow-textSoft">{t("caseStudies.intro")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {caseStudies.map((study) => (
              <div key={study.title} className="bg-flow-surface rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-flow-card relative">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt={study.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm font-medium text-blue-600 mb-2 block">
                    {study.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                  <p className="text-flow-textSoft mb-4">{study.body}</p>
                  <Link href="#" className="text-blue-600 font-medium flex items-center">
                    {t("caseStudies.readMore")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-[#051C2C] to-[#0A2A42] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8">{t("cta.body")}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#051C2C] hover:bg-flow-card"
              >
                <Link href="/contact">{t("cta.contact")}</Link>
              </Button>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">{t("cta.proposal")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
