const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        devs: {
          black: "#141414",
          yellow: "#febb00",
          blue: "#057aff",
          cyan: "#0ad6a1",
          red600: "#ff0075",
          gray500: "#1C1C1C",
          gray400: "#1B1A1A",
          gray300: "#232121",
          gray200: "#2E2D2D",
          gray100: "#7F7F7F",
          gray50: "#454343",
        },
      },

      fontFamily: {
        sans: ["Inter", "Inter var", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        yellow: "0 0 32px rgb(255, 213, 0, 0.3)",
      },
    },
  },
}
