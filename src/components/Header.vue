<template>
  <v-app-bar app>
    <v-app-bar-title>ChiefSend</v-app-bar-title>
    <v-spacer></v-spacer>

    <v-switch
      v-model="darkmode"
      label="Darkmode"
      @change="setDarkmode()"
    ></v-switch>

    <router-link to="/public">
      <v-btn text>Public</v-btn>
    </router-link>

    <router-link to="/upload">
      <v-btn color="primary">Upload</v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      darkmode: false
    };
  },
  created() {
    if (process.browser) {
      if (localStorage.getItem("DarkMode")) {
        this.darkmode = localStorage.getItem("DarkMode") === "true";
      }
      this.setDarkmode();
    }
  },
  methods: {
    setDarkmode() {
      localStorage.setItem("DarkMode", this.darkmode);
      this.$vuetify.theme.dark = this.darkmode;
    }
  }
};
</script>
