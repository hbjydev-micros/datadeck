const colors = require('tailwindcss/colors');

module.exports = {
  purge: [ 'views/**/*.html' ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.gray
      }
    },
  },
  variants: {
    extend: {
      translate: [ 'active' ]
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
