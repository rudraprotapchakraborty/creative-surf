"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, Download, FileText, Loader2, Lock, RefreshCw, Wand2 } from "lucide-react";
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
import { buildCvHtml } from "@/lib/cv-document";
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

export default function CvBuilderClient() {
  const t = useT(cvBuilderMessages);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [cv, setCv] = useState<GeneratedCv | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

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

  // Pre-fill form if ?id= is passed in URL
  useEffect(() => {
    if (typeof window === "undefined" || !isAuthenticated) return;
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    if (!id) return;

    fetch(`/api/cv/saved/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.cv) {
          if (data.cv.inputData) setForm(data.cv.inputData);
          if (data.cv.cvData) setCv(data.cv.cvData);
        }
      })
      .catch(() => {});
  }, [isAuthenticated]);

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

  const documentHtml = useMemo(
    () =>
      cv
        ? buildCvHtml(cv, {
            summary: t("cv.summary"),
            experience: t("cv.experience"),
            education: t("cv.education"),
            skills: t("cv.skills"),
            projects: t("cv.projects"),
            certifications: t("cv.certifications"),
            languages: t("cv.languages"),
          })
        : "",
    [cv, t]
  );

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

  /**
   * Prints from a detached iframe holding the same HTML as the preview. The
   * browser's own "Save as PDF" gives real vector text and selectable content,
   * which beats rasterising the page into an image-based PDF.
   */
  const handleDownload = () => {
    if (!documentHtml) return;
    trackEvent("tool_action", "cv_builder", "Download PDF");

    const frame = document.createElement("iframe");
    frame.setAttribute("aria-hidden", "true");
    frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
    frame.srcdoc = documentHtml;

    frame.onload = () => {
      const win = frame.contentWindow;
      if (!win) return;
      win.focus();
      win.print();
      // Safari fires print synchronously, Chrome after the dialog closes —
      // a delayed removal covers both without leaving the node behind.
      setTimeout(() => frame.remove(), 1000);
    };

    document.body.appendChild(frame);
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setCv(null);
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
        disabled={!isAuthenticated && !isAuthChecking}
        placeholder={t(`fields.${key}.placeholder`)}
        onChange={(e) => set(key, e.target.value)}
        className="bg-flow-surface border-flow-border text-flow-text"
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
        disabled={!isAuthenticated && !isAuthChecking}
        placeholder={t(`fields.${key}.placeholder`)}
        onChange={(e) => set(key, e.target.value)}
        className="bg-flow-surface border-flow-border text-flow-text resize-y"
      />
      {hint && <p className="text-xs text-flow-textSoft">{t(`fields.${key}.hint`)}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-flow-bg">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="absolute inset-0 bg-aurora-grad opacity-[0.07]" aria-hidden />
        {/* Same width as the navbar pill, so the page's edges line up with it. */}
        <div className="relative mx-auto w-[95%] max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-flow-text">
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-lg text-flow-textSoft">{t("hero.subtitle")}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[95%] max-w-7xl py-20">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* FORM */}
          <div className="space-y-6 lg:col-span-7">
            {!isAuthChecking && isAuthenticated === false && (
              <div className="glass border border-flow-border rounded-2xl p-6 md:p-8 text-center space-y-4 bg-flow-card/80 backdrop-blur-md mb-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-aurora-grad/10 border border-aurora/30 shadow-inner">
                  <Lock className="h-7 w-7 text-aurora" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h2 className="font-heading text-xl font-bold text-flow-text">
                    {t("authRequired.title")}
                  </h2>
                  <p className="text-sm text-flow-textSoft leading-relaxed">
                    {t("authRequired.subtitle")}
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <Link href="/login?from=/cv-builder">
                    <Button className="shine bg-aurora-grad shadow-aurora text-white font-semibold rounded-full px-6">
                      {t("authRequired.login")}
                    </Button>
                  </Link>
                  <Link href="/register?from=/cv-builder">
                    <Button variant="outline" className="rounded-full border-flow-border text-flow-text font-semibold">
                      {t("authRequired.register")}
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            <div className={`space-y-6 transition-all duration-300 ${!isAuthenticated && !isAuthChecking ? "opacity-50 pointer-events-none select-none filter blur-[1px]" : ""}`}>
              <div className="glass border border-flow-border rounded-2xl p-5 md:p-6 space-y-5">
                <h2 className="font-heading text-lg font-bold text-flow-text">
                  {t("sections.basics")}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {field("fullName")}
                  {field("jobTitle")}
                  {field("email", "email")}
                  {field("phone", "tel")}
                  {field("location")}
                  {field("yearsExperience")}
                </div>
                {field("links")}
              </div>

              <div className="glass border border-flow-border rounded-2xl p-5 md:p-6 space-y-5">
                <h2 className="font-heading text-lg font-bold text-flow-text">
                  {t("sections.background")}
                </h2>
                {textarea("workHistory", 8, true)}
                {textarea("education", 3)}
                {textarea("skills", 3)}
              </div>

              <div className="glass border border-flow-border rounded-2xl p-5 md:p-6 space-y-5">
                <h2 className="font-heading text-lg font-bold text-flow-text">
                  {t("sections.tailoring")}
                </h2>
                {textarea("targetJob", 5, true)}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-flow-text">
                      {t("fields.tone.label")}
                    </Label>
                    <Select value={form.tone} disabled={!isAuthenticated && !isAuthChecking} onValueChange={(value) => set("tone", value as CvTone)}>
                      <SelectTrigger className="bg-flow-surface border-flow-border text-flow-text">
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
                    <Select value={form.language} disabled={!isAuthenticated && !isAuthChecking} onValueChange={(value) => set("language", value)}>
                      <SelectTrigger className="bg-flow-surface border-flow-border text-flow-text">
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
              </div>

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
                  disabled={isLoading || (!isAuthenticated && !isAuthChecking)}
                  className="shine bg-aurora-grad shadow-aurora text-white font-semibold rounded-full px-6"
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
                  disabled={isLoading || (!isAuthenticated && !isAuthChecking)}
                  className="rounded-full text-flow-textSoft"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {t("actions.startOver")}
                </Button>
              </div>

              <div className="rounded-2xl border border-flow-border bg-flow-card/50 p-5">
                <h3 className="text-sm font-bold text-flow-text">{t("tips.title")}</h3>
                <ul className="mt-3 space-y-2">
                  {t.list("tips.items").map((tip) => (
                    <li key={tip} className="flex gap-2 text-sm text-flow-textSoft">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-aurora" aria-hidden />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* PREVIEW PANEL */}
          <div ref={resultRef} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-heading text-lg font-bold text-flow-text">
                  {t("preview.title")}
                </h2>
                {cv && (
                  <Button
                    onClick={handleDownload}
                    size="sm"
                    className="shine bg-aurora-grad shadow-aurora text-white font-semibold rounded-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {t("actions.download")}
                  </Button>
                )}
              </div>

              <div
                ref={previewBoxRef}
                className="overflow-hidden rounded-2xl border border-flow-border bg-flow-card"
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
                    <Loader2 className="h-8 w-8 animate-spin text-aurora" />
                    <p className="text-sm text-flow-textSoft">{t("preview.loading")}</p>
                  </div>
                ) : (
                  <div className="flex min-h-[460px] flex-col items-center justify-center gap-4 p-8 text-center bg-flow-card/40">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-aurora-grad/10 border border-aurora/20 shadow-inner">
                      <FileText className="h-8 w-8 text-aurora" />
                    </div>
                    <div className="max-w-xs space-y-1.5">
                      <h3 className="font-heading text-base font-bold text-flow-text">
                        {t("preview.placeholderTitle")}
                      </h3>
                      <p className="text-xs text-flow-textSoft leading-relaxed">
                        {t("preview.placeholderSubtitle")}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {cv && <p className="text-xs text-flow-textSoft">{t("preview.downloadHint")}</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
