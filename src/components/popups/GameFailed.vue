<template>
  <div class="quiz-popup" v-if="gameFailed">
    <div class="quiz-popup-header">
      <div class="quiz-header-icon"></div>
      <span class="quiz-header-text">Game over</span>
    </div>
    <div class="quiz-popup-body">
      <div class="quiz-popup-text">
        <p>Набрано баллов: {{ score }}</p>
      </div>
      <div class="quiz-popup-action">
        <router-link to="/results" class="quiz-popup-link">Посмотреть результаты</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameFailed',
  props: ['gameFailed', 'score'],
  methods: {
    gotoResults() {
      this.$router.push('/results');
    },
  },
};
</script>

<style scoped lang="scss">
@import 'style';

.quiz-popup {
  padding-bottom: 40px;
  padding-top: 32px;
}
.quiz-popup-header {
  margin-bottom: 24px;
}

.quiz-popup-text {
  font-size: 24px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 40px;
  text-transform: uppercase;
  margin-bottom: 40px;
}

.quiz-header-icon {
  background: url('../../assets/icon_heart.svg') 50% 50% no-repeat;
  width: 40px;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
}
</style>
