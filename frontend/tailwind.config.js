/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        card: "#1e293b",
        accent: "#38bdf8",
        error: "#ef4444",
        success: "#22c55e",
      },
    },
  },
  plugins: [],
};
