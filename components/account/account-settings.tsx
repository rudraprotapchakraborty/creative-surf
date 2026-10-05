"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { m as motion } from "framer-motion"
import { useT } from "@/lib/i18n"
import { authMessages } from "@/lib/i18n/messages/auth"
import type { AuthPayload } from "@/lib/auth"
import { AuthField } from "@/components/auth/auth-field"
import { AuthError, AuthNotice } from "@/components/auth/auth-shell"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { AccountNav } from "@/components/account/account-nav"

const RESEND_COOLDOWN_SECONDS = 60

/** The form's own action: compact, with a busy state that keeps its width. */
function SaveButton({ busy, label, busyLabel, disabled }: { busy: boolean; label: string; busyLabel: string; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={busy || disabled}
      aria-busy={busy || undefined}
      className="cs-focus inline-flex h-11 items-center gap-2 rounded-[10px] bg-cs-blue px-5 text-sm font-semibold text-cs-onBlue transition-colors hover:bg-cs-blueHover disabled:cursor-not-allowed disabled:opacity-50"
    >
      {busy && <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" />}
      {busy ? busyLabel : label}
    </button>
  )
}

/** One setting: number, title and what it does in the rail; the form beside it. */
function SettingsSection({
  index,
  title,
  hint,
  id,
  children,
}: {
  index: string
  title: string
  hint: string
  id: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={id} className="grid gap-y-6 border-t border-cs-ink/10 py-10 lg:grid-cols-12 lg:gap-x-8 lg:py-12">
      <div className="lg:col-span-4">
        <p className="cs-meta tabular-nums text-cs-ink3">{index}</p>
        <h2 id={id} className="mt-3 text-[1.5rem] font-medium tracking-[-0.03em] text-cs-ink">
          {title}
        </h2>
        <p className="mt-2 max-w-[22rem] text-sm leading-relaxed text-cs-ink2">{hint}</p>
      </div>
      <div className="max-w-[30rem] lg:col-span-6 lg:col-start-6">{children}</div>
    </section>
  )
}

async function send(url: string, method: string, body: unknown) {
  const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, data }
}

