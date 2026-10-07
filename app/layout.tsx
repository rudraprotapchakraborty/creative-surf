import type React from "react";
import type { Metadata } from "next";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { getTranslator } from "@/lib/i18n/server";
import { pageMetaMessages } from "@/lib/i18n/messages/pageMeta";
import Client from "./client";
import "./globals.css";

// The fallback for a route that forgets its own metadata. No `path`, so it
// carries no canonical: one here would be inherited by such a route and
// point it at the homepage. The homepage sets its own in app/page.tsx.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(pageMetaMessages);
  return buildMetadata({
    title: t("home.title"),
    description: t("home.description"),
  });
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Client>{children}</Client>;
}
