// npm i @types/node -D
import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


const root =  resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'public')
// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [react()],
  build:{
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        statistics: resolve(root, 'statistics','index.html'),
        logs: resolve(root, 'logs','index.html'),
      }
    }
  }
})
