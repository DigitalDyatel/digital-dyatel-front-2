<script setup lang="ts">
const points = ref([
  {
    title: 'Столкнулись с клеветой',
    icon: 'emoji-sad'
  },
  {
    title: 'Нет информации о вас в сети',
    icon: 'global-search',
    reverse: true,
  },
  {
    title: 'Беспокоят негативные отзывы в сети',
    icon: 'dislike',
    reverse: true
  },
  {
    title: 'Выводите новый продукт на рынок',
    icon: 'rocket'
  },
  {
    title: 'Фейковые отзывы и новости',
    icon: 'negative-chat',
    reverse: true
  },
])
</script>

<template>
  <section class="when-need-reputation">
    <div class="when-need-reputation__container">
      <div class="when-need-reputation__circles">
        <div v-for="_ in 3" />
      </div>
      <h2 v-gsap.desktop.parallax.faster>
        <span>В каком случае обращаются за </span>
        <span>услугами в репутационную компанию?</span>
      </h2>

      <div class="when-need-reputation__points">
        <div
            class="when-need-reputation__point"
            v-for="point in points"
            :class="{'--reverse': point.reverse}"
            v-gsap.desktop.whenVisible.once.from='{ autoAlpha: 0, start: "top 80%", end: "bottom 10%"}'
            v-gsap.mobile.whenVisible.once.from='{ autoAlpha: 0, start: "top 90%", end: "bottom 10%"}'
        >
          <div>{{ point.title }}</div>
          <div>
            <svg><use :href="'/sprite.svg#' + point.icon" /></svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>