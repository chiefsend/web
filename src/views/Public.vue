<template>
  <v-container>
    <v-card v-for="sh in shares" :key="sh.id">
      <v-card-title>{{ sh.name }}</v-card-title>
      <v-card-subtitle>{{ shareSize(sh) }} </v-card-subtitle>
      <v-card-subtitle v-if="sh.expires">
        expires: {{ sh.expires }}
      </v-card-subtitle>
      <v-card-text>{{ sh.files.length }} files</v-card-text>
      <v-card-actions>
        <router-link :to="{ name: 'Download', params: { id: sh.id } }">
          <v-btn>
            Open
          </v-btn>
        </router-link>
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
    ax.get("/shares")
      .then(res => {
        this.shares = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    shareSize(share) {
      let size = 0;
      for (let att of share.files) {
        size += att.filesize;
      }
      return size;
    }
  }
};
</script>
