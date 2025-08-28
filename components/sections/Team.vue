<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import Link from '~/components/shared/Link.vue'
import TagAsLabel from '~/components/shared/TagAsLabel.vue'
import { onMounted, onUnmounted } from 'vue'

const marginLeft = ref('0')

const splideIsMounted = ref(false)
const isMobile = ref(true)

let io: IntersectionObserver | undefined = undefined
let ro: ResizeObserver | undefined = undefined
let roPrevWidth = 0;

const teamSectionTemplateRef = useTemplateRef<HTMLElement>('teamSectionTemplateRef')
const splideTemplateRef = useTemplateRef<InstanceType<typeof Splide>>('splideTemplateRef')
const paginatorTemplateRef = useTemplateRef<HTMLDivElement>('paginatorTemplateRef')
const teamAboutTemplateRef = useTemplateRef<HTMLDivElement>('teamAboutTemplateRef')

const cards = ref([
  {
    img: '1.png',
    altImg: '1-alt.png',
    name: 'Евгения Дятлова',
    position: 'Основатель компании',
  },
  {
    img: '2.png',
    altImg: '2-alt.png',
    name: 'Данилов Денис',
    position: 'Генеральный директор',
  },
  {
    img: '3.png',
    altImg: '3-alt.png',
    name: 'Панкова Мария',
    position: 'Менеджер по поисковым технологиям',
  },
  {
    img: '4.png',
    altImg: '4-alt.png',
    name: 'Савицкая Ева',
    position: 'Менеджер по поисковым технологиям',
  },
  {
    img: '5.png',
    altImg: '5-alt.png',
    name: 'Борисенко Дмитрий',
    position: 'SEO-специалист',
  },
  {
    img: '6.png',
    altImg: '6-alt.png',
    name: 'Анимподистов Сергей',
    position: 'Копирайтер',
  },
  {
    img: '7.png',
    altImg: '7-alt.png',
    name: 'Фролова Наталья',
    position: 'Менеджер по работе с клиентами',
  },
])

const sliderOptions = {
  perPage: cards.value.length,
  rewind : true,
  arrows: false,
  perMove: 1,
  type: 'loop',
  gap: 338,
  speed: 1000,
  interval: 2500
}

const onClickPrev = () => {
  splideTemplateRef.value?.splide?.Components.Autoplay.pause()
  splideTemplateRef.value?.splide.go('<')

  if (isMobile.value) {
    return
  }

  splideTemplateRef.value?.splide?.Components.Autoplay.play()
}

const onClickNext = () => {
  splideTemplateRef.value?.splide?.Components.Autoplay.pause()
  splideTemplateRef.value?.splide.go('>')

  if (isMobile.value) {
    return
  }

  splideTemplateRef.value?.splide?.Components.Autoplay.play()
}

const onPointerOverSlider = () => {
  if (isMobile.value) {
    return
  }

  splideTemplateRef.value?.splide?.Components.Autoplay.pause()
}

const onPointerOutSlider = () => {

  if (isMobile.value) {
    return
  }

  splideTemplateRef.value?.splide?.Components.Autoplay.play()
}

const updateDimensions = (entries: ResizeObserverEntry[]) => {

  const width = entries[0].borderBoxSize?.[0].inlineSize;

  if (typeof width !== 'number' || width === roPrevWidth) {
    return
  }

  roPrevWidth = width

  const computedStyles = window.getComputedStyle(document.querySelector('section.hero'))

  marginLeft.value = (parseFloat(computedStyles.marginLeft) + parseFloat(computedStyles.paddingLeft)) + 'px'
  paginatorTemplateRef.value!.style.width = window.innerWidth - (parseFloat(marginLeft.value) * 2) + 'px'

  if (window.innerWidth >= 1024) {
    return
  }

  teamAboutTemplateRef.value!.style.width = paginatorTemplateRef.value!.style.width
}

onMounted(() => {

  ro = new ResizeObserver(updateDimensions)
  ro.observe(document.documentElement)

  io = new IntersectionObserver((entries) => {

    if (isMobile.value) {
      return
    }

    entries[0].isIntersecting ?
        splideTemplateRef.value?.splide?.Components.Autoplay.play() :
        splideTemplateRef.value?.splide?.Components.Autoplay.pause()
  }, {
    rootMargin: '0px 0px -500px 0px'
  })

  io.observe(teamSectionTemplateRef.value!)

  if (window.innerWidth >= 1024) {
    isMobile.value = false
    return
  }
})

onUnmounted(() => {
  io?.disconnect()
  ro?.disconnect()
})
</script>

<template>
  <section class="team" ref="teamSectionTemplateRef" :class="{'--mounted': marginLeft !== '0'}" :style="{marginLeft: marginLeft}">
    <div class="team__container">
      <div class="team__slider">
        <div class="team__about" ref="teamAboutTemplateRef">
          <h2>
            <span>Команда </span>
            <span>Digital Dyatel</span>
          </h2>
          <p>
            <span>Эксперты с опытом более 3 лет в управлении</span>
            <span>репутацией. Строим персональные стратегии</span>
            <span>и используем современные инструменты</span>
          </p>
          <Link class="--hide --contrast-on-hover" link="/">Вся команда</Link>
          <TagAsLabel class="--blue">#спецы с опытом</TagAsLabel>
        </div>
        <div class="team__cards" :class="{'--mounted': splideIsMounted}" @pointerover="onPointerOverSlider" @pointerout="onPointerOutSlider">
          <Splide ref="splideTemplateRef" :options="sliderOptions" aria-label="My Favorite Images">
            <SplideSlide style="display: inline-block;" v-for="card in cards" :key="card.name">
              <div class="team__card">
                <img :src="'/img/team/' + card.img" :alt="card.name + '-' + card.position">
                <img :src="'/img/team/' + card.altImg" :alt="card.name + '-' + card.position">
                <div>{{ card.name }}</div>
                <div>{{ card.position }}</div>
              </div>
            </SplideSlide>
          </Splide>
        </div>
      </div>
      <div class="team__paginator" ref="paginatorTemplateRef">
        <div @click="onClickPrev"><svg><use :href="'/sprite.svg#chevron-left'" /></svg></div>
        <div @click="onClickNext"><svg><use :href="'/sprite.svg#chevron-right'" /></svg></div>
      </div>
    </div>
  </section>
</template>