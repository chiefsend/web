<template>
  <v-container>
    <v-card>
      <v-card-title>Download</v-card-title>
      <v-card-subtitle>Limit: {{ share.download_limit }}</v-card-subtitle>
      <v-card-subtitle>Expires: {{ share.expires }}</v-card-subtitle>
      <v-card-text>
        <v-list>
          <v-list-item v-for="file of share.files" :key="file.id">
            <v-list-item-title>{{ file.filename }}</v-list-item-title>
            <v-list-item-subtitle>{{ file.filesize }}</v-list-item-subtitle>
            <v-list-item-action>
              <v-btn
                outlined
                color="primary"
                @click="download(`/share/${share.id}/attachment/${file.id}`)"
              >
                <v-icon>mdi-download-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-btn
          block
          color="primary"
          @click="download(`/share/${share.id}/zip`)"
        >
          Download all
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import ax from "@/api";
import fileDownload from "js-file-download";

export default {
  name: "Download",
  data() {
    return {
      share: {}
    };
  },
  mounted() {
    ax.get(`/share/${this.$route.params.id}`)
      .then(res => {
        this.share = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    download(url) {
      ax.get(url, {
        responseType: "blob"
        // auth: {
        //   username: this.id,
        //   password: this.password
        // }
      }).then(res => {
        let fileName = res.headers["content-disposition"].split("filename=")[1];
        fileDownload(res.data, fileName);
      });
    }
  }
};
</script>
