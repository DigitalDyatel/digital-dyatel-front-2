<script setup lang="ts">
import Button from '~/components/shared/Button.vue'
import { onMounted, onUnmounted } from 'vue'
import { useTimer } from 'maz-ui'

let io: IntersectionObserver | undefined = undefined
const animationDuration = 8000

const slidesContainerTemplateRef = useTemplateRef('slidesContainerTemplateRef')
const slidesTemplateRef = useTemplateRef<HTMLDivElement[]>('slidesTemplateRef')

const animationIsActive = ref(false)

const timer = ref<ReturnType<typeof useTimer> | null>(null)

enum SlideType {
  ARTICLE = 'ARTICLE',
  LEAD_MAGNET = 'LEAD_MAGNET',
}

interface Slide {
  title: string[],
  subtitle: string,
  background: string,
  buttonText: string,
  type: SlideType
}

const slides = ref<Slide[]>([
  {
    title: [
      'Получить бесплатный чек-лист',
    ],
    subtitle: 'методы борьбы с прокрастинацией',
    background: '1.png',
    buttonText: 'Получить',
    type: SlideType.LEAD_MAGNET,
  },
  {
    title: [
      'Прократинация в IT: ',
      'как быть в условиях неопределенности?'
    ],
    subtitle: 'методы борьбы с прокрастинацией',
    background: '2.jpg',
    buttonText: 'Смотреть решение',
    type: SlideType.LEAD_MAGNET,
  },
  {
    title: [
      'Инфлюенс-маркетинг: ',
      'что это и как найти блогера'
    ],
    subtitle: 'продвижение товаров и услуг с помощью так называемых агентов влияния, или лидеров мнений',
    background: '1.png',
    buttonText: 'Перейти в блог',
    type: SlideType.LEAD_MAGNET,
  },
])

const activeSlideIndex = ref(0)

const initTimer = () => {
  timer.value = useTimer({
    timeout: animationDuration,
    callback() {
      if (activeSlideIndex.value === slides.value.length - 1) {
        activeSlideIndex.value = 0
        initTimer()
        return
      }

      activeSlideIndex.value++
      initTimer()
    }
  })
  timer.value.start()
}

const onClickPoint = (i) => {
  if (i === activeSlideIndex.value) {
    return
  }

  if (timer.value) {
    timer.value.stop()
  }
  activeSlideIndex.value = i
  initTimer()
}

const onClickButton = (slide: Slide) => {
  if (slide.type === SlideType.LEAD_MAGNET) {
    // Open Modal
    return
  }
}

onMounted(async() => {
  io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animationIsActive.value = true

      if (timer.value) {
        timer.value.resume()
        return
      }

      initTimer()
      return
    }

    animationIsActive.value = false

    if (timer.value) {
      timer.value.pause()
    }
  }, {
    rootMargin: '0px 0px 0px 0px'
  })

  io.observe(slidesContainerTemplateRef.value!)
})

onUnmounted(() => {
  if (timer.value) {
    timer.value.stop()
  }
  io.disconnect()
})
</script>

<template>
  <section class="sharing-experience">
    <h2>Делимся опытом</h2>
    <p class="sharing-experience__subtitle">
      <span>Аналитика, кейсы, советы и практики по управлению репутацией и маркетингу. </span>
      <span>Только реальные истории и работающие решения</span>
    </p>
    <div class="sharing-experience__container" ref="slidesContainerTemplateRef">
      <div class="sharing-experience__slides">
        <div
            v-for="(slide, i) in slides"
            class="sharing-experience__slide"
            :class="{'--active': i === activeSlideIndex}"
            :style="{backgroundImage: 'url(/img/blog/'+ slide.background +')'}"
            ref="slidesTemplateRef"
            :key="i"
        >
          <h3><span v-for="title in slides[i].title">{{ title }}</span></h3>
          <p class="sharing-experience__slide-subtitle">{{ slide.subtitle }}</p>
          <Button class="--white --large" @click="onClickButton(slide)">{{ slide.buttonText }}</Button>
        </div>
      </div>
      <div class="sharing-experience__slider">
        <div
            v-for="(_, i) in slides"
            class="sharing-experience__slider-point"
            :class="{'--active': i === activeSlideIndex}"
            @click="onClickPoint(i)"
        >
          <div
              class="sharing-experience__slider-point-timeline"
              :class="{'--animation-is-active': animationIsActive}"
              :style="{animationDuration: `${animationDuration}ms`}"
          />
        </div>
      </div>
    </div>
  </section>
</template>