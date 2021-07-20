<template>
  <v-container>
    <v-card class="mx-lg-16">
      <v-card-title>Download</v-card-title>
      <v-card-subtitle>Limit: {{ share.download_limit }}</v-card-subtitle>
      <v-card-subtitle>Expires: {{ share.expires }}</v-card-subtitle>
      <v-card-text>
        <v-list>
          <v-list-item v-for="file of share.files" :key="file.id">
            <v-list-item-title>{{ file.filename }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ file.filesize | filesize }}
            </v-list-item-subtitle>
            <v-list-item-action class="mr-5">
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

    <Password
      :sheet="sheet"
      :id="share.id"
      @close="sheet = false"
      @password="handlePassword"
    />
  </v-container>
</template>

<script>
import ax from "@/api";
import fileDownload from "js-file-download";
import Password from "../components/Password.vue";

export default {
  name: "Download",
  components: { Password },
  data() {
    return {
      share: {},
      sheet: false,
      password: ""
    };
  },
  mounted() {
    ax.get(`/share/${this.$route.params.id}`)
      .then(res => {
        this.share = res.data;
      })
      .catch(error => {
        if (error.response.status == 401) {
          this.sheet = true;
        } else {
          console.log(error); // FIXME display error
        }
      });
  },
  methods: {
    download(url) {
      let req;
      if (this.password != "") {
        req = ax.get(url, {
          responseType: "blob",
          auth: {
            username: this.id,
            password: this.password
          }
        });
      } else {
        req = ax.get(url);
      }

      req
        .then(res => {
          let fileName = res.headers["content-disposition"].split(
            "filename="
          )[1];
          fileDownload(res.data, fileName);
        })
        .catch(error => {
          console.log(error);
        });
    },
    handlePassword(value) {
      this.password = value;

      ax.get(`/share/${this.$route.params.id}`, {
        auth: {
          username: this.id,
          password: value
        }
      })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
