<script setup lang="ts">
import { useFooter } from '@/composables/sections/Footer'
import LogoAlt from 'assets/svg/logo-alt.svg?component'

const {
  currentYear,
  config,
  metro,
  callMeModal,
  clickOnPhone,
  clickEmail
} = useFooter()
</script>

<template>
  <div class="footer__line --with-gap --only-desktop">
    <div class="footer__column --logo">
      <div class="footer__logo-container">
        <LogoAlt/>
        <div>Digital Dyatel</div>
      </div>
      <div class="footer__text">© {{ currentYear }} Digital Dyatel</div>
      <div class="footer__text --small">
        <span>Все права защищены.</span>
        <span>При копировании информации ссылка на источник обязательна</span>
      </div>
    </div>
    <div class="footer__column --phones">
      <div><a class="footer__link --underline" @click="callMeModal()">Позвоните мне</a></div>
      <div class="footer__phones">
        <div class="footer__phone" v-for="phone in config.public.phones">
          <a class="footer__link --underline-on-hover" @pointerdown="clickOnPhone(phone)"
             @contextmenu.prevent>{{ phone.phone }}</a>
          <div>{{ phone.description }}</div>
        </div>
      </div>
    </div>
    <div class="footer__column --contacts">
      <div><a class="footer__link --underline-on-hover" @pointerdown="clickEmail" @contextmenu.prevent
              aria-label="Написать на почту">{{ config.public.email }}</a></div>
      <div class="footer__social">
        <div><a class="footer__link --underline" target="_blank" :href="config.public.whatsapp">Написать в WhatsApp</a>
        </div>
        <div><a class="footer__link --underline" target="_blank" :href="config.public.telegram">Написать в Telegram</a>
        </div>
      </div>
    </div>
    <div class="footer__column --address">
      <div class="footer__text --primary --no-wrap">{{ config.public.legal.address }}</div>
      <div class="footer__text">Режим работы: {{ config.public.legal.openingHours }}</div>
      <div class="footer__metro">
        <svg>
          <use :href="'/sprite.svg#metro'"/>
        </svg>
        <div><span v-for="_metro in metro">{{ _metro }}</span></div>
      </div>
    </div>
  </div>
  <div class="footer__line --only-desktop">
    <div class="footer__column">
      <div class="footer__text --no-wrap">{{ config.public.legal.details }}</div>
    </div>
    <div class="footer__column">
      <a class="footer__link --secondary --contrast-on-hover" target="_blank" href="/docs/privacy-policy.pdf">Политика
        конфиденциальности</a>
    </div>
    <div class="footer__column --center">
      <a class="footer__link --secondary --contrast-on-hover" target="_blank" href="/docs/offer.pdf">Оферта</a>
    </div>
    <div class="footer__column">
      <a class="footer__link --secondary --contrast-on-hover" target="_blank" href="/docs/user-agreement.pdf">Пользовательское
        соглашение</a>
    </div>
  </div>
</template>
