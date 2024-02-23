/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pp: {
          primary: {
            25: "#FCFAFF",
            50: "#F9F5FF",
            100: "#F4EBFF",
            200: "#E9D7FE",
            300: "#D6BBFB",
            600: "#7F56D9",
            700: "#6941C6",
          },
          gray: {
            25: "#FCFCFD",
            50: "#F9FAFB",
            100: "#F4F5F9",
            200: "#F5F5F5",
            300: "#D0D5DD",
            400: "#EAECF0",
            500: "#667085",
            600: "#475467",
            700: "#344054",
            800: "#1D2939",
            900: "#101828",
          },
        },
      },
    },
  },
  plugins: [],
};
