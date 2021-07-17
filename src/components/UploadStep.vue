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
      console.log(share);
      console.log(files);

      let reqs = [];
      for (let file in files) {
        let form = new FormData();
        form.append("file", file);

        reqs.push(
          ax.post(`/share/${share.id}/attachments`, form, {
            headers: {
              ...form.getHeaders() // FIXME "not a function"
            }
          })
        );
      }

      Promise.all(reqs)
        .then(function(results) {
          console.log("uploaded all attachments");
          console.log(results);
          this.$emit("done");
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
