/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF7F0",
          100: "#FFEEE1",
          300: "#FFB76B",
          500: "#FF8A00", // Lalamove-like orange
          600: "#E67C00",
          700: "#CC6B00"
        },
        neutral: {
          50: "#FBFBFC",
          100: "#F3F4F6",
          300: "#E5E7EB",
          500: "#6B7280",
          700: "#374151",
          900: "#111827"
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#FAFAFB"
        }
      },
      boxShadow: {
        soft: "0 6px 20px rgba(16,24,40,0.08)",
        card: "0 2px 8px rgba(0,0,0,0.05)"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
