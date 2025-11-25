import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'masters-green': '#006747',
        'soft-black': '#1a1a1a',
        'warm-white': '#fafafa',
        'text-secondary': '#666666',
      },
      fontFamily: {
        'electromagnetic': ['ElectromagneticLungs', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;

