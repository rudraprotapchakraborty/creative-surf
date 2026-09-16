"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  AlertCircle,
  AlignLeft,
  BadgeCheck,
  Download,
  Eye,
  FileText,
  ImagePlus,
  Info,
  Loader2,
  Plus,
  RefreshCw,
  ScanLine,
  Sparkles,
  Target,
  Trash2,
  TriangleAlert,
  Wand2,
  X,
  XCircle,
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
import { scoreCvAgainstJob, type CvMatch } from "@/lib/cv-match";
import { scoreCvForAts } from "@/lib/cv-ats";
import { nameForLinkType } from "@/lib/cv-links";
import { CvPreviewModal } from "@/components/account/cv-preview-modal";
import { compressImageFile } from "@/components/ui/ImageUpload";
import {
  CV_EFFORTS,
  CV_LANGUAGES,
  CV_TONES,
  CV_LANGUAGE_LEVELS,
  MAX_CV_LANGUAGES,
  MAX_CV_LINKS,
  MAX_CV_PHOTO_DATA_URL,
  CV_LINK_TYPES,
  CV_LINK_TYPE_CHOICES,
  type CvCoverage,
  type CvEffort,
  type CvLanguageLevel,
  type CvLinkType,
  type CvLinkTypeChoice,
  type CvTone,
  type GeneratedCv,
} from "@/lib/cv-types";
import { trackEvent } from "@/lib/analytics";
import { formatNumber, useT } from "@/lib/i18n";
import { cvBuilderMessages } from "@/lib/i18n/messages/cvBuilder";

/** A4 at 96dpi — the preview iframe renders at this width and is scaled to fit. */
const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;

/**
 * A link row: the URL the candidate typed, and what they want it called. An
 * empty name is the ordinary case — the CV then names the link after the site
 * it points to, which is what the name field's placeholder shows.
 */
type ProfileLink = { url: string; label: string; type: CvLinkTypeChoice };

/** A fresh row, and what the form falls back to rather than showing no rows. */
/*
 * The first row is a LinkedIn row until told otherwise — it is the link very
 * nearly every candidate has, and the one a recruiter looks for first.
 */
const EMPTY_LINK: ProfileLink = { url: "", label: "", type: "linkedin" };

/** A language the candidate speaks, and how well they will claim to speak it. */
type SpokenLanguage = { name: string; level: CvLanguageLevel };

const EMPTY_FORM = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  /** One empty row to start: the "+" below it is how the rest appear. */
  profileLinks: [EMPTY_LINK] as ProfileLink[],
  /** The hosted URL of the headshot on a CV that has already been generated. */
  photo: "",
  /**
   * A headshot chosen but not yet hosted. It travels with the generate request
   * and is hosted there, so abandoning the form leaves nothing on the image
   * host — see `hostPhoto` in the generate route.
   */
  photoData: "",
  /** One empty row to start, like the links; the "+" adds the rest. */
  languages: [{ name: "", level: "fluent" }] as SpokenLanguage[],
  yearsExperience: "",
  workHistory: "",
  education: "",
  skills: "",
  targetJob: "",
  tone: "professional" as CvTone,
  language: "English",
  /** The good writer by default; "low" is the cheap draft. */
  effort: "high" as CvEffort,
};

type FormState = typeof EMPTY_FORM;

/**
 * The free-text fields the completeness meter counts. Tone and language always
 * have a value, and the link rows are counted separately as one item.
 */
const PROGRESS_FIELDS = [
  "fullName",
  "jobTitle",
  "email",
  "phone",
  "location",
  "yearsExperience",
  "workHistory",
  "education",
  "skills",
  "targetJob",
] as const;

/**
 * The link rows for a stored CV. Anything saved before the rows existed kept
 * its links in four fixed fields, so those are folded back into rows here
 * rather than quietly disappearing from the form.
 */
