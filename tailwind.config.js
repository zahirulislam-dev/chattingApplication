/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'sans': ['Open Sans', 'sans-serif'],
        'pops': ['Poppins', 'sans-serif']
    },
    colors: {
      'primary': '#5F35F5',
      'shadow' : '(0px 4px 4px rgba(0, 0, 0, 0.25));',
      'shadow2' : '(0px 0px 89px 19px rgba(0, 0, 0, 0.04));',
      'overlay': 'rgba(0, 0, 0, 0.41);',
      'overlay2': 'rgba(0, 0, 0, 0.25);'

    }
  },
},
  plugins: [],
}
