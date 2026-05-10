/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fdf8f5',
        peach: '#fde8e0',
        blush: '#f5d0d8',
        rose: '#e8a4b8',
        rosedeep: '#c9788e',
        ink: '#3d2c33',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 32px rgba(232, 164, 184, 0.25)',
        card: '0 4px 24px rgba(61, 44, 51, 0.08)',
      },
    },
  },
  plugins: [],
}
