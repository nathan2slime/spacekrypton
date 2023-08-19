// const config = require('@skryp/core/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...config,
  theme: {
    extend: {
      colors: {
        primary: {
          110: '#EEE6FB',
          100: '#DCCDF7',
          150: '#CBB4F4',
          200: '#CBB4F4',
          300: '#BA9AF0',
          400: '#A881EC',
          500: '#9768E8',
          600: '#864FE5',
          700: '#7436E1',
          800: '#6421D9',
          900: '#591CD0',
        },
        secondary: {
          110: '#33AAD4',
          100: '#54b7da',
          150: '#59badc',
          200: '#bfe4f1',
          300: '#b4e0ef',
          400: '#94d2e8',
          500: '#89cee6',
          600: '#4eb5d9',
          700: '#79c7e2',
          800: '#69c0df',
          900: '#74c5e1',
        },
        light: {
          100: '#FFFFFF',
          200: '#FBFCFF',
          300: '#F5F1FD',
          400: '#E8DDFA',
          500: '#EEE6FB',
        },
        dark: {
          100: '#0b0c14',
          200: '#020105',
          300: '#0E0F19',
          400: '#06020E',
          500: '#080312',
          600: '#0A0317',
          700: '#191B2F',
          800: '#1D2138',
          900: '#1D2138',
        },
        danger: {
          100: '#F15420',
          200: '#F15E2C',
          300: '#F26232',
          400: '#F36C3F',
          500: '#F37145',
          600: '#F47F58',
        },
        warning: {
          100: '#FF680D',
          200: '#FF6C15',
          300: '#FF7523',
          400: '#FF8533',
          500: '#FF8B3E',
          600: '#ff954d',
        },
        gray: {
          100: '#D6D6D6',
          200: '#CDCDCD',
          300: '#C8C8C8',
          400: '#D2D2D2',
          500: '#DFDFDF',
        },
      },
    },
  },

  plugins: [require('@tailwindcss/typography')],
  content: [
    './src/app/**/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};
