<script setup lang="ts">
const props = defineProps<{
  icon: string,
}>()
</script>

<template>
  <div class="tag">
    <svg><use :href="'/sprite.svg#' + props.icon" /></svg>
  </div>
</template>