import type { Metadata } from "next";
import CvBuilderClient from "./CvBuilderClient";
import { getTranslator } from "@/lib/i18n/server";
import { cvBuilderMessages } from "@/lib/i18n/messages/cvBuilder";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(cvBuilderMessages);
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "https://www.creativesurf.agency/cv-builder" },
  };
}

export default function CvBuilderPage() {
  return <CvBuilderClient />;
}
