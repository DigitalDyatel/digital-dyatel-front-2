<script setup lang="ts">
import Button from '~/components/shared/Button.vue'
import { useActiveCategory } from '~/composables/sections/Cases'
import {
  desktopCategories as _desktopCategories,
  categories as _categories,
} from '~/constants'

const props = defineProps<{
  activeCategoryIndex: number
}>()

const { openCaseModal } = useActiveCategory()
const categories = ref(_categories)
const desktopCategories = ref(_desktopCategories)
</script>

<template>
  <transition name="cases-slide-fade" mode="out-in">
    <div class="cases__active-category" :key="props.activeCategoryIndex">
      <template v-for="_case in desktopCategories[props.activeCategoryIndex].cases">
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
              <div>
                <Button class="--tertiary" @click="openCaseModal(_case)">
                  <span>Смотреть кейс <svg><use :href="'/sprite.svg#login'" /></svg></span>
                </Button>
              </div>
            </div>
            <div class="cases__case-description">
              <div>Задача</div>
              <p>{{ _case.task }}</p>
              <div>Результат</div>
              <p>{{ _case.result }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </transition>
</template>