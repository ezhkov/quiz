<template>
  <div class="quiz-step">
    <div class="quiz-question">
      {{ question.question }}
    </div>
    <div class="quiz-variants">
      <label
        class="quiz-variant"
        v-for="variant in shuffledVariants"
        :key="variant.text"
      >
        <input
          type="radio"
          name="variant"
          v-model="checkedVariant"
          :value="variant"
        />
        {{ variant.text }}
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
  methods: {},
  watch: {
    checkedVariant(value) {
      this.$emit('changeVariant', { ...value, level: this.question.level });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
