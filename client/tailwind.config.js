const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      'basic-white': '#fbfbfb',
      white: '#F2F2F2',
      'chambray-blue': '#304F8C',
      gray: '#5C6273',
      orange: '#D9665B',
      'queen-blue': '#3B668C',
      'yankees-blue': '#212940',
      green: '#45C295',
    },
  },
};