function linkRowsFrom(input: Record<string, unknown>): ProfileLink[] {
  const rows: ProfileLink[] = [];

  /**
   * The dropdown value for a kind saved under an older form.
   *
   * The four it offers pass through. The seven it no longer offers become
   * "other" and hand their fixed name to `label`, which is what an "other" row
   * prints — so a Google Scholar row still reads "Google Scholar" rather than
   * losing its name to a list it is no longer on.
   */
  const asChoice = (type: unknown): { type: CvLinkTypeChoice; label: string } => {
    const known = CV_LINK_TYPE_CHOICES.find((choice) => choice === type);
    if (known) return { type: known, label: "" };
    const legacyName = CV_LINK_TYPES.includes(type as CvLinkType)
      ? nameForLinkType(type as CvLinkType)
      : "";
    return { type: "other", label: legacyName };
  };

  if (Array.isArray(input.profileLinks)) {
    for (const row of input.profileLinks) {
      if (typeof row === "string") {
        if (row.trim()) rows.push({ url: row, label: "", type: "other" });
        continue;
      }
      // A row carries `url` today; one saved before the form dropped its first
      // link-type dropdown carries `value` instead, and no name of its own.
      const saved = row as { url?: unknown; label?: unknown; value?: unknown; type?: unknown };
      const url = typeof saved.url === "string" ? saved.url : saved.value;
      if (typeof url !== "string" || !url.trim()) continue;
      const { type, label } = asChoice(saved.type);
      // A name typed by hand, back when the second field was free text, wins
      // over the one recovered from a legacy kind.
      const typed = typeof saved.label === "string" ? saved.label : "";
      rows.push({ url, label: typed || label, type });
    }
  }

  for (const key of ["linkedin", "github", "portfolio"] as const) {
    const legacy = typeof input[key] === "string" ? (input[key] as string).trim() : "";
    if (legacy) rows.push({ url: legacy, label: "", type: key });
  }
  const loose = typeof input.links === "string" ? input.links : "";
  for (const entry of loose.split(/[\s,;]+/).filter(Boolean)) {
    rows.push({ url: entry, label: "", type: "other" });
  }

  const capped = rows.slice(0, MAX_CV_LINKS);
  return capped.length ? capped : [EMPTY_LINK];
}

/**
 * The language rows for a stored CV. A CV saved before the section existed has
 * none, and the form always shows one row rather than an empty box.
 */
function languageRowsFrom(input: Record<string, unknown>): SpokenLanguage[] {
  const rows: SpokenLanguage[] = [];

  if (Array.isArray(input.languages)) {
    for (const row of input.languages) {
      const name = typeof (row as SpokenLanguage)?.name === "string" ? (row as SpokenLanguage).name : "";
      if (!name.trim()) continue;
      const level = (row as SpokenLanguage)?.level;
      rows.push({
        name,
        level: CV_LANGUAGE_LEVELS.includes(level) ? level : "fluent",
      });
    }
  }

  const capped = rows.slice(0, MAX_CV_LANGUAGES);
  return capped.length ? capped : [{ name: "", level: "fluent" }];
}

/** Icons for the hero's trust row, paired with `hero.trust` by position. */
const TRUST_ICONS = [BadgeCheck, Download, AlignLeft];

type SavedCvSummary = {
  _id: string;
  title: string;
  updatedAt: string;
  /** The generated CV itself, so the card can show the page rather than name it. */
  cvData: GeneratedCv;
};

/** Thumbnail width; the height follows from the A4 ratio the preview uses. */
const THUMB_WIDTH = 132;
const THUMB_SCALE = THUMB_WIDTH / PAGE_WIDTH;

/** Where a coverage score stops being a worry and starts being a green light. */
const STRONG_MATCH = 75;
const DECENT_MATCH = 50;

