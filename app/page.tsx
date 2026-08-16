"use client";

import * as React from "react";
import Hero from "./components/home/Hero";
import MarqueeStrip from "./components/home/MarqueeStrip";
import Services from "./components/home/Services";
import WebDev from "./components/home/WebDev";
import Work from "./components/home/Work";
import Process from "./components/home/Process";
import Testimonials from "./components/home/Testimonials";
import TrustedBy from "./components/home/TrustedBy";
import CTA from "./components/home/CTA";
import { NoSSR } from "./NoSSR";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen" style={{ fontFamily: "var(--font-jakarta)" }}>
      <NoSSR>
        <Hero />
        <MarqueeStrip />
        <Services />
        <WebDev />
        <Work />
        <Process />
        <Testimonials />
        <TrustedBy />
        <CTA />
      </NoSSR>
    </div>
  );
}
