/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '15px',
        },
      },
      fontFamily: {
        customFont: ['Exo 2', 'sans-serif'],
      },
      colors: {
        primary1: '#6f69fd',
        primary2: '#635ee3',
        primary3: '#5854ca',
        primary4: '#37347e',
        primary5: '#2c2a65',
      },
      backgroundImage: {
        'bg-img': "white",
        'bg-gadient':
          'radial-gradient(circle at center center, rgb(80, 32, 84),rgb(62, 35, 81),rgb(44, 38, 79),rgb(26, 40, 76),rgb(8, 43, 73))',
      },
      dropShadow: {
        'drop-me': '0 35px 35px rgba(0, 0, 0, 0.25)',
      },
      boxShadow: {
        'shad':'-5px 2px 43px -7px rgba(103,38,190,0.74)',
      }
    },
  },
  plugins: [],
};
