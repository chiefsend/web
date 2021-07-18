<template>
  <v-card>
    <v-card-title>Uploading your Files</v-card-title>
    <v-card-text>
      <v-list-item v-for="prog in progresses" :key="prog">
        item
        <v-progress-linear :value="prog"></v-progress-linear>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
import ax from "@/api";

export default {
  name: "UploadStep",
  data() {
    return {
      progresses: [12, 35, 76]
    };
  },
  computed: {
    totalProgress: function() {
      return (this.progresses[0] * 100) / this.progresses.length;
    }
  },
  methods: {
    uploadAll(share, files) {
      // put all file upload requests in an array
      let reqs = [];
      let progress = [];
      for (let i = 0; i < files.length; i++) {
        var formdata = new FormData();
        formdata.append("file", files[i]);
        reqs.push(
          ax.post(`/share/${share.id}/attachments`, formdata, {
            onUploadProgress: event => {
              progress[i] = event.loaded * 100 / files[i].size;
            }
          })
        );
      }
      this.progresses = progress;
      console.log(this.progresses);
      // and execute them at once
      Promise.all(reqs)
        .then(() => {
          // close share
          ax.post(`/share/${share.id}`)
            .then(res => {
              console.log(res);
              // this.$emit("done", res.data); FIXME wieder rein
            })
            .catch(error => console.log(error));
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
