<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import Input from '~/components/form/Input.vue'
import Checkbox from '~/components/form/Checkbox.vue'
import ProcessingPersonalDataAgree from '~/components/form/ProcessingPersonalDataAgree.vue'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'
import InputPhone from '~/components/form/InputPhone.vue'

const { initForm } = useForm()

const formData = ref(initForm([
  'name',
  'phone',
  'email',
  {isAgree: true}
] as const))

const onSubmit = () => {
  (useModal({component: ThankYouModal})).open()
}
</script>

<template>
  <section class="contact-form">
    <div class="contact-form__container">
      <div>
        <h3>
          <span>Оставьте заявку — </span>
          <span>Мы свяжемся с вами</span>
        </h3>
        <p class="contact-form__subtitle">
          <span>Расскажем, как работать с репутацией,</span>
          <span>покажем наши успешные кейсы</span>
          <span>и предложим индивидуальное решение</span>
        </p>
      </div>
      <form autocomplete="off">
        <Input v-model="formData.name" placeholder="Имя" />
        <div class="contact-form__group input__group">
          <InputPhone v-model="formData.phone" placeholder="Номер телефона" required />
          <Input v-model="formData.email" placeholder="Email" type="email" required />
        </div>
        <Button class="--large" type="submit" @click.prevent="onSubmit">Заказать консультацию</Button>
        <ProcessingPersonalDataAgree />
        <Checkbox v-model="formData.isAgree"><a target="_blank" href="/docs/consent-to-receive-advertising.pdf">Я согласен получить рекламу и звонки</a></Checkbox>
      </form>
    </div>
    <svg><use :href="'/sprite.svg#circle-star-1'" /></svg>
    <svg><use :href="'/sprite.svg#circle-star-2'" /></svg>
  </section>
</template>