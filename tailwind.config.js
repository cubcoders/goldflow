/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#C7A246",
      },
      fontFamily: {
        sans: ["Montserrat", "Lato", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
        body: ["Lato", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 22px rgba(0,0,0,0.08)",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "2rem",
        lg: "2rem",
        xl: "3rem",
      },
    },
  },
  plugins: [],
}
