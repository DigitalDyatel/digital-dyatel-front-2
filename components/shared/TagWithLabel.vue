<script setup lang="ts">
const props = defineProps<{
  icon: string,
}>()
</script>

<template>
  <div class="tag-with-label">
    <div>
      <slot></slot>
    </div>
    <div>
      <svg><use :href="'/sprite.svg#' + props.icon" /></svg>
    </div>
  </div>
</template>