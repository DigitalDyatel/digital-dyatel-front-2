<script setup lang="ts">
import { onMounted } from 'vue'
import {
  categories as _categories,
  FROM_TRIGGER
} from '~/constants'
import Button from '~/components/shared/Button.vue'
import { useModal } from 'vue-final-modal'
import FormModal from '~/components/modals/FormModal.vue'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'
import ActiveCategoryMobile from '~/components/sections/Cases/ActiveCategoryMobile.vue'
import ActiveCategoryDesktop from '~/components/sections/Cases/ActiveCategoryDesktop.vue'

let progressBarTrackWidth: number | undefined = undefined
let ro: ResizeObserver | undefined = undefined
let roPrevWidth = 0;

const translateX = ref(0)
let gap = 24

const progressBarTrackTemplateRef = useTemplateRef<HTMLDivElement>('progressBarTrackTemplateRef')
const progressBarSliderTemplateRef = useTemplateRef<HTMLDivElement>('progressBarSliderTemplateRef')

const categoriesContainerTemplateRef = useTemplateRef<HTMLDivElement>('categoriesContainerTemplateRef')
const categoriesTemplateRef = useTemplateRef<HTMLDivElement[]>('categoriesTemplateRef')

const categories = ref(_categories)

const activeCategoryIndex = ref(0)
const activeCaseIndex = ref(0)

const isMobile = ref(false)

const setCategory = (i: number) => {
  activeCategoryIndex.value = i
  updateDimensions(i)
}

const onClickPrevCategory = () => {
  if (activeCategoryIndex.value === 0) {
    return
  }

  activeCategoryIndex.value = --activeCategoryIndex.value
  updateDimensions(activeCategoryIndex.value)
}

const onClickNextCategory = () => {
  if (activeCategoryIndex.value === (categories.value.length - 1)) {
    return
  }

  activeCategoryIndex.value = ++activeCategoryIndex.value
  updateDimensions(activeCategoryIndex.value)
}

const updateDimensions = (index: number) => {
  progressBarSliderTemplateRef.value!.style.width = (progressBarTrackWidth! / categories.value.length * (index + 1)) + 'px'

  let totalWidth = 0

  for (let i = 0; i < index; i++) {
    totalWidth += categoriesTemplateRef.value![i].getBoundingClientRect().width + gap
  }

  translateX.value = totalWidth * -1
}

const openFormModal = () => {

  const { open, close } = useModal({
    component: FormModal,
    attrs: {
      title: 'Получить консультацию прямо сейчас!',
      fromTrigger: FROM_TRIGGER.CASES,
      onConfirm: () => {
        close()

        const thankYouModal = useModal({component: ThankYouModal})
        thankYouModal.open()
      },
    },
  })

  open()
}

const updateProgressBarTrackWidth = () => {
  progressBarSliderTemplateRef.value.style.transition = 'none'
  progressBarSliderTemplateRef.value!.style.width = (progressBarTrackWidth! / categories.value.length * (activeCategoryIndex.value + 1)) + 'px'
  progressBarTrackWidth = progressBarTrackTemplateRef.value!.getBoundingClientRect().width
  progressBarSliderTemplateRef.value.style.transition = 'width .5s ease-in-out'
}

onMounted(async () => {

  ro = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    const width = entries[0].borderBoxSize?.[0].inlineSize;

    if (typeof width !== 'number' || width === roPrevWidth) {
      return
    }

    roPrevWidth = width

    updateProgressBarTrackWidth()
  })
  ro.observe(document.documentElement)

  updateProgressBarTrackWidth()

  if (window.innerWidth < 1024) {
    isMobile.value = true
    gap = 8
    await nextTick()
  }

  setCategory(0)
})

onUnmounted(() => {
  ro?.disconnect()
})
</script>

<template>
  <section class="cases">
    <h2>Нам доверили свою репутацию</h2>
    <p>
      <span>Мы помогаем компаниям выстраивать, защищать и улучшать репутацию в интернете.</span>
      <span>Вот несколько примеров, как мы достигли результатов</span>
    </p>
    <div class="cases__container">
      <div class="cases__header-container">
        <div class="cases__categories-container">
          <div class="cases__categories" ref="categoriesContainerTemplateRef" :style="{transform: 'translateX(' + translateX + 'px)'}">
            <div ref="categoriesTemplateRef" v-for="(category, i) in categories" :class="{'--active': i === activeCategoryIndex}" @click="setCategory(i)">
              {{ category.title }}
            </div>
          </div>
        </div>
        <div class="cases__progress-bar-container">
          <div class="cases__progress-bar">
            <div class="cases__progress-bar-track" ref="progressBarTrackTemplateRef"></div>
            <div class="cases__progress-bar-slider" ref="progressBarSliderTemplateRef"></div>
          </div>
          <div class="cases__progress-bar-controls">
            <div @click="onClickPrevCategory" :class="{'--disabled': activeCategoryIndex === 0}"><svg><use :href="'/sprite.svg#chevron-left'" /></svg></div>
            <div @click="onClickNextCategory" :class="{'--disabled': activeCategoryIndex === categories.length - 1}"><svg><use :href="'/sprite.svg#chevron-right'" /></svg></div>
          </div>
        </div>
      </div>
      <div class="cases__active-category-container">
        <ActiveCategoryMobile
            v-if="isMobile"
            v-model="activeCaseIndex"
            :active-category-index="activeCategoryIndex"
        />
        <ActiveCategoryDesktop
            v-else
            :active-category-index="activeCategoryIndex"
        />
      </div>
      <div class="cases__footer">
        <div class="cases__button-container">
          <Button class="--large --tertiary">Все кейсы</Button>
          <Button class="--large" @click="openFormModal">Хочу также</Button>
        </div>
        <p>
          <span>Полное раскрытие кейсов недопустимо политикой нашей компании,</span>
          <span>работа с клиентами надежно защищена рамками NDA</span>
        </p>
      </div>
    </div>
  </section>
</template>