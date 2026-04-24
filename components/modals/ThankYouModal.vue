<script setup lang="ts">
import Button from '~/components/shared/Button.vue'
import Modal from '~/components/modals/base/Modal.vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const props = withDefaults(defineProps<{
  title?: string,
  content?: string
}>(), {
  title: 'Готово! Мы получили вашу заявку и скоро свяжемся с вами',
  content: 'Наш специалист уточнит детали, проконсультирует и предложит подходящее решение под вашу задачу'
})
</script>

<template>
  <Modal class="modal-thank-you" v-slot="slotProps" @close="emit('close')">
    <h4>{{ props.title }}</h4>
    <p>{{ props.content }}</p>
    <Button class="--large" type="submit" @click="emit('close'); slotProps.close()">Вернуться на сайт</Button>
  </Modal>
</template>