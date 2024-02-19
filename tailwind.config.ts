import type { Config } from 'tailwindcss';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: ['winter', 'dim', 'nord', 'sunset', 'night'],
        darkTheme: 'night',
    },
    plugins: [require('daisyui')],
} satisfies Config;
