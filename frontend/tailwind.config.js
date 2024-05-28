/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily : {
      heading : ["Satisfy", "cursive"],
      normal : ["Poetsen One", "sans-serif"]
    },
    extend: {},
  },
  plugins: [],
}

