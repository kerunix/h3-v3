const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        title: ['Lato', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        turquoise: {
          50: '#55dee8',
          100: '#4bd4de',
          200: '#41cad4',
          300: '#37c0ca',
          400: '#2db6c0',
          500: '#23acb6',
          600: '#19a2ac',
          700: '#0f98a2',
          800: '#058e98',
          900: '#00848e',
        },
        orange: {
          50: '#ffa832',
          100: '#ff9e28',
          200: '#ff941e',
          300: '#ff8a14',
          400: '#ff800a',
          500: '#ff7600',
          600: '#f56c00',
          700: '#eb6200',
          800: '#e15800',
          900: '#d74e00',
        },
        // red: {
        //   50: '#ff5891',
        //   100: '#ff4e87',
        //   200: '#ff447d',
        //   300: '#ff3a73',
        //   400: '#ff3069',
        //   500: '#fb265f',
        //   600: '#f11c55',
        //   700: '#e7124b',
        //   800: '#dd0841',
        //   900: '#d30037',
        // },
        violet: {
          50: '#9f55f5',
          100: '#954beb',
          200: '#8b41e1',
          300: '#8137d7',
          400: '#772dcd',
          500: '#6d23c3',
          600: '#6319b9',
          700: '#590faf',
          800: '#4f05a5',
          900: '#45009b',
        },
      },
    },
  },
  plugins: [],
}
