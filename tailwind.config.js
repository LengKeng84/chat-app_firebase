/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},

    colors: {
      whiteCus: "#dad2d1",
      blackCus: "#18191a",
      lightLine: "#9a9a9a",
      darkLine: "#333",
      lightPrimary: "#033e8c",
      lightPrimary1: "#e4e6eb",
      darkPrimary: "#00c2ab",
      darkPrimary1: "#10252b",
      lightHover: "rgba(3,62,140,0.1)",
      darkHover: "rgba(0,194,171,0.1)",
      lightFocus: "rgba(3,62,140,0.3)",
      darkFocus: "rgba(0,194,171,0.3)",
    },

    boxShadow: {
      sFull: "0px 0px 5px 1px #000",
      emojiBox: "0px 0px 3px 1px #c3c3c3",
    },
  },
  plugins: [],
};
