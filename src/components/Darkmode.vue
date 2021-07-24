<template>
  <v-btn small color="primary" fab label="Darkmode" @click="setDarkmode()">
    <v-icon v-if="darkmode">
      mdi-weather-night
    </v-icon>
    <v-icon v-else>
      mdi-weather-sunny
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "Darkmode",
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
      this.darkmode = !this.darkmode;
      if (process.browser) {
        localStorage.setItem("DarkMode", this.darkmode);
      }
      this.$vuetify.theme.dark = this.darkmode;
    }
  }
};
</script>
