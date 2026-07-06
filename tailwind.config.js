/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E1E0CC',
        secondary: '#9E9E9E',
        accent: '#DEDBC8',
        background: '#000000',
        card: {
          DEFAULT: '#111111',
          hover: '#181818',
          elevated: '#212121',
        },
      },
      fontFamily: {
        sans: ['"Almarai"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
      },
      borderColor: {
        subtle: 'rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
}
