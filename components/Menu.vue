<script setup lang="ts">
import Logo from '~/assets/svg/logo.svg?component'
import Button from '~/components/Button.vue'
import { onClickOutside } from '@vueuse/core'
import { type CustomRuntimeConfig } from '~/types'

const config = useRuntimeConfig() as CustomRuntimeConfig

const contactUsIsOpen = ref(false)
const contactUsTemplateRef = useTemplateRef<HTMLDivElement>('contactUsTemplateRef')

let clickOutsideFunction: ReturnType<typeof onClickOutside> | undefined = undefined

interface MenuItem {
  label: string,
  icon?: string,
  sub?: any[]
}

const menuItems = ref<MenuItem[]>([
  {
    label: 'Услуги',
    icon: 'hashtag',
  },
  {
    label: 'О нас',
  },
  {
    label: 'Команда',
  },
  {
    label: 'Кейсы',
  },
  {
    label: 'Отзывы',
  },
])

const toggleContactUs = () => {

  if (contactUsIsOpen.value) {
    contactUsIsOpen.value = false
    clickOutsideFunction()
    return
  }

  contactUsIsOpen.value = true

  nextTick(() => {
    clickOutsideFunction = onClickOutside(contactUsTemplateRef.value, () => {
      clickOutsideFunction?.()
      contactUsIsOpen.value = false
    })
  })
}

onMounted(() => {

})
</script>

<template>
  <div class="menu">
    <div class="menu__container">
      <div class="menu__flex">
        <div class="menu__left">
          <Logo width="48" height="48" filled/>
          <div>
            <div>Digital Dyatel</div>
          </div>
        </div>
        <div class="menu__middle">
          <div class="menu__list">
            <div class="menu__list-item" v-for="menuItem in menuItems">
              <svg v-if="menuItem.icon">
                <use :href="'/sprite.svg#' + menuItem.icon"/>
              </svg>
              <div>{{ menuItem.label }}</div>
              <svg v-if="menuItem.sub">
                <use :href="'/sprite.svg#dropdown'"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="menu__right">
          <div class="menu__button-group">
            <Button style="display: none;" class="--rounded --type-search">
              <svg>
                <use :href="'/sprite.svg#search'"/>
              </svg>
            </Button>
            <Button class="--rounded --type-grey">
              {{ config.public.email }}
            </Button>
            <Button class="--rounded" @click="toggleContactUs">
              Заказать звонок
            </Button>
          </div>
          <transition name="fade-in">
            <div ref="contactUsTemplateRef" class="menu__contact-us" v-if="contactUsIsOpen">
              <div class="menu__contact-us-line">
                <div class="menu__contact-us-header">Связаться с нами</div>
                <svg @click="toggleContactUs"><use :href="'/sprite.svg#close'" /></svg>
              </div>
              <div class="menu__contact-us-line">
                <div class="menu__contact-us-phones" v-for="phone in config.public.phones">
                  <div class="menu__contact-us-phone">
                    <div>{{ phone.phone }}</div>
                    <div>{{ phone.description }}</div>
                  </div>
                </div>
              </div>
              <div class="menu__contact-us-line --social">
                <Button>Обратный звонок</Button>
                <div class="menu__contact-us-social-group">
                  <Button class="--tertiary"><svg><use :href="'/sprite.svg#telegram'" /></svg></Button>
                  <Button class="--tertiary"><svg><use :href="'/sprite.svg#whatsapp'" /></svg></Button>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-in-enter-active, .fade-in-leave-active {
  transition: all .1s ease-out;
}
.fade-in-enter-from {
  opacity: 0;
  transform: rotateX(-30deg) scale(.9);
}
.fade-in-leave-to {
  opacity: 0;
  transform: rotateX(-30deg) scale(.9);
}
</style>