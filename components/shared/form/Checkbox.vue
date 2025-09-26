<script setup lang="ts">
const model = defineModel()

const props = defineProps<{
  errors?: string[]
}>()

const onClick = () => {
  model.value = !model.value
}
</script>

<template>
  <div class="checkbox" :class="{'--checked': model, '--has-error': props.errors}" @click="onClick">
    <div class="checkbox__wrapper">
      <div class="checkbox__container">
        <svg><use :href="'/sprite.svg#tick-square-filled'" /></svg>
      </div>
      <div class="checkbox__text" @click.stop>
        <slot />
      </div>
    </div>
    <div class="checkbox__error" v-if="props.errors">
      {{ props.errors[0] }}
    </div>
  </div>
</template>