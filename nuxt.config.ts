// https://nuxt.com/docs/api/configuration/nuxt-config
import config from './config.env.json'

export default defineNuxtConfig({
  experimental: {
    /** @ts-expect-error: Nuxt 3 пишет что такого типа нет, но он есть */
    inlineSSRStyles: false
  },
  runtimeConfig: {
    public: config
  },
  app: {
    head: {
      title: 'Агентство по управлению репутацией в интернете — заказать услуги',
      htmlAttrs: {
        lang: 'ru'
      },
      meta: [
        {
          name: 'description',
          content: 'Управление деловой репутацией в интернете для организации, компаний и бренда от репутационного агентства Digital Dyatel | Заказать услуги по выгодной цене в кратчайшие сроки! Конфиденциально'
        },
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
  modules: [
    'nuxt-svgo',
    'nuxt-swiper',
    'nuxt-toast',
    'v-gsap-nuxt',
    '@vue-final-modal/nuxt'
  ],
  svgo: {
    global: false,
    autoImportPath: false
  },
  vgsap: {
    scroller: '.main-custom-scroll > div:first-child',
    breakpoint: 1024
  }
})