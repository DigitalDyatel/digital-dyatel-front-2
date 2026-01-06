<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import Input from '~/components/shared/form/Input.vue'
import Checkbox from '~/components/shared/form/Checkbox.vue'
import ProcessingPersonalDataAgree from '~/components/shared/form/ProcessingPersonalDataAgree.vue'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'
import InputPhone from '~/components/shared/form/InputPhone.vue'
import Button from '~/components/shared/Button.vue'
import Tag from '~/components/shared/Tag.vue'
import apiContacts, {
  type FormDataCreate,
  type FormDataCreateErrors,
  getDefaultFormDataCreate
} from '~/api/contacts'
import { FROM_TRIGGER } from '~/constants'

const errors = ref<FormDataCreateErrors>({} as FormDataCreateErrors)
const formData = ref<FormDataCreate>(getDefaultFormDataCreate(FROM_TRIGGER.CONTACT_FORM_1))
const { reachGoal } = useYandexMetrika()

const onSubmit = async () => {

  try {
    await apiContacts().create(formData.value)
  } catch (error) {
    errors.value = error
    return
  }

  errors.value = {} as FormDataCreateErrors
  formData.value = getDefaultFormDataCreate(FROM_TRIGGER.CONTACT_FORM_1)

  await (useModal({component: ThankYouModal})).open()
  reachGoal('open-form__set-a-lid')
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
        <ProcessingPersonalDataAgree button-text="Заказать консультацию" />
        <Checkbox :errors="errors.is_agree_to_personal_data_processing" v-model="formData.is_agree_to_personal_data_processing">
          Соглашаюсь с <a target="_blank" href="/docs/personal-data-processing-policy.pdf">Политикой обработки персональных данных</a> и даю <a target="_blank" href="/docs/consent-to-personal-data-processing.pdf">Согласие на обработку персональных данных</a>
        </Checkbox>
        <Checkbox :errors="errors.is_agree_to_receive_ads" v-model="formData.is_agree_to_receive_ads">
          Даю <a target="_blank" href="/docs/consent-to-receive-advertising.pdf">Согласие на рекламу и обработку персональных данных в целях рекламной рассылки</a>
        </Checkbox>
      </form>
    </div>
    <svg><use :href="'/sprite.svg#circle-star-1'" /></svg>
    <svg><use :href="'/sprite.svg#circle-star-2'" /></svg>
  </section>
</template>