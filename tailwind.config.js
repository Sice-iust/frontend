const tailwindcssNesting = require('tailwindcss-nesting');



module.exports = {  
  darkMode:'class',
  content: [  
    "./app/**/*.{js,ts,jsx,tsx,mdx}",  
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",  
    "./components/**/*.{js,ts,jsx,tsx,mdx}",  
    "./src/**/*.{js,ts,jsx,tsx,mdx}",  
  ],  
  theme: {  
    extend: {  
      fontFamily: {  
        vazir: ['Vazirmatn', 'sans-serif'],  
      },   
      colors: {  
        DarkInputField:'#D9D9D9',
        MainOrange: '#F18825',   
      },    
    },  
    screens:{
      'xs':'375px',
      'sm':'640px',
      'md':'768px',
      'lg':'1024px',
      'xl':'1280px',
      '2xl':'1536px',
    },
  },   
  plugins: [
    tailwindcssNesting,
  ],  
};  