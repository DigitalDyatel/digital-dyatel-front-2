<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <VueFinalModal
      class="modal"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
      @closed="emit('close')"
  >
    <template #default="{ close }">
      <div class="modal__container" @click="(e) => e.target === e.currentTarget && close()">
        <div class="modal__close" @click="(e) => e.target === e.currentTarget && close()">
          <svg><use :href="'/sprite.svg#cross'" /></svg>
        </div>
        <OverlayScrollbarsComponent class="modal-custom-scroll">
          <div class="modal__content">
            <slot :close=close />
          </div>
        </OverlayScrollbarsComponent>
      </div>
    </template>
  </VueFinalModal>
</template>
