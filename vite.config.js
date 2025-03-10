import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // ✅ Backend runs on port 3000
    },
  },
});
