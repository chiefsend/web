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
            dense
            outlined
            label="Expiration Time"
            :items="expires_items"
            item-text="text"
            item-value="value"
            v-model="expires"
          ></v-select>
        </v-col>

        <v-col>
          <v-select
            dense
            outlined
            label="Download Limit"
            :items="limit_items"
            item-text="text"
            item-value="value"
            v-model="limit"
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
          <v-text-field
            v-model="password"
            label="Password"
            :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_password ? 'text' : 'password'"
            @click:append="show_password = !show_password"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn block @click="done()" color="primary">
        Upload
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ax from "@/api";
import em from "@/events";
import dayjs from "dayjs";

export default {
  name: "SelectStep",
  data() {
    return {
      expires_items: [
        { text: "2 Minutes", value: 2 },
        { text: "5 Minutes", value: 5 },
        { text: "1 Hour", value: 60 },
        { text: "1 Day", value: 1440 },
        { text: "1 Month", value: 43200 },
        { text: "unlimited", value: -1 }
      ],
      expires: 1440,
      limit_items: [
        { text: "1 Downloads", value: 1 },
        { text: "2 Downloads", value: 2 },
        { text: "5 Downloads", value: 5 },
        { text: "15 Downloads", value: 15 },
        { text: "50 Downloads", value: 50 },
        { text: "200 Downloads", value: 200 },
        { text: "unlimited", value: -1 }
      ],
      limit: 50,
      currFiles: null,
      files: [],
      name: "",
      password: "",
      is_public: false,
      completeSize: 0,
      show_password: false
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
    expiresTime() {
      if (this.expires === -1) {
        return null;
      } else {
        return dayjs()
          .add(this.expires, "minute")
          .toISOString();
      }
    },
    done() {
      // open share
      let obj = {
        ...(this.name != "" && { name: this.name }),
        ...(this.expires !== -1 && { expires: this.expiresTime() }),
        ...(this.limit !== -1 && { donwload_limit: this.limit }),
        ...(this.password != "" && { password: this.password }),
        ...{ is_public: this.is_public }
      };
      console.log(obj);
      ax.post("/shares", obj)
        .then(res => {
          this.$emit("done", res.data, this.files);
        })
        .catch(error => {
          em.emit("error", error.message);
        });
    }
  }
};
</script>
