import type React from "react";
import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import Client from "./client";
import "./globals.css";
import ChatButton from "@/components/ChatButton";

export const metadata: Metadata = generateMetadata({
  title: "Creative Surf",
  description:
    "Creative Surf is a leading digital marketing agency specializing in SEO, content marketing, and social media strategies to drive revenue growth for businesses.",
  path: "/",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Client>
    <ChatButton />
    {children}
    </Client>;
}
