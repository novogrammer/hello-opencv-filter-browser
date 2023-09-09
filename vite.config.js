import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
  base:"/hello-opencv-filter-browser/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        main_canny: resolve(__dirname, 'canny/index.html'),
      },
    },
  },
})