<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import Menu from '~/components/Menu.vue'
import Footer from '~/components/sections/Footer/index.vue'

const scrollTemplateRef = useTemplateRef<typeof OverlayScrollbarsComponent>('scrollTemplateRef')

const onInit = () => {
  scrollTemplateRef.value.getElement().children[0].focus()
}
</script>

<template>
  <OverlayScrollbarsComponent class="main-custom-scroll" @os-initialized="onInit" ref="scrollTemplateRef">
    <ModalsContainer />
    <Menu />
    <slot />
    <Footer />
    <ToTop />
  </OverlayScrollbarsComponent>
</template>