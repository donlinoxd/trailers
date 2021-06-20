module.exports = {
  purge: {
    enabled: true,
    content: [
      "./public/**/*.js",
      "./index.html",
      "./movie/**/*.js",
      "./movie/**/*.html",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ["Poppins", "ui-sans-serif"],
      oxygen: ["Oxygen", "ui-sans-serif"],
    },
    extend: {
      backgroundImage: (theme) => ({
        "header-gradient":
          "linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, rgba(17, 17, 17, 0.3) 80%, #111111 100%)",
        "header-gradient-lg":
          "linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, rgba(17, 17, 17, 0.3) 60%, #111111 100%)",
      }),
      colors: {
        "custom-white": "#F4F9FF",
        "custom-blue": "#1E90FF",
        "custom-black": "#111111",
        "custom-light-gray": "#414756",
        "custom-dark-gray": "#2E3135",
        "custom-red": "#FD1717",
      },
      borderWidth: {
        1: "1px",
      },
      spacing: {
        1000: "112.5rem",
        "1000-sm": "184.5rem",
        "full-x5": "500rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
