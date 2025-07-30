<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import Input from '~/components/form/Input.vue'
import Checkbox from '~/components/form/Checkbox.vue'
import ProcessingPersonalDataAgree from '~/components/form/ProcessingPersonalDataAgree.vue'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'
import InputPhone from '~/components/form/InputPhone.vue'

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

const isAgree = ref(true)

const onSubmit = () => {
  open()
}
</script>

<template>
  <section class="contact-form">
    <div class="contact-form__container">
      <div>
        <h3>
          <span>Оставьте заявку —</span>
          <span>Мы свяжемся с вами</span>
        </h3>
        <p class="contact-form__subtitle">
          <span>Расскажем, как работать с репутацией,</span>
          <span>покажем наши успешные кейсы</span>
          <span>и предложим индивидуальное решение</span>
        </p>
      </div>
      <form autocomplete="off">
        <Input placeholder="Имя" />
        <div class="contact-form__group input__group">
          <InputPhone placeholder="Номер телефона" required />
          <Input placeholder="Email" required />
        </div>
        <Button class="--large" type="submit" @click.prevent="onSubmit">Заказать консультацию</Button>
        <ProcessingPersonalDataAgree />
        <Checkbox v-model="isAgree"><a target="_blank" href="/docs/consent-to-receive-advertising.pdf">Я согласен получить рекламу и звонки</a></Checkbox>
      </form>
    </div>
    <svg><use :href="'/sprite.svg#circle-star-1'" /></svg>
    <svg><use :href="'/sprite.svg#circle-star-2'" /></svg>
  </section>
</template>