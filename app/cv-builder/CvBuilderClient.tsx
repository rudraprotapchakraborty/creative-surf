"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AlertCircle,
  BadgeCheck,
  Download,
  Eye,
  FileText,
  Globe2,
  Loader2,
  Lock,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CtaButton, Eyebrow, Reveal } from "@/components/premium";
import CvBuilderSections from "./CvBuilderSections";
import { buildCvHtml, printCvDocument } from "@/lib/cv-document";
import { scoreCvAgainstJob } from "@/lib/cv-match";
import { CvPreviewModal } from "@/components/account/cv-preview-modal";
import { CV_LANGUAGES, CV_TONES, type CvTone, type GeneratedCv } from "@/lib/cv-types";
import { trackEvent } from "@/lib/analytics";
import { useT } from "@/lib/i18n";
import { cvBuilderMessages } from "@/lib/i18n/messages/cvBuilder";

/** A4 at 96dpi — the preview iframe renders at this width and is scaled to fit. */
const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;

const EMPTY_FORM = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  links: "",
  yearsExperience: "",
  workHistory: "",
  education: "",
  skills: "",
  targetJob: "",
  tone: "professional" as CvTone,
  language: "English",
};

type FormState = typeof EMPTY_FORM;

/** The free-text fields the completeness meter counts. Tone and language always have a value. */
const PROGRESS_FIELDS = [
  "fullName",
  "jobTitle",
  "email",
  "phone",
  "location",
  "links",
  "yearsExperience",
  "workHistory",
  "education",
  "skills",
  "targetJob",
] as const;

/** Icons for the hero's trust row, paired with `hero.trust` by position. */
const TRUST_ICONS = [Download, ShieldCheck, BadgeCheck, Globe2];

type SavedCvSummary = { _id: string; title: string; updatedAt: string };

/** Where a coverage score stops being a worry and starts being a green light. */
const STRONG_MATCH = 75;
const DECENT_MATCH = 50;

