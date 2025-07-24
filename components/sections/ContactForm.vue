<script setup lang="ts">
import Input from '~/components/form/Input.vue'
import Checkbox from '~/components/form/Checkbox.vue'

const isAgree = ref(true)
</script>

<template>
  <section class="contact-form">
    <div class="contact-form__container">
      <div>
        <h3>
          <span>Оставьте заявку —</span>
          <span>Мы свяжемся с вами</span>
        </h3>
        <p>
          <span>Расскажем, как работать с репутацией,</span>
          <span>покажем наши успешные кейсы</span>
          <span>и предложим индивидуальное решение</span>
        </p>
      </div>
      <form autocomplete="off">
        <Input placeholder="Имя" />
        <div class="contact-form__group input__group">
          <Input placeholder="Номер телефона" required />
          <Input placeholder="Email" required />
        </div>
        <Button class="--large">Заказать консультацию</Button>
        <p>Нажимая на кнопку, я соглашаюсь на <a target="_blank" href="/docs/personal-data-processing-policy.pdf">обработку персональных данных</a></p>
        <Checkbox v-model="isAgree"><a target="_blank" href="/docs/consent-to-receive-advertising.pdf">Я согласен получить рекламу и звонки</a></Checkbox>
      </form>
    </div>
    <svg><use :href="'/sprite.svg#circle-star-1'" /></svg>
    <svg><use :href="'/sprite.svg#circle-star-2'" /></svg>
  </section>
</template>