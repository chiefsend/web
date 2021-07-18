<template>
  <v-card>
    upload
  </v-card>
</template>

<script>
// import ax from "@/api";

export default {
  name: "UploadStep",
  methods: {
    uploadAll(share, files) {
      console.log(share);
      console.log(files);

      for (let i = 0; i < files.length; i++) {
        var formdata = new FormData();
        formdata.append("file", files[i]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow"
        };
        fetch(
          `http://localhost:6969/share/${share.id}/attachments`,
          requestOptions
        )
          .then(res => console.log(res))
          .catch(error => console.log("error", error));
      }

      // let reqs = [];
      // for (let file in files) {
      //   // let form = new FormData();
      //   // form.append("file", file);
      //   // reqs.push(ax.post(`/share/${share.id}/attachments`, form));

      //   // var formdata = new FormData();
      //   // formdata.append("file", file);
      //   // var requestOptions = {
      //   //   method: "POST",
      //   //   body: formdata,
      //   //   redirect: "follow"
      //   // };
      //   // fetch(
      //   //   `http://localhost:6969/share/${share.id}/attachments`,
      //   //   requestOptions
      //   // )
      //   //   .then(response => response.text())
      //   //   .then(result => console.log(result))
      //   //   .catch(error => console.log("error", error));
      // }

      // Promise.all(reqs)
      //   .then(function(results) {
      //     console.log("uploaded all attachments");
      //     console.log(results);
      //     this.$emit("done");
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
    }
  }
};
</script>
