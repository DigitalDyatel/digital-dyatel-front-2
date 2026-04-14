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

const errors = ref<FormDataCreateErrors>({} as FormDataCreateErrors)
const formData = ref<FormDataCreate>(getDefaultFormDataCreate(FROM_TRIGGER.CONTACT_FORM_1))
const { reachGoal } = useYandexMetrika()

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
  reachGoal('open-form__set-a-lid')
}
</script>

<template>
  <section class="hero">
    <div class="hero__container">
      <div class="hero__left">
        <div class="hero__cup">
          <img src="/img/hero/cup.png" alt="cup">
          <div>Входим в топ 5 SERM агенств СНГ</div>
        </div>
        <h1>
          <span>Управление </span>
          <span>репутацией </span>
          <span>в интернете</span>
        </h1>
        <div class="hero__companies">
          <div>Работаем с:</div>
          <div v-for="client in clients"><img :src="'/img/hero/' + client.src" :alt="client.alt"></div>
        </div>
        <div class="hero__tags">
          <div v-for="tag in tags" :class="tag.class">
            {{ tag.title }}
          </div>
        </div>
      </div>
      <div class="hero__right">
        <form class="hero__form form" autocomplete="off">
          <h2>Аудит репутации за 24 часа: найдем слабые места и точки роста</h2>
          <Input class="--light" :errors="errors.name" v-model="formData.name" placeholder="Имя" />
          <InputPhone class="--light" :errors="errors.phone" v-model="formData.phone" placeholder="Номер телефона" required />
          <Input class="--light" :errors="errors.email" v-model="formData.email" placeholder="Email" type="email" required />
          <ProcessingPersonalDataAgree class="--light" button-text="Получить бесплатный SERM аудит" />
          <Checkbox class="--light" :errors="errors.is_agree_to_personal_data_processing" v-model="formData.is_agree_to_personal_data_processing">
            Соглашаюсь с <a target="_blank" href="/docs/personal-data-processing-policy.pdf">Политикой обработки персональных данных</a> и даю <a target="_blank" href="/docs/consent-to-personal-data-processing.pdf">Согласие на обработку персональных данных</a>
          </Checkbox>
          <Checkbox class="--light" :errors="errors.is_agree_to_receive_ads" v-model="formData.is_agree_to_receive_ads">
            Даю <a target="_blank" href="/docs/consent-to-receive-advertising.pdf">Согласие на рекламу и обработку персональных данных в целях рекламной рассылки</a>
          </Checkbox>
          <Button class="--large" type="submit" @click.prevent="onSubmit">Заказать консультацию</Button>
        </form>
      </div>
    </div>
  </section>
</template>