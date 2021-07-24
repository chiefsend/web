<template>
  <v-app-bar app>
    <router-link to="/" style="text-decoration: none; color: inherit;">
      <v-app-bar-title>ChiefSend</v-app-bar-title>
    </router-link>
    <v-spacer></v-spacer>

    <Darkmode />

    <router-link to="/public">
      <v-btn text>Public</v-btn>
    </router-link>

    <router-link to="/upload">
      <v-btn color="primary">Upload</v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
import Darkmode from "./Darkmode.vue";
export default {
  components: { Darkmode },
  name: "Header"
};
</script>
