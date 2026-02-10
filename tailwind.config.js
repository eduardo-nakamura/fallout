/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {        
        'fallout': {
          DEFAULT: '#18f417',
          faint: 'rgba(24, 244, 23, 0.3)',
          dark: '#0a5d0a',
        },
      },
      fontFamily: {        
        terminal: ['"Share Tech Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}