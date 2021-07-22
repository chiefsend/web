<template>
  <v-snackbar v-model="snackbar">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import em from "@/events";

export default {
  name: "Events",
  data() {
    return {
      snackbar: false,
      text: ""
    };
  },
  mounted() {
    em.on("error", msg => {
      this.text = msg;
      this.snackbar = true;
    });
  }
};
</script>
