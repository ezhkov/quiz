<template>
  <div>{{ timerCount }}</div>
</template>

<script>
export default {
  name: 'QuizTimer',
  props: ['question'],
  data() {
    return {
      timerCount: 60,
      timerInterval: null,
    };
  },
  methods: {
    startCount() {
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerCount = 60;
      this.timerInterval = setInterval(() => {
        this.timerCount -= 1;
        if (this.timerCount === 1) {
          this.$emit('doneCountdown');
          clearInterval(this.timerInterval);
        }
      }, 1000);
    },
  },
  watch: {
    question() {
      this.startCount();
    },
  },
  mounted() {
    this.startCount();
  },
};
</script>

<style scoped></style>
