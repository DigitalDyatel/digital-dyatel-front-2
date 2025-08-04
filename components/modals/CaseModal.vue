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

console.log(props.case)

const onClickClose = async (e) => {
  if (e.target === e.currentTarget) {
    props.close()
  }
}

const onModalOpen = async () => {
  modalHeight.value = (modalTemplateRef.value.offsetHeight - modalTemplateRef.value.children[0].offsetHeight) + 'px'
  isReady.value = true

  ro = new ResizeObserver(() => {
    modalHeight.value = (modalTemplateRef.value.offsetHeight - modalTemplateRef.value.children[0].offsetHeight) + 'px'
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
            <img :src="'/img/cases/' + (props.case.imgSmall ? props.case.imgSmall : props.case.img)" :alt="props.case.header">
            <h3>{{ props.case.header }}</h3>
          </div>
          <OverlayScrollbarsComponent class="modal-custom-scroll --right" :style="{height: modalHeight}">
            <div class="cases-modal__content">
              <!-- здесь должен быть динамический контент из админки -->
              <h4>О клиенте</h4>
              <p>
                Moscow Business Academy — одна из ведущих бизнес-школ СНГ,
                входящая в ТОП-5, активно экспортирует отечественные MBA-программы на международный рынок. Она обучает топ-менеджеров, владельцев бизнеса и управленцев, обеспечивая их знаниями и компетенциями
                для успешного ведения бизнеса
              </p>
              <ul>
                <li>15 Лет на рынке образования</li>
                <li>12 000+ Выпускников по всему миру</li>
                <li>165+ Международных экспертов</li>
              </ul>
              <h5>Бюджет: <span>5 500 000 ₽/год</span></h5>
              <h4>Проблемы</h4>
              <ul class="--classic">
                <li>
                  <div><svg><use :href="'/sprite.svg#play'" /></svg></div>
                  <div>Отсутствие заметного присутствия в поисковой выдаче по брендовым запросам</div>
                </li>
                <li>
                  <div><svg><use :href="'/sprite.svg#play'" /></svg></div>
                  <div>Конкурент, Moscow Business School, занимал лидирующие позиции в поисковой выдаче Яндекс и Google, что значительно затрудняло продвижение бренда и снижало его видимость среди целевой аудитории</div>
                </li>
                <li>
                  <div><svg><use :href="'/sprite.svg#play'" /></svg></div>
                  <div>Необходимость создания позитивного имиджа бренда с нуля и устранения возможных репутационных угроз</div>
                </li>
              </ul>
              <h4>Задача</h4>
              <p>
                Выстроить репутацию бренда с нуля, повысить узнаваемость на российском и международном рынках, а также устранить конкурента — Moscow Business School, который занимал топовые позиции в поисковой выдаче Яндекса и Google по брендовым запросам
              </p>
              <h4>Результат</h4>
              <p>
                Вывели компанию в ТОП-10 выдачи поисковиков по брендовым запросам, вытеснив конкурента. В результате слаженной работы повысили узнаваемость академии на рынке и увеличили органический трафик в несколько раз
                Вывели компанию в ТОП-10 выдачи поисковиков по брендовым запросам, вытеснив конкурента. В результате слаженной работы повысили узнаваемость академии на рынке и увеличили органический трафик в несколько раз
                Вывели компанию в ТОП-10 выдачи поисковиков по брендовым запросам, вытеснив конкурента. В результате слаженной работы повысили узнаваемость академии на рынке и увеличили органический трафик в несколько раз
                Вывели компанию в ТОП-10 выдачи поисковиков по брендовым запросам, вытеснив конкурента. В результате слаженной работы повысили узнаваемость академии на рынке и увеличили органический трафик в несколько раз
                Вывели компанию в ТОП-10 выдачи поисковиков по брендовым запросам, вытеснив конкурента. В результате слаженной работы повысили узнаваемость академии на рынке и увеличили органический трафик в несколько раз
              </p>
            </div>
          </OverlayScrollbarsComponent>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>
