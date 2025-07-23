<script setup lang="ts">
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import Menu from '../components/Menu.vue'
</script>

<template>
  <OverlayScrollbarsComponent defer class="main-custom-scroll">
    <Menu />
    <slot />
  </OverlayScrollbarsComponent>
</template>