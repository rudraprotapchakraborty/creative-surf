"use client";

import { useT } from "@/lib/i18n";
import { homeMessages } from "@/lib/i18n/messages/home";
import { homeExtraMessages } from "@/lib/i18n/messages/homeExtra";

const LOGOS = [
  { src: "/channel_i.webp", name: "Channel I" },
  { src: "/apex-footwear-ltd--600.webp", name: "Apex Footwear Ltd" },
  { src: "/bridgepoint.webp", name: "Bridge Point" },
  { src: "/beeteam.webp", name: "Bee Team" },
  { src: "/springfield.webp", name: "Springfield" },
  { src: "/icreation.webp", name: "iCreation" },
  { src: "/hm.webp", name: "HM Production" },
  { src: "/nextgen.webp", name: "NextGen Development Properties" },
  { src: "/wedvisa.webp", name: "Wedvisa" },
  { src: "/brisket.webp", name: "Brisket & Bistro" },
  { src: "/namimoon.webp", name: "Nami Moon" },
  { src: "/waffletime.webp", name: "Waffle Time" },
  { src: "/zafenity.webp", name: "Zafenity" },
  { src: "/ghuddy.webp", name: "Ghuddy" },
  { src: "/masalaking.webp", name: "Masala King" },
  { src: "/kudos.webp", name: "Kudos" },
];

function Tile({ logo, hidden }: { logo: (typeof LOGOS)[number]; hidden?: boolean }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className="mr-3 h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:mr-4 bg-white ring-1 ring-inset ring-cs-ink/[0.07] sm:h-[4.5rem] sm:w-[4.5rem]"
    >
      {/* Each file is pre-padded to a square on its own background. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={hidden ? "" : logo.name}
        width={72}
        height={72}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
      />
    </li>
  );
}

/**
 * The shoreline under the hero: one quiet row of client marks drifting past,
 * with the label pinned in the rail. It is proof, not a section, so it gets no
 * heading of its own — the h2 is for screen readers navigating by heading.
 *
 * The list is doubled for a seamless loop; the copy is hidden from assistive
 * tech, and reduced motion leaves a still row the reader can scroll.
 */
export default function ClientShore() {
  const t = useT(homeExtraMessages);
  const th = useT(homeMessages);

  return (
    <section aria-labelledby="clients-title" className="border-y border-cs-ink/10 bg-cs-bg">
      <div className="cs-container grid items-center gap-5 py-7 lg:grid-cols-12 lg:gap-8 lg:py-9">
        <div className="lg:col-span-3">
          <h2 id="clients-title" className="cs-meta text-cs-ink">
            {t("clients.label")}
          </h2>
          <p className="mt-1.5 text-sm text-cs-ink2">{t("clients.count", { count: LOGOS.length })}</p>
          <p className="sr-only">{th("trustedBy.subtitle")}</p>
        </div>

        <div
          className="cs-marquee-wrap relative overflow-x-auto no-scrollbar motion-safe:overflow-hidden lg:col-span-9"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          {/* Margins, not gap: a gap leaves the loop half a gap short at the seam. */}
          <ul className="cs-marquee flex w-max">
            {LOGOS.map((logo) => (
              <Tile key={logo.name} logo={logo} />
            ))}
            {LOGOS.map((logo) => (
              <Tile key={`${logo.name}-copy`} logo={logo} hidden />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
