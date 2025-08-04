<script setup lang="ts">
import Input from '~/components/form/Input.vue'
import InputPhone from '~/components/form/InputPhone.vue'
import Checkbox from '~/components/form/Checkbox.vue'
import ProcessingPersonalDataAgree from '~/components/form/ProcessingPersonalDataAgree.vue'
import { useModal } from 'vue-final-modal'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'

const isAgree = ref(true)

const onSubmit = () => {
  const { open, close } = useModal({
    component: ThankYouModal,
    attrs: {
      title: 'Готово! Спасибо за ваш запрос, мы скоро свяжемся с вами',
      content: 'Наш менеджер скоро свяжется с вами, проконсультируем и ответим на все интересующие вопросы',
      onConfirm: () => {
        close()
      }
    },
  })

  open()
}
</script>

<template>
  <section class="contact-form-alt">
    <div class="contact-form-alt__container">
      <h3>Остались вопросы?</h3>
      <form>
        <div class="contact-form-alt__group">
          <Input placeholder="Имя"/>
          <InputPhone placeholder="Номер телефона" required/>
          <Input placeholder="Email" required/>
        </div>
        <Button class="--large" @click.prevent="onSubmit">Оставить заявку</Button>
      </form>
      <ProcessingPersonalDataAgree />
      <Checkbox v-model="isAgree"><a target="_blank" href="/docs/consent-to-receive-advertising.pdf">Я согласен получить рекламу и звонки</a></Checkbox>
      <svg><use :href="'/sprite.svg#circle-star-1'" /></svg>
      <svg><use :href="'/sprite.svg#circle-star-3'" /></svg>
    </div>
  </section>
</template>