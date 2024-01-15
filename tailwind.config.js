module.exports = {
  darkMode: 'class',
  whiteModule: 'class',
  content: [
    "./src/Modules/**/*.{js,ts,jsx,tsx}",
    "./src/Core/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {

    extend: {

    },
    addBase: {

    },
    screens: {
      'desktop-sm': {'max': '1224px',},
      'desktop-ultrawide': {'min': '1800px',}

    },

  },
  variants: {
    backgroundColor: ['responsive', 'dark', 'light', 'whiteModule'],
    extend: {
      outline: [],
    },
  },

  plugins: [
    require('flowbite/plugin'),
    require('tailwindcss-themer')({
      defaultTheme: {
        extend: {
          colors: {
            primary: 'red'
          }
        }
      },
      themes: [
       
      ]
    }),




  ]
}