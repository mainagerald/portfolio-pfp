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
      },
      backgroundImage: {
        'soft-gradient': 'linear-gradient(to right, #e6e9f0 0%, #eef1f5 100%)',
        'soft-blue-gradient': 'linear-gradient(to right, #f0f4f8 0%, #e9f0f6 100%)',
        'muted-gradient': 'linear-gradient(to right, #f3f4f6 0%, #e5e7eb 100%)',
        'tech-gradient': 'linear-gradient(to right, #f8fafc 0%, #f1f5f9 100%)'
      }
    },
  },
  plugins: [],
}
