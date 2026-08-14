"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, Mail } from "lucide-react"
import { useT } from "@/lib/i18n"
import { authMessages } from "@/lib/i18n/messages/auth"
import { AuthError, AuthShell, AuthSubmit } from "@/components/auth/auth-shell"
import { AuthField } from "@/components/auth/auth-field"
import { AuthDivider, GoogleButton } from "@/components/auth/google-button"

/** Maps the `?error=` codes the Google callback redirects with onto messages. */
const GOOGLE_ERROR_KEYS: Record<string, string> = {
  google_unavailable: "errorGoogleUnavailable",
  google_denied: "errorGoogleDenied",
  google_state: "errorGoogleState",
  google_unverified: "errorGoogleUnverified",
  google_failed: "errorGoogleFailed",
}

function LoginForm() {
  const t = useT(authMessages)
  const router = useRouter()
  const searchParams = useSearchParams()

  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const redirect = searchParams.get("from") || "/account"
  const googleErrorKey = GOOGLE_ERROR_KEYS[searchParams.get("error") || ""]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      })

      if (res.ok) {
        router.push(redirect)
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || t("invalidCredentials"))
      }
    } catch {
      setError(t("genericError"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      brand={t("brand")}
      title={t("loginTitle")}
      subtitle={t("loginSubtitle")}
      footer={
        <span>
          {t("noAccount")}{" "}
          <Link
            href={`/register${redirect !== "/account" ? `?from=${encodeURIComponent(redirect)}` : ""}`}
            className="font-semibold hover:underline"
            style={{ color: "rgb(var(--accent-1))" }}
          >
            {t("createOne")}
          </Link>
        </span>
      }
    >
      <GoogleButton label={t("googleContinue")} from={redirect} />
      <AuthDivider label={t("orDivider")} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          label={t("identifier")}
          value={identifier}
          onChange={setIdentifier}
          placeholder={t("identifierPlaceholder")}
          autoComplete="username"
          icon={Mail}
        />
        <AuthField
          label={t("password")}
          value={password}
          onChange={setPassword}
          type="password"
          placeholder={t("passwordPlaceholder")}
          autoComplete="current-password"
          icon={Lock}
        />

        <AuthError message={error || (googleErrorKey ? t(googleErrorKey) : "")} />

        <AuthSubmit loading={loading} label={t("signIn")} loadingLabel={t("signingIn")} />
      </form>
    </AuthShell>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
