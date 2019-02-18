<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/results">Results</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
import { AUTH_LOGOUT } from "@/store/actions/auth";
import { mapState } from "vuex";

export default {
  computed: mapState({
    isAuthorized: state => state.auth.isAuthorized,
  }),
  created: function() {
    axios.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch(AUTH_LOGOUT);
          // you can also redirect to /login if needed !
        }
        throw err;
      });
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
