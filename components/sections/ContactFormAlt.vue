<script setup lang="ts">
import Input from '~/components/shared/form/Input.vue'
import InputPhone from '~/components/shared/form/InputPhone.vue'
import Checkbox from '~/components/shared/form/Checkbox.vue'
import ProcessingPersonalDataAgree from '~/components/shared/form/ProcessingPersonalDataAgree.vue'
import Button from '~/components/shared/Button.vue'
import { useModal } from 'vue-final-modal'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'
import apiContacts, {
  type FormDataCreate,
  type FormDataCreateErrors,
  getDefaultFormDataCreate
} from '~/api/contacts'
import { FROM_TRIGGER } from '~/constants'

const errors = ref<FormDataCreateErrors>({} as FormDataCreateErrors)
const formData = ref<FormDataCreate>(getDefaultFormDataCreate(FROM_TRIGGER.CONTACT_FORM_2))

const onSubmit = async () => {

  try {
    await apiContacts().create(formData.value)
  } catch (error) {
    errors.value = error
    return
  }

  errors.value = {} as FormDataCreateErrors
  formData.value = getDefaultFormDataCreate(FROM_TRIGGER.CONTACT_FORM_2)

  await (useModal({component: ThankYouModal})).open()
}
</script>

<template>
  <section class="contact-form-alt">
    <div class="contact-form-alt__container">
      <div class="contact-form-alt__title">Остались вопросы?</div>
      <form>
        <div class="contact-form-alt__group">
          <Input v-model="formData.name" :errors="errors.name" placeholder="Имя"/>
          <InputPhone v-model="formData.phone" :errors="errors.phone" placeholder="Номер телефона" required/>
          <Input v-model="formData.email" :errors="errors.email" placeholder="Email" required/>
        </div>
        <Button class="contact-form-alt__submit-button --large" @click.prevent="onSubmit">Оставить заявку</Button>
      </form>
      <ProcessingPersonalDataAgree />
      <Checkbox v-model="formData.is_agree_to_receive_ads"><a target="_blank" href="/docs/consent-to-receive-advertising.pdf">Я согласен получить рекламу и звонки</a></Checkbox>
      <svg><use :href="'/sprite.svg#circle-star-1'" /></svg>
      <svg><use :href="'/sprite.svg#circle-star-3'" /></svg>
    </div>
  </section>
</template>