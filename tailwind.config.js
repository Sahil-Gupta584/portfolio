/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";

module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
        float: "float 3s ease-in-out infinite",
        blob: "blob 7s infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(20px, -30px) scale(1.1)" },
          "50%": { transform: "translate(-10px, 20px) scale(0.9)" },
          "75%": { transform: "translate(15px, 10px) scale(1.05)" },
        },
      },
    },
  },
  plugins: [heroui()],
};
