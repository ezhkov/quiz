<template>
  <div class="countdown">{{ timerCount }}</div>
</template>

<script>
export default {
  name: 'QuizTimer',
  props: ['question'],
  data() {
    return {
      timerCount: 59,
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

<style scoped lang="scss">
.countdown {
  border-bottom: 1px solid #dedede;
  border-right: 1px solid #dedede;
  border-top: 1px solid black;
  border-left: 1px solid black;
  box-shadow: inset 1px 0 0 0 #7b7b7b, inset 0 1px 0 0 #7b7b7b;
}
</style>
