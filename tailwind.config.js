const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}", flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{
        logoColor:"rgb(229, 15, 35)"
      }
    },
  },
  plugins: [flowbite.plugin(),
  ],
}

