/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        slideIn: "slideIn 1s ease-out",
        fadeInOut: "fadeInOut 2s infinite",
        revealText: "revealText 1.5s ease",
      },
    },
  },
  plugins: [],
};
