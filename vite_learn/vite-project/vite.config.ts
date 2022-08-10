import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import myPlugin from './src/myPlugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),myPlugin()],
  build: { // 关掉压缩功能
    minify: false
  }
})
