<script setup lang="ts">
import Button from "~/components/shared/Button.vue";
import Tag from "~/components/shared/Tag.vue";
import { FROM_TRIGGER } from "~/constants";
import { useModal } from "vue-final-modal";
import ThankYouModal from "~/components/modals/ThankYouModal.vue";
import FormModal from "~/components/modals/FormModal.vue";
import { Splide, SplideSlide } from '@splidejs/vue-splide';

const sliderOptions = {
  perPage: 1,
  rewind : true,
  arrows: false,
  perMove: 1,
  type: 'fade',
  speed: 1500,
  interval: 2500,
  autoplay: true,
  height: '100%',
}

const list1 = [
  '<b>Нейтральная:</b> +5% в Яндексе, +2% в Google',
  '<b>Нерелевантная:</b> +2% в Яндексе, +4% в Google'
]

const list2 = [
    'Перевести нейтрал в позитив: добавить отзывы, обновить описания, прикрепить фото',
    'Использовать жалобы и крауд-механики для размывания нерелевантных ссылок',
    'Создать рейтинговые подборки, где бренд упоминается как эксперт/участник',
    'Усилить карточки на Яндекс.Картах, Zoon, 2GIS, Flamp'
]

const cards = [
  {
    class: '--negative',
    grade: 2.9,
    img: '/img/services/otzovik.png',
    alt: 'Сервис для публикации отзывов "Отзовик"',
    text: '73 отзыва',
    with_arrow: true
  },
  {
    class: '--positive',
    grade: 4.7,
    img: '/img/services/otzovik.png',
    alt: 'Сервис навигации "Яндекс карты"',
    text: '117 отзывов',
    with_arrow: false
  },
  {
    class: '--negative',
    grade: 1.7,
    img: '/img/services/yandex-maps.png',
    alt: 'Сервис навигации "Яндекс карты"',
    text: '61 отзыв',
    with_arrow: true
  },
  {
    class: '--positive',
    grade: 4.4,
    img: '/img/services/yandex-maps.png',
    alt: 'Сервис навигации "Яндекс карты"',
    text: '123 отзыва',
    with_arrow: false
  },
]

const bullets = [
  'Разбор поисковой выдачи (Яндекс/Google): что сейчас видит клиент',
  'Ключевые площадки, влияющие на мнение клиентов о вашем бренде',
  'Карта негатива: где он есть, какой и как влияет на решения клиентов',
  'Точки роста: что можно быстро усилить и где теряются деньги',
  'Конкретные гипотезы и решения под вашу ситуацию',
  'Пошаговый план работ на 1-3 месяца с приоритетами',
]

const onClickButton = () => {
  const { open, close } = useModal({
    component: FormModal,
    attrs: {
      title: 'Бесплатный аудит репутации за 24 часа: найдем слабые места и точки роста',
      withFiles: false,
      fromTrigger: FROM_TRIGGER.SHARING_EXPERIENCE_HERO,
      buttonText: 'Записаться на аудит репутации',
      yandexMetrikaGoalID: 'lead',
      onConfirm: () => {
        close()

        const thankYouModal = useModal({
          component: ThankYouModal,
          attrs: {
            title: 'Готово! Спасибо за ваш запрос, мы скоро свяжемся с вами',
            content: 'Наш менеджер скоро свяжется с вами, проконсультируем и ответим на все интересующие вопросы'
          }
        })
        thankYouModal.open()
      }
    },
  })

  open()
  return
}
</script>

<template>
  <section class="free-audit">
    <h2>Бесплатный аудит за <span>24 часа</span></h2>
    <div class="free-audit__container">
      <div class="free-audit__first">
        <Splide :options="sliderOptions" aria-label="slider">
          <SplideSlide :key="1">
            <div class="free-audit__slide slide-1">
              <img src="/img/free-audit/envelope.png" alt="">
            </div>
          </SplideSlide>
          <SplideSlide :key="2">
            <div class="free-audit__slide slide-2">
              <div class="slide-2__cards">
                <div v-for="card in cards" class="slide-2__card">
                  <svg class="slide-2__card-arrow" v-if="card.with_arrow"><use :href="'/sprite.svg#arrow-right'" /></svg>
                  <div class="slide-2__grade" :class="card.class">
                    {{ card.grade }}
                  </div>
                  <img :src="card.img" :alt="card.alt">
                  <div class="slide-2__text">{{ card.text}}</div>
                </div>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide :key="3">
            <div class="free-audit__slide slide-3">
              <div class="slide-3__blur" />
              <div class="slide-3__container">
                <div class="slide-3__header">
                  <div>Рост нейтральной и нерелеватной выдачи</div>
                  <div><Tag icon="clip" /></div>
                </div>
                <ul>
                  <li v-for="text in list1">
                    <div><svg><use href="/sprite.svg#play"></use></svg></div>
                    <div v-html="text" />
                  </li>
                </ul>
                <p>Это снижает управляемость репутации и уводит пользователей к посторонним источникам</p>
                <div class="slide-3__solution">
                  <svg><use href="/sprite.svg#arrow-down"></use></svg>
                  <ul>
                    <li v-for="text in list2">
                      <div><svg><use href="/sprite.svg#play"></use></svg></div>
                      <div v-html="text" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
      <div class="free-audit__last">
        <div>
          <div>Что вы получите после аудита:</div>
          <hr>
          <ul>
            <li v-for="bullet in bullets">
              <div><svg><use href="/sprite.svg#play"></use></svg></div>
              <div>{{ bullet }}</div>
            </li>
          </ul>
        </div>
        <Button class="--large" type="submit" @click="onClickButton">Записаться на аудит репутации</Button>
      </div>
    </div>
  </section>
</template>