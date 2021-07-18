<template>
  <v-card>
    <v-card-title>Uploading your Files</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="f in files" :key="f.name">
          <v-list-item-avatar>
            <v-progress-circular
              v-if="f.progress <= 100"
              indeterminate
              color="primary"
            ></v-progress-circular>
            <v-icon v-else>mdi-check</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ f.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ f.size }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            {{ f.progress }}
          </v-list-item-action>
        </v-list-item>
      </v-list>
      Total:
      <v-progress-linear :value="progress"></v-progress-linear>
    </v-card-text>
  </v-card>
</template>

<script>
import ax from "@/api";

export default {
  name: "UploadStep",
  data() {
    return {
      progress: 23,
      files: []
    };
  },
  computed: {
    totalProgress: function() {
      return (this.progresses[0] * 100) / this.progresses.length;
    }
  },
  methods: {
    uploadAll(share, files) {
      for (let i = 0; i < files.length; i++) {
        this.files.push({
          name: files[i].name,
          size: files[i].size,
          progress: 0
        });
      }
      // put all file upload requests in an array
      let reqs = [];
      for (let i = 0; i < files.length; i++) {
        var formdata = new FormData();
        formdata.append("file", files[i]);
        reqs.push(
          ax.post(`/share/${share.id}/attachments`, formdata, {
            onUploadProgress: event => {
              if (!event.lengthComputable) {
                this.progresses[i] = 100;
              } else {
                this.progresses[i] = (event.loaded * 100) / event.total; // oder file.size??
              }
            }
          })
        );
      }
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
