<script setup lang="ts">
const model = defineModel()

const onClick = () => {
  model.value = !model.value
}
</script>

<template>
  <div class="checkbox" :class="{'--checked': model}" @click="onClick">
    <div>
      <svg><use :href="'/sprite.svg#tick-square'" /></svg>
      <svg><use :href="'/sprite.svg#tick-square-filled'" /></svg>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>