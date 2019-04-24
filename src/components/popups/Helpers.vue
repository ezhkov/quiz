<template>
  <div class="quiz-popup" v-if="showHelpers">
    <div class="quiz-popup-header">
      <span class="quiz-header-text">Help me</span>
    </div>
    <div class="quiz-popup-body">
      <ul class="quiz-helpers-list">
        <li class="quiz-helpers-item" :key="helper.key" v-for="helper in availableHelpers">
          <button @click="useHelper(helper.key, $event)" :disabled="!helper.isAvailable" class="quiz-helpers-button">
            <span class="quiz-helpers-icon" :class="helper.key"></span>
            <span class="quiz-helpers-text" v-html="helper.name"></span>
          </button>
        </li>
      </ul>
    </div>
    <div class="quiz-popup-close" @click="triggerHelpers"></div>
  </div>
</template>

<script>
export default {
  name: 'Helpers',
  props: ['showHelpers', 'availableHelpers'],
  methods: {
    triggerHelpers() {
      this.$emit('triggerHelpers');
    },
    useHelper(key, e) {
      e.preventDefault();
      this.$store.dispatch('useHelper', { key });
      setTimeout(() => {
        if (this.showHelpers) {
          this.$emit('triggerHelpers');
        }
      }, 300);
    },
  },
};
</script>

<style scoped lang="scss">
@import 'style';
</style>
