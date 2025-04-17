module.exports = {  
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
        'custom-bg': '#f5f5f5',   
      },    
    },  
  },   
  plugins: [],  
};  