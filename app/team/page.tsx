import type { Metadata } from "next";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import TeamContent from "./TeamContent";
import { getTranslator } from "@/lib/i18n/server";
import { teamMessages } from "@/lib/i18n/messages/team";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(teamMessages);
  return {
    ...buildMetadata({
      title: t("metaTitle"),
      description: t("metaDescription"),
      path: "/team",
    }),
    alternates: { canonical: "https://www.creativesurf.agency/team" },
  };
}

export default function TeamPage() {
  return <TeamContent />;
}
