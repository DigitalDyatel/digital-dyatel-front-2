<script setup lang="ts">
import type { SwiperContainer } from 'swiper/element'
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import Link from '~/components/Link.vue'
import { onClickOutside } from '@vueuse/core'
import { onMounted } from 'vue'

interface Review {
  img: string,
  name: string,
  position: string,
  text: string,
  video?: string
}

const linkContainerTemplateRef = useTemplateRef<HTMLDivElement>('linkContainerTemplateRef')
const emptyTemplateRef = useTemplateRef<HTMLDivElement>('emptyTemplateRef')
const scrollOrVideoTemplateRef = useTemplateRef<(typeof OverlayScrollbarsComponent | HTMLVideoElement)[]>('scrollOrVideoTemplateRef')
const reviewTemplateRef = useTemplateRef<HTMLDivElement[]>('reviewTemplateRef')
const swiperContainerTemplateRef = useTemplateRef<SwiperContainer>('swiperContainerTemplateRef')

const scrollDefaultOptions = {
  scrollbars: {
    visibility: 'hidden',
    autoHide: 'never',
  },
}

const marginLeft = ref('0')
const middleScreenWidth = ref(0);
const sectionIsReady = ref(false)
const activeReviewIndex = ref<number|null>(null)
const videoStatuses = ref<boolean[]>([])
const videoTimelines = ref<number[]>([])

useSwiper(swiperContainerTemplateRef)

const reviews = ref<Review[]>([
  {
    img: 'AllaMedvedeva.webp',
    name: 'Алла Медведева',
    position: 'Директор по маркетингу',
    text: 'До сотрудничества на нашем счету не было успешного взаимодействия с другими подрядчиками. Отсутствие наглядных результатов, непрозрачность процессов – частые проблемы, с которыми мы сталкивались раньше в работе. С командой мы работаем по договору, отслеживаем результаты на основании отчетности. Появились отзывы довольных клиентов и оценки на страницах наших ресурсов, поэтому делаем выводы о позитивных результатах!',
    video: 'example.mp4'
  },
  {
    img: 'no-photo.svg',
    name: 'Ольга Ильина',
    position: 'Руководитель отдела продаж',
    text: 'Шаблонность мышления и отсутствие индивидуального подхода – с этим мы часто сталкивались при работе с предыдущими репутационными агентствами. В результате сотрудничества с Digital Dyatel рейтинг нашей компании вырос до 4.8 баллов, а количество продаж увеличилось на 18%. Мы не просто ощущаем, что о нашей компании сформировался положительный образ в сети, но и видим это в цифрах'
  },
  {
    img: 'EgorAleksandrov.webp',
    name: 'Егор Александров',
    position: 'Основатель бизнеса',
    text: 'Мы – новички на рынке и сразу понимали, что без работы над управлением репутацией компании в сети нам не обойтись. В компании нам предложили четкий план действий, расписали все задачи, этапы работ и сроки. Оперативная обратная связь, рост запросов клиентов и продаж – то, за что мы продолжаем выбирать сотрудничество с компанией. Спасибо за качественную работу!',
  },
  {
    img: 'OlgaYakovleva.webp',
    name: 'Ольга Яковлева',
    position: 'Директор по PR',
    text: 'Мы столкнулись с волной негативных отзывов о нашей компании в интернете. В агентство мы обратились с целью их скрытия и формирования положительного имиджа компании. Команде понадобилось 2 месяца, чтобы сделать поиск чистым, привлечь новый трафик и улучшить репутацию нашего бренда. Сейчас активно продолжаем работать над укреплением деловой репутации компании'
  },
  {
    img: 'IngaBoltova.webp',
    name: 'Инга Болтова',
    position: 'Генеральный директор',
    text: '3 месяца назад мы столкнулись с падением продаж в нашей компании. После анализа упоминаний и поисковых запросов, мы нашли отзывы и негатив, которые нанесли урон нашей репутации. Команда специалистов во время работы почистила данные из поиска и регулярно следит за комментариями и публикациями в интернете о нашей компании. Нас устраивает скорость работы, цена и постоянная обратная связь'
  },
  {
    img: 'IngaBoltova.webp',
    name: 'Инга Болтова',
    position: 'Генеральный директор',
    text: '3 месяца назад мы столкнулись с падением продаж в нашей компании. После анализа упоминаний и поисковых запросов, мы нашли отзывы и негатив, которые нанесли урон нашей репутации. Команда специалистов во время работы почистила данные из поиска и регулярно следит за комментариями и публикациями в интернете о нашей компании. Нас устраивает скорость работы, цена и постоянная обратная связь'
  },
])

const swiperProps = {
  slidesPerView: reviews.value.length - 1,
  loop: true,
  spaceBetween: 24,
}

const onClickPrev = () => {
  swiperContainerTemplateRef.value.swiper.slidePrev(500)
}

const onClickNext = () => {
  swiperContainerTemplateRef.value.swiper.slideNext(500)
}

const onClickReview = (i: number) => {

  if (i === activeReviewIndex.value) {
    activeReviewIndex.value = null
    disableScrollbar(i)
    return
  }

  activeReviewIndex.value = i
  enableScrollbar(i)
}

