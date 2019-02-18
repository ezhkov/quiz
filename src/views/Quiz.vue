<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <QuizWizard msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import QuizWizard from "@/components/QuizWizard.vue";

export default {
  name: "home",
  components: {
    QuizWizard,
  },
};
</script>
