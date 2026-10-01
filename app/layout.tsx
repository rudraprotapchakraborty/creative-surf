import type React from "react";
import type { Metadata } from "next";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { getTranslator } from "@/lib/i18n/server";
import { pageMetaMessages } from "@/lib/i18n/messages/pageMeta";
import Client from "./client";
import "./globals.css";

// The homepage is a client component, so its title lives here. Every other
// route sets its own; this is only the fallback for one that forgets.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator(pageMetaMessages);
  return buildMetadata({
    title: t("home.title"),
    description: t("home.description"),
    path: "/",
  });
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Client>{children}</Client>;
}
