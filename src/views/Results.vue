<template>
  <div class="content-wrapper">
    <div class="quiz">
      <div class="quiz-inner">
        <div class="quiz-header">
          Результаты
          <div class="quiz-header-icons" @click="toLogin"></div>
        </div>
        <hr />
        <div class="quiz-body">
          <table class="results-table">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Email</th>
                <th>Очки</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in preparedUsers"
                :key="user.phone"
                :class="{ current: user.phone === currentUser.phone }"
              >
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.score }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'results',
  computed: {
    ...mapState(['users', 'currentUser']),
    preparedUsers() {
      const doneUsers = this.users.filter(user => user.hasCompleted);
      return doneUsers.sort((a, b) => b.score - a.score);
    },
  },
  methods: {
    toLogin() {
      this.$store.commit('RESET_TOKEN');
      location.href = '/login';
    },
  },
  created() {
    if (!this.users.length) this.$store.dispatch('getUsers');
  },
};
</script>

<style scoped lang="scss">
.content-wrapper {
  height: 100%;
}
.quiz {
  height: 100%;
  box-sizing: border-box;
  background: #bdbdbd;
  border: 1px solid;
  border-top-color: #dfdfdf;
  border-left-color: #dfdfdf;
  border-right-color: #000;
  border-bottom-color: #000;
}
.quiz-inner {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  height: 100%;
  border: 1px solid;
  border-top-color: #fff;
  border-left-color: #fff;
  border-right-color: #808080;
  border-bottom-color: #808080;
}
.quiz-header {
  margin: 2px 2px 0;
  padding: 1px 2px;
  background: linear-gradient(to right, #00007b 0%, #087ecb 100%);
  color: white;
  box-sizing: border-box;
  height: 23px;
}

.quiz-header-icons {
  margin: 1px 0;
  background: url('../assets/window_controls.gif') 50% 50% no-repeat;
  width: 44px;
  height: 19px;
  float: right;
}

hr {
  height: 1px;
  border: none;
  border-top: 1px solid #949494;
  border-bottom: 1px solid #fbfbfb;
  margin-top: 1px;
  margin-bottom: 0;
  margin-left: 2px;
  margin-right: 2px;
}

.quiz-body {
  margin-left: 2px;
  margin-right: 2px;
  padding: 20px;
}

.results-table {
  width: 100%;
  table-layout: fixed;
  border-spacing: 0;
  border: none;
  background: #ffffff;

  th {
    background: #efefef;
    padding: 4px;
  }
  td {
    background: #ffffff;
    padding: 3px;
  }
  tr.current {
    td {
      background: rgba(89, 195, 95, 0.71);
    }
  }

  td + td,
  th + th {
    border-left: 1px solid #b0b0b0;
  }
}
</style>
