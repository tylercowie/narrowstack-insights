/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        metabase: {
          primary: '#509EE3',
          secondary: '#88BF4D',
          danger: '#ED6E6E',
          warning: '#F9CF48',
          purple: '#A989C5',
          gray: {
            100: '#F9FBFC',
            200: '#F2F2F2',
            300: '#DCDCDC',
            400: '#C9CED6',
            500: '#949AAB',
            600: '#4C5773',
            700: '#2E353B',
          }
        }
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', '-apple-system', 'sans-serif'],
      },
      gridTemplateColumns: {
        '18': 'repeat(18, minmax(0, 1fr))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 