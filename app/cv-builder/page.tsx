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

export default async function CvBuilderPage() {
  const t = await getTranslator(cvBuilderMessages);

  // The page already answers these in the FAQ accordion; publishing the same
  // answers as structured data lets search engines show them directly.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.raw<{ q: string; a: string }[]>("faq.items", []).map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CvBuilderClient />
    </>
  );
}
