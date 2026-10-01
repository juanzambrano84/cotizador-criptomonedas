import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Intercepta las peticiones que empiecen con /api-crypto
      '/api-crypto': {
        target: 'https://min-api.cryptocompare.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-crypto/, '')
      }
    }
  }
})