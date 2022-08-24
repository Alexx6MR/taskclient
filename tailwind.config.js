/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: {
          light: "#059669",
          dark: "#047857"
        },
        secundary: {
          light: "#c026d3",
          dark: "#a21caf"
        }
      }
    },
  },
  plugins: [],
}