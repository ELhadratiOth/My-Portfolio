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
        'bg-img': 'white',
        'bg-gadient':
          'radial-gradient(circle at center center, rgb(80, 32, 84),rgb(62, 35, 81),rgb(44, 38, 79),rgb(26, 40, 76),rgb(8, 43, 73))',
      },

      boxShadow: {
        shad: '-1px -2px 36px -1px rgba(103,38,190,0.74)',
      },
      dropShadow: {
        back: '17px 9px 20px #6f69fd',
      },
      fontSize: {
        me: ['2rem', '2rem'],
      },
      cursor: {
        custom: 'url(./assets/cursor.svg) 16 16, auto',
      },
    },
  },
  plugins: [],
};
