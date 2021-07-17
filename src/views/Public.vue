<template>
  <v-container>
    <v-card v-for="sh in shares" :key="sh.id">
      <v-card-title>
        {{ sh.name }}
      </v-card-title>
      <v-card-subtitle>
        Listen to your favorite artists and albums whenever and wherever, online
        and offline.
      </v-card-subtitle>
      <v-card-actions>
        <v-btn>
          Open
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import ax from "@/api";

export default {
  name: "Public",
  data() {
    return {
      shares: []
    };
  },
  created() {
    ax.get("/shares").then(res => {
      this.shares = res.data;
      console.log(res.data);
    });
  }
};
</script>
