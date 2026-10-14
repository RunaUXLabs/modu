import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// base: './' — GitHub Pages 하위 경로에서도 동작하도록 상대 경로 빌드
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@design-system': fileURLToPath(new URL('./src/design-system', import.meta.url)) },
    dedupe: ['react', 'react-dom'],
  },
  base: './',
})
