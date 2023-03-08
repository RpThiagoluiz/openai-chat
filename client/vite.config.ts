import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// absolute imports precisa instalar @types/node no vite

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Resolver está ajustando o absolute import
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
