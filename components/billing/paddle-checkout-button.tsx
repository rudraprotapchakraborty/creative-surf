"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthUser } from "@/components/auth/use-auth-user";

declare global {
  interface Window {
    Paddle?: {
      Environment: { set: (env: "sandbox" | "production") => void };
      Setup: (opts: { token: string }) => void;
      Checkout: { open: (opts: Record<string, unknown>) => void };
    };
  }
}

let paddleScriptPromise: Promise<void> | null = null;

/** Loads Paddle.js once and configures it. Safe to call from multiple mounts. */
function loadPaddle(): Promise<void> {
  if (paddleScriptPromise) return paddleScriptPromise;

  paddleScriptPromise = new Promise((resolve, reject) => {
    if (window.Paddle) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => {
      const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
      if (!token || !window.Paddle) {
        reject(new Error("Paddle client token missing"));
        return;
      }
      if (process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "sandbox") {
        window.Paddle.Environment.set("sandbox");
      }
      window.Paddle.Setup({ token });
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load Paddle.js"));
    document.head.appendChild(script);
  });

  return paddleScriptPromise;
}

/**
 * Opens Paddle's hosted checkout overlay for the Pro plan. Signed-out
 * visitors are sent to log in first — Paddle needs an account to attach the
 * subscription to via `customData.userId`, which the webhook reads back to
 * grant entitlement.
 */
export function PaddleCheckoutButton({
  className,
  children = "Upgrade to Pro",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuthUser();
  const [opening, setOpening] = React.useState(false);
  const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;

  const handleClick = async () => {
    if (!user) {
      router.push("/login?from=/cv-builder");
      return;
    }
    if (!priceId) {
      console.error("NEXT_PUBLIC_PADDLE_PRICE_ID is not set.");
      return;
    }

    setOpening(true);
    try {
      await loadPaddle();
      window.Paddle?.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customer: user.email ? { email: user.email } : undefined,
        customData: { userId: user.sub },
      });
    } catch (err) {
      console.error("Could not open Paddle checkout:", err);
    } finally {
      setOpening(false);
    }
  };

  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm transition-all focus-ring px-7 py-3.5 text-white bg-aurora-grad shadow-aurora hover:opacity-95 disabled:opacity-60 disabled:pointer-events-none";

  return (
    <button type="button" onClick={handleClick} disabled={loading || opening} className={cn(base, className)}>
      {opening ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
