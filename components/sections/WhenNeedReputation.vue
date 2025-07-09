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
    <h1>
      <span>В каком случае обращаются за</span>
      <span>услугами в репутационную компанию?</span>
    </h1>
    <div class="when-need-reputation__circles">
      <div />
      <div />
      <div />
    </div>
    <div class="when-need-reputation__points">
      <div
          class="when-need-reputation__point"
          v-for="point in points"
          :class="{'--reverse': point.reverse}"
      >
        <div>{{ point.title }}</div>
        <div>
          <svg><use :href="'/sprite.svg#' + point.icon" /></svg>
        </div>
      </div>
    </div>
  </section>
</template>