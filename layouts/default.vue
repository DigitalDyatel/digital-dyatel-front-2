<script setup lang="ts">
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import Menu from '../components/Menu.vue'
</script>

<template>
  <OverlayScrollbarsComponent class="main-custom-scroll">
    <Menu />
    <slot />
    <ToTop />
  </OverlayScrollbarsComponent>
</template>