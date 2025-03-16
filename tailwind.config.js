/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/**/*.{html,js,jsx,ts,tsx}", // Scans all files under src, including components/login/login.tsx

  ],
  theme: {
    extend: {
      colors: {
        MainOrange: "#FF8C00", // Example custom color
      },
    },
  },
  plugins: [],
};
