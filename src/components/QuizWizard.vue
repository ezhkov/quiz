<template>
  <div>
    <QuizStep
      :question="questions[questionNumber]"
      @changeVariant="changeVariant"
    />
    <button @click="submitStep" :disabled="!activeStepVariant">Click</button>
    <div class="quiz-helpers">
      <button
        @click="useHelper(helper.key, $event)"
        :key="helper.key"
        v-for="helper in availableHelpers"
        :disabled="!helper.isAvailable"
      >
        {{ helper.name }}
      </button>
    </div>
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
      activeStepVariant: null,
    };
  },
  computed: {
    ...mapState(['currentUser', 'token', 'questionNumber', 'availableHelpers']),
  },
  methods: {
    changeVariant(value) {
      this.activeStepVariant = { ...value };
    },
    submitStep(e) {
      e.preventDefault();
      if (!this.activeStepVariant) return;
      this.$store.commit('UPDATE_QUESTION_NUMBER', this.questionNumber + 1);
      this.$store.dispatch('selectVariant', {
        answer: this.activeStepVariant,
        lastQuestion: this.questionNumber,
        timeCompleted: new Date(),
      });
      this.activeStepVariant = null;
    },
    useHelper(key, e) {
      e.preventDefault();
      this.$store.dispatch('useHelper', { key });
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
