<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import Input from '~/components/form/Input.vue'
import Checkbox from '~/components/form/Checkbox.vue'
import ProcessingPersonalDataAgree from '~/components/form/ProcessingPersonalDataAgree.vue'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'
import InputPhone from '~/components/form/InputPhone.vue'
import apiContacts, { type FormDataCreate} from '~/api/contacts'
import { FROM_TRIGGER } from '~/constants'

type FormDataFieldsErrors = {
  [K in keyof FormDataCreate]: string[]
}

const errors = ref<FormDataFieldsErrors>({} as FormDataFieldsErrors)

const formData = ref<FormDataCreate>({
  name: undefined,
  phone: undefined,
  email: undefined,
  is_agree_to_receive_ads: true,
  from_trigger: FROM_TRIGGER.CONTACT_FORM_1
})

const onSubmit = async () => {

  try {
    await apiContacts().create(formData.value)
  } catch (error) {
    errors.value = error
    return
  }

  errors.value = {} as FormDataFieldsErrors
  formData.value = {} as FormDataCreate

  await (useModal({component: ThankYouModal})).open()
}
</script>

<template>
  <section class="contact-form">
    <Tag icon="archive-tick" />
    <div class="contact-form__container">
      <div>
        <p class="contact-form__title">
          <span>Оставьте заявку — </span>
          <span>мы свяжемся с вами</span>
        </p>
        <p class="contact-form__subtitle">
          <span>Расскажем, как работать с репутацией,</span>
          <span>покажем наши успешные кейсы</span>
          <span>и предложим индивидуальное решение</span>
        </p>
      </div>
      <form autocomplete="off">
        <Input :errors="errors.name" v-model="formData.name" placeholder="Имя" />
        <div class="contact-form__group input__group">
          <InputPhone :errors="errors.phone" v-model="formData.phone" placeholder="Номер телефона" required />
          <Input :errors="errors.email" v-model="formData.email" placeholder="Email" type="email" required />
        </div>
        <Button class="--large" type="submit" @click.prevent="onSubmit">Заказать консультацию</Button>
        <ProcessingPersonalDataAgree />
        <Checkbox v-model="formData.is_agree_to_receive_ads"><a target="_blank" href="/docs/consent-to-receive-advertising.pdf">Я согласен получить рекламу и звонки</a></Checkbox>
      </form>
    </div>
    <svg><use :href="'/sprite.svg#circle-star-1'" /></svg>
    <svg><use :href="'/sprite.svg#circle-star-2'" /></svg>
  </section>
</template>