<script setup lang="ts">
const {data: serverTime} = await useAsyncData('server-time', async() => Date.now())

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const props = withDefaults(defineProps<{
  modelValue?: string,
  required?: boolean,
  type?: 'text' | 'password' | 'email',
  placeholder?: string
}>(), {
  required: false,
  type: 'text'
})
</script>

<template>
  <div class="input" :class="{'--required': props.required}">
    <input @input="emit('update:modelValue', $event.target.value)" :type="type" autocomplete="off" :name="'field-' + serverTime" :placeholder="placeholder">
  </div>
</template>