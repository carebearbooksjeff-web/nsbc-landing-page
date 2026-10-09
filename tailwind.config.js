/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "nsbc-green": "#3DE03F",
        forest: "#0E2A17",
        ink: "#102016",
        body: "#33443A",
        muted: "#4E5F54",
        mist: "#F1F6F1",
        line: "#E3EBE4",
        "badge-green": {
          DEFAULT: "#DDF8DD",
          text: "#145A1F",
        },
        "badge-amber": {
          DEFAULT: "#FBF0D3",
          text: "#6B4E10",
        },
        amber: "#E9C46A",
        white: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "Arial", "sans-serif"],
        serif: ["var(--font-noto-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};