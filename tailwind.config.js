/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#13ebc7",
        secondary: "#111817",
        muted: "#618983",
        background: "#f0f4f4",
      },
      fontFamily: {
        sans: ['"Spline Sans"', '"Noto Sans"', "sans-serif"],
        julius: ['"Julius Sans One"', "sans-serif"],
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
    },
  },
  plugins: [],
};

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
