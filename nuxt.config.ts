// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: false,
    strict: false
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  css: ['~/assets/scss/app.scss'],
  modules: ['nuxt-svgo'],
  svgo: {
    global: false,
    autoImportPath: false
  }
})