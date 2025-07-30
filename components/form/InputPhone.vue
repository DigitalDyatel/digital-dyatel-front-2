<script setup lang="ts">
import type { MaskInputOptions } from "maska"

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const props = withDefaults(defineProps<{
  required?: boolean,
  type?: 'text' | 'password' | 'email',
  placeholder?: string
}>(), {
  required: false,
  type: 'text'
})

const {data: serverTime} = await useAsyncData('server-time', async() => Date.now())

const options = reactive<MaskInputOptions>({
  mask: (value: string) => value.startsWith('8') ? '8 (###) ###-##-##' : '+7 (###) ###-##-##',
  eager: true,
})
</script>

<template>
  <div class="input" :class="{'--required': props.required}">
    <input
        @input="emit('update:modelValue', $event.target.value)"
        ref="inputTemplateRef"
        :type="type"
        autocomplete="off"
        :name="'field-' + serverTime"
        :placeholder="placeholder"
        v-maska="options"
    />
  </div>
</template>