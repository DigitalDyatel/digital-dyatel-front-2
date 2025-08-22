<script setup lang="ts">
import type { MaskInputOptions } from "maska"

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const props = withDefaults(defineProps<{
  modelValue?: string,
  required?: boolean,
  type?: 'text' | 'password' | 'email',
  placeholder?: string,
  errors?: string[]
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
  <div class="input" :class="{'--required': props.required, '--has-error': props.errors}">
    <input
        :value="props.modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        ref="inputTemplateRef"
        :type="type"
        autocomplete="off"
        :name="'field-' + serverTime"
        :placeholder="placeholder"
        v-maska="options"
    />
    <div v-if="props.errors" class="input__error">
      <span>{{ props.errors[0] }}</span>
    </div>
  </div>
</template>