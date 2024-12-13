/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
    colors: {
      primary: "#006e76",
      primaryDark: "#004348",
      background: "#1c1b22",
      background2: "#111111",
      tablaIntercalado1: "#252429",
      tablaIntercalado2: "#35373e",
      secondary: "#86bc86",
      grisForm: "#cdd3db",
      text: "#f0f0f0",
      "background-solid": "rgb(var(--background-solid-rgb))",
      foreground: "rgb(var(--foreground-rgb))",
      form: "#2b2a33",
      "form-input": "#42414d",
    },
  },
  animation: {
    "slide-up": "slideUp 0.5s ease-out forwards",
  },
  keyframes: {
    slideUp: {
      "0%": { transform: "translateY(100%)", opacity: "0" },
      "100%": { transform: "translateY(0)", opacity: "1" },
    },
  },
};
export const plugins = [];
