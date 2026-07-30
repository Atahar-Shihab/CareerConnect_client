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
          DEFAULT: "#0D3B2E",
          light: "#175A46",
          dark: "#08261E",
        },
        marigold: {
          DEFAULT: "#F2A900",
          light: "#F5C24D",
          dark: "#B88000",
        },
        moss: {
          DEFAULT: "#8F9779",
          light: "#A8AFA3",
          dark: "#6F765B",
        }
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
