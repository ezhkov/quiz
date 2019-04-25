<template>
  <div class="quiz">
    <div class="quiz-header">
      <div class="quiz-progress">
        <span class="user-icon"></span>
        <ul class="quiz-progress-items">
          <li
            class="quiz-progress-item"
            v-for="(quest, index) in questions.length"
            :class="{ current: index === questionNumber, done: index < questionNumber }"
            :key="index"
          ></li>
        </ul>
      </div>
      <div class="quiz-timer">
        <span class="header-text">Time</span>
        <QuizTimer @doneCountdown="doneCountdown" :question="questions[questionNumber]" :gameFinished="gameFinished" />
      </div>
      <div class="quiz-level">
        <span class="header-text">Level</span>
        <div class="quiz-level-text" :class="questions[questionNumber].level.toLowerCase()">
          {{ questions[questionNumber].level }}
        </div>
      </div>
    </div>
    <div class="quiz-body" :class="{ 'no-padding': gameFinished }">
      <QuizStep :question="questions[questionNumber]" @changeVariant="changeVariant" v-if="!gameFinished" />
      <GameSuccess :score="currentUser.score" v-if="gameFinished" />
      <Helpers :availableHelpers="availableHelpers" :showHelpers="showHelpers" @triggerHelpers="triggerHelpers" />
      <GameFailed :game-failed="gameFailed" :score="currentUser.score" />
    </div>
    <div class="quiz-footer" v-if="!gameFinished">
      <button
        class="quiz-footer-button"
        :class="{ active: showHelpers }"
        :disabled="!hasAvailableHelpers"
        @click="triggerHelpers"
      >
        Help me
      </button>
      <button @click="submitStep" :disabled="!activeStepVariant" class="quiz-footer-button">
        <template v-if="questionNumber < 14">
          Next question
        </template>
        <template v-else>
          Завершить
        </template>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import QuizStep from './QuizStep';
import QuizTimer from './QuizTimer';
import Helpers from './popups/Helpers';
import GameFailed from './popups/GameFailed';
import GameSuccess from './popups/GameSuccess';

export default {
  name: 'QuizWizard',
  props: ['questions'],
  data() {
    return {
      activeStepVariant: null,
      showHelpers: false,
    };
  },
  computed: {
    ...mapState(['currentUser', 'token', 'questionNumber', 'canMistake', 'gameFinished', 'gameFailed', 'questionType']),
    ...mapGetters(['availableHelpers']),
    hasAvailableHelpers() {
      return this.availableHelpers.length;
    },
  },
  methods: {
    changeVariant(value) {
      this.activeStepVariant = { ...value };
    },
    doneCountdown() {
      this.$store.commit('DISABLE_HELPERS');
      this.$store.dispatch('finishGame', false);
    },
    submitStep(e) {
      e.preventDefault();
      if (!this.activeStepVariant) return;
      if (this.activeStepVariant.isValid || this.canMistake) {
        this.$store.commit('USE_MISTAKE');
        if (this.questionNumber === 14) {
          this.$store.dispatch('finishGame', true);
        } else {
          this.$store.commit('UPDATE_QUESTION_NUMBER', this.questionNumber + 1);
        }
        this.$store.dispatch('selectVariant', {
          answer: this.activeStepVariant,
          lastQuestion: this.questionNumber,
          timeCompleted: new Date(),
        });
        this.activeStepVariant = null;
      } else {
        this.$store.commit('DISABLE_HELPERS');
        this.$store.dispatch('finishGame', false);
      }
    },
    triggerHelpers() {
      if (this.gameFailed) return;
      this.showHelpers = !this.showHelpers;
    },
  },
  components: {
    QuizStep,
    QuizTimer,
    Helpers,
    GameFailed,
    GameSuccess,
  },
};
</script>

<style lang="scss">
@import 'syntax';
</style>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

.quiz {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: url('../assets/question.jpg') 50% 50% / 100% no-repeat;
  font-family: press_start_2pregular, Tahoma, sans-serif;
}

.quiz-header {
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
  margin-bottom: 40px;
}

.header-text {
  font-size: 24px;
  color: white;
  text-transform: uppercase;
  margin-bottom: 11px;
  display: block;
  line-height: 24px;
}

.quiz-progress {
  display: flex;
  align-items: center;
}

.quiz-progress-items {
  display: flex;
  align-items: stretch;
}

.quiz-progress-item {
  width: 12px;
  height: 30px;
  background: #bebebe;
  border: 2px solid #000000;
  box-shadow: inset 3px 0 0 0 #ffffff, inset 0 3px 0 0 #ffffff;
  margin-right: 2px;
  box-sizing: border-box;

  &.current {
    background: #fbff00;
  }

  &.done {
    background: #17ed4d;
  }
}

.quiz-timer {
  position: absolute;
  left: 50%;
  width: 100px;
  margin-left: -50px;
  text-align: center;
  top: 30px;
}

.quiz-level {
}

.quiz-level-text {
  text-transform: uppercase;
  font-size: 16px;
  line-height: 16px;
  text-shadow: 1px 2px 0 #000000;

  &.easy {
    color: #17ed4d;
  }

  &.medium {
    color: #ef7436;
  }

  &.hard {
    color: red;
  }
}

.user-icon {
  display: block;
  width: 47px;
  height: 58px;
  vertical-align: middle;
  margin-right: 3px;
  background: url('../assets/pers1.svg') 50% 50%/100% no-repeat;
}

.quiz-header-icons {
  margin: 1px 0;
  background: url('../assets/window_controls.gif') 50% 50% no-repeat;
  width: 44px;
  height: 19px;
  float: right;
}

hr {
  height: 1px;
  border: none;
  border-top: 1px solid #949494;
  border-bottom: 1px solid #fbfbfb;
  margin-top: 1px;
  margin-bottom: 0;
  margin-left: 2px;
  margin-right: 2px;
}

.quiz-body {
  padding-left: 90px;
  padding-right: 90px;
  &.no-padding {
    padding-left: 0;
    padding-right: 0;
  }
}

.quiz-footer {
  margin-top: auto;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 30px;
  display: flex;
  justify-content: space-between;
}

.quiz-helpers-overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #000;
  opacity: 0.6;
}

.quiz-footer-button {
  font-family: press_start_2pregular, Tahoma, sans-serif;
  font-size: 20px;
  color: #ffffff;
  letter-spacing: 0;
  text-transform: uppercase;
  background: transparent;
  border: none;
  &:active {
    color: #ef7436;
  }
  &:hover {
    color: #ef7436;
  }
  &:disabled {
    opacity: 0.6;
  }
}
</style>
