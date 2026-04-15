/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a202c', // dark gray
          light: '#2d3748',
          dark: '#171923',
        },
        accent: {
          DEFAULT: '#fbbf24', // yellow
          dark: '#b7791f',
        },
        bg: {
          DEFAULT: '#f7fafc', // light gray
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}