export function AccountSettings({ initialUser }: { initialUser: AuthPayload }) {
  const t = useT(authMessages)
  const router = useRouter()
  const [user, setUser] = useState(initialUser)

  // Which ways the account signs in decides what the password form asks for.
  const [providers, setProviders] = useState<string[] | null>(null)
  useEffect(() => {
    let active = true
    fetch("/api/account")
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (active && d?.profile) setProviders(d.profile.providers) })
      .catch(() => {})
    return () => { active = false }
  }, [])
  const hasPassword = providers === null ? true : providers.includes("password")
  const usesGoogle = providers?.includes("google") ?? false

  /* ---- Name ---- */
  const [name, setName] = useState(user.name || "")
  const [nameState, setNameState] = useState<{ busy: boolean; error: string; notice: string }>({ busy: false, error: "", notice: "" })
  async function saveName(e: React.FormEvent) {
    e.preventDefault()
    setNameState({ busy: true, error: "", notice: "" })
    try {
      const { ok, data } = await send("/api/account", "PATCH", { name })
      if (ok) {
        setUser(data.user)
        setNameState({ busy: false, error: "", notice: t("settings.name.saved") })
        router.refresh()
      } else setNameState({ busy: false, error: data.error || t("genericError"), notice: "" })
    } catch {
      setNameState({ busy: false, error: t("genericError"), notice: "" })
    }
  }

  /* ---- Email: request a code, then confirm it ---- */
  const [newEmail, setNewEmail] = useState("")
  const [emailPassword, setEmailPassword] = useState("")
  const [emailStep, setEmailStep] = useState<"request" | "confirm">("request")
  const [code, setCode] = useState("")
  const [cooldown, setCooldown] = useState(0)
  const [emailState, setEmailState] = useState<{ busy: boolean; error: string; notice: string }>({ busy: false, error: "", notice: "" })

  useEffect(() => {
    if (cooldown <= 0) return
    const id = setTimeout(() => setCooldown(c => c - 1), 1000)
    return () => clearTimeout(id)
  }, [cooldown])

  async function requestEmailCode(e?: React.FormEvent) {
    e?.preventDefault()
    setEmailState({ busy: true, error: "", notice: "" })
    try {
      const { ok, data } = await send("/api/account/email", "POST", { email: newEmail, currentPassword: emailPassword })
      if (ok) {
        setEmailStep("confirm")
        setCode("")
        setCooldown(RESEND_COOLDOWN_SECONDS)
        setEmailState({ busy: false, error: "", notice: t("settings.email.sent", { email: newEmail.trim() }) })
      } else {
        if (data.retryAfterSeconds) setCooldown(data.retryAfterSeconds)
        setEmailState({ busy: false, error: data.error || t("genericError"), notice: "" })
      }
    } catch {
      setEmailState({ busy: false, error: t("genericError"), notice: "" })
    }
  }

  async function confirmEmail(e: React.FormEvent) {
    e.preventDefault()
    setEmailState(s => ({ ...s, busy: true, error: "" }))
    try {
      const { ok, data } = await send("/api/account/email", "PUT", { email: newEmail, code })
      if (ok) {
        setUser(data.user)
        // The change unlinked Google; reflect it without a reload.
        setProviders(p => (p ? p.filter(x => x !== "google") : p))
        setEmailStep("request")
        setNewEmail("")
        setEmailPassword("")
        setCode("")
        setEmailState({ busy: false, error: "", notice: t("settings.email.changed", { email: data.user.email }) })
        router.refresh()
      } else {
        setCode("")
        setEmailState({ busy: false, error: data.error || t("genericError"), notice: "" })
      }
    } catch {
      setEmailState({ busy: false, error: t("genericError"), notice: "" })
    }
  }

  function restartEmail() {
    setEmailStep("request")
    setCode("")
    setEmailState({ busy: false, error: "", notice: "" })
  }

  /* ---- Delete: a deliberate second step, then proof ---- */
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteProof, setDeleteProof] = useState("")
  const [deleteState, setDeleteState] = useState<{ busy: boolean; error: string }>({ busy: false, error: "" })

  async function deleteAccount(e: React.FormEvent) {
    e.preventDefault()
    setDeleteState({ busy: true, error: "" })
    try {
      const { ok, data } = await send(
        "/api/account",
        "DELETE",
        { confirmEmail: deleteProof },
      )
      if (ok) {
        // The session is already cleared server-side; leave the account area.
        router.replace("/")
        router.refresh()
        return
      }
      setDeleteState({ busy: false, error: data.error || t("genericError") })
    } catch {
      setDeleteState({ busy: false, error: t("genericError") })
    }
  }

  /* ---- Password ---- */
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordState, setPasswordState] = useState<{ busy: boolean; error: string; notice: string }>({ busy: false, error: "", notice: "" })

  async function savePassword(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setPasswordState({ busy: false, error: t("settings.password.mismatch"), notice: "" })
      return
    }
    setPasswordState({ busy: true, error: "", notice: "" })
    try {
      const { ok, data } = await send("/api/account/password", "POST", { currentPassword, newPassword })
      if (ok) {
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setProviders(p => (p && !p.includes("password") ? [...p, "password"] : p))
        setPasswordState({ busy: false, error: "", notice: t("settings.password.saved") })
      } else setPasswordState({ busy: false, error: data.error || t("genericError"), notice: "" })
    } catch {
      setPasswordState({ busy: false, error: t("genericError"), notice: "" })
    }
  }

  return (
    <div className="min-h-screen bg-cs-bg pb-24 text-cs-ink">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="cs-container pt-[5.25rem] sm:pt-24 lg:pt-[6.5rem]"
      >
        <AccountNav />
        <div className="pb-12 pt-12 sm:pt-16 lg:pb-14 lg:pt-20">
          <h1 className="cs-display text-cs-ink" style={{ fontSize: "clamp(2.5rem, 5.6vw, 5rem)", lineHeight: 1, letterSpacing: "-0.05em" }}>
            {t("settings.title")}
          </h1>
          <p className="cs-lede mt-5 max-w-[34rem] text-cs-ink2">{t("settings.subtitle")}</p>
        </div>
      </motion.header>

      <div className="cs-container">
        {/* 01 — Name */}
        <SettingsSection index="01" id="settings-name" title={t("settings.name.title")} hint={t("settings.name.hint")}>
          <form onSubmit={saveName} className="space-y-5">
            <AuthField label={t("settings.name.label")} value={name} onChange={setName} autoComplete="name" />
            <AuthError message={nameState.error} />
            <AuthNotice message={nameState.notice} />
            <SaveButton
              busy={nameState.busy}
              label={t("settings.name.save")}
              busyLabel={t("saving")}
              disabled={!name.trim() || name.trim() === (user.name || "")}
            />
          </form>
        </SettingsSection>

        {/* 02 — Email */}
        <SettingsSection index="02" id="settings-email" title={t("settings.email.title")} hint={t("settings.email.hint")}>
          <dl className="mb-6 border-y border-cs-ink/10 py-3">
            <dt className="cs-meta text-cs-ink3">{t("settings.email.current")}</dt>
            <dd className="mt-1 break-all text-[15px] font-medium text-cs-ink">{user.email}</dd>
          </dl>

          {!hasPassword ? (
            // The change disconnects Google, so a password-less account would be locked out.
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-cs-ink2">{t("settings.email.needsPassword")}</p>
              <a href="#settings-password" className="cs-focus cs-underline inline-block rounded-sm text-sm font-semibold text-cs-blue">
                {t("settings.email.needsPasswordLink")}
              </a>
            </div>
          ) : emailStep === "request" ? (
            <form onSubmit={requestEmailCode} className="space-y-5">
              <AuthField label={t("settings.email.next")} type="email" value={newEmail} onChange={setNewEmail} autoComplete="email" />
              <AuthField
                label={t("settings.email.password")}
                type="password"
                value={emailPassword}
                onChange={setEmailPassword}
                autoComplete="current-password"
              />
              {usesGoogle && <p className="text-[13px] leading-snug text-cs-ink3">{t("settings.email.googleNote")}</p>}
              <AuthError message={emailState.error} />
              <AuthNotice message={emailState.notice} />
              <SaveButton
                busy={emailState.busy}
                label={t("settings.email.send")}
                busyLabel={t("saving")}
                disabled={!newEmail.trim() || !emailPassword || cooldown > 0}
              />
            </form>
          ) : (
            <form onSubmit={confirmEmail} className="space-y-5">
              <AuthNotice message={emailState.notice} />
              <div>
                <label htmlFor="email-code" className="mb-3 block text-[13px] font-semibold tracking-[-0.005em] text-cs-ink">
                  {t("settings.email.code")}
                </label>
                <InputOTP id="email-code" maxLength={6} value={code} onChange={setCode} autoFocus>
                  <InputOTPGroup className="gap-2">
                    {[0, 1, 2, 3, 4, 5].map(i => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="h-14 w-12 rounded-[10px] border border-cs-ink/15 bg-cs-surface text-xl font-semibold tabular-nums text-cs-ink ring-cs-blue ring-offset-0 first:rounded-[10px] first:border-l last:rounded-[10px]"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <AuthError message={emailState.error} />
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <SaveButton busy={emailState.busy} label={t("settings.email.confirm")} busyLabel={t("verifying")} disabled={code.length < 6} />
                <button
                  type="button"
                  onClick={() => requestEmailCode()}
                  disabled={cooldown > 0 || emailState.busy}
                  className="cs-focus rounded-sm text-sm font-semibold text-cs-ink2 transition-colors hover:text-cs-blue disabled:cursor-default disabled:text-cs-ink3"
                >
                  {cooldown > 0 ? t("resendIn", { seconds: cooldown }) : t("resend")}
                </button>
                <button
                  type="button"
                  onClick={restartEmail}
                  className="cs-focus rounded-sm text-sm font-semibold text-cs-ink2 transition-colors hover:text-cs-blue"
                >
                  {t("settings.email.restart")}
                </button>
              </div>
            </form>
          )}
        </SettingsSection>

        {/* 03 — Password */}
        <SettingsSection
          index="03"
          id="settings-password"
          title={t("settings.password.title")}
          hint={hasPassword ? t("settings.password.hint") : t("settings.password.setHint")}
        >
          <form onSubmit={savePassword} className="space-y-5">
            {/* Lets password managers file the change under the right account. */}
            <input type="email" name="username" autoComplete="username" value={user.email || ""} readOnly hidden />
            {hasPassword && (
              <div>
                <AuthField
                  label={t("settings.password.current")}
                  type="password"
                  value={currentPassword}
                  onChange={setCurrentPassword}
                  autoComplete="current-password"
                />
                {/* Forgotten it? The emailed-code reset works signed in too. */}
                <Link
                  href={`/forgot-password?email=${encodeURIComponent(user.email || "")}&from=/account/settings`}
                  className="cs-focus cs-underline mt-2 inline-block rounded-sm text-[13px] font-semibold text-cs-ink2 transition-colors hover:text-cs-blue"
                >
                  {t("settings.password.forgot")}
                </Link>
              </div>
            )}
            <AuthField
              label={t("settings.password.next")}
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              autoComplete="new-password"
              hint={hasPassword ? undefined : t("settings.password.hint")}
            />
            <AuthField
              label={t("settings.password.confirm")}
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              autoComplete="new-password"
            />
            <AuthError message={passwordState.error} />
            <AuthNotice message={passwordState.notice} />
            <SaveButton
              busy={passwordState.busy}
              label={hasPassword ? t("settings.password.save") : t("settings.password.set")}
              busyLabel={t("saving")}
              disabled={!newPassword || !confirmPassword || (hasPassword && !currentPassword)}
            />
          </form>
        </SettingsSection>

        {/* 04 — Delete account: set apart, and in the one place red is used. */}
        <SettingsSection index="04" id="settings-delete" title={t("settings.delete.title")} hint={t("settings.delete.hint")}>
          {!deleteOpen ? (
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="cs-focus inline-flex h-11 items-center rounded-[10px] px-5 text-sm font-semibold text-red-600 ring-1 ring-inset ring-red-500/40 transition-colors hover:bg-red-500/[0.06] dark:text-red-400"
            >
              {t("settings.delete.start")}
            </button>
          ) : (
            <form
              onSubmit={deleteAccount}
              className="space-y-5 rounded-lg bg-red-500/[0.04] p-5 ring-1 ring-inset ring-red-500/25 sm:p-6"
            >
              <div>
                <p className="text-[1.125rem] font-medium tracking-[-0.02em] text-cs-ink">{t("settings.delete.confirmTitle")}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-cs-ink2">{t("settings.delete.confirmBody")}</p>
              </div>
              <AuthField
                label={t("settings.delete.email", { email: user.email || "" })}
                type="email"
                value={deleteProof}
                onChange={setDeleteProof}
                autoComplete="off"
              />
              <AuthError message={deleteState.error} />
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <button
                  type="submit"
                  disabled={deleteState.busy || deleteProof.trim().toLowerCase() !== (user.email || "").toLowerCase()}
                  aria-busy={deleteState.busy || undefined}
                  className="cs-focus inline-flex h-11 items-center gap-2 rounded-[10px] bg-red-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deleteState.busy && (
                    <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" />
                  )}
                  {deleteState.busy ? t("settings.delete.deleting") : t("settings.delete.confirm")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteOpen(false)
                    setDeleteProof("")
                    setDeleteState({ busy: false, error: "" })
                  }}
                  className="cs-focus rounded-sm text-sm font-semibold text-cs-ink2 transition-colors hover:text-cs-ink"
                >
                  {t("cancel")}
                </button>
              </div>
            </form>
          )}
        </SettingsSection>
      </div>
    </div>
  )
}
