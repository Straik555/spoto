const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './screens/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: ['outline-none', 'rounded-xl'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        xl: '5rem',
        '2xl': '5rem',
      },
    },
    minWidth: {
      auto: 'auto',
      400: '400px',
      300: '300px',
      250: '250px',
      200: '200px',
      125: '125px',
      75: '75px',
      full: '100%',
    },
    minHeight: {
      auto: 'auto',
      full: '100%',
      inherit: 'inherit',
      '80vh': '80vh',
      '60vh': '60vh',
    },
    extend: {
      transitionProperty: {
        'max-height': 'max-height',
      },
      screens: {
        xs: '375px',
        mobile: '375px',
        'desktop': '1024px',
        'lg-desktop': '1366px'
      },
      zIndex: {
        '-10': '-10',
      },
      colors: {
        black: '#2A2B2E',
        white: '#FFFFFF',
        primary: '#4E77F7',
        yellow: '#F3F94E',
        'dark-yellow': '#9CA02B',
        'blue-1': '#8D9DCF',
        'blue-2': '#B3C3F3',
        'blue-3': '#CBD4EE',
        'blue-4': '#EDF0FB',
        'blue-5': '#6288FF',
        'blue-6': '#7A9AFD',
        'blue-7': '#6389FE',
        'blue-8': '#CAD5FF',
        'blue-menu': '#AEC1FE',
        green: '#47B43E',
        'light-green': '#E1F4DF',
        red: '#F74E4E',
        'light-red': '#FFE2E2',
        orange: '#FFC83A',
        'light-orange': '#FFF4D9',
        'orange-text': '#D39800',
        text: '#7B8298',
        bg: '#FCFCFF',
        'bg-1': '#41444F',
        'bg-2': '#F5F5F5',
        disabled: '#efefef',
      },
      textColor: {
        default: '#7B8298',
        basic: '#2A2B2E',
        primary: '#4E77F7',
        secondary: '#D39800',
      },
      boxShadow: {
        'outline-normal': '0 0 0 2px var(--accents-2)',
        magical:
          'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
        button: '0 0 10px -5px rgba(0, 0, 0, 1)',
        icon: '0px 8px 30px 0px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        poppins: ['Poppins'],
      },
      fontSize: {
        's-xs': ['10px', '14px'],
        's-sm': ['12px', '18px'],
        's-base': ['14px', '22px'],
        's-lg': ['16px', '24px'],
        's-xl': ['18px', '28px'],
        's-xxl': ['20px', '31px'],
        's-2xl': ['24px', '36px'],
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
        'span-21': 'span 21 / span 21',
        'span-22': 'span 22 / span 22',
        'span-23': 'span 23 / span 23',
        'span-24': 'span 24 / span 24',
        'span-25': 'span 25 / span 25',
        'span-26': 'span 26 / span 26',
        'span-27': 'span 27 / span 27',
        'span-28': 'span 28 / span 28',
        'span-29': 'span 29 / span 29',
        'span-30': 'span 30 / span 30',
        'span-31': 'span 31 / span 31',
        'span-32': 'span 32 / span 32',
        'span-33': 'span 33 / span 33',
        'span-34': 'span 34 / span 34',
        'span-35': 'span 35 / span 35',
        'span-36': 'span 36 / span 36',
        'span-37': 'span 37 / span 37',
        'span-38': 'span 38 / span 38',
        'span-39': 'span 39 / span 39',
        'span-40': 'span 40 / span 40',
        'span-41': 'span 41 / span 41',
        'span-42': 'span 42 / span 42',
        'span-43': 'span 43 / span 43',
        'span-44': 'span 44 / span 44',
        'span-45': 'span 45 / span 45',
        'span-46': 'span 46 / span 46',
        'span-47': 'span 47 / span 47',
        'span-48': 'span 48 / span 48',
        'span-49': 'span 49 / span 49',
        'span-50': 'span 50 / span 50',
        'span-51': 'span 51 / span 51',
        'span-52': 'span 52 / span 52',
        'span-53': 'span 53 / span 53',
        'span-54': 'span 54 / span 54',
        'span-55': 'span 55 / span 55',
        'span-56': 'span 56 / span 56',
        'span-57': 'span 57 / span 57',
        'span-58': 'span 58 / span 58',
        'span-59': 'span 59 / span 59',
        'span-60': 'span 60 / span 60',
        'span-61': 'span 61 / span 61',
        'span-62': 'span 62 / span 62',
        'span-63': 'span 63 / span 63',
        'span-64': 'span 64 / span 64',
        'span-65': 'span 65 / span 65',
        'span-66': 'span 66 / span 66',
        'span-67': 'span 67 / span 67',
        'span-68': 'span 68 / span 68',
        'span-69': 'span 69 / span 69',
        'span-70': 'span 70 / span 70',
        'span-71': 'span 71 / span 71',
        'span-72': 'span 72 / span 72',
        'span-73': 'span 73 / span 73',
        'span-74': 'span 74 / span 74',
        'span-75': 'span 75 / span 75',
        'span-76': 'span 76 / span 76',
        'span-77': 'span 77 / span 77',
        'span-78': 'span 78 / span 78',
        'span-79': 'span 79 / span 79',
        'span-80': 'span 80 / span 80',
        'span-81': 'span 81 / span 81',
        'span-82': 'span 82 / span 82',
        'span-83': 'span 83 / span 83',
        'span-84': 'span 84 / span 84',
        'span-85': 'span 85 / span 85',
        'span-86': 'span 86 / span 86',
        'span-87': 'span 87 / span 87',
        'span-88': 'span 88 / span 88',
        'span-89': 'span 89 / span 89',
        'span-90': 'span 90 / span 90',
        'span-91': 'span 91 / span 91',
        'span-92': 'span 92 / span 92',
        'span-93': 'span 93 / span 93',
        'span-94': 'span 94 / span 94',
        'span-95': 'span 95 / span 95',
        'span-96': 'span 96 / span 96',
      },
      gridColumn: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
        'span-21': 'span 21 / span 21',
        'span-22': 'span 22 / span 22',
        'span-23': 'span 23 / span 23',
        'span-24': 'span 24 / span 24',
        'span-25': 'span 25 / span 25',
        'span-26': 'span 26 / span 26',
        'span-27': 'span 27 / span 27',
        'span-28': 'span 28 / span 28',
        'span-29': 'span 29 / span 29',
        'span-30': 'span 30 / span 30',
        'span-31': 'span 31 / span 31',
        'span-32': 'span 32 / span 32',
        'span-33': 'span 33 / span 33',
        'span-34': 'span 34 / span 34',
        'span-35': 'span 35 / span 35',
        'span-36': 'span 36 / span 36',
        'span-37': 'span 37 / span 37',
        'span-38': 'span 38 / span 38',
        'span-39': 'span 39 / span 39',
        'span-40': 'span 40 / span 40',
        'span-41': 'span 41 / span 41',
        'span-42': 'span 42 / span 42',
        'span-43': 'span 43 / span 43',
        'span-44': 'span 44 / span 44',
        'span-45': 'span 45 / span 45',
        'span-46': 'span 46 / span 46',
        'span-47': 'span 47 / span 47',
        'span-48': 'span 48 / span 48',
        'span-49': 'span 49 / span 49',
        'span-50': 'span 50 / span 50',
        'span-51': 'span 51 / span 51',
        'span-52': 'span 52 / span 52',
        'span-53': 'span 53 / span 53',
        'span-54': 'span 54 / span 54',
        'span-55': 'span 55 / span 55',
        'span-56': 'span 56 / span 56',
        'span-57': 'span 57 / span 57',
        'span-58': 'span 58 / span 58',
        'span-59': 'span 59 / span 59',
        'span-60': 'span 60 / span 60',
        'span-61': 'span 61 / span 61',
        'span-62': 'span 62 / span 62',
        'span-63': 'span 63 / span 63',
        'span-64': 'span 64 / span 64',
        'span-65': 'span 65 / span 65',
        'span-66': 'span 66 / span 66',
        'span-67': 'span 67 / span 67',
        'span-68': 'span 68 / span 68',
        'span-69': 'span 69 / span 69',
        'span-70': 'span 70 / span 70',
        'span-71': 'span 71 / span 71',
        'span-72': 'span 72 / span 72',
        'span-73': 'span 73 / span 73',
        'span-74': 'span 74 / span 74',
        'span-75': 'span 75 / span 75',
        'span-76': 'span 76 / span 76',
        'span-77': 'span 77 / span 77',
        'span-78': 'span 78 / span 78',
        'span-79': 'span 79 / span 79',
        'span-80': 'span 80 / span 80',
        'span-81': 'span 81 / span 81',
        'span-82': 'span 82 / span 82',
        'span-83': 'span 83 / span 83',
        'span-84': 'span 84 / span 84',
        'span-85': 'span 85 / span 85',
        'span-86': 'span 86 / span 86',
        'span-87': 'span 87 / span 87',
        'span-88': 'span 88 / span 88',
        'span-89': 'span 89 / span 89',
        'span-90': 'span 90 / span 90',
        'span-91': 'span 91 / span 91',
        'span-92': 'span 92 / span 92',
        'span-93': 'span 93 / span 93',
        'span-94': 'span 94 / span 94',
        'span-95': 'span 95 / span 95',
        'span-96': 'span 96 / span 96',
      },
    },
  },
  variants: {
    extend: {
      translate: ['responsive', 'hover', 'focus', 'group-hover'],
      display: ['responsive', 'hover', 'focus', 'group-hover'],
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [
    plugin(({ addUtilities, matchUtilities, theme }) => {
      addUtilities({
        '.mobile-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '0px',
          },
        },
        '.spoto-dashed': {
          border: 'none',
          backgroundImage:
            'linear-gradient(to right, #4E77F7 50%, rgba(255, 255, 255, 0) 0%), linear-gradient(#4E77F7 50%, rgba(255, 255, 255, 0) 0%), linear-gradient(to right, #4E77F7 50%, rgba(255, 255, 255, 0) 0%), linear-gradient(#4E77F7 50%, rgba(255, 255, 255, 0) 0%)',
          backgroundPosition: 'top, right, bottom, left',
          backgroundSize: '15px 2px, 2px 15px',
          backgroundRepeat: 'repeat-x, repeat-y',
        },
      }),
        matchUtilities(
          {
            row: (value) => ({
              span: value,
            }),
          },
          { values: theme('tabSize') }
        )
    }),
  ],
}