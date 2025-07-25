// https://nuxt.com/docs/api/configuration/nuxt-config
import config from './config.env.json'

export default defineNuxtConfig({
  runtimeConfig: {
    public: config
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, user-scalable=0',
        }
      ]
    }
  },
  typescript: {
    typeCheck: true,
    strict: false
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  css: ['~/assets/scss/app.scss'],
  modules: ['nuxt-svgo', 'nuxt-swiper', 'nuxt-toast', 'v-gsap-nuxt'],
  svgo: {
    global: false,
    autoImportPath: false
  },
  vgsap: {
    scroller: '.main-custom-scroll > div:first-child'
  }
})