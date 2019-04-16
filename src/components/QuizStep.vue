<template>
  <div class="quiz-step">
    <div class="quiz-question">
      {{ question.question }}
    </div>
    <div class="quiz-variants">
      <label
        class="quiz-variant"
        v-for="(variant, index) in shuffledVariants"
        :key="variant.text"
      >
        <input
          type="radio"
          name="variant"
          v-model="checkedVariant"
          :value="variant"
        />
        <span class="quiz-letter">{{ letters[index] }}:</span>{{ variant.text }}
      </label>
    </div>
  </div>
</template>

<script>
import shuffleArray from '@/utils/functions';
export default {
  name: 'QuizStep',
  props: ['question'],
  data() {
    return {
      checkedVariant: {},
      letters: ['А', 'В', 'Б', 'Г'],
    };
  },
  computed: {
    shuffledVariants() {
      return shuffleArray(this.question.variants);
    },
  },
  watch: {
    checkedVariant(value) {
      this.$emit('changeVariant', { ...value, level: this.question.level });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.quiz-question {
  text-align: left;
}

.quiz-variants {
  padding: 20px 20px 8px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  border: 1px solid grey;
  box-shadow: inset 1px 0 0 0 #dedede, inset 0 1px 0 0 #dedede,
    0 1px 0 0 #dedede, 1px 0 0 0 #dedede;
}

.quiz-variant {
  display: block;
  text-align: left;
  padding-left: 40px;
  position: relative;
  margin-bottom: 12px;
  padding-right: 10px;
  input {
    position: absolute;
    left: 0;
    top: 3px;
  }
}

.quiz-letter {
  position: absolute;
  margin-left: -20px;
}
</style>
