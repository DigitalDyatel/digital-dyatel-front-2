<script setup lang="ts">
import Menu from '~/components/Menu.vue'
import Button from '~/components/Button.vue'

const tags = ref([
    'ORM',
    'SERM',
    'Репутация с нуля',
    'Мониторинг',
    'Создание позитивного контента'
])
</script>

<template>
  <section class="hero">
    <Menu />
    <div class="hero__container">
      <div class="hero__left">
        <h1>
          <span>Управление</span>
          <span>репутацией</span>
          <span>в интернете</span>
        </h1>
        <div class="hero__tags">
          <div v-for="tag in tags">
            {{ tag }}
          </div>
        </div>
        <div class="hero__button-container">
          <Button>
            Получить бесплатный SERM аудит
          </Button>
          <Button class="--type-login">
            <svg><use :href="'/sprite.svg#login'" /></svg>
          </Button>
        </div>
      </div>
      <div class="hero__right">
        <div class="hero__circle-container --1">
          <svg><use :href="'/sprite.svg#circle-star'" /></svg>
          <svg><use :href="'/sprite.svg#circle-star'" /></svg>
          <svg><use :href="'/sprite.svg#circle-star'" /></svg>
          <svg><use :href="'/sprite.svg#circle-star'" /></svg>
          <div class="hero__circle" />
        </div>
        <div class="hero__circle-container --2">
          <div class="hero__circle" />
        </div>
        <div class="hero__circle-container --3">
          <div class="hero__circle" />
        </div>
        <div class="hero__active-gradient">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <div class="hero__advantages">
          <div>Стратегия под ваши цели</div>
          <div>Реальные отзывы</div>
          <div>Конфиденциальность</div>
          <div>Понятные результаты</div>
        </div>
      </div>
    </div>
  </section>
</template>