<template>
  <div class="quiz-step">
    <div class="quiz-question">
      <vue-simple-markdown :source="question.question"></vue-simple-markdown>
    </div>
    <div class="quiz-variants">
      <label
        class="quiz-variant"
        v-for="(variant, index) in shuffledVariants"
        :key="variant.text"
        :class="{ checked: variant === checkedVariant }"
      >
        <input type="radio" name="variant" v-model="checkedVariant" :value="variant" />
        <vue-simple-markdown :source="variant.text"></vue-simple-markdown>
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
  text-align: center;
  color: white;
}

.quiz-variants {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
}

.quiz-variant {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  background: #fbff00;
  border: 1px solid #000000;
  box-shadow: inset 3px 0 0 0 #ffffff, inset 0 3px 0 0 #ffffff;
  &.checked {
    background: #f9bf2b;
  }
  input {
    width: 1px;
    height: 1px;
    position: absolute;
    left: -10px;
    top: -10px;
  }
}

.quiz-letter {
  position: absolute;
  margin-left: -20px;
}
</style>
