<template>
  <v-switch
    v-model="darkmode"
    label="Darkmode"
    @change="setDarkmode()"
  ></v-switch>
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
      if (process.browser) {
        localStorage.setItem("DarkMode", this.darkmode);
      }
      this.$vuetify.theme.dark = this.darkmode;
    }
  }
};
</script>
