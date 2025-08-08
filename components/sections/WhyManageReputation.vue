<script setup lang="ts">
import TagWithLabel from '~/components/TagWithLabel.vue'

let io: IntersectionObserver | undefined = undefined

const intersectedTemplateRef = useTemplateRef('intersectedTemplateRef')

const isMobileIntersected = ref(false)

const topCards = ref([
  {
    negativeRating: 2.9,
    positiveRating: 4.3,
    reviewCountBefore: 73,
    reviewCountAfter: 121,
    src: 'otzovik.png',
    alt: 'Отзовик'
  },
  {
    negativeRating: 1.7,
    positiveRating: 4.9,
    reviewCountBefore: 61,
    reviewCountAfter: 101,
    positiveIcon: true,
    negativeIcon: true,
    src: 'yandex-maps.png',
    alt: 'Яндекс Карты'
  },
  {
    negativeRating: 3.5,
    positiveRating: 4.7,
    reviewCountBefore: 82,
    reviewCountAfter: 143,
    src: '2gis.png',
    alt: '2ГИС'
  },
])

const bottomCards = ref([
  {
    percent: 91,
    text: [
      'Клиентов изучают отзывы и',
      'рейтинг до покупки'
    ]
  },
  {
    percent: 76,
    alternative: true,
    text: [
      'Потенциальных клиентов',
      'отклоняют сделки из-за',
      'негативных отзывов'
    ]
  },
  {
    percent: 81,
    text: [
      'Репутационных потерь',
      'происходят, потому что',
      'компании не работают с',
      'репутацией'
    ]
  },
  {
    percent: 70,
    text: [
      'Готовы переплачивать за',
      'бренд с хорошей репутацией',
      'на рынке'
    ]
  },
]);
onMounted(() => {
  if (window.innerWidth >= 768) {
    return
  }

  io = new IntersectionObserver((entries) => {
    isMobileIntersected.value = entries[0].isIntersecting
  }, {
    rootMargin: '0px 0px -200px 0px',
    threshold: 1,
  })

  io.observe(intersectedTemplateRef.value!)
})
</script>

<template>
  <section class="why-manage-reputation">
    <div class="why-manage-reputation__container">
      <TagWithLabel icon="idea">#зачем</TagWithLabel>
      <h2>Зачем управлять репутацией</h2>
      <div class="why-manage-reputation__line">
        <div class="why-manage-reputation__block --left">
          <img src="/img/why-manage-reputation-figure.png" alt="figure">
          <img src="/img/why-manage-reputation-figure-mobile.png" alt="figure">
          <p>
            <span>Решение остаться или уйти</span>
            <span>пользователи принимают за</span>
            <span>считанные секунды</span>
          </p>
          <p>
            <span>Пара негативных отзывов</span>
            <span>может <span>отпугнуть клиентов</span></span>
            <span>и <span>нанести ущерб бизнесу</span></span>
          </p>
        </div>
        <div class="why-manage-reputation__block --right" :class="{'--intersection': isMobileIntersected}" >
          <div class="why-manage-reputation__blur"></div>
          <div class="why-manage-reputation__equal-sign">
            <div/>
            <div/>
          </div>
          <p>
            <span>Потеря доверия =</span>
            <span>потеря прибыли</span>
          </p>
          <div class="why-manage-reputation__cards" ref="intersectedTemplateRef">
            <div v-for="card in topCards">
              <div class="why-manage-reputation__card-icon" v-if="card.positiveIcon">
                <svg v-if="card.positiveIcon">
                  <use :href="'/sprite.svg#tag-heart-crossed'"/>
                </svg>
                <svg v-if="card.negativeIcon">
                  <use :href="'/sprite.svg#tag-heart'"/>
                </svg>
              </div>
              <div class="why-manage-reputation__card-content">
                <div class="why-manage-reputation__card-rating">
                  <div>{{ card.negativeRating }}</div>
                  <div>{{ card.positiveRating }}</div>
                </div>
                <div class="why-manage-reputation__card-img-container">
                  <img :src="'/img/services/' + card.src" :alt="card.alt"/>
                </div>
                <div class="why-manage-reputation__card-review-count">
                  <div>{{ card.reviewCountBefore }} отзывов</div>
                  <div>{{ card.reviewCountAfter }} отзывов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="why-manage-reputation__bottom-cards">
        <div class="why-manage-reputation__bottom-card" v-for="card in bottomCards" :class="{'--alternative': card.alternative}">
          <div>{{ card.percent }}%</div>
          <p>
            <span v-for="text in card.text">{{ text }}</span>
          </p>
        </div>
      </div>
      <div class="why-manage-reputation__bottom-cards --mobile">
        <swiper-container ref="swiperContainerTemplateRef"  style="width: 500px;">
          <swiper-slide v-for="(card, i) in bottomCards">
            <div class="why-manage-reputation__bottom-card" :class="{'--alternative': card.alternative}">
              <div>{{ card.percent }}%</div>
              <p>
                <span v-for="text in card.text">{{ text }}</span>
              </p>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
      <div class="why-manage-reputation__description">согласно исследованию Edelman Trust Barometer</div>
    </div>
  </section>
</template>