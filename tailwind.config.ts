import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#F3F4F6",
          secondary: "#your-light-secondary-color",
        },
        dark: {
          primary: "#1F2937",
          secondary: "#your-dark-secondary-color",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-background": "url('/methodImages/Logosmartflow.svg')",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      fontWeight: {
        "300": "300",
        "600": "600",
        "700": "700",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
