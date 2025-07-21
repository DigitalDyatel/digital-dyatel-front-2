<script setup lang="ts">
import LogoAlt from '~/assets/svg/logo-alt.svg?component'

const phones = ref([
  {
    phone: '+7 926 387 5461',
    description: 'Связаться напрямую'
  }
])
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
          <div><a class="footer__link --underline" href="/">Позвоните мне</a></div>
          <div class="footer__phones">
            <div class="footer__phone" v-for="phone in phones">
              <a class="footer__link">{{ phone.phone }}</a>
              <div>{{ phone.description }}</div>
            </div>
          </div>
        </div>
        <div class="footer__column --contacts">
          <div><a class="footer__link" href="/">info@digitaldyatel.ru</a></div>
          <div><a class="footer__link --underline" href="/">Написать в WhatsApp</a></div>
          <div><a class="footer__link --underline" href="/">Написать в Telegram</a></div>
        </div>
        <div class="footer__column --address">
          <div class="footer__text --primary --no-wrap">г. Москва, Дербеневская набережная, д.11</div>
          <div class="footer__text">Режим работы: будние дни 10:00–19:00</div>
          <div class="footer__metro">
            <svg><use :href="'/sprite.svg#metro'" /></svg>
            <div>
              <span>Павелецкая,</span>
              <span>Пролетарская</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer__line">
        <div class="footer__column">
          <div class="footer__text --no-wrap">ИП Дятлова Евгения Александровна, ИНН: 771615282860, ОГРНИП: 322774600601138</div>
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