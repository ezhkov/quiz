<template>
  <div
    class="countdown"
    :class="{
      danger: timerCount < 15 && timerCount > 0,
      done: timerCount === 0,
    }"
  >
    {{ timer }}
  </div>
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
  computed: {
    timer() {
      const minutes = Math.floor(this.timerCount / 60);
      const seconds = this.timerCount - minutes * 60;
      return `0${minutes}:${seconds.toString().length === 1 ? '0' : ''}${seconds}`;
    },
  },
  methods: {
    startCount() {
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerCount = 60;
      this.timerInterval = setInterval(() => {
        this.timerCount -= 1;
        if (this.timerCount === 0) {
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
  color: white;
  &.danger {
    animation: blink 1s infinite;
  }
  &.done {
    background-color: #ff0000;
  }
}

@keyframes blink {
  0%,
  49% {
    background-color: #bdbdbd;
  }
  50%,
  100% {
    background-color: #ff0000;
  }
}
</style>
