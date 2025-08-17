<script setup lang="ts">
import type { SwiperContainer } from 'swiper/element'
import { onMounted } from 'vue'
import { desktopCategories as _desktopCategories, categories as _categories, type Case } from '~/constants'
import Button from '~/components/Button.vue'
import { useModal } from 'vue-final-modal'
import CaseModal from '~/components/modals/CaseModal.vue'
import FormModal from '~/components/modals/FormModal.vue'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'

let progressBarTrackWidth: number | undefined = undefined

const translateX = ref(0)
let gap = 24

const progressBarTrackTemplateRef = useTemplateRef<HTMLDivElement>('progressBarTrackTemplateRef')
const progressBarSliderTemplateRef = useTemplateRef<HTMLDivElement>('progressBarSliderTemplateRef')

const categoriesContainerTemplateRef = useTemplateRef<HTMLDivElement>('categoriesContainerTemplateRef')
const categoriesTemplateRef = useTemplateRef<HTMLDivElement[]>('categoriesTemplateRef')
const swiperContainerTemplateRef = useTemplateRef<SwiperContainer>('swiperContainerTemplateRef')

const desktopCategories = ref(_desktopCategories)
const categories = ref(_categories)

const activeCategoryIndex = ref(0)
const activeCaseIndex = ref(0)
const isMobile = ref(false)

const setCategory = (i: number) => {
  activeCategoryIndex.value = i

  if (isMobile) {
    activeCaseIndex.value = 0
    swiperContainerTemplateRef.value?.swiper.slideTo(0, 0)
  }

  updateDimensions(i)
}

const onClickPrevCategory = () => {
  if (activeCategoryIndex.value === 0) {
    return
  }

  if (isMobile) {
    activeCaseIndex.value = 0
    swiperContainerTemplateRef.value?.swiper.slideTo(0, 0)
  }

  activeCategoryIndex.value = --activeCategoryIndex.value
  updateDimensions(activeCategoryIndex.value)
}

const onClickNextCategory = () => {
  if (activeCategoryIndex.value === (categories.value.length - 1)) {
    return
  }

  if (isMobile) {
    activeCaseIndex.value = 0
    swiperContainerTemplateRef.value?.swiper.slideTo(0, 0)
  }

  activeCategoryIndex.value = ++activeCategoryIndex.value
  updateDimensions(activeCategoryIndex.value)
}

const onClickPrevCase = () => {
  if (activeCaseIndex.value === 0) {
    return
  }

  swiperContainerTemplateRef.value.swiper.slideTo(--activeCaseIndex.value)
  activeCaseIndex.value = activeCaseIndex.value
}

const onClickNextCase = () => {
  if (activeCaseIndex.value === (categories.value[activeCategoryIndex.value].cases.length - 1)) {
    return
  }

  swiperContainerTemplateRef.value.swiper.slideTo(++activeCaseIndex.value)
  activeCaseIndex.value = activeCaseIndex.value
}

const onCaseChanged = () => {
  activeCaseIndex.value = swiperContainerTemplateRef.value.swiper.activeIndex
}

const updateDimensions = (index: number) => {
  progressBarSliderTemplateRef.value!.style.width = (progressBarTrackWidth! / categories.value.length * (index + 1)) + 'px'

  let totalWidth = 0

  for (let i = 0; i < index; i++) {
    totalWidth += categoriesTemplateRef.value![i].getBoundingClientRect().width + gap
  }

  translateX.value = totalWidth * -1
}

const openCaseModal = (_case: Case) => {

  const { open, close } = useModal({
    component: CaseModal,
    attrs: {
      case: _case,
      close: () => {
        close()
      },
    },
  })

  open()
}

const openFormModal = () => {

  const { open, close } = useModal({
    component: FormModal,
    attrs: {
      title: 'Получить консультацию прямо сейчас!',
      onConfirm: () => {
        close()

        const thankYouModal = useModal({component: ThankYouModal})
        thankYouModal.open()
      },
    },
  })

  open()
}

