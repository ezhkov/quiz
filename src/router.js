import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store';
import Login from './views/Login.vue';
import Quiz from './views/Quiz';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/quiz');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    console.log('isAuth');
    if (to.path === '/') {
      next('/quiz');
      return;
    }
    if (store.state.currentUser.hasCompleted) {
      next('/results');
      return;
    }
    if (to.path === '/quiz') {
      console.log(['Go to quiz', store.state]);
      if (store.state.currentUser.hasCompleted) {
        next('/results');
        return;
      }
      next();
      return;
    }
    return;
  }
  next('/login');
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/quiz/:id',
      name: 'quizDetail',
      component: Quiz,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/results',
      name: 'results',
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Results.vue'),
    },
  ],
});
