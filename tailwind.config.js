/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        'snake-pattern':"url('snake_.png')",
      },
      backgroundColor: {
        'black-40': 'rgba(0,0,0,0.4)',
      },
      gridTemplateColumns: {
        // Define new grid column configurations
        
        '19': 'repeat(19, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        
        // Add more as needed
      },
      gridTemplateRows: {
        // Define new grid row configurations
        '19': 'repeat(19, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '29': 'repeat(22, minmax(0, 1fr))',
        // Add more as needed
      },
      screens: {
        'sm': '500px',
        'md': [
          // Sidebar appears at 768px, so revert to `sm:` styles between 768px
          // and 868px, after which the main content area is wide enough again to
          // apply the `md:` styles.
          {'min': '668px', 'max': '767px'},
          {'min': '868px'}
        ],
        'lg': '1100px',
        'xl': '1400px',
      },
    },
  },
  plugins: [],
}

