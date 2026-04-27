<script setup lang="ts">
import Button from '~/components/shared/Button.vue'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'
import { useModal } from 'vue-final-modal'
import { FROM_TRIGGER } from '~/constants'
import Input from "~/components/shared/form/Input.vue";
import InputPhone from "~/components/shared/form/InputPhone.vue";
import apiContacts, {
  type FormDataCreate,
  type FormDataCreateErrors,
  getDefaultFormDataCreate
} from '~/api/contacts'
import ProcessingPersonalDataAgree from "~/components/shared/form/ProcessingPersonalDataAgree.vue";
import Checkbox from "~/components/shared/form/Checkbox.vue";
import FormModal from "~/components/modals/FormModal.vue";

const errors = ref<FormDataCreateErrors>({} as FormDataCreateErrors)
const formData = ref<FormDataCreate>(getDefaultFormDataCreate(FROM_TRIGGER.CONTACT_FORM_1))
const { reachGoal } = useYandexMetrika()

let interval: ReturnType<typeof setInterval> | null = null

const serverNow = useState<number>('server-now', () => Date.now())
const timeLeft = ref('')

const tagsTemplateRef = useTemplateRef('tagsTemplateRef')

let isTouching = false;
let startX = 0;
let scrollStartX = 0;
let lastX = 0;
let velocity = 0;
let lastTime = 0;

const isMounted = ref(false)

const getEndOfWeek = (baseTime: number) => {
  const now = new Date(baseTime)

  const day = (now.getDay() + 6) % 7
  const diffToSunday = 6 - day

  const end = new Date(now)
  end.setDate(now.getDate() + diffToSunday)
  end.setHours(23, 59, 59, 999)

  return end
}

const targetDate = getEndOfWeek(serverNow.value)

const getDiff = (nowMs: number) => {
  return targetDate.getTime() - nowMs
}

const getDayWord = (n: number) => {
  n = Math.abs(n) % 100;
  const lastDigit = n % 10;

  if (n > 10 && n < 20) {
    return 'дней';
  }
  if (lastDigit > 1 && lastDigit < 5) {
    return 'дня';
  }
  if (lastDigit === 1) {
    return 'день';
  }
  return 'дней';
}

