"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useT } from "@/lib/i18n";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";
import { CtaPanel } from "@/app/components/kit";
import { ActionButton, Magnetic, SectionHead } from "./shared";

/** The homepage's closing panel: the shared CTA chrome plus a direct email line. */
export default function CTA() {
  const t = useT(homeExtraMessages);

  return (
    <section className="relative section-px pt-6 pb-16 sm:pb-20 bg-flow-bg">
      <div className="mx-auto max-w-7xl">
        <CtaPanel>
          <SectionHead
            onDark
            label={t("cta.badge")}
            heading={t("cta.headingLine1")}
            accent={t("cta.headingAccent")}
            subline={t("cta.subtitle")}
            className="mb-10"
          />

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <Magnetic>
              <Link href="/contact" className="focus-ring inline-block">
                <ActionButton onDark>{t("cta.ctaPrimary")}</ActionButton>
              </Link>
            </Magnetic>

            <a
              href={`mailto:${t("cta.ctaSecondary")}`}
              className="focus-ring group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl micro text-flow-bg border border-flow-bg/20 hover:border-flow-bg/45 hover:bg-flow-bg/[0.06] transition-colors"
            >
              <Mail className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
              {t("cta.ctaSecondary")}
            </a>
          </div>
        </CtaPanel>
      </div>
    </section>
  );
}
