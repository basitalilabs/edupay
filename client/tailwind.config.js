/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c3e50',
        accent: '#3498db',
        success: '#27ae60',
        warning: '#e67e22',
        danger: '#e74c3c',
        background: '#f4f6f9',
      }
    },
  },
  plugins: [],
}