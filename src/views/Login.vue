<template>
  <div class="login-wrapper">
    <form class="login-form" @submit.prevent="login">
      <h1>Вход</h1>
      <div class="form__row form__row--radio">
        <div class="radio">
          <input type="radio" name="type-input" id="frontend" @change="changeType('frontend')" />
          <label for="frontend" class="login-form-type">Frontend</label>
        </div>
        <div class="radio">
          <input type="radio" name="type-input" id="backend" @change="changeType('backend')" />
          <label for="backend" class="login-form-type">Backend</label>
        </div>
      </div>
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
        <button type="submit" :disabled="isLoggingIn || !questionType">Дальше</button>
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
      questionType: state => state.questionType,
    }),
  },
  methods: {
    isUserExists(username) {
      return this.users.filter(user => user.email.toLowerCase() === username.toLowerCase()).length > 0;
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
    changeType(type) {
      this.$store.commit('SET_QUESTION_TYPE', type);
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
  width: 240px;
  position: absolute;
  top: 168px;
  left: 50%;
  margin-left: -120px;
  color: black;
  font-family: press_start_2pregular, Tahoma, sans-serif;
}

h1 {
  font-size: 40px;
  line-height: 40px;
  margin-bottom: 20px;
}

.form__row + .form__row {
  margin-top: 15px;
}

.form__row--radio {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.radio {
  position: relative;
  overflow: hidden;
  + .radio {
    margin-left: 20px;
  }
}

input[type='radio'] {
  width: 1px;
  height: 1px;
  position: absolute;
  left: -10px;
  &:checked {
    + .login-form-type {
      color: #fbff00;
      position: relative;
      text-shadow: 1px 2px 0 rgba(0, 0, 0, 0.9);
      &:after {
        content: '';
        position: absolute;
        bottom: 2px;
        left: 0;
        right: 0;
        height: 4px;
        background: #fbff00;
        box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.9);
      }
    }
  }
}

.login-form-type {
  text-transform: uppercase;
  font-size: 14px;
  display: block;
  padding-bottom: 6px;
}

.form__action {
  margin-top: 15px;
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
  font-size: 10px;
  color: black;
  padding: 13px 15px;
  box-sizing: border-box;
  box-shadow: inset 0 2px 2px 0 rgba(46, 46, 46, 0.5);
  letter-spacing: 0;
}

button[type='submit'] {
  background: #fbff00;
  box-shadow: inset 2px 0 0 0 #ffffff, inset 0 2px 0 0 #ffffff;
  text-align: center;
  padding-top: 13px;
  padding-bottom: 13px;
  text-transform: uppercase;
  font-size: 10px;
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
