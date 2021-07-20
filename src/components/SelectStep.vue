<template>
  <v-card>
    <v-card-title>Select your Files</v-card-title>
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

      <v-row>
        <v-col cols="5">
          <v-text-field v-model="name" label="Name"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-switch v-model="is_public" label="Public"></v-switch>
        </v-col>
        <v-col cols="5">
          <v-text-field v-model="password" label="Password"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn block @click="done()">
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
      name: "",
      password: "",
      is_public: false
    };
  },
  methods: {
    done() {
      // open share
      ax.post("/shares", {
        name: this.name,
        expires: null,
        donwload_limit: this.limit,
        password: this.password,
        is_public: this.is_public
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
