/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#031424',
          900: '#06233D',
          850: '#092B4B',
          800: '#0C355B',
          700: '#104573',
          600: '#185992',
        },
        flood: {
          blue: '#087ED1',
          hover: '#076bb2',
          light: '#EAF6FD',
          accent: '#168BD2',
          glow: '#38BDF8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(6, 35, 61, 0.06)',
        'glow-blue': '0 0 20px rgba(8, 126, 209, 0.35)',
        'glow-red': '0 0 20px rgba(220, 38, 38, 0.35)',
      }
    },
  },
  plugins: [],
}