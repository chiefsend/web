<template>
  <v-container>
    <v-row>
      <v-col v-for="sh in shares" :key="sh.id" class="ma-2">
        <v-card class="share">
          <v-card-title v-if="sh.name">{{ sh.name }}</v-card-title>
          <v-card-title v-else>{{ sh.id }}</v-card-title>

          <v-card-subtitle>{{ shareSize(sh) | filesize }} </v-card-subtitle>
          <v-card-subtitle v-if="sh.expires">
            expires: {{ sh.expires | datetime }}
          </v-card-subtitle>

          <v-card-text>{{ sh.files.length }} files</v-card-text>

          <v-card-actions class="share-open">
            <router-link :to="{ name: 'Download', params: { id: sh.id } }">
              <v-btn>
                Open
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ax from "@/api";
import em from "@/events";

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
        console.error({ error });
        em.emit("error", error.message);
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

<style scoped>
.share {
  width: 400px;
  height: 200px;
}

.share-open {
  position: absolute;
  bottom: 1em;
  right: 1em;
}
</style>
