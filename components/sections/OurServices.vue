<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import { type Case } from '~/constants'
import BackgroundLightBlue from '~/assets/svg/background-light-blur.svg?component'
import TagWithLabel from '~/components/TagWithLabel.vue'
import FormModal from '~/components/modals/FormModal.vue'

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

const onClick = (_case?: Case, title: string) => {

  const attrs = {}

  if (_case) {
    attrs.data = _case
  }

  const { open, close } = useModal({
    component: FormModal,
    attrs: {
      title,
      onConfirm: () => {
        close()
      },
      ...attrs
    },
  })

  open()
}
</script>

<template>
  <section class="our-services">
    <div class="our-services__container">
      <h2>Наши услуги</h2>
      <TagWithLabel icon="hashtag" class="--alternative-color our-services__tag">#мы предлагаем</TagWithLabel>
      <div class="our-services__services">
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
          <Button class="--large --tertiary" @click="onClick(undefined, 'Оставьте заявку, свяжемся и предложим решение под вашу задачу')">Получить предложение</Button>
        </div>
        <div>
          <img src="/img/our-services-logo.png" alt="logo-alt">
          <BackgroundLightBlue />
        </div>
      </div>
    </div>
  </section>
</template>
