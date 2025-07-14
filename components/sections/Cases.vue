<script setup lang="ts">
import type { Ref } from 'vue'
import { categories as _categories } from '~/constants'

const categories: Ref<Category[]> = ref(_categories)

const activeCategoryIndex = ref(0)

const onClickCategory = (i: number) => {
  activeCategoryIndex.value = i
}

const onClickPrev = () => {
  if (activeCategoryIndex.value === 0) {
    return
  }

  activeCategoryIndex.value = --activeCategoryIndex.value
}

const onClickNext = () => {
  if (activeCategoryIndex.value === (categories.value.length - 1)) {
    return
  }

  activeCategoryIndex.value = ++activeCategoryIndex.value
}
</script>

<template>
  <section class="cases">
    <h2>Нам доверили свою репутацию</h2>
    <p>Мы помогаем компаниям выстраивать, защищать и улучшать репутацию в интернете. Вот несколько примеров, как мы достигли результатов</p>
    <div class="cases__container">
      <div class="cases__categories">
        <div v-for="(category, i) in categories" :class="{'--active': i === activeCategoryIndex}" @click="onClickCategory(i)">
          {{ category.title }}
        </div>
      </div>
      <div class="cases__paginator-container">
        <div class="cases__paginator-progress-bar">
          <div></div>
          <div></div>
        </div>
        <div class="cases__paginator-controls">
          <div @click="onClickPrev(i)"><svg><use :href="'/sprite.svg#chevron-left'" /></svg></div>
          <div @click="onClickNext(i)"><svg><use :href="'/sprite.svg#chevron-right'" /></svg></div>
        </div>
      </div>
      <div class="cases__active-category">
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
    </div>
  </section>
</template>