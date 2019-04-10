import axios from 'axios';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

const token = localStorage.getItem('user-token');
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
}

window.onbeforeunload = function() {
  return 'aaa';
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
