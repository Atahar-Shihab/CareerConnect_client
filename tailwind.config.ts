import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pine: {
          DEFAULT: "var(--pine)",
          light: "var(--pine-light)",
          dark: "var(--pine-dark)",
        },
        marigold: {
          DEFAULT: "var(--marigold)",
          hover: "var(--marigold-hover)",
          light: "var(--marigold-light)",
        },
        moss: {
          DEFAULT: "var(--moss)",
          light: "var(--moss-light)",
          dark: "var(--moss-dark)",
        },
        // Semantic tokens for surfaces & text
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--surface-elevated)",
        },
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
      },
      fontFamily: {
        heading: ["var(--font-bricolage)", "sans-serif"],
        sans: ["var(--font-karla)", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
      }
    },
  },
  plugins: [],
};
export default config;
