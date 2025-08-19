<script setup lang="ts">
import Input from '~/components/form/Input.vue'
import FileInput from '~/components/form/FileInput.vue'
import Button from '~/components/Button.vue'
import ProcessingPersonalDataAgree from '~/components/form/ProcessingPersonalDataAgree.vue'
import Checkbox from '~/components/form/Checkbox.vue'
import Modal from '~/components/modals/base/Modal.vue'
import InputPhone from '~/components/form/InputPhone.vue'
import { default as apiContacts, type FormDataCreate} from '~/api/contacts'

type FormDataFieldsErrors = {
  [K in keyof FormDataCreate]: string[]
}

const errors = ref<FormDataFieldsErrors>({} as FormDataFieldsErrors)

const props = withDefaults(defineProps<{
  title: string,
  fromTrigger: string,
  buttonText?: string,
  withFiles?: boolean,
  data?: any
}>(), {
  buttonText: 'Оставить заявку',
  withFiles: true
})

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const formDataFields: FormDataCreate = {
  name: undefined,
  phone: undefined,
  email: undefined,
  is_agree_to_receive_ads: true,
  from_trigger: props.fromTrigger
}

if (props.withFiles) {
  formDataFields['files'] = undefined
}

const formData = ref(formDataFields)

const onSubmitForm = async () => {
  try {
    const contacts = new apiContacts
    await contacts.create(formData.value)

  } catch (error) {
    errors.value = error
    return
  }

  emit('confirm')
}
</script>

<template>
  <Modal class="modal-lead" @confirm="emit('confirm')">
    <h4>{{ props.title }}</h4>
    <form class="form">
      <Input :errors="errors.name" class="--light" placeholder="Имя" v-model="formData.name"/>
      <div class="form__group">
        <InputPhone :errors="errors.phone" class="--light" placeholder="Номер телефона" v-model="formData.phone" required/>
        <Input :errors="errors.email" class="--light" placeholder="Email" v-model="formData.email" required/>
      </div>
      <FileInput
          class="--light"
          v-if="props.withFiles"
          v-model="formData.files"
          types-label="word, excel, pdf"
          types-label-more="doc, docx, xlsx, xls, ods, pdf, md, txt"
          :max-count="2"
          :max-size="10"
          :errors="errors.files"
          :types="[
            'application/pdf',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword',
            'application/vnd.oasis.opendocument.spreadsheet',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/markdown',
            'text/plain'
          ]"
      />
      <Button class="--large" type="submit" @click.prevent="onSubmitForm">{{ props.buttonText }}</Button>
      <ProcessingPersonalDataAgree/>
      <Checkbox class="--contrast" v-model="formData.is_agree_to_receive_ads">
        <a target="_blank" href="/docs/consent-to-receive-advertising.pdf">Я согласен получить рекламу и звонки</a>
      </Checkbox>
    </form>
  </Modal>
</template>