export default function CvBuilderClient() {
  const t = useT(cvBuilderMessages);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [cv, setCv] = useState<GeneratedCv | null>(null);
  /** The advert the current `cv` was written against — not the live textarea. */
  const [scoredAgainst, setScoredAgainst] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [savedCvs, setSavedCvs] = useState<SavedCvSummary[]>([]);
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        setIsAuthenticated(Boolean(data?.authenticated));
        setIsAuthChecking(false);
      })
      .catch(() => {
        if (!active) return;
        setIsAuthenticated(false);
        setIsAuthChecking(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const refreshSaved = useCallback(() => {
    fetch("/api/cv/saved")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.cvs)) setSavedCvs(data.cvs as SavedCvSummary[]);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isAuthenticated) refreshSaved();
  }, [isAuthenticated, refreshSaved]);

  /** Loads a stored CV back into the form and the preview. */
  const openSaved = useCallback((id: string) => {
    fetch(`/api/cv/saved/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.cv) return;
        if (data.cv.inputData) {
          setForm(data.cv.inputData);
          setScoredAgainst(data.cv.inputData.targetJob || "");
        }
        if (data.cv.cvData) setCv(data.cv.cvData);
      })
      .catch(() => {});
  }, []);

  // Pre-fill from ?id= so a saved CV can be linked to directly.
  useEffect(() => {
    if (typeof window === "undefined" || !isAuthenticated) return;
    const id = new URLSearchParams(window.location.search).get("id");
    if (id) openSaved(id);
  }, [isAuthenticated, openSaved]);

  const previewBoxRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const set = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    []
  );

  // The preview page is laid out at a fixed A4 width and scaled down, so the
  // preview and the printed PDF share one layout rather than two breakpoints.
  useEffect(() => {
    const box = previewBoxRef.current;
    if (!box) return;
    const measure = () => setScale(box.clientWidth / PAGE_WIDTH);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    return () => observer.disconnect();
  }, [cv]);

  /** Shared by the inline preview, the PDF and the full-screen reader. */
  const cvLabels = useMemo(
    () => ({
      summary: t("cv.summary"),
      experience: t("cv.experience"),
      education: t("cv.education"),
      skills: t("cv.skills"),
      projects: t("cv.projects"),
      certifications: t("cv.certifications"),
      languages: t("cv.languages"),
    }),
    [t]
  );

  const documentHtml = useMemo(
    () => (cv ? buildCvHtml(cv, cvLabels) : ""),
    [cv, cvLabels]
  );

  /** Scored against the advert the CV was written from, so the number can't drift. */
  const match = useMemo(
    () => (cv ? scoreCvAgainstJob(cv, scoredAgainst) : null),
    [cv, scoredAgainst]
  );

  const filledCount = PROGRESS_FIELDS.filter((key) => form[key].trim()).length;
  const progress = Math.round((filledCount / PROGRESS_FIELDS.length) * 100);

  const isLocked = !isAuthenticated && !isAuthChecking;

  const validate = (): string | null => {
    if (!form.fullName.trim() || !form.jobTitle.trim() || !form.email.trim()) {
      return t("errors.required");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      return t("errors.email");
    }
    if (!form.workHistory.trim() && !form.education.trim() && !form.skills.trim()) {
      return t("errors.background");
    }
    return null;
  };

  const handleGenerate = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsLoading(true);
    trackEvent("tool_action", "cv_builder", cv ? "Regenerate CV" : "Generate CV");

    try {
      const response = await fetch("/api/cv/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || t("errors.generic"));
        return;
      }

      setCv(data.cv as GeneratedCv);
      setScoredAgainst(form.targetJob);
      refreshSaved();
      // On mobile the preview sits below the form, so bring it into view.
      requestAnimationFrame(() =>
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    } catch {
      setError(t("errors.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!documentHtml || !cv) return;
    trackEvent("tool_action", "cv_builder", "Download PDF");
    printCvDocument(documentHtml, cv.fullName);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t("saved.confirm"))) return;
    setSavedCvs((prev) => prev.filter((item) => item._id !== id));
    try {
      await fetch(`/api/cv/saved/${id}`, { method: "DELETE" });
    } finally {
      refreshSaved();
    }
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setCv(null);
    setScoredAgainst("");
    setError(null);
  };

  const field = (
    key: "fullName" | "jobTitle" | "email" | "phone" | "location" | "links" | "yearsExperience",
    type = "text"
  ) => (
    <div className="space-y-1.5">
      <Label htmlFor={key} className="text-xs font-semibold text-flow-text">
        {t(`fields.${key}.label`)}
      </Label>
      <Input
        id={key}
        type={type}
        value={form[key]}
        disabled={isLocked}
        placeholder={t(`fields.${key}.placeholder`)}
        onChange={(e) => set(key, e.target.value)}
        className="h-11 rounded-xl border-flow-border bg-flow-surface text-flow-text"
      />
    </div>
  );

  const textarea = (
    key: "workHistory" | "education" | "skills" | "targetJob",
    rows: number,
    hint?: boolean
  ) => (
    <div className="space-y-1.5">
      <Label htmlFor={key} className="text-xs font-semibold text-flow-text">
        {t(`fields.${key}.label`)}
      </Label>
      <Textarea
        id={key}
        rows={rows}
        value={form[key]}
        disabled={isLocked}
        placeholder={t(`fields.${key}.placeholder`)}
        onChange={(e) => set(key, e.target.value)}
        className="resize-y rounded-xl border-flow-border bg-flow-surface text-flow-text"
      />
      {hint && <p className="text-xs leading-relaxed text-flow-textSoft">{t(`fields.${key}.hint`)}</p>}
    </div>
  );

  /** A numbered form step. The number is what turns three cards into a sequence. */
  const step = (index: number, title: string, hint: string, children: ReactNode) => (
    <section className="rounded-3xl border border-flow-border bg-flow-card p-5 backdrop-blur-md sm:p-7">
      <header className="mb-6 flex items-start gap-4">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-aurora-grad text-sm font-bold text-white shadow-aurora">
          {index}
        </span>
        <div>
          <h2 className="font-heading text-lg font-bold leading-tight text-flow-text">{title}</h2>
          <p className="mt-1 text-xs leading-relaxed text-flow-textSoft">{hint}</p>
        </div>
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  );

  const matchTier =
    match === null
      ? null
      : match.score >= STRONG_MATCH
        ? "strong"
        : match.score >= DECENT_MATCH
          ? "good"
          : "weak";

  return (
    <div className="min-h-screen bg-flow-bg">
      {/* HERO ------------------------------------------------------------ */}
      <section className="relative overflow-hidden border-b border-flow-border pb-16 pt-32 sm:pt-36 md:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-aurora-mesh opacity-70 animate-mesh" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-30" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.04] mix-blend-overlay" aria-hidden />

        <div className="relative z-10 mx-auto w-[95%] max-w-7xl">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow icon={Sparkles}>{t("hero.badge")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1
                className="mt-6 font-heading font-extrabold leading-[1.08] tracking-tight text-flow-text"
                style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
              >
                {t("hero.title")}{" "}
                <span className="text-aurora">{t("hero.titleHighlight")}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-flow-textSoft sm:text-lg">
                {t("hero.subtitle")}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <CtaButton href="#builder">{t("hero.ctaPrimary")}</CtaButton>
                <CtaButton href="#compare" variant="outline" showIcon={false}>
                  {t("hero.ctaSecondary")}
                </CtaButton>
              </div>
            </Reveal>
          </div>

          {/* Trust row — the four claims the rest of the page has to earn. */}
          <Reveal delay={0.2}>
            <ul className="mt-10 flex flex-wrap gap-2.5">
              {t.list("hero.trust").map((claim, index) => {
                const Icon = TRUST_ICONS[index] ?? BadgeCheck;
                return (
                  <li
                    key={claim}
                    className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-flow-text"
                  >
                    <Icon className="h-3.5 w-3.5 text-aurora-1" />
                    {claim}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-flow-border pt-8">
              {t.raw<{ value: string; label: string }[]>("stats", []).map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="order-2 mt-2 text-xs leading-snug text-flow-textSoft">{stat.label}</dt>
                  <dd className="order-1 text-2xl font-extrabold leading-none text-flow-text tabular-nums sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* BUILDER --------------------------------------------------------- */}
      <section id="builder" className="mx-auto w-[95%] max-w-7xl scroll-mt-28 py-16 sm:py-20">
        <div className="max-w-2xl">
          <Eyebrow>{t("builder.eyebrow")}</Eyebrow>
          <h2
            className="mt-5 font-heading font-bold leading-[1.12] text-flow-text"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            {t("builder.title")} <span className="text-aurora">{t("builder.highlight")}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-flow-textSoft">
            {t("builder.description")}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* FORM ------------------------------------------------------- */}
          <div className="space-y-6 lg:col-span-7">
            {isLocked && (
              <div className="rounded-3xl border border-flow-border bg-flow-card p-6 text-center backdrop-blur-md md:p-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-aurora-1/30 bg-aurora-soft">
                  <Lock className="h-6 w-6 text-aurora-1" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-flow-text">
                  {t("authRequired.title")}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-flow-textSoft">
                  {t("authRequired.subtitle")}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Link href="/login?from=/cv-builder">
                    <Button className="shine rounded-full bg-aurora-grad px-6 font-semibold text-white shadow-aurora">
                      {t("authRequired.login")}
                    </Button>
                  </Link>
                  <Link href="/register?from=/cv-builder">
                    <Button
                      variant="outline"
                      className="rounded-full border-flow-border font-semibold text-flow-text"
                    >
                      {t("authRequired.register")}
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            <div
              className={`space-y-6 transition-all duration-300 ${
                isLocked ? "pointer-events-none select-none opacity-50 blur-[1px]" : ""
              }`}
            >
              {/* Completeness meter — a nudge towards detail, not a gate. */}
              <div className="rounded-2xl border border-flow-border bg-flow-surface px-5 py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-flow-textSoft">
                    {t("progress.label")}
                  </span>
                  <span className="text-sm font-bold text-flow-text tabular-nums">{progress}%</span>
                </div>
                <div
                  className="mt-3 h-1.5 overflow-hidden rounded-full bg-flow-text/10"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={t("progress.label")}
                >
                  <div
                    className="h-full rounded-full bg-aurora-grad transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2.5 text-xs text-flow-textSoft">{t("progress.hint")}</p>
              </div>

              {step(
                1,
                t("sections.basics"),
                t("sections.basicsHint"),
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {field("fullName")}
                    {field("jobTitle")}
                    {field("email", "email")}
                    {field("phone", "tel")}
                    {field("location")}
                    {field("yearsExperience")}
                  </div>
                  {field("links")}
                </>
              )}

              {step(
                2,
                t("sections.background"),
                t("sections.backgroundHint"),
                <>
                  {textarea("workHistory", 8, true)}
                  {textarea("education", 3)}
                  {textarea("skills", 3)}
                </>
              )}

              {step(
                3,
                t("sections.tailoring"),
                t("sections.tailoringHint"),
                <>
                  {textarea("targetJob", 5, true)}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-flow-text">
                        {t("fields.tone.label")}
                      </Label>
                      <Select
                        value={form.tone}
                        disabled={isLocked}
                        onValueChange={(value) => set("tone", value as CvTone)}
                      >
                        <SelectTrigger className="h-11 rounded-xl border-flow-border bg-flow-surface text-flow-text">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CV_TONES.map((tone) => (
                            <SelectItem key={tone} value={tone}>
                              {t(`tones.${tone}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-flow-text">
                        {t("fields.language.label")}
                      </Label>
                      <Select
                        value={form.language}
                        disabled={isLocked}
                        onValueChange={(value) => set("language", value)}
                      >
                        <SelectTrigger className="h-11 rounded-xl border-flow-border bg-flow-surface text-flow-text">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CV_LANGUAGES.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || isLocked}
                  className="shine h-12 rounded-full bg-aurora-grad px-7 font-semibold text-white shadow-aurora"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("actions.generating")}
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      {cv ? t("actions.regenerate") : t("actions.generate")}
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  disabled={isLoading || isLocked}
                  className="rounded-full text-flow-textSoft"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {t("actions.startOver")}
                </Button>
              </div>

              <div className="rounded-2xl border border-flow-border bg-flow-surface p-5">
                <h3 className="text-sm font-bold text-flow-text">{t("tips.title")}</h3>
                <ul className="mt-3 space-y-2">
                  {t.list("tips.items").map((tip) => (
                    <li key={tip} className="flex gap-2.5 text-sm leading-relaxed text-flow-textSoft">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-aurora-1" aria-hidden />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Saved CVs — one version per application, kept where you built it. */}
              {isAuthenticated && (
                <div className="rounded-2xl border border-flow-border bg-flow-surface p-5">
                  <h3 className="text-sm font-bold text-flow-text">{t("saved.title")}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-flow-textSoft">
                    {t("saved.subtitle")}
                  </p>
                  {savedCvs.length === 0 ? (
                    <p className="mt-4 text-sm text-flow-textSoft">{t("saved.empty")}</p>
                  ) : (
                    <ul className="mt-4 space-y-2">
                      {savedCvs.map((item) => (
                        <li
                          key={item._id}
                          className="flex items-center gap-3 rounded-xl border border-flow-border bg-flow-card px-4 py-2.5"
                        >
                          <span className="min-w-0 flex-1 truncate text-sm font-medium text-flow-text">
                            {item.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => openSaved(item._id)}
                            className="focus-ring shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-aurora-1 hover:bg-aurora-1/10"
                          >
                            {t("saved.load")}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item._id)}
                            aria-label={t("saved.remove")}
                            title={t("saved.remove")}
                            className="focus-ring shrink-0 rounded-full p-1.5 text-flow-textSoft hover:text-red-500"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* PREVIEW + MATCH -------------------------------------------- */}
          <div ref={resultRef} className="lg:col-span-5">
            <div className="space-y-4 lg:sticky lg:top-28">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-heading text-lg font-bold text-flow-text">
                  {t("preview.title")}
                </h2>
                {cv && (
                  <div className="flex shrink-0 items-center gap-2">
                    {/* The inline preview is a scaled-down page; this opens it
                        at a size you can actually read. */}
                    <Button
                      onClick={() => setIsReading(true)}
                      size="sm"
                      variant="outline"
                      className="rounded-full border-flow-border font-semibold text-flow-text"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {t("actions.view")}
                    </Button>
                    <Button
                      onClick={handleDownload}
                      size="sm"
                      className="shine rounded-full bg-aurora-grad font-semibold text-white shadow-aurora"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {t("actions.download")}
                    </Button>
                  </div>
                )}
              </div>

              {/* Advert match: the check nobody else runs for you. */}
              {cv &&
                (match && matchTier ? (
                  <div className="rounded-2xl border border-flow-border bg-flow-card p-5 backdrop-blur-md">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="flex items-center gap-2 text-sm font-bold text-flow-text">
                          <Target className="h-4 w-4 text-aurora-1" />
                          {t("match.title")}
                        </h3>
                        <p className="mt-1 text-xs text-flow-textSoft">
                          {t("match.caption", { matched: match.matched.length, total: match.total })}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="block text-3xl font-extrabold leading-none text-flow-text tabular-nums">
                          {match.score}%
                        </span>
                        <span
                          className={`mt-1 block text-[11px] font-bold uppercase tracking-wider ${
                            matchTier === "strong"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : matchTier === "good"
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {t(`match.tiers.${matchTier}`)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-flow-text/10">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          matchTier === "strong"
                            ? "bg-emerald-500"
                            : matchTier === "good"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${match.score}%` }}
                      />
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-flow-textSoft">
                      {t(`match.tierHints.${matchTier}`)}
                    </p>

                    {match.missing.length > 0 && (
                      <div className="mt-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-flow-textSoft">
                          {t("match.missingLabel")}
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {match.missing.slice(0, 8).map((term) => (
                            <li
                              key={term}
                              className="rounded-full border border-red-500/25 bg-red-500/[0.07] px-2.5 py-1 text-xs font-medium text-red-600 dark:text-red-400"
                            >
                              {term}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {match.matched.length > 0 && (
                      <div className="mt-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-flow-textSoft">
                          {t("match.matchedLabel")}
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {match.matched.slice(0, 10).map((term) => (
                            <li
                              key={term}
                              className="rounded-full border border-flow-border bg-flow-surface px-2.5 py-1 text-xs font-medium text-flow-textSoft"
                            >
                              {term}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p className="mt-4 border-t border-flow-border pt-3 text-xs leading-relaxed text-flow-textSoft">
                      {t("match.honestNote")}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-flow-border bg-flow-surface p-5">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-flow-text">
                      <Target className="h-4 w-4 text-flow-textSoft" />
                      {t("match.lockedTitle")}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-flow-textSoft">
                      {t("match.lockedBody")}
                    </p>
                  </div>
                ))}

              <div
                ref={previewBoxRef}
                className="overflow-hidden rounded-2xl border border-flow-border bg-flow-card shadow-premium"
              >
                {cv ? (
                  <div style={{ height: PAGE_HEIGHT * scale }}>
                    <iframe
                      title={t("preview.title")}
                      srcDoc={documentHtml}
                      sandbox=""
                      scrolling="no"
                      style={{
                        width: PAGE_WIDTH,
                        height: PAGE_HEIGHT,
                        border: 0,
                        transform: `scale(${scale})`,
                        transformOrigin: "top left",
                        background: "#fff",
                      }}
                    />
                  </div>
                ) : isLoading ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-aurora-1" />
                    <p className="text-sm text-flow-textSoft">{t("preview.loading")}</p>
                  </div>
                ) : (
                  <div className="flex min-h-[460px] flex-col items-center justify-center gap-4 p-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-aurora-1/20 bg-aurora-soft">
                      <FileText className="h-7 w-7 text-aurora-1" />
                    </div>
                    <div className="max-w-xs space-y-1.5">
                      <h3 className="font-heading text-base font-bold text-flow-text">
                        {t("preview.placeholderTitle")}
                      </h3>
                      <p className="text-xs leading-relaxed text-flow-textSoft">
                        {t("preview.placeholderSubtitle")}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {cv && (
                <p className="text-xs leading-relaxed text-flow-textSoft">
                  {t("preview.downloadHint")}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <CvBuilderSections />

      <CvPreviewModal
        cv={isReading ? cv : null}
        labels={cvLabels}
        title={cv?.fullName || t("preview.title")}
        onClose={() => setIsReading(false)}
        onDownload={handleDownload}
      />
    </div>
  );
}
