import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// GitHub Pagesのベースパスを設定
const base = process.env.GITHUB_PAGES 
  ? '/typing-practice-jp/' // リポジトリ名を変更
  : '/'

export default defineConfig({
  plugins: [react()],
  base: base,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
}) 