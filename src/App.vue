<template>
  <v-app>
    <main-layout></main-layout>
  </v-app>
</template>

<script>
import mainLayout from "./layout/main-layout.vue";
export default {
  components: { mainLayout },
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
@import url("./styles/app.scss");
</style>
