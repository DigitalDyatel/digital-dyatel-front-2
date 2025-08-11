<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useModal } from 'vue-final-modal'
import { type CustomRuntimeConfig } from '~/types'
import Logo from '~/assets/svg/logo.svg?component'
import Button from '~/components/Button.vue'
import FormModal from '~/components/modals/FormModal.vue'
import ThankYouModal from '~/components/modals/ThankYouModal.vue'

const config = useRuntimeConfig() as CustomRuntimeConfig
const notification = useNotification()
const device = useDevice()
const { goToAnchor } = useAnchor()

const contactUsIsOpen = ref(false)
const contactUsTemplateRef = useTemplateRef<HTMLDivElement>('contactUsTemplateRef')
const isShowMenuByScroll = ref(true)
const isBurgerMenuOpen = ref(false)

const { scrollIsDeep } = useGlobalState()

let lastScrollTop = undefined
let isTicking = false

let clickOutsideFunction: ReturnType<typeof onClickOutside> | undefined = undefined

interface MenuItem {
  label: string,
  scrollSelector: string,
  class?: string,
  icon?: string,
  sub?: any[]
}

const menuItems = ref<MenuItem[]>([
  {
    label: 'Услуги',
    icon: 'hashtag',
    scrollSelector: '.our-services'
  },
  {
    label: 'О нас',
    scrollSelector: '.solve-problems'
  },
  {
    label: 'Команда',
    scrollSelector: '.team'
  },
  {
    label: 'Кейсы',
    class: '--cases',
    scrollSelector: '.cases'
  },
  {
    label: 'Отзывы',
    scrollSelector: '.reviews'
  },
])

const toggleContactUs = (e) => {

  if (contactUsIsOpen.value) {
    contactUsIsOpen.value = false
    clickOutsideFunction?.()
    return
  }

  contactUsIsOpen.value = true

  const buttonEl = e.target

  nextTick(() => {
    clickOutsideFunction = onClickOutside(contactUsTemplateRef.value, (e) => {
      if (e.target === buttonEl) {
        return
      }

      clickOutsideFunction?.()
      contactUsIsOpen.value = false
    })
  })
}

const toggleContactUsForMobile = () => {

  isBurgerMenuOpen.value = false

  if (contactUsIsOpen.value) {
    contactUsIsOpen.value = false
    return
  }

  contactUsIsOpen.value = true
}

const copyEmailToClipboard = async () => {
  await navigator.clipboard.writeText(config.public.email)
  notification.fire({title: 'Email скопирован!'})
}

const onClickMenu = (menuItem: MenuItem) => {
  goToAnchor(menuItem.scrollSelector)
}

const clickOnPhone = async (phone) => {
  if (device.isMobile()) {
    const a = document.createElement('a')
    a.href = 'tel:' + phone.phoneRaw
    a.click()
    a.remove()
    return
  }

  await navigator.clipboard.writeText(phone.phoneRaw)
  notification.fire({
    title: 'Телефон скопирован!',
    class: 'izi-toast',
  })
}

const createLinkAndFollow = (href: string) => {
  const a = document.createElement('a')
  a.target = '_blank'
  a.href = href
  a.click()
  a.remove()
}

const openFormModal = () => {
  const { open, close } = useModal({
    component: FormModal,
    attrs: {
      title: 'Оставьте номер, обсудим детали',
      buttonText: 'Жду звонка',
      onConfirm: () => {
        close()

        const thankYouModal = useModal({
          component: ThankYouModal,
          attrs: {
            onClose: () => {
              thankYouModal.close()
              contactUsIsOpen.value = false
            }
          }
        })
        thankYouModal.open()
      }
    },
  })

  open()
}

const scrollEventListener = (e) => {

  if (!isTicking) {
    requestAnimationFrame(() => {
      isShowMenuByScroll.value = e.target.scrollTop <= lastScrollTop;
      lastScrollTop = e.target.scrollTop
      isTicking = false
    })

    isTicking = true
  }
}

const onClickGetFreeSERMAudit = () => {
  const { open, close } = useModal({
    component: FormModal,
    attrs: {
      title: 'Получите бесплатный аудит и рекомендации по улучшению имиджа в интернете',
      withFiles: true,
      onConfirm: () => {
        close()

        const thankYouModal = useModal({
          component: ThankYouModal,
          attrs: {
            onClose: () => {
              thankYouModal.close()
              isBurgerMenuOpen.value = false
            }
          }
        })
        thankYouModal.open()
      }
    },
  })

  open()
}

watch(scrollIsDeep, (currentScrollIsDeep) => {

  const mainScrollEl = document.querySelector('.main-custom-scroll').children[0]

  if (currentScrollIsDeep) {
    lastScrollTop = mainScrollEl.scrollTop
    mainScrollEl.addEventListener('scroll', scrollEventListener)

    return
  }

  mainScrollEl.removeEventListener('scroll', scrollEventListener)
})

onUnmounted(() => {
  document.querySelector('.main-custom-scroll').children[0].removeEventListener('scroll', scrollEventListener)
})
</script>

