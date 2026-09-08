"use client"

import { useEffect, useState } from "react"
import { Loader2, Sparkles } from "lucide-react"
import { Panel } from "@/components/account/panel"
import { PaddleCheckoutButton } from "@/components/billing/paddle-checkout-button"

interface BillingStatus {
  plan: "free" | "pro"
  generationsUsed: number
  generationsLimit: number | null
  renewsAt: string | null
  cancelAtPeriodEnd: boolean
  manageUrl: string | null
}

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "—"

/** CV Builder plan + usage for the signed-in account. Sits in the account sidebar next to the profile panel. */
export function BillingPanel() {
  const [status, setStatus] = useState<BillingStatus | null>(null)

  useEffect(() => {
    let active = true
    fetch("/api/billing/status")
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (active) setStatus(d) })
      .catch(() => { if (active) setStatus(null) })
    return () => { active = false }
  }, [])

  return (
    <Panel title="CV Builder plan" icon={<Sparkles size={15} />}>
      {status === null ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-5 w-5 animate-spin" style={{ color: "rgb(var(--accent-1))" }} />
        </div>
      ) : status.plan === "pro" ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
              style={{ background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))" }}
            >
              Pro
            </span>
            <span className="text-xs" style={{ color: "rgb(var(--flow-text-soft))" }}>
              Unlimited CVs
            </span>
          </div>
          <p className="text-xs" style={{ color: "rgb(var(--flow-text-soft))" }}>
            {status.cancelAtPeriodEnd ? "Cancels on " : "Renews on "}
            {formatDate(status.renewsAt)}
          </p>
          {status.manageUrl && (
            <a
              href={status.manageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-semibold underline underline-offset-2"
              style={{ color: "rgb(var(--accent-1))" }}
            >
              Manage subscription
            </a>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm" style={{ color: "rgb(var(--flow-text-soft))" }}>
            {status.generationsUsed} / {status.generationsLimit} free CVs used this month
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgb(var(--flow-border-strong))" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, ((status.generationsLimit ? status.generationsUsed / status.generationsLimit : 0)) * 100)}%`,
                background: "linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-2)))",
              }}
            />
          </div>
          <PaddleCheckoutButton className="!px-4 !py-2 !text-xs w-full">Upgrade to Pro — $9/mo</PaddleCheckoutButton>
        </div>
      )}
    </Panel>
  )
}
