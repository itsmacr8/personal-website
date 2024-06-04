import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                work: resolve(__dirname, 'work.html'),
                interests: resolve(__dirname, 'interests.html'),
            },
        },
        target: 'ES2022'
    },
});
