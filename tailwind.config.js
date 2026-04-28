/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1', // Indigo
          light: '#818cf8',
          dark: '#4f46e5',
        },
        secondary: '#f8fafc',
        accent: '#f472b6', // Pink accent
        success: '#22c55e',
        danger: '#ef4444',
        warning: '#f59e0b',
        muted: '#64748b',
        background: '#ffffff',
        surface: '#f1f5f9',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
}