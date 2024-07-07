import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        interests: resolve(__dirname, 'interests.html'),
      },
    },
    target: 'ES2022'
  },
});
