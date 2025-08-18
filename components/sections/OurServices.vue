<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import { FROM_TRIGGER } from '~/constants'
import BackgroundLightBlue from '~/assets/svg/background-light-blur.svg?component'
import TagWithLabel from '~/components/TagWithLabel.vue'
import FormModal from '~/components/modals/FormModal.vue'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'

const isMobile = ref(true)
const activeMobileServiceIndex = ref(null)
const mobileContentHeight: number[] = []
const mobileServiceTemplateRef = useTemplateRef('mobileServiceTemplateRef')
const mobileContentTemplateRef = useTemplateRef('mobileContentTemplateRef')

interface Service {
  title: string,
  title_short?: string,
  subtitle?: string,
  description: string,
  price: string,
}

const services = ref<Service[]>([
  {
    title: 'Управление репутацией в интернете',
    title_short: 'ORM',
    subtitle: '(ORM или Object Relational Mapping)',
    description: 'ORM — это системный подход к управлению репутацией компании. Мы анализируем поисковую выдачу, мониторим упоминания и отзывы, чтобы быстро реагировать на негатив. Создаем стратегии для формирования позитивного корпоративного имиджа',
    price: 'от 120 000 ₽/мес'
  },
  {
    title: 'Управление репутацией в поисковых системах',
    title_short: 'SERM',
    subtitle: '(SERM или Search Engine Reputation Management)',
    description: 'Формируем позитивный образ вашего бренда, вытесняем негатив и выводим на первый план только положительные материалы, улучшая положение вашего бренда в поисковой выдаче. Негативный контент и устаревшие материалы, спускаются ниже',
    price: 'от 90 000 ₽/мес'
  },
  {
    title: 'Репутация с нуля',
    description: 'Помогаем сформировать положительный имидж компании с самого старта. Это станет вашим преимуществом, повысит лояльность клиентов и укрепит доверие к вашему бизнесу',
    price: 'от 130 000 ₽/мес'
  },
  {
    title: 'Позитивный контент',
    description: 'Создаем контент, который подчеркнет сильные стороны вашего бизнеса и грамотно продвигаем его в социальных сетях, блогах и на других платформах. Убедительный и качественный контент помогает формировать положительный имидж компании и усиливать лояльность аудитории',
    price: 'от 35 000 ₽ за материал'
  },
  {
    title: 'Мониторинг',
    description: 'Мы занимаемся исследованием информационного поля, отслеживаем отзывы и комментарии в реальном времени, оперативно реагируем на негатив и помогаем выстраивать доверительные отношения с клиентами',
    price: 'от 30 000 ₽/мес'
  },
])

const selectedService = ref(services.value[0])

const onClickService = (service: Service) => {
  selectedService.value = service
}

const onClick = (service: Service | null, title: string) => {

  const attrs: {[key:string]: any} = {}

  if (service) {
    attrs.data = service
  }

  const { open, close } = useModal({
    component: FormModal,
    attrs: {
      title,
      fromTrigger: service ? FROM_TRIGGER.OUR_SERVICES_REQUEST : FROM_TRIGGER.OUR_SERVICES_GET_THE_OFFER,
      onConfirm: () => {
        close()

        const thankYouModal = useModal({component: ThankYouModal})
        thankYouModal.open()
      },
      ...attrs
    },
  })

  open()
}

const toggleMobileService = (i: number) => {
  const el = mobileContentTemplateRef.value[i]

  if (i === activeMobileServiceIndex.value) {
    activeMobileServiceIndex.value = null
    el.style.opacity = '0'
    el.style.height = '0'
    return
  }

  const prevEl = mobileContentTemplateRef.value[activeMobileServiceIndex.value]

  if (prevEl) {
    prevEl.style.opacity = '0'
    prevEl.style.height = '0'
  }

  activeMobileServiceIndex.value = i
  el.style.opacity = '1'
  el.style.height = mobileContentHeight[i] + 'px'
}

onMounted(() => {
  if (window.innerWidth >= 768) {
    isMobile.value = false
    return
  }

  mobileContentTemplateRef.value.forEach((mobileContentEl) => {
    mobileContentHeight.push(mobileContentEl.getBoundingClientRect().height)
    mobileContentEl.style.height = '0'
  })

  toggleMobileService(0)
})
</script>

<template>
  <section class="our-services">
    <div class="our-services__container">
      <h2>Наши услуги</h2>
      <TagWithLabel icon="hashtag" class="--alternative-color our-services__tag">#мы предлагаем</TagWithLabel>
      <div v-if="isMobile" class="our-services__services-mobile">
        <div class="our-services__service-mobile" :class="{'--open': i === activeMobileServiceIndex}" v-for="(service, i) in services" ref="mobileServiceTemplateRef">
          <div class="our-services__service-mobile-header" @click="toggleMobileService(i)">
            <h3>{{ service.title_short ? service.title_short : service.title }}</h3>
            <div><svg><use :href="'/sprite.svg#chevron-right'" /></svg></div>
          </div>
          <div class="our-services__service-mobile-content" ref="mobileContentTemplateRef">
            <h4 v-if="service.subtitle">{{ service.subtitle }}</h4>
            <p>{{ service.description }}</p>
            <div class="our-services__service-mobile-price">
              <div>{{ selectedService.price }}</div>
              <div>на сайте приведены средние цены, конечная стоимость рассчитывается для каждого проекта индивидуально</div>
            </div>
            <div class="our-services__service-mobile-buttons">
              <Button class="--large" @click="onClick(selectedService, 'Оставьте заявку — подключимся к вашей задаче и предложим план действий')">Оставьте заявку</Button>
              <Button class="--large --quaternary">Подробнее</Button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="our-services__services">
        <div class="our-services__selected-service">
          <div>
            <h3>{{ selectedService.title }}</h3>
            <h4 v-if="selectedService.subtitle">{{ selectedService.subtitle }}</h4>
            <p>{{ selectedService.description }}</p>
          </div>
          <div>
            <div class="our-services__price">
              <div>{{ selectedService.price }}</div>
              <div>на сайте приведены средние цены, конечная стоимость рассчитывается для каждого проекта индивидуально</div>
            </div>
            <div class="our-services__buttons">
              <Button class="--large" @click="onClick(selectedService, 'Оставьте заявку — подключимся к вашей задаче и предложим план действий')">Оставьте заявку</Button>
              <Button class="--large --quaternary">Подробнее</Button>
            </div>
          </div>
        </div>
        <div class="our-services__services-list">
          <button
              v-for="service in services"
              :class="{'--selected': service === selectedService}"
              @click="onClickService(service)"
          >
            {{ service.title_short ?? service.title }}
          </button>
        </div>
      </div>
      <div class="our-services__not-found">
        <div>
          <div>Не нашли для себя подходящий формат?</div>
          <p>
            <span>Мы можем сформировать особый набор услуг по продвижению под ваши</span>
            <span>запросы и пожелания. Вам нужно лишь оставить свои контакты в форме</span>
          </p>
          <Button class="--large --tertiary" @click="onClick(null, 'Оставьте заявку, свяжемся и предложим решение под вашу задачу')">Получить предложение</Button>
        </div>
        <div>
          <img src="/img/our-services-logo.png" alt="logo-alt">
          <BackgroundLightBlue />
        </div>
      </div>
    </div>
  </section>
</template>
