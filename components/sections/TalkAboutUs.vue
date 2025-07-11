<script setup lang="ts">
const mediaResources = ref([
  {
    img: 'm24.png',
    alt: 'Москва 24',
  },
  {
    img: 'forbes.png',
    alt: 'Forbes',
  },
  {
    img: 'russia-1.png',
    alt: 'Россия 1',
  },
  {
    img: 'snob.png',
    alt: 'Сноб',
    isWithTag: true,
  },
])
</script>

<template>
  <section class="talk-about-us">
    <h2>О нас говорят</h2>
    <div class="talk-about-us__resources">
      <div v-for="mediaResource in mediaResources">
        <div v-if="mediaResource.isWithTag" class="talk-about-us__resource-tag">
          <TagWithLabel class="--alternative-rotate" icon="heart-search">#мы в сми</TagWithLabel>
        </div>
        <img :src="'/img/media/' + mediaResource.img" :alt="mediaResource.alt">
      </div>
      <div>
        <a href=""><span>Все публикации</span><Tag as-span icon="login"/></a>
      </div>
    </div>
  </section>
</template>