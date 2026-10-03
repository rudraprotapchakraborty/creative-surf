"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings } from "lucide-react"
import { useT } from "@/lib/i18n"
import { authMessages } from "@/lib/i18n/messages/auth"

/**
 * The account area's dateline, shared by the dashboard and settings: where
 * you are — Dashboard · Settings, both links, the current one marked.
 */
export function AccountNav() {
  const t = useT(authMessages)
  const pathname = usePathname()

  const links = [
    { href: "/account", label: t("dashboard"), icon: null },
    { href: "/account/settings", label: t("settings.nav"), icon: <Settings aria-hidden size={13} /> },
  ]

  return (
    <div className="cs-meta flex items-center justify-between gap-6 border-b border-cs-ink/10 text-cs-ink3">
      <nav aria-label={t("dashboard")} className="flex min-w-0 items-center">
        <span className="hidden pb-4 text-cs-ink sm:inline">Creative Surf</span>
        <span aria-hidden className="mx-3 hidden pb-4 opacity-50 sm:inline">/</span>
        <ul className="-mb-px flex items-center gap-1">
          {links.map(link => {
            const current = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={`cs-focus flex items-center gap-1.5 rounded-sm border-b-2 px-2 pb-[calc(1rem-2px)] pt-0.5 transition-colors duration-200 ${
                    current ? "border-cs-blue text-cs-ink" : "border-transparent hover:text-cs-ink"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
