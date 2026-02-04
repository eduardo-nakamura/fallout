import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 1. Importe o path

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 2. Defina o símbolo e o caminho absoluto
      '@': path.resolve(__dirname, './src'),
    },
  },
})
