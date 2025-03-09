/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // メインカラー（緑系）
        primary: {
          50: "#f1f8e9",
          100: "#dcedc8",
          200: "#c5e1a5",
          300: "#aed581",
          400: "#9ccc65",
          500: "#8bc34a",
          600: "#7cb342",
          700: "#689f38",
          800: "#558b2f",
          900: "#33691e",
          950: "#2a6d3c",
        },
        // アクセントカラー
        accent: {
          line: "#00b900", // LINE
          popular: "#ff9800", // 人気ランキング
          mania: "#1976d2", // マニア向けランキング
        },
        // 背景色
        background: {
          light: "#f8faf7",
          card: "#ffffff",
          highlight: "#e8f5e9",
        },
        // テキスト
        text: {
          primary: "#333333",
          secondary: "#555555",
          light: "#777777",
        },
      },
      fontFamily: {
        sans: ['"Hiragino Kaku Gothic ProN"', '"Noto Sans JP"', "sans-serif"],
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        card: "0 2px 10px rgba(0, 0, 0, 0.05)",
        button: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
