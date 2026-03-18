/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        black:   '#080808',
        bone:    '#E8E0D0',
        dim:     '#9A9080',
        accent:  '#E8431A',
        surface: '#111111',
        border:  '#222222',
      },
    },
  },
  plugins: [],
}