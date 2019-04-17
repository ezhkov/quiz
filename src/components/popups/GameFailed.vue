<template>
  <div class="quiz-popup" v-if="gameFailed">
    <div class="quiz-popup-inner">
      <div class="quiz-header">
        <div class="quiz-close-icon" @click="gotoResults"></div>
      </div>
      <hr />
      <div class="quiz-helpers-body">
        <div class="quiz-popup-text">
          <h2>Игра окончена!</h2>
          <p>Спасибо, что были с нами)</p>
          <p><router-link to="/results">Посмотреть результаты</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameFailed',
  props: ['gameFailed'],
  methods: {
    gotoResults() {
      this.$router.push('/results');
    },
  },
};
</script>

<style scoped lang="scss">
@import 'style';
</style>
