# Creative Surf — Frontend

The official website for **Creative Surf**, a digital marketing agency offering SEO, content strategy, branding, and web development services. Built with Next.js 15 App Router, TypeScript, and Tailwind CSS.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS + shadcn/ui (Radix UI) |
| Animations | Framer Motion |
| 3D / WebGL | Three.js via React Three Fiber & Drei |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Notifications | Sonner, React Hot Toast |

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
npm run build   # Production build
npm run start   # Serve the production build
npm run lint    # Run ESLint
```

## Project Structure

```
app/
├── page.tsx                    # Home page (hero, services, portfolio, …)
├── layout.tsx                  # Root layout & metadata
├── about/                      # Company pages (approach, awards, careers, values, …)
├── blog/                       # Blog listing + dynamic post pages
├── case-studies/               # Case study listing + dynamic pages
├── contact/                    # Contact form with server actions
├── digital-marketing/          # Digital marketing & intelligence pages
├── seo-lead-generation/        # Organic search, local SEO, e-commerce SEO, ads
├── ux-interactive/             # UX/design & e-commerce design pages
├── services/                   # Services overview
├── tools/                      # Internal tools (keyword suggestion, fix funnel)
├── privacy-terms/              # Privacy policy & terms of service
└── components/                 # Page-level shared components
    ├── HeroSection.tsx         # Animated hero with interactive 3D ocean
    ├── OceanScene.tsx          # Three.js ocean + surfer mini-game
    ├── ServicesSection.tsx     # Services grid
    ├── PortfolioSection.tsx    # Work showcase
    ├── ReviewsSection.tsx      # Client testimonials
    ├── ImpactSection.tsx       # Key metrics / stats
    ├── PricingSection.tsx      # Pricing tiers
    ├── TeamSection.tsx         # Team members
    └── BlogSection.tsx         # Latest posts preview

components/
└── ui/                         # shadcn/ui primitive components

lib/
├── utils.ts                    # Tailwind class merger (cn)
├── analytics.ts                # Analytics helpers
└── metadata.ts                 # Shared metadata generator

hooks/                          # Custom React hooks
public/                         # Static assets (client logos, images)
```

## Services Offered

- **Graphics Design** — brand visuals and art direction
- **Content Marketing** — strategic storytelling and copywriting
- **Video Editing** — cinematic post-production
- **Website Development** — high-performance web experiences
- **OVC / TVC** — online and TV commercials
- **SEO & Social Media** — search visibility and paid campaigns
- **Media Buying** — optimised ad spend
- **Digital Branding** — cohesive brand identity systems

## Notable Features

- **Interactive 3D ocean hero** — a Three.js ocean scene with a surfable character (React Three Fiber + Drei)
- **Aurora / glassmorphism design system** — custom CSS variables for a fluid light/dark theme
- **Framer Motion animations** — scroll-triggered reveals, staggered word entrances, parallax blobs
- **Mouse particle trails** — canvas-based particle system on the hero section
- **Server Actions** — contact form submission handled via Next.js server actions
- **Dynamic routes** — blog posts and case studies resolved from slug params
- **SEO metadata** — centralised `generateMetadata` helper applied across all routes

## Deployment

The project is configured for Vercel (see `.vercel/`). A standard `npm run build` produces a static-export-friendly build with unoptimised image handling enabled.

## Contributing

1. Create a feature branch from `main`.
2. Make your changes and verify with `npm run build` (no TypeScript or lint errors expected in CI).
3. Open a pull request against `main`.
