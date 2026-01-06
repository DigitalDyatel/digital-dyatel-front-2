<script setup lang="ts">
const props = defineProps<{
  buttonText: string
}>()
</script>

<template>
  <p class="processing-personal-data-agree">Нажимая на кнопку «{{ props.buttonText }}», я: </p>
</template>