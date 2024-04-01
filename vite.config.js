import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
  base:"/hello-opencv-filter-browser/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        main_canny: resolve(__dirname, 'canny/index.html'),
        main_manga: resolve(__dirname, 'manga/index.html'),
        main_manga2: resolve(__dirname, 'manga2/index.html'),
      },
    },
  },
})