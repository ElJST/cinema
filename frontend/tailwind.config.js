const { heroui } = require("@heroui/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          background: "#CCC/40", 
          foreground: "#11181C", 
          primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#006FEE",
          },
        },
      },
      dark: {
        colors: {
          background: "#0a0a0a", 
          foreground: "#ECEDEE", 
          primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#006FEE",
          },
        },
      },
    },
  })],
}

