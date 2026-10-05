"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  AlignLeft,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
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
  Upload,
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
import { ButtonLink, EASE, Masthead } from "@/app/components/editorial";
import CvBuilderSections from "./CvBuilderSections";
import { buildCvHtml, printCvDocument } from "@/lib/cv-document";
import { SAMPLE_CV } from "@/lib/cv-sample";
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
import { commonMessages } from "@/lib/i18n/messages/common";
import { LogoSpinner } from "@/components/ui/LogoSpinner";

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

const EMPTY_LANGUAGE: SpokenLanguage = { name: "", level: "fluent" };

/*
 * Links and languages are added one at a time from a single input line and
 * kept as chips, so a long list wraps sideways instead of stretching the form.
 * The stored lists may still hold the one empty placeholder row the server
 * has always received; these helpers drop it whenever a real entry arrives.
 */

/**
 * The kind a new link starts on: the first not already used, so the usual
 * LinkedIn → GitHub → Portfolio run needs no touches of the dropdown at all.
 * Once they are spent, "other" — which names itself after whatever is pasted.
 */
function nextLinkType(links: ProfileLink[]): CvLinkTypeChoice {
  const used = new Set(links.filter((link) => link.url.trim()).map((link) => link.type));
  return CV_LINK_TYPE_CHOICES.find((choice) => !used.has(choice)) ?? "other";
}

function appendLink(links: ProfileLink[], link: ProfileLink): ProfileLink[] {
  return [...links.filter((row) => row.url.trim()), { ...link, url: link.url.trim() }].slice(0, MAX_CV_LINKS);
}

/** The same language twice is one language: adding it again updates its level. */
function appendLanguage(rows: SpokenLanguage[], row: SpokenLanguage): SpokenLanguage[] {
  const name = row.name.trim();
  const others = rows.filter((r) => r.name.trim() && r.name.trim().toLowerCase() !== name.toLowerCase());
  return [...others, { name, level: row.level }].slice(0, MAX_CV_LANGUAGES);
}

/** A link as a chip shows it: no scheme, no "www.", no trailing slash. */
const shortUrl = (url: string) => url.trim().replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "");

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

/** The form, a step at a time: who you are, where to find you, what you did, what you know, what you want. */
const WIZARD_STEPS = ["basics", "profiles", "experience", "education", "target"] as const;
type WizardStep = (typeof WIZARD_STEPS)[number];

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

