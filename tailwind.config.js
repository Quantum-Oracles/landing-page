/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { max: "780px" },
        widescreen: { min: "780px" },
      },
      colors: {
        primary: "#892cfe",
        secondary: "#17f4a9",
        accent: "#579cd1",
        background: "#000000",
        foreground: "#ffffff",
        front: "#fff",
        back: "#1a1a1a",
      },
      borderRadius: {
        inherit: "inherit",
      },
      transitionDuration: {
        inherit: "inherit",
      },
      fontFamily: {
        poppins: '"Poppins", sans-serif',
        raleway: '"Raleway", sans-serif',
        inter: '"Inter", sans-serif',
      },
      zIndex: {
        1: 1,
      },
    },
  },
  plugins: [],
};
