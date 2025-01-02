const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("tailwindcss/colors");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "half-black-yellow": `linear-gradient(to right, black 50%, ${colors.yellow[400]} 50%)`,
        "half-black-red": `linear-gradient(to right, black 50%, ${colors.red[600]} 50%)`,
      },
    },
  },
  plugins: [],
});