<template>
  <!-- menu-desktop -->
  <div class="menu" :class="{'--hidden': !isShowMenuByScroll}">
    <div class="menu__container">
      <div class="menu__flex">
        <div class="menu__left" @click="goToAnchor('.hero')">
          <Logo width="48" height="48" />
          <div>
            <div>Digital Dyatel</div>
          </div>
        </div>
        <div class="menu__middle">
          <div class="menu__list">
            <div class="menu__list-item" :class="menuItem.class" v-for="menuItem in menuItems" @click="onClickMenu(menuItem)">
              <span v-if="menuItem.class === '--cases'">+{{ config.public.casesMenuCount }}</span>
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
            <Button class="--rounded --type-grey" @pointerdown="copyEmailToClipboard" @contextmenu.prevent>
              {{ config.public.email }}
            </Button>
            <Button class="--rounded" @click="toggleContactUs">
              Заказать звонок
            </Button>
          </div>
          <transition name="menu-contact-us-fade-in">
            <div ref="contactUsTemplateRef" class="menu__contact-us" v-if="contactUsIsOpen">
              <div class="menu__contact-us-line">
                <div class="menu__contact-us-header">Связаться с нами</div>
                <svg @click="toggleContactUs"><use :href="'/sprite.svg#close'" /></svg>
              </div>
              <div class="menu__contact-us-line">
                <div class="menu__contact-us-phones" v-for="phone in config.public.phones">
                  <div class="menu__contact-us-phone">
                    <div @pointerdown="clickOnPhone(phone)" @contextmenu.prevent>{{ phone.phone }}</div>
                    <div>{{ phone.description }}</div>
                  </div>
                </div>
              </div>
              <div class="menu__contact-us-line --social">
                <Button @click="openFormModal">Обратный звонок</Button>
                <div class="menu__contact-us-social-group">
                  <Button class="--tertiary" @click="createLinkAndFollow(config.public.telegram)"><svg><use :href="'/sprite.svg#telegram'" /></svg></Button>
                  <Button class="--tertiary" @click="createLinkAndFollow(config.public.whatsapp)"><svg><use :href="'/sprite.svg#whatsapp'" /></svg></Button>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>

  <!-- menu-mobile -->
  <div class="menu-mobile">
    <div class="menu-mobile__overlay" :class="{'--active': isBurgerMenuOpen || contactUsIsOpen}" @click="isBurgerMenuOpen = false; contactUsIsOpen = false;"/>
    <div class="menu-mobile__menu-container">
      <div class="menu-mobile__menu-header">
        <div class="menu-mobile__side" @click="isBurgerMenuOpen = false; contactUsIsOpen = false;">
          <Logo width="44" height="44" />
        </div>
        <div class="menu-mobile__side --right">
          <Button class="--rounded" @click="toggleContactUsForMobile">Заказать звонок</Button>
          <div class="menu-mobile__button-group">
            <Button style="display: none;" class="--rounded --type-search" @contextmenu.prevent @click="toggleContactUsForMobile">
              <svg>
                <use :href="'/sprite.svg#search'"/>
              </svg>
            </Button>
            <Button class="--rounded --type-grey" @contextmenu.prevent @click="isBurgerMenuOpen = !isBurgerMenuOpen; contactUsIsOpen = false">
              <svg>
                <use :href="'/sprite.svg#burger'"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
      <div class="menu-mobile__content-container">
        <transition name="menu-contact-us-fade-in">
          <div class="menu-mobile__content --call" v-if="contactUsIsOpen">
            <div class="menu-mobile__contact-us-header">
              <div >Связаться с нами</div>
              <svg @click="toggleContactUs"><use :href="'/sprite.svg#close'" /></svg>
            </div>
            <div class="menu-mobile__contact-us-phones">
              <div class="menu-mobile__contact-us-phone" v-for="phone in config.public.phones">
                <div @click="clickOnPhone(phone)">{{ phone.phone }}</div>
                <div>{{ phone.description }}</div>
              </div>
            </div>
            <Button @click="openFormModal">Обратный звонок</Button>
          </div>
        </transition>
        <transition name="menu-contact-us-fade-in">
          <div class="menu-mobile__content --menu" v-if="isBurgerMenuOpen">
            <div class="menu-mobile__list">
              <div class="menu-mobile__list-item" :class="menuItem.class" v-for="menuItem in menuItems">
                <div>
                  <span v-if="menuItem.class === '--cases'">+{{ config.public.casesMenuCount }}</span>
                  {{ menuItem.label }}
                </div>
                <div v-if="menuItem.sub">
                  <svg v-if="menuItem.sub">
                    <use :href="'/sprite.svg#dropdown'"/>
                  </svg>
                </div>
              </div>
            </div>
            <Button @click="onClickGetFreeSERMAudit">Получить бесплатный SERM аудит</Button>
            <div class="menu-mobile__phones">
              <div class="menu-mobile__phone" @click="clickOnPhone(phone)" v-for="phone in config.public.phones">
                <div>{{ phone.phone }}</div>
                <div>{{ phone.description }}</div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>