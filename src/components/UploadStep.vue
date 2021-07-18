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
          // close share
          ax.post(`/share/${share.id}`)
            .then(res => {
              this.$emit("done", res.data);
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
