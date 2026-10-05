"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useT } from "@/lib/i18n"
import { realEstateWhatsAppMessages } from "@/lib/i18n/messages/realEstateWhatsApp"

export const WHATSAPP_NUMBER = "8801988467099"
export const WHATSAPP_GREEN = "#25D366"
const SITE_URL = "https://www.creativesurf.agency"

/** wa.me link that opens the chat with `text` already typed in. */
export function whatsappHref(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

/** Public URL of a project page, quoted in the prefilled message so we know which one they mean. */
export function projectUrl(slug: string) {
  return `${SITE_URL}/real-estate/projects/${slug}`
}

export function WhatsAppIcon({ className, size }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className} aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.205zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  )
}

/**
 * Floating WhatsApp button for the property pages, stacked directly above the
 * AI chat launcher (bottom-5/right-5, sm:bottom-6/right-6, 3.5rem tall).
 * While mounted it sets `html.wa-fab`, which moves the chat widget's
 * "Ask Surf!" bubble from above the launcher to its left, out of our way.
 */
export function FloatingWhatsApp({ text }: { text?: string }) {
  const t = useT(realEstateWhatsAppMessages)
  const label = t("floating")

  useEffect(() => {
    const el = document.documentElement
    el.classList.add("wa-fab")
    return () => el.classList.remove("wa-fab")
  }, [])

  return (
    <motion.a
      href={whatsappHref(text ?? t("prefill.general"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
      className="group fixed bottom-[5.5rem] right-5 sm:bottom-[5.75rem] sm:right-6 z-[4000] flex flex-row-reverse items-center h-14 rounded-full text-white"
      style={{ background: WHATSAPP_GREEN, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
    >
      <span className="relative grid place-items-center w-14 h-14 shrink-0">
        <WhatsAppIcon size={26} />
      </span>
      {/* Label slides out to the left on hover (desktop only — on touch it would never retract). */}
      <span className="relative hidden sm:block max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[16rem] group-hover:pl-5">
        {label}
      </span>
    </motion.a>
  )
}

/**
 * The layout's floating button, shown on every real-estate page except:
 *  • the admin editors (…/new, …/edit/…), where nobody is enquiring, and
 *  • a project's own page, which renders its own button with the project
 *    named in the prefilled message.
 */
export function RealEstateWhatsApp() {
  const pathname = usePathname() ?? ""
  if (/\/(new|edit)(\/|$)/.test(pathname)) return null
  if (/^\/real-estate\/projects\/[^/]+$/.test(pathname)) return null
  return <FloatingWhatsApp />
}
