module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        blue: {
          600: "#0066CC",
          700: "#0052A3",
        },
        flow: {
          bg: "rgb(var(--flow-bg) / <alpha-value>)",
          surface: "rgb(var(--flow-surface) / <alpha-value>)",
          text: "rgb(var(--flow-text) / <alpha-value>)",
          textSoft: "rgb(var(--flow-text-soft) / <alpha-value>)",
          green: "rgb(var(--flow-green) / <alpha-value>)",
          buttonHover: "rgb(var(--flow-buttonHover) / <alpha-value>)",
          card: "var(--flow-card)",
          cardStrong: "var(--flow-card-strong)",
          cardSolid: "var(--flow-card-solid)",
          border: "var(--flow-border)",
          borderStrong: "var(--flow-border-strong)",
          blob1: "var(--flow-blob-1)",
          blob2: "var(--flow-blob-2)",
          blob3: "var(--flow-blob-3)",
        },
        // Editorial layer (homepage, navbar, footer). Named by role, not hue —
        // the --cs-* tokens in app/globals.css carry the light/dark values.
        cs: {
          bg: "rgb(var(--cs-bg) / <alpha-value>)",
          surface: "rgb(var(--cs-surface) / <alpha-value>)",
          sunken: "rgb(var(--cs-sunken) / <alpha-value>)",
          ink: "rgb(var(--cs-ink) / <alpha-value>)",
          ink2: "rgb(var(--cs-ink-2) / <alpha-value>)",
          ink3: "rgb(var(--cs-ink-3) / <alpha-value>)",
          blue: "rgb(var(--cs-blue) / <alpha-value>)",
          blueHover: "rgb(var(--cs-blue-hover) / <alpha-value>)",
          onBlue: "rgb(var(--cs-on-blue) / <alpha-value>)",
          cyan: "rgb(var(--cs-cyan) / <alpha-value>)",
          gold: "rgb(var(--cs-gold) / <alpha-value>)",
          deep: "rgb(var(--cs-deep) / <alpha-value>)",
          deepInk: "rgb(var(--cs-deep-ink) / <alpha-value>)",
        },
        aurora: {
          1: "rgb(var(--accent-1) / <alpha-value>)",
          2: "rgb(var(--accent-2) / <alpha-value>)",
          3: "rgb(var(--accent-3) / <alpha-value>)",
          warm: "rgb(var(--accent-warm) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)"],
        heading: ["var(--font-jakarta)"],
        // Not `serif`/`mono`: other pages use those classes and expect the defaults.
        editorial: ["var(--font-serif)", "Georgia", "serif"],
        meta: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      backgroundImage: {
        "aurora-grad": "linear-gradient(110deg, rgb(var(--accent-1)) 0%, rgb(var(--accent-2)) 100%)",
        "aurora-grad-tri": "linear-gradient(110deg, rgb(var(--accent-1)) 0%, rgb(var(--accent-2)) 50%, rgb(var(--accent-3)) 100%)",
        "aurora-soft": "linear-gradient(135deg, rgb(var(--accent-1) / 0.14), rgb(var(--accent-2) / 0.10), rgb(var(--accent-3) / 0.14))",
        "aurora-radial": "radial-gradient(ellipse at top, rgb(var(--accent-1) / 0.18), transparent 50%), radial-gradient(ellipse at bottom right, rgb(var(--accent-2) / 0.15), transparent 50%), radial-gradient(ellipse at bottom left, rgb(var(--accent-3) / 0.18), transparent 50%)",
        "wave-mesh": "radial-gradient(circle at 20% 80%, rgb(var(--accent-3) / 0.18), transparent 45%), radial-gradient(circle at 80% 20%, rgb(var(--accent-1) / 0.15), transparent 50%)",
      },
      keyframes: {
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "rotate-slow": "rotate-slow 20s linear infinite",
        "rotate-slow-reverse": "rotate-slow 25s linear infinite reverse",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "marquee": "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
