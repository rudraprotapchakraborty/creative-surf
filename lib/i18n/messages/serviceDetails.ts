import { defineMessages } from "../types";

/**
 * Copy for the /services/[slug] detail pages. Each service's title and tags
 * come from `servicesMessages.items` so the overview and the detail page can
 * never disagree; this file holds only what the detail page adds.
 */
export const serviceDetailsMessages = defineMessages("serviceDetails", {
  en: {
    labels: {
      back: "All services",
      of: "of",
      heroCta: "Start a project",
      deeper: "Go deeper",
      specLabel: "What it covers",
      includesKicker: "What's included",
      includesTitle: "Everything it takes,",
      includesAccent: "handled for you.",
      outcomesKicker: "Outcomes",
      outcomesTitle: "What you can",
      outcomesAccent: "expect from it.",
      faqKicker: "FAQ",
      faqTitle: "Common",
      faqAccent: "questions.",
      next: "Next service",
      otherKicker: "Explore more",
      otherTitle: "Services that",
      otherAccent: "work well together.",
      ctaKicker: "Let's talk",
      ctaTitle: "Ready to get",
      ctaAccent: "started?",
      ctaBody: "Tell us where you want to go — we'll come back with a plan to get you there.",
      ctaButton: "Get in touch",
    },
    services: {
      "brand-strategy": {
        tagline: "A brand people recognise, remember and choose.",
        intro:
          "We define what makes you different, who you're for and how you should sound — then turn it into an identity and a message that stay consistent everywhere your brand shows up.",
        includes: [
          { title: "Brand discovery", description: "Workshops, audience research and a competitor review to find the space only you can own." },
          { title: "Positioning & messaging", description: "A clear value proposition, key messages and a tone of voice your whole team can use." },
          { title: "Visual identity", description: "Logo, colour, typography and imagery direction built to work from favicon to billboard." },
          { title: "Brand guidelines", description: "A practical playbook so every designer, writer and partner applies the brand the same way." },
        ],
        outcomes: [
          { title: "Clarity", description: "Everyone — from your team to your customers — can say what you do and why it matters." },
          { title: "Consistency", description: "Every touchpoint looks and sounds like the same brand, which builds trust faster." },
          { title: "Premium perception", description: "A considered brand lets you compete on value rather than on price." },
        ],
        faq: [
          { q: "Do you only work on new brands?", a: "No. We also refresh established brands — keeping the equity you've built while fixing what no longer fits." },
          { q: "What do we receive at the end?", a: "Your strategy, identity files in every format you need, and brand guidelines your team can use straight away." },
        ],
      },
      "web-design-development": {
        tagline: "Websites that look exceptional and convert.",
        intro:
          "From first wireframe to launch, we design and build fast, accessible websites that tell your story clearly and turn visitors into enquiries and sales.",
        includes: [
          { title: "UX & information architecture", description: "Sitemaps, user journeys and wireframes that put the right content in front of the right people." },
          { title: "UI design", description: "Distinctive, on-brand interfaces designed for every screen size." },
          { title: "Development", description: "Modern, performant builds with a CMS your team can update without a developer." },
          { title: "Launch & care", description: "SEO-ready migration, analytics set-up and ongoing support after go-live." },
        ],
        outcomes: [
          { title: "Speed", description: "Fast pages that keep visitors engaged and help your search rankings." },
          { title: "Conversion", description: "Clear journeys and calls to action designed around your business goals." },
          { title: "Control", description: "An easy-to-edit site, so you're never waiting on someone else to change a page." },
        ],
        faq: [
          { q: "Can you redesign our existing website?", a: "Yes. We audit what's working today, keep it, and rebuild the rest — protecting your search rankings through the move." },
          { q: "Will the site work on mobile?", a: "Every site is designed mobile-first and tested across devices and browsers before launch." },
        ],
      },
      "digital-marketing": {
        tagline: "Campaigns built on data, measured on revenue.",
        intro:
          "We plan and run multi-channel campaigns — search, social, display and email — and keep optimising them against the numbers that matter to your business.",
        includes: [
          { title: "Strategy & planning", description: "Audience, channel and budget planning tied to clear targets." },
          { title: "Paid media", description: "Search, social and display campaigns built, launched and managed end to end." },
          { title: "Email & automation", description: "Lifecycle emails and nurture flows that keep leads warm until they're ready to buy." },
          { title: "Analytics & reporting", description: "Tracking set up properly and reports that show exactly where results come from." },
        ],
        outcomes: [
          { title: "More qualified leads", description: "Spend focused on the audiences most likely to become customers." },
          { title: "Better return on spend", description: "Continuous testing moves budget towards what performs." },
          { title: "Full visibility", description: "You'll always know what's running, what it costs and what it's delivering." },
        ],
        faq: [
          { q: "Is there a minimum ad budget?", a: "No fixed minimum. We'll recommend a budget based on your goals and market, and scale it as results come in." },
          { q: "How soon will we see results?", a: "Paid campaigns can produce data within days; we usually spend the first weeks learning and optimising before scaling." },
        ],
      },
      "content-creation": {
        tagline: "Stories worth stopping the scroll for.",
        intro:
          "Our writers, designers and video producers create content that earns attention, explains what you do and gives people a reason to act.",
        includes: [
          { title: "Content strategy", description: "Themes, formats and a calendar grounded in what your audience actually searches for and shares." },
          { title: "Copywriting", description: "Website copy, articles, guides and ad copy written in your brand voice." },
          { title: "Video & motion", description: "Short-form reels, explainers and brand films, from script to final edit." },
          { title: "Design & photography", description: "Graphics, illustrations and photo shoots that make every piece recognisably yours." },
        ],
        outcomes: [
          { title: "Authority", description: "Useful content positions you as the expert in your field." },
          { title: "Organic reach", description: "Content built for search and sharing keeps working long after it's published." },
          { title: "A steady pipeline", description: "A reliable flow of content, so your channels are never left empty." },
        ],
        faq: [
          { q: "Can you match our existing tone of voice?", a: "Yes. We start from your brand guidelines and past content, and refine the voice with you on the first pieces." },
          { q: "Do you handle publishing too?", a: "We can deliver ready-to-post files, or publish and distribute across your channels for you." },
        ],
      },
      "social-media-management": {
        tagline: "A social presence that builds community.",
        intro:
          "We run your social channels day to day — planning, creating, posting and engaging — so your brand shows up consistently where your audience spends its time.",
        includes: [
          { title: "Channel strategy", description: "The right platforms, formats and posting rhythm for your audience." },
          { title: "Content calendar", description: "Planned, designed and scheduled posts, approved by you in advance." },
          { title: "Community management", description: "Replies, comments and messages handled promptly in your brand voice." },
          { title: "Creators & paid social", description: "Influencer partnerships and paid boosts to reach beyond your followers." },
        ],
        outcomes: [
          { title: "Consistency", description: "An active, on-brand presence without taking up your team's time." },
          { title: "Engagement", description: "Content designed for conversation, not just impressions." },
          { title: "Growth", description: "A larger, more relevant audience you can turn into customers." },
        ],
        faq: [
          { q: "Which platforms do you manage?", a: "Instagram, Facebook, LinkedIn, TikTok, X and YouTube — we'll recommend the ones that fit your audience." },
          { q: "Do we get to approve posts?", a: "Always. You'll review each content calendar before anything goes live." },
        ],
      },
      seo: {
        tagline: "Be found by the people already searching for you.",
        intro:
          "We fix the technical foundations, sharpen your content and build authority, so your site ranks for the searches that bring in real business.",
        includes: [
          { title: "SEO audit", description: "A full technical, content and backlink review with a prioritised action plan." },
          { title: "Technical SEO", description: "Site speed, crawlability, structured data and indexing issues fixed at the source." },
          { title: "On-page & content", description: "Keyword research, page optimisation and new content targeting high-intent searches." },
          { title: "Local SEO", description: "Google Business Profile, citations and reviews to win searches in your area." },
        ],
        outcomes: [
          { title: "Higher rankings", description: "Visibility for the terms your customers use when they're ready to buy." },
          { title: "Compounding traffic", description: "Organic traffic that grows over time without paying for every click." },
          { title: "Clear reporting", description: "Rankings, traffic and enquiries tracked so you can see the return." },
        ],
        faq: [
          { q: "How long does SEO take to work?", a: "Technical fixes can help within weeks; meaningful ranking gains typically build over three to six months." },
          { q: "Do you guarantee first place on Google?", a: "No one honestly can. We commit to the work and the transparency, and report on progress every month." },
        ],
      },
    },
  },
});
