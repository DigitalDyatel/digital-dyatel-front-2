<script setup lang="ts">
import Button from '~/components/Button.vue'
import Modal from '~/components/modals/base/Modal.vue'

const props = withDefaults(defineProps<{
  title?: string,
  content?: string
}>(), {
  title: 'Готово! Спасибо за ваш запрос, мы скоро свяжемся с вами',
  content: 'Наш менеджер скоро свяжется с вами, проконсультируем и ответим на все интересующие вопросы'
})
</script>

<template>
  <Modal class="modal-thank-you" v-slot="slotProps">
    <h4>{{ props.title }}</h4>
    <p>{{ props.content }}</p>
    <Button class="--large" type="submit" @click="slotProps.close()">Вернуться на сайт</Button>
  </Modal>
</template>