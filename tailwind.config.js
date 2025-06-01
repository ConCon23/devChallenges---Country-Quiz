/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./resources/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "main-bg": "url('../resources/bg.jpg')",
        "primary-bg-clr": "linear-gradient(#E65895, #BC6BE8)" 
      },
      backgroundColor: {
        "quiz-background": "#343964",
        "quiz-btn-background" : "#393F6E"
      },
      textColor: {
        "primary-txt-clr": "linear-gradient(#E65895, #BC6BE8)",
        "secondary-txt-clr": "#E2E4F3",
      },
      fontFamily: {
        vietnam: ['"Be Vietnam Pro"', 'sans-serif']
      },
      minWidth: {
        'custom': 'clamp(412px, 100%, 1350px)', // this allows responsiveness
      },
      screens: {
        'mobile': '412px',
        'tablet': '1024px',
        'desktop': '1350px'
      }
    },
  },
  plugins: [],
}

