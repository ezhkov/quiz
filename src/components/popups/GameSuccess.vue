<template>
  <div class="game-success">
    <p>Поздравляем!</p>
    <p>Вы ответили на все вопросы</p>
    <p>
      Количество баллов: <span class="score">{{ score }}</span>
    </p>
    <div class="game-success-action">
      <router-link to="/results" class="quiz-popup-link">Посмотреть результаты</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameSuccess',
  props: ['gameFinished', 'score'],
  methods: {
    gotoResults() {
      this.$router.push('/results');
    },
  },
};
</script>

<style scoped lang="scss">
.game-success {
  font-size: 24px;
  line-height: 24px;
  text-transform: uppercase;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  margin-top: 80px;
}
p + p {
  margin-top: 24px;
}
.game-success-action {
  margin-top: 80px;
}

.quiz-popup-link {
  display: inline-block;
  background: #fbff00;
  box-shadow: inset 2px 0 0 0 #ffffff, inset 0 2px 0 0 #ffffff;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 6px;
  padding-left: 12px;
  padding-right: 12px;
  text-transform: uppercase;
  font-size: 10px;
  color: black;
  text-decoration: none;

  &:disabled {
    opacity: 0.6;
  }
}

.score {
  color: #fbff00;
}
</style>
