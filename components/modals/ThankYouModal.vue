<script setup lang="ts">
import Button from '~/components/Button.vue'
import Modal from '~/components/modals/base/Modal.vue'

const props = defineProps<{
  title: string,
  content: string
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>

<template>
  <Modal class="modal-thank-you" @confirm="emit('confirm')">
    <h4>{{ props.title }}</h4>
    <p>{{ props.content }}</p>
    <Button class="--large" type="submit" @click="emit('confirm')">Вернуться на сайт</Button>
  </Modal>
</template>