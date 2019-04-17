<template>
  <div class="quiz-popup" v-if="showHelpers">
    <div class="quiz-popup-inner">
      <div class="quiz-header">
        <div class="quiz-close-icon" @click="triggerHelpers"></div>
      </div>
      <hr />
      <div class="quiz-helpers-body">
        <span class="quiz-helpers-label">Помощь</span>
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
    },
  },
};
</script>

<style scoped lang="scss">
@import 'style';
</style>
