<template>
  <div
    class="countdown"
    :class="{
      danger: timerCount < 15 && timerCount > 0,
      done: timerCount === 0,
    }"
  >
    <span class="countdown-icon"></span>{{ timer }}
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
      return `0${minutes}:${
        seconds.toString().length === 1 ? '0' : ''
      }${seconds}`;
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
  border-bottom: 1px solid #dedede;
  border-right: 1px solid #dedede;
  border-top: 1px solid black;
  border-left: 1px solid black;
  box-shadow: inset 1px 0 0 0 #7b7b7b, inset 0 1px 0 0 #7b7b7b;
  background: #bdbdbd;
  display: flex;
  align-items: center;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 24px;
  padding-right: 24px;
  &.danger {
    animation: blink 1s infinite;
  }
  &.done {
    background-color: #ff0000;
  }
}
.countdown-icon {
  width: 13px;
  height: 20px;
  background: url('../assets/timer.gif') 50% 50% no-repeat;
  margin-right: 9px;
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
