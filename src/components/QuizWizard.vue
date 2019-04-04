<template>
  <div>
    <QuizStep
      :question="questions[questionNumber]"
      @changeVariant="changeVariant"
    />
    <button @click="submitStep" :disabled="!activeStepVariant">Click</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QuizStep from './QuizStep';
export default {
  name: 'QuizWizard',
  props: ['questions', 'questionType'],
  data() {
    return {
      questionNumber: 0,
      activeStepVariant: null,
    };
  },
  computed: {
    ...mapState(['currentUser', 'token']),
  },
  methods: {
    changeVariant(value) {
      this.activeStepVariant = { ...value };
    },
    submitStep(e) {
      e.preventDefault();
      if (!this.activeStepVariant) return;
      this.$store.dispatch('selectVariant', {
        answer: this.activeStepVariant,
        lastQuestion: this.questionNumber,
        timeFinished: new Date(),
      });
      this.questionNumber++;
      this.activeStepVariant = null;
    },
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
