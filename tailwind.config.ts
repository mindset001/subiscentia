import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        sackers: ["var(--font-sackers-gothic)", "system-ui", "sans-serif"],
        circular: ["var(--font-circular)", "system-ui", "sans-serif"],
        sephir: ["var(--font-sephir)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;