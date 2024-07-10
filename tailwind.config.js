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
        customFont: ['Roboto Slab', 'sans-serif'],
      },
      colors: {
        primary1: '#F2AEE0',
        primary2: '#660273',
        primary3: '#6241D9',

        secondary1: '#1E1940',
        secondary2: '#44F2E1',
      },
      backgroundImage: {
        'bg-img': "url('./src/assets/img2.jpg')",
      },
    },
  },
  plugins: [],
};
