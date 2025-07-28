<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

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
          <slot />
        </div>
      </OverlayScrollbarsComponent>
    </div>
  </VueFinalModal>
</template>
