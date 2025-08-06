<script setup lang="ts">
declare const availableTypes: readonly [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'video/webm',
  'video/mp4',
  'application/pdf',
  'application/msword', // '.doc'
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // '.docx'
  'application/vnd.oasis.opendocument.spreadsheet', // '.ods'
  'application/vnd.ms-excel', // '.xls
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'text/markdown',
  'text/plain'
]

type Type = (typeof availableTypes)[number]

const props = withDefaults(defineProps<{
  modelValue?: FileList;
  types: Type[],
  typesLabel: string,
  typesLabelMore?: string,
  maxSize?: number,
  maxCount?: number
}>(), {
  multiple: false,
  maxSize: 10,
  maxCount: 1,
})

const emit = defineEmits<{
  (e: 'update:modelValue', files: FileList): void
}>()

const text = computed(() => {
  if (window.innerWidth < 768) {
    return 'Нажмите, чтобы загрузить файл'
  }

  return 'Перетащите файл' + (props.maxCount > 1 ? 'ы' : '') + ' или загрузите'
})

const dropzoneTemplateRef = useTemplateRef<HTMLInputElement>('dropzoneTemplateRef')

const { fire } = useNotification()

const onClick = () => {
  const inputEl = document.createElement('input')
  inputEl.type = 'file'

  if (props.maxCount > 1) {
    inputEl.multiple = true
  }

  inputEl.addEventListener('change', (e) => {
    if (!e.target.files) {
      return
    }

    handleFiles(e.target.files)
  })

  inputEl.click()
  inputEl.remove()
}

const onInputChange = (e) => {
  if (!e.target.files) {
    return
  }

  handleFiles(e.target.files);
}

const handleFiles = (files: FileList) => {
  let isValid = true
  let errorMessage = null

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!props.types.includes(file.type)) {
      isValid = false
      errorMessage = 'Некорретный тип файла'
    }

    if (props.maxSize * 1024 * 1024 < file.size) {
      isValid = false
      errorMessage = 'Слишком большой файл'
    }
  }

  if (!isValid) {
    fire({ title: errorMessage, blocking: false })
    emit('update:modelValue', undefined)
    return
  }

  emit('update:modelValue', files)
}

const onRemove = (e) => {
  if (!props.modelValue) {
    return
  }

  e.stopImmediatePropagation()
  emit('update:modelValue', undefined)
}

onMounted(() => {
  dropzoneTemplateRef.value.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzoneTemplateRef.value.classList.add('--drag-over')
  });

  dropzoneTemplateRef.value.addEventListener('dragleave', () => {
    dropzoneTemplateRef.value.classList.remove('--drag-over')
  });

  dropzoneTemplateRef.value.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzoneTemplateRef.value.classList.remove('--drag-over')
    handleFiles(e.dataTransfer.files);
  });



  console.log(window.innerWidth)
})
</script>

<template>
  <div class="file-input" :class="{'--filled': props.modelValue}">
    <div class="file-input__flex" ref="dropzoneTemplateRef" @click="onClick">
      <div class="file-input__text">
        <template v-if="props.modelValue">
          Добавлено файлов: {{ props.modelValue.length }}
        </template>
        <template v-else>
          {{ text }}
        </template>
      </div>
      <div class="file-input__btn" @click="onRemove">
        <svg><use :href="'/sprite.svg#plus'" /></svg>
      </div>
    </div>
    <div class="file-input__constraints">
      <svg><use :href="'/sprite.svg#attention'" /></svg>
      <div class="file-input__file-types">{{ props.typesLabel }}</div>
    </div>
    <div class="file-input__constraints-more">
      <div>Разрешенные форматы: {{ props.typesLabelMore ? props.typesLabelMore : props.typesLabel }}</div>
      <div>Максимальный размер файла: {{ props.maxSize }} МБ</div>
      <div>Максимальное количество файлов: {{ props.maxCount }}</div>
    </div>
  </div>
</template>