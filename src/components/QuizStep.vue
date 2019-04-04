<template>
  <div class="quiz-step">
    <div class="quiz-question">
      {{ question.question }}
    </div>
    <div class="quiz-variants">
      <label
        class="quiz-variant"
        v-for="variant in question.variants"
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
export default {
  name: 'QuizStep',
  props: ['question'],
  data() {
    return {
      checkedVariant: {},
    };
  },
  methods: {
    submitVariant() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
