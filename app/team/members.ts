import { Clapperboard, Code2, Film, Megaphone, PenLine } from "lucide-react";

/**
 * Names, cities and emails are proper nouns and stay in code; the role label,
 * bio and accent are looked up per member so the page follows the visitor's
 * language.
 *
 * `photo` is null for anyone who has not sent one in; those cards keep the
 * initials on the accent, so a half-photographed team still looks deliberate.
 */
export const TEAM = [
  {
    name: "Mehedee Hasan",
    photo: "/team/mehedee.webp",
    initials: "MH",
    location: "Dhaka, Bangladesh",
    email: "creativesurfagency@gmail.com",
    roleKey: "roles.marketingLead",
    bioKey: "bios.marketingLead",
    icon: Megaphone,
    accent: "linear-gradient(135deg,#B8892A,#D4A843)",
  },
  {
    name: "Rudra Protap Chakraborty",
    photo: "/team/rudra.webp",
    initials: "RC",
    location: "Kolkata, India",
    email: "rudra@rudraprotapchakraborty.com",
    roleKey: "roles.webDeveloper",
    bioKey: "bios.webDeveloper",
    icon: Code2,
    accent: "linear-gradient(135deg,#0066A2,#0EA5E9)",
  },
  {
    name: "Shariful Hoque",
    photo: null,
    initials: "SH",
    location: "Dhaka, Bangladesh",
    email: "sharifastronaut@gmail.com",
    roleKey: "roles.contentStrategist",
    bioKey: "bios.contentStrategist",
    icon: PenLine,
    accent: "linear-gradient(135deg,#7C3AED,#C084FC)",
  },
  {
    name: "Shah Mahbood Ch.",
    photo: null,
    initials: "SM",
    location: "Innsbruck, Austria",
    email: "shahmahbood@gmail.com",
    roleKey: "roles.visualiser",
    bioKey: "bios.visualiser",
    icon: Clapperboard,
    accent: "linear-gradient(135deg,#0F766E,#2DD4BF)",
  },
  {
    name: "Iftekhar Arnob",
    photo: null,
    initials: "IA",
    location: "Dhaka, Bangladesh",
    email: "iftekhararnob4@gmail.com",
    roleKey: "roles.visualiser",
    bioKey: "bios.editor",
    icon: Film,
    accent: "linear-gradient(135deg,#BE123C,#FB7185)",
  },
] as const;
