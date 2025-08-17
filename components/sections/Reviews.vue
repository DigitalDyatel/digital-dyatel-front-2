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
const sliderContainerTemplateRef = useTemplateRef<HTMLDivElement>('sliderContainerTemplateRef')

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
const isMobile = ref(false)

useSwiper(swiperContainerTemplateRef)

/** Нельзя делать меньше 7 штук */
const reviews: Review[] = ref([
  {
    img: 'AllaMedvedeva.webp',
    name: 'Алла Медведева',
    position: 'Директор по маркетингу',
    text: 'До сотрудничества на нашем счету не было успешного взаимодействия с другими подрядчиками. Отсутствие наглядных результатов, непрозрачность процессов – большие проблемы, с которыми мы сталкивались раньше в управлении репутацией. С командой мы работаем на условиях договора, отслеживаем результаты на основании отчетности. Команда смогла исправить плохую репутацию, минимизировать негатив и привлечь новый трафик. Появились мнения довольных покупателей и оценки на страницах наших ресурсов, поэтому делаем выводы о позитивных результатах работы!',
  },
  {
    img: 'no-photo.jpg',
    name: 'Ольга Ильина',
    position: 'Руководитель отдела продаж',
    text: 'Шаблонность мышления и отсутствие индивидуального подхода – с этим мы часто встречались при работе с предыдущими агентствами по управлению репутацией. В результате сотрудничества с Digital Dyatel рейтинг нашей компании вырос до 4.8 баллов, а количество продаж увеличилось на 18%. Мы не просто ощущаем, что о нашей компании сформировался положительный образ в сети, но и, в том числе, видим это в цифрах'
  },
  {
    img: 'EgorAleksandrov.png',
    name: 'Егор Александров',
    position: 'Основатель бизнеса',
    text: 'Мы – новички на рынке и знаем, что без управления репутацией компании в сети нам больших продаж не сделать. В компании нам предложили комплексные услуги, расписали все задачи, этапы работ и сроки. Оперативная обратная связь, рост продаж – то, за что мы продолжаем выбирать сотрудничество с компанией. Спасибо за качественную работу! К нашему случаю подошли индивидуально и предложили эффективный комплекс мер',
  },
  {
    img: 'OlgaYakovleva.webp',
    name: 'Ольга Яковлева',
    position: 'Директор по рекламе и PR',
    text: 'Мы столкнулись с волной негативных репутационных запросов о нашей компании в интернете. В репутационное агентство обратились с целью их скрытия и формирования положительного имиджа компании. Команде понадобилось 2 месяца работы для восстановления репутации. Мы пришли со сложной задачей и большим количеством негатива, который сильно влиял на продажи. В результате работы мы получили: чистый поиск, новый трафик и продвижение в соцсетях, положительную коммуникацию с пользователями. Мы поняли, что для укрепления делового имиджа необходимо активно работать в области управления репутацией. Поэтому продолжаем сотрудничество и уже заметили увеличение продаж (в среднем, на 40%), а также повышение качества заявок'
  },
  {
    img: 'IvanKunitsin.png',
    name: 'Иван Куницын',
    position: 'Финансовый консультант',
    text: 'Для меня как для эксперта очень важно, что видят люди при поиске моего имени. До обращения в агентство поисковая выдача была пустой. Сейчас — статьи, интервью, блоги. Благодаря усилиям команды за 3 месяца сформировался цельный имидж, уже к концу квартала я ощутил заметный рост интереса со стороны клиентов. Результат превзошел ожидания, а работать с командой было приятно и просто'
  },
  {
    img: 'IlyaNazarov.jpg',
    name: 'Илья Назаров',
    position: 'Руководитель отдела клиентского сервиса',
    text: 'Сервисная компания без хороших отзывов в интернете сейчас далеко не уедет. Нам помогли наладить мониторинг отзывов и своевременно реагировать на обратную связь клиентов. Мы стали видеть не просто отзывы — а живую картину того, как нас воспринимают. Более того, усилия агентства помогли нам поднять средний рейтинг с 3.6 до 4.7. Это напрямую сказалось на доверии со стороны новых клиентов'
  },
  {
    img: 'IngaBoltova.webp',
    name: 'Екатерина Волкова',
    position: 'Управляющая агентством',
    text: 'В какой-то момент в интернете стали появляться вбросы — подозрительно однотипные негативные статьи и комментарии. Ситуация начала угрожать репутации. Мы обратились в агентство и получили быструю реакцию: команда провела аудит, выявила источники атак и предложила пошаговую стратегию. Уже через месяц в поисковой выдаче 80% негатива были вытеснены, а через два — доминировали только позитивные материалы. Благодаря этому мы сохранили 3 ключевых контракта'
  },
])

const swiperProps = ref({
  slidesPerView: 6,
  loop: true,
  spaceBetween: 0,
})

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
  const video: HTMLVideoElement | HTMLDivElement = reviewTemplateRef.value[i].children[0] as HTMLVideoElement

  if (video instanceof HTMLDivElement) {
    return
  }

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

onMounted(async () => {
  init()

  if (window.innerWidth < 768) {
    isMobile.value = true

    await nextTick()

    swiperContainerTemplateRef.value.slidesPerView = 1.15
    swiperContainerTemplateRef.value.spaceBetween = 16
    sliderContainerTemplateRef.value.style.width = 166.75 * reviews.value.length

    return
  }

  swiperContainerTemplateRef.value.style.width = '2052px';
})
</script>

<template>
  <section class="reviews" :class="{'--ready': sectionIsReady}" :style="{marginLeft: marginLeft}">
    <h2 :style="{width: middleScreenWidth + 'px'}">Отзывы</h2>
    <div class="reviews__container">
      <div class="reviews__slider-container" ref="sliderContainerTemplateRef">
        <div class="reviews__slider">
          <swiper-container ref="swiperContainerTemplateRef" v-bind="swiperProps">
            <swiper-slide v-for="(review, i) in reviews" :key="review.name">
              <div class="reviews__review" @click="onClickReview(i); toggleVideo(i)" :class="{'--active': i === activeReviewIndex}" ref="reviewTemplateRef" :key="review.name">
                <template v-if="review.video">
                  <video preload="metadata" :src="'/img/reviews/' + review.video" ref="scrollOrVideoTemplateRef"/>
                  <div class="reviews__video-container">
                    <div class="reviews__video-controls">{{ videoStatuses[i] ? 'Стоп' : 'Смотреть отзыв' }}</div>
                    <div class="reviews__video-info" :class="{'--playing': videoStatuses[i]}">
                      <div>{{ review.name }}</div>
                      <div>{{ review.position }}</div>
                    </div>
                  </div>
                  <div class="reviews__video-timeline" :style="{transform: videoTimelines[i] ? 'translateX(' + videoTimelines[i] + '%)' : 'translateX(0)'}">{{ videoStatuses[i] ? 'Стоп' : 'Смотреть отзыв' }}</div>
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
    </div>
  </section>
</template>