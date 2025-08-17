<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { type Case } from '@/constants'

const modalTemplateRef = useTemplateRef('modalTemplateRef')
const modalContentTemplateRef = useTemplateRef('modalContentTemplateRef')

const modalHeight = ref<'auto' | string>('auto')

const isClosing = ref(false)
const isReady = ref(false)

let ro: ResizeObserver | undefined = undefined

const props = defineProps<{
  case: Case,
  close: () => void,
}>()

const onClickClose = async (e) => {
  if (e.target === e.currentTarget) {
    props.close()
  }
}

const onModalOpen = async () => {
  modalHeight.value = (modalTemplateRef.value.offsetHeight - (modalTemplateRef.value.children[0] as HTMLElement).offsetHeight) + 'px'
  isReady.value = true

  ro = new ResizeObserver(() => {
    modalHeight.value = (modalTemplateRef.value.offsetHeight - (modalTemplateRef.value.children[0] as HTMLElement).offsetHeight) + 'px'
  })
  ro.observe(modalTemplateRef.value)
}

const onModalClosing = async (e) => {
  if (isClosing.value) {
    return
  }

  e.stop()
  ro.disconnect()
  isReady.value = false
  isClosing.value = true

  setTimeout(async () => {
    await props.close()
    isClosing.value = false
  }, 250)
}
</script>

<template>
  <VueFinalModal
      @opened="onModalOpen"
      @before-close="onModalClosing"
      class="modal --right"
      :transition="false"
      :class="{'--ready': isReady}"
  >
    <div class="modal__container" @click="onClickClose">
      <div class="modal__content" ref="modalContentTemplateRef">
        <div class="modal__close" @click="onClickClose">
          <svg><use :href="'/sprite.svg#cross'" /></svg>
        </div>
        <div class="cases-modal" ref="modalTemplateRef">
          <div class="cases-modal__header">
            <div>{{ props.case.category }}</div>
            <div class="cases-modal__header-line">
              <img :src="'/img/cases/' + (props.case.imgSmall ? props.case.imgSmall : props.case.img)" :alt="props.case.header">
              <h3>{{ props.case.header }}</h3>
            </div>
          </div>
          <OverlayScrollbarsComponent class="modal-custom-scroll --right" :style="{height: modalHeight}">
            <div class="cases-modal__content" v-html="props.case.content" /> <!-- Здесь должен быть динамический контент из админки -->
          </OverlayScrollbarsComponent>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>
