import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'node:path'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    sentryVitePlugin({
      org: 'msm-hb',
      project: 'digio',
    }),
    // {
    //   name: 'index-html-env',
    //   async transformIndexHtml() {
    //     if (process.env.NODE_ENV !== 'production') {
    //       return await fs.readFile('index-local.html', 'utf8')
    //     }
    //   }
    // },
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        math: 'always',
        relativeUrls: true,
        javascriptEnabled: true,
      },
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'index.html'),
        master: path.resolve(__dirname, 'src/index.tsx'),
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
})
