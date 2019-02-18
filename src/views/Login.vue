<template>
  <form class="login" @submit.prevent="login">
    <h1>Sign in</h1>
    <label>User name</label>
    <input required v-model="username" type="text" placeholder="Snoopy" />
    <hr />
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { mapState } from "vuex";
import { AUTH_REQUEST } from "@/store/actions/auth";

export default {
  name: "login",
  data() {
    return {
      username: "",
      loginData: "aaa",
    };
  },
  computed: mapState({
    isAuthorized: state => state.auth.isAuthorized,
  }),
  methods: {
    login: function() {
      const { username, password } = this;
      this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        this.$router.push("/quiz");
      });
    },
  },
};
</script>

<style scoped></style>
