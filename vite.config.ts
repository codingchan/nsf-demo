import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 1403,
    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.20.191:6666',
    //     changeOrigin: true
    //   }
    // }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
