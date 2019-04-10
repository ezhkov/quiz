<template>
  <div class="about">
    <h1>This is an results page</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'results',
  computed: {
    ...mapState(['users']),
  },
  created() {
    if (!this.users.length) this.$store.dispatch('getUsers');
  },
};
</script>
