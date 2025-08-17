<script setup lang="ts">
import { useTimer } from 'maz-ui'

let io: IntersectionObserver | undefined = undefined
const animationDuration = 5000

const sliderTemplateRef = useTemplateRef('sliderTemplateRef')

const animationIsActive = ref(false)
const timer = ref<ReturnType<typeof useTimer> | null>(null)
const activeImageIndex = ref(0)
const isPresentationAreLoaded = ref(false)
const images = ref([
  {
    img: '1.png',
    alt: 'team'
  },
  {
    img: '2.jpg',
    alt: 'team-2'
  },
  {
    img: '3.jpg',
    alt: 'team-3'
  },
])

const initTimer = () => {
  timer.value = useTimer({
    timeout: animationDuration,
    callback() {
      if (activeImageIndex.value === images.value.length - 1) {
        activeImageIndex.value = 0
        initTimer()
        return
      }

      activeImageIndex.value++
      initTimer()
    }
  })
  timer.value.start()
}

const onClickPoint = (i) => {
  if (i === activeImageIndex.value) {
    return
  }

  if (timer.value) {
    timer.value.stop()
  }
  activeImageIndex.value = i
  initTimer()
}

const downloadPresentation = () => {
  const a = document.createElement('a')
  a.download = 'company-presentation.pdf'
  a.href = '/docs/company-presentation.pdf'
  a.click()
  a.remove()

  isPresentationAreLoaded.value = true
}

onMounted(() => {
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

  io.observe(sliderTemplateRef.value!)
})
</script>

<template>
  <section class="solve-problems">
    <h2>
      <span>Решаем репутационные </span>
      <span>проблемы любой сложности</span>
    </h2>
    <div class="solve-problems__container">
      <div ref="sliderTemplateRef">
        <div class="solve-problems__slider-container">
          <img v-for="(image, i) in images" :class="{'--active': activeImageIndex === i}" :src="'/img/team-together/' + image.img" :alt="image.alt" />
          <div class="solve-problems__slider">
            <div
                v-for="(_, i) in images"
                class="solve-problems__slider-point"
                :class="{'--active': i === activeImageIndex}"
                @click="onClickPoint(i)"
            >
              <div
                  class="solve-problems__slider-point-timeline"
                  :class="{'--animation-is-active': animationIsActive}"
                  :style="{animationDuration: `${animationDuration}ms`}"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="solve-problems__description">Наша компания — это эксперты, которые помогут сформировать положительный образ вашего бренда и укрепить хорошую репутацию в информационном пространстве</div>
        <div class="solve-problems__advantages">
          <div class="solve-problems__advantage --left-side">
            <div>
              <div>24</div>
              <div>
                <span>успешно</span>
                <span>реализованных кейса</span>
              </div>
            </div>
            <div>
              <img src="/img/solve-problems-folder.png" alt="folder">
              <svg><use :href="'/sprite.svg#5-dots'" /></svg>
            </div>
          </div>
          <div class="solve-problems__advantage-container">
            <div class="solve-problems__advantage --right-side-with-tag">
              <Tag class="solve-problems__advantage-tag" icon="status-up" />
              <div>
                <div>7 лет</div>
                <div>
                  опыта в управлении репутацией
                </div>
              </div>
            </div>
            <div class="solve-problems__advantage --right-side">
              <div>21</div>
              <div>сотрудник в штате нашего агенства</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="solve-problems__finish-description">
      <p>
        Мы следим за последними трендами <Tag class="--blue" icon="eye" as-span /> и внедряем современные решения,
        чтобы обеспечить лучшие результаты для вашего бизнеса <Tag class="--red" icon="like" as-span />
        Каждый проект получает максимум
        внимания, независимо от его масштаба <Tag class="--black" icon="location-tick" as-span />
      </p>
    </div>
    <div class="solve-problems__presentation" :class="{'--loaded': isPresentationAreLoaded}" @click="downloadPresentation">
      <div class="solve-problems__presentation-icon">
        <svg><use :href="'/sprite.svg#presentation-download'" /></svg>
        <svg><use :href="'/sprite.svg#presentation-downloaded'" /></svg>
      </div>
      <div class="solve-problems__presentation-text-container">
        <div>Презентация компании</div>
        <div>{{ isPresentationAreLoaded ? 'Загружено' : '44 кб' }}</div>
      </div>
    </div>
  </section>
</template>