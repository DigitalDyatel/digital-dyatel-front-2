<script setup lang="ts">
import Button from '~/components/Button.vue'
import { onMounted, onUnmounted } from 'vue'

let io: IntersectionObserver | undefined = undefined
let interval: ReturnType<typeof setInterval> | undefined = undefined
const defaultTimer = 8000

const sliderTemplateRef = useTemplateRef('sliderTemplateRef')

const animationIsActive = ref(false)

const articles = ref([
  {
    title: [
      'Инфлюенс-маркетинг:',
      'что это и как найти блогера'
    ],
    subtitle: 'продвижение товаров и услуг с помощью так называемых агентов влияния, или лидеров мнений',
    background: '1.png'
  },
  {
    title: [
      'Прократинация в IT:',
      'как быть в условиях неопределенности?'
    ],
    subtitle: 'методы борьбы с прокрастинацией',
    background: '2.jpg'
  },
  {
    title: [
      'Инфлюенс-маркетинг:',
      'что это и как найти блогера'
    ],
    subtitle: 'продвижение товаров и услуг с помощью так называемых агентов влияния, или лидеров мнений',
    background: '1.png'
  },
  {
    title: [
      'Прократинация в IT:',
      'как быть в условиях неопределенности?'
    ],
    subtitle: 'методы борьбы с прокрастинацией',
    background: '2.jpg'
  },
  {
    title: [
      'Инфлюенс-маркетинг:',
      'что это и как найти блогера'
    ],
    subtitle: 'продвижение товаров и услуг с помощью так называемых агентов влияния, или лидеров мнений',
    background: '1.png'
  },
  {
    title: [
      'Прократинация в IT:',
      'как быть в условиях неопределенности?'
    ],
    subtitle: 'методы борьбы с прокрастинацией',
    background: '2.jpg'
  },
])

const activeArticleIndex = ref(0)

const initInterval = (timeout) => {
  return setInterval(() => {
    if (activeArticleIndex.value === articles.value.length - 1) {
      activeArticleIndex.value = 0
      return
    }

    activeArticleIndex.value++
  }, timeout)
}

const onClickPoint = (i) => {
  clearInterval(interval)
  activeArticleIndex.value = i
  interval = initInterval(defaultTimer)
}

onMounted(() => {
  io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animationIsActive.value = true
      interval = initInterval(defaultTimer)
      return
    }

    animationIsActive.value = false
    clearInterval(interval)
  }, {
    rootMargin: '0px 0px 0px 0px'
  })

  io.observe(sliderTemplateRef.value!)
})

onUnmounted(() => {
  clearInterval(interval)
  io.disconnect()
})
</script>

<template>
  <section class="sharing-experience">
    <h2>Делимся опытом</h2>
    <p class="sharing-experience__subtitle">
      <span>Аналитика, кейсы, советы и практики по управлению репутацией и маркетингу</span>
      <span>Только реальные истории и работающие решения</span>
    </p>
    <div class="sharing-experience__container" ref="sliderTemplateRef" :style="{backgroundImage: 'url(/img/blog/' + articles[activeArticleIndex].background + ')'}">
      <h3><span v-for="title in articles[activeArticleIndex].title">{{ title }}</span></h3>
      <p class="sharing-experience__article-subtitle">{{ articles[activeArticleIndex].subtitle }}</p>
      <Button class="--white --large">Перейти в блог</Button>
      <div class="sharing-experience__slider">
        <div
            v-for="(_, i) in articles"
            class="sharing-experience__slider-point"
            :class="{'--active': i === activeArticleIndex}"
            @click="onClickPoint(i)"
        >
          <div
              class="sharing-experience__slider-point-timeline"
              :class="{'--animation-is-active': animationIsActive}"
              :style="{animationDuration: `${defaultTimer}ms`}"
          />
        </div>
      </div>
    </div>
  </section>
</template>