<template>
  <div class="content-wrapper">
    <div v-if="isFetching">Loading...</div>
    <QuizWizard
      :questions="quizQuestions"
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
    ...mapState(['quizQuestions', 'currentUser', 'token', 'isFetching']),
  },
  components: {
    QuizWizard,
  },
  created() {
    // this.$store.dispatch('getCurrentUser', this.token).then(() => {
    //   if (this.currentUser.hasCompleted) {
    //     this.$router.push('/results');
    //   } else {
    //     this.$store.dispatch('getQuestions');
    //   }
    // });
  },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  height: 100%;
}
</style>
