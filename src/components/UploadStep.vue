<template>
  <v-card>
    <v-card-title>Uploading your Files</v-card-title>
  </v-card>
</template>

<script>
import ax from "@/api";

export default {
  name: "UploadStep",
  methods: {
    uploadAll(share, files) {
      // put all file upload requests in an array
      let reqs = [];
      for (let i = 0; i < files.length; i++) {
        var formdata = new FormData();
        formdata.append("file", files[i]);
        reqs.push(ax.post(`/share/${share.id}/attachments`, formdata)); // TODO maybe need multipart/form-data header?
      }
      // and execute them at once
      Promise.all(reqs)
        .then(() => {
          this.$emit("done", share);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
