import { getTranslator } from "@/lib/i18n/server";
import { servicesMessages } from "@/lib/i18n/messages/services";
import { SERVICES } from "@/app/services/catalog";
import { CardGrid, ClosingCta, Section, type Action } from "./kit";

/**
 * Ready-made sections for server pages. They carry their own (already
 * translated) copy, so a page can close with related services and the
 * contact panel without re-declaring any of it.
 */

/** Cards linking to the services named, on /services, in the order given. */
export async function RelatedServices({ slugs }: { slugs: string[] }) {
  const t = await getTranslator(servicesMessages);
  const copy = t.raw<{ title: string; description: string }[]>("items", []);

  const items = slugs
    .map((slug) => {
      const index = SERVICES.findIndex((service) => service.slug === slug);
      if (index < 0 || !copy[index]) return null;
      return {
        title: copy[index].title,
        description: copy[index].description,
        icon: SERVICES[index].iconName,
        href: `/services#${slug}`,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <Section
      kicker={t("offerKicker")}
      title={t("offerTitle")}
      accent={t("offerAccent")}
    >
      <CardGrid items={items} cta={t("explore")} columns={3} compact numbered={false} />
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
