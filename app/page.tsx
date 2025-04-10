"use client"

import * as React from "react"
import TrustedByCompanies from "./components/TrustedByCompanies"
import HeroSection from "./components/HeroSection"
import ServicesSection from "./components/ServicesSection"
import ImpactSection from "./components/ImpactSection"
import PricingSection from "./components/PricingSection"
import PortfolioSection from "./components/PortfolioSection"
import ReviewsSection from "./components/ReviewsSection"
import TeamSection from "./components/TeamSection"
import BlogSection from "./components/BlogSection"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection></HeroSection>
      <TrustedByCompanies></TrustedByCompanies>
      <ServicesSection></ServicesSection>
      <ImpactSection></ImpactSection>
      <PricingSection></PricingSection>      
      <PortfolioSection></PortfolioSection>
      <ReviewsSection></ReviewsSection>
      <TeamSection></TeamSection>      
      <BlogSection></BlogSection>
    </div>
  )
}

