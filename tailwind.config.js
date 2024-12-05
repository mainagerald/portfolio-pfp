/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        amatic: ['Amatic SC', 'cursive'],
        doto: ['Doto', 'sans-serif'],
        indie: ['Indie Flower', 'cursive'],
        lato: ['Lato', 'sans-serif'],
        sans: ['Lato', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
