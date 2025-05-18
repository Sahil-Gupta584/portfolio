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
      keyframes: {
        levitate: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        levitate: 'levitate 2s ease-in-out infinite',
      },
    },
  },
  plugins: [heroui(),],
}

