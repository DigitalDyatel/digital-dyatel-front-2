<script setup lang="ts">
let io: IntersectionObserver | undefined = undefined

const toTopIntersectionTemplateRef = useTemplateRef<HTMLDivElement>('toTopIntersectionTemplateRef')

const { scrollIsDeep } = useGlobalState()

onMounted(() => {
  const customScrollEl = document.querySelector('.main-custom-scroll').children[0]

  let lastY = customScrollEl ? customScrollEl.scrollTop : undefined

  io = new IntersectionObserver((entries) => {

    const currentY = customScrollEl.scrollTop
    const scrollingUp = currentY < lastY

    lastY = currentY

    if (entries[0].isIntersecting) {
      scrollIsDeep.value = true
      return
    }

    const bounding = entries[0].boundingClientRect;

    if (scrollingUp && bounding.top > 0) {
      scrollIsDeep.value = false
    }
  }, {
    root: null,
  })

  io.observe(toTopIntersectionTemplateRef.value)
})
</script>

<template>
  <div ref="toTopIntersectionTemplateRef" class="deep-scroll-hook-intersection" />
</template>