export default function CvBuilderClient() {
  const t = useT(cvBuilderMessages);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [cv, setCv] = useState<GeneratedCv | null>(null);
  /** The advert the current `cv` was written against — not the live textarea. */
  const [scoredAgainst, setScoredAgainst] = useState("");
  /** The server's cross-language grade of that advert. Null when it could not be graded. */
  const [coverage, setCoverage] = useState<CvCoverage | null>(null);
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
    // Signed out there is nothing to list: a guest's CV is saved, but it is
    // filed under no account, so /api/cv/saved would 401 and rightly so.
    if (!isAuthenticated) return;
    fetch("/api/cv/saved")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.cvs)) setSavedCvs(data.cvs as SavedCvSummary[]);
      })
      .catch(() => {});
  }, [isAuthenticated]);

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
          // Merged over the empty form: a CV saved before a field existed
          // would otherwise load that field as undefined.
          setForm({
            ...EMPTY_FORM,
            ...data.cv.inputData,
            profileLinks: linkRowsFrom(data.cv.inputData),
            languages: languageRowsFrom(data.cv.inputData),
          });
          setScoredAgainst(data.cv.inputData.targetJob || "");
        }
        setCoverage((data.cv.coverage as CvCoverage | null) ?? null);
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

  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const previewBoxRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const set = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    []
  );

  /**
   * Keeps the chosen photo in the page, downscaled, until there is a CV to put
   * it on. Nothing is uploaded here: a picture hosted the moment it was picked
   * would outlive every candidate who changed their mind and closed the tab.
   */
  const onPhotoPick = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      // Cleared so picking the same file twice still fires a change event.
      event.target.value = "";
      if (!file) return;

      setPhotoError(null);
      setPhotoBusy(true);
      try {
        // A headshot prints at about 26mm square, so anything past 600px is
        // weight the candidate waits for and the page never shows.
        const dataUrl = await compressImageFile(file, { maxDim: 600, quality: 0.85 });
        if (dataUrl.length > MAX_CV_PHOTO_DATA_URL) {
          setPhotoError(t("sections.photoTooLarge"));
          return;
        }
        setForm((prev) => ({ ...prev, photoData: dataUrl, photo: "" }));
      } catch {
        setPhotoError(t("sections.photoFailed"));
      } finally {
        setPhotoBusy(false);
      }
    },
    [t]
  );

  /** What the form shows: the picture waiting to be hosted, else the hosted one. */
  const photoPreview = form.photoData || form.photo;

  const setLanguage = useCallback(
    (index: number, patch: Partial<SpokenLanguage>) =>
      setForm((prev) => ({
        ...prev,
        languages: prev.languages.map((row, i) => (i === index ? { ...row, ...patch } : row)),
      })),
    []
  );

  const addLanguage = useCallback(
    () =>
      setForm((prev) =>
        prev.languages.length >= MAX_CV_LANGUAGES
          ? prev
          : { ...prev, languages: [...prev.languages, { name: "", level: "fluent" }] }
      ),
    []
  );

  /** Clearing the last row is a reset, not a removal — the form always shows one. */
  const removeLanguage = useCallback(
    (index: number) =>
      setForm((prev) => {
        const remaining = prev.languages.filter((_, i) => i !== index);
        return {
          ...prev,
          languages: remaining.length ? remaining : [{ name: "", level: "fluent" }],
        };
      }),
    []
  );

  const setLink = useCallback(
    (index: number, patch: Partial<ProfileLink>) =>
      setForm((prev) => ({
        ...prev,
        profileLinks: prev.profileLinks.map((link, i) =>
          i === index ? { ...link, ...patch } : link
        ),
      })),
    []
  );

  const addLink = useCallback(
    () =>
      setForm((prev) => {
        if (prev.profileLinks.length >= MAX_CV_LINKS) return prev;
        /*
         * A new row opens on the first kind not already used, so the usual
         * LinkedIn → GitHub → Portfolio run needs no touches of the dropdown
         * at all. Once they are spent, "other" — which names itself after
         * whatever is pasted into it.
         */
        const used = new Set(prev.profileLinks.map((link) => link.type));
        const next = CV_LINK_TYPE_CHOICES.find((choice) => !used.has(choice)) ?? "other";
        return { ...prev, profileLinks: [...prev.profileLinks, { ...EMPTY_LINK, type: next }] };
      }),
    []
  );

  /** Clearing the last row is a reset, not a removal — the form always shows one. */
  const removeLink = useCallback(
    (index: number) =>
      setForm((prev) => {
        const remaining = prev.profileLinks.filter((_, i) => i !== index);
        return {
          ...prev,
          profileLinks: remaining.length ? remaining : [EMPTY_LINK],
        };
      }),
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

  /**
   * The thumbnail strip's documents, built once per list rather than on every
   * render — each one is a whole HTML page, and there is a card for every CV
   * the account holds.
   */
  const savedHtml = useMemo(
    () =>
      new Map(
        savedCvs
          // A CV stored without its document would throw here and take the whole
          // strip with it; that row simply shows an empty page instead.
          .filter((item) => item.cvData)
          .map((item) => [item._id, buildCvHtml(item.cvData, cvLabels)])
      ),
    [savedCvs, cvLabels]
  );

  /**
   * Keyword overlap against the advert the CV was written from, so the number
   * can't drift. Null whenever overlap cannot answer the question — most often
   * because the CV and the advert are in different alphabets.
   */
  const localMatch = useMemo(
    () => (cv ? scoreCvAgainstJob(cv, scoredAgainst) : null),
    [cv, scoredAgainst]
  );

  /**
   * The server's model grade where there is one, falling back to keyword
   * overlap. The model reads across languages, so it is the only honest answer
   * for a CV written in one language against an advert written in another; the
   * local grade still covers CVs saved before grading existed.
   */
  const match = useMemo<CvMatch | null>(() => {
    if (!cv || !coverage) return localMatch;
    const total = coverage.matched.length + coverage.missing.length;
    if (!total) return localMatch;
    return {
      score: Math.round((coverage.matched.length / total) * 100),
      matched: coverage.matched,
      missing: coverage.missing,
      total,
    };
  }, [cv, coverage, localMatch]);

  /**
   * Scored from the finished CV alone. This is the other half of the question
   * the advert match asks: that one grades what the CV says, this one grades
   * whether a parser can read it in the first place.
   */
  const ats = useMemo(() => (cv ? scoreCvForAts(cv) : null), [cv]);

  // The link rows count once between them — filling in three is more detail,
  // but it is not three times the CV.
  const hasLink = form.profileLinks.some((link) => link.url.trim());
  const filledCount =
    PROGRESS_FIELDS.filter((key) => form[key].trim()).length + (hasLink ? 1 : 0);
  const progress = Math.round((filledCount / (PROGRESS_FIELDS.length + 1)) * 100);

  /**
   * Signed out, and we know it — the auth check has come back. Drives an
   * explanatory notice and nothing else: the builder itself is open to
   * everyone, and a guest's CV is saved just like anyone else's.
   */
  const isGuest = !isAuthenticated && !isAuthChecking;

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

      const generated = data.cv as GeneratedCv;
      setCv(generated);
      // The photo lives on the image host now, so the base64 has done its job.
      setForm((prev) => ({ ...prev, photo: generated.photoUrl ?? "", photoData: "" }));
      setScoredAgainst(form.targetJob);
      setCoverage((data.coverage as CvCoverage | null) ?? null);
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
    setCoverage(null);
    setError(null);
  };

  const field = (
    key:
      | "fullName"
      | "jobTitle"
      | "email"
      | "phone"
      | "location"
      | "yearsExperience",
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

  /** One colour ramp for both scores, so 68% never reads amber here and green there. */
  const tierText = (tier: "strong" | "good" | "weak") =>
    tier === "strong"
      ? "text-emerald-600 dark:text-emerald-400"
      : tier === "good"
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400";

  const tierBar = (tier: "strong" | "good" | "weak") =>
    tier === "strong" ? "bg-emerald-500" : tier === "good" ? "bg-amber-500" : "bg-red-500";

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
                <CtaButton href="#honesty" variant="outline" showIcon={false}>
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
            {isGuest && (
              <div className="rounded-2xl border border-flow-border bg-flow-surface p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-aurora-1/30 bg-aurora-soft">
                    <Info className="h-4 w-4 text-aurora-1" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-flow-text">{t("guestNotice.title")}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-flow-textSoft">
                      {t("guestNotice.subtitle")}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Link href="/login?from=/cv-builder">
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full border-flow-border text-xs font-semibold text-flow-text"
                        >
                          {t("guestNotice.login")}
                        </Button>
                      </Link>
                      <Link href="/register?from=/cv-builder">
                        <Button
                          size="sm"
                          className="shine rounded-full bg-aurora-grad text-xs font-semibold text-white shadow-aurora"
                        >
                          {t("guestNotice.register")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Completeness meter — a nudge towards detail, not a gate. */}
              <div className="rounded-2xl border border-flow-border bg-flow-surface px-5 py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-flow-textSoft">
                    {t("progress.label")}
                  </span>
                  <span className="text-sm font-bold text-flow-text tabular-nums">{formatNumber(progress, t.locale)}%</span>
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
                  <div className="space-y-3 rounded-2xl border border-flow-border bg-flow-surface p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-flow-textSoft">
                      {t("sections.photo")}
                    </p>
                    <div className="flex items-center gap-3">
                      {photoPreview ? (
                        // eslint-disable-next-line @next/next/no-img-element -- an image host URL, not a bundled asset
                        <img
                          src={photoPreview}
                          alt=""
                          className="h-16 w-16 shrink-0 rounded-xl border border-flow-border object-cover"
                        />
                      ) : (
                        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl border border-dashed border-flow-border text-flow-textSoft">
                          <ImagePlus className="h-5 w-5" />
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          disabled={photoBusy}
                          onClick={() => photoInputRef.current?.click()}
                          className="inline-flex items-center gap-2 rounded-xl border border-flow-border px-3 py-2 text-sm font-semibold text-flow-text transition-colors hover:border-flow-accent disabled:opacity-60"
                        >
                          {photoBusy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                          {photoBusy
                            ? t("sections.photoReading")
                            : photoPreview
                              ? t("sections.photoChange")
                              : t("sections.photoAdd")}
                        </button>
                        {photoPreview && !photoBusy && (
                          <button
                            type="button"
                                                onClick={() => {
                              setPhotoError(null);
                              setForm((prev) => ({ ...prev, photo: "", photoData: "" }));
                            }}
                            className="rounded-xl px-2 py-2 text-sm font-semibold text-flow-textSoft transition-colors hover:text-red-500"
                          >
                            {t("sections.photoRemove")}
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-flow-textSoft">{t("sections.photoHint")}</p>
                    {photoError && <p className="text-xs font-medium text-red-500">{photoError}</p>}
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={onPhotoPick}
                    />
                  </div>

                  <div className="space-y-4 rounded-2xl border border-flow-border bg-flow-surface p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-flow-textSoft">
                      {t("sections.links")}
                    </p>

                    {/* One row to begin with; the button below is how the rest arrive. */}
                    <div className="space-y-2.5">
                      {form.profileLinks.map((link, index) => {
                        /*
                         * The example follows the kind rather than the row's
                         * position, so a row set to GitHub is shown a GitHub URL.
                         */
                        const example = t(`linkPlaceholders.${link.type}`);

                        return (
                        <div key={index} className="flex items-center gap-2">
                          {/* URL and kind stack on a narrow screen rather than squeezing. */}
                          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                            <Input
                              type="url"
                              value={link.url}
                                                    aria-label={t("sections.linkLabel")}
                              placeholder={example}
                              onChange={(e) => setLink(index, { url: e.target.value })}
                              className="h-11 min-w-0 flex-1 rounded-xl border-flow-border bg-flow-surface text-flow-text"
                            />
                            <Select
                              value={link.type}
                              onValueChange={(value) =>
                                setLink(index, { type: value as CvLinkTypeChoice })
                              }
                            >
                              <SelectTrigger
                                aria-label={t("sections.linkType")}
                                className="h-11 shrink-0 rounded-xl border-flow-border bg-flow-surface text-flow-text sm:w-44"
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {CV_LINK_TYPE_CHOICES.map((choice) => (
                                  <SelectItem key={choice} value={choice}>
                                    {t(`linkTypes.${choice}`)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          {form.profileLinks.length > 1 && (
                            <button
                              type="button"
                                                    onClick={() => removeLink(index)}
                              aria-label={t("sections.linkRemove")}
                              className="inline-flex h-11 w-9 shrink-0 items-center justify-center rounded-xl text-flow-textSoft transition-colors hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        );
                      })}
                    </div>

                    {form.profileLinks.length < MAX_CV_LINKS && (
                      <button
                        type="button"
                        onClick={addLink}
                                        className="inline-flex items-center gap-2 rounded-full border border-flow-border px-3.5 py-1.5 text-xs font-semibold text-flow-text transition-colors hover:border-aurora-1/40 hover:text-aurora-1"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        {t("sections.linkAdd")}
                      </button>
                    )}

                    <p className="text-xs leading-relaxed text-flow-textSoft">{t("sections.linksHint")}</p>
                  </div>

                  <div className="space-y-4 rounded-2xl border border-flow-border bg-flow-surface p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-flow-textSoft">
                      {t("sections.languages")}
                    </p>

                    <div className="space-y-2.5">
                      {form.languages.map((row, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {/* Name and level stack on a narrow screen rather than squeezing. */}
                          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                            <Input
                              value={row.name}
                                                    aria-label={t("sections.languageName")}
                              placeholder={t("sections.languagePlaceholder")}
                              onChange={(e) => setLanguage(index, { name: e.target.value })}
                              className="h-11 min-w-0 flex-1 rounded-xl border-flow-border bg-flow-surface text-flow-text"
                            />
                            <Select
                              value={row.level}
                                                    onValueChange={(value) =>
                                setLanguage(index, { level: value as CvLanguageLevel })
                              }
                            >
                              <SelectTrigger
                                aria-label={t("sections.languageLevel")}
                                className="h-11 shrink-0 rounded-xl border-flow-border bg-flow-surface text-flow-text sm:w-44"
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {CV_LANGUAGE_LEVELS.map((level) => (
                                  <SelectItem key={level} value={level}>
                                    {t(`languageLevels.${level}`)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          {form.languages.length > 1 && (
                            <button
                              type="button"
                                                    onClick={() => removeLanguage(index)}
                              aria-label={t("sections.languageRemove")}
                              className="inline-flex h-11 w-9 shrink-0 items-center justify-center rounded-xl text-flow-textSoft transition-colors hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Named and below the rows, exactly as the links section adds one. */}
                    {form.languages.length < MAX_CV_LANGUAGES && (
                      <button
                        type="button"
                        onClick={addLanguage}
                        className="inline-flex items-center gap-2 rounded-full border border-flow-border px-3.5 py-1.5 text-xs font-semibold text-flow-text transition-colors hover:border-aurora-1/40 hover:text-aurora-1"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        {t("sections.languageAdd")}
                      </button>
                    )}

                    <p className="text-xs leading-relaxed text-flow-textSoft">{t("sections.languagesHint")}</p>
                  </div>
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
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-flow-text">
                        {t("fields.tone.label")}
                      </Label>
                      <Select
                        value={form.tone}
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
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-flow-text">
                        {t("fields.effort.label")}
                      </Label>
                      <Select
                        value={form.effort}
                        onValueChange={(value) => set("effort", value as CvEffort)}
                      >
                        <SelectTrigger className="h-11 rounded-xl border-flow-border bg-flow-surface text-flow-text">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CV_EFFORTS.map((level) => (
                            <SelectItem key={level} value={level}>
                              {t(`efforts.${level}`)}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                    /*
                     * A strip rather than a stack: these are pages, and a page is
                     * recognised by its shape long before its title is read — most
                     * of which are the same job title anyway. Scrolls sideways so
                     * a long history costs the form no vertical room.
                     */
                    <ul className="-mx-1 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2">
                      {savedCvs.map((item) => (
                        <li key={item._id} className="shrink-0 snap-start" style={{ width: THUMB_WIDTH }}>
                          <button
                            type="button"
                            onClick={() => openSaved(item._id)}
                            title={item.title}
                            aria-label={`${t("saved.load")} — ${item.title}`}
                            className="focus-ring group block w-full overflow-hidden rounded-lg border border-flow-border bg-white transition-colors hover:border-aurora-1/50"
                            style={{ height: PAGE_HEIGHT * THUMB_SCALE }}
                          >
                            <div
                              style={{
                                width: PAGE_WIDTH,
                                height: PAGE_HEIGHT,
                                transform: `scale(${THUMB_SCALE})`,
                                transformOrigin: "top left",
                              }}
                            >
                              {/* Inert on purpose: the card is the control, not the page. */}
                              <iframe
                                title={item.title}
                                srcDoc={savedHtml.get(item._id) ?? ""}
                                sandbox=""
                                scrolling="no"
                                tabIndex={-1}
                                className="pointer-events-none border-0 bg-white"
                                style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }}
                              />
                            </div>
                          </button>
                          <div className="mt-1.5 flex items-start gap-1">
                            <span
                              className="min-w-0 flex-1 truncate text-[11px] font-medium text-flow-text"
                              title={item.title}
                            >
                              {item.title}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDelete(item._id)}
                              aria-label={t("saved.remove")}
                              title={t("saved.remove")}
                              className="focus-ring -mt-0.5 shrink-0 rounded-full p-1 text-flow-textSoft hover:text-red-500"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
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

              {/* ATS readiness: whether a machine can read this before a person does. */}
              {cv && ats && (
                <div className="rounded-2xl border border-flow-border bg-flow-card p-5 backdrop-blur-md">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-bold text-flow-text">
                        <ScanLine className="h-4 w-4 text-aurora-1" />
                        {t("ats.title")}
                      </h3>
                      <p className="mt-1 text-xs text-flow-textSoft">
                        {t("ats.caption", { passed: ats.passed, total: ats.total })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block text-3xl font-extrabold leading-none text-flow-text tabular-nums">
                        {formatNumber(ats.score, t.locale)}%
                      </span>
                      <span
                        className={`mt-1 block text-[11px] font-bold uppercase tracking-wider ${tierText(ats.tier)}`}
                      >
                        {t(`ats.tiers.${ats.tier}`)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-flow-text/10">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${tierBar(ats.tier)}`}
                      style={{ width: `${ats.score}%` }}
                    />
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-flow-textSoft">
                    {t(`ats.tierHints.${ats.tier}`)}
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {ats.checks.map((check) => {
                      const Icon =
                        check.status === "pass"
                          ? BadgeCheck
                          : check.status === "warn"
                            ? TriangleAlert
                            : XCircle;
                      return (
                        <li key={check.id} className="flex items-start gap-2.5">
                          <Icon
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                              check.status === "pass"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : check.status === "warn"
                                  ? "text-amber-600 dark:text-amber-400"
                                  : "text-red-600 dark:text-red-400"
                            }`}
                          />
                          <div>
                            <p
                              className={`text-xs font-semibold ${
                                check.status === "pass" ? "text-flow-textSoft" : "text-flow-text"
                              }`}
                            >
                              {t(`ats.checks.${check.id}.label`)}
                            </p>
                            {/* A cleared check needs no advice — only the misses earn a line. */}
                            {check.status !== "pass" && (
                              <p className="mt-0.5 text-xs leading-relaxed text-flow-textSoft">
                                {t(`ats.checks.${check.id}.fix`)}
                              </p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <p className="mt-4 border-t border-flow-border pt-3 text-xs leading-relaxed text-flow-textSoft">
                    {t("ats.note")}
                  </p>
                </div>
              )}

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
                          {formatNumber(match.score, t.locale)}%
                        </span>
                        <span
                          className={`mt-1 block text-[11px] font-bold uppercase tracking-wider ${tierText(matchTier)}`}
                        >
                          {t(`match.tiers.${matchTier}`)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-flow-text/10">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${tierBar(matchTier)}`}
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
                  /*
                   * Two different silences. No advert means the candidate has
                   * not asked the question yet; an advert with no grade means we
                   * asked and could not answer, and saying so is better than
                   * printing a score we know to be wrong.
                   */
                  <div className="rounded-2xl border border-dashed border-flow-border bg-flow-surface p-5">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-flow-text">
                      <Target className="h-4 w-4 text-flow-textSoft" />
                      {t(scoredAgainst.trim() ? "match.ungradedTitle" : "match.lockedTitle")}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-flow-textSoft">
                      {t(scoredAgainst.trim() ? "match.ungradedBody" : "match.lockedBody")}
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
