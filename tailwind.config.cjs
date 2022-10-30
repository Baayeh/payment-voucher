/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#256D85",
        secondary: {
          100: "#DFF6FF",
          200: "#47B5FF",
          300: "#06283D",
        },
      },
      fontFamily: {
        fira: ["Fira Sans"],
      },
    },
  },
  plugins: [],
};
