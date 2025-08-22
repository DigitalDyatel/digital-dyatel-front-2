<script setup lang="ts">
const model = defineModel()

const onClick = () => {
  model.value = !model.value
}
</script>

<template>
  <div class="checkbox" :class="{'--checked': model}" @click="onClick">
    <div class="checkbox__container">
      <svg><use :href="'/sprite.svg#tick-square-filled'" /></svg>
    </div>
    <div @click.stop>
      <slot />
    </div>
  </div>
</template>