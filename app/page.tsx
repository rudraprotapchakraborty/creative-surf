"use client";

import * as React from "react";
import TrustedByCompanies from "./components/TrustedByCompanies";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import ImpactSection from "./components/ImpactSection";
import PricingSection from "./components/PricingSection";
import ReviewsSection from "./components/ReviewsSection";
import TeamSection from "./components/TeamSection";
import { NoSSR } from "./NoSSR";

export default function Page() {
  return (
    <>
      <div className="flex flex-col min-h-screen" style={{ fontFamily: "var(--font-jakarta)" }}>
        <NoSSR>
          <HeroSection />
          <TrustedByCompanies />
          <ServicesSection />
          <ImpactSection />
          <PricingSection />
          <ReviewsSection />
          <TeamSection />
        </NoSSR>
      </div>
    </>
  );
}
