// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: 'all',   // ✅ Accept any external host
    host: true             // ✅ Makes the server listen on all IPs
  },
  assetsInclude: ['**/*.mp4'], // ✅ Include MP4 files as assets
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep video files in root for easier access
          if (assetInfo.names && assetInfo.names[0] && assetInfo.names[0].endsWith('.mp4')) {
            return '[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})
