<script setup lang="ts">
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
</script>

<template>
  <OverlayScrollbarsComponent defer class="main-custom-scroll">
    <slot />
  </OverlayScrollbarsComponent>
</template>