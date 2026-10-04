import type { GeneratedCv } from "@/lib/cv-types"

/**
 * The CV behind "See a sample CV": what a strong, finished CV from the builder
 * looks like, rendered by the same document code as a real one — and kept to
 * one page, because that is what a recruiter reads.
 *
 * The candidate and her employers are fictional, every contact detail uses a
 * reserved example address, and the portrait is an illustration, so the sample
 * can never point at — or wear the face of — a real person. It is written the
 * way the builder writes: specific outcomes with numbers, plain verbs, one line
 * per achievement, nothing a candidate couldn't defend in an interview. Same
 * persona as the CV fragment on the homepage, so the two read as one story.
 */
export const SAMPLE_CV: GeneratedCv = {
  fullName: "Nadia Rahman",
  headline: "Product Analyst · Experimentation, SQL & Funnel Analytics",
  photoUrl: "/cv-sample-photo.svg",
  contact: {
    email: "nadia.rahman@example.com",
    phone: "+880 1700 000000",
    location: "Dhaka, Bangladesh",
    links: [{ label: "Portfolio", url: "https://nadiarahman.example" }],
  },
  summary:
    "Product analyst with five years in e-commerce and fintech, turning product questions into experiments and decisions. Owns checkout and onboarding analytics at a payments company, working closely with engineers and designers.",
  experience: [
    {
      role: "Senior Product Analyst",
      company: "Tidewater Pay",
      location: "Dhaka",
      period: "2023 — Present",
      bullets: [
        "Led analytics for a checkout redesign that lifted completed payments by 11%.",
        "Built an A/B testing framework that cut test set-up from two weeks to two days.",
        "Traced 18% of failed payments to a bank OTP timeout, recovering BDT 6.4M a month.",
      ],
    },
    {
      role: "Product Analyst",
      company: "Brightline Commerce",
      location: "Dhaka",
      period: "2021 — 2023",
      bullets: [
        "Rebuilt the search funnel dashboard in Looker, replacing six weekly spreadsheets.",
        "Ran a pricing-display test across 300 categories that raised add-to-cart rate by 7%.",
      ],
    },
    {
      role: "Data Analyst",
      company: "Northfield Logistics",
      location: "Chattogram",
      period: "2019 — 2021",
      bullets: [
        "Automated daily delivery reports in SQL and Python, saving 10 hours a week.",
        "Mapped late deliveries by depot and route, guiding a plan that cut delivery time by 14%.",
      ],
    },
  ],
  education: [
    {
      degree: "BSc in Computer Science and Engineering",
      institution: "University of Dhaka",
      period: "2015 — 2019",
      details: "CGPA 3.72 / 4.00. Thesis on demand forecasting for last-mile delivery.",
    },
  ],
  skills: [
    { category: "Analysis", items: ["SQL", "Python (pandas)", "A/B testing", "Funnel and cohort analysis"] },
    { category: "Tools", items: ["BigQuery", "Looker", "Mixpanel", "dbt"] },
    { category: "Product", items: ["Metric design", "Experiment design", "Stakeholder management"] },
  ],
  projects: [
    {
      name: "Experiment calculator",
      description: "A free sample-size and duration calculator for product teams, used by 2,000+ people a month.",
    },
  ],
  certifications: [],
  languages: ["Bengali — Native", "English — Fluent", "Hindi — Intermediate"],
}
