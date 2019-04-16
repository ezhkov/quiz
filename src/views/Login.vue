<template>
  <div class="login-wrapper">
    <form class="login-form" @submit.prevent="login">
      <h1>Вход</h1>
      <div class="form__row">
        <input required v-model="username" type="text" placeholder="Имя" />
      </div>
      <div class="form__row">
        <input required v-model="email" type="email" placeholder="Email" />
      </div>
      <div class="form__row">
        <input required v-model="phone" type="tel" placeholder="Телефон" />
      </div>
      <div class="form__action">
        <button type="submit" :disabled="isLoggingIn">Дальше</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      username: '',
      email: '',
      phone: '',
      isLoggingIn: false,
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
    async login() {
      const { email, username, phone } = this;
      this.isLoggingIn = true;
      const userId = await this.$store.dispatch('findUser', {
        email,
        username,
        phone,
      });
      if (!this.currentUser.hasCompleted) {
        this.$router.push('/quiz');
      } else {
        this.$router.push('/results');
      }
    },
  },
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'press_start_2pregular';
  src: url('../assets/fonts/pressstart2p-regular-webfont.woff2') format('woff2'),
    url('../assets/fonts/pressstart2p-regular-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.login-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  background: url('../assets/login.jpg') 50% 50% no-repeat;
  background-size: contain;
}

.login-form {
  width: 180px;
  position: absolute;
  top: 165px;
  left: 50%;
  margin-left: -90px;
  color: black;
  font-family: press_start_2pregular, Tahoma, sans-serif;
}

h1 {
  font-size: 32px;
  line-height: 32px;
  margin-bottom: 15px;
}

.form__row + .form__row {
  margin-top: 12px;
}

.form__action {
  margin-top: 20px;
}

input,
button {
  border: 1px solid black;
  width: 100%;
  font-family: press_start_2pregular, Tahoma, sans-serif;
}

input[type='text'],
input[type='email'],
input[type='tel'] {
  font-size: 8px;
  color: black;
  padding: 8px 10px;
  box-sizing: border-box;
  box-shadow: inset 0 2px 2px 0 rgba(46, 46, 46, 0.5);
  letter-spacing: 0;
}

button[type='submit'] {
  background: #fbff00;
  box-shadow: inset 2px 0 0 0 #ffffff, inset 0 2px 0 0 #ffffff;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  text-transform: uppercase;
  font-size: 8px;
  color: black;
  &:disabled {
    opacity: 0.6;
  }
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: black;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: pink;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: pink;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: pink;
}
</style>
