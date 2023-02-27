import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'ws://localhost:3001/api/',
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
