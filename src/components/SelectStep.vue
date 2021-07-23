<template>
  <v-card>
    <v-card-title>Select your Files</v-card-title>
    <v-card-subtitle>
      {{ files.length }} files selected &middot; {{ completeSize | filesize }}
    </v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col>
          <v-file-input
            v-model="currFiles"
            hide-input
            multiple
            @change="updateFiles"
          ></v-file-input>
          <v-chip-group v-if="files.length > 0" column>
            <v-chip
              v-for="(file, index) in files"
              :key="index"
              close
              @click:close="removeFile(index)"
            >
              {{ file.name }}
            </v-chip>
          </v-chip-group>
        </v-col>
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
import em from "@/events";

export default {
  name: "SelectStep",
  data() {
    return {
      expire_items: [1, 5, 60, 1440, 43200],
      expire: 1440,
      limit_items: [1, 2, 5, 15, 50, 200, "unlimited"],
      limit: 50,
      currFiles: null,
      files: [],
      name: "",
      password: "",
      is_public: false,
      completeSize: 0
    };
  },
  methods: {
    updateFiles() {
      this.files = [...this.currFiles, ...this.files];
      this.completeSize = this.files.reduce(
        (size, file) => size + file.size,
        0
      );
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
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
          console.log({ error });
          em.emit("error", error.message);
        });
    }
  }
};
</script>
