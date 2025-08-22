<script setup lang="ts">
import type { SwiperContainer } from 'swiper/element'
import Button from '~/components/shared/Button.vue'
import { useActiveCategory } from '~/composables/sections/Cases'
import { categories as _categories } from '~/constants'

const props = defineProps<{
  activeCategoryIndex: number,
}>()

const activeCaseIndex = defineModel<number>()

const categories = ref(_categories)

const swiperContainerTemplateRef = useTemplateRef<SwiperContainer>('swiperContainerTemplateRef')

const { openCaseModal } = useActiveCategory()

const onCaseChanged = () => {
  activeCaseIndex.value = swiperContainerTemplateRef.value.swiper.activeIndex
}

const onClickPrevCase = () => {
  if (activeCaseIndex.value === 0) {
    return
  }

  swiperContainerTemplateRef.value.swiper.slideTo(--activeCaseIndex.value)
}

const onClickNextCase = () => {
  if (activeCaseIndex.value === (categories.value[props.activeCategoryIndex].cases.length - 1)) {
    return
  }

  swiperContainerTemplateRef.value.swiper.slideTo(++activeCaseIndex.value)
}

watch(
    () => props.activeCategoryIndex,
    () => {
      activeCaseIndex.value = 0
      swiperContainerTemplateRef.value?.swiper.slideTo(0, 0)
    }
)
</script>

<template>
  <transition name="cases-slide-fade" mode="out-in">
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
</template>