const init = () => {

  const videoStatusesData = []
  const videoTimelinesData = []

  scrollOrVideoTemplateRef.value.forEach((el, i) => {
    disableScrollbar(i)
    videoStatusesData[i] = false
    videoTimelinesData[i] = 0
  })

  videoStatuses.value = videoStatusesData
  videoTimelines.value = videoTimelinesData

  /** Т.к. ширина секции не ограничена, высчитываем середину экрана для других блоков */
  const computedStyles = window.getComputedStyle(document.querySelector('section.hero'))

  marginLeft.value = (parseFloat(computedStyles.marginLeft) + parseFloat(computedStyles.paddingLeft)) + 'px'
  middleScreenWidth.value = window.innerWidth - (parseInt(marginLeft.value) * 2)

  nextTick(() => {
    emptyTemplateRef.value!.style.width = linkContainerTemplateRef.value!.getBoundingClientRect().width + 'px'
    sectionIsReady.value = true
  })
}

const isHTMLVideoElement = (el: unknown): el is HTMLVideoElement =>  {
  return el instanceof HTMLVideoElement;
}

const enableScrollbar = (i: number) => {

  if (isHTMLVideoElement(scrollOrVideoTemplateRef.value[i])) {
    return
  }

  const osInstance = scrollOrVideoTemplateRef.value[i].osInstance()

  osInstance.elements().viewport.style.overflow = ''
  osInstance.options({
    scrollbars: {
      visibility: 'auto',
      autoHide: 'never',
    }
  })

  const stopClickOutside = onClickOutside(reviewTemplateRef.value[i], () => {
    activeReviewIndex.value = null
    disableScrollbar(i)
    stopClickOutside?.()
  })
}

const disableScrollbar = (i: number) => {

  if (isHTMLVideoElement(scrollOrVideoTemplateRef.value[i])) {
    return
  }

  const osInstance = scrollOrVideoTemplateRef.value[i].osInstance()

  osInstance.elements().viewport.scrollTo({top: 0, behavior: 'smooth'})
  osInstance.elements().viewport.style.overflow = 'hidden'
  osInstance.options({
    scrollbars: {
      visibility: 'hidden',
      autoHide: 'never'
    }
  })
}

const toggleVideo = (i: number) => {
  const video: HTMLVideoElement = reviewTemplateRef.value[i].children[0] as HTMLVideoElement

  const timeUpdateListener = () => {
    videoTimelines.value[i] = (video.currentTime / video.duration) * 100
  }

  const endedListener = () => {
    videoStatuses.value[i] = false
    video.removeEventListener('timeupdate', timeUpdateListener)
  }

  if (video.paused) {
    video.play()
    videoStatuses.value[i] = true

    video.addEventListener('timeupdate', timeUpdateListener)
    video.addEventListener('ended', endedListener)

    const stopClickOutside = onClickOutside(reviewTemplateRef.value[i], () => {
      video.pause()
      videoStatuses.value[i] = false
      video.removeEventListener('timeupdate', timeUpdateListener)
      stopClickOutside?.()
    })

    return
  }

  videoStatuses.value[i] = false
  video.pause()
  video.removeEventListener('timeupdate', timeUpdateListener)
}

onMounted(() => {
  init()
})
</script>

<template>
  <section class="reviews" :class="{'--ready': sectionIsReady}" :style="{marginLeft: marginLeft}">
    <h2 :style="{width: middleScreenWidth + 'px'}">Отзывы</h2>
    <div class="reviews__container">
      <div class="reviews__slider">
        <swiper-container ref="swiperContainerTemplateRef" v-bind="swiperProps">
          <swiper-slide v-for="(review, i) in reviews" >
            <div class="reviews__review" @click="onClickReview(i); toggleVideo(i)" :class="{'--active': i === activeReviewIndex}" ref="reviewTemplateRef" :key="review.name">
              <template v-if="review.video">
                <video :src="'/img/reviews/' + review.video" ref="scrollOrVideoTemplateRef"/>
                <div class="reviews__video-container">
                  <div class="reviews__video-controls">{{ videoStatuses[i] ? 'Стоп' : 'Смотреть отзыв' }}</div>
                  <div class="reviews__video-info" :class="{'--playing': videoStatuses[i]}">
                    <div>{{ review.name }}</div>
                    <div>{{ review.position }}</div>
                  </div>
                </div>
                <div class="reviews__video-timeline" :style="{transform: 'translateX(' + videoTimelines[i] + '%)'}">{{ videoStatuses[i] ? 'Стоп' : 'Смотреть отзыв' }}</div>
              </template>
              <template v-else>
                <div class="reviews__review-content">
                  <div class="reviews__review-header">
                    <img :src="'/img/reviews/' + review.img" :alt="review.name + ' - ' + review.position">
                    <Tag class="--blue" icon="chat-edit" />
                  </div>
                  <div class="reviews__review-text-container">
                    <div>{{ review.name }}</div>
                    <div>{{ review.position }}</div>
                    <OverlayScrollbarsComponent class="reviews__review-scrollbar" ref="scrollOrVideoTemplateRef" :options="scrollDefaultOptions">
                      <div class="reviews__review-text">{{ review.text }}</div>
                    </OverlayScrollbarsComponent>
                  </div>
                </div>
                <div class="reviews__review-overlay" />
              </template>
            </div>
          </swiper-slide>
        </swiper-container>
        <div class="reviews__footer" :style="{width: middleScreenWidth + 'px'}">
          <div ref="emptyTemplateRef" />
          <div class="reviews__controls">
            <div @click="onClickPrev"><svg><use :href="'/sprite.svg#chevron-left'" /></svg></div>
            <div @click="onClickNext"><svg><use :href="'/sprite.svg#chevron-right'" /></svg></div>
          </div>
          <div ref="linkContainerTemplateRef">
            <Link class="--contrast-on-hover" link="/">Больше отзывов</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>