<template>
  <div class="content-wrapper">
    <div class="results">
      <div class="results-inner">
        <h1 data-text="Results">Results</h1>
        <div class="results-scroller" ref="scroller">
          <table class="results-table">
            <thead>
              <tr>
                <th colspan="4">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, index) in preparedUsers"
                :key="user.phone"
                :class="{ current: user.phone === currentUser.phone }"
                :ref="user.phone === currentUser.phone ? 'current' : null"
              >
                <td class="cell-num">
                  <span class="number" :data-text="index + 1">{{ index + 1 }}</span>
                </td>
                <td class="cell-username">
                  <div class="username"><span class="user-icon"></span>{{ user.username }}</div>
                </td>
                <td class="cell-time">
                  <span class="clock-icon"></span>{{ getTimePlayed(user.timeStarted, user.timeCompleted) }}
                </td>
                <td class="cell-score">{{ user.score }}</td>
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
      return doneUsers.sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        return a.timeCompleted.seconds - a.timeStarted.seconds - (b.timeCompleted.seconds - b.timeStarted.seconds);
      });
    },
  },
  methods: {
    getTimePlayed(timeStart, timeEnd) {
      const diff = timeEnd.seconds - timeStart.seconds;
      const minutes = Math.floor(diff / 60);
      const seconds = diff - minutes * 60;
      return `0${minutes}:${seconds.toString().length === 1 ? '0' : ''}${seconds}`;
    },
  },
  created() {
    if (!this.users.length) this.$store.dispatch('getUsers');
    this.$store.commit('RESET_TOKEN');
  },
  mounted() {},
  watch: {
    preparedUsers() {
      this.$nextTick(() => {
        const currentRow = this.$refs.current[0];
        const currentRowOffset = currentRow.offsetTop;
        this.$refs.scroller.scrollTo(0, currentRowOffset - 100);
      });
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
.content-wrapper {
  height: 100%;
}
.results {
  height: 100%;
  background: url('../assets/results.jpg') 50% 50% no-repeat;
  background-size: cover;
  box-sizing: border-box;
  padding-top: 80px;
  padding-bottom: 100px;
  padding-left: 115px;
  padding-right: 115px;
  font-family: press_start_2pregular, Tahoma, sans-serif;
}

.results-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  z-index: 0;
  height: 100%;
}

h1 {
  font-size: 32px;
  line-height: 32px;
  margin-top: 48px;
  margin-bottom: 20px;
  position: relative;
  color: #ffcd00;
  letter-spacing: 0;
  text-transform: uppercase;
  background: -webkit-linear-gradient(#eb553b, #fee027);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  &:before {
    content: '';
    position: absolute;
    width: 190px;
    height: 29px;
    left: 50%;
    transform: translateX(-50%);
    top: -48px;
    background: url('../assets/heart.svg') 50% 0 no-repeat;
    background-size: 190px auto;
  }
  &:after {
    background: none;
    content: attr(data-text);
    left: 0;
    position: absolute;
    text-shadow: 2px 4px 0 rgba(0, 0, 0, 0.9);
    top: 0;
    z-index: -1;
  }
}

.results-scroller {
  flex-grow: 1;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
  padding-right: 30px;
}

.results-table {
  width: 100%;
  color: #ffffff;
  th {
    text-align: right;
    text-transform: uppercase;
    position: absolute;
    right: 30px;
    top: 80px;
  }
  td {
    padding-top: 7px;
    padding-bottom: 7px;
    text-transform: uppercase;
  }

  tr:first-child {
    td {
      color: #f8b72c;
    }
    .cell-num {
      font-size: 24px;
    }
    .cell-username {
      font-size: 18px;
    }
    .cell-time {
      font-size: 14px;
    }
    .cell-score {
      font-size: 16px;
    }
  }

  tr:nth-child(5n + 1) {
    .user-icon {
      background: url('../assets/pers1.svg') 50% 50%/100% no-repeat;
    }
  }
  tr:nth-child(5n + 2) {
    .user-icon {
      background: url('../assets/pers2.svg') 50% 50%/100% no-repeat;
    }
  }
  tr:nth-child(5n + 3) {
    .user-icon {
      background: url('../assets/pers3.svg') 50% 50%/100% no-repeat;
    }
  }
  tr:nth-child(5n + 4) {
    .user-icon {
      background: url('../assets/pers4.svg') 50% 50%/100% no-repeat;
    }
  }
  tr:nth-child(5n + 5) {
    .user-icon {
      background: url('../assets/pers5.svg') 50% 50%/100% no-repeat;
    }
  }

  tr.current {
    td {
      color: #fbff00;
    }
    .number {
      background: none;
      -webkit-background-clip: content-box;
      -webkit-text-fill-color: inherit;
    }
  }
}

.cell-num {
  text-align: right;
}
.cell-username {
  text-align: left;
  white-space: nowrap;
  padding-left: 20px;
}
.cell-time {
  text-align: left;
  white-space: nowrap;
  padding-left: 20px;
}
.cell-score {
  text-align: right;
}
.user-icon {
  display: inline-block;
  width: 39px;
  height: 48px;
  vertical-align: middle;
  margin-right: 16px;
}

.clock-icon {
  width: 22px;
  height: 27px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 12px;
  background: url('../assets/clock.svg') 50% 50% no-repeat;
  background-size: 100%;
  margin-top: -10px;
}

.number {
  background: -webkit-linear-gradient(#eb553b, #fee027);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  &:after {
    background: none;
    content: attr(data-text);
    left: 0;
    position: absolute;
    text-shadow: 2px 4px 0 rgba(0, 0, 0, 0.9);
    top: 0;
    z-index: -1;
  }
}
.username {
  display: flex;
  align-items: center;
}
</style>
