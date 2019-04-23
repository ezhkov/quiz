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
        <QuizTimer @doneCountdown="doneCountdown" :question="questions[questionNumber]" />
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
      <GameSuccess v-if="gameFinished" />
    </div>

    <div class="quiz-inner">
      <hr />
      <div class="quiz-footer" v-if="!gameFinished">
        <div class="quiz-buttons">
          <button
            class="helper-trigger"
            :class="{ active: showHelpers }"
            :disabled="!hasAvailableHelpers"
            @click="triggerHelpers"
          >
            Помощь
          </button>
          <button @click="submitStep" :disabled="!activeStepVariant">
            <template v-if="questionNumber < 14">
              Вопрос {{ questionNumber + 2 }}
            </template>
            <template v-else>
              Завершить
            </template>
          </button>
        </div>
      </div>
      <div class="quiz-helpers-overlay" v-if="showHelpers || gameFailed" @click="triggerHelpers"></div>
      <Helpers :availableHelpers="availableHelpers" :showHelpers="showHelpers" @triggerHelpers="triggerHelpers" />
      <GameFailed :game-failed="gameFailed" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QuizStep from './QuizStep';
import QuizTimer from './QuizTimer';
import Helpers from './popups/Helpers';
import GameFailed from './popups/GameFailed';
import GameSuccess from './popups/GameSuccess';

export default {
  name: 'QuizWizard',
  props: ['questions', 'questionType'],
  data() {
    return {
      activeStepVariant: null,
      showHelpers: false,
    };
  },
  computed: {
    ...mapState([
      'currentUser',
      'token',
      'questionNumber',
      'availableHelpers',
      'canMistake',
      'gameFinished',
      'gameFailed',
    ]),
    hasAvailableHelpers() {
      return Object.values(this.availableHelpers).find(el => el.isAvailable);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.vue-simple-markdown__inline-code {
  padding: 3px;
  background: #2b2b2b;
  border: 1px solid #949494;
  border-radius: 2px;
}
.hljs {
  padding: 10px;
  background: #2b2b2b;
  border: 1px solid #949494;
  border-radius: 2px;
  display: inline-block;
}

/*

Darcula color scheme from the JetBrains family of IDEs

*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #2b2b2b;
}

.hljs {
  color: #bababa;
}

.hljs-strong,
.hljs-emphasis {
  color: #a8a8a2;
}

.hljs-bullet,
.hljs-quote,
.hljs-link,
.hljs-number,
.hljs-regexp,
.hljs-literal {
  color: #6896ba;
}

.hljs-code,
.hljs-selector-class {
  color: #a6e22e;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-section,
.hljs-attribute,
.hljs-name,
.hljs-variable {
  color: #cb7832;
}

.hljs-params {
  color: #b9b9b9;
}

.hljs-string {
  color: #6a8759;
}

.hljs-subst,
.hljs-type,
.hljs-built_in,
.hljs-builtin-name,
.hljs-symbol,
.hljs-selector-id,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-template-tag,
.hljs-template-variable,
.hljs-addition {
  color: #e0c46c;
}

.hljs-comment,
.hljs-deletion,
.hljs-meta {
  color: #7f7f7f;
}
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
}

button {
  border-right: 1px solid #000000;
  border-bottom: 1px solid #000000;
  border-left: 1px solid #dedede;
  border-top: 1px solid #dedede;
  background: #bdbdbd;
  box-shadow: inset -1px 0 0 0 #7f7f7f, inset 0 -1px 0 0 #7f7f7f;
  font-size: 16px;
  text-align: center;
  min-width: 116px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 6px;
  padding-right: 6px;
}
.helper-trigger {
  margin-right: 10px;
  &.active {
    border-bottom: 1px solid #dedede;
    border-right: 1px solid #dedede;
    border-top: 1px solid black;
    border-left: 1px solid black;
    box-shadow: inset 1px 0 0 0 #7b7b7b, inset 0 1px 0 0 #7b7b7b;
  }
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
</style>
