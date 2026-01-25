/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Marutea Brand Colors
        emerald: {
          900: '#064e3b',
          50: '#ecfdf5',
          100: '#d1fae5',
        },
        rose: {
          100: '#ffe4e6',
          200: '#fecdd3',
        },
        sand: '#FCFBF7',
      },
      fontFamily: {
        display: ['"Dancing Script"', 'cursive'],
        body: ['Quicksand', 'sans-serif'],
      },
      borderRadius: {
        'bubble': '2rem',
        'pebble': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(6, 78, 59, 0.08)',
        'gentle': '0 2px 10px rgba(6, 78, 59, 0.05)',
      }
    },
  },
  plugins: [],
}
