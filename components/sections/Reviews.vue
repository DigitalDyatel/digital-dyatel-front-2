<script setup lang="ts">
import Link from '~/components/Link.vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { onMounted, type Ref } from 'vue'

const splideTemplateRef = useTemplateRef('splideTemplateRef')
const linkContainerTemplateRef = useTemplateRef('linkContainerTemplateRef')
const emptyTemplateRef = useTemplateRef('emptyTemplateRef')

const splideIsMounted = ref(false)

const activeReviewIndex: Ref<number | null> = ref(null)

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

const reviews: Ref<Review[]> = ref([
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
  //splideTemplateRef.value?.splide?.Components.Autoplay.play()
}

const onSplideMounted = () => {
  splideIsMounted.value = true
}

const onClickReview = (i: number) => {

  if (i === activeReviewIndex.value) {
    activeReviewIndex.value = null

    return
  }

  activeReviewIndex.value = i
}

onMounted(() => {
  emptyTemplateRef.value!.style.width = linkContainerTemplateRef.value!.getBoundingClientRect().width + 'px'
})
</script>

<template>
  <section class="reviews" :class="{'--mounted': splideIsMounted}">
    <h2>Отзывы</h2>
    <div class="reviews__container">
      <Splide ref="splideTemplateRef" :options="sliderOptions" aria-label="My Favorite Images" @splide:mounted="onSplideMounted">
        <SplideSlide style="display: inline-block;" v-for="(review, i) in reviews" :key="review.name" @pointerover="onPointerOverSlider" @pointerout="onPointerOutSlider">
          <div class="reviews__review" @click="onClickReview(i)" :class="{'--active': i === activeReviewIndex}">
            <div class="reviews__review-content">
              <div class="reviews__review-header">
                <img :src="'/img/team/' + review.img" :alt="review.name + ' - ' + review.position">
                <Tag class="--blue" icon="chat-edit" />
              </div>
              <div class="reviews__review-text-container">
                <div>{{ review.name }}</div>
                <div>{{ review.position }}</div>
                <div>{{ review.text }}</div>
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