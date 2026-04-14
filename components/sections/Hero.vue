<script setup lang="ts">
import Button from '~/components/shared/Button.vue'
import FormModal from '~/components/modals/FormModal.vue'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'
import { useModal } from 'vue-final-modal'
import { FROM_TRIGGER } from '~/constants'

const { reachGoal } = useYandexMetrika()

const tags = ref([
    {
      title: 'Работа с отзывами',
      class: '--accent'
    },
    {
      title: 'ORM',
    },
    {
      title: 'SERM'
    },
    {
      title: 'Репутация с нуля'
    },
    {
      title: 'Мониторинг'
    },
    {
      title: 'Создание позитивного контента'
    }
])

const clients = [
  {
    src: 'skypro.svg',
    alt: 'skypro-company'
  },
  {
    src: 'moscow.mba.png',
    alt: 'moscow-mba-company'
  },
  {
    src: 'synergy.png',
    alt: 'synergy-company'
  },
  {
    src: 'mitm.jpeg',
    alt: 'mitm-company'
  },
]

const onClick = () => {
  const { open, close } = useModal({
    component: FormModal,
    attrs: {
      title: 'Получите бесплатный аудит и рекомендации по улучшению имиджа в интернете',
      withFiles: false,
      fromTrigger: FROM_TRIGGER.GET_FREE_SERM_AUDIT,
      yandexMetrikaGoalID: 'hero__get-free-serm-audit__success',
      onConfirm: () => {
        close()

        const thankYouModal = useModal({component: ThankYouModal})
        thankYouModal.open()
      }
    },
  })

  open()
  reachGoal('hero__get-free-serm-audit__open-form')
}
</script>

<template>
  <section class="hero">
    <div class="hero__container">
      <div class="hero__left">
        <div class="hero__cup">
          <img src="/img/hero/cup.png" alt="cup">
          <div>Входим в топ 5 SERM агенств СНГ</div>
        </div>
        <h1>
          <span>Управление </span>
          <span>репутацией </span>
          <span>в интернете</span>
        </h1>
        <div class="hero__companies">
          <div>Работаем с:</div>
          <div v-for="client in clients"><img :src="'/img/hero/' + client.src" :alt="client.alt"></div>
        </div>
        <div class="hero__tags">
          <div v-for="tag in tags" :class="tag.class">
            {{ tag.title }}
          </div>
        </div>
      </div>
      <div class="hero__right">
        <div class="hero__form">
          <h2>Аудит репутации за 24 часа: найдем слабые места и точки роста</h2>
        </div>
      </div>
    </div>
  </section>
</template>