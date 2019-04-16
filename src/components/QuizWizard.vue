<template>
  <div class="quiz">
    <div class="quiz-inner">
      <div class="quiz-header">
        Вопрос №{{ questionNumber + 1 }}
        <div class="quiz-header-icons"></div>
      </div>
      <hr />
      <div class="quiz-body">
        <QuizStep
          :question="questions[questionNumber]"
          @changeVariant="changeVariant"
        />
      </div>
      <div class="quiz-footer">
        <QuizTimer
          @doneCountdown="doneCountown"
          :question="questions[questionNumber]"
        />
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
            Вопрос {{ questionNumber + 2 }}
          </button>
        </div>
      </div>
      <div
        class="quiz-helpers-overlay"
        v-if="showHelpers"
        @click="triggerHelpers"
      ></div>
      <div class="quiz-helpers" v-if="showHelpers">
        <div class="quiz-helpers-inner">
          <div class="quiz-header">
            <div class="quiz-close-icon" @click="triggerHelpers"></div>
          </div>
          <hr />
          <div class="quiz-helpers-body">
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
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QuizStep from './QuizStep';
import QuizTimer from './QuizTimer';

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
    ]),
    hasAvailableHelpers() {
      return Object.values(this.availableHelpers).find(el => el.isAvailable);
    },
  },
  methods: {
    changeVariant(value) {
      this.activeStepVariant = { ...value };
    },
    doneCountown() {
      console.log('Countdown finished!');
      // this.$router.push('/results');
    },
    submitStep(e) {
      e.preventDefault();
      if (!this.activeStepVariant) return;
      if (this.activeStepVariant.isValid || this.canMistake) {
        this.$store.commit('USE_MISTAKE');
        this.$store.commit('UPDATE_QUESTION_NUMBER', this.questionNumber + 1);
        this.$store.dispatch('selectVariant', {
          answer: this.activeStepVariant,
          lastQuestion: this.questionNumber,
          timeCompleted: new Date(),
        });
        this.activeStepVariant = null;
      } else {
        console.log('invalid!');
        // this.$router.push('/results');
      }
    },
    useHelper(key, e) {
      e.preventDefault();
      this.$store.dispatch('useHelper', { key });
    },
    triggerHelpers() {
      this.showHelpers = !this.showHelpers;
    },
  },
  components: {
    QuizStep,
    QuizTimer,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.quiz {
  height: 100%;
  box-sizing: border-box;
  background: #bdbdbd;
  border: 1px solid;
  border-top-color: #dfdfdf;
  border-left-color: #dfdfdf;
  border-right-color: #000;
  border-bottom-color: #000;
}
.quiz-inner {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  height: 100%;
  border: 1px solid;
  border-top-color: #fff;
  border-left-color: #fff;
  border-right-color: #808080;
  border-bottom-color: #808080;
}
.quiz-header {
  margin: 2px 2px 0;
  padding: 1px 2px;
  background: linear-gradient(to right, #00007b 0%, #087ecb 100%);
  color: white;
  box-sizing: border-box;
  height: 23px;
}

.quiz-header-icons {
  margin: 1px 0;
  background: url('../assets/window_controls.gif') 50% 50% no-repeat;
  width: 44px;
  height: 19px;
  float: right;
}
.quiz-close-icon {
  margin: 1px 0;
  background: url('../assets/close.gif') 50% 50% no-repeat;
  width: 21px;
  height: 19px;
  float: right;
  cursor: pointer;
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
  margin-left: 2px;
  margin-right: 2px;
  padding: 20px;
}

.quiz-footer {
  margin-top: auto;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
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

.quiz-helpers {
  position: absolute;
  width: 260px;
  left: 50%;
  margin-left: -130px;
  top: 100px;
  display: flex;
  flex-direction: column;
  background: #bdbdbd;
  border: 1px solid;
  border-top-color: #dfdfdf;
  border-left-color: #dfdfdf;
  border-right-color: #000;
  border-bottom-color: #000;
}

.quiz-helpers-inner {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  border: 1px solid;
  border-top-color: #fff;
  border-left-color: #fff;
  border-right-color: #808080;
  border-bottom-color: #808080;
}

.quiz-helpers-body {
  display: flex;
  flex-direction: column;
  margin: 12px;

  button + button {
    margin-top: 30px;
  }
}
</style>
