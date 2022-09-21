/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: colors.indigo,
                neutral: colors.gray,
            },
            backgroundImage: {
                login:  "url('/images/background-login-2.jpg')",
            },
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                "2xl": "128px",
            },
        },
    },
    plugins: [require("@tailwindcss/aspect-ratio")],
};