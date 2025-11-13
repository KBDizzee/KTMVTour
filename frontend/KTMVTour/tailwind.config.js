/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        button: '#8B5CF6',
        card: '#161220',
        secondary:'#9ca3af',
        post:'#1A1A1A',
        border:'#2d1b69',
        third:'#2A2A2A',
        bg:'#312746',
        fourth:'#231639',
        six: '#230E34',
        fifth:'#2E2443',
        card2:'#161616',
        seven:"#200336",
        border2: "#481870"
      }
    },
  },
  plugins: [],
};