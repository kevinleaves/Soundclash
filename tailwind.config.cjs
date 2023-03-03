/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw',
  content: [
    "./index.html",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class'
}
