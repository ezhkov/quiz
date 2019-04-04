import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'firebase/app';
import 'firebase/firestore';
import user from './modules/user';
import config from './firebaseConfig';

Firebase.initializeApp(config);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db: Firebase.firestore(),
    users: [],
    quizQuestions: [],
    currentUser: {},
    token: localStorage.getItem('user-token') || null,
    isFetching: false,
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
      state.quizQuestions = [...questions];
    },
    SET_FETCHING(state) {
      state.isFetching = true;
    },
    DONE_FETCHING(state) {
      state.isFetching = false;
    },
  },
  actions: {
    async findUser({ commit, dispatch, rootState }, user) {
      const usersRef = rootState.db.collection('users');
      const query = await usersRef.where('email', '==', user.email).get();
      if (query.empty) {
        console.log('User not exists');
        dispatch('addUser', user);
      } else {
        console.log('User exists. Logging in');
        const foundUser = query.docs[0];
        localStorage.setItem('user-token', foundUser.id);
        commit('SET_CURRENT_USER', {
          user: foundUser.data(),
          token: foundUser.id,
        });
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
    },
    async getQuestions({ commit, rootState }) {
      const questionsRef = await rootState.db.collection('questions').get();
      let questions = [];
      questionsRef.forEach(q => questions.push(q.data()));
      commit('SET_QUESTIONS', { questions });
      commit('DONE_FETCHING');
    },
  },
  modules: {
    user,
  },
});
