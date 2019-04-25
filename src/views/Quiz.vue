<template>
  <div class="content-wrapper">
    <div class="quiz" v-if="isFetching || !currentUser">
      <div class="quiz-loader">
        Loading...
      </div>
    </div>
    <QuizWizard :questions="quizQuestions[questionType]" :initialNumber="currentUser.lastQuestion" v-else />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import QuizWizard from '@/components/QuizWizard.vue';

export default {
  name: 'home',
  data() {
    return {};
  },
  computed: {
    ...mapState(['quizQuestions', 'currentUser', 'token', 'isFetching', 'questionType']),
  },
  components: {
    QuizWizard,
  },
  created() {
    this.$store.dispatch('getQuestions');
  },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  height: 100%;
}

.quiz {
  height: 100%;
  box-sizing: border-box;
  background: url('../assets/question.jpg') 50% 50% / 100% no-repeat;
}

.quiz-loader {
  height: 100%;
  font-family: press_start_2pregular, Tahoma, sans-serif;
  font-size: 20px;
  color: #fff;

  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
