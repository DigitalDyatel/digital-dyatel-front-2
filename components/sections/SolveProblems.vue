<script setup lang="ts">

</script>

<template>
  <section class="solve-problems">
    <h2>
      <span>Решаем репутационные</span>
      <span>проблемы любой сложности</span>
    </h2>
    <div class="solve-problems__container">
      <div>
        <img src="/img/solve-problems-team.png" alt="team">
      </div>
      <div>
        <h4>Наша компания — это эксперты, которые помогут сформировать положительный образ вашего бренда и укрепить хорошую репутацию в информационном пространстве</h4>
        <div class="solve-problems__advantages">
          <div class="solve-problems__advantage --left-side">
            <div>
              <div>24</div>
              <div>
                <span>успешно</span>
                <span>реализованных кейса</span>
              </div>
            </div>
            <div>
              <img src="/img/solve-problems-folder.png" alt="folder">
              <svg><use :href="'/sprite.svg#5-dots'" /></svg>
            </div>
          </div>
          <div class="solve-problems__advantage-container">
            <div class="solve-problems__advantage --right-side-with-tag">
              <Tag class="solve-problems__advantage-tag" icon="status-up" />
              <div>
                <div>7 лет</div>
                <div>
                  7 лет опыта в управлении репутацией
                </div>
              </div>
            </div>
            <div class="solve-problems__advantage --right-side">
              <div>21</div>
              <div>сотрудник в штате нашего агенства</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>