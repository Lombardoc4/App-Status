import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: './runtimeConfig',
                replacement: './runtimeConfig.browser', // ensures browser compatible version of AWS JS SDK is used
            },
        ],
    },
});
