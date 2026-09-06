import menuData from "@/data/MenuItems.json";

/**
 * Grounding material for the site assistant.
 *
 * The assistant is only as good as what it actually knows about Creative Surf,
 * and the one place the site's own structure is already written down is the
 * navigation. Deriving the service list from it means a new service page shows
 * up in the assistant's answers the moment it shows up in the menu, instead of
 * drifting out of date in a second hand-maintained copy.
 */

type MenuItem = { name: string; href: string };
type MenuSection = { title: string; href?: string; items?: MenuItem[] };
type MenuEntry = { title: string; href: string; sections?: MenuSection[] };

/** Facts the navigation cannot supply. Kept short — every line costs tokens on every message. */
const COMPANY_FACTS = `Creative Surf is a digital marketing agency. It works on SEO and lead generation, paid and organic search, conversion rate optimisation, marketing automation, ecommerce, content marketing, UX design and web development, and analytics and attribution reporting.

Contact:
- Email: creativesurfcs@gmail.com
- Phone / WhatsApp: +880 1988-467099
- Contact form: /contact

Free tools on the site anyone can use:
- /cv-builder — an AI CV builder that turns rough notes into a recruiter-ready CV (sign-in required to generate and save).
- /tools/keyword-suggestion — keyword ideas for a topic or page.
- /tools/fix-funnel — a diagnostic for where a marketing funnel is leaking.

Other useful pages:
- /services — the full service overview
- /about/pricing — pricing guides
- /about/reviews — client reviews
- /about/careers — open roles
- /blogs — the marketing blog
- /real-estate — a separate real-estate projects and listings section
- /team — the people at Creative Surf`;

/** Flattens the navigation into "Section: Service (/href)" lines the model can quote from. */
function buildServiceIndex(): string {
  const entries = (menuData as { menuItems: MenuEntry[] }).menuItems;

  return entries
    .map((entry) => {
      const sections = (entry.sections ?? [])
        .map((section) => {
          const items = (section.items ?? [])
            .map((item) => `    - ${item.name} (${item.href})`)
            .join("\n");
          return items
            ? `  ${section.title}:\n${items}`
            : `  ${section.title}${section.href ? ` (${section.href})` : ""}`;
        })
        .join("\n");

      return `${entry.title} (${entry.href}):\n${sections}`;
    })
    .join("\n\n");
}

/** Built once per server instance — the menu is a static import and never changes at runtime. */
const SERVICE_INDEX = buildServiceIndex();

export const SITE_KNOWLEDGE = `${COMPANY_FACTS}

Full service index (page paths are real and safe to link):
${SERVICE_INDEX}`;
