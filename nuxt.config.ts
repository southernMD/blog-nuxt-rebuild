// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
import ElementPlus from 'unplugin-element-plus/vite'

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxt/image',
  ],
  css: ['@/assets/base.css', 'element-plus/dist/index.css'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          charset: false,
          javascriptEnabled: true,
          // 这样就能全局使用 src/assets/styles/mixins.less 定义的 变量
          additionalData: `@import "${path.resolve('./assets/mixins.less')}";`
        },
      }
    },
    plugins: [
      //@ts-ignore
      ElementPlus(),
    ],
    envDir: '~/env', // 指定env文件夹
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
    }
  },
})