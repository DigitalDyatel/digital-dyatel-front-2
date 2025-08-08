<script setup lang="ts">
import Button from '~/components/Button.vue'
import FormModal from '~/components/modals/FormModal.vue'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'
import { useModal } from 'vue-final-modal'

const tagsTemplateRef = useTemplateRef('tagsTemplateRef')

let isTouching = false;
let startX = 0;
let scrollStartX = 0;
let lastX = 0;
let velocity = 0;
let lastTime = 0;

let io: IntersectionObserver | undefined = undefined

const isMobileTagsOverlayHidden = ref(false)

const advantages = [
    'Стратегия под ваши цели',
    'Реальные отзывы',
    'Конфиденциальность',
    'Понятные результаты'
]

const tags = ref([
    'ORM',
    'SERM',
    'Репутация с нуля',
    'Мониторинг',
    'Создание позитивного контента'
])

const onClick = () => {
  const { open, close } = useModal({
    component: FormModal,
    attrs: {
      title: 'Получите бесплатный аудит и рекомендации по улучшению имиджа в интернете',
      withFiles: true,
      onConfirm: () => {
        close()

        const thankYouModal = useModal({component: ThankYouModal})
        thankYouModal.open()
      }
    },
  })

  open()
}

const touchStartEventListener = e => {
  if (e.touches.length !== 1) return;

  isTouching = true;
  startX = e.touches[0].pageX;
  scrollStartX = tagsTemplateRef.value.scrollLeft;
  lastX = startX;
  lastTime = Date.now();
  velocity = 0;
}

const touchMoveEventListener = e => {
  if (!isTouching || e.touches.length !== 1) return;

  e.preventDefault()

  const currentX = e.touches[0].pageX;
  const dx = currentX - startX;
  tagsTemplateRef.value.scrollLeft = scrollStartX - dx;

  const now = Date.now();
  const deltaX = currentX - lastX;
  const deltaTime = now - lastTime;
  velocity = (deltaX / deltaTime) * 16;

  lastX = currentX;
  lastTime = now;
}

const touchEndEventListener = e => {
  if (!isTouching) return;
  isTouching = false;

  const friction = 0.95;
  function inertiaScroll() {
    velocity *= friction;
    tagsTemplateRef.value.scrollLeft -= velocity;

    if (Math.abs(velocity) > 0.5) {
      requestAnimationFrame(inertiaScroll);
    }
  }

  if (Math.abs(velocity) > 1) {
    requestAnimationFrame(inertiaScroll);
  }
}

onMounted(() => {
  if (window.innerWidth >= 768) {
    return
  }

  tagsTemplateRef.value.addEventListener('touchstart', touchStartEventListener, { passive: true });
  tagsTemplateRef.value.addEventListener('touchmove', touchMoveEventListener, { passive: false })
  tagsTemplateRef.value.addEventListener('touchend', touchEndEventListener)

  const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isMobileTagsOverlayHidden.value = entry.isIntersecting
        });
      },
      {
        root: tagsTemplateRef.value,
        threshold: 1.0,
      }
  );
  io.observe(tagsTemplateRef.value.children[tags.value.length - 1])
})

onUnmounted(() => {
  if (window.innerWidth >= 768) {
    return
  }

  tagsTemplateRef.value.removeEventListener('touchstart', touchStartEventListener, { passive: true });
  tagsTemplateRef.value.removeEventListener('touchmove', touchMoveEventListener, { passive: false })
  tagsTemplateRef.value.removeEventListener('touchend', touchEndEventListener)
  io.disconnect()
})
</script>

<template>
  <section class="hero">
    <div class="hero__container">
      <div class="hero__left">
        <h1>
          <span>Управление </span>
          <span>репутацией </span>
          <span>в интернете</span>
        </h1>
        <div class="hero__tags-container">
          <div class="hero__tags-overlay" :class="{'--hidden': isMobileTagsOverlayHidden}"/>
          <div class="hero__tags" ref="tagsTemplateRef">
            <div v-for="tag in tags">
              {{ tag }}
            </div>
          </div>
        </div>
        <div class="hero__visual-mobile">
          <div class="hero__advantages-mobile">
            <div v-for="advantage in advantages">
              <svg><use :href="'/sprite.svg#circle-star'" /></svg>
              <div>{{ advantage }}</div>
            </div>
          </div>
          <div class="hero__circle-container-mobile --top">
            <div class="hero__circle" />
          </div>
          <div class="hero__circle-container-mobile --center">
            <div class="hero__circle" />
          </div>
          <div class="hero__circle-container-mobile --bottom">
            <div class="hero__circle" />
          </div>
          <div class="hero__active-gradient-mobile">
            <div v-for="n in 3" :key="n" />
          </div>
        </div>
        <div class="hero__button-container" @click="onClick">
          <Button class="--large --no-wrap">
            Получить бесплатный SERM аудит
          </Button>
          <Button class="--large">
            <svg><use :href="'/sprite.svg#login'" /></svg>
            <svg><use :href="'/sprite.svg#login'" /></svg>
          </Button>
        </div>
      </div>
      <div class="hero__right">
        <div class="hero__circle-container">
          <svg v-for="n in 4" :key="n"><use :href="'/sprite.svg#circle-star'" /></svg>
          <div class="hero__circle" />
        </div>
        <div class="hero__circle-container">
          <div class="hero__circle" />
        </div>
        <div class="hero__circle-container">
          <div class="hero__circle" />
        </div>
        <div class="hero__active-gradient">
          <div v-for="n in 4" :key="n" />
        </div>
        <div class="hero__advantages">
          <div v-for="advantage in advantages">{{  advantage }}</div>
        </div>
      </div>
    </div>
  </section>
</template>