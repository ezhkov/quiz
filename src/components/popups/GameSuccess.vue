<template>
  <div class="game-success">
    <h2>Поздравляем!</h2>
    <h3>Вы ответили на все вопросы</h3>
    <p><router-link to="/results">Перейти к результатам</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'GameSuccess',
  props: ['gameFinished'],
  methods: {
    gotoResults() {
      this.$router.push('/results');
    },
  },
};
</script>

<style scoped lang="scss">
.game-success {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding-left: 50px;
  padding-right: 50px;
  background: url('../../assets/success.jpg') 50% 50% no-repeat;
  background-size: cover;
  flex-direction: column;
}
</style>
