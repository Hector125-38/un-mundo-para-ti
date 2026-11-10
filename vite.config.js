import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/un-mundo-para-ti/',
  plugins: [react()],
})
