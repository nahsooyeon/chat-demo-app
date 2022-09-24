module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondaryWhite: "#f7faf9",
        gray: "#8f9194",
        borderGray: "#DAE1E6",
        darkGray: "#747474",
        darkerGray: "#484B61",
        lightGray: "#949fa4",
        block: "#202020",
        primary: "#4bc8a8",
        orange: "#ffa724",
        secondary: "#17a37f",
        tertiary: "#e8fff6",
        danger: "#e12343",
        csbanner: "#1a9176",
        helpline: "#334650",
        footer: "#eaeef3",
        bgDark: "#1F222C",
        bgSecondaryGreen: "#e8fff6",
        bgOrange: "#FFEDC9",
        bgGray: "#e2e2e2",
        darkBorder: "#2e313a",
        yellow: "#ffea5e",
      },
    },
  },
  plugins: [
    require("postcss"),
    require("tailwindcss"),
    require("autoprefixer"),
    require("tailwind-scrollbar-hide"),
  ],
};
