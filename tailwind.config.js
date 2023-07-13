/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // success: colors.green,
        'success': {
          100: '#79d168',
          200: '#73cc62',
          300: '#6dc75b',
          400: '#67c255',
          500: '#61BD4F',
          600: '#60b449',
          700: '#5aac44',
          800: '#4e9f39',
          900: '#3f8e2a',
        },
        primary: colors.blue,
        lime: colors.lime,
        sky: colors.sky,
        fuchsia: colors.fuchsia,
        teal: colors.teal,
        // light: colors.zinc,
        'danger': '#e11d48',
      },
      boxShadow: {
        'lg': '0 0px 10px 0px rgba(0, 0, 0, 0.1)',
      },
      container: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1024px',
          '2xl': '1536px',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