const format = (diff: number) => {
  if (diff <= 0) return 'Предложение недоступно'

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  const daysString = days === 0 ? '' : days + ' ' + getDayWord(days)

  return `${daysString} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const tags = ref([
    {
      title: 'Работа с отзывами',
      class: '--accent'
    },
    {
      title: 'ORM',
    },
    {
      title: 'SERM'
    },
    {
      title: 'Репутация с нуля'
    },
    {
      title: 'Мониторинг'
    },
    {
      title: 'Создание позитивного контента'
    }
])

const clients = [
  {
    src: 'skypro.svg',
    alt: 'skypro-company'
  },
  {
    src: 'moscow.mba.png',
    alt: 'moscow-mba-company'
  },
  {
    src: 'synergy.png',
    alt: 'synergy-company'
  },
  {
    src: 'mitm.jpeg',
    alt: 'mitm-company'
  },
]

const onSubmit = async () => {

  try {
    await apiContacts().create(formData.value)
  } catch (error) {
    errors.value = error
    return
  }

  errors.value = {} as FormDataCreateErrors
  formData.value = getDefaultFormDataCreate(FROM_TRIGGER.CONTACT_FORM_1)

  await (useModal({component: ThankYouModal})).open()
  reachGoal('lead')
}

const onClickButton = () => {
  const { open, close } = useModal({
    component: FormModal,
    attrs: {
      title: 'Запишитесь на разбор — получите план действий по улучшению репутации',
      withFiles: false,
      fromTrigger: FROM_TRIGGER.SHARING_EXPERIENCE_HERO,
      buttonText: 'Записаться на разбор',
      yandexMetrikaGoalID: 'lead',
      onConfirm: () => {
        close()

        const thankYouModal = useModal({
          component: ThankYouModal,
          attrs: {
            title: 'Готово! Файл уже отправлен на вашу почту',
            content: 'Проверьте входящие и папку «Спам» на всякий случай'
          }
        })
        thankYouModal.open()
      }
    },
  })

  open()
  return
}

const touchStartEventListener = e => {
  if (e.touches.length !== 1) return;

  isTouching = true;
  startX = e.touches[0].pageX;
  scrollStartX = tagsTemplateRef.value.scrollLeft;
  lastX = startX;
  lastTime = Date.now();
  velocity = 0;
}

const touchMoveEventListener = e => {
  if (!isTouching || e.touches.length !== 1) return;

  e.preventDefault()

  const currentX = e.touches[0].pageX;
  const dx = currentX - startX;
  tagsTemplateRef.value.scrollLeft = scrollStartX - dx;

  const now = Date.now();
  const deltaX = currentX - lastX;
  const deltaTime = now - lastTime;
  velocity = (deltaX / deltaTime) * 16;

  lastX = currentX;
  lastTime = now;
}

const touchEndEventListener = () => {
  if (!isTouching) return;
  isTouching = false;

  const friction = 0.95;
  function inertiaScroll() {
    velocity *= friction;
    tagsTemplateRef.value.scrollLeft -= velocity;

    if (Math.abs(velocity) > 0.5) {
      requestAnimationFrame(inertiaScroll);
    }
  }

  if (Math.abs(velocity) > 1) {
    requestAnimationFrame(inertiaScroll);
  }
}

onMounted(() => {
  interval = setInterval(() => {
    const diff = getDiff(Date.now())
    timeLeft.value = format(diff)

    isMounted.value = true
  }, 1000)

  if (window.innerWidth >= 1024) {
    return
  }

  tagsTemplateRef.value.addEventListener('touchstart', touchStartEventListener, { passive: true });
  tagsTemplateRef.value.addEventListener('touchmove', touchMoveEventListener, { passive: false })
  tagsTemplateRef.value.addEventListener('touchend', touchEndEventListener)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }

  if (window.innerWidth >= 1024) {
    return
  }

  tagsTemplateRef.value.removeEventListener('touchstart', touchStartEventListener);
  tagsTemplateRef.value.removeEventListener('touchmove', touchMoveEventListener)
  tagsTemplateRef.value.removeEventListener('touchend', touchEndEventListener)
})
</script>

<template>
  <section class="hero">
    <div class="hero__container">
      <div class="hero__left">
        <div class="hero__cup">
          <img :src="'/img/hero/cup.png'" alt="cup">
          <div>Входим в топ 5 SERM агенств СНГ</div>
        </div>
        <h1>
          <span>Управление </span>
          <span>репутацией </span>
          <span>в интернете</span>
        </h1>
        <div class="hero__clients">
          <div>Работаем с:</div>
          <div v-for="client in clients"><img :src="'/img/hero/' + client.src" :alt="client.alt"></div>
        </div>
        <div class="hero__tags" ref="tagsTemplateRef">
          <div v-for="tag in tags" :class="tag.class">
            {{ tag.title }}
          </div>
        </div>
      </div>
      <div class="hero__right">
        <form class="hero__form form" autocomplete="off">
          <h2>Бесплатный аудит репутации за 24 часа: найдем слабые места и точки роста</h2>
          <Input class="--light" :errors="errors.name" v-model="formData.name" placeholder="Имя" />
          <InputPhone class="--light" :errors="errors.phone" v-model="formData.phone" placeholder="Номер телефона" required />
          <Input class="--light" :errors="errors.email" v-model="formData.email" placeholder="Email" type="email" required />
          <div class="hero__button-container" @click.prevent="onSubmit">
            <Button class="--large --no-wrap --black">
              Записаться на аудит репутации
            </Button>
            <Button class="--large --black">
              <svg><use :href="'/sprite.svg#login'" /></svg>
              <svg><use :href="'/sprite.svg#login'" /></svg>
            </Button>
          </div>
          <ProcessingPersonalDataAgree class="--light" button-text="Записаться на разбор" />
          <Checkbox class="--light" :errors="errors.is_agree_to_personal_data_processing" v-model="formData.is_agree_to_personal_data_processing">
            Соглашаюсь с <a target="_blank" href="/docs/personal-data-processing-policy.pdf">политикой обработки персональных данных</a> и даю <a target="_blank" href="/docs/consent-to-personal-data-processing.pdf">согласие на обработку персональных данных</a>
          </Checkbox>
          <Checkbox class="--light" :errors="errors.is_agree_to_receive_ads" v-model="formData.is_agree_to_receive_ads">
            Даю <a target="_blank" href="/docs/consent-to-receive-advertising.pdf">согласие на рекламу и обработку персональных данных в целях рекламной рассылки</a>
          </Checkbox>
        </form>
      </div>
    </div>
    <div class="hero__gift">
      <div class="hero__gift-text">
        <div>«Выдача под контролем: как вытеснить негатив за 5 шагов»</div>
        <div>После разбора репутации отправим чек-лист с шагами, которые можно внедрить сразу</div>
      </div>
      <div>
        <div class="hero__gift-timer" :class="{'--mounted': isMounted}">Предложение действует {{ timeLeft }}</div>
        <Button class="--large --white" @click="onClickButton">
          Записаться на разбор
        </Button>
      </div>
    </div>
  </section>
</template>