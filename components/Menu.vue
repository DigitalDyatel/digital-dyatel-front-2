<script setup lang="ts">
import Logo from '~/assets/svg/logo.svg?component'
import Button from '~/components/Button.vue'

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
          <Button style="display: none;" class="--rounded --type-search">
            <svg>
              <use :href="'/sprite.svg#search'"/>
            </svg>
          </Button>
          <Button class="--rounded --type-grey">
            info@digitaldyatel.ru
          </Button>
          <Button class="--rounded">
            Заказать звонок
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>