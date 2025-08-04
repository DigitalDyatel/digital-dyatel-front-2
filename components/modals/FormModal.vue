<script setup lang="ts">
import Input from '~/components/form/Input.vue'
import FileInput from '~/components/form/FileInput.vue'
import Button from '~/components/Button.vue'
import ProcessingPersonalDataAgree from '~/components/form/ProcessingPersonalDataAgree.vue'
import Checkbox from '~/components/form/Checkbox.vue'
import Modal from '~/components/modals/base/Modal.vue'

const props = withDefaults(defineProps<{
  title: string,
  buttonText?: string,
  withFiles?: boolean,
  data?: any
}>(), {
  buttonText: 'Оставить заявку',
  withFiles: false
})

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const { initForm } = useForm()

const formDataFields = [
    'name',
    'phone',
    'email',
    'files',
    {isAgree: true}
]

if (props.withFiles) {
  formDataFields.push('files')
}

const formData = ref(initForm(formDataFields as const))

const onSubmitForm = () => {
  alert('Отправляем запрос')
  emit('confirm')
}
</script>

<template>
  <Modal class="modal-lead" @confirm="emit('confirm')">
    <h4>{{ props.title }}</h4>
    <form class="form">
      <Input placeholder="Имя" v-model="formData.name" />
      <div class="form__group">
        <Input placeholder="Номер телефона" v-model="formData.phone" required />
        <Input placeholder="Email" v-model="formData.email" required />
      </div>
      <FileInput
          v-if="props.withFiles"
          v-model="formData.files"
          types-label="word, excel, pdf"
          types-label-more="doc, docx, xlsx, xls, ods, pdf, md, txt"
          :max-count="2"
          :max-size="10"
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
      <ProcessingPersonalDataAgree />
      <Checkbox class="--contrast" v-model="formData.isAgree"><a target="_blank" href="/docs/consent-to-receive-advertising.pdf">Я согласен получить рекламу и звонки</a></Checkbox>
    </form>
  </Modal>
</template>