onMounted(async () => {

  progressBarTrackWidth = progressBarTrackTemplateRef.value!.getBoundingClientRect().width

  if (window.innerWidth < 768) {
    isMobile.value = true
    gap = 8
    await nextTick()
  }

  setCategory(0)
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
        <transition v-if="isMobile" name="cases-slide-fade" mode="out-in">
          <div class="cases__active-category">
            <swiper-container ref="swiperContainerTemplateRef" @swiperslidechange="onCaseChanged" :spaceBetween="16" :slides-per-view="1" :key="activeCategoryIndex">
              <swiper-slide v-for="_case in categories[activeCategoryIndex].cases">
                <div class="cases__case-container">
                  <div class="cases__case">
                    <div class="cases__case-header">
                      <img :src="'/img/cases/' + _case.img" :alt="_case.header">
                      <div>{{ _case.category ?? categories[activeCategoryIndex].title }}</div>
                    </div>
                    <div class="cases__case-content">
                      <div>
                        <div>{{ _case.header }}</div>
                      </div>
                      <div class="cases__case-description">
                        <div>Задача</div>
                        <p>{{ _case.task }}</p>
                        <div>Результат</div>
                        <p>{{ _case.result }}</p>
                        <div>
                          <Button class="--tertiary" @click="openCaseModal(_case)">
                            <span>Смотреть кейс <svg><use :href="'/sprite.svg#login'" /></svg></span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper-container>
            <div class="cases__cases-pagination">
              <div @click="onClickPrevCase" :class="{'--disabled': activeCaseIndex === 0}"><svg><use :href="'/sprite.svg#chevron-left'" /></svg></div>
              <div @click="onClickNextCase" :class="{'--disabled': activeCaseIndex === categories[activeCategoryIndex].cases.length - 1}"><svg><use :href="'/sprite.svg#chevron-right'" /></svg></div>
            </div>
          </div>
        </transition>
        <transition v-else name="cases-slide-fade" mode="out-in">
          <div class="cases__active-category" :key="activeCategoryIndex">
            <template v-for="_case in desktopCategories[activeCategoryIndex].cases">
              <div class="cases__case-container" v-if="_case instanceof Array">
                <div class="cases__case" v-for="__case in _case">
                  <div class="cases__case-header">
                    <img :src="'/img/cases/' + __case.img" :alt="__case.header">
                    <div>{{ __case.category ?? desktopCategories[activeCategoryIndex].title }}</div>
                  </div>
                  <div class="cases__case-content">
                    <div>
                      <div>{{ __case.header }}</div>
                    </div>
                    <div class="cases__case-description">
                      <div>Задача</div>
                      <p>{{ __case.task }}</p>
                      <div>Результат</div>
                      <p>{{ __case.result }}</p>
                      <div>
                        <Button class="--tertiary" @click="openCaseModal(__case)">
                          <span>Смотреть кейс <svg><use :href="'/sprite.svg#login'" /></svg></span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="cases__case">
                <div class="cases__case-header">
                  <img :src="'/img/cases/' + _case.img" :alt="_case.header">
                  <div>{{ _case.category ?? categories[activeCategoryIndex].title }}</div>
                </div>
                <div class="cases__case-content">
                  <div>
                    <div>{{ _case.header }}</div>
                    <div class="cases__case-tags">
                      <div v-for="tag in _case.tags">
                        {{ tag }}
                      </div>
                    </div>
                  </div>
                  <div class="cases__case-description">
                    <div>Задача</div>
                    <p>{{ _case.task }}</p>
                    <div>Результат</div>
                    <p>{{ _case.result }}</p>
                    <div>
                      <Button class="--tertiary" @click="openCaseModal(_case)">
                        <span>Смотреть кейс <svg><use :href="'/sprite.svg#login'" /></svg></span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </transition>
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