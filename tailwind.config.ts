import type { Config } from 'tailwindcss';
// import forms from '@tailwindcss/forms';

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            white: "#fff",
            darkGray: "#4d4d4d",
            green: "#00C165",
        },
        extend: {
            backgroundImage: {
                bannerImg: "url('/DSCF4415.jpg')"
            },
        },
    },
    plugins: [],
} satisfies Config;
