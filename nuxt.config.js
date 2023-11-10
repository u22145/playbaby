require('dotenv').config()
let baseUrl = ''
let appKey = ''
let appSecret = ''
switch (process.env.BASE) {
  case 'dev':
    baseUrl = process.env.DEV_BASE_URL
    appKey = process.env.DEV_APP_KEY
    appSecret = process.env.DEV_APP_SECRET
    break;
  case 'stg':
    baseUrl = process.env.STG_BASE_URL
    appKey = process.env.STG_APP_KEY
    appSecret = process.env.STG_APP_SECRET
    break;
  case 'prd':
    baseUrl = process.env.PRD_BASE_URL
    appKey = process.env.PRD_APP_KEY
    appSecret = process.env.PRD_APP_SECRET
    break;
  default:
    baseUrl = process.env.DEV_BASE_URL
    appKey = process.env.DEV_APP_KEY
    appSecret = process.env.DEV_APP_SECRET
    break;
}
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  ssr: false,
  env: {
    BASE_URL: baseUrl,
    NODE_ENV: process.env.NODE_ENV,
    APP_KEY: appKey,
    APP_SECRET: appSecret
  },
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'PLAY BABY',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1 user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/playbaby.ico' },
      { rel: 'preload', href: "https://test-api.playbabies.net/static/animation/car.svga", as: 'video'},
      { rel: 'preload', href: "https://test-api.playbabies.net/static/animation/520.svga", as: 'video'},
      { rel: 'preload', href: "https://test-api.playbabies.net/static/animation/1314.svga", as: 'video'}
    ],
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: "@/plugins/swiper.js", mode: 'client' },
    { src: "@/plugins/vue-simple-alert.js", mode: 'client' },
    { src: "@/plugins/axios.js", mode: 'client' }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/dotenv'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-lazy-load',
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
        // Web Worker support
        if (isClient) {
          config.module.rules.push({
            test: /\.worker\.js$/,
            use: { loader: 'worker-loader' },
            exclude: /(node_modules)/
          })
        }
  }
}
