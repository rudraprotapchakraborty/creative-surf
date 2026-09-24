"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Copy, Download, Info, Search, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useT } from "@/lib/i18n";
import { keywordToolMessages } from "@/lib/i18n/messages/keywordTool";
import { commonMessages } from "@/lib/i18n/messages/common";
import {
  CardGrid,
  ClosingCta,
  FaqSection,
  PageHero,
  PageShell,
  Section,
  Timeline,
} from "@/app/components/kit";
import { EASE } from "@/app/components/home/shared";

type KeywordRow = { keyword: string; volume: number; difficulty: number; cpc: number };

// Sample keyword data - in a real implementation, this would come from an API
const sampleKeywords: Record<string, KeywordRow[]> = {
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

type Filter = "all" | "low" | "medium" | "high";

const FILTERS: Filter[] = ["all", "low", "medium", "high"];

/** Difficulty bands: easy under 45, moderate under 65, hard above. */
const band = (difficulty: number): Exclude<Filter, "all"> =>
  difficulty < 45 ? "low" : difficulty < 65 ? "medium" : "high";

const BAND_COLOR: Record<Exclude<Filter, "all">, string> = {
  low: "#10B981",
  medium: "#F59E0B",
  high: "#EF4444",
};

export default function KeywordSuggestionTool() {
  const t = useT(keywordToolMessages);
  const c = useT(commonMessages);
  const [keyword, setKeyword] = useState("");
  const [searched, setSearched] = useState("");
  const [results, setResults] = useState<KeywordRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [copied, setCopied] = useState(false);

  const handleSearch = (searchTerm = keyword) => {
    if (!searchTerm) return;

    setIsLoading(true);
    setFilter("all");
    trackEvent("tool_use", "keyword_suggestion", `Search: ${searchTerm}`);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Check if we have sample data for this keyword
      const normalizedKeyword = searchTerm.toLowerCase().trim();
      const matchedKeyword = Object.keys(sampleKeywords).find(
        (key) => normalizedKeyword.includes(key) || key.includes(normalizedKeyword)
      );

      // If no direct match, use digital marketing as fallback
      setResults(sampleKeywords[matchedKeyword ?? "digital marketing"]);
      setSearched(searchTerm);
      setIsLoading(false);
    }, 1500);
  };

  const handlePopularSearch = (term: string) => {
    setKeyword(term);
    handleSearch(term);
  };

  const filtered = filter === "all" ? results : results.filter((item) => band(item.difficulty) === filter);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(results.map((item) => item.keyword).join("\n"));
    setCopied(true);
    trackEvent("tool_action", "keyword_suggestion", "Copy to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const headers = t.list("results.csvHeaders");
    const csvContent = [
      headers.join(","),
      ...results.map((item) => [item.keyword, item.volume, item.difficulty, item.cpc].join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `keyword-suggestions-${searched.replace(/\s+/g, "-")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    trackEvent("tool_action", "keyword_suggestion", "Download CSV");
  };

  const howTo = t.raw<{ title: string; body: string }[]>("howTo.steps", []);
  const features = t
    .raw<{ title: string; body: string }[]>("features.items", [])
    .map((f, i) => ({ title: f.title, description: f.body, icon: (["search", "chart", "zap"] as const)[i] }));
  const faq = t
    .raw<{ question: string; answer: string }[]>("faq.items", [])
    .map((item) => ({ q: item.question, a: item.answer }));

  const header = (label: string, tip?: string) => (
    <th className="px-5 py-3 text-left micro text-[10px] text-flow-textSoft">
      <span className="inline-flex items-center gap-1.5">
        {label}
        {tip && (
          <span className="group/tip relative">
            <Info className="w-3.5 h-3.5 opacity-60" aria-label={tip} />
            <span className="pointer-events-none absolute left-1/2 top-6 z-20 w-60 -translate-x-1/2 rounded-lg border border-flow-border bg-flow-bg p-3 text-[11px] normal-case tracking-normal font-normal text-flow-textSoft opacity-0 shadow-soft transition-opacity group-hover/tip:opacity-100">
              {tip}
            </span>
          </span>
        )}
      </span>
    </th>
  );

  return (
    <PageShell>
      <PageHero
        crumbs={[{ label: c("breadcrumb.home"), href: "/" }, { label: c("breadcrumb.tools") }, { label: t("hero.title") }]}
        kicker={c("breadcrumb.tools")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* Search */}
      <section className="section-px bg-flow-bg -mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="relative flex items-center gap-2 rounded-2xl glass-strong border border-flow-border p-2 shadow-soft focus-within:border-aurora-1/50"
          >
            <Search className="ml-3 w-5 h-5 flex-shrink-0 text-flow-textSoft" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={t("hero.placeholder")}
              aria-label={t("hero.placeholder")}
              className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base text-flow-text outline-none placeholder:text-flow-textSoft/70"
            />
            <button
              type="submit"
              disabled={isLoading || !keyword}
              className="focus-ring inline-flex items-center gap-2 rounded-xl bg-aurora-grad px-5 py-3 micro text-white shadow-aurora transition-opacity disabled:opacity-50 disabled:shadow-none"
            >
              {isLoading ? (
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <Sparkles className="w-4 h-4" />
                </motion.span>
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">{isLoading ? t("hero.searching") : c("labels.search")}</span>
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-flow-textSoft">{t("hero.popularSearches")}</span>
            {popularSearches.slice(0, 6).map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handlePopularSearch(term)}
                className="focus-ring rounded-full border border-flow-border px-3 py-1 text-xs text-flow-textSoft transition-colors hover:border-aurora-1/40 hover:text-flow-text"
              >
                {term}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Results */}
      <section className="section-px pt-12 pb-8 bg-flow-bg">
        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="hairline-card p-6 space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="relative h-11 overflow-hidden rounded-lg bg-flow-text/[0.04]">
                    <motion.span
                      className="absolute inset-y-0 w-1/3"
                      style={{ background: "linear-gradient(90deg, transparent, rgb(var(--accent-1) / 0.12), transparent)" }}
                      animate={{ x: ["-100%", "300%"] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
                    />
                  </div>
                ))}
              </motion.div>
            ) : searched ? (
              <motion.div key={`results-${searched}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="display-sm text-2xl text-flow-text">{t("results.heading", { keyword: searched })}</h2>
                    <p className="mt-1 text-sm text-flow-textSoft">{t("results.found", { count: results.length })}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleCopyToClipboard}
                      className="focus-ring inline-flex items-center gap-2 rounded-xl border border-flow-border px-4 py-2.5 micro text-[10px] text-flow-text hover:border-aurora-1/40"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      {copied ? t("results.copied") : t("results.copy")}
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadCSV}
                      className="focus-ring inline-flex items-center gap-2 rounded-xl border border-flow-border px-4 py-2.5 micro text-[10px] text-flow-text hover:border-aurora-1/40"
                    >
                      <Download className="w-4 h-4" />
                      {t("results.csv")}
                    </button>
                  </div>
                </div>

                <div role="tablist" className="mb-4 flex w-fit flex-wrap gap-1 rounded-2xl glass border border-flow-border p-1">
                  {FILTERS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      role="tab"
                      aria-selected={filter === f}
                      onClick={() => setFilter(f)}
                      className={`focus-ring relative rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                        filter === f ? "text-white" : "text-flow-textSoft hover:text-flow-text"
                      }`}
                    >
                      {filter === f && (
                        <motion.span layoutId="kw-filter" className="absolute inset-0 rounded-xl bg-aurora-grad" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                      )}
                      <span className="relative">{t(`results.tabs.${f}`)}</span>
                    </button>
                  ))}
                </div>

                <div className="hairline-card overflow-x-auto">
                  <table className="w-full min-w-[36rem]">
                    <thead className="border-b border-flow-border">
                      <tr>
                        {header(t("results.columns.keyword"))}
                        {header(t("results.columns.volume"), t("results.tooltips.volume"))}
                        {header(t("results.columns.difficulty"), t("results.tooltips.difficulty"))}
                        {header(t("results.columns.cpc"), t("results.tooltips.cpc"))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((item, i) => {
                        const level = band(item.difficulty);
                        return (
                          <motion.tr
                            key={`${filter}-${item.keyword}`}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, ease: EASE, delay: i * 0.04 }}
                            className="border-b border-flow-border last:border-0 transition-colors hover:bg-flow-text/[0.03]"
                          >
                            <td className="px-5 py-3.5 text-sm font-medium text-flow-text">{item.keyword}</td>
                            <td className="px-5 py-3.5 text-sm tabular-nums text-flow-textSoft">{item.volume.toLocaleString("en-US")}</td>
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-flow-text/[0.07]">
                                  <motion.div
                                    className="h-full rounded-full"
                                    style={{ background: BAND_COLOR[level] }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.difficulty}%` }}
                                    transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.04 }}
                                  />
                                </div>
                                <span className="text-xs tabular-nums text-flow-textSoft">{item.difficulty}/100</span>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-sm tabular-nums text-flow-textSoft">${item.cpc.toFixed(2)}</td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {filtered.length === 0 && <p className="p-8 text-center text-sm text-flow-textSoft">{t("results.empty")}</p>}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </section>

      {!searched && !isLoading && (
        <Section title={t("howTo.title")} subline={t("howTo.description")}>
          <Timeline items={howTo.map((step) => ({ title: step.title, body: step.body }))} />
        </Section>
      )}

      <Section grid title={t("features.title")}>
        <CardGrid items={features} columns={3} />
      </Section>

      <FaqSection title={t("faq.title")} items={faq} idPrefix="keyword-tool" />
      <ClosingCta title={t("cta.title")} body={t("cta.body")} button={t("cta.button")} />
    </PageShell>
  );
}
