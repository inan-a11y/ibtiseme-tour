import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#07090F',
        surface: '#0F1117',
        cobalt: '#1A56DB',
        violet: '#6D28D9',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      backgroundImage: {
        oros: 'linear-gradient(135deg, #1A56DB 0%, #6D28D9 100%)',
      },
    },
  },
  plugins: [],
}

export default config
