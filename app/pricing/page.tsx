import { Check, Sparkles } from "lucide-react";
import { Eyebrow, PremiumCard, Reveal, SectionHeading } from "@/components/premium";
import { PaddleCheckoutButton } from "@/components/billing/paddle-checkout-button";
import { FREE_MONTHLY_GENERATIONS } from "@/lib/subscription";

export const metadata = { title: "Pricing · CV Builder · Creative Surf" };

const FREE_FEATURES = [
  `${FREE_MONTHLY_GENERATIONS} AI-written CVs per month`,
  "Unlimited saves and PDF downloads",
  "ATS-readiness scoring",
];

const PRO_FEATURES = [
  "Unlimited AI-written CVs",
  "Unlimited saves and PDF downloads",
  "ATS-readiness scoring",
  "Priority generation, no monthly reset to wait for",
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-28">
      <SectionHeading
        align="center"
        eyebrow={<Eyebrow icon={Sparkles}>CV Builder</Eyebrow>}
        title="Simple pricing,"
        highlight="upgrade anytime"
        description="Start free. Move to Pro the moment you're applying to more roles than the free plan covers."
        className="mx-auto"
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
        <Reveal>
          <PremiumCard className="h-full flex flex-col">
            <h3 className="text-xl font-bold text-flow-text">Free</h3>
            <p className="mt-1 text-sm text-flow-textSoft">For a first pass at your CV.</p>
            <p className="mt-6 text-4xl font-bold text-flow-text">
              $0<span className="text-base font-medium text-flow-textSoft">/month</span>
            </p>
            <ul className="mt-6 space-y-3 flex-1">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-flow-textSoft">
                  <Check className="w-4 h-4 mt-0.5 text-aurora-1 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </PremiumCard>
        </Reveal>

        <Reveal delay={0.05}>
          <PremiumCard className="h-full flex flex-col border-aurora-1/40 relative">
            <span className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-aurora-grad">
              Pro
            </span>
            <h3 className="text-xl font-bold text-flow-text">Pro</h3>
            <p className="mt-1 text-sm text-flow-textSoft">For an active job search.</p>
            <p className="mt-6 text-4xl font-bold text-flow-text">
              $9<span className="text-base font-medium text-flow-textSoft">/month</span>
            </p>
            <ul className="mt-6 space-y-3 flex-1">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-flow-textSoft">
                  <Check className="w-4 h-4 mt-0.5 text-aurora-1 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <PaddleCheckoutButton className="mt-8 w-full" />
          </PremiumCard>
        </Reveal>
      </div>
    </main>
  );
}
