/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // O <alpha-value> é o segredo para o /40 e /80 funcionarem
        fallout: "rgb(var(--fallout-main) / <alpha-value>)",
        "fallout-bg": "rgb(var(--fallout-bg) / <alpha-value>)",
      },
      fontFamily: {
        terminal: ['"Share Tech Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}