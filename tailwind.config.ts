import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        sand: '#C8B89A',
        sage: '#7A8C72',
        terra: '#C4876A',
        dark: '#2C2419',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playlist', 'cursive'],
        body: ['var(--font-body)', 'Okomito', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
}

export default config
