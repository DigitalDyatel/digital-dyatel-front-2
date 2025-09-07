<script setup lang="ts">
import Button from '~/components/shared/Button.vue'
import { onMounted, onUnmounted } from 'vue'
import { useTimer } from 'maz-ui'
import { useModal } from 'vue-final-modal'
import FormModal from '~/components/modals/FormModal.vue'
import { FROM_TRIGGER } from '~/constants'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'

let io: IntersectionObserver | undefined = undefined
const animationDuration = 8000

const slidesContainerTemplateRef = useTemplateRef('slidesContainerTemplateRef')
const slidesTemplateRef = useTemplateRef<HTMLDivElement[]>('slidesTemplateRef')

const animationIsActive = ref(false)

const timer = ref<ReturnType<typeof useTimer> | null>(null)

const { reachGoal } = useYandexMetrika()

const { data, error } = await useApiFetch<Slide[]>('marketing/slider-sharing-experience/list')

enum SlideType {
  LINK = 'LINK',
  LEAD_MAGNET = 'LEAD_MAGNET',
}

interface Slide {
  header: string,
  subheader: string,
  background_img: {
    standard: string
  },
  button_text: string,
  type: SlideType,
  yandex_metrika_open_form_goal?: string
  yandex_metrika_success_goal?: string
}

/*const slides = ref<Slide[]>([
  {
    header: 'Получить бесплатный чек-лист',
    subheader: 'методы борьбы с прокрастинацией',
    background_img: {standard: '1.png'},
    button_text: 'Получить',
    type: SlideType.LEAD_MAGNET,
    yandex_metrika_open_form_goal: 'share-exp__1__open-form',
    yandex_metrika_success_goal: 'share-exp__1__success'
  },
  {
    header: 'Прократинация в IT: как быть в условиях неопределенности?',
    subheader: 'методы борьбы с прокрастинацией',
    background_img: {standard: '2.png'},
    button_text: 'Смотреть решение',
    type: SlideType.LINK,
    yandex_metrika_open_form_goal: 'share-exp__2__open-form',
    yandex_metrika_success_goal: 'share-exp__2__success'
  },
  {
    header: 'Инфлюенс-маркетинг: что это и как найти блогера',
    subheader: 'продвижение товаров и услуг с помощью так называемых агентов влияния, или лидеров мнений',
    background_img: {standard: '1.png'},
    button_text: 'Перейти в блог',
    type: SlideType.LINK,
    yandex_metrika_open_form_goal: 'share-exp__3__open-form',
    yandex_metrika_success_goal: 'share-exp__3__success'
  },
])*/

const slides = data


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

const onClickButton = (i: number, slide: Slide) => {
  if (slide.type === SlideType.LEAD_MAGNET) {
    const { open, close } = useModal({
      component: FormModal,
      attrs: {
        title: 'Получить бесплатный чек-лист',
        withFiles: false,
        fromTrigger: FROM_TRIGGER.SHARING_EXPERIENCE,
        leadMagnetId: i + 1,
        buttonText: 'Получить лид-магнит',
        yandexMetrikaGoalID: slide.yandex_metrika_success_goal,
        onConfirm: () => {
          close()

          const thankYouModal = useModal({component: ThankYouModal})
          thankYouModal.open()
        }
      },
    })

    open()
    if (slide.yandex_metrika_open_form_goal) {
      reachGoal(slide.yandex_metrika_open_form_goal)
    }
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
            :style="{backgroundImage: 'url('+ slide.background_img.standard +')'}"
            ref="slidesTemplateRef"
            :key="i"
        >
          <h3><span>{{ slide.header }}</span></h3>
          <p class="sharing-experience__slide-subtitle">{{ slide.subheader }}</p>
          <Button class="--white --large" @click="onClickButton(i, slide)">{{ slide.button_text }}</Button>
        </div>
      </div>
      <div class="sharing-experience__slider" :class="{'--invisible': slides.length < 2}">
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