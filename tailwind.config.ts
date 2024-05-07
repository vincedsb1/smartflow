import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          DEFAULT: "#0891b2",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#a3a3a3",
        },

        light: {
          primary: "#f5f5f5",
          secondary: "#e0e0e0",
        },
        dark: {
          primary: "#1F2937",
          secondary: "#2b6cb0",
        },
        neutral: {
          50: "#fafafa",
          800: "#262626",
          // ...autres nuances si nécessaire...
        },
      },
      boxShadow: {
        sf: "-3px 2px 16px -9px rgba(0,0,0,0.05)",
      },
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      //   "custom-background": "url('/methodImages/Logosmartflow.svg')",
      // },
      fontFamily: {
        text: ["Quicksand", "sans-serif"],
        title: ["Inter", "sans-serif"],
      },
      fontWeight: {
        "300": "300",
        "600": "600",
        "700": "700",
      },
      width: {
        "1/20": "5%",
        "2/20": "10%",
        "3/20": "15%",
        "4/20": "20%",
        "5/20": "25%",
        "6/20": "30%",
        "7/20": "35%",
        "8/20": "40%",
        "9/20": "45%",
        "10/20": "50%",
        "11/20": "55%",
        "12/20": "60%",
        "13/20": "65%",
        "14/20": "70%",
        "15/20": "75%",
        "16/20": "80%",
        "17/20": "85%",
        "18/20": "90%",
        "19/20": "95%",
      },
      transitionDuration: {
        "50": "50ms",
        "100": "100ms",
        "120": "120ms",
        "150": "150ms",
        "200": "200ms",
      },
      animationDelay: {
        "300": "300ms",
        "150": "150ms",
      },
    },
  },
  plugins: [nextui()],
  darkMode: "class",
};
export default config;
