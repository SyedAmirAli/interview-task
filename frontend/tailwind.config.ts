import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "#545cff",
                black: "#1f2246",
            },
            keyframes: {
                gradientMove: {
                    "0%": { backgroundPosition: "0% 50%" },
                    "100%": { backgroundPosition: "1600px 50%" },
                },
            },
            animation: {
                gradientMove: "gradientMove 3s linear infinite forwards",
            },
            fontFamily: {
                poppins: "var(--fonts-poppins), sans-serif",
                onest: "var(--fonts-onest), sans-serif",
            },
            transitionTimingFunction: {
                spring: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
        },
    },
    plugins: [],
};

export default config;
