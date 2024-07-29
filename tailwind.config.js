/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4981ff',
          second: '#5b8dff',
          third: '#e7efff',
          fourth: '#6896ff'
        },
        black: {
          DEFAULT: '#212225'
        },
        gray: {
          DEFAULT: '#7d7c7f'
        },
        green: {
          DEFAULT: '#00B69B'
        }
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: true // <== disable this!
  }
}
