<script setup lang="ts">
import TagWithLabel from '~/components/TagWithLabel.vue'

const intersectedTemplateRef = useTemplateRef('intersectedTemplateRef')
const bottomCardsTemplateRef = useTemplateRef('bottomCardsTemplateRef')
const swiperContainerTemplateRef = useTemplateRef('swiperContainerTemplateRef')
const containerTemplateRef = useTemplateRef('containerTemplateRef')

const isMobileIntersected = ref(false)
const activeSlideIndex = ref(0)

let io: IntersectionObserver | undefined = undefined

const onSlideChanged = () => {
  activeSlideIndex.value = swiperContainerTemplateRef.value.swiper.activeIndex
}

const onClickSlide = (i) => {
  swiperContainerTemplateRef.value.swiper.slideTo(i)
}

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

const initMobileIntersection = () => {
  if (window.innerWidth >= 768) {
    return
  }

  const halfDisplay = (window.innerHeight / 2) * -1 + 'px'

  let lastScrollY = document.querySelector('.main-custom-scroll').children[0].scrollTop;

  io = new IntersectionObserver((entries) => {
    const currentScrollY = document.querySelector('.main-custom-scroll').children[0].scrollTop;
    const scrollingDown = currentScrollY > lastScrollY;
    const scrollingUp = currentScrollY < lastScrollY;

    lastScrollY = currentScrollY;

    if (entries[0].isIntersecting && scrollingDown) {
      isMobileIntersected.value = true
      return
    }

    if (!entries[0].isIntersecting && scrollingUp) {
      isMobileIntersected.value = false
    }
  }, {
    rootMargin: `0px 0px ${halfDisplay} 0px`,
    threshold: 0.5,
  })

  io.observe(intersectedTemplateRef.value!)
}

const initMobileSlider = () => {
  if (window.innerWidth >= 768) {
    return
  }

  let maxHeight = 0

  bottomCardsTemplateRef.value.forEach(el => {
    if (el.offsetHeight > maxHeight) {
      maxHeight = el.offsetHeight
    }
  })

  bottomCardsTemplateRef.value.forEach(el => {
    el.style.height = maxHeight + 'px'
  })

  swiperContainerTemplateRef.value.style.width = window.getComputedStyle(containerTemplateRef.value).width
}

onMounted(() => {
  initMobileIntersection()
  initMobileSlider()
})

onUnmounted(() => {
  if (window.innerWidth >= 768) {
    return
  }

  io.disconnect()
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
        <div class="why-manage-reputation__block --right" ref="containerTemplateRef" :class="{'--intersection': isMobileIntersected}" >
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
        <swiper-container ref="swiperContainerTemplateRef" @swiperslidechange="onSlideChanged" :spaceBetween="16" :slides-per-view="1.1">
          <swiper-slide v-for="card in bottomCards">
            <div class="why-manage-reputation__bottom-card" ref="bottomCardsTemplateRef" :class="{'--alternative': card.alternative}">
              <div>{{ card.percent }}%</div>
              <p>
                <span v-for="text in card.text">{{ text }}</span>
              </p>
            </div>
          </swiper-slide>
        </swiper-container>
        <div class="why-manage-reputation__swiper-custom-pagination">
          <div v-for="(_, i) in bottomCards" :class="{'--active': activeSlideIndex === i}" @click="onClickSlide(i)"/>
        </div>
      </div>
      <div class="why-manage-reputation__description">согласно исследованию Edelman Trust Barometer</div>
    </div>
  </section>
</template>