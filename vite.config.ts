import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { analyzer } from 'vite-bundle-analyzer'
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    analyzer({
      analyzerMode: 'server',
      openAnalyzer: true,
    }),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: true },
      svg: {
        multipass: true,
        plugins: [
          { name: 'preset-default', params: { overrides: { cleanupNumericValues: false } } },
        ],
      },
    })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name ? assetInfo.name.split('.') : ['']
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash].[ext]`
          }
          if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `fonts/[name]-[hash].[ext]`
          }
          return `assets/[name]-[hash].[ext]`
        },
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/lodash') || id.includes('node_modules/date-fns')) {
            return 'utils-vendor'
          }
          if (id.includes('node_modules/@mui') || id.includes('node_modules/antd')) {
            return 'ui-vendor'
          }
        }
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      }
    }
  },

  optimizeDeps: {
    include: ['react', 'react-dom'],
  },



  server: {
    hmr: true,
    watch: {
      usePolling: false,
      ignored: ['**/node_modules', '**/dist']
    }
  }
})