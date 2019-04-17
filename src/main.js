import axios from 'axios';
import Vue from 'vue';
import VueSimpleMarkdown from 'vue-simple-markdown';
// import 'vue-simple-markdown/dist/vue-simple-markdown.css';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(VueSimpleMarkdown);

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
