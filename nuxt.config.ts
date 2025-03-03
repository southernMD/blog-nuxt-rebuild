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
    name: 'southernMD',
    description: '南山有壶酒',
    defaultLocale: 'zh-cn',
    // exclude: ['/admin/_components/**'], // 过滤不需要的 url
    cacheMaxAgeSeconds: 24 * 3600, // 缓存时间一天
    autoLastmod: true, // 自动检测每个 URL 的 lastmod 日期
  },
  sitemap: {
    sources: ["/api/sitemap"],
    cacheMaxAgeSeconds: 6 * 60 * 60, //6小时缓存
    autoLastmod: true // 用于爬虫抓取
  },
  nitro: {
    prerender: {
      routes: ["/robots.txt"]
    }
  },
  robots: {
    groups: [
      {
        userAgent: ['*'],
        disallow: ['']
      }
    ]
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