import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist', // this is where Vue will build to
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
