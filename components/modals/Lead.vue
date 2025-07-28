<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import Input from '~/components/form/Input.vue'
import FileInput from '~/components/form/FileInput.vue'
import Button from '~/components/Button.vue'
import ProcessingPersonalDataAgree from '../form/ProcessingPersonalDataAgree.vue'
import Checkbox from '../form/Checkbox.vue'

const { initForm } = useForm()

const formData = ref(initForm([
    'name',
    'phone',
    'email',
    'files',
    {isAgree: true}
] as const))

const props = defineProps<{
  title: string,
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const onSubmitForm = () => {
  alert('Отправляем запрос')
  emit('confirm')
}

const onClickClose = (e) => {
  if (e.target === e.currentTarget) {
    emit('confirm')
  }
}
</script>

<template>
  <VueFinalModal
      class="modal"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
  >
    <div class="modal__container" @click="onClickClose">
      <div class="modal__close" @click="onClickClose">
        <svg><use :href="'/sprite.svg#cross'" /></svg>
      </div>
      <OverlayScrollbarsComponent class="modal-custom-scroll">
        <div class="modal__content">
            <h4>{{ props.title }}</h4>
            <form class="form">
              <Input placeholder="Имя" v-model="formData.name" />
              <div class="form__group">
                <Input placeholder="Номер телефона" v-model="formData.phone" />
                <Input placeholder="Email" v-model="formData.email" />
              </div>
              <FileInput
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
              <Button class="--large" type="submit" @click.prevent="onSubmitForm">Оставить заявку</Button>
              <ProcessingPersonalDataAgree />
              <Checkbox class="--contrast" v-model="formData.isAgree"><a target="_blank" href="/docs/consent-to-receive-advertising.pdf">Я согласен получить рекламу и звонки</a></Checkbox>
            </form>
        </div>
      </OverlayScrollbarsComponent>
    </div>
  </VueFinalModal>
</template>