/// <reference types="vite-ssg" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
      dts: 'src/types/components.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // 预渲染阶段要让 Vite 处理 Element Plus，否则 Node 会直接去加载 .css
  ssr: {
    noExternal: ['element-plus'],
  },

  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version ?? '1.0.0'),
  },

  ssgOptions: {
    // 预渲染时使用异步脚本，避免阻塞首屏解析
    script: 'async',
    formatting: 'minify',
    // 只渲染静态路径，动态段交给运行时
    includedRoutes: (paths) => paths.filter((path) => !path.includes(':')),
  },

  build: {
    target: 'es2022',
    cssTarget: 'chrome100',
    chunkSizeWarningLimit: 700,
  },

  server: {
    port: 5173,
    host: true,
  },

  preview: {
    port: 4173,
  },
})
