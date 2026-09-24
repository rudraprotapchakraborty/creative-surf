import {
  Compass,
  Megaphone,
  Monitor,
  PenLine,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/app/components/kit";

/**
 * The six services, in the same order as `items` in the services messages —
 * index is the join key between this registry and the translated copy.
 *
 * `hub` points at an existing, deeper section of the site where one exists, so
 * a detail page can hand the reader on rather than dead-ending.
 */
// `iconName` is the same icon by name, for server pages handing data to client components.
export type ServiceEntry = { slug: string; icon: LucideIcon; iconName: IconName; hub?: string };

export const SERVICES: readonly ServiceEntry[] = [
  { slug: "brand-strategy", icon: Compass, iconName: "compass" },
  { slug: "web-design-development", icon: Monitor, iconName: "monitor", hub: "/ux-interactive" },
  { slug: "digital-marketing", icon: Megaphone, iconName: "megaphone", hub: "/digital-marketing" },
  { slug: "content-creation", icon: PenLine, iconName: "pen" },
  { slug: "social-media-management", icon: Users, iconName: "users", hub: "/seo-lead-generation/digital-advertising" },
  { slug: "seo", icon: Search, iconName: "search", hub: "/seo-lead-generation/organic-search" },
];

export function serviceIndex(slug: string): number {
  return SERVICES.findIndex((service) => service.slug === slug);
}
