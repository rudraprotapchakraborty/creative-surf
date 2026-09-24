import { getTranslator } from "@/lib/i18n/server";
import { servicesMessages } from "@/lib/i18n/messages/services";
import { serviceDetailsMessages } from "@/lib/i18n/messages/serviceDetails";
import { SERVICES } from "@/app/services/catalog";
import { CardGrid, ClosingCta, Section, Timeline, type Action } from "./kit";

/**
 * Ready-made sections for server pages. They carry their own (already
 * translated) copy, so a page can close with the shared process, related
 * services and contact panel without re-declaring any of it.
 */

/** Cards linking to the /services/[slug] pages named, in the order given. */
export async function RelatedServices({ slugs }: { slugs: string[] }) {
  const t = await getTranslator(servicesMessages);
  const td = await getTranslator(serviceDetailsMessages);
  const copy = t.raw<{ title: string; description: string }[]>("items", []);

  const items = slugs
    .map((slug) => {
      const index = SERVICES.findIndex((service) => service.slug === slug);
      if (index < 0 || !copy[index]) return null;
      return {
        title: copy[index].title,
        description: copy[index].description,
        icon: SERVICES[index].iconName,
        href: `/services/${slug}`,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <Section
      kicker={td("labels.otherKicker")}
      title={td("labels.otherTitle")}
      accent={td("labels.otherAccent")}
    >
      <CardGrid items={items} cta={t("explore")} columns={3} compact numbered={false} />
    </Section>
  );
}

/** The agency's five-stage process as a scroll-filled timeline. */
export async function ProcessSection() {
  const t = await getTranslator(servicesMessages);
  const steps = t.raw<{ step: string; description: string }[]>("process", []);
  return (
    <Section
      grid
      kicker={t("processKicker")}
      title={t("processTitle")}
      accent={t("processAccent")}
      subline={t("processSubtitle")}
    >
      <Timeline items={steps.map((s) => ({ title: s.step, body: s.description }))} />
    </Section>
  );
}

/** Closing contact panel; any piece of copy can be overridden per page. */
export async function ContactCta({
  kicker,
  title,
  accent,
  body,
  button,
  href,
  secondary,
}: {
  kicker?: string;
  title?: string;
  accent?: string;
  body?: string;
  button?: string;
  href?: string;
  secondary?: Action;
}) {
  const t = await getTranslator(servicesMessages);
  // A page's own one-line title replaces the two-line default outright, so the
  // default accent must not trail after it.
  const custom = title !== undefined;
  return (
    <ClosingCta
      kicker={kicker ?? t("cta.kicker")}
      title={title ?? t("cta.title")}
      accent={custom ? accent : accent ?? t("cta.titleAccent")}
      body={body ?? t("cta.body")}
      button={button ?? t("cta.button")}
      href={href}
      secondary={secondary}
    />
  );
}
