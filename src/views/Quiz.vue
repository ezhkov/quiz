<template>
  <div class="content-wrapper">
    <div class="quiz" v-if="isFetching || !currentUser">
      <div class="quiz-header">
        Загрузка...
        <div class="quiz-header-icons"></div>
      </div>
      <div class="quiz-loader">
        Loading...
      </div>
    </div>
    <QuizWizard
      :questions="quizQuestions[questionType]"
      :initialNumber="currentUser.lastQuestion"
      v-else
    />
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
    ...mapState([
      'quizQuestions',
      'currentUser',
      'token',
      'isFetching',
      'questionType',
    ]),
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
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  background: #bdbdbd;
  border: 1px solid;
  border-top-color: #dfdfdf;
  border-left-color: #dfdfdf;
  border-right-color: #000;
  border-bottom-color: #000;
}

.quiz-header {
  margin: 2px 2px 0;
  padding: 1px 2px;
  background: linear-gradient(to right, #00007b 0%, #087ecb 100%);
  color: white;
  box-sizing: border-box;
  height: 23px;
}

.quiz-loader {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
