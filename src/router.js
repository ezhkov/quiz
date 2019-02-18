import Vue from "vue";
import Router from "vue-router";
import store from "./store/store";
import Login from "./views/Login.vue";
import Quiz from "./views/Quiz";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    console.log("ifNot");
    next();
    return;
  }
  next("/quiz");
};

const ifAuthenticated = (to, from, next) => {
  console.log([to, from]);
  if (store.getters.isAuthenticated) {
    if (to.path === "/quiz") {
      next();
      return;
    }
    next("/quiz");
    return;
  }
  next("/login");
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/quiz",
      name: "quiz",
      component: Quiz,
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/quiz/:id",
      name: "quizDetail",
      component: Quiz,
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/results",
      name: "results",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Results.vue"),
    },
  ],
});
