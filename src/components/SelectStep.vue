<template>
  <v-card>
    <v-card-title>Select you Files</v-card-title>
    <v-card-text>
      <v-row>
        <v-file-input
          v-model="files"
          counter
          show-size
          multiple
          clearable
        ></v-file-input>
      </v-row>

      <v-row>
        <v-col>
          <v-select
            outlined
            label="Download Limit"
            :items="limit_items"
            v-model="limit"
          ></v-select>
        </v-col>

        <v-col>
          <v-select
            outlined
            label="Expiration Time"
            :items="expire_items"
            v-model="expire"
          ></v-select>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="done()">
        Upload
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ax from "@/api";

export default {
  name: "SelectStep",
  data() {
    return {
      expire_items: [1, 5, 60, 1440, 43200],
      expire: 1440,
      limit_items: [1, 2, 5, 15, 50, 200, "unlimited"],
      limit: 50,
      files: null,
      name: ""
    };
  },
  methods: {
    done() {
      ax.post("/shares", {
        name: this.name,
        expires: null,
        donwload_limit: this.limit,
        password: null,
        is_temporary: false
      })
        .then(res => {
          this.$emit("done", res.data, this.files);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