export default function CvBuilderClient({ initialSignedIn = false }: { initialSignedIn?: boolean }) {
  const t = useT(cvBuilderMessages);
  const tc = useT(commonMessages);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [cv, setCv] = useState<GeneratedCv | null>(null);
  /** The advert the current `cv` was written against — not the live textarea. */
  const [scoredAgainst, setScoredAgainst] = useState("");
  /** The server's cross-language grade of that advert. Null when it could not be graded. */
  const [coverage, setCoverage] = useState<CvCoverage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Seeded from the session cookie on the server; the check below only confirms it.
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(initialSignedIn);
  const [isAuthChecking, setIsAuthChecking] = useState(false);
  const [savedCvs, setSavedCvs] = useState<SavedCvSummary[]>([]);
  const [isReading, setIsReading] = useState(false);
  // "See a sample CV": a finished CV in the real renderer, not a screenshot.
  const [sampleOpen, setSampleOpen] = useState(false);

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
          setLinkDraft({ ...EMPTY_LINK, type: nextLinkType(linkRowsFrom(data.cv.inputData)) });
          setLanguageDraft(EMPTY_LANGUAGE);
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
  const [scale, setScale] = useState(0.5);

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

  const importInputRef = useRef<HTMLInputElement>(null);
  const [importBusy, setImportBusy] = useState(false);
  const [importStatus, setImportStatus] = useState<{ ok: boolean; message: string } | null>(null);

  /**
   * Reads an existing CV (PDF or .docx) on the server and fills the form with
   * what it found. Only fields the CV actually had are written, so anything
   * already typed that the file lacks is left alone.
   */
  const onImportPick = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      // Cleared so picking the same file twice still fires a change event.
      event.target.value = "";
      if (!file) return;

      setImportStatus(null);
      setImportBusy(true);
      trackEvent("tool_action", "cv_builder", "Import CV");
      try {
        const body = new FormData();
        body.append("file", file);
        const response = await fetch("/api/cv/import", { method: "POST", body });
        const data = await response.json().catch(() => null);
        if (!response.ok || !data?.fields) {
          setImportStatus({ ok: false, message: data?.error || t("import.failed") });
          return;
        }

        const fields = data.fields as Record<string, unknown>;
        const text = (key: string) =>
          typeof fields[key] === "string" ? (fields[key] as string).trim() : "";
        const links = (Array.isArray(fields.profileLinks) ? fields.profileLinks : [])
          .filter((row): row is ProfileLink => typeof row?.url === "string" && row.url.trim() !== "")
          .slice(0, MAX_CV_LINKS)
          .map((row) => ({
            url: row.url.trim(),
            label: "",
            type: (CV_LINK_TYPE_CHOICES as readonly string[]).includes(row.type) ? row.type : "other",
          }));
        const languages = (Array.isArray(fields.languages) ? fields.languages : [])
          .filter((row): row is SpokenLanguage => typeof row?.name === "string" && row.name.trim() !== "")
          .slice(0, MAX_CV_LANGUAGES)
          .map((row) => ({
            name: row.name.trim(),
            level: (CV_LANGUAGE_LEVELS as readonly string[]).includes(row.level) ? row.level : "fluent",
          }));

        setForm((prev) => {
          const next = { ...prev };
          for (const key of [
            "fullName",
            "jobTitle",
            "email",
            "phone",
            "location",
            "yearsExperience",
            "workHistory",
            "education",
            "skills",
          ] as const) {
            const value = text(key);
            if (value) next[key] = value;
          }
          if (links.length) next.profileLinks = links;
          if (languages.length) next.languages = languages;
          return next;
        });

        /*
         * The uploaded CV as it stands goes straight into the preview, so the
         * ATS and advert-match panels score the candidate's current document
         * before anything is rewritten. Coverage is the server's grade of a
         * generated CV, so it is cleared rather than left describing another.
         */
        if (data.cv) {
          setCv(data.cv as GeneratedCv);
          setScoredAgainst(form.targetJob);
          setCoverage(null);
          requestAnimationFrame(() =>
            resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
          );
        }
        setImportStatus({ ok: true, message: t("import.success") });
      } catch {
        setImportStatus({ ok: false, message: t("import.failed") });
      } finally {
        setImportBusy(false);
      }
    },
    [t, form.targetJob]
  );

  /*
   * What is being typed into the link and language lines before it is added.
   * Nothing typed is lost by not pressing Add: leaving the step, or
   * generating, adds it.
   */
  const [linkDraft, setLinkDraft] = useState<ProfileLink>(EMPTY_LINK);
  const [languageDraft, setLanguageDraft] = useState<SpokenLanguage>(EMPTY_LANGUAGE);
  const savedLinks = form.profileLinks.filter((link) => link.url.trim());
  const savedLanguages = form.languages.filter((row) => row.name.trim());

  // An emptied list goes back to the single placeholder row the server expects.
  const putLinks = (links: ProfileLink[]) =>
    setForm((prev) => ({ ...prev, profileLinks: links.length ? links : [EMPTY_LINK] }));
  const putLanguages = (rows: SpokenLanguage[]) =>
    setForm((prev) => ({ ...prev, languages: rows.length ? rows : [EMPTY_LANGUAGE] }));

  const addLink = () => {
    if (!linkDraft.url.trim() || savedLinks.length >= MAX_CV_LINKS) return;
    const links = appendLink(form.profileLinks, linkDraft);
    putLinks(links);
    setLinkDraft({ ...EMPTY_LINK, type: nextLinkType(links) });
  };

  const removeLink = (index: number) => putLinks(savedLinks.filter((_, i) => i !== index));

  /** A chip back into the line for editing; whatever was in the line becomes a chip. */
  const editLink = (index: number) => {
    let rest = savedLinks.filter((_, i) => i !== index);
    if (linkDraft.url.trim()) rest = appendLink(rest, linkDraft);
    putLinks(rest);
    setLinkDraft(savedLinks[index]);
    requestAnimationFrame(() => document.getElementById("link-draft")?.focus());
  };

  const addLanguage = () => {
    if (!languageDraft.name.trim()) return;
    if (savedLanguages.length >= MAX_CV_LANGUAGES && !savedLanguages.some(
      (row) => row.name.trim().toLowerCase() === languageDraft.name.trim().toLowerCase()
    )) return;
    putLanguages(appendLanguage(form.languages, languageDraft));
    setLanguageDraft(EMPTY_LANGUAGE);
  };

  const removeLanguage = (index: number) => putLanguages(savedLanguages.filter((_, i) => i !== index));

  const editLanguage = (index: number) => {
    let rest = savedLanguages.filter((_, i) => i !== index);
    if (languageDraft.name.trim()) rest = appendLanguage(rest, languageDraft);
    putLanguages(rest);
    setLanguageDraft(savedLanguages[index]);
    requestAnimationFrame(() => document.getElementById("language-draft")?.focus());
  };

  /** The form with anything still in the two lines added, and the lines cleared. */
  const commitDrafts = (): FormState => {
    if (!linkDraft.url.trim() && !languageDraft.name.trim()) return form;
    const next = {
      ...form,
      profileLinks: linkDraft.url.trim() ? appendLink(form.profileLinks, linkDraft) : form.profileLinks,
      languages: languageDraft.name.trim() ? appendLanguage(form.languages, languageDraft) : form.languages,
    };
    setForm(next);
    setLinkDraft({ ...EMPTY_LINK, type: nextLinkType(next.profileLinks) });
    setLanguageDraft(EMPTY_LANGUAGE);
    return next;
  };

  /** Enter in one of the two lines adds, rather than moving to the next step. */
  const addOnEnter = (add: () => void) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    event.stopPropagation();
    add();
  };

  /*
   * The preview page is laid out at a fixed A4 width and scaled down, so the
   * preview and the printed PDF share one layout rather than two breakpoints.
   * Beside the form, the page is fitted whole into the space the form's height
   * leaves it; stacked, it simply takes the column's width.
   */
  const previewStageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stage = previewStageRef.current;
    if (!stage) return;
    const measure = () => {
      const byWidth = stage.clientWidth / PAGE_WIDTH;
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      setScale(wide ? Math.min(byWidth, stage.clientHeight / PAGE_HEIGHT) : byWidth);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

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

  const hasLink = form.profileLinks.some((link) => link.url.trim());

  /**
   * Signed out, and we know it — the auth check has come back. Drives an
   * explanatory notice and nothing else: the builder itself is open to
   * everyone, and a guest's CV is saved just like anyone else's.
   */
  const isGuest = !isAuthenticated && !isAuthChecking;

  /*
   * What a CV cannot go without. Nothing is said about a missing field: once
   * the candidate has tried to generate, the fields still wanting something are
   * outlined in red, and each loses the outline the moment it is filled.
   */
  const missing = {
    fullName: !form.fullName.trim(),
    jobTitle: !form.jobTitle.trim(),
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
    // Any one of the three is enough to write from.
    background: !form.workHistory.trim() && !form.education.trim() && !form.skills.trim(),
  };
  const basicsMissing = missing.fullName || missing.jobTitle || missing.email;
  const [flagMissing, setFlagMissing] = useState(false);
  /** The field to put the cursor in once the step it lives on has slid in. */
  const focusAfterMove = useRef<string | null>(null);
  const firstMissingBasic = () =>
    (["fullName", "jobTitle", "email"] as const).find((key) => missing[key]) ?? "fullName";

  /*
   * The form is a sequence of steps, one on screen at a time, sliding in the
   * direction of travel. Steps can be visited in any order, from the rail or
   * with Back and Next; nothing is required until the CV is generated.
   */
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const wizardRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const movedByUser = useRef(false);
  const still = useReducedMotion() ?? false;

  const stepDone = [
    Boolean(form.fullName.trim() && form.jobTitle.trim() && form.email.trim()),
    hasLink || form.languages.some((row) => row.name.trim()),
    Boolean(form.workHistory.trim()),
    Boolean(form.education.trim() || form.skills.trim()),
    Boolean(form.targetJob.trim()),
  ];
  const lastStep = WIZARD_STEPS.length - 1;

  const moveTo = (index: number) => {
    if (WIZARD_STEPS[current] === "profiles") commitDrafts();
    setError(null);
    setDirection(index > current ? 1 : -1);
    movedByUser.current = true;
    setCurrent(index);
  };

  /** Steps are never gated: what is missing is only pointed out when generating. */
  const goTo = (index: number) => {
    if (index === current || index < 0 || index > lastStep) return;
    moveTo(index);
  };

  // A step change the candidate asked for moves focus to the new step's
  // heading (or the field it was sent back for), and brings the panel back on
  // screen if they had scrolled past it.
  useEffect(() => {
    if (!movedByUser.current) return;
    movedByUser.current = false;
    const panel = wizardRef.current;
    if (panel && panel.getBoundingClientRect().top < 0) {
      panel.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "start" });
    }
    // After the outgoing step has left, so the new one exists to take focus.
    const timer = window.setTimeout(() => {
      const target = focusAfterMove.current ? document.getElementById(focusAfterMove.current) : null;
      focusAfterMove.current = null;
      (target ?? stepHeadingRef.current)?.focus({ preventScroll: true });
    }, still ? 0 : 240);
    return () => window.clearTimeout(timer);
  }, [current, still]);

  /** Enter in a one-line field moves on, as it would submit a short form. */
  const onStepKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (event.key !== "Enter" || target.tagName !== "INPUT" || current === lastStep) return;
    if ((target as HTMLInputElement).type === "file") return;
    event.preventDefault();
    goTo(current + 1);
  };

  /*
   * Beside the preview (lg and up) the panel is at least most of a screen tall
   * and the step stretches to fill it, its text areas taking up the slack.
   * Stacked, the panel's height follows the step on screen, so the footer
   * glides rather than jumping when a short step replaces a long one.
   */
  const [isWide, setIsWide] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const stepBodyRef = useRef<HTMLDivElement>(null);
  const [stepHeight, setStepHeight] = useState<number | "auto">("auto");
  useEffect(() => {
    const body = stepBodyRef.current;
    if (!body) return;
    const observer = new ResizeObserver(() => setStepHeight(body.offsetHeight));
    observer.observe(body);
    return () => observer.disconnect();
  }, []);

  const handleGenerate = async () => {
    const payload = commitDrafts();
    // Sent back to the first step still wanting something, its fields outlined.
    const sendBack = basicsMissing
      ? { step: 0, field: firstMissingBasic() }
      : missing.background
        ? { step: WIZARD_STEPS.indexOf("experience"), field: "workHistory" }
        : null;
    if (sendBack) {
      setFlagMissing(true);
      if (sendBack.step === current) document.getElementById(sendBack.field)?.focus();
      else {
        focusAfterMove.current = sendBack.field;
        moveTo(sendBack.step);
      }
      return;
    }

    setError(null);
    setIsLoading(true);
    trackEvent("tool_action", "cv_builder", cv ? "Regenerate CV" : "Generate CV");

    try {
      const response = await fetch("/api/cv/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    setFlagMissing(false);
    setLinkDraft(EMPTY_LINK);
    setLanguageDraft(EMPTY_LANGUAGE);
    setDirection(-1);
    setCurrent(0);
  };

  /** A field still wanting something, once the candidate has tried to generate. */
  const isFlagged = (key: string) =>
    flagMissing &&
    (key === "fullName" || key === "jobTitle" || key === "email"
      ? missing[key]
      : (key === "workHistory" || key === "education" || key === "skills") && missing.background);
  const flaggedClass = "border-red-500 ring-1 ring-red-500/30 focus-visible:ring-red-500";

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
    <div className="space-y-1">
      <Label htmlFor={key} className="text-[12.5px] font-semibold text-cs-ink">
        {t(`fields.${key}.label`)}
      </Label>
      <Input
        id={key}
        type={type}
        value={form[key]}
        placeholder={t(`fields.${key}.placeholder`)}
        onChange={(e) => set(key, e.target.value)}
        aria-invalid={isFlagged(key) || undefined}
        className={`h-10 rounded-[10px] border-cs-ink/15 bg-cs-surface text-[14.5px] text-cs-ink focus-visible:ring-2 focus-visible:ring-cs-blue focus-visible:ring-offset-0 ${isFlagged(key) ? flaggedClass : ""}`}
      />
    </div>
  );

  /** A text area. Beside the preview it grows into whatever height the step has spare. */
  const textarea = (
    key: "workHistory" | "education" | "skills" | "targetJob",
    rows: number,
    hint?: boolean
  ) => (
    <div className="flex flex-col gap-1 lg:flex-1">
      <Label htmlFor={key} className="text-[12.5px] font-semibold text-cs-ink">
        {t(`fields.${key}.label`)}
      </Label>
      <Textarea
        id={key}
        rows={rows}
        value={form[key]}
        placeholder={t(`fields.${key}.placeholder`)}
        onChange={(e) => set(key, e.target.value)}
        aria-invalid={isFlagged(key) || undefined}
        className={`resize-y rounded-[10px] border-cs-ink/15 bg-cs-surface text-[14.5px] text-cs-ink focus-visible:ring-2 focus-visible:ring-cs-blue focus-visible:ring-offset-0 lg:flex-1 lg:resize-none ${isFlagged(key) ? flaggedClass : ""}`}
      />
      {hint && <p className="text-xs leading-relaxed text-cs-ink2">{t(`fields.${key}.hint`)}</p>}
    </div>
  );

  /** Each step's heading and the line under it. */
  const stepCopy: Record<WizardStep, { title: string; hint: string }> = {
    basics: { title: t("sections.basics"), hint: t("sections.basicsHint") },
    profiles: { title: t("wizard.profiles"), hint: t("wizard.profilesHint") },
    experience: { title: t("wizard.experience"), hint: t("wizard.experienceHint") },
    education: { title: t("wizard.education"), hint: t("wizard.educationHint") },
    target: { title: t("sections.tailoring"), hint: t("sections.tailoringHint") },
  };
  const stepKey = WIZARD_STEPS[current];
  const nextKey = WIZARD_STEPS[current + 1];

  const slide = {
    enter: (dir: number) => (still ? { opacity: 0 } : { opacity: 0, x: dir * 56 }),
    center: { opacity: 1, x: 0, transition: { duration: still ? 0.15 : 0.42, ease: EASE } },
    exit: (dir: number) =>
      still
        ? { opacity: 0, transition: { duration: 0.1 } }
        : { opacity: 0, x: dir * -56, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const } },
  };

  const generateButton = (
    <Button
      onClick={handleGenerate}
      disabled={isLoading}
      className="h-12 rounded-[10px] bg-cs-blue px-6 text-[15px] font-semibold text-cs-onBlue hover:bg-cs-blueHover"
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
    <div className="min-h-screen bg-cs-bg">
      {/* MASTHEAD ---------------------------------------------------- */}
      <Masthead
        crumbs={[{ label: tc("breadcrumb.cvBuilder") }]}
        index="01"
        label={t("hero.badge")}
        title={t("hero.title")}
        accent={t("hero.titleHighlight")}
        actions={
          <>
            <ButtonLink href="#builder">{t("hero.ctaPrimary")}</ButtonLink>
            <button
              type="button"
              onClick={() => {
                trackEvent("tool_action", "cv_builder", "View sample CV");
                setSampleOpen(true);
              }}
              className="cs-focus group/tl inline-flex items-center gap-1.5 rounded-sm text-[15px] font-semibold tracking-[-0.01em] text-cs-ink transition-colors duration-200 hover:text-cs-blue"
            >
              <span className="cs-underline pb-0.5">{t("hero.ctaSecondary")}</span>
              <Eye aria-hidden className="h-4 w-4" />
            </button>
          </>
        }
        side={
          <div>
            {/* The claims the rest of the page has to earn. */}
            <ul className="border-t border-cs-ink/10">
              {t.list("hero.trust").map((claim, index) => {
                const Icon = TRUST_ICONS[index] ?? BadgeCheck;
                return (
                  <li key={claim} className="flex items-center gap-3 border-b border-cs-ink/10 py-2.5 text-[14.5px] font-medium text-cs-ink">
                    <Icon aria-hidden className="h-4 w-4 shrink-0 text-cs-blue" />
                    {claim}
                  </li>
                );
              })}
            </ul>
          </div>
        }
        titleSize="clamp(2.5rem, 5vw, 4.5rem)"
        compact
      />

      {/* BUILDER --------------------------------------------------------- */}
      <section id="builder" aria-label={tc("breadcrumb.cvBuilder")} className="cs-container scroll-mt-20 pb-20 pt-2 md:pb-28 md:pt-4">
        <div className="space-y-6">
          {/* Before the form: signing in, and starting from a CV you already have. */}
          <div className="grid gap-4 lg:grid-cols-2">
          {isGuest && (
            <div className="rounded-xl bg-cs-surface ring-1 ring-inset ring-cs-ink/10 p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cs-blue/10">
                  <Info className="h-4 w-4 text-cs-blue" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-cs-ink">{t("guestNotice.title")}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-cs-ink2">
                    {t("guestNotice.subtitle")}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Link href="/login?from=/cv-builder">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 rounded-[10px] border-cs-ink/15 bg-transparent px-3.5 text-[13px] font-semibold text-cs-ink hover:bg-cs-ink/[0.04]"
                      >
                        {t("guestNotice.login")}
                      </Button>
                    </Link>
                    <Link href="/register?from=/cv-builder">
                      <Button
                        size="sm"
                        className="h-9 rounded-[10px] bg-cs-blue px-3.5 text-[13px] font-semibold text-cs-onBlue hover:bg-cs-blueHover"
                      >
                        {t("guestNotice.register")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
            {/* Import an existing CV — fills the form so the candidate only edits. */}
            <div className={`rounded-xl bg-cs-blue/[0.05] p-5 ring-1 ring-inset ring-cs-blue/25 ${isGuest ? "" : "lg:col-span-2"}`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cs-blue text-cs-onBlue">
                    <Upload className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-sm font-bold text-cs-ink">{t("import.title")}</h2>
                    <p className="mt-1 text-xs leading-relaxed text-cs-ink2">{t("import.subtitle")}</p>
                  </div>
                </div>
                <input
                  ref={importInputRef}
                  type="file"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={onImportPick}
                />
                <Button
                  type="button"
                  size="sm"
                  disabled={importBusy}
                  onClick={() => importInputRef.current?.click()}
                  className="h-10 shrink-0 rounded-[10px] bg-cs-blue px-4 text-[13px] font-semibold text-cs-onBlue hover:bg-cs-blueHover"
                >
                  {importBusy ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  {importBusy ? t("import.reading") : t("import.button")}
                </Button>
              </div>
              {importStatus && (
                <p
                  role="status"
                  className={`mt-3 flex items-start gap-1.5 text-xs leading-relaxed ${
                    importStatus.ok
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {importStatus.ok ? (
                    <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  )}
                  {importStatus.message}
                </p>
              )}
            </div>
          </div>

          {/*
           * The form and the page it writes, side by side and the same height.
           * Neither scrolls on its own: the row is as tall as the longer of the
           * two, the form panel stretches to it, and the preview's frame does
           * too, its page keeping in view while the form is read.
           */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            {/* FORM ----------------------------------------------------- */}
            <div className="flex flex-col lg:col-span-7">
              <div className="flex flex-1 flex-col gap-4">
                {/* THE STEPS ---------------------------------------------- */}
                <div
                  ref={wizardRef}
                  className="scroll-mt-24 overflow-hidden rounded-2xl bg-cs-surface lg:flex lg:min-h-[clamp(36rem,calc(100svh-9rem),44rem)] lg:flex-1 lg:flex-col shadow-[0_1px_0_rgb(var(--cs-ink)/0.04),0_24px_48px_-32px_rgb(var(--cs-ink)/0.35)] ring-1 ring-inset ring-cs-ink/10"
                >
                  {/* The rail: every step, where you are, and what is filled in. */}
                  <nav aria-label={t("wizard.label")} className="shrink-0 border-b border-cs-ink/10 px-2 pt-3 sm:px-4">
                    <ol className="grid grid-cols-5">
                      {WIZARD_STEPS.map((key, index) => {
                        const active = index === current;
                        const done = stepDone[index];
                        const name = t(`wizard.short.${key}`);
                        return (
                          <li key={key} className="min-w-0">
                            <button
                              type="button"
                              onClick={() => goTo(index)}
                              aria-current={active ? "step" : undefined}
                              aria-label={`${t("wizard.jump", { n: index + 1, step: name })}${done ? ` — ${t("wizard.filled")}` : ""}`}
                              className="cs-focus group relative flex w-full flex-col items-center gap-2 rounded-md px-1 pb-3.5 pt-1 sm:flex-row sm:gap-2.5 sm:px-2.5"
                            >
                              <span
                                aria-hidden
                                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12px] font-semibold tabular-nums transition-colors duration-300 ${
                                  active
                                    ? "bg-cs-blue text-cs-onBlue"
                                    : done
                                      ? "bg-cs-cyan/15 text-cs-ink"
                                      : "text-cs-ink3 ring-1 ring-inset ring-cs-ink/15 group-hover:text-cs-ink group-hover:ring-cs-ink/30"
                                }`}
                              >
                                {done && !active ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : index + 1}
                              </span>
                              <span
                                aria-hidden
                                className={`hidden min-w-0 truncate text-[13px] font-medium tracking-[-0.01em] transition-colors sm:block ${
                                  active ? "text-cs-ink" : "text-cs-ink3 group-hover:text-cs-ink"
                                }`}
                              >
                                {name}
                              </span>
                              {active && (
                                <motion.span
                                  aria-hidden
                                  layoutId="cv-step-rule"
                                  transition={{ duration: still ? 0 : 0.42, ease: EASE }}
                                  className="absolute inset-x-1 -bottom-px h-[2px] rounded-full bg-cs-blue"
                                />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </nav>

                  {/* The step on screen, sliding in the direction of travel. */}
                  <motion.div
                    animate={{ height: isWide ? "auto" : stepHeight }}
                    transition={{ duration: still || isWide ? 0 : 0.38, ease: EASE }}
                    className="relative overflow-hidden lg:flex lg:flex-1 lg:flex-col"
                  >
                    <div ref={stepBodyRef} onKeyDown={onStepKeyDown} className="px-5 py-5 sm:px-7 lg:flex lg:flex-1 lg:flex-col">
                      <AnimatePresence mode="wait" initial={false} custom={direction}>
                        <motion.section
                          key={stepKey}
                          custom={direction}
                          variants={slide}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          aria-labelledby="cv-step-title"
                          className="lg:flex lg:flex-1 lg:flex-col"
                        >
                          <header className="mb-4">
                            <h3
                              id="cv-step-title"
                              ref={stepHeadingRef}
                              tabIndex={-1}
                              className="text-[1.375rem] font-medium leading-tight tracking-[-0.03em] text-cs-ink outline-none sm:text-[1.5rem]"
                            >
                              {stepCopy[stepKey].title}
                            </h3>
                            <p className="mt-1 max-w-xl text-[13.5px] leading-relaxed text-cs-ink2">{stepCopy[stepKey].hint}</p>
                          </header>

                          <div className="flex flex-col gap-4 lg:flex-1">
                {stepKey === "basics" && (
                  <>
                    <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
                      {field("fullName")}
                      {field("jobTitle")}
                      {field("email", "email")}
                      {field("phone", "tel")}
                      {field("location")}
                      {field("yearsExperience")}
                    </div>
                    <div className="space-y-2 rounded-xl bg-cs-bg/60 p-3 ring-1 ring-inset ring-cs-ink/10 lg:flex lg:flex-1 lg:flex-col lg:justify-center">
                      <div className="flex items-center gap-3 lg:gap-4">
                        {photoPreview ? (
                          // eslint-disable-next-line @next/next/no-img-element -- an image host URL, not a bundled asset
                          <img
                            src={photoPreview}
                            alt=""
                            className="h-12 w-12 shrink-0 rounded-lg border border-cs-ink/10 object-cover"
                          />
                        ) : (
                          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-dashed border-cs-ink/15 text-cs-ink3">
                            <ImagePlus className="h-4 w-4" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-semibold text-cs-ink">{t("sections.photo")}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          {photoPreview && !photoBusy && (
                            <button
                              type="button"
                              onClick={() => {
                                setPhotoError(null);
                                setForm((prev) => ({ ...prev, photo: "", photoData: "" }));
                              }}
                              className="rounded-lg px-2 py-1.5 text-[13px] font-semibold text-cs-ink2 transition-colors hover:text-red-500"
                            >
                              {t("sections.photoRemove")}
                            </button>
                          )}
                          <button
                            type="button"
                            disabled={photoBusy}
                            onClick={() => photoInputRef.current?.click()}
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold text-cs-ink ring-1 ring-inset ring-cs-ink/15 transition-colors hover:text-cs-blue hover:ring-cs-blue/40 disabled:opacity-60"
                          >
                            {photoBusy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                            {photoBusy
                              ? t("sections.photoReading")
                              : photoPreview
                                ? t("sections.photoChange")
                                : t("sections.photoAdd")}
                          </button>
                        </div>
                      </div>
                      {photoError && <p className="text-xs font-medium text-red-500">{photoError}</p>}
                      <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={onPhotoPick}
                      />
                    </div>
                  </>
                )}

                {stepKey === "profiles" && (
                  <>
                    {/*
                     * One line to type into, and what has been added kept as
                     * chips beneath it: a long list wraps sideways rather than
                     * stretching the form. A chip clicked goes back into the
                     * line to be edited.
                     */}
                    <div className="space-y-2.5">
                      <p className="cs-meta text-cs-ink3">{t("sections.links")}</p>

                      {savedLinks.length < MAX_CV_LINKS && (
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Input
                          id="link-draft"
                          type="url"
                          value={linkDraft.url}
                          aria-label={t("sections.linkLabel")}
                          placeholder={t(`linkPlaceholders.${linkDraft.type}`)}
                          onChange={(e) => setLinkDraft((draft) => ({ ...draft, url: e.target.value }))}
                          onKeyDown={addOnEnter(addLink)}
                          className="h-10 rounded-[10px] border-cs-ink/15 bg-cs-surface text-[14.5px] text-cs-ink focus-visible:ring-2 focus-visible:ring-cs-blue focus-visible:ring-offset-0 min-w-0 flex-1"
                        />
                        <div className="flex gap-2">
                          <Select
                            value={linkDraft.type}
                            onValueChange={(value) => setLinkDraft((draft) => ({ ...draft, type: value as CvLinkTypeChoice }))}
                          >
                            <SelectTrigger
                              aria-label={t("sections.linkType")}
                              className="h-10 rounded-[10px] border-cs-ink/15 bg-cs-surface text-[14.5px] text-cs-ink focus-visible:ring-2 focus-visible:ring-cs-blue focus-visible:ring-offset-0 min-w-0 flex-1 sm:w-36 sm:flex-none"
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
                          <button
                          type="button"
                          onClick={addLink}
                          disabled={!linkDraft.url.trim()}
                          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-[10px] bg-cs-ink px-3.5 text-[13px] font-semibold text-cs-bg transition-colors hover:bg-cs-blue hover:text-cs-onBlue disabled:pointer-events-none disabled:opacity-35"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          {t("wizard.add")}
                        </button>
                        </div>
                      </div>
                      )}

                      {savedLinks.length > 0 && (
                        <ul className="flex flex-wrap gap-1.5">
                          {savedLinks.map((link, index) => (
                            <li key={`${link.url}-${index}`} className="inline-flex max-w-full items-center rounded-full bg-cs-bg text-[12.5px] text-cs-ink ring-1 ring-inset ring-cs-ink/15">
                              <button
                                type="button"
                                onClick={() => editLink(index)}
                                title={shortUrl(link.url)}
                                className="cs-focus flex min-w-0 items-center gap-1.5 rounded-full py-1 pl-3 pr-1 transition-colors hover:text-cs-blue"
                              >
                                <span className="max-w-[10rem] truncate font-semibold">
                                  {link.label || (link.type === "other" ? shortUrl(link.url).split("/")[0] : t(`linkTypes.${link.type}`))}
                                </span>
                              </button>
                              <button
                                type="button"
                                onClick={() => removeLink(index)}
                                aria-label={`${t("sections.linkRemove")}: ${shortUrl(link.url)}`}
                                className="mr-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-cs-ink3 transition-colors hover:bg-red-500/10 hover:text-red-500"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="space-y-2.5 border-t border-cs-ink/10 pt-3.5">
                      <p className="cs-meta text-cs-ink3">{t("sections.languages")}</p>

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Input
                          id="language-draft"
                          value={languageDraft.name}
                          aria-label={t("sections.languageName")}
                          placeholder={t("sections.languagePlaceholder")}
                          onChange={(e) => setLanguageDraft((draft) => ({ ...draft, name: e.target.value }))}
                          onKeyDown={addOnEnter(addLanguage)}
                          className="h-10 rounded-[10px] border-cs-ink/15 bg-cs-surface text-[14.5px] text-cs-ink focus-visible:ring-2 focus-visible:ring-cs-blue focus-visible:ring-offset-0 min-w-0 flex-1"
                        />
                        <div className="flex gap-2">
                          <Select
                            value={languageDraft.level}
                            onValueChange={(value) => setLanguageDraft((draft) => ({ ...draft, level: value as CvLanguageLevel }))}
                          >
                            <SelectTrigger
                              aria-label={t("sections.languageLevel")}
                              className="h-10 rounded-[10px] border-cs-ink/15 bg-cs-surface text-[14.5px] text-cs-ink focus-visible:ring-2 focus-visible:ring-cs-blue focus-visible:ring-offset-0 min-w-0 flex-1 sm:w-36 sm:flex-none"
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
                          <button
                          type="button"
                          onClick={addLanguage}
                          disabled={!languageDraft.name.trim()}
                          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-[10px] bg-cs-ink px-3.5 text-[13px] font-semibold text-cs-bg transition-colors hover:bg-cs-blue hover:text-cs-onBlue disabled:pointer-events-none disabled:opacity-35"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          {t("wizard.add")}
                        </button>
                        </div>
                      </div>

                      {savedLanguages.length > 0 && (
                        <ul className="flex flex-wrap gap-1.5">
                          {savedLanguages.map((row, index) => (
                            <li key={`${row.name}-${index}`} className="inline-flex max-w-full items-center rounded-full bg-cs-bg text-[12.5px] text-cs-ink ring-1 ring-inset ring-cs-ink/15">
                              <button type="button" onClick={() => editLanguage(index)} className="cs-focus flex min-w-0 items-center gap-1.5 rounded-full py-1 pl-3 pr-1 transition-colors hover:text-cs-blue">
                                <span className="truncate font-semibold">{row.name}</span>
                                <span className="shrink-0 text-cs-ink3">{t(`languageLevels.${row.level}`)}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => removeLanguage(index)}
                                aria-label={`${t("sections.languageRemove")}: ${row.name}`}
                                className="mr-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-cs-ink3 transition-colors hover:bg-red-500/10 hover:text-red-500"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                )}

                {stepKey === "experience" && textarea("workHistory", 9, true)}

                {stepKey === "education" && (
                  <>
                    {textarea("education", 4)}
                    {textarea("skills", 4)}
                  </>
                )}

                {stepKey === "target" && (
                  <>
                    {textarea("targetJob", 3, true)}
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-1.5">
                        <Label className="text-[13px] font-semibold text-cs-ink">
                          {t("fields.tone.label")}
                        </Label>
                        <Select
                          value={form.tone}
                                          onValueChange={(value) => set("tone", value as CvTone)}
                        >
                          <SelectTrigger className="h-10 rounded-[10px] border-cs-ink/15 bg-cs-surface text-[14.5px] text-cs-ink focus-visible:ring-2 focus-visible:ring-cs-blue focus-visible:ring-offset-0">
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
                        <Label className="text-[13px] font-semibold text-cs-ink">
                          {t("fields.language.label")}
                        </Label>
                        <Select
                          value={form.language}
                                          onValueChange={(value) => set("language", value)}
                        >
                          <SelectTrigger className="h-10 rounded-[10px] border-cs-ink/15 bg-cs-surface text-[14.5px] text-cs-ink focus-visible:ring-2 focus-visible:ring-cs-blue focus-visible:ring-offset-0">
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
                        <Label className="text-[13px] font-semibold text-cs-ink">
                          {t("fields.effort.label")}
                        </Label>
                        <Select
                          value={form.effort}
                          onValueChange={(value) => set("effort", value as CvEffort)}
                        >
                          <SelectTrigger className="h-10 rounded-[10px] border-cs-ink/15 bg-cs-surface text-[14.5px] text-cs-ink focus-visible:ring-2 focus-visible:ring-cs-blue focus-visible:ring-offset-0">
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
                          </div>
                        </motion.section>
                      </AnimatePresence>

                      {error && (
                        <div
                          role="alert"
                          className="mt-6 flex items-start gap-2 rounded-[10px] bg-red-500/[0.08] p-4 text-sm text-red-600 ring-1 ring-inset ring-red-500/20 dark:text-red-400"
                        >
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Start again and back on the left; on — or, on the last step, the reason for all of it — on the right. */}
                  <div className="mt-auto flex shrink-0 items-center justify-between gap-3 border-t border-cs-ink/10 bg-cs-bg/40 px-5 py-3 sm:px-7">
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleReset}
                        disabled={isLoading}
                        title={t("actions.startOver")}
                        className="h-12 rounded-[10px] px-3 text-[14px] font-semibold text-cs-ink3 hover:bg-red-500/[0.06] hover:text-red-500"
                      >
                        <RefreshCw className="h-4 w-4 sm:mr-2" />
                        <span className="sr-only sm:not-sr-only">{t("actions.startOver")}</span>
                      </Button>
                      {current > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => goTo(current - 1)}
                          className="h-12 rounded-[10px] px-3 text-[15px] font-semibold text-cs-ink2 hover:bg-cs-ink/[0.04] hover:text-cs-ink"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          {t("wizard.back")}
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Once there is a CV, an edit on any step can be rewritten without walking to the end. */}
                      {cv && current !== lastStep && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handleGenerate}
                          disabled={isLoading}
                          className="hidden h-12 rounded-[10px] px-3 text-[15px] font-semibold text-cs-ink2 hover:bg-cs-ink/[0.04] hover:text-cs-ink sm:inline-flex"
                        >
                          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                          {t("actions.regenerate")}
                        </Button>
                      )}
                      {nextKey ? (
                        <Button
                          type="button"
                          onClick={() => goTo(current + 1)}
                          className="group h-12 rounded-[10px] bg-cs-ink px-5 text-[15px] font-semibold text-cs-bg hover:bg-cs-blue hover:text-cs-onBlue"
                        >
                          <span className="sm:hidden">{t("wizard.next")}</span>
                          <span className="hidden sm:inline">{t("wizard.nextTo", { step: t(`wizard.short.${nextKey}`) })}</span>
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Button>
                      ) : (
                        generateButton
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* PREVIEW -------------------------------------------------- */}
            <div
              ref={resultRef}
              className="scroll-mt-24 rounded-2xl bg-cs-ink/[0.035] p-4 ring-1 ring-inset ring-cs-ink/10 sm:p-5 lg:col-span-5 lg:flex lg:flex-col"
            >
              <div className="flex flex-col gap-4 lg:flex-1">
              {cv && (
                  <div className="flex items-center justify-end gap-2">
                    {/* The inline preview is a scaled-down page; this opens it
                        at a size you can actually read. */}
                    <Button
                      onClick={() => setIsReading(true)}
                      size="sm"
                      variant="outline"
                      className="rounded-[10px] border-cs-ink/15 bg-transparent font-semibold text-cs-ink hover:bg-cs-ink/[0.04]"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {t("actions.view")}
                    </Button>
                    <Button
                      onClick={handleDownload}
                      size="sm"
                      className="rounded-[10px] bg-cs-blue font-semibold text-cs-onBlue hover:bg-cs-blueHover"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {t("actions.download")}
                    </Button>
                  </div>
                )}

              {/* The stage takes no height of its own beside the form: the page is sized to fit it. */}
              <div ref={previewStageRef} className="relative w-full lg:min-h-0 lg:flex-1">
              <div
                ref={previewBoxRef}
                className="mx-auto overflow-hidden rounded-xl bg-cs-surface shadow-[0_1px_0_rgb(var(--cs-ink)/0.04),0_30px_60px_-30px_rgb(var(--cs-ink)/0.3)] ring-1 ring-cs-ink/10 lg:absolute lg:inset-x-0 lg:top-0"
                style={{ width: PAGE_WIDTH * scale, height: PAGE_HEIGHT * scale, maxWidth: "100%" }}
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
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                    <LogoSpinner size={48} label="" />
                    <p className="text-sm text-cs-ink2">{t("preview.loading")}</p>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cs-blue/10">
                      <FileText className="h-7 w-7 text-cs-blue" />
                    </div>
                    <div className="max-w-xs space-y-1.5">
                      <h3 className="text-lg font-medium tracking-[-0.025em] text-cs-ink">
                        {t("preview.placeholderTitle")}
                      </h3>
                      <p className="text-xs leading-relaxed text-cs-ink2">
                        {t("preview.placeholderSubtitle")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              </div>

              {cv && (
                <p className="text-xs leading-relaxed text-cs-ink2">
                  {t("preview.downloadHint")}
                </p>
              )}
              </div>
            </div>
          </div>

          {/* How the finished CV scores: readable by a machine, and aimed at the advert. */}
          {cv && (
            <div className="grid items-start gap-4 lg:grid-cols-2">
              {/* ATS readiness: whether a machine can read this before a person does. */}
              {cv && ats && (
                <div className="rounded-xl bg-cs-surface p-5 ring-1 ring-inset ring-cs-ink/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-bold text-cs-ink">
                        <ScanLine className="h-4 w-4 text-cs-blue" />
                        {t("ats.title")}
                      </h3>
                      <p className="mt-1 text-xs text-cs-ink2">
                        {t("ats.caption", { passed: ats.passed, total: ats.total })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block text-[2rem] font-medium leading-none tracking-[-0.04em] text-cs-ink tabular-nums">
                        {formatNumber(ats.score, t.locale)}%
                      </span>
                      <span
                        className={`mt-1 block text-[11px] font-bold uppercase tracking-wider ${tierText(ats.tier)}`}
                      >
                        {t(`ats.tiers.${ats.tier}`)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-cs-ink/10">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${tierBar(ats.tier)}`}
                      style={{ width: `${ats.score}%` }}
                    />
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-cs-ink2">
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
                                check.status === "pass" ? "text-cs-ink2" : "text-cs-ink"
                              }`}
                            >
                              {t(`ats.checks.${check.id}.label`)}
                            </p>
                            {/* A cleared check needs no advice — only the misses earn a line. */}
                            {check.status !== "pass" && (
                              <p className="mt-0.5 text-xs leading-relaxed text-cs-ink2">
                                {t(`ats.checks.${check.id}.fix`)}
                              </p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <p className="mt-4 border-t border-cs-ink/10 pt-3 text-xs leading-relaxed text-cs-ink2">
                    {t("ats.note")}
                  </p>
                </div>
              )}

              {/* Advert match: the check nobody else runs for you. */}
              {cv &&
                (match && matchTier ? (
                  <div className="rounded-xl bg-cs-surface p-5 ring-1 ring-inset ring-cs-ink/10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="flex items-center gap-2 text-sm font-bold text-cs-ink">
                          <Target className="h-4 w-4 text-cs-blue" />
                          {t("match.title")}
                        </h3>
                        <p className="mt-1 text-xs text-cs-ink2">
                          {t("match.caption", { matched: match.matched.length, total: match.total })}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="block text-[2rem] font-medium leading-none tracking-[-0.04em] text-cs-ink tabular-nums">
                          {formatNumber(match.score, t.locale)}%
                        </span>
                        <span
                          className={`mt-1 block text-[11px] font-bold uppercase tracking-wider ${tierText(matchTier)}`}
                        >
                          {t(`match.tiers.${matchTier}`)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-cs-ink/10">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${tierBar(matchTier)}`}
                        style={{ width: `${match.score}%` }}
                      />
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-cs-ink2">
                      {t(`match.tierHints.${matchTier}`)}
                    </p>

                    {match.missing.length > 0 && (
                      <div className="mt-4">
                        <p className="cs-meta text-cs-ink3">
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
                        <p className="cs-meta text-cs-ink3">
                          {t("match.matchedLabel")}
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {match.matched.slice(0, 10).map((term) => (
                            <li
                              key={term}
                              className="rounded-full border border-cs-ink/10 bg-cs-surface px-2.5 py-1 text-xs font-medium text-cs-ink2"
                            >
                              {term}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p className="mt-4 border-t border-cs-ink/10 pt-3 text-xs leading-relaxed text-cs-ink2">
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
                  <div className="rounded-xl p-5 ring-1 ring-inset ring-cs-ink/15 [background:repeating-linear-gradient(135deg,transparent,transparent_8px,rgb(var(--cs-ink)/0.02)_8px,rgb(var(--cs-ink)/0.02)_16px)]">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-cs-ink">
                      <Target className="h-4 w-4 text-cs-ink2" />
                      {t(scoredAgainst.trim() ? "match.ungradedTitle" : "match.lockedTitle")}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-cs-ink2">
                      {t(scoredAgainst.trim() ? "match.ungradedBody" : "match.lockedBody")}
                    </p>
                  </div>
                ))}
            </div>
          )}

          <div>
            {/* Saved CVs — one version per application, kept where you built it. */}
            {isAuthenticated && (
              <div className="rounded-xl bg-cs-surface ring-1 ring-inset ring-cs-ink/10 p-5">
                <h3 className="text-sm font-bold text-cs-ink">{t("saved.title")}</h3>
                <p className="mt-1 text-xs leading-relaxed text-cs-ink2">
                  {t("saved.subtitle")}
                </p>
                {savedCvs.length === 0 ? (
                  <p className="mt-4 text-sm text-cs-ink2">{t("saved.empty")}</p>
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
                          className="focus-ring group block w-full overflow-hidden rounded-lg border border-cs-ink/10 bg-white transition-colors hover:border-cs-blue/50"
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
                            className="min-w-0 flex-1 truncate text-[11px] font-medium text-cs-ink"
                            title={item.title}
                          >
                            {item.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDelete(item._id)}
                            aria-label={t("saved.remove")}
                            title={t("saved.remove")}
                            className="focus-ring -mt-0.5 shrink-0 rounded-full p-1 text-cs-ink2 hover:text-red-500"
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
      </section>

      <CvBuilderSections />

      <CvPreviewModal
        cv={sampleOpen ? SAMPLE_CV : null}
        labels={cvLabels}
        title={t("hero.sampleTitle")}
        onClose={() => setSampleOpen(false)}
        onDownload={() => printCvDocument(buildCvHtml(SAMPLE_CV, cvLabels), `${SAMPLE_CV.fullName} — sample CV`)}
      />

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
