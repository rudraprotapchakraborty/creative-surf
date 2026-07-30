"use client";

import { useState } from "react";
import {
  ArrowRight,
  Search,
  Download,
  Copy,
  CheckCircle2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackEvent } from "@/lib/analytics";
import { useT } from "@/lib/i18n";
import { keywordToolMessages } from "@/lib/i18n/messages/keywordTool";

// Sample keyword data - in a real implementation, this would come from an API
const sampleKeywords = {
  "digital marketing": [
    {
      keyword: "digital marketing agency",
      volume: 33100,
      difficulty: 67,
      cpc: 15.2,
    },
    {
      keyword: "digital marketing strategy",
      volume: 18100,
      difficulty: 52,
      cpc: 11.3,
    },
    {
      keyword: "digital marketing services",
      volume: 27100,
      difficulty: 71,
      cpc: 16.8,
    },
    {
      keyword: "digital marketing courses",
      volume: 22200,
      difficulty: 48,
      cpc: 9.4,
    },
    {
      keyword: "digital marketing jobs",
      volume: 14300,
      difficulty: 39,
      cpc: 7.6,
    },
    {
      keyword: "digital marketing tools",
      volume: 12400,
      difficulty: 45,
      cpc: 10.2,
    },
    {
      keyword: "digital marketing certification",
      volume: 9800,
      difficulty: 42,
      cpc: 8.9,
    },
    {
      keyword: "digital marketing trends",
      volume: 8200,
      difficulty: 37,
      cpc: 7.1,
    },
    {
      keyword: "digital marketing examples",
      volume: 6700,
      difficulty: 31,
      cpc: 6.5,
    },
    {
      keyword: "digital marketing manager",
      volume: 5900,
      difficulty: 35,
      cpc: 9.8,
    },
  ],
  seo: [
    { keyword: "seo services", volume: 40500, difficulty: 75, cpc: 18.3 },
    { keyword: "seo tools", volume: 33600, difficulty: 68, cpc: 14.2 },
    { keyword: "seo company", volume: 27800, difficulty: 72, cpc: 17.5 },
    { keyword: "seo optimization", volume: 22100, difficulty: 61, cpc: 13.4 },
    { keyword: "seo agency", volume: 18700, difficulty: 70, cpc: 16.9 },
    { keyword: "seo audit", volume: 14900, difficulty: 54, cpc: 12.1 },
    { keyword: "seo strategy", volume: 12300, difficulty: 58, cpc: 13.8 },
    { keyword: "seo ranking", volume: 10600, difficulty: 52, cpc: 11.7 },
    { keyword: "seo checker", volume: 9200, difficulty: 47, cpc: 10.3 },
    { keyword: "seo tips", volume: 7800, difficulty: 41, cpc: 8.6 },
  ],
  ecommerce: [
    { keyword: "ecommerce website", volume: 27400, difficulty: 65, cpc: 14.8 },
    { keyword: "ecommerce platform", volume: 22800, difficulty: 59, cpc: 13.2 },
    { keyword: "ecommerce business", volume: 18500, difficulty: 54, cpc: 12.4 },
    { keyword: "ecommerce store", volume: 15700, difficulty: 51, cpc: 11.9 },
    {
      keyword: "ecommerce solutions",
      volume: 12900,
      difficulty: 57,
      cpc: 13.6,
    },
    {
      keyword: "ecommerce website design",
      volume: 10600,
      difficulty: 62,
      cpc: 15.1,
    },
    { keyword: "ecommerce marketing", volume: 8900, difficulty: 53, cpc: 12.7 },
    { keyword: "ecommerce software", volume: 7400, difficulty: 56, cpc: 13.3 },
    { keyword: "ecommerce trends", volume: 6100, difficulty: 44, cpc: 9.8 },
    { keyword: "ecommerce examples", volume: 5200, difficulty: 38, cpc: 8.4 },
  ],
  "web design": [
    { keyword: "web design company", volume: 22600, difficulty: 68, cpc: 15.7 },
    {
      keyword: "web design services",
      volume: 18900,
      difficulty: 65,
      cpc: 14.9,
    },
    { keyword: "web design agency", volume: 16700, difficulty: 67, cpc: 15.3 },
    {
      keyword: "web design inspiration",
      volume: 14200,
      difficulty: 42,
      cpc: 7.8,
    },
    {
      keyword: "web design templates",
      volume: 12800,
      difficulty: 46,
      cpc: 9.2,
    },
    {
      keyword: "web design software",
      volume: 10500,
      difficulty: 51,
      cpc: 11.4,
    },
    { keyword: "web design courses", volume: 8700, difficulty: 44, cpc: 8.9 },
    { keyword: "web design examples", volume: 7300, difficulty: 39, cpc: 7.2 },
    { keyword: "web design trends", volume: 6100, difficulty: 41, cpc: 8.3 },
    { keyword: "web design portfolio", volume: 5200, difficulty: 37, cpc: 6.9 },
  ],
};

