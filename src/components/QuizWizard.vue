<template>
  <QuizStep :question="questions[questionNumber]" />
</template>

<script>
import { mapState } from 'vuex';
import QuizStep from './QuizStep';
export default {
  name: 'QuizWizard',
  props: ['questions'],
  data() {
    return {
      questionNumber: 0,
    };
  },
  computed: {
    ...mapState(['currentUser', 'token']),
  },
  components: {
    QuizStep,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
