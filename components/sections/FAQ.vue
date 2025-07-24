<script setup lang="ts">
import { onMounted } from 'vue'

import { onClickOutside } from '@vueuse/core'

const activeQuestionIndex = ref<number|null>(null)

const answerTemplateRef = useTemplateRef<HTMLDivElement[]>('answerTemplateRef')
const questionTemplateRef = useTemplateRef('questionTemplateRef')
const questionsTemplateRef = useTemplateRef<HTMLDivElement>('questionsTemplateRef')
const answerHeights: number[] = []

const questions = ref([
  {
    question: 'Как понять, что компании необходимо начать работу с репутацией?',
    answer: 'Если интерес к вашему бренду снижается, появляется негатив или, наоборот, о компании нет информации в интернете — это первые сигналы, что репутация требует больше внимания. Также управление репутацией необходимо для формирования позитивного имиджа новой компании и создания правильных упоминаний в сети'
  },
  {
    question: 'Могут ли конкуренты «атаковать» мою репутацию?',
    answer: 'Да, конкуренты могут использовать статьи и плохие отзывы для воздействия на ваш имидж. Такая активность имеет серьезные последствия. Мы помогаем вам бороться с этим и предлагаем защиту от негатива в таком порядке: проводим аудит, удаляем негатив и создаем позитивные материалы. Сотрудничая с владельцами крупных онлайн-площадок и сервисов, мы минимизируем риски и держим вашу репутацию под контролем'
  },
  {
    question: 'Какие результаты мы можем получить, сотрудничая с агентством?',
    answer: 'Работа с нами — это улучшение позиций в поисковой выдаче, снятие негатива и создание положительного образа компании. Это помогает укрепить доверие клиентов и партнеров и повысить лояльность. Мы работаем, чтобы ваш бренд был виден и воспринимался людьми положительно'
  },
  {
    question: 'Сколько времени занимает управление репутацией?',
    answer: 'Время зависит от ситуации. Для удаления негативных отзывов может потребоваться несколько недель, а на улучшение репутации фирмы — несколько месяцев. Важно, чтобы репутация оставалась под контролем, для этого мы рекомендуем ежемесячный мониторинг'
  },
  {
    question: 'Как определяется стоимость услуг по управлению репутацией?',
    answer: 'Каждый проект уникален, и мы разрабатываем индивидуальное коммерческое предложение, ориентируясь на объем работы и сложности задачи. Гарантия прозрачности процессов и чёткий расчёт бюджета — основа нашего сотрудничества'
  },
  {
    question: 'Как вы оцифровываете результаты работы с вами?',
    answer: 'Мы оцениваем результаты по метрикам: позиции сайта в поисковой выдаче, количество негативных и положительных отзывов, рост трафика и вовлеченности в соцсетях. Каждый отчет обязательно содержит точные цифры и сроки, чтобы вы могли увидеть реальные изменения в вашем имидже. Заполните форму обратной связи, чтобы узнать об условиях работы. Так мы сможем подробнее ответить на ваши вопросы'
  },
])

const toggle = (i: number) => {

  const answerEl = answerTemplateRef.value![i]

  if (i === activeQuestionIndex.value) {
    activeQuestionIndex.value = null
    answerEl.style.opacity = '0'
    answerEl.style.height = '0'
    answerEl.style.paddingBottom = '0'
    return
  }

  activeQuestionIndex.value = i
  answerEl.style.opacity = '1'
  answerEl.style.height = answerHeights[i] + 'px'
  answerEl.style.paddingBottom = '24px'

  const clickOutsideFunction = onClickOutside(answerTemplateRef.value![i], () => {
    activeQuestionIndex.value = null
    answerEl.style.opacity = '0'
    answerEl.style.height = '0'
    answerEl.style.paddingBottom = '0'
    clickOutsideFunction?.()
  })
}

onMounted(() => {
  answerTemplateRef.value!.forEach(answer => {
    answerHeights.push(answer.getBoundingClientRect().height)
    answer.style.height = '0'
    answer.style.paddingBottom = '0'
  })

  setTimeout(() => {
    answerTemplateRef.value!.forEach(answer => {
      answer.classList.remove('--init')
    })
  }, 100)

  questionsTemplateRef.value!.style.opacity = '1'
})
</script>

<template>
  <section class="faq">
    <div class="faq__container">
      <h2>Ответы на частые вопросы</h2>
      <div class="faq__questions-container">
        <div class="faq__questions" ref="questionsTemplateRef">
          <div ref="questionTemplateRef" class="--init" v-for="(question, i) in questions" @click="toggle(i)" :key="i">
            <div class="faq__question" :class="{'--active': activeQuestionIndex === i}">
              <div>{{ question.question }}</div>
              <div><svg><use :href="'/sprite.svg#chevron-right'" /></svg></div>
            </div>
            <div class="faq__question-answer --init" ref="answerTemplateRef">{{ question.answer }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