// Popular searches for suggestions
const popularSearches = [
  "digital marketing",
  "seo",
  "ecommerce",
  "web design",
  "social media marketing",
  "content marketing",
  "ppc advertising",
  "email marketing",
];

export default function KeywordSuggestionTool() {
  const t = useT(keywordToolMessages);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [copied, setCopied] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (searchTerm = keyword) => {
    if (!searchTerm) return;

    setIsLoading(true);
    trackEvent("tool_use", "keyword_suggestion", `Search: ${searchTerm}`);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Check if we have sample data for this keyword
      const normalizedKeyword = searchTerm.toLowerCase().trim();
      const matchedKeyword = Object.keys(sampleKeywords).find(
        (key) =>
          normalizedKeyword.includes(key) || key.includes(normalizedKeyword)
      );

      if (matchedKeyword) {
        setResults(sampleKeywords[matchedKeyword]);
      } else {
        // If no direct match, use digital marketing as fallback
        setResults(sampleKeywords["digital marketing"]);
      }

      setIsLoading(false);
      setSearchPerformed(true);
    }, 1500);
  };

  const handlePopularSearch = (term: string) => {
    setKeyword(term);
    handleSearch(term);
  };

  const filteredResults =
    activeTab === "all"
      ? results
      : results.filter((item) => {
          if (activeTab === "low" && item.difficulty < 45) return true;
          if (
            activeTab === "medium" &&
            item.difficulty >= 45 &&
            item.difficulty < 65
          )
            return true;
          if (activeTab === "high" && item.difficulty >= 65) return true;
          return false;
        });

  const handleCopyToClipboard = () => {
    const keywordsText = results.map((item) => item.keyword).join("\n");
    navigator.clipboard.writeText(keywordsText);
    setCopied(true);
    trackEvent("tool_action", "keyword_suggestion", "Copy to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const headers = t.list("results.csvHeaders");
    const csvContent = [
      headers.join(","),
      ...results.map((item) =>
        [item.keyword, item.volume, item.difficulty, item.cpc].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `keyword-suggestions-${keyword.replace(/\s+/g, "-")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    trackEvent("tool_action", "keyword_suggestion", "Download CSV");
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 45) return "bg-green-100 text-green-800";
    if (difficulty < 65) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-flow-bg">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("hero.title")}</h1>
            <p className="text-xl mb-8">{t("hero.subtitle")}</p>

            <div className="bg-flow-surface p-6 rounded-lg shadow-lg">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t("hero.placeholder")}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="pr-12 text-flow-text text-lg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />
                <Button
                  className="absolute right-0 top-0 bottom-0 rounded-l-none"
                  onClick={() => handleSearch()}
                  disabled={isLoading || !keyword}
                >
                  {isLoading ? t("hero.searching") : <Search className="h-5 w-5" />}
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-flow-textSoft mr-1">{t("hero.popularSearches")}</span>
                {popularSearches.slice(0, 4).map((term) => (
                  <Badge
                    key={term}
                    variant="outline"
                    className="cursor-pointer hover:bg-flow-card text-flow-textSoft"
                    onClick={() => handlePopularSearch(term)}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {searchPerformed && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {t("results.heading", { keyword })}
              </h2>
              <p className="text-flow-textSoft">
                {t("results.found", { count: results.length })}
              </p>
            </div>
          )}

          {searchPerformed && (
            <div className="bg-flow-surface rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <Tabs
                  defaultValue="all"
                  className="w-full"
                  onValueChange={setActiveTab}
                >
                  <TabsList>
                    <TabsTrigger value="all">{t("results.tabs.all")}</TabsTrigger>
                    <TabsTrigger value="low">{t("results.tabs.low")}</TabsTrigger>
                    <TabsTrigger value="medium">{t("results.tabs.medium")}</TabsTrigger>
                    <TabsTrigger value="high">{t("results.tabs.high")}</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyToClipboard}
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1" />
                    )}
                    {copied ? t("results.copied") : t("results.copy")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadCSV}
                  >
                    <Download className="h-4 w-4 mr-1" /> {t("results.csv")}
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-flow-bg">
                      <th className="px-4 py-3 text-left text-sm font-medium text-flow-textSoft uppercase tracking-wider">
                        {t("results.columns.keyword")}
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-flow-textSoft uppercase tracking-wider">
                        {t("results.columns.volume")}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 inline-block ml-1 text-flow-textSoft" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-64">{t("results.tooltips.volume")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-flow-textSoft uppercase tracking-wider">
                        {t("results.columns.difficulty")}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 inline-block ml-1 text-flow-textSoft" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-64">{t("results.tooltips.difficulty")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-flow-textSoft uppercase tracking-wider">
                        {t("results.columns.cpc")}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 inline-block ml-1 text-flow-textSoft" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-64">{t("results.tooltips.cpc")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredResults.map((item, index) => (
                      <tr key={index} className="hover:bg-flow-bg">
                        <td className="px-4 py-3 text-sm font-medium text-flow-text">
                          {item.keyword}
                        </td>
                        <td className="px-4 py-3 text-sm text-flow-textSoft">
                          {item.volume.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Badge
                            className={getDifficultyColor(item.difficulty)}
                          >
                            {item.difficulty}/100
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-flow-textSoft">
                          ${item.cpc.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredResults.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-flow-textSoft">{t("results.empty")}</p>
                </div>
              )}
            </div>
          )}

          {!searchPerformed && (
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>{t("howTo.title")}</CardTitle>
                  <CardDescription>{t("howTo.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {t
                      .raw<{ title: string; body: string }[]>("howTo.steps", [])
                      .map((step, index) => (
                        <div key={step.title} className="flex items-start gap-4">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium">{step.title}</h3>
                            <p className="text-flow-textSoft">{step.body}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-flow-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t("features.title")}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {t
              .raw<{ title: string; body: string }[]>("features.items", [])
              .map((feature) => (
                <Card key={feature.title}>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-flow-textSoft">{feature.body}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-flow-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">{t("faq.title")}</h2>

          <div className="max-w-3xl mx-auto">
            <Accordion
              type="single"
              collapsible
              className="bg-flow-surface rounded-lg shadow-md"
            >
              {t
                .raw<{ question: string; answer: string }[]>("faq.items", [])
                .map((item, index) => (
                  <AccordionItem key={index} value={`item-${index + 1}`}>
                    <AccordionTrigger className="px-6 py-4">{item.question}</AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{t("cta.body")}</p>
          <Button
            size="lg"
            className="bg-white text-blue-800 hover:bg-flow-card"
            asChild
          >
            <a href="/contact">
              {t("cta.button")} <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
