import type { Metadata } from "next";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import CvBuilderClient from "./CvBuilderClient";
import { getTranslator } from "@/lib/i18n/server";
import { cvBuilderMessages } from "@/lib/i18n/messages/cvBuilder";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(cvBuilderMessages);
  return {
    ...buildMetadata({
      title: t("metaTitle"),
      description: t("metaDescription"),
      path: "/cv-builder",
    }),
    alternates: { canonical: "https://www.creativesurf.agency/cv-builder" },
  };
}

export default async function CvBuilderPage() {
  const t = await getTranslator(cvBuilderMessages);
  // Known on the server, so the sign-in notice is in the first paint (or not)
  // rather than arriving after a client check and pushing the form down.
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const signedIn = Boolean(token && verifyToken(token));

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
      <CvBuilderClient initialSignedIn={signedIn} />
    </>
  );
}
