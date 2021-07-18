<template>
  <v-card>
    upload
  </v-card>
</template>

<script>
import ax from "@/api";

export default {
  name: "UploadStep",
  methods: {
    uploadAll(share, files) {
      let reqs = [];
      for (let i = 0; i < files.length; i++) {
        var formdata = new FormData();
        formdata.append("file", files[i]);
        reqs.push(ax.post(`/share/${share.id}/attachments`, formdata)); // TODO maybe need multipart/form-data header?
      }

      Promise.all(reqs)
        .then(function(results) {
          console.log("uploaded all attachments");
          console.log(results);
          // this.$emit("done");
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
