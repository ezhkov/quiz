<template>
  <form class="login" @submit.prevent="login">
    <h1>Sign in</h1>
    <div>
      <label>User name</label>
      <input required v-model="username" type="text" placeholder="Snoopy" />
    </div>
    <div>
      <label>User email</label>
      <input
        required
        v-model="email"
        type="email"
        placeholder="user@mail.com"
      />
    </div>
    <div>
      <label>User phone</label>
      <input required v-model="phone" type="tel" placeholder="+7 (" />
    </div>
    <hr />
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import { SET_USER } from '@/store/actions/user';

export default {
  name: 'login',
  data() {
    return {
      username: '',
      email: '',
      phone: '',
    };
  },
  computed: {
    ...mapState({
      isAuthorized: state => state.auth.isAuthorized,
      users: state => state.users,
      currentUser: state => state.currentUser,
    }),
  },
  methods: {
    isUserExists(username) {
      return (
        this.users.filter(
          user => user.email.toLowerCase() === username.toLowerCase(),
        ).length > 0
      );
    },
    login() {
      const { email, username, phone } = this;
      this.$store.dispatch('findUser', { email, username, phone }).then(() => {
        if (!this.currentUser.hasCompleted) {
          this.$router.push('/quiz');
        } else {
          this.$router.push('/results');
        }
      });
      // .then(() => {
      //   if (this.isUserExists(email)) {
      //     this.$store.commit("setUser", { email, username, phone });
      //     if (this.currentUser.)
      //   }
      // })
      // .catch(err => {
      //   throw Error(err);
      // });
      // this.$store.dispatch(AUTH_REQUEST, { username }).then(() => {
      //   this.$router.push("/quiz");
      // });
    },
  },
};
</script>

<style scoped></style>
