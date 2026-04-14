<script setup lang="ts">
import Button from "~/components/shared/Button.vue";
import Tag from "~/components/shared/Tag.vue";

const list1 = [
  '<b>Нейтральная:</b> +5% в Яндексе, +2% в Google',
  '<b>Нерелевантная:</b> +2% в Яндексе, +4% в Google'
]

const list2 = [
    'Перевести нейтрал в позитив: добавить отзывы, обновить описания, прикрепить фото',
    'Использовать жалобы и крауд-механики для размывания нерелевантных ссылок',
    'Создать рейтинговые подборки, где бренд упоминается как эксперт/участник',
    'Усилить карточки на Яндекс.Картах, Zoon, 2GIS, Flamp'
]
</script>

<template>
  <section class="free-audit">
    <h2>Бесплатный аудит за 24 часа</h2>
    <div class="free-audit__container">
      <div class="free-audit__first">
        <div class="free-audit__slide slide-3">
          <div class="slide-3__blur" />
          <div class="slide-3__container">
            <div class="slide-3__header">
              <div>Рост нейтральной и нерелеватной выдачи</div>
              <div><Tag icon="clip" /></div>
            </div>
            <ul>
              <li v-for="text in list1">
                <div><svg><use href="/sprite.svg#play"></use></svg></div>
                <div v-html="text" />
              </li>
            </ul>
            <p>Это снижает управляемость репутации и уводит пользователей к посторонним источникам</p>
            <div class="slide-3__solution">
              <svg><use href="/sprite.svg#arrow-down"></use></svg>
              <ul>
                <li v-for="text in list2">
                  <div><svg><use href="/sprite.svg#play"></use></svg></div>
                  <div v-html="text" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="free-audit__last">
        <div>
          <div>Что вы получите после аудита:</div>
          <ul>
            <li>Разбор текущей поисковой выдачи (Яндекс / Google): где вы сейчас и что видит клиент</li>
            <li>Список площадок, которые формируют ваше мнение в интернете</li>
            <li>Карту негатива: где, какой и насколько он влияет на решения клиентов</li>
            <li>Четкие точки роста: что можно быстро усилить и где теряются деньги</li>
            <li>Конкретные гипотезы и решения под вашу ситуацию</li>
            <li>Пошаговый план работ на 1-3 месяца с приоритетами</li>
          </ul>
        </div>
        <Button class="--large" type="submit">Получить бесплатный SERM аудит</Button>
      </div>
    </div>
  </section>
</template>