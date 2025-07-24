<script setup lang="ts">
import LogoAlt from '~/assets/svg/logo-alt.svg?component'
import { type CustomRuntimeConfig } from '~/types'

const config = useRuntimeConfig() as CustomRuntimeConfig

const notification = useNotification()

const phones = ref(config.public.phones)
const metro = ref(config.public.legal.metro.map((metro, i) => {
  return i < config.public.legal.metro.length - 1 ? metro + ',' : metro
}))

const copyEmailToClipboard = async (e) => {
  e.preventDefault()
  await navigator.clipboard.writeText(config.public.email)
  notification.fire({
    title: 'Email скопирован!',
    class: 'izi-toast --white',
  })
}

const callMeModal = () => {
  alert(1)
}
</script>

<template>
  <section class="footer">
    <div class="footer__container">
      <div class="footer__line --with-gap">
        <div class="footer__column --logo">
          <div class="footer__logo-container">
            <LogoAlt />
            <div>Digital Dyatel</div>
          </div>
          <div class="footer__text">© 2024-2025 Digital Dyatel</div>
          <div class="footer__text --small">
            <span>Управление репутацией. Все права защищены.</span>
            <span>При копировании информации ссылка на источник обязательна</span>
          </div>
        </div>
        <div class="footer__column --phones">
          <div><a class="footer__link --underline" @click="callMeModal()">Позвоните мне</a></div>
          <div class="footer__phones">
            <div class="footer__phone" v-for="phone in phones">
              <a class="footer__link">{{ phone.phone }}</a>
              <div>{{ phone.description }}</div>
            </div>
          </div>
        </div>
        <div class="footer__column --contacts">
          <div><a class="footer__link" @click="copyEmailToClipboard">{{ config.public.email }}</a></div>
          <div><a class="footer__link --underline" :href="config.public.whatsapp">Написать в WhatsApp</a></div>
          <div><a class="footer__link --underline" :href="config.public.telegram">Написать в Telegram</a></div>
        </div>
        <div class="footer__column --address">
          <div class="footer__text --primary --no-wrap">{{ config.public.legal.address }}</div>
          <div class="footer__text">Режим работы: {{ config.public.legal.openingHours }}</div>
          <div class="footer__metro">
            <svg><use :href="'/sprite.svg#metro'" /></svg>
            <div><span v-for="_metro in metro">{{ _metro }}</span></div>
          </div>
        </div>
      </div>
      <div class="footer__line">
        <div class="footer__column">
          <div class="footer__text --no-wrap">{{ config.public.legal.details}}</div>
        </div>
        <div class="footer__column">
          <a class="footer__link --secondary" href="/">Политика конфиденциальности</a>
        </div>
        <div class="footer__column --center">
          <a class="footer__link --secondary" href="/">Оферта</a>
        </div>
        <div class="footer__column">
          <a class="footer__link --secondary" href="/">Пользовательское соглашение</a>
        </div>
      </div>
    </div>
  </section>
</template>