<script setup lang="ts">
const props = withDefaults(defineProps<{
  icon: string,
  asSpan?: boolean
}>(), {
  asSpan: false
})
</script>

<template>
  <span v-if="props.asSpan" class="tag">
    <svg><use :href="'/sprite.svg#' + props.icon" /></svg>
  </span>
  <div v-else class="tag">
    <svg><use :href="'/sprite.svg#' + props.icon" /></svg>
  </div>
</template>