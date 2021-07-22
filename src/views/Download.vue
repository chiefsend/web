<template>
  <v-container>
    <v-card class="mx-lg-16" v-if="authenticated">
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
      :dialog="dialog"
      :id="share.id"
      :wrongPassword="wrongPassword"
      @close="dialog = false"
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
      dialog: false,
      password: "",
      authenticated: false,
      wrongPassword: false
    };
  },
  mounted() {
    ax.get(`/share/${this.$route.params.id}`)
      .then(res => {
        this.share = res.data;
        this.authenticated = true;
      })
      .catch(error => {
        if (error.response.status == 401) {
          this.authenticated = false;
          this.dialog = true;
        } else {
          console.log(error);
        }
      });
  },
  methods: {
    download(url) {
      // compose download request
      let req;
      if (this.authenticated) {
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
      // send request
      req
        .then(res => {
          let filename = res.headers["content-disposition"].split(
            "filename="
          )[1];
          fileDownload(res.data, filename);
        })
        .catch(error => {
          console.log(error);
        });
    },
    handlePassword(value) {
      const id = this.$route.params.id;
      console.log(id);
      this.password = value;
      ax.get(`/share/${id}`, {
        auth: {
          username: id,
          password: value
        }
      })
        .then(res => {
          this.share = res.data;
          this.authenticated = true;
          this.dialog = false;
        })
        .catch(err => {
          if (err.response.status == 401) {
            this.wrongPassword = true;
          } else {
            console.log(err);
          }
        });
    }
  }
};
</script>
