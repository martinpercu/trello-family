/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        success: colors.green,
        primary: colors.blue,
        'danger': '#e11d48',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

