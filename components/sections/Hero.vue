<script setup lang="ts">
import Button from '~/components/Button.vue'
import FormModal from '~/components/modals/FormModal.vue'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'
import { useModal } from 'vue-final-modal'

const tags = ref([
    'ORM',
    'SERM',
    'Репутация с нуля',
    'Мониторинг',
    'Создание позитивного контента'
])

const onClick = () => {
  const { open, close } = useModal({
    component: FormModal,
    attrs: {
      title: 'Получите бесплатный аудит и рекомендации по улучшению имиджа в интернете',
      withFiles: true,
      onConfirm: () => {
        close()

        const thankYouModal = useModal({component: ThankYouModal})
        thankYouModal.open()
      }
    },
  })

  open()
}
</script>

<template>
  <section class="hero">
    <div class="hero__container">
      <div class="hero__left">
        <h1>
          <span>Управление </span>
          <span>репутацией </span>
          <span>в интернете</span>
        </h1>
        <div class="hero__tags">
          <div v-for="tag in tags">
            {{ tag }}
          </div>
        </div>
        <div class="hero__button-container" @click="onClick">
          <Button class="--large --no-wrap">
            Получить бесплатный SERM аудит
          </Button>
          <Button class="--large">
            <svg><use :href="'/sprite.svg#login'" /></svg>
            <svg><use :href="'/sprite.svg#login'" /></svg>
          </Button>
        </div>
      </div>
      <div class="hero__right">
        <div class="hero__circle-container">
          <svg v-for="n in 4" :key="n"><use :href="'/sprite.svg#circle-star'" /></svg>
          <div class="hero__circle" />
        </div>
        <div class="hero__circle-container">
          <div class="hero__circle" />
        </div>
        <div class="hero__circle-container">
          <div class="hero__circle" />
        </div>
        <div class="hero__active-gradient">
          <div v-for="n in 4" :key="n" />
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