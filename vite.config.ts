import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/src': path.resolve(__dirname, 'src'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/layouts': path.resolve(__dirname, 'src/layouts'),
      '@/lib': path.resolve(__dirname, 'src/lib'),
      '@/routes': path.resolve(__dirname, 'src/routes'),
    },
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    tailwindcss(),
    react()
  ],
})
