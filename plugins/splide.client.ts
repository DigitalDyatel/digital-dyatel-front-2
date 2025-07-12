import VueSplide from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(VueSplide)
})