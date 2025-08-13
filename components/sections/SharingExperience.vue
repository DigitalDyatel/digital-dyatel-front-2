<script setup lang="ts">
import Button from '~/components/Button.vue'
import { onMounted, onUnmounted } from 'vue'
import { useTimer } from 'maz-ui'

let io: IntersectionObserver | undefined = undefined
const animationDuration = 8000

const articlesContainerTemplateRef = useTemplateRef('articlesContainerTemplateRef')
const articlesTemplateRef = useTemplateRef('articlesTemplateRef')

const animationIsActive = ref(false)

const timer = ref<null, ReturnType<typeof useTimer>>(null)

const articles = ref([
  {
    title: [
      'Инфлюенс-маркетинг: ',
      'что это и как найти блогера',
    ],
    subtitle: 'продвижение товаров и услуг с помощью так называемых агентов влияния, или лидеров мнений ',
    background: '1.png',
    buttonText: 'Перейти в блог'
  },
  {
    title: [
      'Прократинация в IT: ',
      'как быть в условиях неопределенности?'
    ],
    subtitle: 'методы борьбы с прокрастинацией',
    background: '2.jpg',
    buttonText: 'Смотреть решение'
  },
  {
    title: [
      'Инфлюенс-маркетинг: ',
      'что это и как найти блогера'
    ],
    subtitle: 'продвижение товаров и услуг с помощью так называемых агентов влияния, или лидеров мнений',
    background: '1.png',
    buttonText: 'Перейти в блог'
  },
])

const activeArticleIndex = ref(0)

const initTimer = () => {
  timer.value = useTimer({
    timeout: animationDuration,
    callback() {
      if (activeArticleIndex.value === articles.value.length - 1) {
        activeArticleIndex.value = 0
        initTimer()
        return
      }

      activeArticleIndex.value++
      initTimer()
    }
  })
  timer.value.start()
}

const onClickPoint = (i) => {
  if (i === activeArticleIndex.value) {
    return
  }

  if (timer.value) {
    timer.value.stop()
  }
  activeArticleIndex.value = i
  initTimer()
}

onMounted(() => {

  articlesContainerTemplateRef.value.style.height = articlesTemplateRef.value[0].offsetHeight + 'px'

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

  io.observe(articlesContainerTemplateRef.value!)
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
    <div class="sharing-experience__container" ref="articlesContainerTemplateRef">
      <div class="sharing-experience__articles">
        <div
            v-for="(article, i) in articles"
            class="sharing-experience__article"
            :class="{'--active': i === activeArticleIndex}"
            :style="{backgroundImage: 'url(/img/blog/'+ article.background +')'}"
            ref="articlesTemplateRef"
        >
          <h3><span v-for="title in articles[activeArticleIndex].title">{{ title }}</span></h3>
          <p class="sharing-experience__article-subtitle">{{ articles[activeArticleIndex].subtitle }}</p>
          <Button class="--white --large">{{ article.buttonText }}</Button>
        </div>
      </div>
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
              :style="{animationDuration: `${animationDuration}ms`}"
          />
        </div>
      </div>
    </div>
  </section>
</template>