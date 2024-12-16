// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
import ElementPlus from 'unplugin-element-plus/vite'


export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s', // %s 表示页面的标题
    },
  },
  router: {
    options: {
      strict: true,
    },
  },
  runtimeConfig:{
    public:{
      baseUrl: process.env.NUXT_PUBLIC_API_BASE,
    }
  },
  site: {
    url: process.env.NUXT_WEB_URL,
  },
  sitemap: {
    cacheMaxAgeSeconds: 6 * 60 * 60, //6小时缓存
    autoLastmod: true // 用于爬虫抓取
  },
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxt/image',
    '@nuxtjs/seo'
  ],
  css: ['~/assets/base.css', 'element-plus/dist/index.css'],
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
        css:{

        }
      }
    },
    plugins: [
      //@ts-ignore
      ElementPlus(),
    ],
    // envDir: '~/env', // 指定env文件夹
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
  },
})