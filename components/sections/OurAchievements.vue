<script setup lang="ts">
import TagWithLabel from '~/components/shared/TagWithLabel.vue'

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
        <div class="our-achievements__achievement" v-for="(achievement, i) in achievements" v-gsap.whenVisible.once.from='{ autoAlpha: 0, start: "top 80%", end: "bottom 10%"}'>
          <div class="our-achievements__achievement-group">
            <div class="our-achievements__achievement-badge">
              <span>{{ i + 1 }}</span>
              <svg><use :href="'/sprite.svg#done'" /></svg>
            </div>
            <div>{{ achievement.left }}</div>
          </div>
          <div class="our-achievements__achievement-description">{{ achievement.right }}</div>
        </div>
      </div>
    </div>
  </section>
</template>