/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                backgroundTrivia: "url('/background.svg')",
                backgroundQuiz: "url('/background-quiz.jpg')",
            },
        },
    },
    plugins: [],
};
