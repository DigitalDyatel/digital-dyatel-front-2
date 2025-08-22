<script setup lang="ts">
import type { SwiperContainer } from 'swiper/element'
import Link from '~/components/shared/Link.vue'
import TagWithLabel from '~/components/shared/TagWithLabel.vue'

const swiperContainerTemplateRef = useTemplateRef<SwiperContainer>('swiperContainerTemplateRef')
const h2TemplateRef = useTemplateRef('h2TemplateRef')

const isMobile = ref(false)
const currentSlideIndex = ref(0)

const mediaResources = ref([
  {
    img: 'm24.png',
    alt: 'Москва 24',
  },
  {
    img: 'forbes.png',
    alt: 'Forbes',
  },
  {
    img: 'russia-1.png',
    alt: 'Россия 1',
  },
  {
    img: 'snob.png',
    alt: 'Сноб',
    isWithTag: true,
  },
  {
    alt: 'Все публикации',
  },
])

const mediaResourcesMobile = ref([
  [
    {
      img: 'm24.png',
      alt: 'Москва 24',
    },
    {
      img: 'forbes.png',
      alt: 'Forbes',
    },
  ],
  [
    {
      img: 'russia-1.png',
      alt: 'Россия 1',
    },
    {
      alt: 'Все публикации',
    },
  ]
])

const setSlide = (i) => {
  currentSlideIndex.value = i
  swiperContainerTemplateRef.value.swiper.slideTo(currentSlideIndex.value)
}

const onSlideChanged = () => {
  currentSlideIndex.value = swiperContainerTemplateRef.value.swiper.activeIndex
}

onMounted(async() => {
  if (window.innerWidth < 768) {
    isMobile.value = true
    await nextTick()
    swiperContainerTemplateRef.value.style.width = window.getComputedStyle(h2TemplateRef.value).width
  }
})
</script>

<template>
  <section class="talk-about-us">
    <h2 ref="h2TemplateRef">О нас говорят</h2>
    <div class="talk-about-us__resources">
      <template v-if="isMobile">
        <swiper-container ref="swiperContainerTemplateRef" @swiperslidechange="onSlideChanged" :spaceBetween="16" :slides-per-view="1.1">
          <swiper-slide v-for="mediaResourcePart in mediaResourcesMobile">
            <div class="talk-about-us__resource-slide">
              <div class="talk-about-us__resource-card-mobile" v-for="mediaResource in mediaResourcePart">
                <img v-if="mediaResource.img" :src="'/img/media/' + mediaResource.img" :alt="mediaResource.alt">
                <Link v-else class="--contrast-on-hover" link="/">Все публикации</Link>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
        <div class="talk-about-us__resources-slider-pagination">
          <div @click="setSlide(i)" :class="{'--current': currentSlideIndex === i}" v-for="(_, i) in mediaResourcesMobile" />
        </div>
      </template>
      <div v-else class="talk-about-us__resource-card" v-for="mediaResource in mediaResources">
        <template v-if="mediaResource.img">
          <div v-if="mediaResource.isWithTag" class="talk-about-us__resource-tag">
            <TagWithLabel class="--alternative-rotate" icon="heart-search">#мы в сми</TagWithLabel>
          </div>
          <img :src="'/img/media/' + mediaResource.img" :alt="mediaResource.alt">
        </template>
        <Link v-else class="--contrast-on-hover" link="/">Все публикации</Link>
      </div>
    </div>
  </section>
</template>