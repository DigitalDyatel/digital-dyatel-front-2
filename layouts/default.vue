<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import Menu from '~/components/Menu.vue'
import Footer from '~/components/sections/Footer/index.vue'
</script>

<template>
  <OverlayScrollbarsComponent class="main-custom-scroll">
    <ModalsContainer />
    <Menu />
    <slot />
    <Footer />
    <ToTop />
  </OverlayScrollbarsComponent>
</template>