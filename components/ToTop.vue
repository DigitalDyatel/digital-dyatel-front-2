<script setup lang="ts">
const { goToAnchor } = useAnchor()
const { scrollIsDeep } = useGlobalState()
</script>

<template>
  <div class="to-top" :class="{'--active': scrollIsDeep}">
    <div class="to-top__top-button"  @click="goToAnchor('.hero')">
      <svg><use :href="'/sprite.svg#to-top'" /></svg>
    </div>
  </div>
</template>