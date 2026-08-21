import type { Metadata } from "next";
import TeamContent from "./TeamContent";
import { getTranslator } from "@/lib/i18n/server";
import { teamMessages } from "@/lib/i18n/messages/team";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(teamMessages);
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "https://www.creativesurf.agency/team" },
  };
}

export default function TeamPage() {
  return <TeamContent />;
}
