<script setup lang="ts">
import { onMounted } from 'vue'
import { categories as _categories } from '~/constants'

let progressBarTrackWidth: number | undefined = undefined

const translateX = ref(0)

const progressBarTrackTemplateRef = useTemplateRef<HTMLDivElement>('progressBarTrackTemplateRef')
const progressBarSliderTemplateRef = useTemplateRef<HTMLDivElement>('progressBarSliderTemplateRef')

const categoriesContainerTemplateRef = useTemplateRef<HTMLDivElement>('categoriesContainerTemplateRef')
const categoriesTemplateRef = useTemplateRef<HTMLDivElement[]>('categoriesTemplateRef')

const categories = ref(_categories)

const activeCategoryIndex = ref(0)

const setCategory = (i: number) => {
  activeCategoryIndex.value = i

  updateDimensions(i)
}

const onClickPrev = () => {
  if (activeCategoryIndex.value === 0) {
    return
  }

  activeCategoryIndex.value = --activeCategoryIndex.value
  updateDimensions(activeCategoryIndex.value)
}

const onClickNext = () => {
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
    totalWidth += categoriesTemplateRef.value![i].getBoundingClientRect().width + 24
  }

  translateX.value = totalWidth * -1
}

onMounted(() => {
  progressBarTrackWidth = progressBarTrackTemplateRef.value!.getBoundingClientRect().width

  setCategory(0)
})
</script>

<template>
  <section class="cases">
    <h2>Нам доверили свою репутацию</h2>
    <p>Мы помогаем компаниям выстраивать, защищать и улучшать репутацию в интернете. Вот несколько примеров, как мы достигли результатов</p>
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
            <div @click="onClickPrev"><svg><use :href="'/sprite.svg#chevron-left'" /></svg></div>
            <div @click="onClickNext"><svg><use :href="'/sprite.svg#chevron-right'" /></svg></div>
          </div>
        </div>
      </div>
      <div class="cases__active-category-container">
        <transition name="cases-slide-fade" mode="out-in">
          <div class="cases__active-category" :key="activeCategoryIndex">
            <template v-for="_case in categories[activeCategoryIndex].cases">
              <div class="cases__case-container" v-if="_case instanceof Array">
                <div class="cases__case" v-for="__case in _case">
                  <div class="cases__case-header">
                    <img :src="'/img/cases/' + __case.img" :alt="__case.header">
                    <div>{{ __case.category ?? categories[activeCategoryIndex].title }}</div>
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
                        <div>{{ __case.startRating }} репутация</div>
                        <svg><use :href="'/sprite.svg#arrow-right'" /></svg>
                        <div>{{ __case.finishRating }} репутация</div>
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
                      <div>{{ _case.startRating }} репутация</div>
                      <svg><use :href="'/sprite.svg#arrow-right'" /></svg>
                      <div>{{ _case.finishRating }} репутация</div>
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
          <Button class="--large">Хочу также</Button>
        </div>
        <p>
          <span>Полное раскрытие кейсов недопустимо политикой нашей компании,</span>
          <span>работа с клиентами надежно защищена рамками NDA</span>
        </p>
      </div>
    </div>
  </section>
</template>