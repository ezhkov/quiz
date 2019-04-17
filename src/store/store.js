import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'firebase/app';
import 'firebase/firestore';
import user from './modules/user';
import config from './firebaseConfig';
import shuffleArray from '@/utils/functions';

Firebase.initializeApp(config);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db: Firebase.firestore(),
    users: [],
    quizQuestions: [],
    currentUser: {},
    userAnswers: [],
    canMistake: false,
    gameFailed: false,
    gameFinished: false,
    availableHelpers: {
      fifty: {
        key: 'fifty',
        name: '50/50',
        isAvailable: true,
      },
      mistake: {
        key: 'mistake',
        name: 'Право на ошибку',
        isAvailable: true,
      },
      call: {
        key: 'call',
        name: 'Помощь зала',
        isAvailable: true,
      },
    },
    token: localStorage.getItem('user-token') || null,
    isFetching: false,
    questionType: 'frontend',
    questionNumber: 0,
    multipliers: {
      EASY: 1,
      MEDIUM: 1,
      HARD: 2,
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
  mutations: {
    SET_USERS(state, { users }) {
      state.users = [...users];
    },
    SET_CURRENT_USER(state, { user, token }) {
      state.currentUser = { ...user };
      state.token = token;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    RESET_TOKEN(state) {
      state.token = null;
    },
    SET_QUESTIONS(state, { questions }) {
      state.quizQuestions = { ...questions };
    },
    SET_FETCHING(state) {
      state.isFetching = true;
    },
    DONE_FETCHING(state) {
      state.isFetching = false;
    },
    UPDATE_USER_SCORE(state, score) {
      state.currentUser.score = score;
    },
    UPDATE_QUESTION_NUMBER(state, number) {
      state.questionNumber = number;
    },
    UPDATE_HELPERS(state, data) {
      state.availableHelpers[data.key].isAvailable = data.value;
    },
    REMOVE_HALF_VARIANTS(state) {
      const questionVariants =
        state.quizQuestions[state.questionType][state.questionNumber].variants;
      let newVariants = [questionVariants.find(el => el.isValid)];
      const invalidVariants = shuffleArray(
        questionVariants.filter(el => !el.isValid),
      );
      newVariants.push(invalidVariants.pop());
      state.quizQuestions[state.questionType][state.questionNumber].variants = [
        ...shuffleArray(newVariants),
      ];
    },
    CAN_MISTAKE(state) {
      state.canMistake = true;
    },
    USE_MISTAKE(state) {
      state.canMistake = false;
    },
    DISABLE_HELPERS(state) {
      ['fifty', 'mistake', 'call'].forEach(
        el => (state.availableHelpers[el].isAvailable = false),
      );
    },
    COMPLETE_USER_GAME(state, status) {
      state.currentUser.hasCompleted = true;
      if (status) {
        state.gameFinished = true;
      } else {
        state.gameFailed = true;
      }
    },
  },
  actions: {
    async findUser({ commit, dispatch, rootState }, user) {
      const usersRef = await rootState.db.collection('users');
      const query = await usersRef.where('phone', '==', user.phone).get();
      if (query.empty) {
        console.log('User not exists');
        const userId = await dispatch('addUser', user);
        return await dispatch('getCurrentUser', userId);
      } else {
        console.log('User exists. Logging in');
        const foundUser = query.docs[0];
        localStorage.setItem('user-token', foundUser.id);
        commit('SET_CURRENT_USER', {
          user: foundUser.data(),
          token: foundUser.id,
        });
        return foundUser.id;
      }
    },
    async getCurrentUser({ commit, rootState }, userId) {
      commit('SET_FETCHING');
      const user = await rootState.db
        .collection('users')
        .doc(userId)
        .get();
      commit('SET_CURRENT_USER', {
        user: user.data(),
        token: userId,
      });
      return user.data();
    },
    async getUsers({ commit, rootState }) {
      const usersRef = await rootState.db.collection('users').get();
      let users = [];
      usersRef.forEach(user => users.push(user.data()));
      commit('SET_USERS', { users });
    },
    async addUser({ commit, rootState }, user) {
      const userToAdd = {
        ...user,
        hasCompleted: false,
        score: 0,
        timeStarted: new Date(),
      };
      const usersRef = await rootState.db.collection('users').add(userToAdd);
      localStorage.setItem('user-token', usersRef.id);
      commit('SET_TOKEN', usersRef.id);
      return usersRef.id;
    },
    async getQuestions({ commit, rootState }) {
      const fQuestionsRef = await rootState.db
        .collection('frontendQuestions')
        .get();
      const bQuestionsRef = await rootState.db
        .collection('backendQuestions')
        .get();
      const questions = {
        frontend: {},
        backend: {},
      };
      const sliceQuestions = (arr, count) => {
        return arr.slice(0, count);
      };
      const prepareQuestions = arr => {
        return ['EASY', 'MEDIUM', 'HARD'].reduce((acc, curr) => {
          return [
            ...acc,
            ...sliceQuestions(shuffleArray(arr[curr]), curr === 'HARD' ? 3 : 6),
          ];
        }, []);
      };

      fQuestionsRef.forEach(q => {
        const question = q.data();
        if (!questions.frontend[question.level])
          questions.frontend[question.level] = [];
        questions.frontend[question.level].push({ ...question, id: q.id });
      });
      bQuestionsRef.forEach(q => {
        const question = q.data();
        if (!questions.backend[question.level])
          questions.backend[question.level] = [];
        questions.backend[question.level].push({ ...question, id: q.id });
      });

      const preparedQuestions = {
        frontend: prepareQuestions(questions.frontend),
        backend: prepareQuestions(questions.backend),
      };
      commit('SET_QUESTIONS', {
        questions: preparedQuestions,
      });
      commit('DONE_FETCHING');
    },
    async selectVariant({ commit, rootState }, answerData) {
      const { answer, lastQuestion, timeCompleted } = answerData;
      // TODO: POST complex data to Firestore
      const score =
        rootState.currentUser.score +
        (answer.isValid ? rootState.multipliers[answer.level] : 0);
      await rootState.db
        .collection('users')
        .doc(rootState.token)
        .update({
          score,
          lastQuestion,
          timeCompleted,
        });
      commit('UPDATE_USER_SCORE', score);
    },
    useHelper({ commit }, { key }) {
      if (key === 'fifty') {
        commit('REMOVE_HALF_VARIANTS');
      }
      if (key === 'mistake') {
        commit('CAN_MISTAKE');
      }
      commit('UPDATE_HELPERS', { key, value: false });
    },
    async finishGame({ commit, rootState }, status) {
      await rootState.db
        .collection('users')
        .doc(rootState.token)
        .update({
          hasCompleted: true,
          timeCompleted: new Date(),
        });
      commit('COMPLETE_USER_GAME', status);
    },
  },
  modules: {
    user,
  },
});
