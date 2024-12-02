import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,          // Set custom port (default is 5173)
    open: true,          // Automatically open in the browser
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Proxy API requests to the backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
