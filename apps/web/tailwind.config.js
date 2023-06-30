const config = require('@kry/core/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  plugins: [require('@tailwindcss/typography')],
  content: [
    './src/app/**/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};
