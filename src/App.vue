<template>
  <div id="app" @contextmenu="onContextMenu">
    <router-view />
    <div class="debug" v-if="isDebug">
      Пользователь {{ currentUser.username }} ({{ currentUser.email }}) ({{ currentUser.score }})
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isDebug: false,
    };
  },
  computed: mapState([
    {
      isAuthorized: state => state.auth.isAuthorized,
    },
    'token',
    'currentUser',
  ]),
  methods: {
    onContextMenu(e) {
      if (process.env.NODE_ENV !== 'development') {
        e.preventDefault();
      }
    },
    onKeyPress(e) {
      if (process.env.NODE_ENV !== 'development') {
        if (
          (e.metaKey && e.altKey && e.code === 'KeyI') ||
          (e.ctrlKey && e.altKey && e.code === 'KeyI') ||
          (e.metaKey && e.altKey && e.code === 'KeyJ') ||
          (e.ctrlKey && e.altKey && e.code === 'KeyJ') ||
          (e.metaKey && e.altKey && e.code === 'KeyC') ||
          (e.ctrlKey && e.altKey && e.code === 'KeyC') ||
          e.code === 'F12'
        ) {
          e.preventDefault();
        }
      }
    },
  },
  created: function() {
    document.addEventListener('keydown', this.onKeyPress);
    if (this.token) {
      this.$store.dispatch('getCurrentUser', this.token).then(() => {
        if (this.currentUser.hasCompleted) {
          this.$router.push('/results');
        }
      });
    }
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100vh;
  width: 100vw;
}
body {
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: Tahoma, sans-serif;
  text-align: center;
  color: #000000;
  height: 100%;
  font-size: 14px;
  line-height: 18px;
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
.debug {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  padding: 10px;
}
.header {
  position: relative;
}
</style>
<style scoped>
.username {
  position: absolute;
  left: 0;
  top: 30px;
  font-size: 16px;
  line-height: 22px;
  font-weight: bold;
}
</style>
