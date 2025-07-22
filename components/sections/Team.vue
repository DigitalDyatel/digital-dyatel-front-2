<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import Link from '~/components/Link.vue'
import TagAsLabel from '~/components/TagAsLabel.vue'
import { onMounted, onUnmounted } from 'vue'

const marginLeft = ref('0')

const splideIsMounted = ref(false)

let io: IntersectionObserver | undefined = undefined

const teamSectionTemplateRef = useTemplateRef<HTMLElement>('teamSectionTemplateRef')
const splideTemplateRef = useTemplateRef<InstanceType<typeof Splide>>('splideTemplateRef')
const paginatorTemplateRef = useTemplateRef<HTMLDivElement>('paginatorTemplateRef')

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
  gap: 330,
  speed: 1000,
  interval: 2500
}

const onClickPrev = () => {
  splideTemplateRef.value?.splide?.Components.Autoplay.pause()
  splideTemplateRef.value?.splide.go('<')
  splideTemplateRef.value?.splide?.Components.Autoplay.play()
}

const onClickNext = () => {
  splideTemplateRef.value?.splide?.Components.Autoplay.pause()
  splideTemplateRef.value?.splide.go('>')
  splideTemplateRef.value?.splide?.Components.Autoplay.play()
}

const onPointerOverSlider = () => {
  splideTemplateRef.value?.splide?.Components.Autoplay.pause()
}

const onPointerOutSlider = () => {
  splideTemplateRef.value?.splide?.Components.Autoplay.play()
}

onMounted(() => {

  const computedStyles = window.getComputedStyle(document.querySelector('section.hero'))

  marginLeft.value = (parseFloat(computedStyles.marginLeft) + parseFloat(computedStyles.paddingLeft)) + 'px'

  paginatorTemplateRef.value!.style.width = window.innerWidth - (parseFloat(marginLeft.value) * 2) + 'px'

  io = new IntersectionObserver((entries) => {
    entries[0].isIntersecting ?
        splideTemplateRef.value?.splide?.Components.Autoplay.play() :
        splideTemplateRef.value?.splide?.Components.Autoplay.pause()
  }, {
    rootMargin: '0px 0px -500px 0px'
  })

  io.observe(teamSectionTemplateRef.value!)
})

onUnmounted(() => {
  io.disconnect()
})
</script>

<template>
  <section class="team" ref="teamSectionTemplateRef" :class="{'--mounted': marginLeft !== '0'}" :style="{marginLeft: marginLeft}">
    <div class="team__container">
      <div class="team__about">
        <div>
          <span>Команда</span>
          <span>Digital Dyatel</span>
        </div>
        <p>
          <span>Эксперты с опытом более 3 лет в управлении</span>
          <span>репутацией. Строим персональные стратегии</span>
          <span>и используем современные инструменты</span>
        </p>
        <Link link="/">Вся команда</Link>
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
  </section>
</template>