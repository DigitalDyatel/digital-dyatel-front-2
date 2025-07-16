<script setup lang="ts">
const {data: serverTime} = await useAsyncData('server-time', async() => Date.now())

const props = withDefaults(defineProps<{
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
    <input :type="type" autocomplete="off" :name="'field-' + serverTime" :placeholder="placeholder">
  </div>
</template>