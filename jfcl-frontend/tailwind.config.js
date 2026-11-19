/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4ff', 100: '#e0e9ff', 200: '#bdd0ff',
          600: '#1a3a8f', 700: '#14306e', 800: '#0f2454', 900: '#0a1a3d'
        }
      },
      fontFamily: {
        bengali: ['Hind Siliguri', 'sans-serif'],
      }
    }
  },
  plugins: []
}
