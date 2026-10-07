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
 */
// `iconName` is the same icon by name, for server pages handing data to client components.
export type ServiceEntry = { slug: string; icon: LucideIcon; iconName: IconName };

export const SERVICES: readonly ServiceEntry[] = [
  { slug: "brand-strategy", icon: Compass, iconName: "compass" },
  { slug: "web-design-development", icon: Monitor, iconName: "monitor" },
  { slug: "digital-marketing", icon: Megaphone, iconName: "megaphone" },
  { slug: "content-creation", icon: PenLine, iconName: "pen" },
  { slug: "social-media-management", icon: Users, iconName: "users" },
  { slug: "seo", icon: Search, iconName: "search" },
];
