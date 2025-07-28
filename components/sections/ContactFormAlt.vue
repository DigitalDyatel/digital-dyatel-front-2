<script setup lang="ts">
import Input from '~/components/form/Input.vue'
import Checkbox from '~/components/form/Checkbox.vue'
import ProcessingPersonalDataAgree from '~/components/form/ProcessingPersonalDataAgree.vue'

const isAgree = ref(true)
</script>

<template>
  <section class="contact-form-alt">
    <div class="contact-form-alt__container">
      <h3>Остались вопросы?</h3>
      <form>
        <div class="contact-form-alt__group">
          <Input placeholder="Имя"/>
          <Input placeholder="Номер телефона" required/>
          <Input placeholder="Email" required/>
        </div>
        <Button class="--large">Оставить заявку</Button>
      </form>
      <ProcessingPersonalDataAgree />
      <Checkbox v-model="isAgree"><a target="_blank" href="/docs/consent-to-receive-advertising.pdf">Я согласен получить рекламу и звонки</a></Checkbox>
      <svg><use :href="'/sprite.svg#circle-star-1'" /></svg>
      <svg><use :href="'/sprite.svg#circle-star-3'" /></svg>
    </div>
  </section>
</template>