"use client";

import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PaddleCheckoutButton } from "@/components/billing/paddle-checkout-button";
import { FREE_MONTHLY_GENERATIONS } from "@/lib/subscription-constants";

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

/**
 * The CV Builder's pricing lives here, inside the tool, rather than on a
 * separate marketing page — someone deciding whether to upgrade is already
 * mid-task and shouldn't have to leave the builder to see what Pro buys them.
 */
export function UpgradeDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>CV Builder plans</DialogTitle>
          <DialogDescription>Start free. Upgrade the moment you need more than the free plan covers.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2 mt-2">
          <div className="rounded-xl border border-flow-border p-5 flex flex-col">
            <h3 className="text-lg font-bold text-flow-text">Free</h3>
            <p className="mt-4 text-3xl font-bold text-flow-text">
              $0<span className="text-sm font-medium text-flow-textSoft">/month</span>
            </p>
            <ul className="mt-4 space-y-2.5 flex-1">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-flow-textSoft">
                  <Check className="w-4 h-4 mt-0.5 text-aurora-1 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-aurora-1/40 p-5 flex flex-col relative">
            <span className="absolute -top-3 left-5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-aurora-grad">
              Pro
            </span>
            <h3 className="text-lg font-bold text-flow-text">Pro</h3>
            <p className="mt-4 text-3xl font-bold text-flow-text">
              $9<span className="text-sm font-medium text-flow-textSoft">/month</span>
            </p>
            <ul className="mt-4 space-y-2.5 flex-1">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-flow-textSoft">
                  <Check className="w-4 h-4 mt-0.5 text-aurora-1 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <PaddleCheckoutButton className="mt-5 w-full" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
