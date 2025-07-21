<script setup lang="ts">
const achievements = ref([
  {
    left: '20+',
    right: 'Вывод 20+ брендов в ТОП-10 поисковой выдачи'
  },
  {
    left: '200',
    right: 'Устранение более 200 единиц негатива из поисковых систем'
  },
  {
    left: 'Топ-3',
    right: 'Топ-3 среди агентств по управлению репутацией в области образования'
  },
  {
    left: '4.9 из 5',
    right: 'Средний рейтинг удовлетворенности клиентов — 4.9 из 5'
  },
])
</script>

<template>
  <section class="our-achievements">
    <div class="our-achievements__container">
      <TagWithLabel class="--alternative-rotate" icon="award">#победители</TagWithLabel>
      <h2>Наши достижения</h2>
      <div class="our-achievements__achievements">
        <div v-for="(achievement, i) in achievements">
          <div>{{ i + 1 }}</div>
          <svg><use :href="'/sprite.svg#done'" /></svg>
          <div>{{ achievement.left }}</div>
          <div>{{ achievement.right }}</div>
        </div>
      </div>
    </div>
  </section>
</template>