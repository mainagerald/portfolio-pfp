/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        lato: ['Lato', 'sans-serif'],
        sans: ['Lato','sans-serif']
      }
    },
  },
  plugins: [],
}

