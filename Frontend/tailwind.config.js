/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-gray-100": "#FAFAFA",
        "primary-gray-200": "#E8E8E8",
        "primary-dark-100": "#A3A3A3",
        "primary-dark-300": "#737373",
        "primary-dark-400": "#6F6F6F",
        "primary-dark-500": "#171717",
        "saffron-100": "#E8C547",
      },
      fontFamily: {
        fira: ["Fira Sans", "sans-serif"],
        frank: ["Frank Ruhl Libre", "sans-serif"],
        hind: ["Hind Vadodara", "sans-serif"],
      },
      width: {
        hr1: "2rem",
        hr2: "4rem",
        hr3: "6rem",
        hr4: "8rem",
        hr5: "10rem",
        hr6: "12rem",
        hr7: "14rem",
        hr8: "16rem",
        hr9: "18rem",
        hr10: "20rem",
      },
      content: {},
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};
