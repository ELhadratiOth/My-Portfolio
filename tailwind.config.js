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
        primary1: '#03cfba',
        primary2: '#5d2d83',
        primary3: '#012560',
        primary4: '#5fd7dd',
        primary5: '##000079',
        primary6: '##bb65ff',

        secondary1: '#5fd7dd',
        secondary2: '#44F2E1',
        secondary3: '#FFFDB5',
      },
      backgroundImage: {
        'bg-img': "url('./src/assets/img2.jpg')",
        'bg-gadient':
          'radial-gradient(circle at center center, rgb(80, 32, 84),rgb(62, 35, 81),rgb(44, 38, 79),rgb(26, 40, 76),rgb(8, 43, 73))',
      },
      dropShadow: {
        'drop-me': '0 35px 35px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
