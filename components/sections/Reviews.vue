<script setup lang="ts">
import Link from '~/components/Link.vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import { onClickOutside } from '@vueuse/core'

import { onMounted } from 'vue'

const splideTemplateRef = useTemplateRef<InstanceType<typeof Splide>>('splideTemplateRef')
const linkContainerTemplateRef = useTemplateRef<HTMLDivElement>('linkContainerTemplateRef')
const emptyTemplateRef = useTemplateRef<HTMLDivElement>('emptyTemplateRef')
const scrollTemplateRef = useTemplateRef<typeof OverlayScrollbarsComponent[]>('scrollTemplateRef')
const reviewTemplateRef = useTemplateRef<HTMLDivElement[]>('reviewTemplateRef')

const scrollDefaultOptions = {
  scrollbars: {
    visibility: 'hidden',
    autoHide: 'never',
  },
}

const splideIsMounted = ref(false)

const activeReviewIndex = ref<number|null>(null)

interface Review {
  img: string,
  name: string,
  position: string,
  text: string,
  icon?: {
    icon: string,
    text: string
  }
}

const reviews = ref<Review[]>([
  {
    img: '1.png',
    name: 'Алла Медведева',
    position: 'Директор по маркетингу',
    text: 'До сотрудничества на нашем счету не было успешного взаимодействия с другими подрядчиками. Отсутствие наглядных результатов, непрозрачность процессов – частые проблемы, с которыми мы сталкивались раньше в работе. С командой мы работаем по договору, отслеживаем результаты на основании отчетности. Появились отзывы довольных клиентов и оценки на страницах наших ресурсов, поэтому делаем выводы о позитивных результатах!'
  },
  {
    img: '1.png',
    name: 'Ольга Ильина',
    position: 'Руководитель отдела продаж',
    text: 'Шаблонность мышления и отсутствие индивидуального подхода – с этим мы часто сталкивались при работе с предыдущими репутационными агентствами. В результате сотрудничества с Digital Dyatel рейтинг нашей компании вырос до 4.8 баллов, а количество продаж увеличилось на 18%. Мы не просто ощущаем, что о нашей компании сформировался положительный образ в сети, но и видим это в цифрах'
  },
  {
    img: '1.png',
    name: 'Егор Александров',
    position: 'Основатель бизнеса',
    text: 'Мы – новички на рынке и сразу понимали, что без работы над управлением репутацией компании в сети нам не обойтись. В компании нам предложили четкий план действий, расписали все задачи, этапы работ и сроки. Оперативная обратная связь, рост запросов клиентов и продаж – то, за что мы продолжаем выбирать сотрудничество с компанией. Спасибо за качественную работу!',
    icon: {
      icon: '',
      text: ''
    }
  },
  {
    img: '1.png',
    name: 'Ольга Яковлева',
    position: 'Директор по PR',
    text: 'Мы столкнулись с волной негативных отзывов о нашей компании в интернете. В агентство мы обратились с целью их скрытия и формирования положительного имиджа компании. Команде понадобилось 2 месяца, чтобы сделать поиск чистым, привлечь новый трафик и улучшить репутацию нашего бренда. Сейчас активно продолжаем работать над укреплением деловой репутации компании'
  },
  {
    img: '1.png',
    name: 'Инга Болтова',
    position: 'Генеральный директор',
    text: '3 месяца назад мы столкнулись с падением продаж в нашей компании. После анализа упоминаний и поисковых запросов, мы нашли отзывы и негатив, которые нанесли урон нашей репутации. Команда специалистов во время работы почистила данные из поиска и регулярно следит за комментариями и публикациями в интернете о нашей компании. Нас устраивает скорость работы, цена и постоянная обратная связь'
  },
])

const sliderOptions = {
  perPage: reviews.value.length,
  rewind : true,
  arrows: false,
  perMove: 1,
  type: 'loop',
  gap: 150,
  speed: 1000,
  interval: 2500
}

const onClickPrev = () => {
  splideTemplateRef.value?.splide.go('<')
}

const onClickNext = () => {
  splideTemplateRef.value?.splide.go('>')
}

const onSplideMounted = () => {
  splideIsMounted.value = true
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

const initScrollbars = () => {
  scrollTemplateRef.value.forEach((el, i) => {
    disableScrollbar(i)
  })

  const splide = splideTemplateRef.value?.splide

  if (splide) {
    splide.on('click', (slide) => {
      const realIndex = slide.index % reviews.value.length
      const data = reviews.value[realIndex]

      console.log(realIndex)

      onClickReview(realIndex)

      //console.log('Клик по слайду:', data)
    })
  }
}

const enableScrollbar = (i: number) => {
  const osInstance = scrollTemplateRef.value[i].osInstance()

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
  const osInstance = scrollTemplateRef.value[i].osInstance()

  osInstance.elements().viewport.scrollTo({top: 0, behavior: 'smooth'})
  osInstance.elements().viewport.style.overflow = 'hidden'
  osInstance.options({
    scrollbars: {
      visibility: 'hidden',
      autoHide: 'never'
    }
  })
}

onMounted(() => {
  emptyTemplateRef.value!.style.width = linkContainerTemplateRef.value!.getBoundingClientRect().width + 'px'

  initScrollbars()
})
</script>

<template>
  <section class="reviews" :class="{'--mounted': splideIsMounted}">
    <h2>Отзывы</h2>
    <div class="reviews__container">
      <Splide ref="splideTemplateRef" :options="sliderOptions" aria-label="My Favorite Images" @splide:mounted="onSplideMounted">
        <SplideSlide style="display: inline-block;" v-for="(review, i) in reviews" :key="review.name" >
          <div class="reviews__review"  :class="{'--active': i === activeReviewIndex}" ref="reviewTemplateRef" :key="review.name">
              <div class="reviews__review-content">
                <div class="reviews__review-header">
                  <img :src="'/img/team/' + review.img" :alt="review.name + ' - ' + review.position">
                  <Tag class="--blue" icon="chat-edit" />
                </div>
                <div class="reviews__review-text-container">
                  <div>{{ review.name }}</div>
                  <div>{{ review.position }}</div>
                  <OverlayScrollbarsComponent class="reviews__review-scrollbar" ref="scrollTemplateRef" :options="scrollDefaultOptions">
                    <div class="reviews__review-text">{{ review.text }}</div>
                  </OverlayScrollbarsComponent>
                </div>
              </div>
              <div class="reviews__review-overlay">

              </div>

          </div>
        </SplideSlide>
      </Splide>
      <div class="reviews__footer">
        <div ref="emptyTemplateRef" />
        <div class="reviews__controls">
          <div @click="onClickPrev"><svg><use :href="'/sprite.svg#chevron-left'" /></svg></div>
          <div @click="onClickNext"><svg><use :href="'/sprite.svg#chevron-right'" /></svg></div>
        </div>
        <div ref="linkContainerTemplateRef">
          <Link link="/">Больше отзывов</Link>
        </div>
      </div>
    </div>
  </section>
</template>