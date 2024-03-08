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
          primary: "#f5f5f5",
          secondary: "#your-light-secondary-color",
        },
        dark: {
          primary: "#1F2937",
          secondary: "#your-dark-secondary-color",
        },
      },
      boxShadow: {
        sf: "-3px 2px 16px -9px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-background": "url('/methodImages/Logosmartflow.svg')",
      },
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
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
