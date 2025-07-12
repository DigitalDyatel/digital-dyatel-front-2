<script setup lang="ts">
const props = defineProps<{
  icon: string,
  link: string,
}>()
</script>

<template>
  <a class="link" :href="props.link">
    <span><slot /></span>
    <span>
      <svg><use :href="'/sprite.svg#' + props.icon" /></svg>
    </span>
  </a>
</template>